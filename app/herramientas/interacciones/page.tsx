'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MetatronDivider } from '@/components/SacredGeometry';

const substances = [
    { id: 'lsd', name: '🍄 LSD / Setas', type: 'psychedelic' },
    { id: 'mdma', name: '💊 MDMA (Éxtasis)', type: 'empathogen' },
    { id: 'cannabis', name: '🌿 Cannabis / THC', type: 'cannabinoid' },
    { id: 'ketamine', name: '🐴 Ketamina', type: 'dissociative' },
    { id: 'alcohol', name: '🍺 Alcohol', type: 'depressant' },
    { id: 'ssri', name: '💊 ISRS (Antidepresivos)', type: 'medication' },
    { id: 'imao', name: '🍵 Ayahuasca (IMAOs)', type: 'psychedelic' },
];

const interactionsDatabase: Record<string, { type: string, color: string, desc: string }> = {
    'lsd-mdma': { type: 'Sinergia', color: 'green', desc: 'Conocido como Candyflip/Hippieflip. Se potencian significativamente entre sí de forma extática. Se recomienda bajar la dosis habitual de ambas.' },
    'cannabis-lsd': { type: 'Precaución', color: 'yellow', desc: 'El cannabis potencia MASIVAMENTE la confusión y el bucle visual del viaje. Es la causa #1 de "malos viajes" inesperados. Fuma solo en la bajada si no tienes experiencia.' },
    'lsd-ssri': { type: 'Efecto Anulado', color: 'blue', desc: 'Los antidepresivos ISRS (Sertralina, Escitalopram...) atenúan fuertemente o anulan por completo los efectos del LSD y Psilocibina.' },
    'alcohol-lsd': { type: 'Precaución Ligera', color: 'yellow', desc: 'Poco recomendable. El alcohol entorpece la lucidez del viaje psicodélico, puede provocar nauseas y ahoga el potencial introspectivo mental.' },
    'lsd-imao': { type: 'Potenciador Fuerte', color: 'yellow', desc: 'Los IMAO prolongan y potencian violentamente la psilocibina (Psilohuasca). Viajes extremadamente largos y profundos.' },

    'mdma-ssri': { type: 'Peligro / Bloqueo', color: 'blue', desc: 'Efecto anulado. Los ISRS bloquean el transportador SERT. El MDMA no te "subirá". No tomes dosis gigantes intentando compensarlo, podrías disparar un Síndrome Serotoninérgico.' },
    'imao-mdma': { type: 'PELIGRO MORTAL', color: 'red', desc: 'Mezcla FATAL. Tomar Ayahuasca o IMAOs junto con MDMA provoca Síndrome Serotoninérgico masivo: neurotoxicidad extrema, hipertermia, convulsiones o la muerte.' },
    'alcohol-mdma': { type: 'Peligro Moderado', color: 'orange', desc: 'Ambos deshidratan enormemente la barrera hematoencefálica. El alcohol apaga la empatía y la "magia" del MDMA, además de aumentar drásticamente el daño a tu hígado y cerebro.' },
    'cannabis-mdma': { type: 'Bajo Riesgo', color: 'green', desc: 'Totalmente habitual en la bajada del MDMA ("comedown") para relajar y dormir. En algunos casos puntuales reaviva alucinaciones leves.' },

    'alcohol-ketamine': { type: 'PELIGRO MORTAL', color: 'red', desc: 'Combinación Crítica. Ambos son depresores del sistema respiratorio. Mezclados causan pérdida instantánea de consciencia, asfixia por vómito y paro cardiorrespiratorio.' },
    'cannabis-ketamine': { type: 'Precaución', color: 'yellow', desc: 'Bajo riesgo fisiológico pero produce enorme desorientación y disociación mental (K-Hole involuntario). Cuidado con la paranoia.' },
    'mdma-ketamine': { type: 'Bajo Riesgo / Sinergia', color: 'green', desc: 'Habitual en pistas de baile en la bajada del MDMA. Bajo riesgo físico si se controlan bien las dosis.' },

    'alcohol-cannabis': { type: 'Precaución', color: 'yellow', desc: 'Beber *antes* de fumar aumenta agresivamente la absorción del THC (la temida "pálida" o crossfade). Mayor riesgo de mareos extremos y vómitos.' },

    'imao-ssri': { type: 'PELIGRO MORTAL', color: 'red', desc: 'Absolutamente contraindicado. Interacción química severa (Síndrome Serotónico). Ayahuasca + Antidepresivos ISRS interactúan forzando un colapso en la serotonina del cerebro.' },
};

