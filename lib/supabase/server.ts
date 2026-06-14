import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          const cs = await cookies();
          return cs.getAll();
        },
        async setAll(cookiesToSet) {
          const cs = await cookies();
          cookiesToSet.forEach(({ name, value, options }) => {
            try { cs.set(name, value, options); } catch { /* read-only */ }
          });
        },
      },
    }
  );
}
