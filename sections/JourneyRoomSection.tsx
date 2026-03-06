'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, ExternalLink, Info, X, Film, Headphones, Moon, Music, Wind, Waves, Leaf, Star, Flame, LucideIcon } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   SALA DE VIAJE — Reproductor de Sesiones Largas
   Vídeos curados de YouTube embebidos para sesiones
   de preparación, transcurso e integración.
   ═══════════════════════════════════════════════════════ */

type Phase = 'preparacion' | 'viaje' | 'cumbre' | 'descenso' | 'integracion';

interface JourneyTrack {
    id: string;
    audioUrl: string;   // Native audio URL (ogg/mp3)
    title: string;
    artist: string;
    duration: string;
    phase: Phase;
    description: string;
    icon: LucideIcon;
    color: string;
    tags: string[];
}

const journeyTracks: JourneyTrack[] = [
    // ── Preparación ──
    {
        id: 'p1',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        title: 'Música del Chakra Raíz — Arraigo Profundo',
        artist: 'Kevin MacLeod (Incompetech) - Demo',
        duration: '6 min',
        phase: 'preparacion',
        description: 'Tonos de tierra para centrar y enraizar la mente antes de la experiencia.',
        icon: Leaf,
        color: '#10b981',
        tags: ['Arraigo', 'Preparación'],
    },
    {
        id: 'p2',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        title: 'Calma Profunda — Silencio Preparatorio',
        artist: 'Kevin MacLeod (Incompetech) - Demo',
        duration: '7 min',
        phase: 'preparacion',
        description: 'Ambient suave para la meditación pre-viaje. Establece un estado de quietud y apertura.',
        icon: Wind,
        color: '#64748b',
        tags: ['Ambient', 'Meditación', 'Calma'],
    },

    // ── Inicio del viaje ──
    {
        id: 'j1',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        title: 'Deep Journey — Ambient Terapéutico',
        artist: 'Ambient Soundscape - Demo',
        duration: '8 min',
        phase: 'viaje',
        description: 'Atmósferas fluidas diseñadas para reducir la ansiedad y facilitar el inicio de la experiencia.',
        icon: Music,
        color: '#7c3aed',
        tags: ['Ambient', 'Terapéutico', 'Fluido'],
    },
    {
        id: 'j2',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        title: 'Vibraciones Estelares — Expansión',
        artist: 'Free Soundscape - Demo',
        duration: '9 min',
        phase: 'viaje',
        description: 'Música ambiental expansiva, ideal para acompañar los primeros efectos visuales o físicos.',
        icon: Flame,
        color: '#f59e0b',
        tags: ['Sintetizador', 'Expansivo', 'Ceremonial'],
    },

    // ── Cumbre / Pico ──
    {
        id: 'c1',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        title: 'The Shaman\'s Dream — Ceremonial Soundscape',
        artist: 'Traditional - Demo',
        duration: '6 min',
        phase: 'cumbre',
        description: 'Cánticos tibetanos y sonidos profundos para el pico de la experiencia.',
        icon: Star,
        color: '#db2777',
        tags: ['Cánticos', 'Cumbre', 'Intenso', 'Ceremonial'],
    },

    // ── Descenso ──
    {
        id: 'd1',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        title: 'Deep Healing — Calm the Mind',
        artist: 'Piano Meditations - Demo',
        duration: '7 min',
        phase: 'descenso',
        description: 'Música de curación profunda con notas de piano. Para el regreso suave a la normalidad.',
        icon: Moon,
        color: '#0ea5e9',
        tags: ['Curación', 'Piano', 'Suave', 'Post-cumbre'],
    },

    // ── Integración ──
    {
        id: 'i1',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        title: 'Earth Connection — Integración',
        artist: 'Nature Spirits - Demo',
        duration: '8 min',
        phase: 'integracion',
        description: 'Sonidos orgánicos para anclar la experiencia, meditar en paz y procesar los aprendizajes.',
        icon: Leaf,
        color: '#10b981',
        tags: ['Naturaleza', 'Integración', 'Tierra'],
    },

];

const phases: { id: Phase; label: string; color: string; desc: string }[] = [
    { id: 'preparacion', label: 'Preparación', color: '#10b981', desc: 'Set & Setting' },
    { id: 'viaje', label: 'Inicio', color: '#7c3aed', desc: 'Despegue' },
    { id: 'cumbre', label: 'Cumbre', color: '#db2777', desc: 'Pico' },
    { id: 'descenso', label: 'Descenso', color: '#4f46e5', desc: 'Regreso' },
    { id: 'integracion', label: 'Integración', color: '#f59e0b', desc: 'Integrar' },
];


