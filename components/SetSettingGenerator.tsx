'use client';

import { useState } from 'react';
import { Map, Download, ChevronRight, Music, Shield, Sun, Moon, CheckSquare, ExternalLink } from 'lucide-react';

const substances = [
    { id: 'psilocibina', label: 'Psilocibina / Setas', color: '#7c3aed', prep: 45, peak: 90, total: '4-6h' },
    { id: 'lsd', label: 'LSD', color: '#3b82f6', prep: 60, peak: 180, total: '8-12h' },
    { id: 'mdma', label: 'MDMA', color: '#ec4899', prep: 45, peak: 90, total: '4-5h' },
    { id: 'ayahuasca', label: 'Ayahuasca', color: '#f59e0b', prep: 20, peak: 120, total: '4-6h' },
    { id: 'ketamina', label: 'Ketamina', color: '#8b5cf6', prep: 5, peak: 30, total: '1-2h' },
];

const intentions = [
    '🌱 Sanar heridas del pasado', '💡 Clarity mental y propósito',
    '❤️ Conexión emocional profunda', '🎨 Liberar creatividad',
    '🔮 Experiencia espiritual / trascendente', '😴 Ánsiedad o estrés',
    '🌀 Exploración sin agenda específica', '🤝 Fortalecer relaciones',
];

const environments = [
    { id: 'interior-solo', label: 'Interior — Solo', icon: Moon },
    { id: 'interior-acompanado', label: 'Interior — Acompañado', icon: Sun },
    { id: 'naturaleza', label: 'Naturaleza', icon: Sun },
    { id: 'ceremonia', label: 'Ceremonia guiada', icon: Sun },
];

interface Plan {
    substance: (typeof substances)[0];
    intention: string;
    environment: string;
    dosis: string;
    companions: string;
}

function generatePlan(form: Plan) {
    const s = form.substance;
    const isNature = form.environment === 'naturaleza';
    const isCeremony = form.environment === 'ceremonia';
    const isSolo = form.environment === 'interior-solo';

    return {
        set: {
            title: 'Preparación mental (Set)',
            items: [
                `Realiza entre 5 y 20 minutos de meditación consciente la mañana antes`,
                `Define y escribe tu intención en papel: "${form.intention}"`,
                `Evita el alcohol y el cannabis las 24h anteriores`,
                form.substance.id === 'ayahuasca' ? 'Sigue la dieta de MAOI estrictamente los 3 días anteriores' : `Ayuna 4-6h antes (sólidos). Puedes beber agua e infusiones`,
                `Revisa que tu estado emocional es estable. Pospón si atraviesas una crisis aguda`,
            ],
        },
        setting: {
            title: 'Preparación del entorno (Setting)',
            items: [
                isNature ? 'Elige un lugar en la naturaleza conocido, seguro y sin paso de extraños' : 'Limpia y organiza el espacio. Un entorno ordenado favorece una mente clara',
                isSolo ? 'Informa a alguien de confianza de lo que vas a hacer y cuándo checks' : 'Designa un "guardián" o sitter de confianza que no consuma',
                `Ten a mano: agua, infusiones, fruta dulce, manta, tapaoídos`,
                isCeremony ? 'Llega con antelación para conocer el espacio y al facilitador' : 'Pon el modo avión y deja el teléfono en otro cuarto',
                `Ten benzodiacepinas de bajo poder accesibles como recurso de seguridad`,
            ],
        },
        timeline: [
            { phase: 'Antes (T-30min)', color: '#10b981', text: 'Meditación breve + leer tu intención en voz alta' },
            { phase: `Inicio (T+0 → T+${s.prep}min)`, color: '#f59e0b', text: 'Música suave de preparación. Quédate sentado o tumbado. No fuerces nada.' },
            { phase: `Subida (T+${s.prep}min → T+${s.prep + 45}min)`, color: '#7c3aed', text: 'Respira profundo. Entrégate al proceso. Si hay incomodidad, recuerda: "Esto pasa."' },
            { phase: `Pico (T+${s.prep + 45}min → T+${s.prep + 45 + s.peak}min)`, color: '#db2777', text: 'Mantén la intención en mente. Playlist del pico activa. Posición cómoda.' },
            { phase: `Descenso (T+${s.prep + 45 + s.peak}min+)`, color: '#3b82f6', text: 'Música de integración. Hidratación. No tomes decisiones importantes aún.' },
            { phase: 'Post-viaje (horas después)', color: '#14b8a6', text: 'Escribe en tu diario. Agradece. Evita pantallas. Descansa.' },
        ],
        safety: [
            `Dosis estimada para ${form.dosis}: ${form.substance.id === 'psilocibina' ? (form.dosis === 'baja' ? '0.5–1g (seco)' : form.dosis === 'media' ? '1.5–2.5g (seco)' : '3–3.5g (seco)') : form.substance.id === 'lsd' ? (form.dosis === 'baja' ? '50–75µg' : form.dosis === 'media' ? '100–150µg' : '200µg+') : 'Consulta guías de reducción de daños para esta sustancia'}`,
            isSolo ? '⚠️ Evita bañarte, usar el coche o salir a la calle durante el pico' : 'El sitter no debe consumir. Su rol: mantener silencio y presencia, no dirigir',
            'Benzodiacepinas (Diazepam 5-10mg) cortan el efecto en ~30min si el viaje se complica',
            '¿Tomando medicación? Verifica las interacciones en el Comprobador de la Sala PRO',
        ],
        playlist: [
            { phase: 'Preparación', suggestion: 'Meditative Mind — 396 Hz Chakra Raíz', href: '/bienestar' },
            { phase: 'Inicio', suggestion: form.substance.id === 'ayahuasca' ? 'Ícaros Amazónicos — Maestro don Enrique' : 'Liquid Mind — Deep Journey Ambient', href: '/bienestar' },
            { phase: 'Pico', suggestion: form.intention.includes('espiritu') ? 'OM Mantra 963 Hz — Deep Space' : 'Shaman\'s Dream — Ceremonial Soundscape', href: '/bienestar' },
            { phase: 'Descenso', suggestion: 'Greenred Productions — Deep Healing Piano', href: '/bienestar' },
            { phase: 'Integración', suggestion: 'Tibetan Healing Bowls 432 Hz', href: '/bienestar' },
        ],
    };
}

