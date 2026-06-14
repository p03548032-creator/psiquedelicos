import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

type SupabaseUser = Awaited<ReturnType<ReturnType<typeof createServerClient>['auth']['getUser']>>['data']['user'];

interface Profile {
  id: string;
  [key: string]: unknown;
}

function makeSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error('Supabase environment variables are not configured');
  }
  return createServerClient(url, anonKey, {
    cookies: {
      async getAll() {
        const cs = await cookies();
        return cs.getAll();
      },
      async setAll(cookiesToSet) {
        const cs = await cookies();
        for (const { name, value, options } of cookiesToSet) {
          try { cs.set(name, value, options); } catch { /* read-only context */ }
        }
      },
    },
  });
}

export async function getUserAndProfile() {
  const supabase = makeSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, profile: null };
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  return { user, profile: profile ?? null };
}

export function enforceCronAuth(request: Request): NextResponse | null {
  const secret = process.env.CRON_SECRET;
  if (!secret) throw new Error('CRON_SECRET is not configured');
  const header = request.headers.get('authorization');
  if (header !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export function validateProxyUrl(rawUrl: string | null) {
  if (!rawUrl) return { response: NextResponse.json({ error: 'URL faltante' }, { status: 400 }) };
  let parsed: URL;
  try { parsed = new URL(rawUrl); } catch {
    return { response: NextResponse.json({ error: 'URL inválida' }, { status: 400 }) };
  }
  const whitelist = process.env.AUDIO_PROXY_ALLOWED_HOSTS?.split(',').map(h => h.trim()).filter(Boolean) ?? [];
  if (whitelist.length && !whitelist.includes(parsed.hostname)) {
    return { response: NextResponse.json({ error: 'Dominio no permitido' }, { status: 403 }) };
  }
  return { url: parsed };
}
