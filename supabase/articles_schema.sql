-- Crear la tabla de artículos
CREATE TABLE IF NOT EXISTS articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL, -- Ej: 'microdosificacion-guia-completa'
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    category TEXT NOT NULL,
    read_time TEXT NOT NULL,
    color TEXT NOT NULL, -- Ej: '#a78bfa'
    icon_name TEXT NOT NULL, -- Ej: 'TestTube'
    author TEXT NOT NULL,
    publish_date TEXT NOT NULL, -- Ej: '15 de enero de 2026'
    hero_quote TEXT,
    hero_quote_author TEXT,
    sections JSONB NOT NULL DEFAULT '[]'::jsonb, -- Estructura compleja de secciones
    references_list JSONB NOT NULL DEFAULT '[]'::jsonb, -- Estructura de referencias
    related_articles JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array de strings con IDs o slugs
    source_url TEXT UNIQUE, -- URL original (útil para el bot automático y evitar duplicados)
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Políticas de Seguridad
-- Todo el mundo puede leer los artículos publicados
CREATE POLICY "Public articles are viewable by everyone." ON articles
    FOR SELECT USING (status = 'published');

-- Solo los autenticados (o el Service Role) pueden insertar/actualizar
CREATE POLICY "Authenticated users can insert articles" ON articles
    FOR INSERT TO authenticated, service_role WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles" ON articles
    FOR UPDATE TO authenticated, service_role USING (true);
