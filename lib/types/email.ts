import type { BriefRecord } from '@/lib/types/brief';
import type { BriefDelivery } from '@/lib/types/delivery';
import type { OrderRecord } from '@/lib/types/order';

export type EmailProvider = 'resend';

export type EmailAttachment = {
  filename: string;
  content: string; // base64-encoded
};

export type EmailSendPayload = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
};

export type EmailSendResult = {
  provider: EmailProvider;
  messageId: string;
};

export type InternalOrderEmailPayload = {
  brief: BriefRecord;
  order: OrderRecord;
  completionLevel: 'high' | 'medium' | 'low';
  warnings: string[];
  links: {
    briefUrl: string;
    promptUrl: string;
    pdfUrl: string;
  };
};

export type CustomerOrderConfirmationEmailPayload = {
  brief: BriefRecord;
  order: OrderRecord;
  confirmedAt: string;
  customerEmail: string;
  orderNumber: string;
  support: {
    email?: string;
    whatsapp?: string;
    calendly?: string;
  };
  links: {
    homeUrl: string;
    supportUrl: string;
  };
};

export type CustomerDeliveryEmailPayload = {
  brief: BriefRecord;
  delivery: BriefDelivery;
  customerEmail: string;
  deliveredAt: string;
  support: {
    email?: string;
    whatsapp?: string;
  };
};
