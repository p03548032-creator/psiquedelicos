'use client';
import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { MetatronDivider } from '@/components/SacredGeometry';
import {
  timeline,
  researchCenters,
  therapyApproaches,
  expertQuotes,
  legalFramework,
  keyStats,
} from '@/data/therapySpain';
import type { TimelineEvent, TherapyApproach, ResearchCenter } from '@/data/therapySpain';

/* ═══════════════════════════════════════════════════════
   COMPONENTES INTERNOS
   ═══════════════════════════════════════════════════════ */

// ── Stat Card con geometría sagrada ──
function StatItem({ stat, index }: { stat: typeof keyStats[0]; index: number }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`${visible ? 'animate-spiral' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="glass-sacred rounded-2xl p-5 text-center hover:scale-105 transition-all duration-500 group relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: `radial-gradient(circle at center, ${stat.color}08, transparent 70%)` }}
        />
        <div className="relative">
          <span className="text-2xl mb-2 block">{stat.icon}</span>
          <div className="text-2xl md:text-3xl font-black mb-1" style={{ color: stat.color }}>
            {stat.value}
          </div>
          <div className="text-white/30 text-xs leading-tight">{stat.label}</div>
        </div>
      </div>
    </div>
  );
}

// ── Timeline Event ──
function TimelineItem({ event, index, isLeft }: { event: TimelineEvent; index: number; isLeft: boolean }) {
  const { ref, visible } = useReveal(0.08);
  const typeColors: Record<string, string> = {
    milestone: '#22d3ee',
    research: '#a78bfa',
    legal: '#fbbf24',
    clinical: '#f472b6',
    social: '#f97316',
  };
  const typeLabels: Record<string, string> = {
    milestone: 'Hito',
    research: 'Investigación',
    legal: 'Legal',
    clinical: 'Ensayo clínico',
    social: 'Comunidad',
  };

  return (
    <div
      ref={ref}
      className={`relative flex items-center ${visible ? 'animate-spiral' : 'opacity-0'} ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Content */}
      <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} pl-12 md:pl-0`}>
        <div className="glass-sacred rounded-2xl p-5 md:p-6 hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
          {/* Glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
            style={{ boxShadow: `inset 0 0 60px ${event.color}08` }}
          />
          <div className="relative">
            <div className={`flex items-center gap-2 mb-2 flex-wrap ${isLeft ? 'md:justify-end' : ''}`}>
              <span
                className="vesica-btn px-2.5 py-0.5 text-xs font-mono"
                style={{ background: `${typeColors[event.type]}15`, color: typeColors[event.type] }}
              >
                {event.year}{event.month ? ` · ${event.month}` : ''}
              </span>
              <span
                className="vesica-btn px-2 py-0.5 text-[10px] uppercase tracking-wider"
                style={{ background: `${typeColors[event.type]}10`, color: `${typeColors[event.type]}aa` }}
              >
                {typeLabels[event.type]}
              </span>
            </div>
            <h4 className="text-base font-bold text-white mb-1.5 leading-snug">{event.title}</h4>
            {event.institution && (
              <p className="text-xs mb-2" style={{ color: `${event.color}99` }}>{event.institution}</p>
            )}
            <p className="text-white/40 text-sm leading-relaxed">{event.description}</p>
          </div>
        </div>
      </div>

      {/* Central node — on mobile: left side; on desktop: center */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center z-10">
        <div
          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base border-2 shadow-lg"
          style={{
            background: `${event.color}15`,
            borderColor: `${event.color}50`,
            boxShadow: `0 0 20px ${event.color}20`,
          }}
        >
          {event.icon}
        </div>
      </div>

      {/* Spacer for the other side */}
      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
    </div>
  );
}

// ── Research Center Card ──
function CenterCard({ center, index }: { center: ResearchCenter; index: number }) {
  const { ref, visible } = useReveal(0.1);
  const statusLabels: Record<string, string> = {
    activo: '● Activo',
    planificado: '◌ Planificado',
    completado: '✓ Completado',
  };
  const statusColors: Record<string, string> = {
    activo: '#34d399',
    planificado: '#fbbf24',
    completado: '#22d3ee',
  };

  return (
    <div
      ref={ref}
      className={`${visible ? 'animate-spiral' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="glass-sacred rounded-2xl p-6 h-full hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
        {/* Color bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-80 transition-opacity"
          style={{ background: `linear-gradient(90deg, transparent, ${center.color}, transparent)` }}
        />

        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="text-base font-bold text-white leading-snug">{center.name}</h4>
            <p className="text-sm text-white/30">{center.city}, {center.region}</p>
          </div>
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
            style={{ background: `${statusColors[center.status]}15`, color: statusColors[center.status] }}
          >
            {statusLabels[center.status]}
          </span>
        </div>

        <p className="text-white/40 text-sm leading-relaxed mb-4">{center.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {center.focus.map((f, i) => (
            <span
              key={i}
              className="vesica-btn px-2.5 py-1 text-[11px]"
              style={{ background: `${center.color}10`, color: `${center.color}cc` }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Therapy Approach Card (expandible) ──
function TherapyCard({ therapy, index }: { therapy: TherapyApproach; index: number }) {
  const { ref, visible } = useReveal(0.1);
  const [expanded, setExpanded] = useState(false);

  const phaseColors: Record<string, string> = {
    'Aprobado': '#34d399',
    'Ensayo Fase II': '#c084fc',
    'Uso compasivo': '#a78bfa',
    'Investigación observacional': '#fbbf24',
  };

  return (
    <div
      ref={ref}
      className={`${visible ? 'animate-spiral' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div className="glass-sacred rounded-2xl overflow-hidden hover:scale-[1.01] transition-all duration-500 group">
        {/* Header — clickable */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left p-6 md:p-8 relative cursor-pointer"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700"
            style={{ background: `radial-gradient(ellipse at top left, ${therapy.color}, transparent 60%)` }}
          />

          <div className="relative flex items-start gap-4">
            <span className="text-4xl flex-shrink-0">{therapy.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="text-lg md:text-xl font-bold text-white">{therapy.substance}</h3>
                <span
                  className="vesica-btn px-3 py-0.5 text-xs font-medium"
                  style={{ background: `${phaseColors[therapy.phase] || therapy.color}20`, color: phaseColors[therapy.phase] || therapy.color }}
                >
                  {therapy.phase}
                </span>
              </div>
              <p className="text-white/50 text-sm mb-2">{therapy.indication}</p>
              <p className="text-white/30 text-xs">{therapy.availability}</p>
            </div>
            <div className={`text-white/20 text-xl transition-transform duration-300 flex-shrink-0 ${expanded ? 'rotate-180' : ''}`}>
              ⌄
            </div>
          </div>
        </button>

        {/* Expanded content */}
        <div className={`overflow-hidden transition-all duration-500 ${expanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-5">
            <div className="metatron-divider" />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-white/30 mb-2">Mecanismo de acción</h4>
                <p className="text-white/60 text-sm leading-relaxed">{therapy.mechanism}</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-white/30 mb-2">Protocolo de sesiones</h4>
                <p className="text-white/60 text-sm leading-relaxed">{therapy.sessions}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-white/30 mb-2">Evidencia científica</h4>
                <p className="text-white/60 text-sm leading-relaxed">{therapy.evidence}</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-white/30 mb-2">Estado en España</h4>
                <p className="text-sm leading-relaxed" style={{ color: `${therapy.color}cc` }}>{therapy.statusInSpain}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Expert Quote Card — expandible ──
function QuoteCard({ quote, index }: { quote: typeof expertQuotes[0]; index: number }) {
  const { ref, visible } = useReveal(0.1);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={ref}
      className={`${visible ? 'animate-spiral' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="glass-sacred rounded-2xl overflow-hidden hover:scale-[1.01] transition-all duration-500 group">
        {/* Header — siempre visible */}
        <div className="relative p-6 md:p-8">
          <div className="absolute top-4 right-6 text-6xl font-serif text-white/[0.03] leading-none select-none pointer-events-none">"</div>

          <div className="relative">
            <span className="text-3xl mb-4 block">{quote.photo}</span>
            <blockquote className="text-white/60 text-sm leading-relaxed italic mb-6">
              "{quote.quote}"
            </blockquote>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-white/80 text-sm font-semibold">{quote.name}</p>
                <p className="text-white/30 text-xs">{quote.title}</p>
                <p className="text-psyche-violet/60 text-xs">{quote.institution}</p>
              </div>
              <button
                onClick={() => setExpanded(!expanded)}
                className={`flex-shrink-0 vesica-btn px-3 py-1.5 text-xs transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${expanded
                    ? 'bg-psyche-violet/10 text-psyche-violet border-psyche-violet/20'
                    : 'text-white/30 hover:text-white/60'
                  }`}
              >
                {expanded ? '▲ Menos' : '▼ Ver perfil'}
              </button>
            </div>
          </div>
        </div>

        {/* Panel expandible — bio + publicaciones + enlace */}
        <div className={`overflow-hidden transition-all duration-500 ${expanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-5">
            <div className="metatron-divider" />

            {/* Bio */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white/25 mb-2">Biografía</h4>
              <p className="text-white/55 text-sm leading-relaxed">{quote.bio}</p>
            </div>

            {/* Publicaciones clave */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white/25 mb-3">Publicaciones destacadas</h4>
              <ul className="space-y-2">
                {quote.publications.map((pub, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/40 text-xs leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-psyche-violet/50 mt-1.5 flex-shrink-0" />
                    <span>{pub}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enlace al perfil */}
            {quote.profileUrl && (
              <a
                href={quote.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 vesica-btn px-4 py-2 text-xs text-psyche-violet/70 hover:text-psyche-violet transition-colors"
              >
                <span>↗</span>
                Ver perfil institucional
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// ── Legal Card ──
function LegalCard({ aspect, index }: { aspect: typeof legalFramework[0]; index: number }) {
  const { ref, visible } = useReveal(0.1);
  const statusBg: Record<string, string> = {
    legal: 'rgba(52,211,153,0.06)',
    ambiguous: 'rgba(251,191,36,0.06)',
    illegal: 'rgba(239,68,68,0.06)',
    clinical: 'rgba(167,139,250,0.06)',
  };
  const statusBorder: Record<string, string> = {
    legal: 'rgba(52,211,153,0.15)',
    ambiguous: 'rgba(251,191,36,0.15)',
    illegal: 'rgba(239,68,68,0.15)',
    clinical: 'rgba(167,139,250,0.15)',
  };

  return (
    <div
      ref={ref}
      className={`${visible ? 'animate-spiral' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className="rounded-2xl p-5 h-full hover:scale-[1.02] transition-all duration-500"
        style={{
          background: statusBg[aspect.status],
          border: `1px solid ${statusBorder[aspect.status]}`,
        }}
      >
        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0">{aspect.icon}</span>
          <div>
            <h4 className="text-sm font-bold text-white mb-1.5">{aspect.title}</h4>
            <p className="text-white/40 text-xs leading-relaxed">{aspect.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Map of Spain — SVG detallado con markers interactivos ──
function SpainMap({ centers }: { centers: ResearchCenter[] }) {
  const { ref, visible } = useReveal(0.1);
  const [tooltip, setTooltip] = useState<number | null>(null);

  // Bounding box: lng [-9.3, 4.3], lat [35.8, 43.8]
  const lngMin = -9.3, lngMax = 4.3, latMin = 35.8, latMax = 43.8;
  const W = 880, H = 480;
  const toX = (lng: number) => ((lng - lngMin) / (lngMax - lngMin)) * W;
  const toY = (lat: number) => H - ((lat - latMin) / (latMax - latMin)) * H;

  const statusColors: Record<string, string> = { activo: '#34d399', planificado: '#fbbf24', completado: '#22d3ee' };
  const statusLabel: Record<string, string> = { activo: 'Activo', planificado: 'Planificado', completado: 'Completado' };

  // Offset markers sharing the same city (mainly Barcelona)
  const cityCounters: Record<string, number> = {};
  const cityOffsets: Record<string, Array<{ dx: number; dy: number }>> = {
    Barcelona: [{ dx: -26, dy: -10 }, { dx: 0, dy: 12 }, { dx: 24, dy: -10 }, { dx: 0, dy: 28 }],
  };
  const positioned = centers.map(c => {
    const key = c.city;
    cityCounters[key] = cityCounters[key] ?? 0;
    const offs = cityOffsets[key];
    const off = offs ? offs[cityCounters[key]] ?? { dx: 0, dy: 0 } : { dx: 0, dy: 0 };
    cityCounters[key]++;
    return { ...c, px: toX(c.lng) + off.dx, py: toY(c.lat) + off.dy };
  });

  return (
    <div ref={ref} className={`${visible ? 'animate-spiral' : 'opacity-0'}`}>
      <div className="glass-sacred rounded-2xl p-4 md:p-8 relative overflow-hidden">
        <h3 className="text-lg font-bold text-white mb-6 text-center">
          🗺️ Mapa de Investigación Psicodélica en España
        </h3>

        <div className="relative w-full max-w-3xl mx-auto">
          <svg viewBox="0 0 880 520" className="w-full" fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 0 40px rgba(124,58,237,0.08))' }}>

            {/* Grid tenue */}
            {[-8, -6, -4, -2, 0, 2, 4].map(lng => (
              <line key={`lng-${lng}`} x1={toX(lng)} y1={0} x2={toX(lng)} y2={H}
                stroke="rgba(124,58,237,0.04)" strokeWidth="0.5" strokeDasharray="3 6" />
            ))}
            {[37, 39, 41, 43].map(lat => (
              <line key={`lat-${lat}`} x1={0} y1={toY(lat)} x2={W} y2={toY(lat)}
                stroke="rgba(124,58,237,0.04)" strokeWidth="0.5" strokeDasharray="3 6" />
            ))}

            {/* Península Ibérica — contorno detallado */}
            <path
              d={[
                `M ${toX(-8.9)} ${toY(41.9)}`,
                `C ${toX(-8.8)} ${toY(42.1)} ${toX(-8.6)} ${toY(42.1)} ${toX(-8.5)} ${toY(43.7)}`,
                `C ${toX(-8.3)} ${toY(43.8)} ${toX(-8.0)} ${toY(43.75)} ${toX(-7.8)} ${toY(43.8)}`,
                `C ${toX(-7.3)} ${toY(43.75)} ${toX(-7.0)} ${toY(43.7)} ${toX(-6.5)} ${toY(43.6)}`,
                `C ${toX(-6.0)} ${toY(43.65)} ${toX(-5.7)} ${toY(43.55)} ${toX(-5.3)} ${toY(43.6)}`,
                `C ${toX(-4.8)} ${toY(43.65)} ${toX(-4.4)} ${toY(43.55)} ${toX(-3.9)} ${toY(43.45)}`,
                `C ${toX(-3.7)} ${toY(43.5)} ${toX(-3.5)} ${toY(43.45)} ${toX(-3.3)} ${toY(43.4)}`,
                `C ${toX(-2.9)} ${toY(43.5)} ${toX(-2.6)} ${toY(43.4)} ${toX(-2.0)} ${toY(43.35)}`,
                `C ${toX(-1.8)} ${toY(43.4)} ${toX(-1.6)} ${toY(43.35)} ${toX(-1.4)} ${toY(43.3)}`,
                `C ${toX(-1.0)} ${toY(43.35)} ${toX(-0.6)} ${toY(43.25)} ${toX(-0.3)} ${toY(43.2)}`,
                `C ${toX(0.0)} ${toY(43.15)} ${toX(0.3)} ${toY(43.1)} ${toX(0.7)} ${toY(42.85)}`,
                `C ${toX(1.0)} ${toY(42.5)} ${toX(1.5)} ${toY(42.4)} ${toX(1.8)} ${toY(42.4)}`,
                `C ${toX(2.5)} ${toY(42.5)} ${toX(3.0)} ${toY(42.05)} ${toX(3.3)} ${toY(41.8)}`,
                `C ${toX(3.5)} ${toY(41.6)} ${toX(3.6)} ${toY(41.3)} ${toX(3.5)} ${toY(41.0)}`,
                `C ${toX(3.4)} ${toY(40.7)} ${toX(3.0)} ${toY(40.6)} ${toX(2.8)} ${toY(40.5)}`,
                `C ${toX(2.5)} ${toY(40.3)} ${toX(2.2)} ${toY(39.9)} ${toX(1.5)} ${toY(39.5)}`,
                `C ${toX(1.2)} ${toY(39.2)} ${toX(0.8)} ${toY(39.0)} ${toX(0.5)} ${toY(38.9)}`,
                `C ${toX(0.2)} ${toY(38.7)} ${toX(-0.1)} ${toY(38.6)} ${toX(-0.4)} ${toY(38.35)}`,
                `C ${toX(-0.6)} ${toY(38.1)} ${toX(-0.6)} ${toY(37.8)} ${toX(-0.8)} ${toY(37.6)}`,
                `C ${toX(-1.0)} ${toY(37.4)} ${toX(-1.3)} ${toY(37.2)} ${toX(-1.5)} ${toY(37.0)}`,
                `C ${toX(-1.8)} ${toY(36.8)} ${toX(-2.1)} ${toY(36.7)} ${toX(-2.4)} ${toY(36.65)}`,
                `C ${toX(-3.0)} ${toY(36.0)} ${toX(-4.2)} ${toY(36.0)} ${toX(-5.2)} ${toY(36.05)}`,
                `C ${toX(-5.4)} ${toY(36.0)} ${toX(-5.6)} ${toY(36.05)} ${toX(-6.0)} ${toY(36.05)}`,
                `C ${toX(-6.2)} ${toY(36.15)} ${toX(-6.4)} ${toY(36.2)} ${toX(-6.7)} ${toY(36.5)}`,
                `C ${toX(-7.0)} ${toY(36.8)} ${toX(-7.1)} ${toY(37.0)} ${toX(-7.35)} ${toY(37.1)}`,
                `C ${toX(-7.5)} ${toY(37.25)} ${toX(-7.5)} ${toY(37.5)} ${toX(-7.5)} ${toY(37.8)}`,
                `C ${toX(-7.5)} ${toY(38.1)} ${toX(-7.45)} ${toY(38.4)} ${toX(-7.4)} ${toY(38.6)}`,
                `C ${toX(-7.3)} ${toY(38.9)} ${toX(-6.95)} ${toY(39.0)} ${toX(-6.8)} ${toY(39.0)}`,
                `C ${toX(-6.6)} ${toY(39.3)} ${toX(-6.7)} ${toY(39.5)} ${toX(-6.8)} ${toY(39.7)}`,
                `C ${toX(-7.0)} ${toY(40.0)} ${toX(-7.3)} ${toY(40.25)} ${toX(-7.4)} ${toY(40.5)}`,
                `C ${toX(-7.5)} ${toY(40.8)} ${toX(-7.45)} ${toY(41.0)} ${toX(-7.4)} ${toY(41.3)}`,
                `C ${toX(-7.4)} ${toY(41.5)} ${toX(-7.4)} ${toY(41.8)} ${toX(-8.2)} ${toY(41.9)}`,
                `C ${toX(-8.5)} ${toY(41.95)} ${toX(-8.7)} ${toY(41.85)} ${toX(-8.9)} ${toY(41.9)} Z`,
              ].join(' ')}
              stroke="rgba(124,58,237,0.4)"
              strokeWidth="1.5"
              fill="rgba(124,58,237,0.07)"
              strokeLinejoin="round"
            />

            {/* Zona Portugal diferenciada */}
            <path
              d={[
                `M ${toX(-8.9)} ${toY(41.9)}`,
                `C ${toX(-8.7)} ${toY(41.85)} ${toX(-8.5)} ${toY(41.95)} ${toX(-8.2)} ${toY(41.9)}`,
                `C ${toX(-7.4)} ${toY(41.8)} ${toX(-7.4)} ${toY(41.5)} ${toX(-7.4)} ${toY(41.3)}`,
                `C ${toX(-7.45)} ${toY(41.0)} ${toX(-7.5)} ${toY(40.8)} ${toX(-7.4)} ${toY(40.5)}`,
                `C ${toX(-7.3)} ${toY(40.25)} ${toX(-7.0)} ${toY(40.0)} ${toX(-6.8)} ${toY(39.7)}`,
                `C ${toX(-6.7)} ${toY(39.5)} ${toX(-6.6)} ${toY(39.3)} ${toX(-6.8)} ${toY(39.0)}`,
                `C ${toX(-6.95)} ${toY(39.0)} ${toX(-7.3)} ${toY(38.9)} ${toX(-7.4)} ${toY(38.6)}`,
                `C ${toX(-7.45)} ${toY(38.4)} ${toX(-7.5)} ${toY(38.1)} ${toX(-7.5)} ${toY(37.8)}`,
                `C ${toX(-7.5)} ${toY(37.5)} ${toX(-7.5)} ${toY(37.25)} ${toX(-7.35)} ${toY(37.1)}`,
                `C ${toX(-8.0)} ${toY(37.1)} ${toX(-8.5)} ${toY(37.0)} ${toX(-8.9)} ${toY(37.0)}`,
                `C ${toX(-9.0)} ${toY(37.5)} ${toX(-9.3)} ${toY(38.5)} ${toX(-9.2)} ${toY(39.5)}`,
                `C ${toX(-9.1)} ${toY(40.5)} ${toX(-9.0)} ${toY(41.2)} ${toX(-8.9)} ${toY(41.9)} Z`,
              ].join(' ')}
              stroke="rgba(124,58,237,0.12)"
              strokeWidth="0.8"
              fill="rgba(255,255,255,0.015)"
              strokeDasharray="4 3"
            />
            <text x={toX(-8.5)} y={toY(39.5)} textAnchor="middle" fill="rgba(255,255,255,0.1)" fontSize="11" fontStyle="italic">Portugal</text>

            {/* Baleares */}
            <ellipse cx={toX(3.0)} cy={toY(39.65)} rx={22} ry={11}
              stroke="rgba(124,58,237,0.3)" strokeWidth="1" fill="rgba(124,58,237,0.05)" />
            <ellipse cx={toX(4.0)} cy={toY(40.0)} rx={10} ry={5}
              stroke="rgba(124,58,237,0.2)" strokeWidth="0.8" fill="rgba(124,58,237,0.04)" />
            <ellipse cx={toX(1.4)} cy={toY(38.9)} rx={7} ry={5}
              stroke="rgba(124,58,237,0.2)" strokeWidth="0.8" fill="rgba(124,58,237,0.04)" />
            <text x={toX(3.0)} y={toY(39.2)} textAnchor="middle" fill="rgba(124,58,237,0.3)" fontSize="9">Baleares</text>

            {/* Canarias — inset */}
            <g transform="translate(20, 400)">
              <rect x={0} y={0} width={148} height={78} rx={8}
                stroke="rgba(124,58,237,0.15)" strokeWidth="0.8" fill="rgba(5,5,16,0.75)" />
              <text x={74} y={13} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="8">Islas Canarias</text>
              <ellipse cx={55} cy={44} rx={16} ry={9} stroke="rgba(124,58,237,0.3)" strokeWidth="0.8" fill="rgba(124,58,237,0.05)" />
              <ellipse cx={82} cy={47} rx={12} ry={10} stroke="rgba(124,58,237,0.25)" strokeWidth="0.8" fill="rgba(124,58,237,0.05)" />
              <ellipse cx={104} cy={40} rx={7} ry={12} stroke="rgba(124,58,237,0.2)" strokeWidth="0.8" fill="rgba(124,58,237,0.04)" />
              <ellipse cx={122} cy={35} rx={7} ry={10} stroke="rgba(124,58,237,0.2)" strokeWidth="0.8" fill="rgba(124,58,237,0.04)" />
              <ellipse cx={30} cy={39} rx={6} ry={10} stroke="rgba(124,58,237,0.2)" strokeWidth="0.8" fill="rgba(124,58,237,0.04)" />
            </g>

            {/* Markers */}
            {positioned.map((center, i) => {
              const isActive = center.status === 'activo';
              const r = isActive ? 6 : 4.5;
              const sCol = statusColors[center.status];
              const isHov = tooltip === i;
              return (
                <g
                  key={i}
                  style={{ cursor: center.url ? 'pointer' : 'default' }}
                  onClick={() => center.url && window.open(center.url, '_blank', 'noopener,noreferrer')}
                  onMouseEnter={() => setTooltip(i)}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <circle cx={center.px} cy={center.py} r={isActive ? 22 : 15}
                    fill="none" stroke={sCol} strokeWidth="0.5"
                    opacity={isHov ? 0.45 : 0.12} style={{ transition: 'opacity 0.3s' }} />
                  <circle cx={center.px} cy={center.py} r={r + 7}
                    fill={center.color} opacity={isHov ? 0.18 : 0.06} style={{ transition: 'opacity 0.3s' }} />
                  <circle cx={center.px} cy={center.py} r={r}
                    fill={sCol} opacity={isActive ? 0.9 : 0.5}
                    stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                  {isActive && (
                    <circle cx={center.px} cy={center.py} r={r}
                      fill="none" stroke={sCol} strokeWidth="1" opacity="0.35"
                      style={{
                        animation: 'ripple-map 2.2s ease-out infinite',
                        animationDelay: `${i * 0.4}s`,
                        transformOrigin: `${center.px}px ${center.py}px`
                      }} />
                  )}
                  <text x={center.px} y={center.py - r - 5} textAnchor="middle"
                    fill={isHov ? center.color : sCol}
                    fontSize={isHov ? '10' : '8.5'} fontWeight="700"
                    opacity={isHov ? 1 : 0.8}
                    style={{ transition: 'all 0.2s', pointerEvents: 'none' }}>
                    {center.city}
                  </text>
                  {isHov && (() => {
                    const flipX = center.px > W * 0.65;
                    const tw = 210, th = 80;
                    const tx = flipX ? center.px - tw - 12 : center.px + 12;
                    const ty = Math.max(4, Math.min(H - th - 4, center.py - th / 2));
                    return (
                      <g style={{ pointerEvents: 'none' }}>
                        <rect x={tx} y={ty} width={tw} height={th} rx={7}
                          fill="rgba(8,8,22,0.97)" stroke={center.color} strokeWidth="0.8" strokeOpacity="0.5" />
                        <text x={tx + 8} y={ty + 20} fill="rgba(255,255,255,0.9)" fontSize="8.5" fontWeight="700">
                          {center.name.length > 30 ? center.name.slice(0, 30) + '…' : center.name}
                        </text>
                        {center.name.length > 30 && (
                          <text x={tx + 8} y={ty + 34} fill="rgba(255,255,255,0.7)" fontSize="8" fontWeight="500">
                            {center.name.slice(30, 58)}{center.name.length > 58 ? '…' : ''}
                          </text>
                        )}
                        <rect x={tx + 8} y={ty + 52} width={58} height={14} rx={3} fill={`${sCol}20`} />
                        <text x={tx + 13} y={ty + 63} fill={sCol} fontSize="7.5" fontWeight="600">
                          ● {statusLabel[center.status]}
                        </text>
                        {center.focus.slice(0, 2).map((f, fi) => (
                          <g key={fi}>
                            <rect x={tx + 70 + fi * 68} y={ty + 52} width={64} height={14} rx={3} fill={`${center.color}18`} />
                            <text x={tx + 75 + fi * 68} y={ty + 63} fill={`${center.color}cc`} fontSize="7" fontWeight="500">{f}</text>
                          </g>
                        ))}
                        {center.url && (
                          <text x={tx + tw - 8} y={ty + th - 6} textAnchor="end" fill={center.color} fontSize="8" opacity="0.7">
                            ↗ Abrir sitio web
                          </text>
                        )}
                      </g>
                    );
                  })()}
                </g>
              );
            })}

            {/* Leyenda */}
            <g transform={`translate(${W - 135}, 18)`}>
              <rect x={-8} y={-8} width={134} height={62} rx={6}
                fill="rgba(5,5,16,0.8)" stroke="rgba(124,58,237,0.15)" strokeWidth="0.8" />
              {[{ col: '#34d399', label: 'Activo' }, { col: '#fbbf24', label: 'Planificado' }].map(({ col, label }, li) => (
                <g key={li} transform={`translate(0,${li * 22})`}>
                  <circle cx={6} cy={6} r={5} fill={col} opacity="0.8" />
                  <text x={16} y={10} fill="rgba(255,255,255,0.4)" fontSize="9">{label}</text>
                </g>
              ))}
              <text x={6} y={57} fill="rgba(255,255,255,0.18)" fontSize="7.5">Clic → sitio web del centro</text>
            </g>
          </svg>
          <style>{`@keyframes ripple-map{0%{transform:scale(1);opacity:0.4}100%{transform:scale(3.8);opacity:0}}`}</style>
        </div>
        <p className="text-center text-white/20 text-xs mt-3">
          Pasa el cursor sobre un marcador para ver detalles · Clic para abrir el sitio web oficial
        </p>
      </div>
    </div>
  );
}

// ── Filter Tabs ──
function FilterTabs({ active, onChange, options }: {
  active: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; color?: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`vesica-btn px-4 py-2 text-sm transition-all duration-300 cursor-pointer ${active === opt.value
              ? 'text-white glass-sacred'
              : 'text-white/30 hover:text-white/60'
            }`}
          style={active === opt.value && opt.color ? { borderColor: `${opt.color}30` } : {}}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════
   SECCIÓN PRINCIPAL: Terapia Psicodélica en España
   ═══════════════════════════════════════════════════════ */
export default function TherapySpainSection() {
  const { ref: heroRef, visible: heroVisible } = useReveal();
  const { ref: timelineTitle, visible: timelineTitleVis } = useReveal();
  const { ref: centersTitle, visible: centersTitleVis } = useReveal();
  const { ref: therapyTitle, visible: therapyTitleVis } = useReveal();
  const { ref: legalTitle, visible: legalTitleVis } = useReveal();
  const { ref: quotesTitle, visible: quotesTitleVis } = useReveal();

  const [timelineFilter, setTimelineFilter] = useState('all');

  const filteredTimeline = timelineFilter === 'all'
    ? timeline
    : timeline.filter(e => e.type === timelineFilter);

  return (
    <section id="terapia" className="relative py-32 px-6">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-flower-of-life opacity-10" />

      {/* Gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* ═══════ HERO DE SECCIÓN ═══════ */}
        <div ref={heroRef} className={`text-center mb-12 ${heroVisible ? 'animate-spiral' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 vesica-btn px-5 py-2 glass-sacred text-sm text-psyche-pink mb-6">
            <span className="w-2 h-2 rounded-full bg-psyche-pink animate-pulse" />
            Artículo Destacado
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
            <span className="gradient-text">Terapia Psicodélica</span>
            <br />
            <span className="text-white/90">en España:</span>{' '}
            <span className="gradient-text-warm">Estado Actual</span>
          </h2>
          <p className="text-white/50 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            España se posiciona como uno de los países líderes en la investigación con psicodélicos en Europa.
            Con ensayos clínicos activos, la aprobación de la esketamina y una comunidad científica vibrante,
            el país avanza hacia una nueva era en salud mental.
          </p>
        </div>

        {/* ═══════ ESTADÍSTICAS CLAVE ═══════ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {keyStats.map((stat, i) => (
            <StatItem key={i} stat={stat} index={i} />
          ))}
        </div>

        <MetatronDivider />

        {/* ═══════ ENFOQUES TERAPÉUTICOS ═══════ */}
        <div className="mt-20 mb-20">
          <div ref={therapyTitle} className={`text-center mb-12 ${therapyTitleVis ? 'animate-spiral' : 'opacity-0'}`}>
            <span className="text-sm uppercase tracking-[0.3em] text-psyche-cyan/60 block mb-4">
              Tratamientos
            </span>
            <h3 className="text-3xl md:text-4xl font-black gradient-text-cool mb-4">
              Sustancias en Investigación Terapéutica
            </h3>
            <p className="text-white/40 max-w-2xl mx-auto text-sm">
              Cinco sustancias psicodélicas están siendo investigadas o ya aprobadas para uso terapéutico en España.
              Pulsa en cada una para ver los detalles completos.
            </p>
          </div>

          <div className="space-y-4">
            {therapyApproaches.map((therapy, i) => (
              <TherapyCard key={i} therapy={therapy} index={i} />
            ))}
          </div>
        </div>

        <MetatronDivider />

        {/* ═══════ MAPA DE CENTROS ═══════ */}
        <div className="mt-20 mb-20">
          <div ref={centersTitle} className={`text-center mb-12 ${centersTitleVis ? 'animate-spiral' : 'opacity-0'}`}>
            <span className="text-sm uppercase tracking-[0.3em] text-psyche-violet/60 block mb-4">
              Dónde se investiga
            </span>
            <h3 className="text-3xl md:text-4xl font-black gradient-text mb-4">
              Centros de Investigación
            </h3>
            <p className="text-white/40 max-w-2xl mx-auto text-sm">
              Hospitales, universidades y centros de investigación que lideran la terapia psicodélica en España.
            </p>
          </div>

          {/* Mapa SVG */}
          <SpainMap centers={researchCenters} />

          {/* Grid de centros */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {researchCenters.map((center, i) => (
              <CenterCard key={i} center={center} index={i} />
            ))}
          </div>
        </div>

        <MetatronDivider />

        {/* ═══════ CRONOLOGÍA ═══════ */}
        <div className="mt-20 mb-20">
          <div ref={timelineTitle} className={`text-center mb-12 ${timelineTitleVis ? 'animate-spiral' : 'opacity-0'}`}>
            <span className="text-sm uppercase tracking-[0.3em] text-psyche-pink/60 block mb-4">
              Cronología
            </span>
            <h3 className="text-3xl md:text-4xl font-black gradient-text-warm mb-4">
              Historia del Movimiento en España
            </h3>
            <p className="text-white/40 max-w-2xl mx-auto text-sm">
              Desde los primeros pasos hasta los ensayos clínicos actuales: una década de avances.
            </p>
          </div>

          {/* Filtros */}
          <FilterTabs
            active={timelineFilter}
            onChange={setTimelineFilter}
            options={[
              { value: 'all', label: 'Todos' },
              { value: 'clinical', label: '🏥 Ensayos', color: '#f472b6' },
              { value: 'research', label: '🔬 Investigación', color: '#a78bfa' },
              { value: 'legal', label: '⚖️ Legal', color: '#fbbf24' },
              { value: 'milestone', label: '🌟 Hitos', color: '#22d3ee' },
              { value: 'social', label: '👥 Comunidad', color: '#f97316' },
            ]}
          />

          {/* Timeline */}
          <div className="relative">
            {/* Línea central — solo desktop */}
            <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-psyche-violet/20 to-transparent" />
            {/* Línea izquierda — solo mobile */}
            <div className="md:hidden absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-psyche-violet/20 to-transparent" />

            <div className="space-y-6 md:space-y-8">
              {filteredTimeline.map((event, i) => (
                <TimelineItem key={`${event.year}-${event.title}`} event={event} index={i} isLeft={i % 2 === 0} />
              ))}
            </div>
          </div>
        </div>

        <MetatronDivider />

        {/* ═══════ MARCO LEGAL ═══════ */}
        <div className="mt-20 mb-20">
          <div ref={legalTitle} className={`text-center mb-12 ${legalTitleVis ? 'animate-spiral' : 'opacity-0'}`}>
            <span className="text-sm uppercase tracking-[0.3em] text-amber-500/60 block mb-4">
              Regulación
            </span>
            <h3 className="text-3xl md:text-4xl font-black mb-4">
              <span className="gradient-text-warm">Marco Legal</span>{' '}
              <span className="text-white/90">en España</span>
            </h3>
            <p className="text-white/40 max-w-2xl mx-auto text-sm">
              El panorama legal de los psicodélicos terapéuticos en España es complejo y está en constante evolución.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {legalFramework.map((aspect, i) => (
              <LegalCard key={i} aspect={aspect} index={i} />
            ))}
          </div>

          {/* Nota AEMPS */}
          <div className="mt-8 glass-sacred rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <span className="text-2xl flex-shrink-0">🏛️</span>
              <div>
                <h4 className="text-base font-bold text-white mb-2">El papel de la AEMPS</h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  La Agencia Española de Medicamentos y Productos Sanitarios (AEMPS) es el organismo encargado de autorizar
                  los ensayos clínicos con psicodélicos en España. Cada estudio debe pasar por la aprobación de la AEMPS
                  y del Comité Ético de Investigación del centro. La AEMPS ha mostrado una postura progresista,
                  facilitando la investigación dentro de un marco regulatorio estricto. En 2025, participó activamente
                  en el debate parlamentario sobre terapia psicodélica, señal de que el regulador toma en serio este campo emergente.
                </p>
              </div>
            </div>
          </div>
        </div>

        <MetatronDivider />

        {/* ═══════ VOCES EXPERTAS ═══════ */}
        <div className="mt-20 mb-20">
          <div ref={quotesTitle} className={`text-center mb-12 ${quotesTitleVis ? 'animate-spiral' : 'opacity-0'}`}>
            <span className="text-sm uppercase tracking-[0.3em] text-psyche-violet/60 block mb-4">
              Testimonios
            </span>
            <h3 className="text-3xl md:text-4xl font-black gradient-text mb-4">
              Voces de la Investigación Española
            </h3>
            <p className="text-white/40 max-w-2xl mx-auto text-sm">
              Los profesionales que lideran la terapia psicodélica en España comparten su visión.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {expertQuotes.map((quote, i) => (
              <QuoteCard key={i} quote={quote} index={i} />
            ))}
          </div>
        </div>

        <MetatronDivider />

        {/* ═══════ LLAMADA A LA ACCIÓN ═══════ */}
        <div className="mt-20">
          <div className="glass-sacred rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-psyche-violet blur-[100px]" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-psyche-pink blur-[100px]" />
            </div>

            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-black mb-4">
                <span className="gradient-text">El Futuro es Ahora</span>
              </h3>
              <p className="text-white/50 max-w-2xl mx-auto mb-8 leading-relaxed">
                España está a la vanguardia de la revolución psicodélica en Europa. Si eres profesional de la salud mental,
                investigador, o paciente interesado en participar en ensayos clínicos, estos son tus recursos:
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <a
                  href="https://www.iceers.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vesica-btn px-6 py-3 gradient-psyche text-white font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-psyche-violet/20"
                >
                  ICEERS — Investigación
                </a>
                <a
                  href="https://energycontrol.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vesica-btn px-6 py-3 glass-sacred text-white/70 font-medium text-sm hover:scale-105 transition-transform"
                >
                  Energy Control — Testeo
                </a>
                <a
                  href="https://www.aemps.gob.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vesica-btn px-6 py-3 glass-sacred text-white/70 font-medium text-sm hover:scale-105 transition-transform"
                >
                  AEMPS — Regulador
                </a>
              </div>

              <div className="flex flex-wrap gap-6 justify-center text-xs text-white/20">
                <span>📧 Para participar en ensayos: contactar directamente con los hospitales listados</span>
              </div>

              <p className="mt-8 text-white/20 text-xs max-w-xl mx-auto">
                Este artículo tiene fines informativos y educativos. No constituye consejo médico.
                Consulta siempre con un profesional sanitario cualificado.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
