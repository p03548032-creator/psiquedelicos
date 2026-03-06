'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, AlertTriangle, Heart, Wind } from 'lucide-react';

type Substance = {
    id: string;
    name: string;
    phases: { name: string; duration: number; color: string; message: string }[];
};

const substances: Substance[] = [
    {
        id: 'psilocibina',
        name: 'Psilocibina / Setas',
        phases: [
            { name: 'Inicio', duration: 45, color: '#10b981', message: '🌱 El viaje comienza. Confía en el proceso.' },
            { name: 'Subida', duration: 60, color: '#f59e0b', message: '🌊 La energía sube. Respira con calma. Todo es natural.' },
            { name: 'Pico', duration: 90, color: '#7c3aed', message: '✨ Estás en el pico. Recuerda: todo pasa. Entrégate.' },
            { name: 'Descenso', duration: 90, color: '#3b82f6', message: '🌙 Comenzando a bajar. Integra lo que has vivido.' },
            { name: 'Integración', duration: 60, color: '#14b8a6', message: '🕊️ El viaje termina. Agradece y descansa.' },
        ],
    },
    {
        id: 'lsd',
        name: 'LSD',
        phases: [
            { name: 'Inicio', duration: 60, color: '#10b981', message: '🌱 El viaje comienza. Confía en el proceso.' },
            { name: 'Subida', duration: 90, color: '#f59e0b', message: '🌊 La energía sube. Respira con calma.' },
            { name: 'Pico', duration: 180, color: '#7c3aed', message: '✨ Estás en el pico. Estás seguro. Entrégate.' },
            { name: 'Descenso', duration: 120, color: '#3b82f6', message: '🌙 Comenzando a bajar. Integra lo que has vivido.' },
            { name: 'Integración', duration: 120, color: '#14b8a6', message: '🕊️ El viaje termina. Agradece y descansa.' },
        ],
    },
    {
        id: 'mdma',
        name: 'MDMA',
        phases: [
            { name: 'Inicio', duration: 45, color: '#10b981', message: '🌱 Sintiendo el efecto. Mantén la calma.' },
            { name: 'Subida', duration: 30, color: '#f59e0b', message: '💫 El estado cambia. Respira profundo.' },
            { name: 'Pico', duration: 90, color: '#ec4899', message: '💗 Pico de conexión. Disfruta y cuídate.' },
            { name: 'Descenso', duration: 60, color: '#3b82f6', message: '🌙 Bajando suavemente. Hidrátate con calma.' },
            { name: 'Integración', duration: 60, color: '#14b8a6', message: '🕊️ Descansa y cuida tu cuerpo.' },
        ],
    },
    {
        id: 'ketamina',
        name: 'Ketamina',
        phases: [
            { name: 'Inicio', duration: 5, color: '#10b981', message: '🌱 Efecto rápido. Quédate quieto y seguro.' },
            { name: 'K-Hole / Pico', duration: 30, color: '#8b5cf6', message: '🌀 Experiencia intensa. Recuerda: estás seguro.' },
            { name: 'Descenso', duration: 30, color: '#3b82f6', message: '🌙 Regresando. No te muevas todavía.' },
            { name: 'Integración', duration: 30, color: '#14b8a6', message: '🕊️ El efecto pasa. Tómate tu tiempo.' },
        ],
    },
];

const groundingTechniques = [
    { title: '4-7-8 Respiración', desc: 'Inhala 4s → Aguanta 7s → Exhala 8s. Repite 4 veces.' },
    { title: '5-4-3-2-1 Grounding', desc: 'Di en voz alta: 5 cosas que ves, 4 que tocas, 3 que escuchas, 2 que hueles, 1 que saboreas.' },
    { title: 'Mantra de Seguridad', desc: '"Esto es temporal. Elegí estar aquí. Mi cuerpo está seguro. Esto pasará."' },
    { title: 'Contacto con la Tierra', desc: 'Pon las manos en el suelo o en una pared. Siente la textura. Estás aquí, en este momento.' },
];

interface TripTimerProps {
    onClose: () => void;
}

