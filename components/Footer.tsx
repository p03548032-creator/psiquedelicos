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
                            {[{ label: 'Sustancias', href: '/sustancias' }, { label: 'Terapia en España', href: '/terapia-espana' }, { label: 'Noticias', href: '/noticias' }, { label: '🛠️ Herramientas', href: '/herramientas' }].map(link => (
                                <Link key={link.label} href={link.href} className="block text-white/30 text-sm hover:text-white/60 transition-colors">{link.label}</Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Experiencia</h4>
                        <div className="space-y-2">
                            {[{ label: '🎧 Frecuencias', href: '/sala-de-viajes' }, { label: '🌐 Comunidad', href: '/comunidad' }, { label: '📖 Relatos', href: '/comunidad' }, { label: '🎵 Playlists', href: '/sala-de-viajes' }, { label: '⭐ Sala PRO', href: '/sala-pro' }].map(link => (
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



                <div className="metatron-divider mb-6" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/20 text-xs">
                    <p>© 2026 PortalPSY — Información, no incitación. Tu consciencia, tu responsabilidad.</p>

                    <div className="flex items-center gap-4 flex-wrap justify-center">
                        <Link href="/aviso-legal" className="hover:text-white/60 transition-colors">Aviso Legal</Link>
                        <Link href="/privacidad" className="hover:text-white/60 transition-colors">Privacidad</Link>
                        <Link href="/cookies" className="hover:text-white/60 transition-colors">Cookies</Link>
                        <Link href="/descargo-responsabilidad" className="hover:text-white/60 transition-colors">Descargo Médico</Link>
                    </div>

                    <p className="hidden lg:block">Diseñado con geometría sagrada · φ = 1.618</p>
                </div>
            </div>
        </footer>
    );
}
