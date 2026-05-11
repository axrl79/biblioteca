import { NextRequest, NextResponse } from 'next/server';
import { getFileStream } from '@/lib/drive-client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params;

    if (!fileId) {
      return NextResponse.json({ error: 'fileId is required' }, { status: 400 });
    }

    const { data, mimeType } = await getFileStream(fileId);

    // Retornar el stream directamente como respuesta
    return new NextResponse(data as any, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('[API] Error in /api/drive/image:', error);
    return NextResponse.json({ error: 'Failed to stream image' }, { status: 500 });
  }
}
