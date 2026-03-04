'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { substances, articles } from '@/data/substances';

interface SearchOverlayProps {
    open: boolean;
    onClose: () => void;
    onNavigate?: () => void;
}

const popularSearches = ['Psilocibina', 'MDMA', 'Microdosis', 'Set & Setting', 'Ketamina', 'Reducción de daños'];

export default function SearchOverlay({ open, onClose, onNavigate }: SearchOverlayProps) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (open) {
            setQuery('');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const handler = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [open, onClose]);

    const results = useMemo(() => {
        const trimmed = query.trim().toLowerCase();
        if (!trimmed) return { substances: [], articles: [] };
        return {
            substances: substances.filter(sub =>
                [sub.name, sub.aka, sub.category, sub.description].some(text => text.toLowerCase().includes(trimmed))
            ),
            articles: articles.filter(article =>
                [article.title, article.excerpt, article.category].some(text => text.toLowerCase().includes(trimmed))
            ),
        };
    }, [query]);

    if (!open) return null;

    const hasResults = results.substances.length > 0 || results.articles.length > 0;

    return (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-xl">
            <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
                <div className="glass-sacred rounded-[32px] p-8 md:p-10">
                    <div className="flex items-start justify-between gap-6">
                        <div>
                            <p className="text-xs uppercase tracking-[0.4em] text-white/30">Explorador Neural</p>
                            <h2 className="text-3xl md:text-4xl font-semibold text-white/90 mt-3">Buscar en el Portal</h2>
                            <p className="text-white/40 text-sm mt-2">Sustancias, artículos y recursos en un solo gesto.</p>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 rounded-full border border-white/10 text-white/60 hover:text-white/90 transition" aria-label="Cerrar búsqueda">✕</button>
                    </div>

                    <div className="mt-8">
                        <input
                            value={query}
                            onChange={event => setQuery(event.target.value)}
                            placeholder="Busca psilocibina, microdosis, set & setting..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white/90 placeholder:text-white/30 focus:outline-none focus:border-psyche-violet/60"
                            autoFocus
                        />
                    </div>

                    {!query && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {popularSearches.map(tag => (
                                <button key={tag} onClick={() => setQuery(tag)} className="px-4 py-2 rounded-full bg-white/5 text-xs text-white/50 hover:text-white/80 transition">{tag}</button>
                            ))}
                        </div>
                    )}

                    {query && !hasResults && <div className="mt-8 text-white/40 text-sm">No encontramos resultados. Prueba con otro término.</div>}

                    {hasResults && (
                        <div className="mt-8 grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xs uppercase tracking-[0.3em] text-white/30 mb-4">Sustancias</h3>
                                <div className="space-y-3">
                                    {results.substances.map(item => (
                                        <Link key={item.id} href={`/sustancia/${item.id}`} onClick={() => { onClose(); onNavigate?.(); }} className="block p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-psyche-violet/40 transition">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2 text-white/80 font-semibold">
                                                        <item.icon size={16} />
                                                        <span>{item.name}</span>
                                                    </div>
                                                    <p className="text-xs text-white/40 mt-1">{item.category} · {item.duration}</p>
                                                </div>
                                                <span className="text-xs text-white/40">Ver ficha →</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs uppercase tracking-[0.3em] text-white/30 mb-4">Artículos</h3>
                                <div className="space-y-3">
                                    {results.articles.map(article => (
                                        <Link key={article.id} href={`/articulo/${article.id}`} onClick={() => { onClose(); onNavigate?.(); }} className="block p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-psyche-cyan/40 transition">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2 text-white/80 font-semibold">
                                                        <article.icon size={16} />
                                                        <span>{article.title}</span>
                                                    </div>
                                                    <p className="text-xs text-white/40 mt-1">{article.category} · {article.readTime}</p>
                                                </div>
                                                <span className="text-xs text-white/40">Leer →</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-10 flex items-center justify-between text-xs text-white/30">
                        <span>Tip: pulsa Escape para cerrar</span>
                        <span>Comando rápido: ⌘/Ctrl + K</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
