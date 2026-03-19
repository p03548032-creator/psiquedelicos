import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import ArticlePageClient from '@/components/ArticlePageClient';

// Manteniendo 'id' como el param name por la carpeta [id], aunque representa el 'slug' (ej: /articulo/microdosificacion...)
type Props = { params: Promise<{ id: string }> };

export const revalidate = 3600;

export async function generateStaticParams() {
    const { data: articles } = await supabase.from('articles').select('slug').eq('status', 'published');
    return (articles || []).map((article) => ({ id: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id: slug } = await params;
    const { data: article } = await supabase
        .from('articles')
        .select('title, subtitle, excerpt')
        .eq('slug', slug)
        .single();
        
    if (!article) return { title: 'Artículo no encontrado — PortalPSY' };
    return {
        title: `${article.title} — PortalPSY`,
        description: article.subtitle || article.excerpt,
        openGraph: {
            title: article.title,
            description: article.subtitle || article.excerpt,
            type: 'article',
        },
    };
}

export default async function ArticlePage({ params }: Props) {
    const { id: slug } = await params;
    
    // Obtenemos el artículo actual y los artículos relacionados
    const { data: article } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!article) {
        return <ArticlePageClient article={null} relatedArticles={[]} />;
    }

    // Buscamos información de los relacionados (los guardados en array de IDs viejos han quedado deprecados, por lo que cargaremos 3 randoms/recientes)
    const { data: relatedArticles } = await supabase
        .from('articles')
        .select('id, slug, title, read_time, icon_name, color')
        .eq('status', 'published')
        .neq('id', article.id)
        .limit(3);

    return <ArticlePageClient article={article} relatedArticles={relatedArticles || []} />;
}
