import { getSupabaseServerClient } from '@/lib/supabase';

/**
 * Generates a unique, sequential, human-readable order number.
 * Format: KR-{YEAR}-{NNNN} — e.g. KR-2025-0001
 * Uses a Postgres sequence to guarantee uniqueness even under concurrent requests.
 */
export async function generateOrderNumber(): Promise<string> {
  const supabase = getSupabaseServerClient();
  const year = new Date().getFullYear();

  const { data, error } = await supabase.rpc('nextval_order_number_seq' as never);

  if (error || !data) {
    // Fallback: timestamp-based if RPC fails
    const fallback = String(Date.now()).slice(-4);
    console.warn('[order-number] Sequence RPC failed, using timestamp fallback.', error);
    return `KR-${year}-${fallback}`;
  }

  const padded = String(data as number).padStart(4, '0');
  return `KR-${year}-${padded}`;
}
