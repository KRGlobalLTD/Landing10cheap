import { sendEmailWithResend } from '@/lib/email/resend';
import { buildCustomerDeliveryEmailTemplate } from '@/lib/email/templates/customer-delivery-email';
import { generateGuideClientPdf } from '@/lib/pdf/documents/guide-client';
import { generateGrilleTarifairePdf } from '@/lib/pdf/documents/grille-tarifaire';
import type { BriefRecord } from '@/lib/types/brief';
import type { BriefDelivery } from '@/lib/types/delivery';

function getCustomerSupportChannels() {
  return {
    email: process.env.CUSTOMER_SUPPORT_EMAIL || undefined,
    whatsapp: process.env.CUSTOMER_SUPPORT_WHATSAPP || undefined
  };
}

async function buildPdfAttachments() {
  try {
    const [guideBytes, grilleBytes] = await Promise.all([
      generateGuideClientPdf(),
      generateGrilleTarifairePdf()
    ]);

    return [
      {
        filename: 'guide-client-kr-global-solutions.pdf',
        content: Buffer.from(guideBytes).toString('base64')
      },
      {
        filename: 'grille-tarifaire-evolutions-site.pdf',
        content: Buffer.from(grilleBytes).toString('base64')
      }
    ];
  } catch (error) {
    console.error('[email] Failed to generate PDF attachments, sending without PDFs.', error);
    return [];
  }
}

export async function sendCustomerDeliveryEmail(params: {
  brief: BriefRecord;
  delivery: BriefDelivery;
  customerEmail: string;
  deliveredAt: string;
}) {
  const { brief, delivery, customerEmail, deliveredAt } = params;

  const [template, attachments] = await Promise.all([
    Promise.resolve(
      buildCustomerDeliveryEmailTemplate({
        brief,
        delivery,
        customerEmail,
        deliveredAt,
        support: getCustomerSupportChannels()
      })
    ),
    buildPdfAttachments()
  ]);

  return sendEmailWithResend({
    to: customerEmail,
    subject: template.subject,
    html: template.html,
    text: template.text,
    attachments
  });
}
