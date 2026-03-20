import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/database.types';

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

let serverClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseServerClient() {
  if (serverClient) return serverClient;

  serverClient = createClient<Database>(
    getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL'),
    getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY'),
    { auth: { persistSession: false } }
  );

  return serverClient;
}
