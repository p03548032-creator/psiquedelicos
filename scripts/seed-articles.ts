import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { articlesFull } from '@/data/articles';

function slugify(title: string) {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

async function main() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
        console.error('⚠️  Configura NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY');
        process.exit(1);
    }

    const supabase = createClient(url, serviceKey);
    let success = 0;

    for (const article of articlesFull) {
        const slug = slugify(article.title);
        const iconName = article.icon?.displayName || article.icon?.name || 'FileText';

        const { error } = await supabase
            .from('articles')
            .upsert({
                slug,
                title: article.title,
                subtitle: article.subtitle,
                excerpt: article.excerpt,
                category: article.category,
                read_time: article.readTime,
                color: article.color,
                icon_name: iconName,
                author: article.author,
                publish_date: article.date,
                hero_quote: article.heroQuote,
                hero_quote_author: article.heroQuoteAuthor,
                sections: article.sections,
                references_list: article.references,
                related_articles: article.relatedArticles,
                status: 'published',
            }, { onConflict: 'slug' });

        if (error) {
            console.error(`❌ Error guardando "${article.title}":`, error.message);
        } else {
            success += 1;
        }
    }

    console.log(`✅ ${success} artículos sincronizados con Supabase`);
    process.exit(0);
}

main();
