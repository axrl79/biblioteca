import { NextRequest, NextResponse } from 'next/server';
import { getFileMetadata } from '@/lib/drive-client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');

    if (!fileId) {
      return NextResponse.json(
        { error: 'fileId is required' },
        { status: 400 }
      );
    }

    const metadata = await getFileMetadata(fileId);

    // Generar URL de previsualización según el tipo MIME
    let previewUrl = '';
    const mimeType = metadata.mimeType;

    const isOfficeFile = mimeType.includes('officedocument') || mimeType.includes('msword') || mimeType.includes('ms-excel') || mimeType.includes('ms-powerpoint');

    if (mimeType === 'application/pdf' || isOfficeFile) {
      // PDFs y archivos de Office se pueden previsualizar directamente desde Google Drive
      previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    } else if (mimeType.startsWith('image/')) {
      // Usar nuestro proxy local para evitar problemas de CORS y permisos con Google
      previewUrl = `/api/drive/image/${fileId}`;
    } else if (mimeType.startsWith('application/vnd.google-apps.')) {
      // Google Docs, Sheets, etc - usar webViewLink
      previewUrl = metadata.webViewLink || '';
    }

    return NextResponse.json(
      {
        fileId,
        name: metadata.name,
        mimeType,
        previewUrl,
        canPreview: !!previewUrl,
        webViewLink: metadata.webViewLink,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('[v0] Error in /api/drive/preview:', error);
    return NextResponse.json(
      { error: 'Failed to get preview data' },
      { status: 500 }
    );
  }
}
