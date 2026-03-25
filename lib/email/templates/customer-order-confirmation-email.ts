import type { CustomerOrderConfirmationEmailPayload } from '@/lib/types/email';

type CustomerOrderConfirmationEmailTemplate = {
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

function normalizeValue(value: string | null | undefined, fallback = 'Non renseigné') {
  const normalized = (value ?? '').trim();
  return normalized || fallback;
}

function formatDisplayDate(value: string) {
  return new Date(value).toLocaleString('fr-FR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Paris'
  });
}

function formatAmount(amountInCents: number, currency: string) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(amountInCents / 100);
}

function getFirstName(fullName: string | null | undefined) {
  const cleanName = normalizeValue(fullName, '').trim();
  if (!cleanName) return null;
  return cleanName.split(/\s+/)[0] || null;
}

export function buildCustomerOrderConfirmationEmailTemplate(
  payload: CustomerOrderConfirmationEmailPayload
): CustomerOrderConfirmationEmailTemplate {
  const { brief, order, customerEmail, confirmedAt, orderNumber, links, support } = payload;

  const firstName = brief ? getFirstName(brief.customer.fullName) : null;
  const greeting = firstName ? `Bonjour ${firstName},` : 'Bonjour,';
  const businessName = brief
    ? normalizeValue(brief.business.businessName)
    : normalizeValue(order.businessName);
  const confirmationDate = formatDisplayDate(confirmedAt);
  const amountFormatted = formatAmount(order.amountTotal, order.currency);
  const subject = `Confirmation de votre commande — ${orderNumber}`;

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
              <h1 style="margin:0 0 12px;font-size:22px;color:#0f172a;line-height:1.3;">
                Votre commande est confirmée ✅
              </h1>
              <p style="margin:0;color:#475569;font-size:15px;line-height:1.6;">
                Merci pour votre confiance. Votre paiement a bien été reçu et notre équipe prend en charge
                la réalisation de votre site web immédiatement.
              </p>
            </td>
          </tr>

          <!-- ORDER SUMMARY -->
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #f1f5f9;">
              <h2 style="margin:0 0 16px;font-size:15px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">
                Récapitulatif de commande
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                <tr style="background:#f8fafc;">
                  <td style="padding:10px 16px;font-size:13px;color:#64748b;width:45%;">Numéro de commande</td>
                  <td style="padding:10px 16px;font-size:13px;font-weight:700;color:#0f172a;">
                    ${escapeHtml(orderNumber)}
                  </td>
                </tr>
                <tr style="background:#ffffff;">
                  <td style="padding:10px 16px;font-size:13px;color:#64748b;border-top:1px solid #f1f5f9;">Service</td>
                  <td style="padding:10px 16px;font-size:13px;color:#0f172a;border-top:1px solid #f1f5f9;">
                    Création de site web — 1 page
                  </td>
                </tr>
                <tr style="background:#f8fafc;">
                  <td style="padding:10px 16px;font-size:13px;color:#64748b;border-top:1px solid #f1f5f9;">Montant payé</td>
                  <td style="padding:10px 16px;font-size:13px;font-weight:700;color:#16a34a;border-top:1px solid #f1f5f9;">
                    ${escapeHtml(amountFormatted)} — Payé ✓
                  </td>
                </tr>
                <tr style="background:#ffffff;">
                  <td style="padding:10px 16px;font-size:13px;color:#64748b;border-top:1px solid #f1f5f9;">Inclus</td>
                  <td style="padding:10px 16px;font-size:13px;color:#0f172a;border-top:1px solid #f1f5f9;">
                    Hébergement · Mise en ligne · 1 correction
                  </td>
                </tr>
                <tr style="background:#f8fafc;">
                  <td style="padding:10px 16px;font-size:13px;color:#64748b;border-top:1px solid #f1f5f9;">Activité</td>
                  <td style="padding:10px 16px;font-size:13px;color:#0f172a;border-top:1px solid #f1f5f9;">
                    ${escapeHtml(businessName)}
                  </td>
                </tr>
                <tr style="background:#ffffff;">
                  <td style="padding:10px 16px;font-size:13px;color:#64748b;border-top:1px solid #f1f5f9;">Date de confirmation</td>
                  <td style="padding:10px 16px;font-size:13px;color:#0f172a;border-top:1px solid #f1f5f9;">
                    ${escapeHtml(confirmationDate)}
                  </td>
                </tr>
                <tr style="background:#f8fafc;">
                  <td style="padding:10px 16px;font-size:13px;color:#64748b;border-top:1px solid #f1f5f9;">Email</td>
                  <td style="padding:10px 16px;font-size:13px;color:#0f172a;border-top:1px solid #f1f5f9;">
                    ${escapeHtml(customerEmail)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- NEXT STEPS -->
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #f1f5f9;">
              <h2 style="margin:0 0 14px;font-size:15px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">
                Prochaines étapes
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;vertical-align:top;width:24px;font-size:14px;">1.</td>
                  <td style="padding:6px 0;font-size:14px;color:#475569;line-height:1.5;">
                    Notre équipe analyse votre brief et démarre la production de votre site.
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:top;font-size:14px;">2.</td>
                  <td style="padding:6px 0;font-size:14px;color:#475569;line-height:1.5;">
                    Vous recevrez un email de livraison avec l&apos;URL de votre site en ligne.
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:top;font-size:14px;">3.</td>
                  <td style="padding:6px 0;font-size:14px;color:#475569;line-height:1.5;">
                    Si des informations manquent, nous vous recontacterons rapidement.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SUPPORT -->
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #f1f5f9;">
              <h2 style="margin:0 0 14px;font-size:15px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">
                Besoin d&apos;aide ?
              </h2>
              <p style="margin:0 0 12px;font-size:14px;color:#475569;line-height:1.6;">
                Notre équipe est disponible pour répondre à toutes vos questions.
              </p>
              <table cellpadding="0" cellspacing="0">
                ${support.email ? `
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#475569;">
                    📧&nbsp;
                    <a href="mailto:${escapeHtml(support.email)}" style="color:#0f172a;text-decoration:none;font-weight:600;">
                      ${escapeHtml(support.email)}
                    </a>
                  </td>
                </tr>` : ''}
                ${support.whatsapp ? `
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#475569;">
                    💬&nbsp;
                    <a href="${escapeHtml(support.whatsapp)}" style="color:#16a34a;text-decoration:none;font-weight:600;">
                      WhatsApp — Réponse rapide
                    </a>
                  </td>
                </tr>` : ''}
                ${support.calendly ? `
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#475569;">
                    📅&nbsp;
                    <a href="${escapeHtml(support.calendly)}" style="color:#2563eb;text-decoration:none;font-weight:600;">
                      Réserver un appel de 30 min
                    </a>
                  </td>
                </tr>` : ''}
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 32px;text-align:center;">
              <p style="margin:0 0 4px;font-size:13px;color:#94a3b8;">
                <a href="${escapeHtml(links.homeUrl)}" style="color:#94a3b8;text-decoration:none;">
                  ${escapeHtml(links.homeUrl)}
                </a>
              </p>
              <p style="margin:0;font-size:12px;color:#cbd5e1;">
                KR Global Solutions LTD · Société enregistrée au Royaume-Uni
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
    'Votre commande est confirmée.',
    'Votre paiement a bien été reçu. Notre équipe démarre la réalisation de votre site web.',
    '',
    '--- RÉCAPITULATIF ---',
    `Numéro de commande : ${orderNumber}`,
    `Service            : Création de site web — 1 page`,
    `Montant payé       : ${amountFormatted} — Payé`,
    `Inclus             : Hébergement, mise en ligne, 1 correction`,
    `Activité           : ${businessName}`,
    `Confirmation       : ${confirmationDate}`,
    `Email              : ${customerEmail}`,
    '',
    '--- PROCHAINES ÉTAPES ---',
    '1. Notre équipe analyse votre brief et démarre la production.',
    '2. Vous recevrez un email de livraison avec l\'URL de votre site.',
    '3. Si des informations manquent, nous vous recontacterons.',
    '',
    '--- SUPPORT ---',
    ...(support.email ? [`Email : ${support.email}`] : []),
    ...(support.whatsapp ? [`WhatsApp : ${support.whatsapp}`] : []),
    ...(support.calendly ? [`Prendre un RDV : ${support.calendly}`] : []),
    '',
    `Site : ${links.homeUrl}`,
    '',
    'Merci pour votre confiance,',
    'KR Global Solutions LTD'
  ].join('\n');

  return { subject, html, text };
}
