'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

import engine from '@/audio/AudioEngine';
import {
    Bell, Volume2, Waves, Wind, Flame, Droplets,
    Moon, Wind as Breath, Heart, Sparkles,
    Play, Pause, Plus, Minus, Timer, X, Music, Zap
} from 'lucide-react';

type LayerType = 'tone' | 'bowl' | 'noise';

interface SoundLayer {
    id: string;
    name: string;
    type: LayerType;
    freq?: number;
    filterFreq?: number;
    filterType?: BiquadFilterType;
    vol: number;
}

interface Phase {
    id: string;
    name: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    description: string;
    toneFreq: number;
    toneVol: number;
    layers: { id: string; vol: number }[];
}

const SOUND_LAYERS: SoundLayer[] = [
    { id: 'rain', name: 'Lluvia', type: 'noise', filterFreq: 2500, filterType: 'lowpass', vol: 0.12 },
    { id: 'bowl', name: 'Cuencos', type: 'bowl', freq: 396, vol: 0.06 },
    { id: 'om', name: 'OM Drone', type: 'tone', freq: 136.1, vol: 0.05 },
    { id: 'river', name: 'Río', type: 'noise', filterFreq: 1200, filterType: 'lowpass', vol: 0.10 },
    { id: 'drone432', name: 'Drone 432', type: 'tone', freq: 432, vol: 0.04 },
    { id: 'wind', name: 'Viento', type: 'noise', filterFreq: 600, filterType: 'bandpass', vol: 0.08 },
    { id: 'ocean', name: 'Océano', type: 'noise', filterFreq: 800, filterType: 'lowpass', vol: 0.10 },
];

const PHASES: Phase[] = [
    {
        id: 'preparacion',
        name: 'Preparación',
        icon: Sparkles,
        color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.1)',
        description: 'Relájate y abre tu mente. Ambiente suave de acompañamiento.',
        toneFreq: 432,
        toneVol: 0.04,
        layers: [{ id: 'bowl', vol: 0.06 }, { id: 'rain', vol: 0.10 }],
    },
    {
        id: 'subida',
        name: 'Subida',
        icon: Wind,
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.1)',
        description: 'La energía sube. Acompañamiento sin estimular, solo presencia.',
        toneFreq: 528,
        toneVol: 0.03,
        layers: [{ id: 'om', vol: 0.05 }, { id: 'ocean', vol: 0.08 }],
    },
    {
        id: 'pico',
        name: 'Pico',
        icon: Heart,
        color: '#ec4899',
        bg: 'rgba(236,72,153,0.1)',
        description: 'El momento más intenso. Ambiente mínimo, música de silencio.',
        toneFreq: 963,
        toneVol: 0.02,
        layers: [{ id: 'drone432', vol: 0.03 }],
    },
    {
        id: 'descenso',
        name: 'Descenso',
        icon: Waves,
        color: '#06b6d4',
        bg: 'rgba(6,182,212,0.1)',
        description: 'Volviendo. Los sonidos vuelven a tener espacio.',
        toneFreq: 432,
        toneVol: 0.03,
        layers: [{ id: 'bowl', vol: 0.05 }, { id: 'rain', vol: 0.08 }, { id: 'river', vol: 0.06 }],
    },
    {
        id: 'integracion',
        name: 'Integración',
        icon: Moon,
        color: '#6366f1',
        bg: 'rgba(99,102,241,0.1)',
        description: 'Cierre. Sonidos suaves para integrar la experiencia.',
        toneFreq: 285,
        toneVol: 0.04,
        layers: [{ id: 'bowl', vol: 0.04 }, { id: 'wind', vol: 0.05 }],
    },
];

const SLEEP_TIMERS = [0, 15, 30, 60, 120];

