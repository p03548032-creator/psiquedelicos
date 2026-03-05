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
    videoId: string;   // YouTube video ID
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
        videoId: 'UfcAVejslrU',
        title: 'Música del Chakra Raíz — Arraigo Profundo',
        artist: 'Meditative Mind',
        duration: '3h 06min',
        phase: 'preparacion',
        description: 'Tonos de tierra para centrar y enraizar la mente antes de la experiencia. 396 Hz en loop.',
        icon: Leaf,
        color: '#10b981',
        tags: ['396 Hz', 'Arraigo', 'Preparación'],
    },
    {
        id: 'p2',
        videoId: 'jyOFtw71G9k',
        title: 'Meditación Sahaja — Silencio Preparatorio',
        artist: 'Peder B. Helland',
        duration: '2h 50min',
        phase: 'preparacion',
        description: 'Ambient suave para la meditación pre-viaje. Establece un estado de quietud y apertura.',
        icon: Wind,
        color: '#64748b',
        tags: ['Ambient', 'Meditación', 'Calma'],
    },

    // ── Inicio del viaje ──
    {
        id: 'j1',
        videoId: 'sCNlt5nvSI8',
        title: 'Music For Psychedelic Therapy',
        artist: 'Jon Hopkins',
        duration: '1h 27min',
        phase: 'viaje',
        description: 'Álbum completo compuesto específicamente para acompañar sesiones terapéuticas de psilocibina. Usado en clínicas.',
        icon: Music,
        color: '#7c3aed',
        tags: ['Jon Hopkins', 'Terapéutico', 'Clínico', 'Psilocibina'],
    },
    {
        id: 'j2',
        videoId: 'Na0w3Mz46GA',
        title: 'Ícaros Amazónicos — Medicina de la Jungla',
        artist: 'Maestro don Enrique',
        duration: '3h 30min',
        phase: 'viaje',
        description: 'Ícaros tradicionales del Amazonas. Cantos chamánicos utilizados en ceremonias de Ayahuasca.',
        icon: Flame,
        color: '#f59e0b',
        tags: ['Ícaros', 'Ayahuasca', 'Ceremonial', 'Amazónico'],
    },
    {
        id: 'j3',
        videoId: '5qap5aO4i9A',
        title: 'Lofi Hip Hop Mix — Deep Focus Journey',
        artist: 'lofi girl',
        duration: '4h+',
        phase: 'viaje',
        description: 'Beats lo-fi rítmicos suaves. Para sesiones de microdosis y flujo creativo sostenido.',
        icon: Headphones,
        color: '#06b6d4',
        tags: ['Lo-fi', 'Microdosis', 'Creativo', 'Flow'],
    },

    // ── Cumbre / Pico ──
    {
        id: 'c1',
        videoId: 'BBijb_qmZyA',
        title: 'The Shaman\'s Dream — Ceremonial Soundscape',
        artist: 'Shaman\'s Dream',
        duration: '4h 12min',
        phase: 'cumbre',
        description: 'Ambient chamánico de alta intensidad para acompañar la cumbre de la experiencia. Instrumental rico.',
        icon: Star,
        color: '#db2777',
        tags: ['Chamánico', 'Cumbre', 'Intenso', 'Ceremonial'],
    },
    {
        id: 'c2',
        videoId: 'n4tcGHMH1fE',
        title: 'OM Mantra — Chakra Sahasrara',
        artist: 'Meditative Mind',
        duration: '2h 00min',
        phase: 'cumbre',
        description: 'OM continuo a 963 Hz para estados de consciencia expandida. Cymática pura.',
        icon: Waves,
        color: '#ec4899',
        tags: ['963 Hz', 'Corona', 'OM', 'Consciencia'],
    },

    // ── Descenso ──
    {
        id: 'd1',
        videoId: 'Jb3cKFLfVPE',
        title: 'Weightless — Most Relaxing Song',
        artist: 'Marconi Union',
        duration: '10h loop',
        phase: 'descenso',
        description: 'Científicamente considerada la canción más relajante. Reduce el cortisol un 65%. Ideal para el descenso.',
        icon: Moon,
        color: '#4f46e5',
        tags: ['Relajación', 'Descenso', 'Marconi Union'],
    },
    {
        id: 'd2',
        videoId: 'lE6RYpe9IT0',
        title: 'Deep Healing — Calm the Mind',
        artist: 'Greenred Productions',
        duration: '2h 15min',
        phase: 'descenso',
        description: 'Música de curación profunda con notas de piano. Para el regreso suave a la normalidad.',
        icon: Waves,
        color: '#0ea5e9',
        tags: ['Curación', 'Piano', 'Suave', 'Post-cumbre'],
    },

    // ── Integración ──
    {
        id: 'i1',
        videoId: 'q2oiHBgxR8o',
        title: 'East Forest — RETREATING (Integration)',
        artist: 'East Forest',
        duration: '1h 11min',
        phase: 'integracion',
        description: 'Música de integración post-ceremonia de East Forest. Diseñada explícitamente para las horas post-sesión.',
        icon: Leaf,
        color: '#10b981',
        tags: ['East Forest', 'Integración', 'Post-sesión'],
    },
    {
        id: 'i2',
        videoId: 'SXx6RgKABXI',
        title: 'Tibetan Healing Bowls — 432 Hz',
        artist: 'Tibetan Meditation',
        duration: '3h 00min',
        phase: 'integracion',
        description: 'Cuencos tibetanos afinados a 432 Hz para anclar el aprendizaje y volver al cuerpo.',
        icon: Waves,
        color: '#f97316',
        tags: ['432 Hz', 'Cuencos', 'Grounding'],
    },
];

