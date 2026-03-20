export type BriefDelivery = {
  siteUrl: string;
  adminUrl: string;
  githubUrl: string;
  vercelUrl: string;
  supportEmail: string;
  supportWhatsapp: string;
  customMessage: string;
  deliveredAt: string | null;
  deliveryEmailSentAt: string | null;
};

export const EMPTY_BRIEF_DELIVERY: BriefDelivery = {
  siteUrl: '',
  adminUrl: '',
  githubUrl: '',
  vercelUrl: '',
  supportEmail: '',
  supportWhatsapp: '',
  customMessage: '',
  deliveredAt: null,
  deliveryEmailSentAt: null
};

export function withDefaultBriefDelivery(delivery?: Partial<BriefDelivery> | null): BriefDelivery {
  return {
    ...EMPTY_BRIEF_DELIVERY,
    ...delivery
  };
}
