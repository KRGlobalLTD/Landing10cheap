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

function normalizeValue(value: string | null | undefined) {
  return (value ?? '').trim();
}

function formatDisplayDate(value: string) {
  return new Date(value).toLocaleString('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Paris'
  });
}

function getFirstName(fullName: string | null | undefined) {
  const cleanName = normalizeValue(fullName);

  if (!cleanName) {
    return null;
  }

  return cleanName.split(/\s+/)[0] || null;
}

function buildUsefulLinks(payload: CustomerDeliveryEmailPayload) {
  const { delivery } = payload;

  return [
    { label: 'Accès admin', value: normalizeValue(delivery.adminUrl) },
    { label: 'Dépôt GitHub', value: normalizeValue(delivery.githubUrl) },
    { label: 'Projet Vercel', value: normalizeValue(delivery.vercelUrl) }
  ].filter((item) => item.value.length > 0);
}

export function buildCustomerDeliveryEmailTemplate(payload: CustomerDeliveryEmailPayload): CustomerDeliveryEmailTemplate {
  const { brief, delivery, customerEmail, deliveredAt } = payload;

  const firstName = getFirstName(brief.customer.fullName);
  const greetingName = firstName ? `${firstName},` : 'Bonjour,';
  const businessName = normalizeValue(brief.business.businessName) || 'votre activité';
  const deliveredDate = formatDisplayDate(deliveredAt);
  const mainSiteUrl = normalizeValue(delivery.siteUrl);
  const supportEmail = normalizeValue(delivery.supportEmail) || payload.support.email || '';
  const supportWhatsapp = normalizeValue(delivery.supportWhatsapp) || payload.support.whatsapp || '';
  const customMessage = normalizeValue(delivery.customMessage);
  const usefulLinks = buildUsefulLinks(payload);

  const subject = 'Votre landing page est prête ✅';

  const usefulLinksHtml = usefulLinks.length
    ? `<ul style="margin:8px 0 0;padding-left:18px;color:#334155;font-size:14px;">
        ${usefulLinks
          .map((item) => `<li style="margin:0 0 6px;"><strong>${escapeHtml(item.label)} :</strong> <a href="${escapeHtml(item.value)}" style="color:#0f172a;">${escapeHtml(item.value)}</a></li>`)
          .join('')}
      </ul>`
    : '<p style="margin:8px 0 0;color:#334155;font-size:14px;">Aucun lien additionnel n’est nécessaire pour le moment.</p>';

  const supportLines = [
    supportEmail ? `Email : ${supportEmail}` : null,
    supportWhatsapp ? `WhatsApp : ${supportWhatsapp}` : null
  ].filter((line): line is string => Boolean(line));

  const supportHtml = supportLines.length
    ? `<p style="margin:8px 0 0;color:#334155;font-size:14px;">${supportLines.map(escapeHtml).join('<br />')}</p>`
    : '<p style="margin:8px 0 0;color:#334155;font-size:14px;">Répondez simplement à cet email si vous avez besoin de nous.</p>';

  const customMessageHtml = customMessage
    ? `<div style="border:1px solid #e2e8f0;border-radius:10px;padding:14px;background:#ffffff;margin-top:10px;"><p style="margin:0;color:#334155;font-size:14px;white-space:pre-line;">${escapeHtml(customMessage)}</p></div>`
    : '';

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;line-height:1.5;max-width:680px;margin:0 auto;padding:24px 16px;">
    <p style="margin:0 0 16px;font-size:15px;">${escapeHtml(greetingName)}</p>

    <h1 style="font-size:22px;margin:0 0 12px;">Votre landing page est en ligne 🎉</h1>
    <p style="margin:0 0 16px;color:#334155;font-size:15px;">
      Bonne nouvelle : la landing page pour <strong>${escapeHtml(businessName)}</strong> est prête.
    </p>

    <div style="border:1px solid #e2e8f0;border-radius:12px;padding:16px;background:#f8fafc;">
      <h2 style="font-size:16px;margin:0 0 10px;">Lien principal</h2>
      <p style="margin:0;font-size:14px;">
        <a href="${escapeHtml(mainSiteUrl)}" style="color:#0f172a;font-weight:700;">${escapeHtml(mainSiteUrl)}</a>
      </p>
      <p style="margin:8px 0 0;color:#475569;font-size:13px;">Livrée le ${escapeHtml(deliveredDate)}.</p>
    </div>

    <h2 style="font-size:16px;margin:20px 0 8px;">Accès utiles</h2>
    ${usefulLinksHtml}

    <h2 style="font-size:16px;margin:20px 0 8px;">Rappel important</h2>
    <p style="margin:0;color:#334155;font-size:14px;">
      Une correction mineure est incluse. Répondez à cet email avec la modification souhaitée et nous nous en occupons rapidement.
    </p>

    <h2 style="font-size:16px;margin:20px 0 8px;">Support</h2>
    ${supportHtml}

    ${customMessageHtml}

    <p style="margin:24px 0 0;color:#334155;font-size:14px;">
      Merci pour votre confiance,<br />
      Siteasy
    </p>

    <p style="margin:8px 0 0;color:#64748b;font-size:12px;">Référence projet : ${escapeHtml(brief.id)}</p>
    <p style="margin:4px 0 0;color:#64748b;font-size:12px;">Email client : ${escapeHtml(customerEmail)}</p>
  </div>
  `;

  const text = [
    greetingName,
    '',
    'Votre landing page est en ligne.',
    `La landing page pour ${businessName} est prête.`,
    '',
    'Lien principal :',
    mainSiteUrl,
    `Livrée le : ${deliveredDate}`,
    '',
    'Accès utiles :',
    ...usefulLinks.map((item) => `- ${item.label} : ${item.value}`),
    ...(usefulLinks.length === 0 ? ['- Aucun lien additionnel pour le moment.'] : []),
    '',
    'Rappel : une correction mineure est incluse.',
    'Répondez à cet email avec la modification souhaitée.',
    '',
    'Support :',
    ...supportLines,
    ...(supportLines.length === 0 ? ['Répondez simplement à cet email si besoin.'] : []),
    ...(customMessage ? ['', 'Message personnalisé :', customMessage] : []),
    '',
    `Référence projet : ${brief.id}`,
    `Email client : ${customerEmail}`,
    '',
    'Merci pour votre confiance,',
    'Siteasy'
  ].join('\n');

  return {
    subject,
    html,
    text
  };
}
