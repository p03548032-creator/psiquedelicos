'use client';
import { useReveal } from '@/hooks/useReveal';
import { MetatronDivider } from '@/components/SacredGeometry';

const studies = [
    { year: '2024', title: 'Psilocibina para depresión resistente', institution: 'Imperial College London', result: 'El 67% de pacientes mostraron remisión completa a las 12 semanas.', icon: '🧠', color: '#c084fc' },
    { year: '2024', title: 'MDMA para TEPT', institution: 'MAPS / FDA', result: 'La FDA rechazó la aprobación solicitando más datos. Nuevos ensayos en curso para 2026.', icon: '💚', color: '#34d399' },
    { year: '2025', title: 'Esketamina nasal (Spravato®)', institution: 'AEMPS España', result: 'Disponible en hospitales españoles para depresión resistente al tratamiento.', icon: '💎', color: '#22d3ee' },
    { year: '2025', title: 'Microdosis y neuroplasticidad', institution: 'Universidad de Maastricht', result: 'Evidencia de aumento de BDNF y sinaptogénesis con microdosis de psilocibina.', icon: '🔬', color: '#f472b6' },
    { year: '2026', title: 'Ensayos con psilocibina en España', institution: 'Hospital Sant Pau, Barcelona', result: 'Primer ensayo clínico español con psilocibina para adicciones en fase II.', icon: '🇪🇸', color: '#fbbf24' },
];

function StudyCard({ study, index }: { study: typeof studies[0]; index: number }) {
    const { ref, visible } = useReveal(0.1);
    return (
        <div ref={ref} className={`${visible ? 'animate-spiral' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.12}s` }}>
            <div className="glass-sacred rounded-2xl p-6 md:p-8 h-full hover:scale-[1.01] transition-all duration-500 group relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] opacity-30 group-hover:opacity-60 transition-opacity"
                    style={{ background: `linear-gradient(to bottom, transparent, ${study.color}, transparent)` }} />
                <div className="flex items-start gap-4">
                    <span className="text-3xl">{study.icon}</span>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="vesica-btn px-3 py-0.5 text-xs font-mono" style={{ background: `${study.color}15`, color: study.color }}>{study.year}</span>
                            <span className="text-white/20 text-xs">{study.institution}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{study.title}</h3>
                        <p className="text-white/40 text-sm leading-relaxed">{study.result}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ResearchSection() {
    const { ref: titleRef, visible: titleVisible } = useReveal();
    return (
        <section id="investigacion" className="relative py-32 px-6">
            <div className="absolute inset-0 bg-flower-of-life opacity-20" />
            <div className="relative max-w-6xl mx-auto">
                <div ref={titleRef} className={`text-center mb-20 ${titleVisible ? 'animate-spiral' : 'opacity-0'}`}>
                    <span className="text-sm uppercase tracking-[0.3em] text-psyche-cyan/60 block mb-4">La Ciencia Habla</span>
                    <h2 className="text-4xl md:text-6xl font-black gradient-text-cool mb-6">Investigación</h2>
                    <p className="text-white/40 max-w-2xl mx-auto">El renacimiento psicodélico está respaldado por las universidades más prestigiosas del mundo. Estos son los avances más recientes.</p>
                </div>
                <MetatronDivider />
                <div className="grid md:grid-cols-2 gap-6 mt-12">
                    {studies.map((study, i) => <StudyCard key={i} study={study} index={i} />)}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                    {[
                        { value: '400+', label: 'Ensayos clínicos activos', color: '#a78bfa' },
                        { value: '15M+', label: 'Participantes en estudios', color: '#f472b6' },
                        { value: '30+', label: 'Universidades investigando', color: '#22d3ee' },
                        { value: '2026', label: 'Posible aprobación terapéutica', color: '#fbbf24' },
                    ].map((stat, i) => {
                        const { ref, visible } = useReveal(0.1); // eslint-disable-line react-hooks/rules-of-hooks
                        return (
                            <div key={i} ref={ref} className={`text-center glass-sacred rounded-2xl p-6 ${visible ? 'animate-spiral' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.15}s` }}>
                                <div className="text-3xl md:text-4xl font-black mb-2" style={{ color: stat.color }}>{stat.value}</div>
                                <div className="text-white/30 text-xs">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
