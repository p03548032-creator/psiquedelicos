
import { Metadata } from 'next';
import CommunitySection from '@/sections/CommunitySection';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
    title: 'Comunidad Psicodélica — PortalPSY',
    description: 'Foro, debates y comunidad sobre psicodélicos en español. Comparte experiencias, integración y conocimiento con una comunidad responsable y libre de estigma.',
    keywords: ['comunidad psicodélica', 'foro psicodélicos', 'integración psicodélica', 'experiencias'],
};

export const revalidate = 60; // Revalidate forum every minute

export default async function ComunidadPage() {
    const isMockAuth = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL.includes('aqui_tu_project_url');

    let dbTopics: any[] = [];
    let dbReports: any[] = [];
    let currentUser = null;

    if (!isMockAuth) {
        const supabase = createClient();

        // Obtenemos el usuario actual
        const { data: { user } } = await supabase.auth.getUser();
        currentUser = user;

        // Fetch topics with author profiles joined
        const { data: topicsData } = await supabase
            .from('forum_topics')
            .select(`
                *,
                profiles:author_id ( username, avatar_url, role )
            `)
            .order('is_pinned', { ascending: false })
            .order('created_at', { ascending: false });

        if (topicsData) {
            dbTopics = topicsData;
        }

        // Fetch experience reports with author profiles joined
        const { data: reportsData } = await supabase
            .from('experience_reports')
            .select(`
                *,
                profiles:author_id ( username, avatar_url, role )
            `)
            .order('created_at', { ascending: false });

        if (reportsData) {
            dbReports = reportsData;
        }
    }

    return (
        <main className="min-h-screen pt-20">
            <CommunitySection dbTopics={dbTopics} dbReports={dbReports} currentUser={currentUser} />
        </main>
    );
}
