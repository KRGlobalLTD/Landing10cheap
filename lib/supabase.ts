import { createClient } from '@supabase/supabase-js';

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

let serverClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseServerClient() {
  if (serverClient) return serverClient;

  serverClient = createClient(
    getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL'),
    getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY'),
    { auth: { persistSession: false } }
  );

  return serverClient;
}
