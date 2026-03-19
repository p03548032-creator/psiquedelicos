'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { getIconComponent } from '@/lib/iconMap';
import { MetatronDivider } from '@/components/SacredGeometry';
import { useReveal } from '@/hooks/useReveal';

function SectionBlock({ section, index, id }: { section: any; index: number; id: string }) {
    const { ref, visible } = useReveal(0.05);
    const calloutStyles = {
        warning: { bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.15)', icon: '⚠️', color: 'text-red-400/80' },
        info: { bg: 'rgba(96,165,250,0.06)', border: 'rgba(96,165,250,0.15)', icon: 'ℹ️', color: 'text-blue-400/80' },
        tip: { bg: 'rgba(52,211,153,0.06)', border: 'rgba(52,211,153,0.15)', icon: '💡', color: 'text-emerald-400/80' },
    };

    return (
        <div id={id} ref={ref as any} className={`mb-12 scroll-mt-28 ${visible ? 'animate-spiral' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.08}s` }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-snug">{section.title}</h2>
            <div className="text-white/60 leading-relaxed text-base md:text-lg mb-6">
                {section.content?.split('\n\n').map((p: string, i: number) => <p key={i} className="mb-4">{p}</p>)}
            </div>
            {section.subsections && (
                <div className="space-y-6 ml-0 md:ml-4 mb-6">
                    {section.subsections.map((sub: any, i: number) => (
                        <div key={i} className="glass-sacred rounded-2xl p-6 md:p-8">
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-3">{sub.title}</h3>
                            <div className="text-white/50 text-sm md:text-base leading-relaxed">
                                {sub.content?.split('\n\n').map((p: string, j: number) => <p key={j} className="mb-3">{p}</p>)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {section.list && (
                <ul className="space-y-3 mb-6">
                    {section.list.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-white/55 text-sm md:text-base">
                            <span className="w-1.5 h-1.5 rounded-full bg-psyche-violet/60 mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            )}
            {section.callout && (
                <div className="rounded-2xl p-6 mt-6" style={{ background: calloutStyles[section.callout.type as keyof typeof calloutStyles].bg, border: `1px solid ${calloutStyles[section.callout.type as keyof typeof calloutStyles].border}` }}>
                    <div className="flex items-start gap-3">
                        <span className="text-xl flex-shrink-0">{calloutStyles[section.callout.type as keyof typeof calloutStyles].icon}</span>
                        <p className={`text-sm md:text-base leading-relaxed ${calloutStyles[section.callout.type as keyof typeof calloutStyles].color}`}>{section.callout.text}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ArticlePageClient({ article, relatedArticles }: { article: any, relatedArticles: any[] }) {
    useEffect(() => { window.scrollTo(0, 0); }, [article?.id]);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Artículo no encontrado</h1>
                    <Link href="/" className="vesica-btn px-6 py-3 gradient-psyche text-white font-medium">Volver al portal</Link>
                </div>
            </div>
        );
    }

    const MainIcon = getIconComponent(article.icon_name);

    return (
        <article className="relative pt-24 pb-32 px-6">
            <div className="absolute inset-0 bg-flower-of-life opacity-10 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${article.color}08, transparent 60%)` }} />

            <div className="relative max-w-5xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-sm mb-12 group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    Volver al portal
                </Link>

                <header className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-white/80"><MainIcon size={48} strokeWidth={1.5} /></span>
                        <span className="vesica-btn px-4 py-1.5 text-sm font-medium" style={{ background: `${article.color}15`, color: article.color }}>{article.category}</span>
                        <span className="text-white/20 text-sm">{article.readTime}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">{article.title}</h1>
                    <p className="text-xl md:text-2xl text-white/50 leading-relaxed mb-8">{article.subtitle}</p>
                    <div className="flex items-center gap-4 text-sm text-white/30">
                        <span>{article.author}</span><span>·</span><span>{article.date}</span>
                    </div>
                </header>

                {article.heroQuote && (
                    <div className="glass-sacred rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
                        <div className="absolute top-4 right-8 text-8xl font-serif text-white/[0.03] leading-none select-none pointer-events-none">"</div>
                        <blockquote className="relative text-xl md:text-2xl text-white/70 italic leading-relaxed mb-4">"{article.heroQuote}"</blockquote>
                        <cite className="text-white/30 text-sm not-italic">— {article.heroQuoteAuthor}</cite>
                    </div>
                )}

                <MetatronDivider />

                <div className="mt-16">
                    {article.sections?.map((section: any, i: number) => <SectionBlock key={i} section={section} index={i} id={`section-${i}`} />)}
                </div>

                <MetatronDivider />

                <div className="mt-12 mb-16">
                    <h3 className="text-lg font-bold text-white/50 mb-6">Referencias</h3>
                    <ol className="space-y-3">
                        {(article.references_list || []).map((ref: any, i: number) => {
                            let linkHref = ref.url;
                            if (linkHref && linkHref.startsWith('http')) {
                                try {
                                    const urlObj = new URL(linkHref);
                                    urlObj.searchParams.set('utm_source', 'portalpsy');
                                    urlObj.searchParams.set('utm_medium', 'article_reference');
                                    urlObj.searchParams.set('utm_campaign', `article_${article.id}`);
                                    linkHref = urlObj.toString();
                                } catch (e) {
                                    // Fallback to original layout if URL parsing fails
                                }
                            }

                            return (
                                <li key={i} className="flex items-start gap-3 text-white/30 text-sm">
                                    <span className="text-white/15 font-mono text-xs mt-0.5">[{i + 1}]</span>
                                    {linkHref ? (
                                        <a href={linkHref} target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors underline underline-offset-2">
                                            {ref.title}
                                        </a>
                                    ) : (
                                        <span>{ref.title}</span>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </div>

                {relatedArticles.length > 0 && (
                    <div className="mt-12">
                        <MetatronDivider />
                        <h3 className="text-lg font-bold text-white/50 mb-8 mt-4">Artículos relacionados</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            {relatedArticles.map(ra => {
                                const RelIcon = getIconComponent(ra.icon_name);
                                return (
                                    <Link key={ra.id} href={`/articulo/${ra.slug}`} className="glass-sacred rounded-2xl p-6 group hover:scale-[1.02] transition-all duration-500">
                                        <span className="mb-3 block text-white/80"><RelIcon size={28} strokeWidth={1.5} /></span>
                                        <h4 className="text-sm font-bold text-white group-hover:text-white/90 transition-colors mb-2 leading-snug">{ra.title}</h4>
                                        <span className="text-xs text-white/20">{ra.read_time}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="mt-16 text-center">
                    <Link href="/" className="vesica-btn px-8 py-3 gradient-psyche text-white font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-psyche-violet/20 inline-block">
                        ← Volver al Portal
                    </Link>
                </div>
            </div>
        </article>
    );
}
