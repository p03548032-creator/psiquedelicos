'use client';

import { useState } from 'react';
import {
    Timer,
    AlertTriangle,
    BookOpen,
    Map,
    Headphones,
    Zap,
    ChevronRight,
    X,
    Maximize2,
    Minimize2,
    MousePointer2,
    Calendar as CalendarIcon,
    Music,
    Shield,
} from 'lucide-react';
import TripTimer from '@/components/TripTimer';
import InteractionChecker from '@/components/InteractionChecker';
import IntegrationDiary from '@/components/IntegrationDiary';
import SetSettingGenerator from '@/components/SetSettingGenerator';
import NaviganteChat from '@/components/NaviganteChat';
import GuidedSession from '@/components/GuidedSession';
import InteractiveVisualizer from '@/components/InteractiveVisualizer';
import MicrodosePlanner from '@/components/MicrodosePlanner';
import JourneyRoomSection from '@/sections/JourneyRoomSection';

type Tool = 'trip-timer' | 'interactions' | 'diary' | 'set-setting' | 'ai-guide' | 'guided-session' | 'visualizer' | 'microdose' | 'journey-room';

interface SalaProClientProps {
    userId: string;
    userEmail: string | null;
    userFullName: string | null;
}

const tools = [
    {
        id: 'trip-timer',
        icon: Timer,
        emoji: '⏱️',
        title: 'Trip Timer',
        subtitle: 'Monitor de Viaje en tiempo real',
        description: 'Sigue cada fase de tu viaje. Mensajes de apoyo, técnicas de grounding si el viaje se complica.',
        color: '#7c3aed',
        badge: 'NUEVO',
    },
    {
        id: 'interactions',
        icon: AlertTriangle,
        emoji: '⚠️',
        title: 'Interacciones',
        subtitle: 'Comprobador de combinaciones',
        description: 'Verifica si es seguro combinar una sustancia con medicamentos u otras drogas. Basado en TripSit.',
        color: '#ef4444',
        badge: 'NUEVO',
    },
    {
        id: 'diary',
        icon: BookOpen,
        emoji: '📓',
        title: 'Diario de Integración',
        subtitle: 'Espacio de reflexión privado',
        description: 'Escribe tus experiencias y reflexiones. Preguntas guiadas para integrar cada viaje.',
        color: '#10b981',
        badge: 'NUEVO',
    },
    {
        id: 'set-setting',
        icon: Map,
        emoji: '🗺️',
        title: 'Generador Set & Setting',
        subtitle: 'Plan de viaje personalizado',
        description: 'Wizard de 3 pasos: sustancia, intención y entorno → plan completo con timeline y seguridad.',
        color: '#f59e0b',
        badge: 'NUEVO',
    },
    {
        id: 'ai-guide',
        icon: Zap,
        emoji: '🤖',
        title: 'El Navegante IA',
        subtitle: 'Asistente especializado',
        description: 'Preguntas sobre dosis, efectos, preparación e integración. Rigor científico en español. Impulsado por Gemini.',
        color: '#06b6d4',
        badge: 'NUEVO',
    },
    {
        id: 'guided-session',
        icon: Headphones,
        emoji: '🧘',
        title: 'Sesión Guiada',
        subtitle: 'Respiración y anclaje',
        description: 'Técnicas de respiración interactivas (Box, 4-7-8, Resonancia) para preparar el viaje o salir de bucles de ansiedad.',
        color: '#f43f5e',
        badge: 'NUEVO',
    },
    {
        id: 'visualizer',
        icon: MousePointer2,
        emoji: '🌀',
        title: 'Anclaje Visual',
        subtitle: 'Geometría y fluidos',
        description: 'Visualizador interactivo para enfocar la mente y romper bucles de ansiedad durante el efecto pico.',
        color: '#ec4899',
        badge: 'NUEVO',
    },
    {
        id: 'microdose',
        icon: CalendarIcon,
        emoji: '📅',
        title: 'Plan Microdosis',
        subtitle: 'Calendario de tomas',
        description: 'Planificador visual de 28 días basado en protocolos reconocidos (Fadiman, Stamets, Nightcap).',
        color: '#34d399',
        badge: 'NUEVO',
    },
    {
        id: 'journey-room',
        icon: Music,
        emoji: '🎵',
        title: 'Sala de Viaje',
        subtitle: 'Música curada por fases',
        description: 'Reproductor HD nativo. Audios ambientales y chamánicos desde la preparación a la integración.',
        color: '#8b5cf6',
        badge: 'DESTACADO',
    },
];

