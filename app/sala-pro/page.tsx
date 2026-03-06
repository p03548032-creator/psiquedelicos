'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Timer, AlertTriangle, BookOpen, Map, Star, Lock,
    Headphones, Zap, ChevronRight, Shield
} from 'lucide-react';
import TripTimer from '@/components/TripTimer';
import InteractionChecker from '@/components/InteractionChecker';

type Tool = 'trip-timer' | 'interactions' | 'diary' | 'set-setting' | 'ai-guide' | 'guided-session';

interface ProTool {
    id: Tool;
    icon: typeof Timer;
    emoji: string;
    title: string;
    subtitle: string;
    description: string;
    color: string;
    available: boolean;
    badge?: string;
}

const proTools: ProTool[] = [
    {
        id: 'trip-timer',
        icon: Timer,
        emoji: '⏱️',
        title: 'Trip Timer',
        subtitle: 'Monitor de Viaje en tiempo real',
        description: 'Sigue cada fase de tu viaje. Mensajes de apoyo, técnicas de grounding si el viaje se complica.',
        color: '#7c3aed',
        available: true,
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
        available: true,
        badge: 'NUEVO',
    },
    {
        id: 'diary',
        icon: BookOpen,
        emoji: '📓',
        title: 'Diario de Integración',
        subtitle: 'Espacio de reflexión privado',
        description: 'Escribe tus experiencias y reflexiones. La IA te ayuda a identificar patrones.',
        color: '#10b981',
        available: false,
        badge: 'MUY PRONTO',
    },
    {
        id: 'set-setting',
        icon: Map,
        emoji: '🗺️',
        title: 'Generador Set & Setting',
        subtitle: 'Plan de viaje personalizado',
        description: 'Genera un plan completo con protocolos de seguridad, playlist y rituales descargable en PDF.',
        color: '#f59e0b',
        available: false,
        badge: 'MUY PRONTO',
    },
    {
        id: 'ai-guide',
        icon: Zap,
        emoji: '🤖',
        title: 'El Navegante IA',
        subtitle: 'Asistente especializado',
        description: 'Preguntas sobre dosis, efectos, preparación e integración. Rigor científico en español.',
        color: '#06b6d4',
        available: false,
        badge: 'PRÓXIMO',
    },
    {
        id: 'guided-session',
        icon: Headphones,
        emoji: '🎵',
        title: 'Sesión Guiada IA',
        subtitle: 'Música adaptativa por intención',
        description: 'Di tu intención y la IA selecciona la secuencia musical perfecta para cada fase.',
        color: '#f472b6',
        available: false,
        badge: 'PRÓXIMO',
    },
];