const phases: { id: Phase; label: string; color: string; desc: string }[] = [
    { id: 'preparacion', label: 'Preparación', color: '#10b981', desc: 'Set & Setting' },
    { id: 'viaje', label: 'Inicio', color: '#7c3aed', desc: 'Despegue' },
    { id: 'cumbre', label: 'Cumbre', color: '#db2777', desc: 'Pico' },
    { id: 'descenso', label: 'Descenso', color: '#4f46e5', desc: 'Regreso' },
    { id: 'integracion', label: 'Integración', color: '#f59e0b', desc: 'Integrar' },
];


// ── Player de YouTube embebido ──
function YouTubePlayer({ track, onClose }: { track: JourneyTrack; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 md:p-8">
            {/* Overlay oscuro */}
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
                onClick={onClose}
            />

            <div className="relative w-full max-w-4xl z-10">
                {/* Header del player */}
                <div className="flex items-start justify-between mb-4 gap-4">
                    <div>
                        <div
                            className="text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2"
                            style={{ color: track.color }}
                        >
                            <track.icon size={12} strokeWidth={2} />
                            {phases.find(p => p.id === track.phase)?.label}
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">{track.title}</h2>
                        <p className="text-white/50 text-sm mt-0.5">{track.artist} · {track.duration}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 p-2 rounded-full glass-sacred hover:bg-white/10 transition-colors text-white/60 hover:text-white cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Iframe de YouTube */}
                <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                    style={{ paddingBottom: '56.25%' /* 16/9 ratio */ }}>
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${track.videoId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&color=white`}
                        title={track.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>

                {/* Info y tags */}
                <div className="mt-4 flex flex-col sm:flex-row items-start gap-4">
                    <div className="flex-1">
                        <p className="text-white/50 text-sm leading-relaxed">{track.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {track.tags.map(t => (
                                <span
                                    key={t}
                                    className="text-[10px] px-2 py-0.5 rounded-full"
                                    style={{ background: track.color + '20', color: track.color + 'cc' }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                    <a
                        href={`https://www.youtube.com/watch?v=${track.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/70 transition-colors flex-shrink-0"
                    >
                        <ExternalLink size={12} /> Ver en YouTube
                    </a>
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
                <YouTubePlayer track={playingTrack} onClose={() => setPlayingTrack(null)} />
            )}

            <section
                id="sala-viaje"
                className="relative py-32 px-6"
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
                            Música curada por fase de experiencia. Desde la preparación hasta la integración.
                        </p>
                        <p className="text-white/25 text-sm mt-2 flex items-center justify-center gap-2">
                            <Headphones size={14} className="inline" />
                            Auriculares recomendados · El vídeo se abre a pantalla completa al pulsar ▶
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
                                <strong className="text-amber-300/80">Nota de reducción de daños:</strong> Esta sección actúa como reproductor de recursos musicales ya publicados en YouTube. PortalPSY no anima al consumo de ninguna sustancia, sino a la preparación adecuada, la reducción de daños y la integración posterior. La música es un apoyo clínico y cultural reconocido.
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
