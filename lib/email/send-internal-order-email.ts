import { mapBriefToInternalBrief } from '@/lib/mappers/brief-to-internal-brief';
import type { BriefRecord } from '@/lib/types/brief';
import type { OrderRecord } from '@/lib/types/order';
import { sendEmailWithResend } from '@/lib/email/resend';
import { buildInternalOrderEmailTemplate } from '@/lib/email/templates/internal-order-email';
import { updateBrief } from '@/lib/briefs'; // FIXED: import pour sauvegarder CLIENT.md dans brief.internalNotes

function getRequiredEnvironmentVariable(name: 'INTERNAL_NOTIFICATION_EMAIL' | 'NEXT_PUBLIC_APP_URL') {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }

  return value;
}

function buildAbsoluteUrl(baseUrl: string, path: string) {
  return `${baseUrl.replace(/\/$/, '')}${path}`;
}

export async function sendInternalOrderEmail(params: { brief: BriefRecord | null; order: OrderRecord }) { // FIXED: brief is nullable when payment happens without a Supabase brief
  const { brief, order } = params;
  const baseUrl = getRequiredEnvironmentVariable('NEXT_PUBLIC_APP_URL');
  const to = getRequiredEnvironmentVariable('INTERNAL_NOTIFICATION_EMAIL');

  // FIXED: only map brief when it exists — new PaymentIntent flow has no brief
  const internalBrief = brief ? mapBriefToInternalBrief(brief) : null;
  const links = brief ? { // FIXED: only build brief links when brief exists
    briefUrl: buildAbsoluteUrl(baseUrl, `/briefs/${brief.id}`),
    promptUrl: buildAbsoluteUrl(baseUrl, `/briefs/${brief.id}/prompt`),
    pdfUrl: buildAbsoluteUrl(baseUrl, `/api/briefs/${brief.id}/pdf`)
  } : { briefUrl: '', promptUrl: '', pdfUrl: '' };

  const template = buildInternalOrderEmailTemplate({
    brief,
    order,
    completionLevel: internalBrief?.summary.completionLevel ?? 'low', // FIXED: fallback when no brief
    warnings: internalBrief?.warnings ?? [], // FIXED: fallback when no brief
    links
  });

  // FIXED: sauvegarde du CLIENT.md dans brief.internalNotes pour accès depuis l'admin
  if (brief && template.clientMd) {
    try {
      await updateBrief(brief.id, { internalNotes: template.clientMd });
      console.info(`[brief] CLIENT.md saved to brief.internalNotes for brief ${brief.id}.`);
    } catch (error) {
      console.warn(`[brief] Failed to save CLIENT.md to internalNotes for brief ${brief.id}.`, error);
    }
  }

  return sendEmailWithResend({
    to,
    subject: template.subject,
    html: template.html,
    text: template.text
  });
}