export default function SalaProPage() {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTool, setActiveTool] = useState<Tool | null>(null);
    const [activeModal, setActiveModal] = useState<'interactions' | null>(null);
    const router = useRouter();

    useEffect(() => {
        const supabase = createClient();
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login?next=/sala-pro');
                return;
            }
            setUser(user);
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            setProfile(profile);
            setLoading(false);
        };
        fetchUser();
    }, [router]);

    const isPro = profile?.plan === 'pro';

    const handleToolClick = (tool: ProTool) => {
        if (!tool.available) return;
        if (!isPro) {
            router.push('/pro');
            return;
        }
        if (tool.id === 'trip-timer') setActiveTool('trip-timer');
        if (tool.id === 'interactions') setActiveModal('interactions');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-psyche-bg">
                <div className="animate-pulse text-white/20 text-sm">Cargando tu Sala PRO…</div>
            </div>
        );
    }

    return (
        <>
            {/* Trip Timer Modal */}
            {activeTool === 'trip-timer' && (
                <TripTimer onClose={() => setActiveTool(null)} />
            )}

            {/* Interactions Modal */}
            {activeModal === 'interactions' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: 'rgba(0,0,0,0.90)', backdropFilter: 'blur(20px)' }}>
                    <div className="relative w-full max-w-xl glass-sacred rounded-3xl p-8 border border-white/5 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-white font-black text-xl">⚠️ Comprobador de Interacciones</h2>
                                <p className="text-white/40 text-sm mt-0.5">Basado en TripSit y guías clínicas de reducción de daños</p>
                            </div>
                            <button onClick={() => setActiveModal(null)}
                                className="p-2 rounded-full glass-sacred hover:bg-white/10 transition-colors text-white/60 hover:text-white cursor-pointer flex-shrink-0">
                                ✕
                            </button>
                        </div>
                        <InteractionChecker />
                    </div>
                </div>
            )}

            <main className="min-h-screen bg-psyche-bg text-white pt-28 pb-20 px-6 relative overflow-hidden">
                {/* Fondo animado */}
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-psyche-violet/10 rounded-full blur-[200px]" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-psyche-pink/8 rounded-full blur-[180px]" />
                    {/* Partículas estáticas */}
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
                    {/* Header Personalizado */}
                    <div className="mb-14">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-psyche-violet to-psyche-pink flex items-center justify-center text-2xl font-black border border-white/10 shadow-2xl shadow-psyche-violet/30">
                                {user?.user_metadata?.full_name?.charAt(0) || '✦'}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold uppercase tracking-widest text-psyche-violet/70">Sala Privada</span>
                                    {isPro ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                            <Star size={8} fill="currentColor" /> NAVEGANTE PRO
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/5 text-white/40 border border-white/10">
                                            <Lock size={8} /> Sin suscripción activa
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl md:text-4xl font-black">
                                    Bienvenido, <span className="gradient-text">{user?.user_metadata?.full_name?.split(' ')[0] || 'Navegante'}</span>
                                </h1>
                            </div>
                        </div>

                        {!isPro && (
                            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-4 flex-wrap">
                                <div className="flex items-center gap-3">
                                    <Lock size={18} className="text-amber-400 flex-shrink-0" />
                                    <p className="text-sm text-white/70">
                                        Activa el plan PRO para desbloquear todas las herramientas.
                                    </p>
                                </div>
                                <Link href="/pro" className="text-xs font-bold bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex-shrink-0">
                                    Activar PRO — 4,90€/mes
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Grid de Herramientas */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-black text-white/80">Herramientas</h2>
                            <span className="text-xs text-white/30">
                                {proTools.filter(t => t.available).length} disponibles · {proTools.filter(t => !t.available).length} en desarrollo
                            </span>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {proTools.map(tool => {
                                const Icon = tool.icon;
                                const isLocked = !isPro || !tool.available;

                                return (
                                    <button
                                        key={tool.id}
                                        onClick={() => handleToolClick(tool)}
                                        disabled={!tool.available}
                                        className={`relative rounded-2xl p-6 text-left border transition-all duration-300 group ${tool.available && isPro
                                                ? 'hover:scale-[1.02] cursor-pointer hover:border-white/20'
                                                : tool.available && !isPro
                                                    ? 'hover:scale-[1.02] cursor-pointer'
                                                    : 'cursor-default opacity-60'
                                            }`}
                                        style={{
                                            borderColor: tool.available && isPro ? `${tool.color}30` : 'rgba(255,255,255,0.05)',
                                            background: tool.available && isPro
                                                ? `linear-gradient(135deg, ${tool.color}08, transparent)`
                                                : 'rgba(255,255,255,0.02)',
                                            boxShadow: tool.available && isPro
                                                ? `0 0 40px ${tool.color}08`
                                                : undefined,
                                        }}
                                    >
                                        {/* Badge */}
                                        {tool.badge && (
                                            <div className="absolute top-4 right-4">
                                                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                                                    style={{
                                                        background: tool.available ? `${tool.color}25` : 'rgba(255,255,255,0.05)',
                                                        color: tool.available ? tool.color : 'rgba(255,255,255,0.3)',
                                                    }}>
                                                    {tool.badge}
                                                </span>
                                            </div>
                                        )}

                                        {/* Blur overlay para herramientas bloqueadas por PRO */}
                                        {tool.available && !isPro && (
                                            <div className="absolute inset-0 z-10 rounded-2xl flex items-center justify-center"
                                                style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}>
                                                <div className="text-center p-4">
                                                    <Lock size={20} className="text-amber-400 mx-auto mb-2" />
                                                    <p className="text-xs font-bold text-amber-400">Requiere PRO</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                            style={{ background: `${tool.color}15` }}>
                                            <Icon size={22} strokeWidth={1.5} style={{ color: tool.color }} />
                                        </div>

                                        <h3 className="font-black text-white mb-0.5">{tool.title}</h3>
                                        <p className="text-xs text-white/40 mb-3">{tool.subtitle}</p>
                                        <p className="text-white/50 text-sm leading-relaxed">{tool.description}</p>

                                        {tool.available && isPro && (
                                            <div className="mt-4 flex items-center gap-1 text-xs font-bold"
                                                style={{ color: tool.color }}>
                                                Abrir <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Acceso rápido a Sala de Viaje */}
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
                        <Link href="/bienestar#sala-viaje"
                            className="vesica-btn px-5 py-2.5 glass-sacred text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 flex-shrink-0">
                            <Headphones size={14} /> Ir a la música <ChevronRight size={14} />
                        </Link>
                    </div>

                    {/* Footer de seguridad */}
                    <div className="mt-8 flex items-center justify-center gap-2 text-white/15 text-xs">
                        <Shield size={12} />
                        <span>Toda tu actividad en la Sala PRO es privada y cifrada.</span>
                    </div>
                </div>
            </main>
        </>
    );
}
