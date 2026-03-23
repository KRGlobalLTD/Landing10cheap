import { randomUUID } from 'node:crypto';
import { getSupabaseServerClient } from '@/lib/supabase';
import type { CreateOrderInput, OrderNotifications, OrderRecord } from '@/lib/types/order';

type OrderRow = {
  id: string;
  stripe_session_id: string;
  payment_intent_id: string | null;
  status: string;
  product: string;
  amount_total: number;
  currency: string;
  customer_email: string | null;
  business_name: string | null;
  source: string;
  created_at: string;
  paid_at: string | null;
  metadata: Record<string, string>;
  notifications: OrderNotifications;
};

function rowToRecord(row: OrderRow): OrderRecord {
  return {
    id: row.id,
    stripeSessionId: row.stripe_session_id,
    paymentIntentId: row.payment_intent_id,
    status: row.status as OrderRecord['status'],
    product: row.product,
    amountTotal: row.amount_total,
    currency: row.currency,
    customerEmail: row.customer_email,
    businessName: row.business_name,
    source: row.source,
    createdAt: row.created_at,
    paidAt: row.paid_at,
    metadata: row.metadata ?? {},
    notifications: row.notifications ?? {}
  };
}

export async function getOrderByStripeSessionId(stripeSessionId: string): Promise<OrderRecord | null> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from('order_records')
    .select()
    .eq('stripe_session_id', stripeSessionId)
    .maybeSingle();

  if (error) throw new Error(`[orders] getOrderByStripeSessionId: ${error.message}`);
  return data ? rowToRecord(data as OrderRow) : null;
}

export async function saveOrder(input: CreateOrderInput): Promise<{ order: OrderRecord; created: boolean }> {
  const supabase = getSupabaseServerClient();

  const existing = await getOrderByStripeSessionId(input.stripeSessionId);
  if (existing) return { order: existing, created: false };

  const { data, error } = await supabase
    .from('order_records')
    .insert({
      id: randomUUID(),
      stripe_session_id: input.stripeSessionId,
      payment_intent_id: input.paymentIntentId,
      status: input.status,
      product: input.product,
      amount_total: input.amountTotal,
      currency: input.currency,
      customer_email: input.customerEmail,
      business_name: input.businessName,
      source: input.source,
      created_at: input.createdAt ?? new Date().toISOString(),
      paid_at: input.paidAt,
      metadata: input.metadata ?? {},
      notifications: {}
    })
    .select()
    .single();

  if (error) throw new Error(`[orders] saveOrder: ${error.message}`);
  return { order: rowToRecord(data as OrderRow), created: true };
}

export async function markInternalOrderEmailSent(params: { stripeSessionId: string; messageId: string }) {
  const supabase = getSupabaseServerClient();

  const existing = await getOrderByStripeSessionId(params.stripeSessionId);
  if (!existing) return null;

  const notifications: OrderNotifications = {
    ...existing.notifications,
    internalOrderEmail: { sentAt: new Date().toISOString(), messageId: params.messageId }
  };

  const { data, error } = await supabase
    .from('order_records')
    .update({ notifications })
    .eq('stripe_session_id', params.stripeSessionId)
    .select()
    .single();

  if (error) throw new Error(`[orders] markInternalOrderEmailSent: ${error.message}`);
  return rowToRecord(data as OrderRow);
}

export async function markCustomerOrderConfirmationEmailSent(params: { stripeSessionId: string; messageId: string }) {
  const supabase = getSupabaseServerClient();

  const existing = await getOrderByStripeSessionId(params.stripeSessionId);
  if (!existing) return null;

  const notifications: OrderNotifications = {
    ...existing.notifications,
    customerOrderConfirmationEmail: { sentAt: new Date().toISOString(), messageId: params.messageId }
  };

  const { data, error } = await supabase
    .from('order_records')
    .update({ notifications })
    .eq('stripe_session_id', params.stripeSessionId)
    .select()
    .single();

  if (error) throw new Error(`[orders] markCustomerOrderConfirmationEmailSent: ${error.message}`);
  return rowToRecord(data as OrderRow);
}

export const ordersRepository = {
  getOrderByStripeSessionId,
  saveOrder,
  markInternalOrderEmailSent,
  markCustomerOrderConfirmationEmailSent
};
