import type { InternalOrderEmailPayload } from '@/lib/types/email';

type InternalOrderEmailTemplate = {
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

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;border:1px solid #e2e8f0;vertical-align:top;word-break:break-word;">${escapeHtml(value)}</td>
  </tr>`;
}

function linkRow(label: string, href: string) {
  if (!href) return row(label, 'Non disponible');
  const safeHref = escapeHtml(href);
  return `<tr>
    <td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;border:1px solid #e2e8f0;vertical-align:top;"><a href="${safeHref}">${safeHref}</a></td>
  </tr>`;
}

function normalizeValue(value: string | null | undefined, fallback = 'Non renseigné') {
  const normalized = (value ?? '').trim();
  return normalized || fallback;
}

export function buildInternalOrderEmailTemplate(payload: InternalOrderEmailPayload): InternalOrderEmailTemplate {
  const { brief, order, links } = payload;

  // FIXED: handle null brief — new PaymentIntent flow has no Supabase brief
  const noBrief = !brief;

  const paidAt = brief?.payment.paidAt || order.paidAt || new Date().toISOString();
  const amount = order.amountTotal > 0
    ? `${(order.amountTotal / 100).toFixed(2)} ${(order.currency || 'eur').toUpperCase()}`
    : 'Non renseigné';
  const warnings = payload.warnings;

  // FIXED: resolve all values from brief when available, fallback to order fields when brief is null
  const clientName         = normalizeValue(brief?.customer.fullName);
  const clientEmail        = normalizeValue(brief?.customer.email, normalizeValue(order.customerEmail));
  const clientPhone        = normalizeValue(brief?.customer.phoneOrWhatsapp);
  const businessName       = normalizeValue(brief?.business.businessName, normalizeValue(order.businessName));
  const activityType       = normalizeValue(brief?.business.activityType);
  const activityDesc       = normalizeValue(brief?.business.activityDescription);
  const mainGoal           = normalizeValue(brief?.business.mainGoal);
  const targetAudience     = normalizeValue(brief?.business.targetAudience);
  const mainOffer          = normalizeValue(brief?.offer.mainOffer);
  const showPrice          = normalizeValue(brief?.offer.showPrice);
  const mainCTA            = normalizeValue(brief?.offer.mainCTA);
  const secondarySvcs      = normalizeValue(brief?.offer.secondaryServices);
  const desiredStyle       = normalizeValue(brief?.design.desiredStyle);
  const desiredColors      = normalizeValue(brief?.design.desiredColors);
  const inspiration1       = normalizeValue(brief?.design.inspirationSite1);
  const inspiration2       = normalizeValue(brief?.design.inspirationSite2);
  const hasLogo            = brief ? (brief.design.hasLogo ? 'Oui' : 'Non') : 'Non renseigné';
  const hasPhotos          = brief ? (brief.design.hasPhotos ? 'Oui' : 'Non') : 'Non renseigné';
  const heroTitle          = normalizeValue(brief?.content.heroTitle);
  const subtitle           = normalizeValue(brief?.content.subtitle);
  const keyArguments       = normalizeValue(brief?.content.keyArguments);
  const hasTestimonials    = brief ? (brief.content.hasTestimonials ? 'Oui' : 'Non') : 'Non renseigné';
  const wantsFAQ           = brief ? (brief.content.wantsFAQ ? 'Oui' : 'Non') : 'Non renseigné';
  const mandatoryInfo      = normalizeValue(brief?.content.mandatoryInformation);
  const publicContactEmail = normalizeValue(brief?.contact.publicEmail);
  const publicPhone        = normalizeValue(brief?.contact.publicPhone);
  const publicWhatsapp     = normalizeValue(brief?.contact.publicWhatsapp);
  const instagramUrl       = normalizeValue(brief?.contact.instagramUrl);
  const facebookUrl        = normalizeValue(brief?.contact.facebookUrl);
  const tiktokUrl          = normalizeValue(brief?.contact.tiktokUrl);
  const domainInfo         = brief
    ? (brief.contact.hasExistingDomain
        ? 'Domaine existant'
        : (brief.contact.desiredDomain.trim() ? `Souhaité : ${brief.contact.desiredDomain}` : 'Non défini'))
    : 'Non renseigné';
  const logoFiles          = brief?.assets.logoFileNames.join(', ') || 'Aucun';
  const photoFiles         = brief?.assets.photoFileNames.join(', ') || 'Aucun';

  const subject = noBrief // FIXED: explicit subject when brief is missing so it's visible in inbox
    ? `⚠️ Commande sans brief — ${clientEmail}`
    : 'Nouvelle commande payée — KR Global Solutions LTD';

  // FIXED: prompt block — always appended at the end of the email
  const promptLines = [
    '--- PROMPT GÉNÉRATION SITE ---',
    `Client : ${clientName}`,
    `Email : ${clientEmail}`,
    `Téléphone : ${clientPhone}`,
    `Activité : ${businessName}`,
    `Type d'activité : ${activityType}`,
    `Description activité : ${activityDesc}`,
    `Objectif principal : ${mainGoal}`,
    `Audience cible : ${targetAudience}`,
    `Offre principale : ${mainOffer}`,
    `Tarifs affichés : ${showPrice}`,
    `CTA principal : ${mainCTA}`,
    `Services secondaires : ${secondarySvcs}`,
    `Style souhaité : ${desiredStyle}`,
    `Couleurs souhaitées : ${desiredColors}`,
    `Logo fourni : ${hasLogo}`,
    `Photos fournies : ${hasPhotos}`,
    `Site inspiration 1 : ${inspiration1}`,
    `Site inspiration 2 : ${inspiration2}`,
    `Titre hero : ${heroTitle}`,
    `Sous-titre : ${subtitle}`,
    `Arguments clés : ${keyArguments}`,
    `Témoignages clients : ${hasTestimonials}`,
    `FAQ souhaitée : ${wantsFAQ}`,
    `Informations obligatoires : ${mandatoryInfo}`,
    `Email public : ${publicContactEmail}`,
    `Téléphone public : ${publicPhone}`,
    `WhatsApp public : ${publicWhatsapp}`,
    `Instagram : ${instagramUrl}`,
    `Facebook : ${facebookUrl}`,
    `TikTok : ${tiktokUrl}`,
    `Domaine : ${domainInfo}`,
    `Fichiers logo : ${logoFiles}`,
    `Fichiers photos : ${photoFiles}`,
    '--- FIN DU PROMPT ---'
  ].join('\n');

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;line-height:1.5;max-width:760px;margin:0 auto;padding:16px;">
    <h1 style="font-size:20px;margin:0 0 12px;">${noBrief ? '⚠️ Commande sans brief Supabase' : 'Nouvelle commande payée ✅'}</h1>
    <p style="margin:0 0 16px;">
      ${noBrief
        // FIXED: explicit warning when brief is null — was previously silently skipped
        ? '<strong style="color:#b45309;">Paiement reçu via PaymentIntent sans brief Supabase associé. Seules les données de l\'ordre sont disponibles. Contacter le client pour obtenir le brief complet.</strong>'
        : 'Paiement confirmé côté Stripe webhook. Vous pouvez lancer la production.'
      }
    </p>

    <h2 style="font-size:16px;margin:20px 0 8px;">Informations de commande</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">
      ${row('Statut paiement', 'Confirmé')}
      ${row('Montant', amount)}
      ${row('briefId', brief?.id ?? '— (aucun brief)')}
      ${row('stripeSessionId', order.stripeSessionId)}
      ${row('Date confirmation', paidAt)}
    </table>

    <h2 style="font-size:16px;margin:20px 0 8px;">Client</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">
      ${row('Nom client', clientName)}
      ${row('Email client', clientEmail)}
      ${row('Téléphone / WhatsApp', clientPhone)}
    </table>

    <h2 style="font-size:16px;margin:20px 0 8px;">Activité &amp; projet</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">
      ${row('Nom activité', businessName)}
      ${row("Type d'activité", activityType)}
      ${row('Description activité', activityDesc)}
      ${row('Objectif principal', mainGoal)}
      ${row('Audience cible', targetAudience)}
    </table>

    <h2 style="font-size:16px;margin:20px 0 8px;">Offre</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">
      ${row('Offre principale', mainOffer)}
      ${row('Tarifs affichés', showPrice)}
      ${row('CTA principal', mainCTA)}
      ${row('Services secondaires', secondarySvcs)}
    </table>

    <h2 style="font-size:16px;margin:20px 0 8px;">Design</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">
      ${row('Style souhaité', desiredStyle)}
      ${row('Couleurs souhaitées', desiredColors)}
      ${row('Logo fourni', hasLogo)}
      ${row('Photos fournies', hasPhotos)}
      ${row('Site inspiration 1', inspiration1)}
      ${row('Site inspiration 2', inspiration2)}
    </table>

    <h2 style="font-size:16px;margin:20px 0 8px;">Contenu</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">
      ${row('Titre hero', heroTitle)}
      ${row('Sous-titre', subtitle)}
      ${row('Arguments clés', keyArguments)}
      ${row('Témoignages', hasTestimonials)}
      ${row('FAQ souhaitée', wantsFAQ)}
      ${row('Infos obligatoires', mandatoryInfo)}
    </table>

    <h2 style="font-size:16px;margin:20px 0 8px;">Contact public</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">
      ${row('Email public', publicContactEmail)}
      ${row('Téléphone public', publicPhone)}
      ${row('WhatsApp public', publicWhatsapp)}
      ${row('Instagram', instagramUrl)}
      ${row('Facebook', facebookUrl)}
      ${row('TikTok', tiktokUrl)}
      ${row('Domaine', domainInfo)}
    </table>

    <h2 style="font-size:16px;margin:20px 0 8px;">Assets</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">
      ${row('Fichiers logo', logoFiles)}
      ${row('Fichiers photos', photoFiles)}
    </table>

    <h2 style="font-size:16px;margin:20px 0 8px;">Qualité des infos</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">
      ${row('Niveau de complétude', payload.completionLevel)}
      ${row('Warnings principaux', warnings.length > 0 ? warnings.join(' | ') : 'Aucun warning explicite')}
    </table>

    ${links.briefUrl ? `
    <h2 style="font-size:16px;margin:20px 0 8px;">Liens utiles</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">
      ${linkRow('Brief interne', links.briefUrl)}
      ${linkRow('Prompt de production', links.promptUrl)}
      ${linkRow('PDF brief', links.pdfUrl)}
    </table>` : ''}

    <h2 style="font-size:16px;margin:20px 0 8px;">Prompt prêt à copier-coller</h2>
    <pre style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:16px;font-size:13px;line-height:1.6;white-space:pre-wrap;word-break:break-word;font-family:monospace;">${escapeHtml(promptLines)}</pre>
  </div>
  `;

  const textLines = [
    subject,
    '',
    noBrief ? '⚠️ ATTENTION : Paiement sans brief Supabase — seules les données ordre sont disponibles.' : '',
    '',
    '=== COMMANDE ===',
    'Statut paiement: Confirmé',
    `Montant: ${amount}`,
    `briefId: ${brief?.id ?? '(aucun brief)'}`,
    `stripeSessionId: ${order.stripeSessionId}`,
    `Date confirmation: ${paidAt}`,
    '',
    '=== CLIENT ===',
    `Nom client: ${clientName}`,
    `Email client: ${clientEmail}`,
    `Téléphone / WhatsApp: ${clientPhone}`,
    '',
    '=== ACTIVITÉ & PROJET ===',
    `Nom activité: ${businessName}`,
    `Type d'activité: ${activityType}`,
    `Description activité: ${activityDesc}`,
    `Objectif principal: ${mainGoal}`,
    `Audience cible: ${targetAudience}`,
    '',
    '=== OFFRE ===',
    `Offre principale: ${mainOffer}`,
    `Tarifs affichés: ${showPrice}`,
    `CTA principal: ${mainCTA}`,
    `Services secondaires: ${secondarySvcs}`,
    '',
    '=== DESIGN ===',
    `Style souhaité: ${desiredStyle}`,
    `Couleurs souhaitées: ${desiredColors}`,
    `Logo fourni: ${hasLogo}`,
    `Photos fournies: ${hasPhotos}`,
    `Site inspiration 1: ${inspiration1}`,
    `Site inspiration 2: ${inspiration2}`,
    '',
    '=== CONTENU ===',
    `Titre hero: ${heroTitle}`,
    `Sous-titre: ${subtitle}`,
    `Arguments clés: ${keyArguments}`,
    `Témoignages: ${hasTestimonials}`,
    `FAQ souhaitée: ${wantsFAQ}`,
    `Infos obligatoires: ${mandatoryInfo}`,
    '',
    '=== CONTACT PUBLIC ===',
    `Email public: ${publicContactEmail}`,
    `Téléphone public: ${publicPhone}`,
    `WhatsApp public: ${publicWhatsapp}`,
    `Instagram: ${instagramUrl}`,
    `Facebook: ${facebookUrl}`,
    `TikTok: ${tiktokUrl}`,
    `Domaine: ${domainInfo}`,
    '',
    '=== ASSETS ===',
    `Fichiers logo: ${logoFiles}`,
    `Fichiers photos: ${photoFiles}`,
    '',
    '=== QUALITÉ DES INFOS ===',
    `Niveau de complétude: ${payload.completionLevel}`,
    `Warnings principaux: ${warnings.length > 0 ? warnings.join(' | ') : 'Aucun warning explicite'}`,
    '',
    ...(links.briefUrl ? [
      '=== LIENS UTILES ===',
      `Brief interne: ${links.briefUrl}`,
      `Prompt de production: ${links.promptUrl}`,
      `PDF brief: ${links.pdfUrl}`,
      ''
    ] : []),
    promptLines
  ].filter((line) => line !== undefined).join('\n');

  return {
    subject,
    html,
    text: textLines
  };
}
