import { randomUUID } from 'node:crypto';
import { getSupabaseServerClient } from '@/lib/supabase';
import { withDefaultBriefDelivery } from '@/lib/types/delivery';
import type { BriefRecord, CreateBriefInput, UpdateBriefInput } from '@/lib/types/brief';
import type { BriefStore } from '@/lib/storage/brief-store';

type BriefRow = {
  id: string;
  created_at: string;
  updated_at: string;
  status: string;
  source: string;
  customer: BriefRecord['customer'];
  business: BriefRecord['business'];
  offer: BriefRecord['offer'];
  design: BriefRecord['design'];
  content: BriefRecord['content'];
  contact: BriefRecord['contact'];
  assets: BriefRecord['assets'];
  payment: BriefRecord['payment'];
  delivery: Partial<BriefRecord['delivery']>;
  internal_notes: string | null;
};

function rowToRecord(row: BriefRow): BriefRecord {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    status: row.status as BriefRecord['status'],
    source: row.source,
    customer: row.customer,
    business: row.business,
    offer: row.offer,
    design: row.design,
    content: row.content,
    contact: row.contact,
    assets: row.assets,
    payment: row.payment,
    delivery: withDefaultBriefDelivery(row.delivery),
    internalNotes: row.internal_notes ?? undefined
  };
}

export function createSupabaseBriefStore(): BriefStore {
  return {
    async createBrief(input: CreateBriefInput): Promise<BriefRecord> {
      const supabase = getSupabaseServerClient();
      const now = new Date().toISOString();
      const id = randomUUID();

      const { data, error } = await supabase
        .from('briefs')
        .insert({
          id,
          created_at: now,
          updated_at: now,
          status: input.status,
          source: input.source,
          customer: input.customer,
          business: input.business,
          offer: input.offer,
          design: input.design,
          content: input.content,
          contact: input.contact,
          assets: input.assets,
          payment: input.payment,
          delivery: input.delivery,
          internal_notes: input.internalNotes ?? null
        })
        .select()
        .single();

      if (error) throw new Error(`[supabase-brief-store] createBrief: ${error.message}`);
      return rowToRecord(data as BriefRow);
    },

    async updateBrief(id: string, updates: UpdateBriefInput): Promise<BriefRecord | null> {
      const supabase = getSupabaseServerClient();

      const existing = await this.getBriefById(id);
      if (!existing) return null;

      const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };

      if (updates.status !== undefined) patch.status = updates.status;
      if (updates.source !== undefined) patch.source = updates.source;
      if (updates.internalNotes !== undefined) patch.internal_notes = updates.internalNotes;
      if (updates.customer) patch.customer = { ...existing.customer, ...updates.customer };
      if (updates.business) patch.business = { ...existing.business, ...updates.business };
      if (updates.offer) patch.offer = { ...existing.offer, ...updates.offer };
      if (updates.design) patch.design = { ...existing.design, ...updates.design };
      if (updates.content) patch.content = { ...existing.content, ...updates.content };
      if (updates.contact) patch.contact = { ...existing.contact, ...updates.contact };
      if (updates.assets) patch.assets = { ...existing.assets, ...updates.assets };
      if (updates.payment) patch.payment = { ...existing.payment, ...updates.payment };
      if (updates.delivery) patch.delivery = withDefaultBriefDelivery({ ...existing.delivery, ...updates.delivery });

      const { data, error } = await supabase
        .from('briefs')
        .update(patch)
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(`[supabase-brief-store] updateBrief: ${error.message}`);
      return rowToRecord(data as BriefRow);
    },

    async getBriefById(id: string): Promise<BriefRecord | null> {
      const supabase = getSupabaseServerClient();

      const { data, error } = await supabase
        .from('briefs')
        .select()
        .eq('id', id)
        .maybeSingle();

      if (error) throw new Error(`[supabase-brief-store] getBriefById: ${error.message}`);
      return data ? rowToRecord(data as BriefRow) : null;
    },

    async getBriefByStripeSessionId(stripeSessionId: string): Promise<BriefRecord | null> {
      const supabase = getSupabaseServerClient();

      const { data, error } = await supabase
        .from('briefs')
        .select()
        .filter('payment->>stripeSessionId', 'eq', stripeSessionId)
        .maybeSingle();

      if (error) throw new Error(`[supabase-brief-store] getBriefByStripeSessionId: ${error.message}`);
      return data ? rowToRecord(data as BriefRow) : null;
    },

    async getAllBriefs(): Promise<BriefRecord[]> {
      const supabase = getSupabaseServerClient();

      const { data, error } = await supabase
        .from('briefs')
        .select()
        .order('created_at', { ascending: false });

      if (error) throw new Error(`[supabase-brief-store] getAllBriefs: ${error.message}`);
      return (data as BriefRow[]).map(rowToRecord);
    }
  };
}
