import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmailWithResend } from '@/lib/email/resend';
import { generateGuideClientPdf } from '@/lib/pdf/documents/guide-client';
import { generateGrilleTarifairePdf } from '@/lib/pdf/documents/grille-tarifaire';
import { getSupabaseServerClient } from '@/lib/supabase';
import { captureApiException } from '@/lib/monitoring/sentry';

export const runtime = 'nodejs';

const deliverySchema = z.object({
  order_number: z.string().trim().min(1),
  customer_email: z.string().trim().email(),
  customer_name: z.string().trim().min(1).max(100),
  site_url: z.string().trim().url()
});

function getAdminSecret() {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error('Missing ADMIN_SECRET environment variable.');
  return secret;
}

function verifyAdminSecret(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, '');
    return token === getAdminSecret();
  }
  return false;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function buildDeliveryHtml(params: {
  customerName: string;
  siteUrl: string;
  orderNumber: string;
  appUrl: string;
}) {
  const { customerName, siteUrl, orderNumber, appUrl } = params;
  const firstName = customerName.split(/\s+/)[0] || customerName;
  const calendlyUrl = 'https://calendly.com/krglobalsolutionsltd/30-minute-meeting-clone';
  const whatsappUrl = process.env.CUSTOMER_SUPPORT_WHATSAPP || 'https://wa.me/33743561304';

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

          <tr>
            <td style="background:#0f172a;padding:28px 32px;text-align:center;">
              <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">KR Global Solutions LTD</p>
              <p style="margin:6px 0 0;color:#94a3b8;font-size:13px;">orders@krglobalsolutionsltd.com</p>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 32px 24px;border-bottom:1px solid #f1f5f9;">
              <p style="margin:0 0 6px;color:#64748b;font-size:14px;">Bonjour ${escapeHtml(firstName)},</p>
              <h1 style="margin:0 0 12px;font-size:24px;color:#0f172a;line-height:1.3;">Votre site est prêt 🎉</h1>
              <p style="margin:0;color:#475569;font-size:15px;line-height:1.6;">
                Notre équipe a terminé la réalisation de votre site web. Il est en ligne et accessible dès maintenant.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #f1f5f9;">
              <h2 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">Votre site</h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:12px;color:#16a34a;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">En ligne ✓</p>
                    <a href="${escapeHtml(siteUrl)}" style="font-size:17px;font-weight:700;color:#0f172a;text-decoration:none;word-break:break-all;">
                      ${escapeHtml(siteUrl)}
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:10px 0 0;font-size:13px;color:#64748b;">Commande n° ${escapeHtml(orderNumber)}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #f1f5f9;">
              <h2 style="margin:0 0 14px;font-size:15px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">Documents joints</h2>
              <table cellpadding="0" cellspacing="0">
                <tr><td style="padding:4px 0;font-size:14px;color:#475569;">📄 <strong>Guide client</strong> — Gérer et faire évoluer votre site</td></tr>
                <tr><td style="padding:4px 0;font-size:14px;color:#475569;">💰 <strong>Grille tarifaire</strong> — Ajouts, évolutions et maintenance</td></tr>
              </table>
              <p style="margin:10px 0 0;font-size:13px;color:#94a3b8;">
                Disponibles aussi en ligne :
                <a href="${escapeHtml(appUrl)}/api/pdfs/guide-client" style="color:#64748b;">Guide client</a>
                &nbsp;·&nbsp;
                <a href="${escapeHtml(appUrl)}/api/pdfs/grille-tarifaire" style="color:#64748b;">Grille tarifaire</a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #f1f5f9;background:#fffbeb;">
              <p style="margin:0;font-size:14px;color:#92400e;line-height:1.6;">
                💡 <strong>Rappel :</strong> Une correction mineure est incluse. Contactez-nous avec vos remarques.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #f1f5f9;">
              <h2 style="margin:0 0 14px;font-size:15px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">Nous contacter</h2>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:8px;">
                    <a href="${escapeHtml(whatsappUrl)}" style="display:inline-block;background:#25d366;color:#ffffff;font-size:14px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;">
                      💬 Écrire sur WhatsApp
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="${escapeHtml(calendlyUrl)}" style="display:inline-block;background:#0f172a;color:#ffffff;font-size:14px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;">
                      📅 Réserver un appel gratuit
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px;text-align:center;">
              <p style="margin:0;font-size:14px;color:#475569;">Merci pour votre confiance,<br /><strong>KR Global Solutions LTD</strong></p>
              <p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">Réf. ${escapeHtml(orderNumber)}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function markOrderDelivered(orderNumber: string) {
  try {
    const supabase = getSupabaseServerClient();
    await supabase
      .from('order_records')
      .update({ delivery_status: 'delivered' })
      .eq('order_number', orderNumber);
  } catch (error) {
    console.error(`[send-delivery] Could not update delivery_status for ${orderNumber}.`, error);
  }
}

export async function POST(request: Request) {
  // Auth check
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = deliverySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Payload invalide.', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { order_number, customer_email, customer_name, site_url } = parsed.data;
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/\/$/, '');

    // Generate PDFs in parallel
    const [guideBytes, grilleBytes] = await Promise.all([
      generateGuideClientPdf(),
      generateGrilleTarifairePdf()
    ]);

    const attachments = [
      {
        filename: 'guide-client-kr-global-solutions.pdf',
        content: Buffer.from(guideBytes).toString('base64')
      },
      {
        filename: 'grille-tarifaire-evolutions-site.pdf',
        content: Buffer.from(grilleBytes).toString('base64')
      }
    ];

    const html = buildDeliveryHtml({ customerName: customer_name, siteUrl: site_url, orderNumber: order_number, appUrl });

    await sendEmailWithResend({
      to: customer_email,
      subject: `Votre site est prêt — commande ${order_number}`,
      html,
      attachments
    });

    // Update delivery status asynchronously (non-blocking)
    void markOrderDelivered(order_number);

    console.info(`[send-delivery] Delivery email sent to ${customer_email} for order ${order_number}.`);

    return NextResponse.json({
      success: true,
      order_number,
      customer_email,
      attachments_count: attachments.length
    });
  } catch (error) {
    captureApiException(error, { route: '/api/admin/send-delivery', feature: 'admin_delivery' });
    console.error('[send-delivery] Failed.', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