export default function SalaProClient({ userId, userEmail, userFullName }: SalaProClientProps) {
    const [activeTool, setActiveTool] = useState<Tool | null>(null);
    const [activeModal, setActiveModal] = useState<'interactions' | 'diary' | 'set-setting' | 'ai-guide' | 'guided-session' | 'visualizer' | 'microdose' | 'journey-room' | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleToolClick = (tool: typeof tools[number]) => {
        if (tool.id === 'trip-timer') setActiveTool('trip-timer');
        if (tool.id === 'interactions') setActiveModal('interactions');
        if (tool.id === 'diary') setActiveModal('diary');
        if (tool.id === 'set-setting') setActiveModal('set-setting');
        if (tool.id === 'ai-guide') setActiveModal('ai-guide');
        if (tool.id === 'guided-session') setActiveModal('guided-session');
        if (tool.id === 'visualizer') setActiveModal('visualizer');
        if (tool.id === 'microdose') setActiveModal('microdose');
        if (tool.id === 'journey-room') setActiveModal('journey-room');
    };

    const firstLetter = userFullName?.charAt(0) || '✦';
    const shortName = userFullName?.split(' ')[0] || 'Navegante';

    return (
        <>
            {activeTool === 'trip-timer' && (
                <TripTimer onClose={() => setActiveTool(null)} />
            )}

            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
                    style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)' }}>
                    <div className={`relative w-full glass-sacred overflow-y-auto transition-all duration-300 ${isFullscreen ? 'max-w-none h-full rounded-none border-none p-4 md:p-12' : 'max-w-2xl rounded-3xl p-8 border border-white/5 max-h-[92vh]'}`}>
                        <div className="absolute top-5 right-5 flex items-center gap-2 z-10">
                            <button onClick={() => setIsFullscreen(!isFullscreen)}
                                className="p-2 rounded-full glass-sacred hover:bg-white/10 transition-colors text-white/40 hover:text-white cursor-pointer"
                                title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
                            >
                                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                            </button>
                            <button onClick={() => { setActiveModal(null); setIsFullscreen(false); }}
                                className="p-2 rounded-full glass-sacred hover:bg-white/10 transition-colors text-white/40 hover:text-white cursor-pointer"
                                title="Cerrar"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        {activeModal === 'interactions' && (
                            <>
                                <div className="mb-6">
                                    <h2 className="text-white font-black text-xl">⚠️ Comprobador de Interacciones</h2>
                                    <p className="text-white/40 text-sm mt-0.5">Basado en TripSit y guías clínicas de reducción de daños</p>
                                </div>
                                <InteractionChecker />
                            </>
                        )}
                        {activeModal === 'diary' && (
                            <IntegrationDiary userId={userId} />
                        )}
                        {activeModal === 'set-setting' && (
                            <SetSettingGenerator />
                        )}
                        {activeModal === 'ai-guide' && (
                            <NaviganteChat />
                        )}
                        {activeModal === 'guided-session' && (
                            <GuidedSession />
                        )}
                        {activeModal === 'visualizer' && (
                            <InteractiveVisualizer />
                        )}
                        {activeModal === 'microdose' && (
                            <MicrodosePlanner />
                        )}
                        {activeModal === 'journey-room' && (
                            <div className="-mx-4 -my-4 h-[80vh] overflow-y-auto">
                                <JourneyRoomSection />
                            </div>
                        )}
                    </div>
                </div>
            )}

            <main className="min-h-screen bg-psyche-bg text-white pt-28 pb-20 px-6 relative overflow-hidden">
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-psyche-violet/10 rounded-full blur-[200px]" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-psyche-pink/8 rounded-full blur-[180px]" />
                    {[...Array(20)].map((_, i) => (
                        <div key={i}
                            className="absolute w-px h-px rounded-full bg-white/30"
                            style={{
                                left: `${(i * 5.3 + 7) % 100}%`,
                                top: `${(i * 7.1 + 13) % 100}%`,
                                boxShadow: '0 0 4px 1px rgba(255,255,255,0.15)',
                            }} />
                    ))}
                </div>

                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="mb-14">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-psyche-violet to-psyche-pink flex items-center justify-center text-2xl font-black border border-white/10 shadow-2xl shadow-psyche-violet/30">
                                {firstLetter}
                            </div>
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-psyche-violet/70">Tu Espacio</span>
                                <h1 className="text-3xl md:text-4xl font-black">
                                    Bienvenido, <span className="gradient-text">{shortName}</span>
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black text-white/90">Ecosistema Integral</h2>
                            <span className="text-xs text-white/30">
                                {tools.length} herramientas
                            </span>
                        </div>

                        {[
                            { title: 'Fase 1: Preparación', color: '#10b981', tools: ['set-setting', 'interactions', 'microdose'] },
                            { title: 'Fase 2: El Viaje (Espacio Seguro)', color: '#7c3aed', tools: ['trip-timer', 'journey-room', 'visualizer'] },
                            { title: 'Fase 3: Integración', color: '#f59e0b', tools: ['diary', 'guided-session', 'ai-guide'] }
                        ].map((group, groupIndex) => (
                            <div key={groupIndex} className="mb-12">
                                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                                    <span className="w-2 h-2 rounded-full" style={{ background: group.color }} />
                                    <h3 className="text-white/70 font-bold uppercase tracking-widest text-xs">
                                        {group.title}
                                    </h3>
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {tools.filter(t => group.tools.includes(t.id)).map(tool => {
                                        const Icon = tool.icon;

                                        return (
                                            <button
                                                key={tool.id}
                                                onClick={() => handleToolClick(tool)}
                                                className="relative rounded-2xl p-6 text-left border transition-all duration-300 group hover:scale-[1.02] cursor-pointer hover:border-white/20"
                                                style={{
                                                    borderColor: `${tool.color}30`,
                                                    background: `linear-gradient(135deg, ${tool.color}08, transparent)`,
                                                    boxShadow: `0 0 40px ${tool.color}08`,
                                                }}
                                            >
                                                {tool.badge && (
                                                    <div className="absolute top-4 right-4">
                                                        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                                                            style={{
                                                                background: `${tool.color}25`,
                                                                color: tool.color,
                                                            }}>
                                                            {tool.badge}
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                                    style={{ background: tool.color + '15' }}>
                                                    <Icon size={22} strokeWidth={1.5} style={{ color: tool.color }} />
                                                </div>

                                                <h3 className="font-black text-white mb-0.5">{tool.title}</h3>
                                                <p className="text-xs text-white/40 mb-3">{tool.subtitle}</p>
                                                <p className="text-white/50 text-sm leading-relaxed">{tool.description}</p>

                                                <div className="mt-4 flex items-center gap-1 text-xs font-bold"
                                                    style={{ color: tool.color }}>
                                                    Abrir <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-psyche-violet/10 flex items-center justify-center flex-shrink-0">
                                <Headphones size={20} className="text-psyche-violet" strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="font-bold text-white">Sala de Viaje — Música</p>
                                <p className="text-white/40 text-sm">Sesiones largas curadas por fase</p>
                            </div>
                        </div>
                        <button onClick={() => setActiveModal('journey-room')}
                            className="vesica-btn px-5 py-2.5 glass-sacred text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 flex-shrink-0 cursor-pointer">
                            <Headphones size={14} /> Abrir reproductor <ChevronRight size={14} />
                        </button>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-white/15 text-xs">
                        <Shield size={12} />
                        <span>Toda tu actividad en tu espacio es privada y cifrada.</span>
                    </div>
                </div>
            </main>
        </>
    );
}
