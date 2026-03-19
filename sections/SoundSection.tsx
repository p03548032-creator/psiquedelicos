'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { MetatronDivider } from '@/components/SacredGeometry';
import engine from '@/audio/AudioEngine';

/* ═══════════════════════════════════════════════════════
   SECCIÓN SONORA — Portal de los Psicodélicos
   
   Todo el audio funciona con Web Audio API en tiempo real.
   El AudioEngine es un singleton que persiste entre renders.
   ═══════════════════════════════════════════════════════ */

// ── Datos ──

import { Heart, Activity, ShieldPlus, ArrowRightLeft, Globe, Infinity, Users, Eye, Sparkles, Crown } from 'lucide-react';
import { Moon, User as UserMeditator, Droplet, Zap, Star } from 'lucide-react';
import { CloudRain, Bell, Music, Waves, Volume2, Wind, Flame, Droplets } from 'lucide-react';

const solfeggioFreqs = [
  { hz: 174, name: 'Alivio del Dolor', color: '#ef4444', emoji: Heart, chakra: 'Sub-raíz', description: 'Frecuencia base del solfeggio. Reduce el dolor físico, relaja la musculatura y genera sensación de seguridad.', benefits: ['Reducción del dolor', 'Relajación muscular', 'Sensación de seguridad'] },
  { hz: 285, name: 'Regeneración Celular', color: '#f97316', emoji: Activity, chakra: 'Sacro inferior', description: 'Promueve la curación de tejidos dañados y restaura campos energéticos.', benefits: ['Curación de tejidos', 'Restauración energética', 'Rejuvenecimiento'] },
  { hz: 396, name: 'Liberación del Miedo', color: '#dc2626', emoji: ShieldPlus, chakra: 'Raíz (Muladhara)', description: 'Libera culpa y miedo. Desbloquea la energía del chakra raíz.', benefits: ['Liberar culpa', 'Superar miedos', 'Arraigo'] },
  { hz: 417, name: 'Facilitar el Cambio', color: '#ea580c', emoji: ArrowRightLeft, chakra: 'Sacro (Svadhisthana)', description: 'Deshace situaciones negativas y facilita el cambio. Limpia experiencias traumáticas.', benefits: ['Limpiar trauma', 'Facilitar cambio', 'Creatividad'] },
  { hz: 432, name: 'Armonía Universal', color: '#8b5cf6', emoji: Globe, chakra: 'Todos', description: 'La "afinación del universo". A=432 Hz es consonante con patrones naturales.', benefits: ['Armonía natural', 'Paz mental', 'Coherencia cardíaca'] },
  { hz: 528, name: 'Transformación & ADN', color: '#22c55e', emoji: Infinity, chakra: 'Plexo Solar (Manipura)', description: 'La "frecuencia del amor". Investigaciones sugieren efectos en la reducción del cortisol.', benefits: ['Reparación ADN', 'Reducir cortisol', 'Amor incondicional'] },
  { hz: 639, name: 'Conexión Humana', color: '#06b6d4', emoji: Users, chakra: 'Corazón (Anahata)', description: 'Promueve la armonía en relaciones y comunicación empática.', benefits: ['Relaciones', 'Comunicación', 'Empatía'] },
  { hz: 741, name: 'Despertar Intuición', color: '#4f46e5', emoji: Sparkles, chakra: 'Garganta (Vishuddha)', description: 'Limpieza celular y expansión de consciencia. Despierta la intuición.', benefits: ['Intuición', 'Autoexpresión', 'Limpieza celular'] },
  { hz: 852, name: 'Visión Espiritual', color: '#9333ea', emoji: Eye, chakra: 'Tercer Ojo (Ajna)', description: 'Retorno al orden espiritual. Activa la visión interior.', benefits: ['Visión interior', 'Clarividencia', 'Orden espiritual'] },
  { hz: 963, name: 'Conexión Divina', color: '#ec4899', emoji: Crown, chakra: 'Corona (Sahasrara)', description: 'Conecta con la consciencia universal. Activa la glándula pineal.', benefits: ['Consciencia cósmica', 'Glándula pineal', 'Unidad mística'] },
];

