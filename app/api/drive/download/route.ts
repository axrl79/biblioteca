import { NextRequest, NextResponse } from 'next/server';
import { getFileDownloadUrl } from '@/lib/drive-client';

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

    const downloadUrl = await getFileDownloadUrl(fileId);

    return NextResponse.json(
      { downloadUrl },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('[v0] Error in /api/drive/download:', error);
    return NextResponse.json(
      { error: 'Failed to get download URL' },
      { status: 500 }
    );
  }
}
