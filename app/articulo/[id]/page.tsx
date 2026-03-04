import type { Metadata } from 'next';
import { articlesFull } from '@/data/articles';
import ArticlePageClient from '@/components/ArticlePageClient';

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
    return articlesFull.map((article) => ({ id: article.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const article = articlesFull.find(a => a.id === id);
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
    const { id } = await params;
    return <ArticlePageClient id={id} />;
}
