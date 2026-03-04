import type { Metadata } from 'next';
import Link from 'next/link';
import { substances } from '@/data/substances';
import { SeedOfLifeIcon, MetatronDivider } from '@/components/SacredGeometry';

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
    return substances.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const substance = substances.find(s => s.id === id);
    if (!substance) return { title: 'Sustancia no encontrada — PortalPSY' };
    return {
        title: `${substance.name} — Guía completa • PortalPSY`,
        description: `Información basada en evidencia sobre ${substance.name}: efectos, dosis, seguridad y legalidad en España.`,
        openGraph: {
            title: `${substance.name} — Guía completa`,
            description: substance.description,
            type: 'article',
        },
    };
}

export default async function SubstancePage({ params }: Props) {
    const { id } = await params;
    const substance = substances.find(s => s.id === id);

    if (!substance) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Sustancia no encontrada</h1>
                    <Link href="/" className="vesica-btn px-6 py-3 gradient-psyche text-white font-medium">Volver al portal</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="relative pt-24 pb-32 px-6">
            <div className="absolute inset-0 bg-flower-of-life opacity-10 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${substance.color}10, transparent 60%)` }} />

            <div className="relative max-w-5xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-sm mb-12 group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    Volver al portal
                </Link>

                <header className="mb-16">
                    <div className="flex items-start gap-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-white/90" style={{ background: `${substance.color}15` }}>
                                <substance.icon size={48} strokeWidth={1.5} />
                            </div>
                            <div className="absolute -bottom-2 -right-2 opacity-40">
                                <SeedOfLifeIcon size={32} color={substance.color} />
                            </div>
                        </div>
                        <div className="flex-1">
                            <span className="vesica-btn px-4 py-1.5 text-sm font-medium inline-block mb-3" style={{ background: `${substance.color}15`, color: substance.color }}>{substance.category}</span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-2">{substance.name}</h1>
                            <p className="text-white/40 text-lg">{substance.aka}</p>
                        </div>
                    </div>
                </header>

                <div className="grid md:grid-cols-3 gap-4 mb-16">
                    {[{ label: 'Duración', value: substance.duration, icon: '⏱' }, { label: 'Inicio', value: substance.onset, icon: '🚀' }, { label: 'Categoría', value: substance.category, icon: '🧪' }].map(item => (
                        <div key={item.label} className="glass-sacred rounded-2xl p-4 text-center">
                            <span className="text-2xl block mb-2">{item.icon}</span>
                            <p className="text-white/30 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                            <p className="text-white/80 font-semibold">{item.value}</p>
                        </div>
                    ))}
                </div>

                <MetatronDivider />

                <div className="mt-12 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">¿Qué es?</h2>
                        <p className="text-white/60 text-lg leading-relaxed">{substance.description}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">Efectos principales</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {substance.effects.map((effect, i) => (
                                <div key={i} className="glass-sacred rounded-xl px-4 py-3 flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: substance.color }} />
                                    <span className="text-white/70 text-sm">{effect}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">🛡️ Seguridad y reducción de daños</h2>
                        <div className="glass-sacred rounded-2xl p-6 md:p-8" style={{ borderColor: `${substance.color}20` }}>
                            <p className="text-white/60 leading-relaxed">{substance.safety}</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">⚖️ Legalidad en España</h2>
                        <div className="glass-sacred rounded-2xl p-6 md:p-8" style={{ borderColor: 'rgba(250,191,36,0.2)' }}>
                            <p className="text-white/60 leading-relaxed">{substance.legalES}</p>
                            <p className="text-white/25 text-xs mt-4">Esta información es de carácter educativo. Consulta fuentes legales oficiales para los últimos cambios normativos.</p>
                        </div>
                    </section>
                </div>

                <div className="mt-16 text-center">
                    <Link href="/" className="vesica-btn px-8 py-3 gradient-psyche text-white font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-psyche-violet/20 inline-block">
                        ← Volver al Portal
                    </Link>
                </div>
            </div>
        </div>
    );
}