export default function SetSettingGenerator() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState<Partial<Plan>>({});
    const [plan, setPlan] = useState<ReturnType<typeof generatePlan> | null>(null);
    const [activeTab, setActiveTab] = useState<'preparation' | 'timeline' | 'safety' | 'playlist'>('preparation');

    const canContinue = () => {
        if (step === 1) return !!form.substance;
        if (step === 2) return !!form.intention;
        if (step === 3) return !!form.environment && !!form.dosis;
        return false;
    };

    const handleGenerate = () => {
        const p = generatePlan(form as Plan);
        setPlan(p);
    };

    const printPlan = () => {
        window.print();
    };

    if (plan) {
        const tabs = [
            { id: 'preparation', label: '🌱 Preparación' },
            { id: 'timeline', label: '⏱️ Timeline' },
            { id: 'safety', label: '🛡️ Seguridad' },
            { id: 'playlist', label: '🎵 Música' },
        ] as const;

        return (
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-black text-lg flex items-center gap-2">
                        <Map size={18} className="text-amber-400" /> Tu Plan de Viaje
                    </h3>
                    <div className="flex gap-2">
                        <button onClick={() => { setPlan(null); setStep(1); setForm({}); }}
                            className="text-xs text-white/40 hover:text-white/70 cursor-pointer transition-colors px-3 py-1.5 rounded-lg bg-white/5">
                            Nuevo plan
                        </button>
                        <button onClick={printPlan}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 transition-all cursor-pointer">
                            <Download size={12} /> Imprimir / PDF
                        </button>
                    </div>
                </div>

                {/* Resumen */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-5">
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Tu plan</p>
                    <div className="flex flex-wrap gap-3">
                        <span className="text-sm text-white font-bold">{form.substance?.label}</span>
                        <span className="text-white/30">·</span>
                        <span className="text-sm text-white/70">{form.intention}</span>
                        <span className="text-white/30">·</span>
                        <span className="text-sm text-white/50">{form.dosis === 'baja' ? 'Dosis baja' : form.dosis === 'media' ? 'Dosis media' : 'Dosis alta'}</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-5 flex-wrap">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                            style={{
                                background: activeTab === tab.id ? '#f59e0b20' : 'rgba(255,255,255,0.03)',
                                color: activeTab === tab.id ? '#f59e0b' : 'rgba(255,255,255,0.4)',
                                border: activeTab === tab.id ? '1px solid #f59e0b40' : '1px solid transparent',
                            }}>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'preparation' && (
                    <div className="space-y-4">
                        {[plan.set, plan.setting].map((section) => (
                            <div key={section.title}>
                                <p className="text-xs text-white/40 uppercase tracking-wider mb-3">{section.title}</p>
                                <ul className="space-y-2">
                                    {section.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                            <CheckSquare size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                                            <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'timeline' && (
                    <div className="space-y-3">
                        {plan.timeline.map((t, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{ background: t.color }} />
                                    {i < plan.timeline.length - 1 && <div className="w-px flex-1 mt-1 opacity-20" style={{ background: t.color }} />}
                                </div>
                                <div className="pb-4 flex-1">
                                    <p className="text-xs font-bold mb-1" style={{ color: t.color }}>{t.phase}</p>
                                    <p className="text-white/60 text-sm leading-relaxed">{t.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'safety' && (
                    <div className="space-y-3">
                        {plan.safety.map((tip, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                <Shield size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-white/70 text-sm leading-relaxed">{tip}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'playlist' && (
                    <div className="space-y-3">
                        {plan.playlist.map((track, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                    <Music size={14} className="text-amber-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-white/30 uppercase tracking-wider">{track.phase}</p>
                                    <p className="text-white/80 text-sm font-medium">{track.suggestion}</p>
                                </div>
                                <a href={track.href} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all flex-shrink-0 border border-white/5">
                                    Ir a la Sala <ExternalLink size={10} />
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <Map size={18} className="text-amber-400" />
                <div>
                    <h3 className="text-white font-black text-lg">Generador Set & Setting</h3>
                    <p className="text-white/40 text-xs">Paso {step} de 3</p>
                </div>
                <div className="ml-auto flex gap-1">
                    {[1, 2, 3].map(s => (
                        <div key={s} className="w-8 h-1 rounded-full transition-all"
                            style={{ background: s <= step ? '#f59e0b' : 'rgba(255,255,255,0.1)' }} />
                    ))}
                </div>
            </div>

            {/* Paso 1: Sustancia */}
            {step === 1 && (
                <div>
                    <p className="text-white/60 text-sm mb-5">¿Con qué sustancia o práctica estás trabajando?</p>
                    <div className="grid grid-cols-1 gap-2">
                        {substances.map(s => (
                            <button key={s.id} onClick={() => setForm(f => ({ ...f, substance: s }))}
                                className="p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between"
                                style={{
                                    borderColor: form.substance?.id === s.id ? `${s.color}60` : 'rgba(255,255,255,0.06)',
                                    background: form.substance?.id === s.id ? `${s.color}12` : 'rgba(255,255,255,0.02)',
                                }}>
                                <span className="font-semibold text-sm text-white">{s.label}</span>
                                <span className="text-xs text-white/30">~{s.total}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Paso 2: Intención */}
            {step === 2 && (
                <div>
                    <p className="text-white/60 text-sm mb-5">¿Cuál es tu intención principal para este viaje?</p>
                    <div className="grid grid-cols-1 gap-2 mb-4">
                        {intentions.map(intent => (
                            <button key={intent} onClick={() => setForm(f => ({ ...f, intention: intent }))}
                                className="p-4 rounded-xl border text-left text-sm transition-all cursor-pointer"
                                style={{
                                    borderColor: form.intention === intent ? '#f59e0b60' : 'rgba(255,255,255,0.06)',
                                    background: form.intention === intent ? '#f59e0b12' : 'rgba(255,255,255,0.02)',
                                    color: form.intention === intent ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)',
                                }}>
                                {intent}
                            </button>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="O escribe tu propia intención…"
                        value={intentions.includes(form.intention || '') ? '' : form.intention || ''}
                        onChange={e => setForm(f => ({ ...f, intention: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-amber-500/40"
                    />
                </div>
            )}

            {/* Paso 3: Entorno y dosis */}
            {step === 3 && (
                <div className="space-y-5">
                    <div>
                        <p className="text-white/60 text-sm mb-3">¿Dónde y con quién?</p>
                        <div className="grid grid-cols-2 gap-2">
                            {environments.map(e => (
                                <button key={e.id} onClick={() => setForm(f => ({ ...f, environment: e.id }))}
                                    className="p-3 rounded-xl border text-sm text-center transition-all cursor-pointer"
                                    style={{
                                        borderColor: form.environment === e.id ? '#f59e0b60' : 'rgba(255,255,255,0.06)',
                                        background: form.environment === e.id ? '#f59e0b12' : 'rgba(255,255,255,0.02)',
                                        color: form.environment === e.id ? '#f59e0b' : 'rgba(255,255,255,0.5)',
                                    }}>
                                    {e.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-white/60 text-sm mb-3">Nivel de dosis planeado</p>
                        <div className="flex gap-2">
                            {[['baja', '🌱 Baja'], ['media', '🌿 Media'], ['alta', '🌳 Alta / Heroica']].map(([val, label]) => (
                                <button key={val} onClick={() => setForm(f => ({ ...f, dosis: val }))}
                                    className="flex-1 py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer"
                                    style={{
                                        borderColor: form.dosis === val ? '#f59e0b60' : 'rgba(255,255,255,0.06)',
                                        background: form.dosis === val ? '#f59e0b12' : 'rgba(255,255,255,0.02)',
                                        color: form.dosis === val ? '#f59e0b' : 'rgba(255,255,255,0.5)',
                                    }}>
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Botones de navegación */}
            <div className="flex gap-3 mt-8">
                {step > 1 && (
                    <button onClick={() => setStep(s => s - 1)}
                        className="px-5 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white text-sm transition-all cursor-pointer">
                        ← Atrás
                    </button>
                )}
                <button
                    onClick={() => step < 3 ? setStep(s => s + 1) : handleGenerate()}
                    disabled={!canContinue()}
                    className="flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-30 cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                    {step < 3 ? <>Siguiente <ChevronRight size={14} /></> : <>✦ Generar mi plan de viaje</>}
                </button>
            </div>
        </div>
    );
}
