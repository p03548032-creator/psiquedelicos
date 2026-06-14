-- ======================================================================================
-- SCRIPT: TABLA DE NEWSLETTER SUBSCRIBERS
-- Instrucciones: Ejecuta este script en el SQL Editor de Supabase
-- ======================================================================================

-- 1. Crear la tabla de suscriptores
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Activar RLS (Row Level Security)
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- 3. Crear Políticas de Seguridad
-- Como las inserciones se harán desde el backend (Next.js API route) usando el Service Role Key, 
-- no necesitamos políticas públicas permisivas de INSERT que puedan ser vulnerables a SPAM bots.

-- Sin embargo, si quieres que se pueda consultar por la API directamente (aunque no es el plan), aquí tienes un ejemplo.
-- Por defecto restringimos el acceso público directo:
CREATE POLICY "Bloquear lectura y escritura pública directa" 
ON public.subscribers 
FOR ALL 
USING (false);

-- Felicidades, tabla de suscriptores lista.
