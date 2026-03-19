import type { MetadataRoute } from 'next';
import { substances } from '@/data/substances';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'https://portalpsy.es';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
        { url: `${BASE_URL}/sustancias`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/investigacion`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/terapia-espana`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
        { url: `${BASE_URL}/terapeutas`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
        { url: `${BASE_URL}/comunidad`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
        { url: `${BASE_URL}/bienestar`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/herramientas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
        { url: `${BASE_URL}/herramientas/calculadora-dosis`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE_URL}/herramientas/interacciones`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ];

    const substanceRoutes: MetadataRoute.Sitemap = substances.map(s => ({
        url: `${BASE_URL}/sustancia/${s.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    const { data: articles } = await supabase.from('articles').select('slug').eq('status', 'published');

    const articleRoutes: MetadataRoute.Sitemap = (articles || []).map(a => ({
        url: `${BASE_URL}/articulo/${a.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.75,
    }));

    return [...staticRoutes, ...substanceRoutes, ...articleRoutes];
}
