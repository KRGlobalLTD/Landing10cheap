import { NextResponse } from 'next/server';
import { generateGrilleTarifairePdf } from '@/lib/pdf/documents/grille-tarifaire';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const pdfBytes = await generateGrilleTarifairePdf();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="grille-tarifaire-evolutions-site.pdf"',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('[pdf] Failed to generate grille-tarifaire PDF.', error);
    return NextResponse.json({ error: 'PDF generation failed.' }, { status: 500 });
  }
}
