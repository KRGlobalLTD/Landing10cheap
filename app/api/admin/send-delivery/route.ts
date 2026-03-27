import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendCustomerDeliveryEmail } from '@/lib/email/send-customer-delivery-email'; // FIXED: migrated from inline HTML to shared function
import { withDefaultBriefDelivery } from '@/lib/types/delivery'; // FIXED: migrated from inline HTML to shared function
import type { BriefRecord } from '@/lib/types/brief'; // FIXED: migrated from inline HTML to shared function
import { getSupabaseServerClient } from '@/lib/supabase';
import { captureApiException } from '@/lib/monitoring/sentry';

export const runtime = 'nodejs';

const deliverySchema = z.object({
  order_number: z.string().trim().min(1),
  customer_email: z.string().trim().email(),
  customer_name: z.string().trim().min(1).max(100),
  site_url: z.string().trim().url()
});

function getAdminSecret() {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error('Missing ADMIN_SECRET environment variable.');
  return secret;
}

// FIXED: same validation pattern as other email functions (send-customer-order-confirmation, send-internal-order-email)
function getRequiredEnvironmentVariable(name: 'NEXT_PUBLIC_APP_URL') {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }
  return value;
}

function verifyAdminSecret(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, '');
    return token === getAdminSecret();
  }
  return false;
}

async function markOrderDelivered(orderNumber: string) {
  try {
    const supabase = getSupabaseServerClient();
    await supabase
      .from('order_records')
      .update({ delivery_status: 'delivered' })
      .eq('order_number', orderNumber);
  } catch (error) {
    console.error(`[send-delivery] Could not update delivery_status for ${orderNumber}.`, error);
  }
}

export async function POST(request: Request) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    getRequiredEnvironmentVariable('NEXT_PUBLIC_APP_URL'); // FIXED: validate env var before sending email

    const body = await request.json();
    const parsed = deliverySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Payload invalide.', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { order_number, customer_email, customer_name, site_url } = parsed.data;

    // FIXED: build minimal BriefRecord so sendCustomerDeliveryEmail can use the shared template
    // Only customer.fullName, customer.email and id are used by the template; all other fields default to empty
    const minimalBrief: BriefRecord = {
      id: order_number,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'delivered',
      source: 'admin',
      customer: { fullName: customer_name, email: customer_email, phoneOrWhatsapp: '' },
      business: { businessName: '', activityType: '', activityDescription: '', mainGoal: '', targetAudience: '' },
      offer: { mainOffer: '', showPrice: '', mainCTA: '', secondaryServices: '' },
      design: { desiredStyle: '', desiredColors: '', inspirationSite1: '', inspirationSite2: '', hasLogo: false, hasPhotos: false },
      content: { heroTitle: '', subtitle: '', keyArguments: '', hasTestimonials: false, wantsFAQ: false, mandatoryInformation: '' },
      contact: { publicEmail: '', publicPhone: '', publicWhatsapp: '', instagramUrl: '', facebookUrl: '', tiktokUrl: '', hasExistingDomain: false, desiredDomain: '' },
      assets: { logoFileNames: [], photoFileNames: [] },
      payment: { stripeSessionId: null, paymentStatus: 'paid', amountTotal: null, currency: null, paidAt: null },
      delivery: withDefaultBriefDelivery()
    };

    const delivery = withDefaultBriefDelivery({ siteUrl: site_url });

    // FIXED: sendCustomerDeliveryEmail handles PDF generation, HTML template, and plain-text body internally
    await sendCustomerDeliveryEmail({
      brief: minimalBrief,
      delivery,
      customerEmail: customer_email,
      deliveredAt: new Date().toISOString()
    });

    // Update delivery status asynchronously (non-blocking)
    void markOrderDelivered(order_number);

    console.info(`[send-delivery] Delivery email sent to ${customer_email} for order ${order_number}.`);

    return NextResponse.json({ success: true, order_number, customer_email });
  } catch (error) {
    captureApiException(error, { route: '/api/admin/send-delivery', feature: 'admin_delivery' });
    console.error('[send-delivery] Failed.', error);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