export default function TripTimer({ onClose }: TripTimerProps) {
    const [step, setStep] = useState<'setup' | 'running' | 'done'>('setup');
    const [selectedSubstance, setSelectedSubstance] = useState<Substance>(substances[0]);
    const [elapsed, setElapsed] = useState(0); // minutes
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [showGrounding, setShowGrounding] = useState(false);
    const [groundingIndex, setGroundingIndex] = useState(0);

    // Calcular fase actual
    const getCurrentPhase = useCallback(() => {
        let accumulated = 0;
        for (let i = 0; i < selectedSubstance.phases.length; i++) {
            accumulated += selectedSubstance.phases[i].duration;
            if (elapsed < accumulated) return { phase: selectedSubstance.phases[i], index: i, accumulated };
        }
        return { phase: selectedSubstance.phases[selectedSubstance.phases.length - 1], index: selectedSubstance.phases.length - 1, accumulated };
    }, [elapsed, selectedSubstance]);

    const totalDuration = selectedSubstance.phases.reduce((a, p) => a + p.duration, 0);

    useEffect(() => {
        if (step !== 'running') return;
        const interval = setInterval(() => {
            setElapsed(prev => {
                const next = prev + 1;
                if (next >= totalDuration) {
                    setStep('done');
                    clearInterval(interval);
                }
                return next;
            });
        }, 60000); // cada minuto
        return () => clearInterval(interval);
    }, [step, totalDuration]);

    const startTrip = () => {
        setElapsed(0);
        setStartTime(new Date());
        setStep('running');
    };

    const { phase: currentPhase, index: phaseIndex } = getCurrentPhase();
    const phaseProgress = (() => {
        let acc = 0;
        for (let i = 0; i < phaseIndex; i++) acc += selectedSubstance.phases[i].duration;
        return Math.min(((elapsed - acc) / selectedSubstance.phases[phaseIndex].duration) * 100, 100);
    })();
    const totalProgress = Math.min((elapsed / totalDuration) * 100, 100);

    const formatTime = (mins: number) => {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return h > 0 ? `${h}h ${m}min` : `${m}min`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)' }}>

            {/* Fondo animado según la fase */}
            {step === 'running' && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-20 transition-colors duration-[3000ms]"
                        style={{ background: currentPhase.color }} />
                </div>
            )}

            <div className="relative z-10 w-full max-w-lg">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        {step === 'running' && (
                            <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: currentPhase.color }} />
                        )}
                        <h2 className="text-white font-black text-xl">
                            {step === 'setup' ? 'Monitor de Viaje' : step === 'running' ? 'En Viaje' : 'Viaje Completado'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full glass-sacred hover:bg-white/10 transition-colors text-white/60 hover:text-white cursor-pointer">
                        <X size={18} />
                    </button>
                </div>

                {/* SETUP */}
                {step === 'setup' && (
                    <div className="glass-sacred rounded-3xl p-8 border border-white/5">
                        <p className="text-white/50 text-sm mb-6">Selecciona la sustancia para monitorizar las fases en tiempo real.</p>
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {substances.map(s => (
                                <button key={s.id} onClick={() => setSelectedSubstance(s)}
                                    className="p-4 rounded-2xl border text-left transition-all cursor-pointer"
                                    style={{
                                        borderColor: selectedSubstance.id === s.id ? '#7c3aed60' : 'rgba(255,255,255,0.05)',
                                        background: selectedSubstance.id === s.id ? '#7c3aed15' : 'rgba(255,255,255,0.02)',
                                    }}>
                                    <p className="text-sm font-bold text-white">{s.name}</p>
                                    <p className="text-xs text-white/40 mt-1">~{Math.round(s.phases.reduce((a, p) => a + p.duration, 0) / 60)}h duración</p>
                                </button>
                            ))}
                        </div>
                        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
                            <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-white/50 leading-relaxed">
                                Esta herramienta es informativa. Los tiempos son aproximados y varían según la persona, dosis y entorno.
                            </p>
                        </div>
                        <button onClick={startTrip}
                            className="vesica-btn w-full py-4 font-bold text-white flex items-center justify-center gap-2 cursor-pointer"
                            style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
                            🚀 Iniciar Monitor
                        </button>
                    </div>
                )}

                {/* RUNNING */}
                {step === 'running' && !showGrounding && (
                    <div className="glass-sacred rounded-3xl p-8 border border-white/5">
                        {/* Fase actual */}
                        <div className="text-center mb-8">
                            <div className="text-5xl mb-3">{currentPhase.message.split(' ')[0]}</div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-3"
                                style={{ background: currentPhase.color + '20', color: currentPhase.color }}>
                                Fase: {currentPhase.name}
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
                                {currentPhase.message.slice(currentPhase.message.indexOf(' ') + 1)}
                            </p>
                        </div>

                        {/* Progreso de la fase actual */}
                        <div className="mb-6">
                            <div className="flex justify-between text-xs text-white/30 mb-2">
                                <span>Progreso en {currentPhase.name}</span>
                                <span>{Math.round(phaseProgress)}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-1000"
                                    style={{ width: `${phaseProgress}%`, background: currentPhase.color }} />
                            </div>
                        </div>

                        {/* Timeline de fases */}
                        <div className="mb-6">
                            <p className="text-xs text-white/30 mb-3">Línea de tiempo</p>
                            <div className="flex gap-1">
                                {selectedSubstance.phases.map((p, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                        <div className="w-full h-1.5 rounded-full transition-all duration-500"
                                            style={{
                                                background: i < phaseIndex ? p.color : i === phaseIndex ? `${p.color}80` : 'rgba(255,255,255,0.05)'
                                            }} />
                                        <span className="text-[8px] text-white/30 truncate w-full text-center">{p.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-white/5 text-center">
                                <p className="text-white text-lg font-black">{formatTime(elapsed)}</p>
                                <p className="text-white/30 text-xs">Tiempo transcurrido</p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/5 text-center">
                                <p className="text-white text-lg font-black">{formatTime(totalDuration - elapsed)}</p>
                                <p className="text-white/30 text-xs">Tiempo restante</p>
                            </div>
                        </div>

                        {/* Botón de socorro */}
                        <button onClick={() => { setShowGrounding(true); setGroundingIndex(0); }}
                            className="w-full py-3 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-bold flex items-center justify-center gap-2 cursor-pointer">
                            <AlertTriangle size={14} /> Viaje difícil — Ayuda
                        </button>
                    </div>
                )}

                {/* GROUNDING */}
                {step === 'running' && showGrounding && (
                    <div className="glass-sacred rounded-3xl p-8 border border-red-500/20">
                        <div className="text-center mb-6">
                            <Heart size={40} className="text-red-400 mx-auto mb-3" strokeWidth={1.5} />
                            <h3 className="text-white font-black text-xl mb-2">Estás Seguro</h3>
                            <p className="text-white/50 text-sm">Lo que sientes ahora es temporal. Tu cuerpo está bien.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 mb-6">
                            <h4 className="text-white font-bold mb-2">{groundingTechniques[groundingIndex].title}</h4>
                            <p className="text-white/60 text-sm leading-relaxed">{groundingTechniques[groundingIndex].desc}</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setGroundingIndex(i => (i + 1) % groundingTechniques.length)}
                                className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white text-sm font-medium transition-all cursor-pointer">
                                <Wind size={14} className="inline mr-1" /> Otra técnica
                            </button>
                            <button onClick={() => setShowGrounding(false)}
                                className="flex-1 py-3 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20 text-sm font-medium transition-all cursor-pointer">
                                ✓ Me siento mejor
                            </button>
                        </div>
                    </div>
                )}

                {/* DONE */}
                {step === 'done' && (
                    <div className="glass-sacred rounded-3xl p-8 border border-white/5 text-center">
                        <div className="text-5xl mb-4">🕊️</div>
                        <h3 className="text-white font-black text-2xl mb-2">Viaje Completado</h3>
                        <p className="text-white/50 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
                            El efecto principal ha terminado. Tómate tu tiempo para integrar la experiencia. Descansa, escribe, y cuídate.
                        </p>
                        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-left mb-6">
                            <p className="text-amber-400 text-xs font-bold mb-1">Recomendaciones post-viaje:</p>
                            <ul className="text-white/50 text-xs space-y-1">
                                <li>• Hidratación suave (agua, tisanas)</li>
                                <li>• Evita pantallas durante 2h más</li>
                                <li>• Escribe lo que recuerdas en el Diario</li>
                                <li>• Evita compromisos sociales hoy</li>
                            </ul>
                        </div>
                        <button onClick={onClose}
                            className="vesica-btn w-full py-3 gradient-psyche text-white font-bold cursor-pointer">
                            Ir al Diario de Integración →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
