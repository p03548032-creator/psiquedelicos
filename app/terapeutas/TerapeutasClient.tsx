'use client';
import { useState, useMemo } from 'react';
import { useReveal } from '@/hooks/useReveal';

// Definimos la interfaz aquí o la importamos si tuviéramos un archivo types.ts
export interface Therapist {
    id: string;
    profile_id?: string;
    name: string;
    title: string;
    city: string;
    region: string;
    modality: string[];
    specialties: string[];
    substances: string[];
    description: string;
    price: string;
    url?: string;
    email?: string;
    color: string;
    verified: boolean;
    is_premium: boolean;
    created_at: string;
}

function TherapistCard({ t, index }: { t: Therapist; index: number }) {
    const { ref, visible } = useReveal(0.08);
    const [expanded, setExpanded] = useState(false);

    const modalityLabel: Record<string, string> = {
        presencial: '📍 Presencial',
        online: '💻 Online',
        ambas: '🌐 Ambas',
    };

    return (
        <div ref={ref} className={`${visible ? 'animate-spiral' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 0.08}s` }}>
            <div className="glass-sacred rounded-2xl overflow-hidden hover:scale-[1.01] transition-all duration-300 group">
                {/* Top color bar */}
                <div className="h-[2px] w-full opacity-50 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }} />

                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                <h2 className="text-base font-bold text-white leading-snug">{t.name}</h2>
                                {t.verified ? (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium">
                                        ✓ Verificado
                                    </span>
                                ) : (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400/70 font-medium">
                                        En revisión
                                    </span>
                                )}
                            </div>
                            <p className="text-white/35 text-xs">{t.title}</p>
                            <p className="text-white/25 text-xs mt-0.5">📍 {t.city}, {t.region}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            <span className="text-xs text-white/30">{t.price}</span>
                            <div className="flex flex-wrap gap-1 justify-end">
                                {t.modality.map(m => (
                                    <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30">
                                        {modalityLabel[m]}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {t.specialties.slice(0, 3).map((s, i) => (
                            <span key={i} className="text-[11px] px-2.5 py-1 rounded-full"
                                style={{ background: `${t.color}12`, color: `${t.color}cc` }}>
                                {s}
                            </span>
                        ))}
                    </div>

                    {/* Description preview */}
                    <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">
                        {t.description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {t.url && (
                            <a href={t.url} target="_blank" rel="noopener noreferrer"
                                className="vesica-btn px-4 py-2 text-xs text-white/60 hover:text-white transition-colors">
                                ↗ Visitar sitio web
                            </a>
                        )}
                        <button onClick={() => setExpanded(!expanded)}
                            className={`vesica-btn px-4 py-2 text-xs transition-all ${expanded
                                ? 'text-psyche-violet bg-psyche-violet/10 border-psyche-violet/20'
                                : 'text-white/30 hover:text-white/60'
                                }`}>
                            {expanded ? '▲ Menos' : '▼ Ver más'}
                        </button>
                    </div>
                </div>

                {/* Expanded */}
                <div className={`overflow-hidden transition-all duration-500 ${expanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-6 space-y-4">
                        <div className="metatron-divider" />
                        <p className="text-white/50 text-sm leading-relaxed">{t.description}</p>
                        <div>
                            <h4 className="text-xs uppercase tracking-widest text-white/20 mb-2">Sustancias / Áreas</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {t.substances.map((s, i) => (
                                    <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/40">{s}</span>
                                ))}
                            </div>
                        </div>
                        {t.email && (
                            <a href={`mailto:${t.email}`}
                                className="inline-flex items-center gap-2 text-xs text-psyche-violet/60 hover:text-psyche-violet transition">
                                ✉ {t.email}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function TerapeutasClient({ initialTherapists }: { initialTherapists: Therapist[] }) {
    const [cityFilter, setCityFilter] = useState('all');
    const [substanceFilter, setSubstanceFilter] = useState('all');

    const filtered = initialTherapists.filter(t => {
        const cityOk = cityFilter === 'all' || t.city.toLowerCase().includes(cityFilter.toLowerCase()) || (cityFilter === 'Online' && t.modality.includes('online'));
        const subOk = substanceFilter === 'all' || t.substances.some(s => s.toLowerCase().includes(substanceFilter.toLowerCase()));
        return cityOk && subOk;
    });

    // Compute unique filters from current database results
    const dynamicCities = useMemo(() => Array.from(new Set(initialTherapists.map(t => t.city))).sort(), [initialTherapists]);
    // Extract unique substances, flatten the arrays, make a Set
    const dynamicSubstances = useMemo(() => {
        const allSubs = initialTherapists.flatMap(t => t.substances);
        return Array.from(new Set(allSubs)).sort();
    }, [initialTherapists]);

    return (
        <main className="min-h-screen pt-28">
            <div className="max-w-5xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 vesica-btn px-5 py-2 glass-sacred text-sm text-psyche-pink mb-6">
                        <span className="w-2 h-2 rounded-full bg-psyche-pink animate-pulse" />
                        Directorio verificado
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                        <span className="gradient-text-warm">Terapeutas y Centros</span>
                        <br /><span className="text-white/80">Especializados en España</span>
                    </h1>
                    <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
                        Centros y profesionales que trabajan con integración psicodélica, reducción de daños y psicoterapia asistida.
                        Directorio en construcción — contacta con nosotros para añadir tu centro.
                    </p>
                </div>

                {/* Filtros */}
                <div className="flex flex-wrap gap-3 mb-10 justify-center">
                    <div className="glass-sacred rounded-xl px-1 py-1 flex gap-1 flex-wrap justify-center max-w-2xl">
                        <span className="px-3 py-1.5 text-xs text-white/30 self-center">Ciudad:</span>
                        {['all', 'Online', ...dynamicCities].map(c => (
                            <button key={c} onClick={() => setCityFilter(c)}
                                className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${cityFilter === c ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'
                                    }`}>
                                {c === 'all' ? 'Todas' : c}
                            </button>
                        ))}
                    </div>
                    <div className="glass-sacred rounded-xl px-1 py-1 flex gap-1 flex-wrap justify-center max-w-2xl">
                        <span className="px-3 py-1.5 text-xs text-white/30 self-center">Sustancia:</span>
                        {['all', ...dynamicSubstances].map(s => (
                            <button key={s} onClick={() => setSubstanceFilter(s)}
                                className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${substanceFilter === s ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'
                                    }`}>
                                {s === 'all' ? 'Todas' : s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results count */}
                <p className="text-center text-white/20 text-xs mb-8">
                    {filtered.length} centro{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
                    {' '}· El directorio crece cada mes
                </p>

                {/* Cards */}
                <div className="space-y-4 mb-16">
                    {filtered.map((t, i) => <TherapistCard key={t.id} t={t} index={i} />)}
                </div>

                {/* CTA — añadir centro */}
                <div className="glass-sacred rounded-3xl p-8 md:p-12 text-center mb-20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 left-1/3 w-64 h-64 rounded-full bg-psyche-violet blur-[80px]" />
                        <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-psyche-pink blur-[80px]" />
                    </div>
                    <div className="relative">
                        <span className="text-4xl mb-4 block">🏥</span>
                        <h2 className="text-xl font-black text-white mb-3">¿Eres terapeuta o diriges un centro?</h2>
                        <p className="text-white/40 text-sm max-w-lg mx-auto mb-6">
                            El directorio es gratuito para el listado básico. Verificamos cada perfil antes de publicarlo
                            para garantizar la calidad de la información.
                        </p>
                        <a href="mailto:hola@portalpsy.es"
                            className="vesica-btn px-6 py-3 gradient-psyche text-white font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-psyche-violet/20 inline-flex items-center gap-2">
                            ✉ Solicitar inclusión en el directorio
                        </a>
                        <p className="text-white/20 text-xs mt-4">Respondemos en 48h · Listado básico gratuito · Premium desde 15€/mes</p>
                    </div>
                </div>

            </div>
        </main>
    );
}
