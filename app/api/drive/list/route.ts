import { NextRequest, NextResponse } from 'next/server';
import { listFolderContents } from '@/lib/drive-client';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cachear por 1 hora

export async function GET(request: NextRequest) {
  try {
    const folderId = request.nextUrl.searchParams.get('folderId');

    if (!folderId) {
      return NextResponse.json(
        { error: 'folderId is required' },
        { status: 400 }
      );
    }

    console.log(`[API] Listing contents of folder: ${folderId}`);
    const files = await listFolderContents(folderId);

    console.log(`[API] Found ${files.length} items - Folders: ${files.filter(f => f.mimeType === 'application/vnd.google-apps.folder').length}, Files: ${files.filter(f => f.mimeType !== 'application/vnd.google-apps.folder').length}`);

    return NextResponse.json(
      { files },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('[API] Error in /api/drive/list:', error);
    return NextResponse.json(
      { error: 'Failed to list folder contents', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