export default function InteractionCheckerPage() {
    const [sub1, setSub1] = useState<string | null>(null);
    const [sub2, setSub2] = useState<string | null>(null);

    const getInteraction = () => {
        if (!sub1 || !sub2) return null;
        if (sub1 === sub2) return { type: 'Misma sustancia', color: 'gray', desc: 'Has seleccionado la misma sustancia. El riesgo es relativo directamente a la dosis (toxicidad propia).' };

        const key1 = `${sub1}-${sub2}`;
        const key2 = `${sub2}-${sub1}`;

        return interactionsDatabase[key1] || interactionsDatabase[key2] || {
            type: 'Sin Datos o Bajo Riesgo Físico',
            color: 'gray',
            desc: 'No tenemos un perfil crítico registrado para esta combinación puntual. Sé extremadamente cauto y aplica el sentido común. Empieza con una cuarte parte de tu dosis normal si mezclas.'
        };
    };

    const result = getInteraction();

    const colorConfig: Record<string, string> = {
        'red': 'bg-red-500/10 border-red-500/30 text-red-400',
        'orange': 'bg-orange-500/10 border-orange-500/30 text-orange-400',
        'yellow': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',
        'green': 'bg-green-500/10 border-green-500/30 text-green-400',
        'blue': 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
        'gray': 'bg-white/5 border-white/10 text-white/50',
    };

    const colorHeaderConfig: Record<string, string> = {
        'red': 'text-red-400',
        'orange': 'text-orange-400',
        'yellow': 'text-yellow-400',
        'green': 'text-green-400',
        'blue': 'text-cyan-400',
        'gray': 'text-white/60',
    };

    return (
        <main className="min-h-screen pt-28 pb-20">
            <div className="max-w-4xl mx-auto px-6">

                {/* Cabecera */}
                <div className="text-center mb-12">
                    <span className="text-5xl mb-4 block">🧬</span>
                    <h1 className="text-3xl md:text-5xl font-black mb-4">
                        Comprobador de <span className="gradient-text-warm">Interacciones</span>
                    </h1>
                    <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
                        Selecciona dos sustancias para comprobar el riesgo biológico o psicológico de usarlas juntas. Basado en farmacología clínica (TripSit / RollSafe).
                    </p>
                </div>

                <div className="grid md:grid-cols-[1fr,1fr] gap-6 md:gap-12 items-start relative max-w-3xl mx-auto">

                    {/* Sustancia 1 */}
                    <div className="glass-sacred rounded-3xl p-6 relative">
                        <div className="absolute -top-3 left-6 px-3 py-1 bg-[#101018] rounded border border-white/10 text-xs font-bold text-white/40 uppercase tracking-widest">
                            Sustancia 1
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            {substances.map(s => (
                                <button
                                    key={`1-${s.id}`}
                                    onClick={() => setSub1(s.id)}
                                    className={`p-3 rounded-xl border transition-all text-left text-sm ${sub1 === s.id ? 'border-psyche-cyan bg-psyche-cyan/10 font-bold text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5 hover:text-white'}`}
                                >
                                    {s.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Icono Conector en Desktop */}
                    <div className="hidden md:flex absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#0e0a16] border border-white/5 rounded-full items-center justify-center z-10 shadow-2xl">
                        <span className="text-xl">➕</span>
                    </div>

                    {/* Sustancia 2 */}
                    <div className="glass-sacred rounded-3xl p-6 relative">
                        <div className="absolute -top-3 left-6 px-3 py-1 bg-[#101018] rounded border border-white/10 text-xs font-bold text-white/40 uppercase tracking-widest">
                            Sustancia 2
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            {substances.map(s => (
                                <button
                                    key={`2-${s.id}`}
                                    onClick={() => setSub2(s.id)}
                                    className={`p-3 rounded-xl border transition-all text-left text-sm ${sub2 === s.id ? 'border-psyche-pink bg-psyche-pink/10 font-bold text-white shadow-[0_0_15px_rgba(219,39,119,0.15)]' : 'border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5 hover:text-white'}`}
                                >
                                    {s.name}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* RESULTADO (Muestra si hay 2) */}
                {result && (
                    <div className={`mt-12 glass-sacred rounded-3xl p-8 md:p-12 relative overflow-hidden transition-all animate-fade-in border ${colorConfig[result.color].split(' ')[1]}`}>
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">

                            <div className={`w-36 h-36 flex-shrink-0 border-4 rounded-full flex flex-col items-center justify-center -rotate-6 shadow-2xl ${colorConfig[result.color]}`}>
                                {result.color === 'red' && <span className="text-4xl">⚠️</span>}
                                {result.color === 'orange' && <span className="text-4xl">🍹</span>}
                                {result.color === 'yellow' && <span className="text-4xl">🚧</span>}
                                {result.color === 'green' && <span className="text-4xl">🌟</span>}
                                {result.color === 'blue' && <span className="text-4xl">📉</span>}
                                {result.color === 'gray' && <span className="text-4xl">🤔</span>}
                            </div>

                            <div>
                                <h3 className="text-[10px] uppercase font-black tracking-[0.2em] mb-2 opacity-50">Pronóstico del cruce</h3>
                                <h2 className={`text-3xl md:text-5xl font-black mb-4 uppercase mix-blend-screen leading-none ${colorHeaderConfig[result.color]}`}>{result.type}</h2>
                                <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
                                    {result.desc}
                                </p>
                            </div>

                        </div>
                    </div>
                )}

                <MetatronDivider />

                <div className="glass-sacred rounded-2xl p-6 border-white/5 bg-white/[0.01] max-w-2xl mx-auto text-center">
                    <p className="text-xs text-white/40 mb-2 font-bold uppercase tracking-widest">Aviso Legal de Exención Médica</p>
                    <p className="text-[11px] text-white/30 leading-relaxed">
                        No somos médicos ni especialistas. Esta herramienta es meramente didáctica, construida a partir de estudios del repositorio TripSit y testimonios recopilados peer-reviewed. Cualquier nueva sustancia puede traer alergias o interacciones imprevistas con tus enzimas hepáticas. Cuidate mucho, evalúa el contexto en calma, no bebas para la ansiedad e infórmarte.
                    </p>
                </div>

            </div>
        </main>
    );
}
