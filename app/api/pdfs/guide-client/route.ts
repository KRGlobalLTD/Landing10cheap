import { NextResponse } from 'next/server';
import { generateGuideClientPdf } from '@/lib/pdf/documents/guide-client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const pdfBytes = await generateGuideClientPdf();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="guide-client-kr-global-solutions.pdf"',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('[pdf] Failed to generate guide-client PDF.', error);
    return NextResponse.json({ error: 'PDF generation failed.' }, { status: 500 });
  }
}
