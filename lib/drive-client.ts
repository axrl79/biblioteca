import { google } from 'googleapis';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  webViewLink?: string;
  webContentLink?: string;
  children?: DriveFile[];
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    type: 'service_account',
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
  },
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

export async function listFolderContents(folderId: string): Promise<DriveFile[]> {
  try {
    console.log(`[listFolderContents] Fetching contents of folder: ${folderId}`);
    
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      spaces: 'drive',
      fields: 'files(id, name, mimeType, size, webViewLink, webContentLink)',
      pageSize: 1000,
      orderBy: 'name',
    });

    const rawFiles = response.data.files || [];
    const files: DriveFile[] = rawFiles
      .filter(
        (file): file is { id: string; name: string; mimeType: string; size?: string; webViewLink?: string; webContentLink?: string } =>
          !!file?.id && !!file?.name && !!file?.mimeType
      )
      .map((file) => ({
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        size: file.size ?? undefined,
        webViewLink: file.webViewLink ?? undefined,
        webContentLink: file.webContentLink ?? undefined,
      }));

    console.log(`[listFolderContents] Raw response: ${rawFiles.length} items, mapped ${files.length} valid items`);
    files.forEach((f) => {
      const isFolder = f.mimeType === 'application/vnd.google-apps.folder';
      console.log(`  - ${f.name} (${isFolder ? 'FOLDER' : 'FILE'})`);
    });

    const sorted = files.sort((a, b) => {
      const aIsFolder = a.mimeType === 'application/vnd.google-apps.folder';
      const bIsFolder = b.mimeType === 'application/vnd.google-apps.folder';

      if (aIsFolder && !bIsFolder) return -1;
      if (!aIsFolder && bIsFolder) return 1;
      return a.name.localeCompare(b.name);
    });

    return sorted;
  } catch (error) {
    console.error('[listFolderContents] Error listing folder contents:', error);
    throw error;
  }
}

export async function getFileDownloadUrl(fileId: string): Promise<string> {
  try {
    const file = await drive.files.get({
      fileId,
      fields: 'webContentLink',
    });
    
    // Agregar &export=download para forzar descarga directa
    return (file.data.webContentLink || '') + '&export=download';
  } catch (error) {
    console.error('[v0] Error getting download URL:', error);
    throw error;
  }
}

export async function getFileMetadata(fileId: string): Promise<any> {
  try {
    const file = await drive.files.get({
      fileId,
      fields: 'id, name, mimeType, size, webViewLink, webContentLink, parents',
    });
    return file.data;
  } catch (error) {
    console.error('[v0] Error getting file metadata:', error);
    throw error;
  }
}

export async function buildFolderTree(
  folderId: string,
  depth: number = 0,
  maxDepth: number = 3
): Promise<DriveFile> {
  if (depth > maxDepth) {
    return {
      id: folderId,
      name: 'Carpeta',
      mimeType: 'application/vnd.google-apps.folder',
    };
  }

  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      spaces: 'drive',
      fields: 'files(id, name, mimeType, size, webViewLink, webContentLink)',
      pageSize: 100,
    });

    const rawFiles = response.data.files || [];
    const files: DriveFile[] = rawFiles
      .filter(
        (file): file is { id: string; name: string; mimeType: string; size?: string; webViewLink?: string; webContentLink?: string } =>
          !!file?.id && !!file?.name && !!file?.mimeType
      )
      .map((file) => ({
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        size: file.size ?? undefined,
        webViewLink: file.webViewLink ?? undefined,
        webContentLink: file.webContentLink ?? undefined,
      }))
      .sort((a, b) => {
        const aIsFolder = a.mimeType === 'application/vnd.google-apps.folder';
        const bIsFolder = b.mimeType === 'application/vnd.google-apps.folder';

        if (aIsFolder && !bIsFolder) return -1;
        if (!aIsFolder && bIsFolder) return 1;
        return a.name.localeCompare(b.name);
      });

    // Recursivamente obtener contenido de subcarpetas (solo carpetas, no archivos)
    const filesWithTree = await Promise.all(
      files.map(async (file) => {
        if (file.mimeType === 'application/vnd.google-apps.folder' && depth < maxDepth - 1) {
          const children = await buildFolderTree(file.id, depth + 1, maxDepth);
          return { ...file, children: children.children };
        }
        return file;
      })
    );

    return {
      id: folderId,
      name: 'Root',
      mimeType: 'application/vnd.google-apps.folder',
      children: filesWithTree,
    };
  } catch (error) {
    console.error('[v0] Error building folder tree:', error);
    throw error;
  }
}
