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
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Paris'
  });
}

function getFirstName(fullName: string | null | undefined) {
  const cleanName = normalizeValue(fullName, '').trim();
  if (!cleanName) {
    return null;
  }

  return cleanName.split(/\s+/)[0] || null;
}

export function buildCustomerOrderConfirmationEmailTemplate(
  payload: CustomerOrderConfirmationEmailPayload
): CustomerOrderConfirmationEmailTemplate {
  const { brief, customerEmail, confirmedAt, links, support } = payload;

  const firstName = getFirstName(brief.customer.fullName);
  const greetingName = firstName ? `${firstName},` : 'Bonjour,';
  const businessName = normalizeValue(brief.business.businessName);
  const confirmationDate = formatDisplayDate(confirmedAt);
  const reference = brief.id;
  const subject = 'Commande confirmée — Siteasy';

  const supportLines = [
    support.email ? `Email : ${support.email}` : null,
    support.whatsapp ? `WhatsApp : ${support.whatsapp}` : null
  ].filter((line): line is string => Boolean(line));

  const supportHtml = supportLines.length
    ? `<p style="margin:8px 0 0;color:#334155;font-size:14px;">${supportLines.map(escapeHtml).join('<br />')}</p>`
    : '<p style="margin:8px 0 0;color:#334155;font-size:14px;">Nous répondons rapidement depuis notre page support.</p>';

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;line-height:1.5;max-width:680px;margin:0 auto;padding:24px 16px;">
    <p style="margin:0 0 16px;font-size:15px;">${escapeHtml(greetingName)}</p>

    <h1 style="font-size:22px;margin:0 0 12px;">Merci, votre commande est bien confirmée ✅</h1>
    <p style="margin:0 0 16px;color:#334155;font-size:15px;">
      Nous avons bien reçu votre commande et votre paiement est validé. Notre équipe démarre la réalisation de votre landing page.
    </p>

    <div style="border:1px solid #e2e8f0;border-radius:12px;padding:16px;background:#f8fafc;">
      <h2 style="font-size:16px;margin:0 0 12px;">Résumé rapide</h2>
      <p style="margin:0 0 6px;font-size:14px;"><strong>Service :</strong> Landing page 1 page</p>
      <p style="margin:0 0 6px;font-size:14px;"><strong>Montant :</strong> 10 €</p>
      <p style="margin:0 0 6px;font-size:14px;"><strong>Livraison :</strong> en 30 secondes</p>
      <p style="margin:0 0 6px;font-size:14px;"><strong>Inclus :</strong> hébergement, mise en ligne, 1 correction mineure</p>
      <p style="margin:0 0 6px;font-size:14px;"><strong>Référence :</strong> ${escapeHtml(reference)}</p>
      <p style="margin:0 0 6px;font-size:14px;"><strong>Activité :</strong> ${escapeHtml(businessName)}</p>
      <p style="margin:0;font-size:14px;"><strong>Email :</strong> ${escapeHtml(customerEmail)}</p>
    </div>

    <h2 style="font-size:16px;margin:20px 0 8px;">Prochaines étapes</h2>
    <p style="margin:0 0 8px;color:#334155;font-size:14px;">
      Date de confirmation : ${escapeHtml(confirmationDate)}.
    </p>
    <p style="margin:0 0 8px;color:#334155;font-size:14px;">
      Nous préparons votre page immédiatement. Si une information manque dans votre brief, nous vous recontacterons rapidement.
    </p>

    <h2 style="font-size:16px;margin:20px 0 8px;">Support</h2>
    <p style="margin:0;color:#334155;font-size:14px;">
      Besoin d'aide ? Vous pouvez nous écrire ici :
      <a href="${escapeHtml(links.supportUrl)}" style="color:#0f172a;">${escapeHtml(links.supportUrl)}</a>
    </p>
    ${supportHtml}

    <p style="margin:24px 0 0;color:#334155;font-size:14px;">
      Merci pour votre confiance,<br />
      Siteasy
    </p>

    <p style="margin:8px 0 0;color:#64748b;font-size:12px;">
      Site : <a href="${escapeHtml(links.homeUrl)}" style="color:#64748b;">${escapeHtml(links.homeUrl)}</a>
    </p>
  </div>
  `;

  const text = [
    greetingName,
    '',
    'Merci, votre commande est bien confirmée.',
    'Votre paiement est validé et votre landing page est prise en charge.',
    '',
    'Résumé rapide :',
    '- Service : Landing page 1 page',
    '- Montant : 10 €',
    '- Livraison : en 30 secondes',
    '- Inclus : hébergement, mise en ligne, 1 correction mineure',
    `- Référence : ${reference}`,
    `- Activité : ${businessName}`,
    `- Email : ${customerEmail}`,
    `- Date de confirmation : ${confirmationDate}`,
    '',
    'Prochaines étapes :',
    'Nous commençons immédiatement. Si des informations manquent, nous vous recontacterons.',
    '',
    `Support : ${links.supportUrl}`,
    ...supportLines,
    '',
    `Site : ${links.homeUrl}`,
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
