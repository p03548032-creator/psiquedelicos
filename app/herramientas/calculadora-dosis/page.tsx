'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DosageCalculatorPage() {
    const [weight, setWeight] = useState(70);
    const [substance, setSubstance] = useState('dry_cubensis');
    const [level, setLevel] = useState('normal');
    const [ssri, setSsri] = useState(false);

    const substancesList = [
        {
            id: 'dry_cubensis',
            label: '🍄 Setas Secas',
            desc: 'Psilocybe Cubensis crudi.',
            unit: 'g',
            weightDependent: true,
            doses: { microdose: 0.2, low: 1.0, normal: 2.0, high: 3.5, heroic: 5.0 }
        },
        {
            id: 'fresh_cubensis',
            label: '🌿 Setas Frescas',
            desc: 'Recién cultivadas, 90% agua.',
            unit: 'g',
            weightDependent: true,
            doses: { microdose: 2.0, low: 10.0, normal: 20.0, high: 35.0, heroic: 50.0 }
        },
        {
            id: 'truffles',
            label: '🪨 Trufas Mágicas',
            desc: 'Esclerocios holandeses.',
            unit: 'g',
            weightDependent: true,
            doses: { microdose: 1.0, low: 5.0, normal: 10.0, high: 17.5, heroic: 25.0 }
        },
        {
            id: 'lsd',
            label: '🌈 LSD (Ácido)',
            desc: 'Independiente de tu peso corporal.',
            unit: 'µg',
            weightDependent: false,
            doses: { microdose: 10, low: 50, normal: 100, high: 200, heroic: 400 }
        },
        {
            id: 'mdma',
            label: '💊 MDMA (Cristal)',
            desc: '1.5mg/kg. Cuidado con dosis altas.',
            unit: 'mg',
            weightDependent: true,
            doses: { microdose: 30, low: 70, normal: 105, high: 150, heroic: 250 }
        },
        {
            id: 'ketamine',
            label: '🐴 Ketamina (Nasal)',
            desc: 'Nivel heroico = K-Hole total.',
            unit: 'mg',
            weightDependent: true,
            doses: { microdose: 15, low: 30, normal: 70, high: 120, heroic: 200 }
        }
    ];

    const activeSub = substancesList.find(s => s.id === substance) || substancesList[0];

    const calculateDose = () => {
        const base = activeSub.doses[level as keyof typeof activeSub.doses];
        const weightModifier = activeSub.weightDependent ? (weight / 70) : 1;

        let final = base * weightModifier;

        if (activeSub.unit === 'g') {
            return final >= 10 ? final.toFixed(1) : final.toFixed(2);
        } else {
            return Math.round(final).toString();
        }
    };

    return (
        <main className="min-h-screen pt-28 pb-20">
            <div className="max-w-4xl mx-auto px-6">

                {/* Cabecera */}
                <div className="text-center mb-12">
                    <span className="text-5xl mb-4 block">⚖️</span>
                    <h1 className="text-3xl md:text-5xl font-black mb-4">
                        Calculadora de <span className="gradient-text">Dosis</span>
                    </h1>
                    <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
                        Estima tu dosis recomendada según tu peso, el tipo de hongo y la intensidad del viaje que buscas.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">

                    {/* Controles */}
                    <div className="glass-sacred rounded-3xl p-6 md:p-8 space-y-8">

                        {/* Peso */}
                        <div>
                            <label className="flex items-center justify-between text-sm font-semibold text-white/80 mb-3">
                                <span>Tu peso corporal</span>
                                <span className="text-psyche-violet font-mono">{weight} kg</span>
                            </label>
                            <input
                                type="range"
                                min="40"
                                max="130"
                                value={weight}
                                onChange={(e) => setWeight(parseInt(e.target.value))}
                                className="w-full h-1.5 accent-psyche-violet bg-white/10 rounded-full cursor-pointer"
                            />
                        </div>

                        {/* Sustancia */}
                        <div>
                            <label className="text-sm font-semibold text-white/80 mb-3 block">Tipo de sustancia</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {substancesList.map(opt => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setSubstance(opt.id)}
                                        className={`p-3 rounded-xl border text-left transition-all ${substance === opt.id
                                            ? 'border-psyche-violet bg-psyche-violet/10 shadow-[0_0_15px_rgba(124,58,237,0.15)]'
                                            : 'border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/15'
                                            }`}
                                    >
                                        <h4 className={`text-sm font-semibold leading-tight mb-1 ${substance === opt.id ? 'text-white' : 'text-white/70'}`}>{opt.label}</h4>
                                        <p className="text-xs text-white/30 leading-snug">{opt.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Nivel */}
                        <div>
                            <label className="text-sm font-semibold text-white/80 mb-3 block">Intensidad deseada</label>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { id: 'microdose', label: '🔍 Microdosis' },
                                    { id: 'low', label: '🚶 Umbral / Baja' },
                                    { id: 'normal', label: '🧘 Normal / Media' },
                                    { id: 'high', label: '🚀 Fuerte' },
                                    { id: 'heroic', label: substance === 'ketamine' ? '🕳️ K-Hole' : substance === 'mdma' ? '⚠️ Excesiva (Peligro)' : '🌌 Heroica' },
                                ].map(opt => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setLevel(opt.id)}
                                        className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${level === opt.id
                                            ? 'bg-white/10 text-white border-white/20'
                                            : 'bg-black/20 text-white/40 border-transparent hover:bg-white/5'
                                            } ${(opt.id === 'heroic' && level !== 'heroic') ? 'col-span-2' : ''} ${opt.id === 'heroic' && level === 'heroic' ? 'col-span-2 border-red-500/30 bg-red-500/10 text-red-100 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : ''}`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* SSRI Info */}
                        <div className="pt-4 border-t border-white/10">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={ssri}
                                    onChange={(e) => setSsri(e.target.checked)}
                                    className="mt-1 w-4 h-4 rounded border-white/20 bg-black/50 text-psyche-violet focus:ring-psyche-violet/50 focus:ring-offset-black transition"
                                />
                                <div>
                                    <p className="text-sm font-medium text-white/80 group-hover:text-white transition">Tomo neuromoduladores (ISRS / Antidepresivos)</p>
                                    <p className="text-xs text-white/30 mt-1">Escitalopram, Sertralina, Fluoxetina, Citalopram, etc.</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Resultados */}
                    <div className="space-y-6 flex flex-col">
                        <div className="glass-sacred rounded-3xl p-8 flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 pointer-events-none">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-psyche-violet blur-[100px]" />
                            </div>

                            <h3 className="text-sm uppercase tracking-[0.2em] text-white/40 font-semibold mb-2 relative z-10">Dosis Estimada</h3>
                            <div className="text-6xl md:text-8xl font-black gradient-text tracking-tighter mb-4 relative z-10 flex items-baseline justify-center">
                                {calculateDose()} <span className="text-2xl md:text-4xl text-white/30 font-bold ml-2">{activeSub.unit}</span>
                            </div>

                            <p className="text-white/60 text-sm max-w-sm relative z-10">
                                de {activeSub.label.replace(/[^a-zA-Z\s()ÁÉÍÓÚáéíóú]/g, '')} {activeSub.weightDependent ? `para un peso de ${weight}kg.` : '(Independiente del peso).'}
                            </p>

                            {ssri && (
                                <div className="mt-8 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-left relative z-10 w-full animate-fade-in">
                                    <div className="flex gap-3">
                                        <span className="text-xl">⚠️</span>
                                        <div>
                                            <h4 className="text-sm font-bold text-orange-200 mb-1">Efecto blunted (reducido)</h4>
                                            <p className="text-xs text-orange-200/60 leading-relaxed">
                                                Los medicamentos ISRS regulan a la baja los receptores 5-HT2A. Es muy probable que experimentes una <strong>reducción drástica de los efectos (casi nulos)</strong>. <br /><br />
                                                No aumentes tu dosis de forma desproporcionada para compensar. Nunca dejes tu medicación de golpe sin supervisión médica.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {level === 'heroic' && !ssri && (
                                <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-left relative z-10 w-full animate-fade-in">
                                    <div className="flex gap-3">
                                        <span className="text-xl">{substance === 'mdma' ? '⚠️' : substance === 'ketamine' ? '🕳️' : '🌌'}</span>
                                        <div>
                                            <h4 className="text-sm font-bold text-red-200 mb-1">{substance === 'ketamine' ? 'K-Hole (Anestesia Disociativa)' : substance === 'mdma' ? 'Dosis Tóxica (Bajo tu propio riesgo)' : 'Dosis Heroica'}</h4>
                                            <p className="text-xs text-red-200/60 leading-relaxed">
                                                {substance === 'ketamine'
                                                    ? 'Entrarás en el "Agujero K": pérdida de control corporal e inmersión en tu inconsciente con disociación extrema del mundo. Hazlo tumbado, a oscuras, y lejos de bordes u objetos.'
                                                    : substance === 'mdma'
                                                        ? '¡ALERTA! Superar los 200mg aumenta exponencialmente la neurotoxicidad, destruye el sueño, sube tu temperatura a niveles críticos y provoca "comedowns" brutales, SIN sumarte más empatía (los receptores ya están vacíos). Evítalo.'
                                                        : 'Atención: Estás en territorio profundo. Prepárate para pérdida del ego, desorientación espacial/temporal y visiones intensas. Asegúrate de tener un Trip Sitter y un entorno psicológico seguro.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="glass-sacred rounded-2xl p-6 border-white/5 bg-white/[0.01]">
                            <h4 className="flex items-center gap-2 text-sm font-bold text-white/80 mb-3">
                                <span>⚖️</span> Nota de Reducción de Daños
                            </h4>
                            <p className="text-xs text-white/40 leading-relaxed">
                                Esta calculadora hace una estimación matemática. Sin embargo, la potencia real varía enormemente según la <strong>genética, cultivo, secado y tolerancia individual</strong> (la tolerancia de la psilocibina tarda ~14 días en resetearse por completo). Siempre usa la regla de oro: <br />
                                <strong className="text-white/60">"Empieza con poco, y ve despacio".</strong>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
