import { z } from 'zod';

const isServer = typeof window === 'undefined';

/** Schema completo de variables de entorno — validado en runtime y build.
 *  Ejecuta `npx zod-env validate` o lanza en `instrumentation.ts` al arrancar. */
const envSchema = z.object({
  // ── App ──
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_URL: z.string().url().default('https://portalpsy.es'),

  // ── Supabase ──
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

  // ── Auth ──
  SUPABASE_JWT_SECRET: z.string().min(1).optional(),

  // ── AI ──
  GEMINI_API_KEY: z.string().min(1).optional(),

  // ── Email ──
  RESEND_API_KEY: z.string().startsWith('re_').optional(),

  // ── Rate Limiting ──
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),

  // ── Cron ──
  CRON_SECRET: z.string().min(16).optional(),

  // ── Audio proxy ──
  AUDIO_PROXY_ALLOWED_HOSTS: z.string().optional(),
});

export const env = (() => {
  // En build time: solo validar las vars públicas (cliente)
  if (process.env.NEXT_PHASE === 'phase-production-build' ||
      process.env.NEXT_PHASE === 'phase-test-build') {
    const publicSchema = envSchema.pick({
      NEXT_PUBLIC_URL: true,
      NEXT_PUBLIC_SUPABASE_URL: true,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: true,
    });
    return publicSchema.parse(process.env);
  }

  // En runtime: validar todo
  try {
    return envSchema.parse(process.env);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const missing = err.errors.map(e => `  - ${e.path.join('.')}: ${e.message}`).join('\n');
      throw new Error(`\n❌ Variables de entorno faltantes o inválidas:\n${missing}\n\nCopia .env.example → .env.local y rellena los valores.`);
    }
    throw err;
  }
})();

export type Env = z.infer<typeof envSchema>;

/** Vars públicas disponibles en el cliente (no contienen secretos). */
export const publicEnv = {
  NEXT_PUBLIC_URL: env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_SUPABASE_URL: env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
} as const;
