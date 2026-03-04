import { Metadata } from 'next';
import Link from 'next/link';
import SubstancesSection from '@/sections/SubstancesSection';
import SafetySection from '@/sections/SafetySection';
import { MetatronDivider } from '@/components/SacredGeometry';
import { substances } from '@/data/substances';

export const metadata: Metadata = {
    title: 'Guía de Sustancias Psicodélicas — PortalPSY',
    description: 'Enciclopedia completa sobre sustancias psicodélicas: efectos, dosis, riesgos, y estado legal en España. Información científica rigurosa y libre de estigma.',
    keywords: ['psilocibina', 'LSD', 'MDMA', 'DMT', 'ayahuasca', 'ketamina', 'psicodélicos', 'sustancias'],
};

export default function SustanciasPage() {
    return (
        <main className="min-h-screen pt-28">
            {/* Header */}
            <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
                <div className="inline-flex items-center gap-2 vesica-btn px-5 py-2 glass-sacred text-sm text-psyche-violet mb-6">
                    <span>🍄</span> Enciclopedia de Sustancias
                </div>
                <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                    <span className="gradient-text">Guía de Sustancias</span>
                    <br />
                    <span className="text-white/80">Psicodélicas</span>
                </h1>
                <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
                    Información científica, rigurosa y libre de estigma sobre las principales sustancias psicodélicas.
                    Efectos, mecanismos de acción, riesgos y contexto legal en España.
                </p>
                <p className="text-white/25 text-xs mt-4 max-w-xl mx-auto">
                    Este sitio ofrece información educativa. No constituye consejo médico ni incita al consumo.
                    Consulta siempre con un profesional sanitario.
                </p>
            </div>

            {/* Grid de sustancias */}
            <div className="max-w-6xl mx-auto px-6 mb-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
                    {substances.map(s => (
                        <Link key={s.id} href={`/sustancia/${s.id}`}
                            className="glass-sacred rounded-2xl p-5 hover:scale-[1.03] transition-all duration-300 group relative overflow-hidden">
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `radial-gradient(circle at center, ${s.color}10, transparent 70%)` }} />
                            <div className="relative">
                                <span className="mb-3 block text-white/80">
                                    <s.icon size={32} strokeWidth={1.5} />
                                </span>
                                <h2 className="text-sm font-bold text-white leading-snug mb-1">{s.name}</h2>
                                <p className="text-xs text-white/30">{s.aka}</p>
                                <div className="mt-3 flex flex-wrap gap-1">
                                    <span className="text-[10px] px-2 py-0.5 rounded-full"
                                        style={{ background: `${s.color}15`, color: `${s.color}cc` }}>
                                        {s.category}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <MetatronDivider />

            {/* Full sections */}
            <SubstancesSection />
            <MetatronDivider />
            <SafetySection />
        </main>
    );
}