export default function MusicRoom() {
    const [playing, setPlaying] = useState(false);
    const [activePhase, setActivePhase] = useState<Phase>(PHASES[0]);
    const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set(['bowl', 'rain']));
    const [layerVols, setLayerVols] = useState<Record<string, number>>(
        Object.fromEntries(SOUND_LAYERS.map(l => [l.id, l.vol]))
    );
    const [masterVol, setMasterVol] = useState(0.5);
    const [sleepTimer, setSleepTimer] = useState(0);
    const [sleepRemaining, setSleepRemaining] = useState(0);
    const [showLayerPanel, setShowLayerPanel] = useState(false);
    const [audioReady, setAudioReady] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [prevVol] = useState(0.5);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const sleepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Init audio
    const ensureAudio = useCallback(async () => {
        if (!audioReady) {
            await engine.init();
            engine.setMasterVolume(masterVol);
            setAudioReady(true);
        }
    }, [audioReady, masterVol]);

    // Play current configuration
    const play = useCallback(async () => {
        await ensureAudio();
        engine.stopAll();

        // Start tone
        engine.startRichTone('main_tone', activePhase.toneFreq, activePhase.toneVol);

        // Start active layers
        activeLayers.forEach(layerId => {
            const layer = SOUND_LAYERS.find(l => l.id === layerId);
            if (!layer) return;
            const vol = layerVols[layerId] || layer.vol;
            if (layer.type === 'bowl') {
                engine.startBowl(`layer_${layerId}`, layer.freq!, vol);
            } else if (layer.type === 'tone') {
                engine.startTone(`layer_${layerId}`, layer.freq!, vol, 'sine', false);
            } else {
                engine.startNoise(`layer_${layerId}`, layer.filterFreq!, vol, layer.filterType!);
            }
        });

        setPlaying(true);
        window.dispatchEvent(new CustomEvent('audio-started'));
    }, [activePhase, activeLayers, layerVols, ensureAudio]);

    const stop = useCallback(() => {
        engine.stopAll();
        setPlaying(false);
    }, []);

    const toggle = useCallback(async () => {
        if (playing) {
            stop();
        } else {
            await play();
        }
    }, [playing, play, stop]);

    // Apply phase
    const applyPhase = useCallback(async (phase: Phase) => {
        setActivePhase(phase);
        setActiveLayers(new Set(phase.layers.map(l => l.id)));
        if (playing) {
            await ensureAudio();
            engine.stopAll();
            engine.startRichTone('main_tone', phase.toneFreq, phase.toneVol);
            phase.layers.forEach(({ id, vol }) => {
                const layer = SOUND_LAYERS.find(l => l.id === id);
                if (!layer) return;
                if (layer.type === 'bowl') engine.startBowl(`layer_${id}`, layer.freq!, vol);
                else if (layer.type === 'tone') engine.startTone(`layer_${id}`, layer.freq!, vol, 'sine', false);
                else engine.startNoise(`layer_${id}`, layer.filterFreq!, vol, layer.filterType!);
            });
        }
    }, [playing, ensureAudio]);

    // Sleep timer
    useEffect(() => {
        if (sleepTimer > 0) {
            setSleepRemaining(sleepTimer * 60);
            sleepTimerRef.current = setInterval(() => {
                setSleepRemaining(prev => {
                    if (prev <= 1) {
                        stop();
                        setSleepTimer(0);
                        if (sleepTimerRef.current) clearInterval(sleepTimerRef.current);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (sleepTimerRef.current) clearInterval(sleepTimerRef.current);
        };
    }, [sleepTimer, stop]);

    // Master volume
    useEffect(() => {
        engine.setMasterVolume(isMuted ? 0 : masterVol);
    }, [masterVol, isMuted]);

    const toggleMute = () => setIsMuted(m => !m);

    const toggleLayer = (layerId: string) => {
        const next = new Set(activeLayers);
        if (next.has(layerId)) {
            next.delete(layerId);
            engine.stopId(`layer_${layerId}`);
        } else {
            next.add(layerId);
            if (playing) {
                ensureAudio();
                const layer = SOUND_LAYERS.find(l => l.id === layerId)!;
                const vol = layerVols[layerId] || layer.vol;
                if (layer.type === 'bowl') engine.startBowl(`layer_${layerId}`, layer.freq!, vol);
                else if (layer.type === 'tone') engine.startTone(`layer_${layerId}`, layer.freq!, vol, 'sine', false);
                else engine.startNoise(`layer_${layerId}`, layer.filterFreq!, vol, layer.filterType!);
            }
        }
        setActiveLayers(next);
    };

    const setLayerVol = (layerId: string, vol: number) => {
        setLayerVols(prev => ({ ...prev, [layerId]: vol }));
        if (activeLayers.has(layerId) && playing) {
            engine.setVolume(`layer_${layerId}`, vol);
        }
    };

    const formatSleepTime = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-8">
            {/* Header status */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {playing ? (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-psyche-violet animate-pulse" />
                            <span className="text-white/60 text-sm">Sonando</span>
                        </div>
                    ) : (
                        <span className="text-white/30 text-sm">Silencio</span>
                    )}
                    {sleepRemaining > 0 && (
                        <div className="flex items-center gap-1.5 text-amber-400/60 text-xs">
                            <Timer size={12} />
                            <span>{formatSleepTime(sleepRemaining)}</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {/* Sleep timer */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                const next = (SLEEP_TIMERS.indexOf(sleepTimer) + 1) % SLEEP_TIMERS.length;
                                setSleepTimer(SLEEP_TIMERS[next]);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs text-white/40 hover:text-white/70 transition-colors border-white/10 hover:border-white/20"
                        >
                            <Timer size={12} />
                            {sleepTimer === 0 ? 'Sin timer' : `${sleepTimer} min`}
                        </button>
                    </div>
                </div>
            </div>

            {/* Phase selector */}
            <div>
                <p className="text-white/30 text-xs mb-3 uppercase tracking-widest">Fase del viaje</p>
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                    {PHASES.map(phase => {
                        const Icon = phase.icon;
                        const isActive = activePhase.id === phase.id;
                        return (
                            <button
                                key={phase.id}
                                onClick={() => applyPhase(phase)}
                                className="flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all cursor-pointer"
                                style={{
                                    borderColor: isActive ? phase.color + '60' : 'rgba(255,255,255,0.06)',
                                    background: isActive ? phase.bg : 'rgba(255,255,255,0.02)',
                                }}
                            >
                                <Icon size={16} style={{ color: phase.color }} />
                                <span className="text-white/80 text-sm font-medium whitespace-nowrap">{phase.name}</span>
                            </button>
                        );
                    })}
                </div>
                <p className="text-white/30 text-xs mt-3">{activePhase.description}</p>
            </div>

            {/* Sound mixer toggle */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <p className="text-white/30 text-xs uppercase tracking-widest">Capas de sonido</p>
                    <button
                        onClick={() => setShowLayerPanel(p => !p)}
                        className="text-psyche-cyan/60 hover:text-psyche-cyan text-xs transition-colors"
                    >
                        {showLayerPanel ? 'Ocultar' : 'Mezclar'}
                    </button>
                </div>

                {/* Quick layer buttons */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {SOUND_LAYERS.map(layer => (
                        <button
                            key={layer.id}
                            onClick={() => toggleLayer(layer.id)}
                            className="px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer"
                            style={{
                                borderColor: activeLayers.has(layer.id) ? '#7c3aed60' : 'rgba(255,255,255,0.06)',
                                background: activeLayers.has(layer.id) ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.02)',
                                color: activeLayers.has(layer.id) ? '#c4b5fd' : 'rgba(255,255,255,0.4)',
                            }}
                        >
                            {layer.name}
                        </button>
                    ))}
                </div>

                {/* Layer volume panel */}
                {showLayerPanel && (
                    <div className="glass-sacred rounded-2xl p-5 border border-white/5 space-y-4 mb-4">
                        {SOUND_LAYERS.filter(l => activeLayers.has(l.id)).map(layer => (
                            <div key={layer.id}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-white/50 text-xs">{layer.name}</span>
                                    <span className="text-white/30 text-[10px] font-mono">
                                        {Math.round((layerVols[layer.id] || layer.vol) * 100)}%
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="0.25"
                                    step="0.01"
                                    value={layerVols[layer.id] || layer.vol}
                                    onChange={e => setLayerVol(layer.id, parseFloat(e.target.value))}
                                    className="w-full h-1 rounded-full appearance-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, #7c3aed ${((layerVols[layer.id] || layer.vol) / 0.25) * 100}%, rgba(255,255,255,0.1) ${((layerVols[layer.id] || layer.vol) / 0.25) * 100}%)`,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Master controls */}
            <div className="glass-sacred rounded-3xl p-6 border border-white/5">
                <div className="flex items-center gap-4">
                    {/* Play/Stop */}
                    <button
                        onClick={toggle}
                        className="w-16 h-16 rounded-full flex items-center justify-center transition-all flex-shrink-0 cursor-pointer"
                        style={{
                            background: playing
                                ? 'linear-gradient(135deg, #7c3aed, #db2777)'
                                : 'rgba(255,255,255,0.05)',
                            border: playing ? 'none' : '1px solid rgba(255,255,255,0.1)',
                            boxShadow: playing ? '0 0 40px rgba(124,58,237,0.4)' : 'none',
                        }}
                        aria-label={playing ? 'Detener' : 'Reproducir'}
                    >
                        {playing ? <Pause size={24} className="text-white" fill="white" /> : <Play size={24} className="text-white ml-1" fill="white" />}
                    </button>

                    {/* Volume */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <button
                                onClick={toggleMute}
                                className="text-white/40 hover:text-white/70 transition-colors cursor-pointer"
                                aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                            >
                                {isMuted ? <Minus size={16} /> : masterVol > 0.5 ? <Volume2 size={16} /> : <Zap size={16} />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={masterVol}
                                onChange={e => {
                                    setMasterVol(parseFloat(e.target.value));
                                    setIsMuted(false);
                                }}
                                className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, #7c3aed ${masterVol * 100}%, rgba(255,255,255,0.1) ${masterVol * 100}%)`,
                                }}
                                aria-label="Volumen"
                            />
                            <span className="text-white/30 text-[10px] font-mono w-8 text-right">
                                {Math.round(masterVol * 100)}%
                            </span>
                        </div>
                        {/* Active layers indicator */}
                        <div className="flex gap-1.5 flex-wrap">
                            {activeLayers.size === 0 ? (
                                <span className="text-white/20 text-[10px]">Sin capas activas</span>
                            ) : (
                                Array.from(activeLayers).map(id => {
                                    const l = SOUND_LAYERS.find(sl => sl.id === id);
                                    return l ? (
                                        <span key={id} className="text-[10px] text-psyche-violet/60 bg-psyche-violet/10 px-2 py-0.5 rounded-full">
                                            {l.name}
                                        </span>
                                    ) : null;
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
