import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import Parser from 'rss-parser';
import { createClient } from '@supabase/supabase-js';

// Inicializar RSS Parser
const parser = new Parser();

// Inicializar Supabase Admin (saltándose RLS)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Lista de valid feeds científicos y de fundaciones (Maps, PubMed genérico, Entrez E-Utilities, etc.)
// PubMed usa parámetros RSS complejos, como alternativa podemos usar feeds de revistas específicas o Google News RSS orientado a papers.
const RSS_FEEDS = [
    // Búsqueda en Google News restringida a ciencia sobre psilocibina y MDMA
    'https://news.google.com/rss/search?q=psilocybin+clinical+trial+OR+MDMA+therapy+when:7d&hl=en-US&gl=US&ceid=US:en',
];

export async function GET(request: Request) {
    try {
        // 1. Protección del endpoint (Basic Security)
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            // Uncomment in production:
            // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const newArticlesFound = [];

        // 2. Extraer Noticias de los Feeds
        for (const feedUrl of RSS_FEEDS) {
            try {
                const feed = await parser.parseURL(feedUrl);
                
                // Limitar a los 5 más recientes para no saturar tokens de IA ni base de datos de golpe
                const recentItems = feed.items.slice(0, 5);

                for (const item of recentItems) {
                    // Validar si la URL original ya existe en la DB
                    const { data: existing } = await supabase
                        .from('articles')
                        .select('id')
                        .eq('source_url', item.link)
                        .single();

                    if (!existing && item.link) {
                        newArticlesFound.push({
                            title: item.title,
                            link: item.link,
                            snippet: item.contentSnippet || item.content,
                            pubDate: item.pubDate
                        });
                    }
                }
            } catch (err) {
                console.error(`Error fetching feed ${feedUrl}:`, err);
            }
        }

        if (newArticlesFound.length === 0) {
            return NextResponse.json({ success: true, message: 'No hay noticias nuevas.', processed: 0 });
        }

        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        const processedArticles = [];

        // 3. Procesamiento de IA (Traducción y Resumen estructurado)
        for (const article of newArticlesFound) {
            if (!GEMINI_API_KEY) break;

            const prompt = `Actúa como un periodista científico experto en terapia psicodélica y reducción de daños para 'PortalPSY', un portal web en España.
He extraído esta noticia/paper en inglés:
Título original: "${article.title}"
Snippet/Abstract: "${article.snippet}"
Enlace: "${article.link}"

REGLAS ESTRICTAS:
1. Traduce, resume y expande el contenido en un tono periodístico, científico pero accesible, en español de España.
2. Mantén estricta neutralidad y enfoque en reducción de daños (sin incentivar el consumo).
3. Devuelve EXCLUSIVAMENTE un JSON válido sin Markdown adicional ni comentarios. La estructura DEBE ser:
{
  "title": "Título llamativo en español",
  "subtitle": "Subtítulo descriptivo",
  "excerpt": "Una frase de resumen (15-20 palabras)",
  "category": "Investigación" o "Actualidad",
  "read_time": "X min",
  "color": "#3b82f6" o un hex acorde,
  "icon_name": "TestTube" o "Brain" o "FileText",
  "author": "PortalPSY Redacción IA",
  "publish_date": "Genera la fecha de hoy estilo '15 de marzo de 2026'",
  "hero_quote": "Una frase clave del hallazgo destacada",
  "hero_quote_author": "Nombre del investigador principal o Estudio",
  "sections": [
    { "title": "Contexto del Estudio", "content": "Párrafos sobre de qué trata..." },
    { "title": "Resultados Clave", "content": "Detalles médicos..." }
  ],
  "references_list": [ { "title": "Fuente original: Google News / NCBI", "url": "${article.link}" } ]
}`;

            try {
                const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: { responseMimeType: 'application/json' } // Forza formato JSON
                    })
                });

                const aiData = await aiResponse.json();
                
                if (!aiResponse.ok) {
                    console.error("Gemini API Error:", aiData.error?.message || aiData);
                    continue;
                }
                
                if (aiData.candidates && aiData.candidates[0].content.parts[0].text) {
                    let jsonString = aiData.candidates[0].content.parts[0].text;
                    
                    // Limpiar markdown residual que a veces Google Gemini inyecta por error
                    jsonString = jsonString.replace(/```json/gi, '').replace(/```/gi, '').trim();

                    const parsedArticle = JSON.parse(jsonString);

                    // Inferir Slug
                    const slug = parsedArticle.title
                        .toLowerCase()
                        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '');

                    // Guardar en Supabase
                    const { error } = await supabase.from('articles').upsert({
                        slug,
                        source_url: article.link,
                        ...parsedArticle,
                        status: 'published'
                    }, { onConflict: 'slug' });

                    if (!error) {
                        processedArticles.push(parsedArticle.title);
                    } else {
                        console.error('Error insertando en DB:', error);
                    }
                }
            } catch (iaError) {
                console.error("Error en procesamiento IA para artículo:", article.title, iaError);
            }
        }

        // 4. Revalidar la caché de las páginas afectadas en Next.js
        if (processedArticles.length > 0) {
            revalidatePath('/investigacion');
            revalidatePath('/');
        }

        return NextResponse.json({ 
            success: true, 
            message: `Noticias procesadas y guardadas: ${processedArticles.length}`, 
            titles: processedArticles 
        });

    } catch (error: any) {
        console.error("CRON Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
