-- ==============================================================================
-- 🔑 PORTALPSY: STRIPE SUBSCRIPTION MIGRATION
-- ==============================================================================
-- Ejecuta este script en el SQL Editor de Supabase DESPUÉS del script inicial.
-- Añade las columnas necesarias para el sistema de suscripción PRO.
-- ==============================================================================

-- Añadir columnas de suscripción a la tabla profiles
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS plan text DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  ADD COLUMN IF NOT EXISTS stripe_customer_id text UNIQUE,
  ADD COLUMN IF NOT EXISTS subscription_id text,
  ADD COLUMN IF NOT EXISTS subscription_ends_at timestamptz;

-- Índice para búsquedas rápidas por stripe_customer_id (usado en webhooks)
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id 
  ON public.profiles(stripe_customer_id);

-- Política RLS: El service_role puede actualizar cualquier perfil (necesario para webhooks)
-- Nota: Las API routes de webhook usan SUPABASE_SERVICE_ROLE_KEY que bypasa RLS,
-- pero añadimos esta policy explícita para mayor claridad:
CREATE POLICY "Service role can update all profiles." 
  ON public.profiles FOR UPDATE 
  USING (auth.role() = 'service_role');