// ── Reproductor de Audio Nativo Custom ──
function NativeAudioPlayer({ track, onClose }: { track: JourneyTrack; onClose: () => void }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTimeStr, setCurrentTimeStr] = useState('0:00');
    const [durationStr, setDurationStr] = useState(track.duration);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error("AutoPlay prevented", e));
        }
    }, [track.audioUrl]);

    const formatTime = (time: number) => {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const dur = audioRef.current.duration;
            setCurrentTimeStr(formatTime(current));
            if (dur) setProgress((current / dur) * 100);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const seekTime = (Number(e.target.value) / 100) * audioRef.current.duration;
            audioRef.current.currentTime = seekTime;
            setProgress(Number(e.target.value));
        }
    };

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 md:p-8">
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
                onClick={onClose}
            />

            <div className="relative w-full max-w-2xl z-10 glass-sacred rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl overflow-hidden">
                {/* Visualizer Effect Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse"
                        style={{ background: track.color }} />
                </div>

                {/* Header */}
                <div className="relative z-10 flex items-start justify-between mb-8 gap-4">
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2" style={{ color: track.color }}>
                            <track.icon size={12} strokeWidth={2} />
                            {phases.find(p => p.id === track.phase)?.label}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">{track.title}</h2>
                        <p className="text-white/50 text-base mt-2">{track.artist}</p>
                    </div>
                    <button onClick={onClose} className="p-2 flex-shrink-0 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white border border-white/10 cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                {/* Player Controls */}
                <div className="relative z-10 bg-black/40 border border-white/5 rounded-2xl p-6">
                    <audio
                        ref={audioRef}
                        src={track.audioUrl}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={onClose}
                        loop // Iterar durante la sesión para viajes largos
                    />

                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs text-white/40 tabular-nums font-mono">{currentTimeStr}</span>
                        <input
                            type="range"
                            min="0" max="100"
                            value={progress}
                            onChange={handleSeek}
                            className="w-full h-1 bg-white/10 rounded-full appearance-none outline-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, ${track.color} ${progress}%, rgba(255,255,255,0.1) ${progress}%)`
                            }}
                        />
                        <span className="text-xs text-white/40 tabular-nums font-mono">{durationStr}</span>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button onClick={togglePlay} className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-black transition-transform hover:scale-105"
                            style={{ background: `linear-gradient(135deg, ${track.color}, ${track.color}aa)` }}>
                            {isPlaying ? <Music size={24} className="text-white animate-pulse" /> : <Play size={24} className="text-white" fill="white" style={{ marginLeft: 4 }} />}
                        </button>
                    </div>
                </div>

                {/* Footer description */}
                <div className="relative z-10 mt-8 text-center">
                    <p className="text-white/40 text-sm">{track.description}</p>
                </div>
            </div>
        </div>
    );
}


