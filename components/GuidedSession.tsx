'use client';

import { useState, useEffect, useRef } from 'react';
import { Headphones, Play, Square, Settings2, Wind, HeartPulse, Sparkles, ChevronDown } from 'lucide-react';

type BreathingPhase = 'inhale' | 'hold-in' | 'exhale' | 'hold-out';

interface BreathingPattern {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
    color: string;
    pattern: {
        phase: BreathingPhase;
        duration: number; // en milisegundos
        label: string;
    }[];
}

const patterns: BreathingPattern[] = [
    {
        id: 'box',
        name: 'Respiración de Caja',
        description: 'Ideal para detener ataques de pánico y anclarte al presente rápidamente. (4-4-4-4)',
        icon: Square,
        color: '#3b82f6', // blue
        pattern: [
            { phase: 'inhale', duration: 4000, label: 'Inhala' },
            { phase: 'hold-in', duration: 4000, label: 'Retén' },
            { phase: 'exhale', duration: 4000, label: 'Exhala' },
            { phase: 'hold-out', duration: 4000, label: 'Retén vacía' },
        ],
    },
    {
        id: 'relax',
        name: 'Relajación Profunda (4-7-8)',
        description: 'Reduce la ansiedad severa y prepara el sistema nervioso para el descanso. Excelente post-viaje.',
        icon: Wind,
        color: '#10b981', // emerald
        pattern: [
            { phase: 'inhale', duration: 4000, label: 'Inhala' },
            { phase: 'hold-in', duration: 7000, label: 'Retén' },
            { phase: 'exhale', duration: 8000, label: 'Exhala lento' },
        ],
    },
    {
        id: 'resonance',
        name: 'Resonancia Cardíaca',
        description: 'Equilibra el sistema simpático y parasimpático. Crea coherencia emocional. (5.5 - 5.5)',
        icon: HeartPulse,
        color: '#f43f5e', // rose
        pattern: [
            { phase: 'inhale', duration: 5500, label: 'Inhala fluido' },
            { phase: 'exhale', duration: 5500, label: 'Exhala fluido' },
        ],
    },
];

