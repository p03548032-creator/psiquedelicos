'use client';
import Link from 'next/link';
import { articles } from '@/data/substances';
import { useReveal } from '@/hooks/useReveal';
import { MetatronDivider } from '@/components/SacredGeometry';

function ArticleCard({ article, index }: { article: typeof articles[0]; index: number }) {
    const { ref, visible } = useReveal(0.1);
    const isFeature = index === 0;

    return (
        <div ref={ref} className={`${isFeature ? 'md:col-span-2 md:row-span-2' : ''} ${visible ? 'animate-spiral' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.12}s` }}>
            <Link href={`/articulo/${article.id}`}
                className={`block glass-sacred rounded-2xl p-6 md:p-8 h-full group cursor-pointer hover:scale-[1.01] transition-all duration-500 relative overflow-hidden ${isFeature ? 'md:p-12' : ''}`}
                style={{ borderColor: `${article.color}10` }}
            >
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-700"
                    style={{ background: `radial-gradient(circle, ${article.color}, transparent)` }} />

                <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-white/80"><article.icon size={isFeature ? 48 : 28} strokeWidth={1.5} /></span>
                        <span className="vesica-btn px-3 py-1 text-xs font-medium" style={{ background: `${article.color}15`, color: article.color }}>{article.category}</span>
                        <span className="text-white/20 text-xs ml-auto">{article.readTime}</span>
                    </div>
                    <h3 className={`font-bold text-white group-hover:text-white transition-colors mb-3 ${isFeature ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>{article.title}</h3>
                    <p className={`text-white/40 leading-relaxed ${isFeature ? 'text-base md:text-lg max-w-2xl' : 'text-sm'}`}>{article.excerpt}</p>
                    <div className="flex items-center gap-2 mt-6 text-sm group-hover:text-white/60 transition-colors" style={{ color: article.color + '80' }}>
                        <span>Leer artículo completo</span>
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default function ArticlesSection() {
    const { ref: titleRef, visible: titleVisible } = useReveal();
    return (
        <section id="articulos" className="relative py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <div ref={titleRef} className={`text-center mb-20 ${titleVisible ? 'animate-spiral' : 'opacity-0'}`}>
                    <span className="text-sm uppercase tracking-[0.3em] text-psyche-pink/60 block mb-4">Conocimiento Psicodélico</span>
                    <h2 className="text-4xl md:text-6xl font-black gradient-text-warm mb-6">Artículos</h2>
                    <p className="text-white/40 max-w-xl mx-auto">Guías, investigaciones y reflexiones sobre el universo psicodélico.</p>
                </div>
                <MetatronDivider />
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    {articles.map((article, i) => <ArticleCard key={article.id} article={article} index={i} />)}
                </div>
            </div>
        </section>
    );
}
