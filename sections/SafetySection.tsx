'use client';
import { safetyRules } from '@/data/substances';
import { useReveal } from '@/hooks/useReveal';
import { MetatronDivider } from '@/components/SacredGeometry';

function SafetyCard({ rule, index }: { rule: typeof safetyRules[0]; index: number }) {
    const { ref, visible } = useReveal(0.1);
    return (
        <div ref={ref} className={`${visible ? 'animate-spiral' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="glass-sacred rounded-2xl p-6 h-full hover:scale-[1.02] transition-all duration-500 group">
                <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">{rule.icon}</div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">{rule.title}</h3>
                        <p className="text-white/40 text-sm leading-relaxed">{rule.text}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SafetySection() {
    const { ref: titleRef, visible: titleVisible } = useReveal();
    return (
        <section id="seguridad" className="relative py-32 px-6">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent" />
            <div className="relative max-w-6xl mx-auto">
                <div ref={titleRef} className={`text-center mb-20 ${titleVisible ? 'animate-spiral' : 'opacity-0'}`}>
                    <span className="text-sm uppercase tracking-[0.3em] text-amber-500/60 block mb-4">Tu seguridad es lo primero</span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6">
                        <span className="gradient-text-warm">Reducción</span>{' '}
                        <span className="text-white/90">de Daños</span>
                    </h2>
                    <p className="text-white/40 max-w-2xl mx-auto">Los psicodélicos son herramientas poderosas que merecen respeto. Estas pautas pueden marcar la diferencia entre una experiencia transformadora y una traumática.</p>
                </div>
                <MetatronDivider />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {safetyRules.map((rule, i) => <SafetyCard key={i} rule={rule} index={i} />)}
                </div>
                <div className="mt-16 glass-sacred rounded-2xl p-8 md:p-12 text-center" style={{ borderColor: 'rgba(239,68,68,0.1)' }}>
                    <h3 className="text-xl font-bold text-white/80 mb-4">⚠️ Aviso Importante</h3>
                    <p className="text-white/40 text-sm leading-relaxed max-w-3xl mx-auto mb-6">
                        Este portal tiene fines exclusivamente informativos y educativos. No promovemos ni incitamos al consumo de sustancias ilegales. La información proporcionada sigue los principios de reducción de daños avalados por organismos como la OMS, ICEERS y Energy Control.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="https://energycontrol.org" target="_blank" rel="noopener noreferrer" className="vesica-btn px-6 py-2 glass-sacred text-sm text-white/60 hover:text-white transition-colors">Energy Control</a>
                        <a href="https://www.iceers.org" target="_blank" rel="noopener noreferrer" className="vesica-btn px-6 py-2 glass-sacred text-sm text-white/60 hover:text-white transition-colors">ICEERS</a>
                        <span className="vesica-btn px-6 py-2 glass-sacred text-sm text-red-400/80">Emergencias: 112</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
