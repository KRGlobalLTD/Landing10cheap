import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getStripeServerClient } from '@/lib/stripe';
import { SITEASY_PAYMENT, PAYMENT_METADATA } from '@/lib/constants/payment';
import { captureApiException } from '@/lib/monitoring/sentry';

export const runtime = 'nodejs';

const payloadSchema = z.object({
  customerEmail: z.string().trim().email().optional(),
  businessName: z.string().trim().min(1).max(120).optional(),
  briefId: z.string().trim().uuid().optional(), // FIXED: accept briefId from checkout page to embed in Stripe metadata
});

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const parsed = payloadSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Payload invalide.' }, { status: 400 });
    }

    const { customerEmail, businessName, briefId } = parsed.data;
    const stripe = getStripeServerClient();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: SITEASY_PAYMENT.amountInCents,
      currency: SITEASY_PAYMENT.currency,
      receipt_email: customerEmail,
      metadata: {
        ...PAYMENT_METADATA,
        customerEmail: customerEmail ?? '',
        businessName: businessName ?? '',
        briefId: briefId ?? '', // FIXED: briefId in Stripe metadata — webhook reads it to retrieve the full brief
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    captureApiException(error, { route: '/api/create-payment-intent', feature: 'stripe_payment_intent' });
    console.error('[create-payment-intent] Error', error);
    return NextResponse.json({ error: 'Erreur serveur lors de la création du paiement.' }, { status: 500 });
  }
}