const binauralPresets = [
  { id: 'delta', name: 'Sueño Profundo', emoji: Moon, baseFreq: 200, beatFreq: 2, color: '#6366f1', brainwave: 'Delta · 2 Hz', description: 'Ondas Delta (0.5-4 Hz). Sueño reparador, regeneración celular.', uses: ['Insomnio', 'Regeneración', 'Meditación profunda'] },
  { id: 'theta', name: 'Trance Meditativo', emoji: UserMeditator, baseFreq: 220, beatFreq: 6, color: '#7c3aed', brainwave: 'Theta · 6 Hz', description: 'Ondas Theta (4-8 Hz). Estado hipnagógico, creatividad.', uses: ['Meditación', 'Creatividad', 'Visualización'] },
  { id: 'alpha', name: 'Relajación Lúcida', emoji: Droplet, baseFreq: 250, beatFreq: 10, color: '#06b6d4', brainwave: 'Alpha · 10 Hz', description: 'Ondas Alpha (8-13 Hz). Relajación consciente, flow.', uses: ['Anti-estrés', 'Flow state', 'Preparación'] },
  { id: 'beta', name: 'Enfoque Activo', emoji: Zap, baseFreq: 300, beatFreq: 18, color: '#f59e0b', brainwave: 'Beta · 18 Hz', description: 'Ondas Beta (13-30 Hz). Concentración y pensamiento analítico.', uses: ['Concentración', 'Estudio', 'Integración'] },
  { id: 'gamma', name: 'Consciencia Expandida', emoji: Star, baseFreq: 350, beatFreq: 40, color: '#db2777', brainwave: 'Gamma · 40 Hz', description: 'Ondas Gamma (30-100 Hz). Estados de consciencia elevada.', uses: ['Peak experience', 'Insight', 'Consciencia expandida'] },
];

const soundscapeLayers = [
  { id: 'rain', name: 'Lluvia Suave', emoji: CloudRain, desc: 'Gotas sobre cristal', type: 'noise' as const, freq: 0, filterFreq: 2500, filterType: 'lowpass' as BiquadFilterType, vol: 0.12 },
  { id: 'bowl', name: 'Cuencos Tibetanos', emoji: Bell, desc: 'Cuenco 396 Hz con armónicos', type: 'bowl' as const, freq: 396, filterFreq: 0, filterType: 'lowpass' as BiquadFilterType, vol: 0.06 },
  { id: 'om', name: 'OM Continuo', emoji: Volume2, desc: 'Frecuencia del OM (136.1 Hz)', type: 'tone' as const, freq: 136.1, filterFreq: 0, filterType: 'lowpass' as BiquadFilterType, vol: 0.05 },
  { id: 'river', name: 'Río Fluyendo', emoji: Droplets, desc: 'Agua sobre piedras', type: 'noise' as const, freq: 0, filterFreq: 1200, filterType: 'lowpass' as BiquadFilterType, vol: 0.10 },
  { id: 'drone432', name: 'Drone 432 Hz', emoji: Music, desc: 'Drone tonal con armónicos', type: 'tone' as const, freq: 432, filterFreq: 0, filterType: 'lowpass' as BiquadFilterType, vol: 0.04 },
  { id: 'wind', name: 'Viento Cósmico', emoji: Wind, desc: 'Brisa etérea filtrada', type: 'noise' as const, freq: 0, filterFreq: 600, filterType: 'bandpass' as BiquadFilterType, vol: 0.08 },
  { id: 'fire', name: 'Fuego Crepitante', emoji: Flame, desc: 'Crepitar de hoguera', type: 'noise' as const, freq: 0, filterFreq: 4000, filterType: 'highpass' as BiquadFilterType, vol: 0.06 },
  { id: 'ocean', name: 'Olas del Mar', emoji: Waves, desc: 'Oleaje rítmico', type: 'noise' as const, freq: 0, filterFreq: 800, filterType: 'lowpass' as BiquadFilterType, vol: 0.10 },
];

import { Feather, Leaf, Sparkles as Sparkles2, FlaskConical, Globe as Globe2, Music as Music2 } from 'lucide-react';

const playlists = [
  { id: 'ceremony', title: 'Ceremonial Sagrado', emoji: Feather, color: '#d97706', tracks: 24, duration: '4h 30min', description: 'Ícaros y cantos ceremoniales amazónicos.', tags: ['Ayahuasca', 'Ícaros', 'Ceremonial'] },
  { id: 'integration', title: 'Integración Suave', emoji: Leaf, color: '#10b981', tracks: 18, duration: '2h 15min', description: 'Ambient suave para post-experiencia.', tags: ['Post-sesión', 'Ambient', 'Healing'] },
  { id: 'journey', title: 'Viaje Interior', emoji: Sparkles2, color: '#7c3aed', tracks: 32, duration: '6h 00min', description: 'Arco narrativo basado en protocolo Johns Hopkins.', tags: ['Sesión completa', 'Psilocibina'] },
  { id: 'microdose', title: 'Microdosis & Flow', emoji: FlaskConical, color: '#06b6d4', tracks: 40, duration: '3h 20min', description: 'Beats lo-fi para días de microdosis.', tags: ['Microdosis', 'Lo-fi', 'Productividad'] },
  { id: 'nature', title: 'Sonidos de Gaia', emoji: Globe2, color: '#059669', tracks: 15, duration: '5h 00min', description: 'Field recordings puros. Solo Tierra.', tags: ['Nature sounds', 'Grounding'] },
  { id: 'rock', title: 'Psicodelia Clásica', emoji: Music2, color: '#e11d48', tracks: 50, duration: '4h 45min', description: 'De Pink Floyd a Tame Impala.', tags: ['Rock psicodélico', 'Clásicos'] },
];


// ══════════════════════════════════════════════════════════
// VISUALIZADOR SAGRADO — Reacciona a TODAS las fuentes
// ══════════════════════════════════════════════════════════

