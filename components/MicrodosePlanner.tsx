'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Info, Edit3, Pill } from 'lucide-react';

type Protocol = 'fadiman' | 'stamets' | 'nightcap' | 'intuitive';

interface ProtocolInfo {
    id: Protocol;
    name: string;
    description: string;
    cycleStr: string;
    generateSchedule: (startDate: Date, days: number) => { date: Date; type: 'dose' | 'transition' | 'normal' }[];
}

const protocols: Record<Protocol, ProtocolInfo> = {
    fadiman: {
        id: 'fadiman',
        name: 'Protocolo Fadiman',
        description: 'El estándar de oro para principiantes. Permite observar los efectos residuales sin generar tolerancia rápida.',
        cycleStr: '1 día microdosis, 2 días descanso',
        generateSchedule: (start, days) => {
            return Array.from({ length: days }).map((_, i) => {
                const date = new Date(start);
                date.setDate(start.getDate() + i);
                const dayInCycle = i % 3;
                let type: 'dose' | 'transition' | 'normal' = 'normal';
                if (dayInCycle === 0) type = 'dose';
                else if (dayInCycle === 1) type = 'transition';
                return { date, type };
            });
        }
    },
    stamets: {
        id: 'stamets',
        name: 'Protocolo StametsStack',
        description: 'Usado con psilocibina, Melena de León y Niacina. Enfoque en neurogénesis cognitiva intensa.',
        cycleStr: '4 días microdosis, 3 días descanso',
        generateSchedule: (start, days) => {
            return Array.from({ length: days }).map((_, i) => {
                const date = new Date(start);
                date.setDate(start.getDate() + i);
                const dayInCycle = i % 7;
                let type: 'dose' | 'transition' | 'normal' = 'normal';
                if (dayInCycle < 4) type = 'dose';
                return { date, type };
            });
        }
    },
    nightcap: {
        id: 'nightcap',
        name: 'Protocolo Nightcap',
        description: 'Tomado antes de dormir (usualmente psilocibina) para soñar de forma lúcida y despertar fresco.',
        cycleStr: 'Días alternos (1 sí, 1 no)',
        generateSchedule: (start, days) => {
            return Array.from({ length: days }).map((_, i) => {
                const date = new Date(start);
                date.setDate(start.getDate() + i);
                let type: 'dose' | 'transition' | 'normal' = i % 2 === 0 ? 'dose' : 'normal';
                return { date, type };
            });
        }
    },
    intuitive: {
        id: 'intuitive',
        name: 'Protocolo Intuitivo',
        description: 'Recomendado solo tras tener experiencia. Escuchas a tu cuerpo y evitas tomar dos días seguidos.',
        cycleStr: 'A demanda (máximo 2-3 veces/semana)',
        generateSchedule: (start, days) => {
            return Array.from({ length: days }).map((_, i) => ({
                date: new Date(start.getTime() + i * 86400000),
                type: 'normal'
            }));
        }
    }
};

const DURATION_DAYS = 28; // 4 semanas

export default function MicrodosePlanner() {
    const [selectedProtocol, setSelectedProtocol] = useState<Protocol>('fadiman');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [currentStep, setCurrentStep] = useState(1);

    const activeProtocol = protocols[selectedProtocol];
    const schedule = activeProtocol.generateSchedule(startDate, DURATION_DAYS);

    // Formatear fecha para el input type="date"
    const formatDateForInput = (d: Date) => {
        return d.toISOString().split('T')[0];
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setStartDate(new Date(e.target.value));
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-white font-black text-lg flex items-center gap-2">
                        <CalendarIcon size={18} className="text-emerald-400" /> Planificador de Microdosis
                    </h3>
                    <p className="text-white/40 text-sm mt-0.5">Generador de rutinas y descansos</p>
                </div>
            </div>

            {currentStep === 1 && (
                <div className="space-y-6">
                    <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-3">1. Elige tu protocolo</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {(Object.keys(protocols) as Protocol[]).map(key => {
                                const p = protocols[key];
                                const isSelected = selectedProtocol === key;
                                return (
                                    <button key={key} onClick={() => setSelectedProtocol(key)}
                                        className="p-4 rounded-2xl border text-left transition-all cursor-pointer bg-white/[0.02] hover:bg-white/[0.04]"
                                        style={{
                                            borderColor: isSelected ? '#10b981' : 'rgba(255,255,255,0.05)',
                                            boxShadow: isSelected ? '0 0 0 1px #10b981' : 'none'
                                        }}>
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="text-white font-bold text-sm">{p.name}</p>
                                            <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/70">{p.cycleStr}</span>
                                        </div>
                                        <p className="text-white/50 text-xs leading-relaxed mt-2">{p.description}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-3">2. Fecha de inicio</p>
                        <input
                            type="date"
                            value={formatDateForInput(startDate)}
                            onChange={handleDateChange}
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/40 w-full cursor-pointer"
                        />
                    </div>

                    <button onClick={() => setCurrentStep(2)}
                        className="w-full py-4 rounded-xl font-bold text-white transition-all cursor-pointer shadow-xl"
                        style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                        Generar Calendario ({DURATION_DAYS} días)
                    </button>
                </div>
            )}

            {currentStep === 2 && (
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-white font-bold text-sm">{activeProtocol.name}</p>
                            <p className="text-white/40 text-xs mt-0.5">{startDate.toLocaleDateString()} — {schedule[schedule.length - 1].date.toLocaleDateString()}</p>
                        </div>
                        <button onClick={() => setCurrentStep(1)} className="text-emerald-400 text-xs flex items-center gap-1 hover:text-emerald-300 transition-colors">
                            <Edit3 size={12} /> Editar
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => (
                            <div key={d} className="text-center text-[10px] font-bold text-white/30 mb-2">{d}</div>
                        ))}

                        {/* Celdas vacías al inicio para alinear con el día de la semana */}
                        {Array.from({ length: (startDate.getDay() + 6) % 7 }).map((_, i) => (
                            <div key={`empty-${i}`} className="aspect-square rounded-xl bg-transparent" />
                        ))}

                        {/* Días del calendario */}
                        {schedule.map((day, i) => {
                            const isDose = day.type === 'dose';
                            const isTrans = day.type === 'transition';

                            return (
                                <div key={i} title={day.date.toLocaleDateString()}
                                    className={`relative aspect-square rounded-xl flex flex-col items-center justify-center border transition-all
                                        ${isDose ? 'bg-emerald-500/15 border-emerald-500/30' :
                                            isTrans ? 'bg-amber-500/10 border-amber-500/20' :
                                                'bg-white/[0.02] border-white/5'}`}>

                                    <span className={`text-xs font-medium z-10 ${isDose ? 'text-emerald-400 font-bold' : isTrans ? 'text-amber-400' : 'text-white/40'}`}>
                                        {day.date.getDate()}
                                    </span>

                                    {isDose && (
                                        <div className="absolute inset-0 m-auto w-8 h-8 rounded-full border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)] pointer-events-none" />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-black/20 p-4 rounded-xl border border-white/5 text-xs">
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500/30 border border-emerald-500" />
                                <span className="text-white/70">Día de Microdosis</span>
                            </div>
                            {selectedProtocol === 'fadiman' && (
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500" />
                                    <span className="text-white/70">Día de Transición</span>
                                </div>
                            )}
                        </div>
                        <p className="text-white/40 italic">
                            * Se recomienda tomar descansos largos (2-4 semanas) al finalizar el ciclo.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
