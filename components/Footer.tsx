import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative py-20 px-6">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <svg viewBox="0 0 500 500" width="500" height="500" fill="none" className="animate-spin-sacred">
                    {[[250, 250], [250, 150], [250, 350], [163, 200], [337, 200], [163, 300], [337, 300]].map(([cx, cy], i) => (
                        <circle key={i} cx={cx} cy={cy} r={6} stroke="#7c3aed" strokeWidth="0.5" />
                    ))}
                </svg>
            </div>

            <div className="relative max-w-6xl mx-auto">
                <div className="metatron-divider mb-12" />

                <div className="grid md:grid-cols-[1.618fr_1fr_1fr_1fr] gap-12 mb-12">
                    <div>
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
                                <circle cx="20" cy="20" r="8" stroke="#7c3aed" strokeWidth="1" opacity="0.8" />
                                {[0, 1, 2, 3, 4, 5].map(i => (
                                    <circle key={i} cx={20 + 8 * Math.cos((i * 60) * Math.PI / 180)} cy={20 + 8 * Math.sin((i * 60) * Math.PI / 180)} r={8} stroke="#7c3aed" strokeWidth="0.5" opacity="0.4" />
                                ))}
                            </svg>
                            <span className="font-bold text-white/70">PORTAL<span className="text-psyche-violet">PSY</span></span>
                        </Link>
                        <p className="text-white/30 text-sm leading-relaxed max-w-md">
                            Información sobre psicodélicos basada en evidencia científica. Promovemos la reducción de daños y el uso responsable del conocimiento.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Explorar</h4>
                        <div className="space-y-2">
                            {[{ label: 'Sustancias', href: '/sustancias' }, { label: 'Terapia en España', href: '/terapia-espana' }, { label: 'Investigación', href: '/investigacion' }, { label: 'Artículos', href: '/investigacion' }, { label: '🛠️ Herramientas', href: '/herramientas' }].map(link => (
                                <Link key={link.label} href={link.href} className="block text-white/30 text-sm hover:text-white/60 transition-colors">{link.label}</Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Experiencia</h4>
                        <div className="space-y-2">
                            {[{ label: '🎧 Frecuencias', href: '/bienestar' }, { label: '🌐 Comunidad', href: '/comunidad' }, { label: '📖 Relatos', href: '/comunidad' }, { label: '🎵 Playlists', href: '/bienestar' }].map(link => (
                                <Link key={link.label} href={link.href} className="block text-white/30 text-sm hover:text-white/60 transition-colors">{link.label}</Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Recursos</h4>
                        <div className="space-y-2">
                            {[{ name: 'Energy Control', url: 'https://energycontrol.org' }, { name: 'ICEERS', url: 'https://iceers.org' }, { name: 'MAPS', url: 'https://maps.org' }, { name: 'Beckley Foundation', url: 'https://beckleyfoundation.org' }].map(r => (
                                <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="block text-white/30 text-sm hover:text-white/60 transition-colors">{r.name} ↗</a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Newsletter CTA */}
                <div className="mb-12 glass-sacred rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6" style={{ borderColor: 'rgba(124,58,237,0.1)' }}>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-white/80 mb-1">🌀 Newsletter Psiconáutico</h3>
                        <p className="text-white/40 text-sm">Los mejores papers, noticias y relatos de la semana. Sin spam, solo lo que importa.</p>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap justify-end md:justify-start">
                        <Link href="/newsletter" className="vesica-btn px-6 py-3 gradient-psyche text-white text-sm font-semibold hover:scale-105 transition-transform shadow-lg shadow-psyche-violet/20">
                            📬 Suscribirse — Es gratis →
                        </Link>
                        <span className="text-white/20 text-xs">Sin spam · Cancela cuando quieras</span>
                    </div>
                </div>

                <div className="metatron-divider mb-6" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/20 text-xs">
                    <p>© 2026 PortalPSY — Información, no incitación. Tu consciencia, tu responsabilidad.</p>
                    <p>Diseñado con geometría sagrada · φ = 1.618</p>
                </div>
            </div>
        </footer>
    );
}