function SacredVisualizer({ activeSources }: { activeSources: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      if (!w || !h) { resize(); }
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) * 0.42;
      const isActive = activeSources > 0;
      timeRef.current += isActive ? 0.015 : 0.004;
      const t = timeRef.current;

      const freqData = engine.getAnalyserData();
      const hasData = freqData.length > 0 && freqData.some(v => v > 0);

      // Background glow
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 1.5);
      bgGrad.addColorStop(0, isActive ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.02)');
      bgGrad.addColorStop(0.5, isActive ? 'rgba(219,39,119,0.04)' : 'transparent');
      bgGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Seed of Life: 7 circles
      const seedR = maxR * 0.18;
      const seedPositions = [{ x: 0, y: 0 }];
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        seedPositions.push({ x: seedR * Math.cos(a), y: seedR * Math.sin(a) });
      }

      seedPositions.forEach((pos, i) => {
        const fi = Math.floor((i / 7) * (freqData.length || 1));
        const fv = hasData ? freqData[fi] / 255 : 0;
        const pulse = isActive ? 0.7 + fv * 0.5 + Math.sin(t * 3 + i) * 0.1 : 0.5 + Math.sin(t * 0.5 + i * 0.5) * 0.1;
        const r = seedR * pulse;

        ctx.beginPath();
        ctx.arc(cx + pos.x, cy + pos.y, r, 0, Math.PI * 2);
        const hue = 270 + i * 15 + (hasData ? fv * 30 : 0);
        ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${0.06 + (isActive ? fv * 0.15 : 0)})`;
        ctx.lineWidth = 0.8 + (isActive ? fv * 1.5 : 0);
        ctx.stroke();

        if (isActive && fv > 0.3) {
          ctx.fillStyle = `hsla(${hue}, 80%, 50%, ${fv * 0.04})`;
          ctx.fill();
        }
      });

      // Concentric rings
      for (let i = 0; i < 9; i++) {
        const fi = Math.floor((i / 9) * (freqData.length || 1));
        const fv = hasData ? freqData[fi] / 255 : 0;
        const baseR = (maxR / 9) * (i + 1);
        const pulse = isActive ? 1 + fv * 0.15 : 1 + Math.sin(t * 0.3 + i) * 0.02;

        ctx.beginPath();
        ctx.arc(cx, cy, baseR * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${270 + i * 10}, 60%, 60%, ${(0.03 + (isActive ? fv * 0.08 : 0)) * (1 - i / 18)})`;
        ctx.lineWidth = 0.5 + (isActive ? fv : 0);
        ctx.stroke();
      }

      // Rotating hexagon (Metatrón)
      const hexR = maxR * 0.28 * (isActive ? (1 + Math.sin(t) * 0.05) : 0.9);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * (isActive ? 0.15 : 0.03));

      for (let layer = 0; layer < 3; layer++) {
        const lr = hexR * (1 - layer * 0.25);
        ctx.beginPath();
        for (let i = 0; i <= 6; i++) {
          const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
          const px = lr * Math.cos(a);
          const py = lr * Math.sin(a);
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(124, 58, 237, ${isActive ? 0.1 + layer * 0.03 : 0.04})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      ctx.restore();

      // Frequency response wave
      if (isActive && hasData) {
        ctx.beginPath();
        const waveR = maxR * 0.5;
        for (let a = 0; a < Math.PI * 2; a += 0.02) {
          const idx = Math.floor((a / (Math.PI * 2)) * freqData.length);
          const val = freqData[idx] / 255;
          const wobble = val * 20 + Math.sin(a * 4 + t * 3) * 3;
          const px = cx + (waveR + wobble) * Math.cos(a);
          const py = cy + (waveR + wobble) * Math.sin(a);
          if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.06)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Orbital particles
      const np = isActive ? 40 : 15;
      for (let i = 0; i < np; i++) {
        const fi = i % (freqData.length || 1);
        const fv = hasData ? freqData[fi] / 255 : 0;
        const orbitR = maxR * 0.15 + (i / np) * maxR * 0.85;
        const spd = (0.3 + i * 0.05) * (i % 2 === 0 ? 1 : -1) * (isActive ? 1.5 : 1);
        const angle = t * spd + (i / np) * Math.PI * 2;
        const px = cx + orbitR * Math.cos(angle);
        const py = cy + orbitR * Math.sin(angle);
        const pSize = 0.5 + (isActive ? fv * 2.5 : Math.sin(t + i) * 0.5);

        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${270 + i * 3 + (hasData ? fv * 60 : 0)}, 70%, 65%, ${0.2 + (isActive ? fv * 0.5 : 0)})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [activeSources]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-56 sm:h-64 md:h-72 rounded-2xl"
      style={{ background: 'radial-gradient(ellipse at center, rgba(15,15,46,0.8), rgba(5,5,16,0.95))' }}
    />
  );
}


// ══════════════════════════════════════════════════════════
// PANEL SOLFEGGIO — 10 frecuencias con audio real
// ══════════════════════════════════════════════════════════

function SolfeggioPanel({ onUpdate }: { onUpdate: () => void }) {
  const [playing, setPlaying] = useState<Set<number>>(new Set());
  const [volumes, setVolumes] = useState<Map<number, number>>(new Map());
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = async (hz: number) => {
    const id = `solf-${hz}`;
    if (playing.has(hz)) {
      engine.stopId(id);
      setPlaying(p => { const n = new Set(p); n.delete(hz); return n; });
    } else {
      const vol = volumes.get(hz) ?? 0.08;
      await engine.startRichTone(id, hz, vol);
      setPlaying(p => new Set(p).add(hz));
    }
    setTimeout(onUpdate, 100);
  };

  const setVol = (hz: number, v: number) => {
    setVolumes(m => new Map(m).set(hz, v));
    engine.setVolume(`solf-${hz}`, v);
  };

  const stopAll = () => {
    playing.forEach(hz => engine.stopId(`solf-${hz}`));
    setPlaying(new Set());
    setTimeout(onUpdate, 100);
  };

  const playChord = async (freqs: number[]) => {
    playing.forEach(hz => engine.stopId(`solf-${hz}`));
    const newPlaying = new Set<number>();
    for (const hz of freqs) {
      await engine.startRichTone(`solf-${hz}`, hz, 0.05);
      newPlaying.add(hz);
    }
    setPlaying(newPlaying);
    setTimeout(onUpdate, 100);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      playing.forEach(hz => engine.stopId(`solf-${hz}`));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white/90">🎶 Frecuencias del Solfeggio</h3>
          <p className="text-sm text-white/40 mt-1">
            Pulsa ▶ en cualquier frecuencia para escucharla. Combina varias para crear acordes.
          </p>
        </div>
        {playing.size > 0 && (
          <div className="flex items-center gap-3">
            <span className="vesica-btn px-4 py-1.5 glass-sacred text-xs text-green-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {playing.size} activa{playing.size !== 1 ? 's' : ''}
            </span>
            <button onClick={stopAll} className="vesica-btn px-4 py-1.5 glass-sacred text-xs text-red-400/80 hover:text-red-400 transition-colors cursor-pointer">
              ⏹ Parar todo
            </button>
          </div>
        )}
      </div>

      {/* Chords */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-white/30 self-center mr-1">Acordes:</span>
        {[
          { label: '💚 Sanación', freqs: [396, 528, 639] },
          { label: '👁️ Despertar', freqs: [741, 852, 963] },
          { label: '🔴 Arraigo', freqs: [174, 285, 396] },
          { label: '🌈 Arco completo', freqs: [396, 417, 528, 639, 741, 852] },
        ].map(c => (
          <button key={c.label} onClick={() => playChord(c.freqs)} className="vesica-btn px-4 py-1.5 glass-sacred text-xs text-white/50 hover:text-white/80 transition-colors cursor-pointer">
            {c.label}
          </button>
        ))}
      </div>

      {/* Frequency grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {solfeggioFreqs.map(f => {
          const isOn = playing.has(f.hz);
          const isExp = expanded === f.hz;
          return (
            <div
              key={f.hz}
              className={`relative rounded-2xl border transition-all duration-500 overflow-hidden ${isOn ? 'scale-[1.02] shadow-lg' : 'border-white/5 hover:border-white/15'}`}
              style={{
                borderColor: isOn ? f.color + '66' : undefined,
                boxShadow: isOn ? `0 0 25px ${f.color}25` : undefined,
              }}
            >
              {isOn && <div className="absolute inset-0 animate-pulse" style={{ background: `radial-gradient(circle, ${f.color}12, transparent)` }} />}

              <div className="relative p-3 sm:p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-2xl font-black" style={{ color: isOn ? f.color : f.color + '99' }}>
                    {f.hz}<span className="text-[10px] font-normal text-white/25 ml-1">Hz</span>
                  </div>
                  <button
                    onClick={() => toggle(f.hz)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${isOn ? 'scale-110 text-white' : 'bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/70'}`}
                    style={{ background: isOn ? f.color : undefined, boxShadow: isOn ? `0 0 15px ${f.color}50` : undefined }}
                    title={isOn ? 'Pausar' : 'Reproducir'}
                  >
                    {isOn ? (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    )}
                  </button>
                </div>

                <p className="text-xs font-semibold text-white/70 mb-0.5">{f.name}</p>
                <p className="text-[10px] text-white/25"><f.emoji size={12} strokeWidth={1.5} /> {f.chakra}</p>

                {isOn && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] text-white/25">🔊</span>
                    <input type="range" min="0.01" max="0.2" step="0.005" value={volumes.get(f.hz) ?? 0.08} onChange={e => setVol(f.hz, parseFloat(e.target.value))} className="flex-1 h-1" style={{ accentColor: f.color }} />
                  </div>
                )}

                {isOn && (
                  <div className="flex items-end gap-0.5 mt-2 h-4 justify-center">
                    {[0, 1, 2, 3, 4].map(i => (
                      <div key={i} className="w-1 rounded-full animate-pulse" style={{ height: `${30 + Math.random() * 70}%`, backgroundColor: f.color, opacity: 0.7, animationDelay: `${i * 0.12}s`, animationDuration: `${0.4 + Math.random() * 0.4}s` }} />
                    ))}
                  </div>
                )}

                <button onClick={() => setExpanded(isExp ? null : f.hz)} className="mt-2 text-[10px] text-white/20 hover:text-white/40 transition-colors cursor-pointer">
                  {isExp ? '▲ Menos' : '▼ Info'}
                </button>
              </div>

              {isExp && (
                <div className="px-3 sm:px-4 pb-4 space-y-2 border-t border-white/5 pt-3">
                  <p className="text-xs text-white/40 leading-relaxed">{f.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {f.benefits.map(b => (
                      <span key={b} className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: f.color + '15', color: f.color + '90' }}>{b}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-2xl border border-amber-500/10 bg-amber-500/[0.03]">
        <p className="text-xs text-white/35 leading-relaxed flex items-start gap-3">
          <span className="text-xl flex-shrink-0">⚗️</span>
          <span>
            <strong className="text-white/60">Nota científica:</strong> Las frecuencias del solfeggio provienen de tradiciones musicales medievales.
            Si bien muchas personas reportan beneficios (relajación, meditación más profunda), la evidencia sobre efectos como "reparación del ADN" es limitada.
            Lo que sí está documentado es el efecto calmante de los tonos puros. <span className="text-white/50">Usa auriculares para mejor experiencia.</span>
          </span>
        </p>
      </div>
    </div>
  );
}


// ══════════════════════════════════════════════════════════
// GENERADOR BINAURAL — 5 presets + personalizado
// ══════════════════════════════════════════════════════════

function BinauralPanel({ onUpdate }: { onUpdate: () => void }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.3);
  const [customBase, setCustomBase] = useState(200);
  const [customBeat, setCustomBeat] = useState(6);
  const [showCustom, setShowCustom] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = async (id: string, base: number, beat: number) => {
    stop();
    await engine.startBinaural('binaural', base, beat, volume);
    setActiveId(id);
    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    setTimeout(onUpdate, 100);
  };

  const stop = () => {
    engine.stopId('binaural');
    setActiveId(null);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(onUpdate, 100);
  };

  useEffect(() => {
    if (activeId) engine.setVolume('binaural', volume);
  }, [volume, activeId]);

  useEffect(() => {
    return () => { engine.stopId('binaural'); if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  const activePreset = binauralPresets.find(p => p.id === activeId);

  return (
    <div className="space-y-6">
      {/* Playing status */}
      {activeId && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl glass-sacred">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <div>
              <p className="text-sm text-white/80 font-medium">
                {activePreset ? `${activePreset.emoji} ${activePreset.name}` : '⚙️ Personalizado'}
              </p>
              <p className="text-xs text-white/35">
                {activePreset ? activePreset.brainwave : `Base: ${customBase} Hz · Beat: ${customBeat} Hz`}
                {' · '}{fmt(elapsed)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/30">🔊</span>
            <input type="range" min="0" max="0.6" step="0.01" value={volume} onChange={e => setVolume(parseFloat(e.target.value))} className="w-20 h-1 accent-purple-500" />
            <button onClick={stop} className="vesica-btn px-3 py-1.5 bg-red-500/10 text-red-400/70 text-xs hover:text-red-400 transition-colors cursor-pointer">
              ⏹ Parar
            </button>
          </div>
        </div>
      )}

      {/* Presets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {binauralPresets.map(p => {
          const isOn = activeId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => isOn ? stop() : play(p.id, p.baseFreq, p.beatFreq)}
              className={`group relative text-left p-4 rounded-2xl border transition-all duration-500 cursor-pointer ${isOn ? 'scale-[1.02] shadow-lg' : 'border-white/5 hover:border-white/15'}`}
              style={{
                borderColor: isOn ? p.color + '99' : undefined,
                boxShadow: isOn ? `0 0 30px ${p.color}30` : undefined,
                background: isOn ? `linear-gradient(135deg, ${p.color}15, transparent)` : 'rgba(255,255,255,0.02)',
              }}
            >
              {isOn && (
                <div className="absolute top-2 right-2 flex gap-0.5">
                  {[0, 1, 2].map(i => <div key={i} className="w-1 rounded-full animate-pulse" style={{ height: 8 + i * 4, backgroundColor: p.color, animationDelay: `${i * 0.15}s` }} />)}
                </div>
              )}
              <span className="text-2xl mb-2 block"><p.emoji size={24} strokeWidth={1.5} /></span>
              <h4 className="text-sm font-semibold text-white/90 mb-1">{p.name}</h4>
              <p className="text-xs text-white/40 mb-2">{p.brainwave}</p>
              <div className="flex flex-wrap gap-1">
                {p.uses.map(u => <span key={u} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30">{u}</span>)}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active info */}
      {activePreset && activeId && (
        <div className="p-5 rounded-2xl border" style={{ borderColor: activePreset.color + '30', background: `linear-gradient(135deg, ${activePreset.color}08, transparent)` }}>
          <div className="flex items-start gap-4">
            <span className="text-4xl"><activePreset.emoji size={36} strokeWidth={1.5} /></span>
            <div>
              <h4 className="text-lg font-bold text-white/90">{activePreset.name}</h4>
              <p className="text-white/50 text-sm mt-1">{activePreset.description}</p>
              <p className="text-xs text-white/30 mt-2">L: {activePreset.baseFreq} Hz · R: {activePreset.baseFreq + activePreset.beatFreq} Hz</p>
            </div>
          </div>
        </div>
      )}

      {/* Custom mode */}
      <div>
        <button onClick={() => setShowCustom(!showCustom)} className="vesica-btn px-6 py-3 glass-sacred text-sm text-white/60 hover:text-white/90 transition-colors cursor-pointer">
          {showCustom ? '✕ Cerrar' : '⚙️ Frecuencia personalizada'}
        </button>

        {showCustom && (
          <div className="mt-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-white/40 block mb-2">Frecuencia base: <span className="text-white/70">{customBase} Hz</span></label>
                <input type="range" min="100" max="500" value={customBase} onChange={e => setCustomBase(parseInt(e.target.value))} className="w-full h-1 accent-purple-500" />
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-2">Beat binaural: <span className="text-white/70">{customBeat} Hz</span></label>
                <input type="range" min="1" max="50" step="0.5" value={customBeat} onChange={e => setCustomBeat(parseFloat(e.target.value))} className="w-full h-1 accent-pink-500" />
              </div>
            </div>
            <button
              onClick={() => activeId === 'custom' ? stop() : play('custom', customBase, customBeat)}
              className={`vesica-btn px-8 py-3 font-semibold text-sm transition-all cursor-pointer ${activeId === 'custom' ? 'gradient-psyche text-white shadow-lg' : 'glass-sacred text-white/70 hover:text-white'}`}
            >
              {activeId === 'custom' ? '⏹ Detener' : '▶ Reproducir'}
            </button>
          </div>
        )}
      </div>

      <div className="p-4 rounded-2xl border border-cyan-500/10 bg-cyan-500/[0.03]">
        <p className="text-xs text-white/35 leading-relaxed flex items-start gap-3">
          <span className="text-xl flex-shrink-0">🎧</span>
          <span>
            <strong className="text-white/60">Auriculares obligatorios:</strong> Los binaurales necesitan un tono diferente en cada oído.
            Sin auriculares, solo escucharás dos tonos separados sin efecto binaural.
          </span>
        </p>
      </div>
    </div>
  );
}


// ══════════════════════════════════════════════════════════
// SOUNDSCAPE GENERATIVO — 8 capas mezclables
// ══════════════════════════════════════════════════════════

function SoundscapePanel({ onUpdate }: { onUpdate: () => void }) {
  const [active, setActive] = useState<Set<string>>(new Set());
  const [vols, setVols] = useState<Map<string, number>>(new Map());

  const toggle = async (layer: typeof soundscapeLayers[0]) => {
    const id = `scape-${layer.id}`;
    if (active.has(layer.id)) {
      engine.stopId(id);
      setActive(p => { const n = new Set(p); n.delete(layer.id); return n; });
    } else {
      const vol = vols.get(layer.id) ?? layer.vol;
      if (layer.type === 'noise') {
        await engine.startNoise(id, layer.filterFreq, vol, layer.filterType);
      } else if (layer.type === 'bowl') {
        await engine.startBowl(id, layer.freq, vol);
      } else {
        await engine.startRichTone(id, layer.freq, vol);
      }
      setActive(p => new Set(p).add(layer.id));
    }
    setTimeout(onUpdate, 100);
  };

  const setLayerVol = (layerId: string, v: number) => {
    setVols(m => new Map(m).set(layerId, v));
    engine.setVolume(`scape-${layerId}`, v);
  };

  const stopAll = () => {
    active.forEach(id => engine.stopId(`scape-${id}`));
    setActive(new Set());
    setTimeout(onUpdate, 100);
  };

  const playScene = async (layerIds: string[]) => {
    active.forEach(id => engine.stopId(`scape-${id}`));
    const newActive = new Set<string>();
    for (const lid of layerIds) {
      const layer = soundscapeLayers.find(l => l.id === lid);
      if (!layer) continue;
      const id = `scape-${layer.id}`;
      const vol = vols.get(layer.id) ?? layer.vol;
      if (layer.type === 'noise') await engine.startNoise(id, layer.filterFreq, vol, layer.filterType);
      else if (layer.type === 'bowl') await engine.startBowl(id, layer.freq, vol);
      else await engine.startRichTone(id, layer.freq, vol);
      newActive.add(layer.id);
    }
    setActive(newActive);
    setTimeout(onUpdate, 100);
  };

  useEffect(() => {
    return () => { active.forEach(id => engine.stopId(`scape-${id}`)); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white/90">🎛️ Soundscape Generativo</h3>
          <p className="text-sm text-white/40 mt-1">Mezcla capas de sonido procedural en tiempo real.</p>
        </div>
        {active.size > 0 && (
          <button onClick={stopAll} className="vesica-btn px-4 py-1.5 glass-sacred text-xs text-red-400/70 hover:text-red-400 transition-colors cursor-pointer">
            ⏹ Detener todo
          </button>
        )}
      </div>

      {/* Scenes */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-white/30 self-center mr-1">Escenas:</span>
        {[
          { label: '🧘 Meditación', layers: ['rain', 'bowl', 'om'] },
          { label: '🌿 Naturaleza', layers: ['rain', 'river', 'wind'] },
          { label: '🪶 Ceremonia', layers: ['bowl', 'om', 'drone432'] },
          { label: '🔥 Hoguera costera', layers: ['fire', 'wind', 'ocean'] },
        ].map(s => (
          <button key={s.label} onClick={() => playScene(s.layers)} className="vesica-btn px-4 py-1.5 glass-sacred text-xs text-white/50 hover:text-white/80 transition-colors cursor-pointer">
            {s.label}
          </button>
        ))}
      </div>

      {/* Layers grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {soundscapeLayers.map(layer => {
          const isOn = active.has(layer.id);
          return (
            <div
              key={layer.id}
              className={`rounded-xl border transition-all duration-500 overflow-hidden ${isOn ? 'border-purple-500/30 bg-purple-500/[0.08] shadow-lg shadow-purple-500/10' : 'border-white/5 bg-white/[0.02] hover:border-white/15'}`}
            >
              <button onClick={() => toggle(layer)} className="w-full p-4 text-left cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl"><layer.emoji size={20} strokeWidth={1.5} /></span>
                  {isOn && (
                    <div className="flex gap-px">
                      {[0, 1, 2].map(j => <div key={j} className="w-0.5 bg-purple-500 rounded-full animate-pulse" style={{ height: 6 + j * 3, animationDelay: `${j * 0.1}s` }} />)}
                    </div>
                  )}
                </div>
                <p className={`text-sm font-medium ${isOn ? 'text-white/90' : 'text-white/50'}`}>{layer.name}</p>
                <p className="text-[10px] text-white/25 mt-0.5">{layer.desc}</p>
              </button>
              {isOn && (
                <div className="px-4 pb-3 flex items-center gap-2">
                  <span className="text-[10px] text-white/25">🔊</span>
                  <input type="range" min="0.01" max="0.25" step="0.005" value={vols.get(layer.id) ?? layer.vol} onChange={e => setLayerVol(layer.id, parseFloat(e.target.value))} className="flex-1 h-1 accent-purple-500" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ══════════════════════════════════════════════════════════
// PLAYLISTS CURADAS
// ══════════════════════════════════════════════════════════

function PlaylistsPanel() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map(pl => (
          <button
            key={pl.id}
            onClick={() => setSelected(selected === pl.id ? null : pl.id)}
            className={`group relative text-left p-5 rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer ${selected === pl.id ? 'scale-[1.02]' : 'border-white/5 hover:border-white/15'}`}
            style={{ borderColor: selected === pl.id ? pl.color + '80' : undefined, boxShadow: selected === pl.id ? `0 0 40px ${pl.color}20` : undefined }}
          >
            <div className="absolute inset-0 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity" style={{ background: `linear-gradient(135deg, ${pl.color}, transparent)` }} />
            <div className="relative">
              <span className="text-3xl mb-3 block"><pl.emoji size={28} strokeWidth={1.5} /></span>
              <h4 className="text-base font-bold text-white/90 mb-1">{pl.title}</h4>
              <p className="text-xs text-white/30 mb-3">{pl.tracks} tracks · {pl.duration}</p>
              <div className="flex flex-wrap gap-1.5">
                {pl.tags.map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: pl.color + '15', color: pl.color + '99' }}>{t}</span>)}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected && (() => {
        const pl = playlists.find(p => p.id === selected)!;
        return (
          <div className="p-6 rounded-2xl border" style={{ borderColor: pl.color + '25', background: `linear-gradient(135deg, ${pl.color}05, transparent)` }}>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 rounded-xl flex items-center justify-center text-4xl" style={{ background: pl.color + '15' }}><pl.emoji size={36} strokeWidth={1.5} /></div>
              <div>
                <h4 className="text-xl font-bold text-white/90 mb-2">{pl.title}</h4>
                <p className="text-white/50 text-sm mb-3">{pl.description}</p>
                <p className="text-xs text-white/30">🎵 {pl.tracks} tracks · ⏱ {pl.duration}</p>
                <div className="mt-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-white/50 leading-relaxed">
                    💡 Las playlists se publicarán en Spotify y YouTube.
                  </p>

                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}


// ══════════════════════════════════════════════════════════
// CONTROLES MAESTROS
// ══════════════════════════════════════════════════════════

function MasterControls({ activeSources }: { activeSources: number }) {
  const [masterVol, setMasterVol] = useState(0.5);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 p-4 rounded-2xl glass-sacred">
      <div className="flex items-center gap-3">
        <span className="text-sm text-white/40">🎚️ Master</span>
        <input type="range" min="0" max="1" step="0.01" value={masterVol} onChange={e => { const v = parseFloat(e.target.value); setMasterVol(v); engine.setMasterVolume(v); }} className="w-28 h-1.5 accent-purple-500" />
        <span className="text-xs text-white/30 w-8">{Math.round(masterVol * 100)}%</span>
      </div>
      {activeSources > 0 && (
        <span className="text-xs text-green-400/60 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          {activeSources} fuente{activeSources !== 1 ? 's' : ''}
        </span>
      )}
      <button
        onClick={() => engine.stopAll()}
        className="vesica-btn px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-400/70 text-sm hover:text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
      >
        🔇 PANIC
      </button>
    </div>
  );
}


// ══════════════════════════════════════════════════════════
// SECCIÓN PRINCIPAL
// ══════════════════════════════════════════════════════════

export default function SoundSection() {
  const [activeTab, setActiveTab] = useState<'solfeggio' | 'binaural' | 'soundscape' | 'playlists'>('solfeggio');
  const [activeSources, setActiveSources] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const updateSources = useCallback(() => {
    setActiveSources(engine.getActiveCount());
  }, []);

  // Poll active count every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSources(engine.getActiveCount());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Section reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const tabs = [
    { id: 'solfeggio' as const, label: '🎶 Solfeggio', desc: '10 frecuencias' },
    { id: 'binaural' as const, label: '🧠 Binaurales', desc: 'Ondas cerebrales' },
    { id: 'soundscape' as const, label: '🎛️ Soundscapes', desc: 'Ambientes' },
    { id: 'playlists' as const, label: '🎵 Playlists', desc: '6 colecciones' },
  ];

  return (
    <section id="sonido" className="relative py-32 px-6" ref={sectionRef}>
      <div className="absolute inset-0 bg-flower-of-life opacity-30 pointer-events-none" />

      <div className={`relative max-w-6xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 vesica-btn px-5 py-2 glass-sacred text-sm text-cyan-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Experiencia Sonora Interactiva
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="gradient-text-cool">Frecuencias</span>
            <span className="block text-white/90 mt-2">de Consciencia</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            Audio generado en tiempo real en tu navegador. Pulsa ▶ y escucha.
            <span className="block text-white/50 mt-2 text-sm">🎧 Auriculares recomendados · Todo funciona con Web Audio API</span>
          </p>
        </div>

        {/* Master controls */}
        <MasterControls activeSources={activeSources} />

        {/* Visualizer */}
        <div className="mt-6 mb-6 relative">
          <SacredVisualizer activeSources={activeSources} />
          {activeSources === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-white/15 text-sm text-center px-4">Pulsa ▶ en cualquier frecuencia para activar el audio y ver el visualizador reaccionar</p>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`vesica-btn px-5 py-3 text-sm transition-all duration-300 cursor-pointer ${activeTab === tab.id ? 'gradient-psyche text-white shadow-lg shadow-purple-500/20' : 'glass-sacred text-white/50 hover:text-white/80'}`}
            >
              <span className="block">{tab.label}</span>
              <span className="block text-[10px] mt-0.5 opacity-60">{tab.desc}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {activeTab === 'solfeggio' && <SolfeggioPanel onUpdate={updateSources} />}
          {activeTab === 'binaural' && <BinauralPanel onUpdate={updateSources} />}
          {activeTab === 'soundscape' && <SoundscapePanel onUpdate={updateSources} />}
          {activeTab === 'playlists' && <PlaylistsPanel />}
        </div>

        <MetatronDivider />

        {/* Combinations */}
        <div className="mt-8 p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
          <h3 className="text-lg font-bold text-white/80 mb-4 text-center">🔮 Combinaciones Sugeridas</h3>
          <p className="text-xs text-white/30 text-center mb-6">
            Activa sonidos de DIFERENTES pestañas a la vez. Se mezclan automáticamente en el motor de audio.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: 'Meditación Profunda', emoji: '🧘', recipe: 'Solfeggio 528 Hz + Theta + Cuencos', color: '#7c3aed' },
              { name: 'Integración', emoji: '🌱', recipe: 'Solfeggio 639 Hz + Alpha + Lluvia', color: '#10b981' },
              { name: 'Viaje Interior', emoji: '🌌', recipe: 'Solfeggio 963 + 852 Hz + Gamma + OM', color: '#db2777' },
            ].map(c => (
              <div key={c.name} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <span className="text-2xl block mb-2">{c.emoji}</span>
                <h4 className="text-sm font-semibold text-white/80 mb-1">{c.name}</h4>
                <p className="text-[11px] leading-relaxed" style={{ color: c.color + '99' }}>{c.recipe}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
