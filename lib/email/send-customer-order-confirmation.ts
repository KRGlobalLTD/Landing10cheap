import { sendEmailWithResend } from '@/lib/email/resend';
import { buildCustomerOrderConfirmationEmailTemplate } from '@/lib/email/templates/customer-order-confirmation-email';
import type { BriefRecord } from '@/lib/types/brief';
import type { OrderRecord } from '@/lib/types/order';

function getRequiredEnvironmentVariable(name: 'NEXT_PUBLIC_APP_URL') {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }

  return value;
}

function buildAbsoluteUrl(baseUrl: string, path: string) {
  return `${baseUrl.replace(/\/$/, '')}${path}`;
}

function getCustomerSupportChannels() {
  return {
    email: process.env.CUSTOMER_SUPPORT_EMAIL || undefined,
    whatsapp: process.env.CUSTOMER_SUPPORT_WHATSAPP || undefined
  };
}

function resolveCustomerEmail(brief: BriefRecord, order: OrderRecord) {
  const briefEmail = brief.customer.email?.trim();

  if (briefEmail) {
    return briefEmail;
  }

  const orderEmail = order.customerEmail?.trim();

  if (orderEmail) {
    return orderEmail;
  }

  return null;
}

export async function sendCustomerOrderConfirmationEmail(params: { brief: BriefRecord; order: OrderRecord }) {
  const { brief, order } = params;

  const customerEmail = resolveCustomerEmail(brief, order);

  if (!customerEmail) {
    throw new Error(`Cannot send customer confirmation email without customer email (session: ${order.stripeSessionId}).`);
  }

  const baseUrl = getRequiredEnvironmentVariable('NEXT_PUBLIC_APP_URL');
  const support = getCustomerSupportChannels();

  const template = buildCustomerOrderConfirmationEmailTemplate({
    brief,
    order,
    confirmedAt: brief.payment.paidAt || order.paidAt || new Date().toISOString(),
    customerEmail,
    support,
    links: {
      homeUrl: buildAbsoluteUrl(baseUrl, '/'),
      supportUrl: buildAbsoluteUrl(baseUrl, '/support')
    }
  });

  return sendEmailWithResend({
    to: customerEmail,
    subject: template.subject,
    html: template.html,
    text: template.text
  });
}
