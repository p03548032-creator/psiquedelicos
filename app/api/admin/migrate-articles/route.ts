import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { articlesFull } from '@/data/articles';

// Inicializar Supabase con Service Role Key para poder insertar saltando RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Mapeo manual de iconos para guardar el nombre como string en la BD
const iconMap = new Map<any, string>();
// Para no importar todos, extraeremos el nombre del componente o usaremos un fallback, pero es mejor mapear los usados.
// En articles.ts se usan: TestTube, HeartPulse, Brain, Leaf, ShieldAlert, Palette

export async function GET() {
    try {
        let insertedCount = 0;
        let errors = [];

        for (const article of articlesFull) {
            
            // Inferir el slug desde el ID para artículos antiguos ('1' -> 'articulo-1') 
            // O generar uno basado en título (mejor para SEO future-proof)
            const slug = article.title
                .toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
                .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with dash
                .replace(/(^-|-$)+/g, ''); // remove leading/trailing dashes

            // Extraer string del icono (es un componente React)
            const iconName = article.icon?.displayName || article.icon?.name || 'FileText';

            const { data, error } = await supabase
                .from('articles')
                .upsert({
                    slug: slug,
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
                    related_articles: article.relatedArticles, // esto contiene IDs '1', '2' originales, temporalmente sirve
                    status: 'published'
                }, { onConflict: 'slug' })
                .select();

            if (error) {
                console.error("Error inserting article:", article.title, error);
                errors.push({ title: article.title, error: error.message });
            } else {
                insertedCount++;
            }
        }

        if (errors.length > 0) {
            return NextResponse.json({ success: false, insertedCount, errors }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: `Successfully inserted/updated ${insertedCount} articles.`, insertedCount });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
