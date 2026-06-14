'use client';

import { useState, useEffect } from 'react';
import MusicRoom from '@/components/MusicRoom';
import { Music, Waves, Wind, Moon } from 'lucide-react';

const features = [
    { icon: Wind, title: 'Fases del viaje', desc: 'Presets adaptados a Preparación, Subida, Pico, Descenso e Integración.' },
    { icon: Music, title: 'Mezcla capas', desc: 'Combina cuencos tibetanos, lluvia, ríos, drones y más en tiempo real.' },
    { icon: Moon, title: 'Timer de sueño', desc: 'Fade out automático. Elige 15, 30, 60 o 120 minutos.' },
    { icon: Waves, title: 'Sin anuncios ni cuentas', desc: 'Audio generativo gratuito, sin login, sin interrupciones.' },
];

export default function MusicaPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <main className="min-h-screen pt-28 pb-20 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-psyche-violet/10 blur-[150px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-psyche-cyan/10 blur-[150px] rounded-full mix-blend-screen" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl glass-sacred border border-psyche-violet/20 mb-6">
                        <Music size={28} className="text-psyche-violet" strokeWidth={1.5} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
                        Sala de <span className="gradient-text">Música</span>
                    </h1>
                    <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
                        Generador de sonido para cada fase de tu experiencia. Crea el ambiente perfecto para preparar, acompañar o cerrar tu viaje.
                    </p>
                </div>

                {/* Features strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
                    {features.map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <div key={i} className="glass-sacred rounded-2xl p-4 border border-white/5 text-center">
                                <Icon size={20} className="text-psyche-violet/60 mx-auto mb-2" strokeWidth={1.5} />
                                <h3 className="text-white/70 text-xs font-semibold mb-1">{f.title}</h3>
                                <p className="text-white/25 text-[10px] leading-relaxed">{f.desc}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Music Room */}
                {mounted ? (
                    <MusicRoom />
                ) : (
                    <div className="glass-sacred rounded-3xl p-12 border border-white/5 text-center">
                        <div className="w-8 h-8 border-2 border-psyche-violet/40 border-t-psyche-violet rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-white/30 text-sm">Iniciando motor de audio...</p>
                    </div>
                )}

                {/* Footer info */}
                <div className="mt-8 p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                    <p className="text-white/25 text-xs leading-relaxed">
                        Usa auriculares para mejores resultados. El audio funciona mejor con Web Audio API en Chrome, Firefox o Safari actualizado.
                        Toda la generación es local en tu navegador — no se transmite audio a ningún servidor.
                    </p>
                </div>
            </div>
        </main>
    );
}
