-- ==============================================================================
-- 🚀 PORTALPSY: INITIAL SUPABASE SCHEMA & RLS POLICIES
-- ==============================================================================
-- Instrucciones: Pega todo este código en el SQL Editor de tu proyecto Supabase.
-- Ejecútalo (Run) para crear todas las tablas, relaciones y reglas de seguridad.
-- ==============================================================================

-- 1. Enable pgcrypto for UUID generation (usually enabled by default)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ==========================================
-- 2. CREATE TABLES
-- ==========================================

-- Table: profiles
-- Stores public user data, linked to Supabase's auth.users
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
  username text UNIQUE,
  avatar_url text,
  role text DEFAULT 'user'::text CHECK (role IN ('user', 'therapist', 'admin')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: therapists
-- Stores directory data for therapists and clinics
CREATE TABLE public.therapists (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id uuid REFERENCES public.profiles(id), -- Nullable, linked when a therapist claims the profile
  name text NOT NULL,
  title text NOT NULL,
  city text NOT NULL,
  region text NOT NULL,
  modality text[] NOT NULL, -- e.g., ['presencial', 'online']
  specialties text[] NOT NULL,
  substances text[] NOT NULL,
  description text NOT NULL,
  price text NOT NULL,
  url text,
  email text,
  color text DEFAULT '#7c3aed',
  verified boolean DEFAULT false,
  is_premium boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: forum_topics
-- Community discussion threads
CREATE TABLE public.forum_topics (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id uuid REFERENCES public.profiles(id) NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL CHECK (category IN ('integracion', 'reduccion-danos', 'ciencia', 'general', 'presentaciones')),
  is_pinned boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: forum_replies
-- Replies to discussion threads
CREATE TABLE public.forum_replies (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id uuid REFERENCES public.forum_topics(id) ON DELETE CASCADE NOT NULL,
  author_id uuid REFERENCES public.profiles(id) NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 3. AUTOMATED TRIGGERS
-- ==========================================

-- Trigger to automatically create a profile when a new user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Trigger to auto-update 'updated_at' on forum_topics
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_forum_topics_updated_at
  BEFORE UPDATE ON public.forum_topics
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ==========================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------
-- Policies: profiles
-- ------------------------------------------
-- 1. Anyone can view public profiles
CREATE POLICY "Public profiles are viewable by everyone." 
  ON public.profiles FOR SELECT USING (true);

-- 2. Users can only update their own profile
CREATE POLICY "Users can insert their own profile." 
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ------------------------------------------
-- Policies: therapists
-- ------------------------------------------
-- 1. Anyone can view therapists (directory is public)
CREATE POLICY "Therapists are viewable by everyone." 
  ON public.therapists FOR SELECT USING (true);

-- 2. Only admins can insert or update therapists
-- We check if the acting user's profile has role = 'admin'
CREATE POLICY "Only admins can insert therapists." 
  ON public.therapists FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Only admins can update therapists." 
  ON public.therapists FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ------------------------------------------
-- Policies: forum_topics
-- ------------------------------------------
-- 1. Anyone can view forum topics
CREATE POLICY "Topics are viewable by everyone." 
  ON public.forum_topics FOR SELECT USING (true);

-- 2. Authenticated users can create topics
CREATE POLICY "Authenticated users can create topics." 
  ON public.forum_topics FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = author_id);

-- 3. Users can update their own topics
CREATE POLICY "Users can update own topics." 
  ON public.forum_topics FOR UPDATE 
  USING (auth.uid() = author_id);

-- 4. Users can delete their own topics, or admins can delete any
CREATE POLICY "Users can delete own topics or admins can delete." 
  ON public.forum_topics FOR DELETE 
  USING (auth.uid() = author_id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ------------------------------------------
-- Policies: forum_replies
-- ------------------------------------------
-- 1. Anyone can view replies
CREATE POLICY "Replies are viewable by everyone." 
  ON public.forum_replies FOR SELECT USING (true);

-- 2. Authenticated users can create replies
CREATE POLICY "Authenticated users can create replies." 
  ON public.forum_replies FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = author_id);

-- 3. Users can update their own replies
CREATE POLICY "Users can update own replies." 
  ON public.forum_replies FOR UPDATE 
  USING (auth.uid() = author_id);

-- 4. Users can delete their own replies, or admins can delete any
CREATE POLICY "Users can delete own replies or admins can delete." 
  ON public.forum_replies FOR DELETE 
  USING (auth.uid() = author_id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ==========================================
-- 5. INITIAL DATA MIGRATION (Optional Run)
-- ==========================================
-- Here we insert the existing 6 verified centers so the directory isn't empty.

INSERT INTO public.therapists (name, title, city, region, modality, specialties, substances, description, price, url, verified, color)
VALUES
('Clínica Synaptica', 'Primera Clínica de Medicina Psicodélica en España', 'Barcelona', 'Cataluña', ARRAY['presencial', 'online'], ARRAY['Integración psicodélica', 'TEPT', 'Depresión resistente', 'Adicciones'], ARRAY['Esketamina', 'Ketamina', 'Psilocibina (ensayos)'], 'Fundada por el Dr. José Carlos Bouso, es la primera clínica española dedicada a la medicina psicodélica.', 'Consultar', 'https://www.clinicasynaptica.com', true, '#c084fc'),
('ICEERS — Consultas y Recursos', 'Centro Internacional de Investigación Etnobotánica', 'Barcelona', 'Cataluña', ARRAY['presencial', 'online'], ARRAY['Reducción de daños', 'Integración ayahuasca', 'Apoyo legal', 'Formación profesional'], ARRAY['Ayahuasca', 'Ibogaína', 'Psilocibina', 'Cannabis'], 'ICEERS ofrece recursos de harm reduction, apoyo a integradores y defensa legal.', 'Gratuito (algunos servicios)', 'https://www.iceers.org', true, '#fbbf24'),
('Energy Control — ABD', 'Servicio de Reducción de Daños y Análisis de Sustancias', 'Barcelona', 'Cataluña', ARRAY['presencial'], ARRAY['Análisis de sustancias', 'Reducción de daños', 'Información sobre efectos'], ARRAY['Todas'], 'Referencia europea en harm reduction. Realizan análisis de sustancias.', 'Gratuito', 'https://energycontrol.org', true, '#34d399'),
('MIND Foundation — España', 'Formación en Terapia Psicodélica para Profesionales', 'Madrid / Online', 'Nacional', ARRAY['online', 'presencial'], ARRAY['Formación profesional', 'Integración', 'Psicoterapia asistida'], ARRAY['Psilocibina', 'MDMA', 'LSD (formación)'], 'Ofrecen formación acreditada para psicólogos, psiquiatras y terapeutas.', 'Según programa', 'https://www.mind-foundation.org/es', true, '#a78bfa'),
('Psiconauta — Integración Psicodélica', 'Servicio de Integración y Apoyo Post-Experiencia', 'Madrid', 'Madrid', ARRAY['presencial', 'online'], ARRAY['Integración psicodélica', 'Dificultades post-experiencia', 'Trauma'], ARRAY['Psilocibina', 'Ayahuasca', 'MDMA', 'Ketamina'], 'Psicólogos clínicos especializados en acompañamiento post-experiencia psicodélica.', '60–90€/sesión', 'https://www.psiconauta.net', false, '#f472b6'),
('Flow State Therapy — Barcelona', 'Psicoterapia Integrativa con Enfoque Transpersonal', 'Barcelona', 'Cataluña', ARRAY['presencial', 'online'], ARRAY['Integración psicodélica', 'Terapia transpersonal', 'Mindfulness', 'Trauma'], ARRAY['Ayahuasca', 'Psilocibina', 'Ketamina'], 'Equipo de psicólogos con formación en psicología transpersonal.', '70–100€/sesión', NULL, false, '#22d3ee');
