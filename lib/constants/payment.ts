export const LANDING_EXPRESS_PAYMENT = {
  amountInCents: 1000,
  currency: 'eur',
  name: 'Landing Express 10€',
  description: 'Landing page 1 page livrée sous 24h avec hébergement inclus'
} as const;

export const PAYMENT_METADATA = {
  source: 'landing-express',
  product: 'landing-page-cheap'
} as const;