export default function GuidedSession() {
    const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(patterns[0]);
    const [isActive, setIsActive] = useState(false);
    const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0); // en segundos para display
    const [showSelector, setShowSelector] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const currentPhase = selectedPattern.pattern[currentPhaseIndex];

    useEffect(() => {
        if (!isActive) {
            if (timerRef.current) clearTimeout(timerRef.current);
            setCurrentPhaseIndex(0);
            setTimeLeft(selectedPattern.pattern[0].duration / 1000);
            return;
        }

        const runPhase = () => {
            const phase = selectedPattern.pattern[currentPhaseIndex];
            setTimeLeft(Math.ceil(phase.duration / 1000));

            // Cuenta regresiva visual cada segundo
            let remaining = phase.duration / 1000;
            const interval = setInterval(() => {
                remaining -= 1;
                setTimeLeft(Math.ceil(remaining));
            }, 1000);

            timerRef.current = setTimeout(() => {
                clearInterval(interval);
                setCurrentPhaseIndex((prev) => (prev + 1) % selectedPattern.pattern.length);
            }, phase.duration);
        };

        runPhase();

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isActive, currentPhaseIndex, selectedPattern]);

    const toggleSession = () => {
        setIsActive(!isActive);
    };

    // Calcular progreso de la animación circular
    let circleScale = 1;
    let circleOpacity = 0.5;

    if (isActive) {
        if (currentPhase.phase === 'inhale') {
            circleScale = 1.5;
            circleOpacity = 0.8;
        } else if (currentPhase.phase === 'exhale') {
            circleScale = 1;
            circleOpacity = 0.3;
        } else if (currentPhase.phase === 'hold-in') {
            circleScale = 1.5;
            circleOpacity = 0.6;
        } else if (currentPhase.phase === 'hold-out') {
            circleScale = 1;
            circleOpacity = 0.5;
        }
    }

    return (
        <div className="flex flex-col items-center">
            {/* Cabecera */}
            <div className="w-full flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-white font-black text-lg flex items-center gap-2">
                        <Headphones size={18} className="text-violet-400" /> Sesión Guiada
                    </h3>
                    <p className="text-white/40 text-sm mt-0.5">Focus y regulación nerviosa</p>
                </div>
            </div>

            {/* Selector de patrón */}
            <div className="w-full relative z-10 mb-12">
                <button
                    onClick={() => !isActive && setShowSelector(!showSelector)}
                    disabled={isActive}
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    <div className="flex items-center gap-3 text-left">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${selectedPattern.color}15` }}>
                            <selectedPattern.icon size={20} color={selectedPattern.color} />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm tracking-wide">{selectedPattern.name}</p>
                            <p className="text-white/40 text-xs mt-0.5 max-w-[280px]">{selectedPattern.description}</p>
                        </div>
                    </div>
                    {!isActive && <ChevronDown size={16} className={`text-white/30 transition-transform ${showSelector ? 'rotate-180' : ''}`} />}
                </button>

                {showSelector && !isActive && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1c23] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2 space-y-1">
                        {patterns.map(p => (
                            <button key={p.id} onClick={() => { setSelectedPattern(p); setShowSelector(false); }}
                                className={`w-full p-3 rounded-xl flex items-center gap-3 text-left transition-colors cursor-pointer ${selectedPattern.id === p.id ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                                <p.icon size={16} color={p.color} />
                                <div>
                                    <p className="text-white text-sm font-medium">{p.name}</p>
                                    <p className="text-white/40 text-xs">{p.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Círculo de Respiración Visual */}
            <div className="relative w-64 h-64 flex items-center justify-center mb-12">
                {/* Anillo exterior decorativo */}
                <div className="absolute inset-0 rounded-full border border-white/5" />

                {/* Círculo animado */}
                <div
                    className="absolute w-32 h-32 rounded-full blur-xl"
                    style={{
                        background: selectedPattern.color,
                        transform: `scale(${circleScale})`,
                        opacity: circleOpacity,
                        transition: `transform ${currentPhase.duration}ms ease-in-out, opacity ${currentPhase.duration}ms ease-in-out`,
                    }}
                />

                {/* Núcleo sólido */}
                <div
                    className="relative z-10 w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-2xl"
                    style={{
                        background: 'rgba(20,20,30,0.8)',
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${isActive ? selectedPattern.color : 'rgba(255,255,255,0.1)'}`,
                        transform: `scale(${isActive ? (currentPhase.phase === 'inhale' || currentPhase.phase === 'hold-in' ? 1.05 : 0.95) : 1})`,
                        transition: isActive ? `transform ${currentPhase.duration}ms ease-in-out` : 'transform 0.5s',
                    }}
                >
                    <p className="text-xs text-white/50 uppercase tracking-[0.2em] mb-1 font-semibold">
                        {isActive ? currentPhase.label : 'Preparado'}
                    </p>
                    <p className="text-4xl font-black text-white mix-blend-screen tabular-nums">
                        {isActive ? timeLeft : ''}
                        {!isActive && <Sparkles size={24} className="text-white/20" />}
                    </p>
                </div>
            </div>

            {/* Controles */}
            <button
                onClick={toggleSession}
                className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer text-white shadow-xl"
                style={{ background: isActive ? '#ef4444' : `linear-gradient(135deg, ${selectedPattern.color}, ${selectedPattern.color}dd)` }}
            >
                {isActive ? (
                    <><Square size={16} fill="currentColor" /> Detener Sesión</>
                ) : (
                    <><Play size={16} fill="currentColor" /> Comenzar Sesión</>
                )}
            </button>

            <p className="text-white/30 text-xs text-center mt-6 max-w-sm">
                Sigue la expansión y contracción del círculo con tu respiración visualmente.
            </p>
        </div>
    );
}
