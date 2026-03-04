'use client';
import Link from 'next/link';
import { substances } from '@/data/substances';
import { useReveal } from '@/hooks/useReveal';
import { MetatronDivider, SeedOfLifeIcon } from '@/components/SacredGeometry';

function SubstanceCard({ substance, index }: { substance: typeof substances[0]; index: number }) {
    const { ref, visible } = useReveal(0.1);
    return (
        <div ref={ref} className={`${visible ? 'animate-spiral' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.1}s` }}>
            <Link href={`/sustancia/${substance.id}`}
                className="block w-full text-left glass-sacred rounded-2xl p-6 md:p-8 group cursor-pointer hover:scale-[1.02] transition-all duration-500 relative overflow-hidden"
                style={{ borderColor: `${substance.color}15` }}
            >
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-25 transition-opacity">
                    <SeedOfLifeIcon size={50} color={substance.color} />
                </div>
                <div className="flex items-start gap-4">
                    <span className="text-4xl md:text-5xl">{substance.emoji}</span>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-white transition-colors">{substance.name}</h3>
                        </div>
                        <p className="text-sm text-white/40 mb-3">{substance.aka}</p>
                        <span className="inline-block vesica-btn px-3 py-1 text-xs font-medium" style={{ background: `${substance.color}15`, color: substance.color }}>{substance.category}</span>
                        <p className="text-white/50 text-sm mt-3 line-clamp-2">{substance.description}</p>
                        <div className="flex gap-6 mt-4 text-xs text-white/30">
                            <span>⏱ {substance.duration}</span>
                            <span>🚀 Onset: {substance.onset}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-4 text-sm group-hover:text-white/60 transition-colors" style={{ color: substance.color + '80' }}>
                            <span>Ver guía completa</span>
                            <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default function SubstancesSection() {
    const { ref: titleRef, visible: titleVisible } = useReveal();
    return (
        <section id="sustancias" className="relative py-32 px-6">
            <div className="absolute inset-0 bg-flower-of-life opacity-30" />
            <div className="relative max-w-6xl mx-auto">
                <div ref={titleRef} className={`text-center mb-20 ${titleVisible ? 'animate-spiral' : 'opacity-0'}`}>
                    <span className="text-sm uppercase tracking-[0.3em] text-psyche-violet/60 block mb-4">Enciclopedia Psiconáutica</span>
                    <h2 className="text-4xl md:text-6xl font-black gradient-text mb-6">Sustancias</h2>
                    <p className="text-white/40 max-w-xl mx-auto">Información detallada y basada en evidencia sobre las principales sustancias psicodélicas. Conocer es protegerse.</p>
                </div>
                <MetatronDivider />
                <div className="grid md:grid-cols-2 gap-6 mt-12">
                    {substances.map((substance, i) => <SubstanceCard key={substance.id} substance={substance} index={i} />)}
                </div>
            </div>
        </section>
    );
}