// ── Tarjeta de Track ──
function TrackCard({ track, onPlay }: { track: JourneyTrack; onPlay: () => void }) {
    const [hovered, setHovered] = useState(false);
    const Icon = track.icon;

    return (
        <div
            className="relative rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04] cursor-pointer group"
            style={{ boxShadow: hovered ? `0 0 40px ${track.color}15` : undefined }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onPlay}
        >
            {/* Gradient de color sutil */}
            <div
                className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity"
                style={{ background: `linear-gradient(135deg, ${track.color}, transparent 60%)` }}
            />

            <div className="relative p-4 sm:p-5">
                {/* Cabecera */}
                <div className="flex items-start gap-3 mb-3">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: track.color + '20' }}
                    >
                        <Icon size={18} strokeWidth={1.5} style={{ color: track.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white/90 font-semibold text-sm leading-tight truncate">{track.title}</p>
                        <p className="text-white/40 text-xs mt-0.5">{track.artist}</p>
                    </div>
                    {/* Botón Play */}
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 opacity-0 group-hover:opacity-100"
                        style={{ background: `linear-gradient(135deg, ${track.color}, ${track.color}99)` }}
                    >
                        <Play size={14} fill="white" style={{ color: 'white', marginLeft: 2 }} />
                    </div>
                </div>

                <p className="text-white/35 text-xs leading-relaxed line-clamp-2 mb-3">{track.description}</p>

                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                        {track.tags.slice(0, 2).map(t => (
                            <span
                                key={t}
                                className="text-[9px] px-2 py-0.5 rounded-full"
                                style={{ background: track.color + '15', color: track.color + 'bb' }}
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                    <span className="text-white/25 text-[10px]">{track.duration}</span>
                </div>
            </div>
        </div>
    );
}


// ── Sección Principal ──
export default function JourneyRoomSection() {
    const [selectedPhase, setSelectedPhase] = useState<Phase>('viaje');
    const [playingTrack, setPlayingTrack] = useState<JourneyTrack | null>(null);
    const [showInfo, setShowInfo] = useState(false);
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.05 }
        );
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    // Filtrar por fase
    const visibleTracks = journeyTracks.filter(t => t.phase === selectedPhase);
    const phaseColor = phases.find(p => p.id === selectedPhase)?.color ?? '#7c3aed';

    return (
        <>
            {/* Player Modal */}
            {playingTrack && (
                <NativeAudioPlayer track={playingTrack} onClose={() => setPlayingTrack(null)} />
            )}

            <section
                id="sala-viaje"
                className="relative py-8 px-6"
                ref={sectionRef}
            >
                {/* Fondo */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
                    <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10" style={{ background: phaseColor }} />
                </div>

                <div
                    className={`relative max-w-6xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                    {/* Header */}
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 vesica-btn px-5 py-2 glass-sacred text-sm mb-6" style={{ color: '#db2777' }}>
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#db2777' }} />
                            Sesiones Guiadas de Larga Duración
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                            <span className="gradient-text-cool">Sala de</span>
                            <span className="block text-white/90 mt-2">Viaje</span>
                        </h2>
                        <p className="text-white/40 max-w-2xl mx-auto text-lg">
                            Música curada por fase de experiencia. Servida directamente sin anuncios ni bloqueos.
                        </p>
                        <p className="text-white/25 text-sm mt-2 flex items-center justify-center gap-2">
                            <Headphones size={14} className="inline" />
                            Auriculares altamente recomendados
                        </p>
                    </div>

                    {/* Selector de Fase */}
                    <div className="mb-10">
                        <p className="text-center text-xs text-white/30 uppercase tracking-widest mb-4">Fase del viaje</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {phases.map((phase, i) => {
                                const isActive = selectedPhase === phase.id;
                                return (
                                    <button
                                        key={phase.id}
                                        onClick={() => setSelectedPhase(phase.id)}
                                        className="group flex flex-col items-center gap-1 px-5 py-3 rounded-2xl border transition-all duration-300 cursor-pointer"
                                        style={{
                                            borderColor: isActive ? phase.color + '80' : 'rgba(255,255,255,0.05)',
                                            background: isActive ? phase.color + '15' : 'rgba(255,255,255,0.02)',
                                            boxShadow: isActive ? `0 0 30px ${phase.color}20` : undefined,
                                        }}
                                    >
                                        <span className="flex items-center gap-1.5">
                                            {i > 0 && <span className="text-white/15 hidden sm:inline">→</span>}
                                            <span className="text-sm font-semibold" style={{ color: isActive ? phase.color : 'rgba(255,255,255,0.4)' }}>
                                                {phase.label}
                                            </span>
                                        </span>
                                        <span className="text-[10px]" style={{ color: isActive ? phase.color + '99' : 'rgba(255,255,255,0.2)' }}>
                                            {phase.desc}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Aviso de moderación */}
                    {showInfo ? (
                        <div className="mb-8 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-3 text-xs text-white/50 leading-relaxed">
                            <Info size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                            <span>
                                <strong className="text-amber-300/80">Nota de reducción de daños:</strong> Esta sección actúa como reproductor de recursos y herramientas musicales. PortalPSY aloja directamente el audio para evitar interrupciones o publicidad que pueda alterar la experiencia.
                            </span>
                            <button onClick={() => setShowInfo(false)} className="flex-shrink-0 text-white/20 hover:text-white/50 cursor-pointer">
                                <X size={12} />
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => setShowInfo(true)} className="flex items-center gap-1 text-xs text-white/20 hover:text-white/40 transition-colors mb-6 mx-auto block cursor-pointer">
                            <Info size={11} /> ¿Qué es esto?
                        </button>
                    )}

                    {/* Grid de Tracks */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[200px]">
                        {visibleTracks.map(track => (
                            <TrackCard
                                key={track.id}
                                track={track}
                                onPlay={() => setPlayingTrack(track)}
                            />
                        ))}
                        {visibleTracks.length === 0 && (
                            <div className="col-span-full flex items-center justify-center h-40 text-white/20 text-sm">
                                No hay sesiones para esta fase aún.
                            </div>
                        )}
                    </div>

                    {/* CTA final */}
                    <div className="mt-12 p-6 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
                        <Film size={28} className="text-white/20 mx-auto mb-3" strokeWidth={1.5} />
                        <p className="text-white/40 text-sm mb-4 max-w-lg mx-auto">
                            ¿Tienes una playlist ceremonial imprescindible que no está aquí?
                            Escríbenos y la evaluamos para añadirla.
                        </p>
                        <a
                            href="mailto:contacto@portalpsy.es?subject=Sugerencia de Playlist"
                            className="vesica-btn inline-flex items-center gap-2 px-6 py-3 glass-sacred text-sm text-white/60 hover:text-white/90 transition-colors"
                        >
                            Sugerir playlist ↗
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
