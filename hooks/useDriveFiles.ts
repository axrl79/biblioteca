import { useState, useEffect, useCallback } from 'react';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  webViewLink?: string;
  webContentLink?: string;
}

export function useDriveFiles(folderId: string | null) {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = useCallback(async () => {
    if (!folderId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/drive/list?folderId=${encodeURIComponent(folderId)}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch files: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.files) {
        throw new Error('No files data in response');
      }

      // Ordenar: carpetas primero, luego archivos
      const sorted = [...data.files].sort((a, b) => {
        const aIsFolder = a.mimeType === 'application/vnd.google-apps.folder';
        const bIsFolder = b.mimeType === 'application/vnd.google-apps.folder';
        
        if (aIsFolder && !bIsFolder) return -1;
        if (!aIsFolder && bIsFolder) return 1;
        return (a.name || '').localeCompare(b.name || '');
      });

      console.log(`[useDriveFiles] Loaded ${sorted.length} items from folder ${folderId}:`, {
        folders: sorted.filter(f => isFolder(f)).length,
        files: sorted.filter(f => !isFolder(f)).length,
      });

      setFiles(sorted);
    } catch (err) {
      console.error('[useDriveFiles] Error fetching files:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, [folderId]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return { files, loading, error, refetch: fetchFiles };
}

export function isFolder(file: DriveFile): boolean {
  return file.mimeType === 'application/vnd.google-apps.folder';
}

export function getFileIcon(file: DriveFile): string {
  if (isFolder(file)) return '📁';

  const { mimeType, name } = file;

  if (mimeType === 'application/pdf') return '📄';
  if (mimeType.startsWith('image/')) return '🖼️';
  if (mimeType.startsWith('video/')) return '🎥';
  if (mimeType.startsWith('audio/')) return '🎵';
  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'application/msword'
  )
    return '📝';
  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    mimeType === 'application/vnd.ms-excel'
  )
    return '📊';
  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
    mimeType === 'application/vnd.ms-powerpoint'
  )
    return '🎯';
  if (mimeType.includes('google-apps.document')) return '📑';
  if (mimeType.includes('google-apps.spreadsheet')) return '📈';
  if (mimeType.includes('google-apps.presentation')) return '🎨';

  return '📎';
}

export function formatFileSize(bytes?: string): string {
  if (!bytes) return 'N/A';

  const size = parseInt(bytes, 10);
  if (size === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(size) / Math.log(k));

  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
