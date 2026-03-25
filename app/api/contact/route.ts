import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmailWithResend } from '@/lib/email/resend';
import { captureApiException } from '@/lib/monitoring/sentry';

export const runtime = 'nodejs';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().min(10).max(5000),
  source: z.string().trim().max(100).optional(),
  // Honeypot — must be empty
  website: z.string().max(0).optional()
});

function getNotificationEmail() {
  const email = process.env.INTERNAL_NOTIFICATION_EMAIL;
  if (!email) throw new Error('Missing INTERNAL_NOTIFICATION_EMAIL env variable.');
  return email;
}

function buildNotificationHtml(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
  receivedAt: string;
}) {
  const esc = (v: string) =>
    v.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

  return `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px 16px;color:#0f172a;">
  <h2 style="margin:0 0 16px;font-size:18px;">Nouveau message de contact</h2>
  <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
    <tr style="background:#f8fafc;">
      <td style="padding:10px 16px;font-size:13px;color:#64748b;width:30%;">Nom</td>
      <td style="padding:10px 16px;font-size:13px;font-weight:700;">${esc(data.name)}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:#64748b;border-top:1px solid #f1f5f9;">Email</td>
      <td style="padding:10px 16px;font-size:13px;border-top:1px solid #f1f5f9;">
        <a href="mailto:${esc(data.email)}">${esc(data.email)}</a>
      </td>
    </tr>
    ${data.phone ? `
    <tr style="background:#f8fafc;">
      <td style="padding:10px 16px;font-size:13px;color:#64748b;border-top:1px solid #f1f5f9;">Téléphone</td>
      <td style="padding:10px 16px;font-size:13px;border-top:1px solid #f1f5f9;">${esc(data.phone)}</td>
    </tr>` : ''}
    <tr ${data.phone ? '' : 'style="background:#f8fafc;"'}>
      <td style="padding:10px 16px;font-size:13px;color:#64748b;border-top:1px solid #f1f5f9;">Source</td>
      <td style="padding:10px 16px;font-size:13px;border-top:1px solid #f1f5f9;">${esc(data.source ?? 'site web')}</td>
    </tr>
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:#64748b;border-top:1px solid #f1f5f9;">Date</td>
      <td style="padding:10px 16px;font-size:13px;border-top:1px solid #f1f5f9;">${esc(data.receivedAt)}</td>
    </tr>
  </table>
  <h3 style="margin:20px 0 8px;font-size:14px;">Message</h3>
  <div style="border:1px solid #e2e8f0;border-radius:8px;padding:14px;background:#f8fafc;font-size:14px;white-space:pre-wrap;">${esc(data.message)}</div>
  <p style="margin:16px 0 0;font-size:12px;color:#94a3b8;">Répondre directement à ${esc(data.email)}</p>
</div>`;
}

function buildConfirmationHtml(name: string) {
  const esc = (v: string) => v.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  return `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px 16px;color:#0f172a;">
  <h2 style="margin:0 0 12px;font-size:20px;">Message bien reçu ✅</h2>
  <p style="color:#475569;font-size:15px;">Bonjour ${esc(name)},</p>
  <p style="color:#475569;font-size:15px;">
    Nous avons bien reçu votre message. Notre équipe vous répondra dans les meilleurs délais.
  </p>
  <p style="color:#475569;font-size:15px;">
    En attendant, n&apos;hésitez pas à nous contacter directement sur WhatsApp pour une réponse rapide :
    <a href="${process.env.CUSTOMER_SUPPORT_WHATSAPP || 'https://wa.me/33743561304'}" style="color:#0f172a;font-weight:700;">+33 7 43 56 13 04</a>
  </p>
  <p style="margin:20px 0 0;color:#94a3b8;font-size:13px;">KR Global Solutions LTD</p>
</div>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données invalides.', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Honeypot check — bots fill hidden fields
    if (parsed.data.website) {
      return NextResponse.json({ success: true }); // Silently discard
    }

    const { name, email, phone, message, source } = parsed.data;
    const receivedAt = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
    const to = getNotificationEmail();

    // Send notification to team
    await sendEmailWithResend({
      to,
      subject: `Nouveau contact : ${name}`,
      html: buildNotificationHtml({ name, email, phone, message, source, receivedAt }),
      replyTo: email
    });

    // Send confirmation to user
    await sendEmailWithResend({
      to: email,
      subject: 'Votre message a bien été reçu — KR Global Solutions LTD',
      html: buildConfirmationHtml(name)
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    captureApiException(error, { route: '/api/contact', feature: 'contact_form' });
    console.error('[contact] Failed to process contact form.', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
