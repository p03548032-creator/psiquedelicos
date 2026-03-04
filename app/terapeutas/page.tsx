import { Metadata } from 'next';
import TerapeutasClient from './TerapeutasClient';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
    title: 'Directorio de Terapeutas Psicodélicos en España — PortalPSY',
    description: 'Encuentra terapeutas, psicólogos y centros especializados en integración psicodélica, reducción de daños y psicoterapia asistida en España.',
    keywords: ['terapeuta psicodélico España', 'integración psicodélica', 'psicólogo psicodélicos', 'reducción de daños España'],
    alternates: { canonical: 'https://portalpsy.es/terapeutas' }
};

export const revalidate = 3600; // ISR cache for 1 hour

export default async function TerapeutasPage() {
    // Evitamos colgar el build si las variables son de placeholder
    const isMockAuth = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL.includes('aqui_tu_project_url');

    let therapists = [];

    if (!isMockAuth) {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('therapists')
            .select('*')
            .order('is_premium', { ascending: false }) // Premium first
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching therapists:', error);
        } else if (data) {
            therapists = data;
        }
    } else {
        console.warn('⚠️ Supabase credentials not set or using dummy values. Returning empty therapists array to prevent build hang.');
    }

    return <TerapeutasClient initialTherapists={therapists} />;
}
