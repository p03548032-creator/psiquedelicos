import { Metadata } from 'next';
import ArticlesSection from '@/sections/ArticlesSection';
import ResearchSection from '@/sections/ResearchSection';
import { MetatronDivider } from '@/components/SacredGeometry';
import { supabase } from '@/lib/supabase';

export const revalidate = 3600;

export const metadata: Metadata = {
    title: 'Investigación y Artículos — PortalPSY',
    description: 'Artículos científicos, ensayos clínicos y noticias sobre terapia psicodélica en España y Europa. Actualizado con los últimos avances en psilocibina, MDMA y esketamina.',
    keywords: ['investigación psicodélica', 'ensayos clínicos', 'psilocibina', 'MDMA', 'esketamina', 'neurociencia'],
};

export default async function InvestigacionPage() {
    const { data: articles } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('publish_date', { ascending: false });

    return (
        <main className="min-h-screen pt-28">
            {/* Header */}
            <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
                <div className="inline-flex items-center gap-2 vesica-btn px-5 py-2 glass-sacred text-sm text-psyche-cyan mb-6">
                    <span className="w-2 h-2 rounded-full bg-psyche-cyan animate-pulse" />
                    Ciencia & Evidencia
                </div>
                <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                    <span className="gradient-text-cool">Investigación</span>
                    <br />
                    <span className="text-white/80">Psicodélica</span>
                </h1>
                <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
                    Los últimos avances en investigación clínica, neurociencia y políticas de regulación.
                    Análisis rigurosos de estudios reales, accesibles para todos los públicos.
                </p>
            </div>

            <ArticlesSection articles={articles || []} />
            <MetatronDivider />
            <ResearchSection />
        </main>
    );
}
