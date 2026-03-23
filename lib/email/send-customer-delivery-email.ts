import { sendEmailWithResend } from '@/lib/email/resend';
import { buildCustomerDeliveryEmailTemplate } from '@/lib/email/templates/customer-delivery-email';
import type { BriefRecord } from '@/lib/types/brief';
import type { BriefDelivery } from '@/lib/types/delivery';

function getCustomerSupportChannels() {
  return {
    email: process.env.CUSTOMER_SUPPORT_EMAIL || undefined,
    whatsapp: process.env.CUSTOMER_SUPPORT_WHATSAPP || undefined
  };
}

export async function sendCustomerDeliveryEmail(params: {
  brief: BriefRecord;
  delivery: BriefDelivery;
  customerEmail: string;
  deliveredAt: string;
}) {
  const { brief, delivery, customerEmail, deliveredAt } = params;

  const template = buildCustomerDeliveryEmailTemplate({
    brief,
    delivery,
    customerEmail,
    deliveredAt,
    support: getCustomerSupportChannels()
  });

  return sendEmailWithResend({
    to: customerEmail,
    subject: template.subject,
    html: template.html,
    text: template.text
  });
}
