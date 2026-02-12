import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseAuth = createBrowserClient(supabaseUrl!, supabaseKey!);

export function createSupabaseClient() {
  return createBrowserClient(supabaseUrl!, supabaseKey!);
}
