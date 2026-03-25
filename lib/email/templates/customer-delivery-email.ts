import type { CustomerDeliveryEmailPayload } from '@/lib/types/email';

type CustomerDeliveryEmailTemplate = {
  subject: string;
  html: string;
  text: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function normalize(value: string | null | undefined, fallback = '') {
  return (value ?? '').trim() || fallback;
}

function formatDisplayDate(value: string) {
  return new Date(value).toLocaleString('fr-FR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Paris'
  });
}

function getFirstName(fullName: string | null | undefined) {
  const clean = normalize(fullName);
  if (!clean) return null;
  return clean.split(/\s+/)[0] || null;
}

export function buildCustomerDeliveryEmailTemplate(payload: CustomerDeliveryEmailPayload): CustomerDeliveryEmailTemplate {
  const { brief, delivery, customerEmail, deliveredAt } = payload;

  const firstName = getFirstName(brief.customer.fullName);
  const greeting = firstName ? `Bonjour ${firstName},` : 'Bonjour,';
  const businessName = normalize(brief.business.businessName, 'votre activité');
  const deliveredDate = formatDisplayDate(deliveredAt);
  const siteUrl = normalize(delivery.siteUrl);
  const supportEmail = normalize(delivery.supportEmail) || normalize(payload.support.email);
  const whatsappUrl = normalize(delivery.supportWhatsapp) || normalize(payload.support.whatsapp);
  const calendlyUrl = process.env.CUSTOMER_SUPPORT_CALENDLY || 'https://calendly.com/krglobalsolutionsltd/30-minute-meeting-clone';
  const customMessage = normalize(delivery.customMessage);
  const appUrl = normalize(process.env.NEXT_PUBLIC_APP_URL, 'https://krglobalsolutionsltd.com');

  const subject = `Votre site est prêt — ${businessName}`;

  const usefulLinks = [
    delivery.adminUrl ? { label: 'Accès admin', url: delivery.adminUrl } : null,
    delivery.githubUrl ? { label: 'Code source (GitHub)', url: delivery.githubUrl } : null,
    delivery.vercelUrl ? { label: 'Tableau de bord Vercel', url: delivery.vercelUrl } : null
  ].filter((l): l is { label: string; url: string } => l !== null);

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:#0f172a;padding:28px 32px;text-align:center;">
              <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.5px;">
                KR Global Solutions LTD
              </p>
              <p style="margin:6px 0 0;color:#94a3b8;font-size:13px;">
                orders@krglobalsolutionsltd.com
              </p>
            </td>
          </tr>

          <!-- HERO -->
          <tr>
            <td style="padding:32px 32px 24px;border-bottom:1px solid #f1f5f9;">
              <p style="margin:0 0 6px;color:#64748b;font-size:14px;">${escapeHtml(greeting)}</p>
              <h1 style="margin:0 0 12px;font-size:24px;color:#0f172a;line-height:1.3;">
                Votre site est en ligne 🎉
              </h1>
              <p style="margin:0;color:#475569;font-size:15px;line-height:1.6;">
                Excellente nouvelle — le site web de <strong>${escapeHtml(businessName)}</strong> est
                prêt et accessible en ligne dès maintenant.
              </p>
            </td>
          </tr>

          <!-- SITE URL -->
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #f1f5f9;">
              <h2 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">
                Votre site
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:14px 20px;">
                    <p style="margin:0 0 4px;font-size:12px;color:#16a34a;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">
                      En ligne ✓
                    </p>
                    <a href="${escapeHtml(siteUrl)}"
                       style="font-size:16px;font-weight:700;color:#0f172a;word-break:break-all;text-decoration:none;">
                      ${escapeHtml(siteUrl)}
                    </a>
                    <p style="margin:6px 0 0;font-size:12px;color:#64748b;">Livré le ${escapeHtml(deliveredDate)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${customMessage ? `
          <!-- MESSAGE PERSONNALISE -->
          <tr>
            <td style="padding:0 32px 24px;border-bottom:1px solid #f1f5f9;">
              <h2 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">
                Message de notre équipe
              </h2>
              <div style="border:1px solid #e2e8f0;border-radius:8px;padding:16px;background:#f8fafc;">
                <p style="margin:0;font-size:14px;color:#475569;white-space:pre-line;line-height:1.6;">${escapeHtml(customMessage)}</p>
              </div>
            </td>
          </tr>` : ''}

          ${usefulLinks.length > 0 ? `
          <!-- ACCES UTILES -->
          <tr>
            <td style="padding:${customMessage ? '0' : '0'} 32px 24px;border-bottom:1px solid #f1f5f9;">
              <h2 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">
                Vos accès
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                ${usefulLinks.map((link, i) => `
                <tr style="background:${i % 2 === 0 ? '#f8fafc' : '#ffffff'};">
                  <td style="padding:10px 16px;font-size:13px;color:#64748b;width:40%;${i > 0 ? 'border-top:1px solid #f1f5f9;' : ''}">${escapeHtml(link.label)}</td>
                  <td style="padding:10px 16px;font-size:13px;${i > 0 ? 'border-top:1px solid #f1f5f9;' : ''}">
                    <a href="${escapeHtml(link.url)}" style="color:#2563eb;word-break:break-all;">${escapeHtml(link.url)}</a>
                  </td>
                </tr>`).join('')}
              </table>
            </td>
          </tr>` : ''}

          <!-- DOCUMENTS JOINTS -->
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #f1f5f9;">
              <h2 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">
                Documents joints
              </h2>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#475569;">
                    📄 <strong>Guide client</strong> — Comment gérer et faire évoluer votre site
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#475569;">
                    💰 <strong>Grille tarifaire</strong> — Ajouts, évolutions et maintenance
                  </td>
                </tr>
              </table>
              <p style="margin:10px 0 0;font-size:13px;color:#94a3b8;">
                Ces documents sont aussi disponibles en ligne :
                <a href="${escapeHtml(appUrl)}/api/pdfs/guide-client" style="color:#64748b;">Guide client</a>
                &nbsp;·&nbsp;
                <a href="${escapeHtml(appUrl)}/api/pdfs/grille-tarifaire" style="color:#64748b;">Grille tarifaire</a>
              </p>
            </td>
          </tr>

          <!-- RAPPEL CORRECTION -->
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #f1f5f9;background:#fffbeb;">
              <p style="margin:0;font-size:14px;color:#92400e;line-height:1.6;">
                💡 <strong>Rappel :</strong> Une correction mineure est incluse dans votre offre.
                Répondez à cet email en précisant la modification souhaitée.
              </p>
            </td>
          </tr>

          <!-- SUPPORT -->
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #f1f5f9;">
              <h2 style="margin:0 0 14px;font-size:15px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">
                Besoin d&apos;aide ou d&apos;une évolution ?
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0 8px;">
                ${whatsappUrl ? `
                <tr>
                  <td>
                    <a href="${escapeHtml(whatsappUrl)}"
                       style="display:inline-block;background:#25d366;color:#ffffff;font-size:14px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;">
                      💬 Écrire sur WhatsApp
                    </a>
                  </td>
                </tr>` : ''}
                <tr>
                  <td style="${whatsappUrl ? 'padding-top:8px;' : ''}">
                    <a href="${escapeHtml(calendlyUrl)}"
                       style="display:inline-block;background:#0f172a;color:#ffffff;font-size:14px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;">
                      📅 Réserver un appel gratuit (30 min)
                    </a>
                  </td>
                </tr>
                ${supportEmail ? `
                <tr>
                  <td style="padding-top:8px;font-size:14px;color:#475569;">
                    📧&nbsp;
                    <a href="mailto:${escapeHtml(supportEmail)}" style="color:#0f172a;font-weight:600;">
                      ${escapeHtml(supportEmail)}
                    </a>
                  </td>
                </tr>` : ''}
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 32px;text-align:center;">
              <p style="margin:0 0 4px;font-size:14px;color:#475569;">
                Merci pour votre confiance,<br />
                <strong>KR Global Solutions LTD</strong>
              </p>
              <p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">
                Référence : ${escapeHtml(brief.id)} · ${escapeHtml(customerEmail)}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    greeting,
    '',
    `Votre site est en ligne : ${siteUrl}`,
    `Livré le : ${deliveredDate}`,
    '',
    ...(customMessage ? ['Message de notre équipe :', customMessage, ''] : []),
    ...(usefulLinks.length > 0 ? ['Vos accès :', ...usefulLinks.map(l => `- ${l.label} : ${l.url}`), ''] : []),
    'Documents joints :',
    '- Guide client : Comment gérer et faire évoluer votre site',
    '- Grille tarifaire : Ajouts, évolutions et maintenance',
    '',
    'Rappel : une correction mineure est incluse. Répondez à cet email.',
    '',
    'Support :',
    ...(whatsappUrl ? [`WhatsApp : ${whatsappUrl}`] : []),
    `Calendly (appel gratuit) : ${calendlyUrl}`,
    ...(supportEmail ? [`Email : ${supportEmail}`] : []),
    '',
    `Référence : ${brief.id}`,
    '',
    'Merci pour votre confiance,',
    'KR Global Solutions LTD'
  ].join('\n');

  return { subject, html, text };
}
