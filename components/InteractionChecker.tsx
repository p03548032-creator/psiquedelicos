'use client';

import { useState } from 'react';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

type RiskLevel = 'danger' | 'caution' | 'monitor' | 'safe' | 'unknown';

interface InteractionResult {
    level: RiskLevel;
    label: string;
    emoji: string;
    color: string;
    bg: string;
    description: string;
    mechanism?: string;
    recommendation: string;
}

// Base de datos de interacciones (basada en TripSit y guías clínicas de MAPS)
const interactions: Record<string, Record<string, InteractionResult>> = {
    psilocibina: {
        isrs: {
            level: 'caution',
            label: 'Efecto reducido',
            emoji: '🔵',
            color: '#3b82f6',
            bg: '#3b82f615',
            description: 'Los ISRS (Prozac, Sertralina, Escitalopram…) bloquean parcial o totalmente el efecto de la psilocibina. Muchos usuarios no sienten nada o sienten muy poco.',
            mechanism: 'Los ISRS regulan a la baja los receptores 5-HT2A, que son el sitio de acción principal de la psilocibina.',
            recommendation: 'No es peligroso, pero el efecto estará muy reducido. Espera al menos 2 semanas tras dejar el ISRS (con supervisión médica) antes de intentarlo.',
        },
        litio: {
            level: 'danger',
            label: '⚠️ PELIGRO CRÍTICO',
            emoji: '🔴',
            color: '#ef4444',
            bg: '#ef444415',
            description: 'La combinación de litio con psicodélicos ha provocado convulsiones y episodios maníacos graves documentados. Interacción extremadamente peligrosa.',
            mechanism: 'El mecanismo exacto no está claro, pero el litio tiene un índice terapéutico muy estrecho y los psicodélicos alteran su metabolismo.',
            recommendation: 'NUNCA combinar. Si tomas litio, no uses psicodélicos clásicos.',
        },
        maois: {
            level: 'danger',
            label: '⚠️ PELIGRO CRÍTICO',
            emoji: '🔴',
            color: '#ef4444',
            bg: '#ef444415',
            description: 'Los MAOIs (incluyendo las harminas de la ayahuasca) potencian masivamente la psilocibina. Puede resultar en experiencias abrumadoras y taquicardia peligrosa.',
            mechanism: 'Los MAOIs inhiben la degradación de la psilocina, multiplicando su concentración en sangre.',
            recommendation: 'Combinación de alto riesgo. Solo bajo supervisión clínica estricta, con ajuste drástico de dosis.',
        },
        cannabis: {
            level: 'monitor',
            label: 'Precaución',
            emoji: '🟡',
            color: '#f59e0b',
            bg: '#f59e0b15',
            description: 'El cannabis intensifica y prolonga los efectos de la psilocibina. Puede ser agradable o disparar ansiedad/paranoia, especialmente si ya hay inestabilidad emocional.',
            mechanism: 'Potenciación de efectos serotoninérgicos y cannabinoides. Aumento de la intensidad perceptual.',
            recommendation: 'Úsalo con mucha precaución y en dosis bajas. Mejor evitarlo en la subida. Si se toma, háganlo a mitad del descenso.',
        },
        alcohol: {
            level: 'monitor',
            label: 'No recomendado',
            emoji: '🟡',
            color: '#f59e0b',
            bg: '#f59e0b15',
            description: 'El alcohol puede embota el efecto y añade carga física al cuerpo (náuseas). Reduce la calidad de la experiencia significativamente.',
            recommendation: 'Evitar. Bebe solo agua o infusiones. Si bebes alcohol, espera al menos 4h antes de la experiencia.',
        },
        benzodiacepinas: {
            level: 'safe',
            label: 'Reduces efecto (Freno)',
            emoji: '🟢',
            color: '#10b981',
            bg: '#10b98115',
            description: 'Las benzodiacepinas (Diazepam, Lorazepam…) reducen o cortan la experiencia psicodélica. Se usan clínicamente para terminar un viaje que se ha vuelto difícil.',
            mechanism: 'Actúan sobre receptores GABA, produciendo sedación que contraresta la activación del sistema nervioso.',
            recommendation: 'Tener benzodiacepinas de bajo poder a mano es un recurso de seguridad. No combinar proactivamente.',
        },
    },
    lsd: {
        isrs: {
            level: 'caution',
            label: 'Efecto reducido',
            emoji: '🔵',
            color: '#3b82f6',
            bg: '#3b82f615',
            description: 'Similar a la psilocibina: los ISRS reducen notablemente la intensidad del LSD. Es una interacción farmacológica bien documentada.',
            mechanism: 'Downregulación de receptores 5-HT2A por los antidepresivos.',
            recommendation: 'No es peligroso, pero el efecto estará reducido. Espera 2 semanas tras dejar el ISRS con supervisión médica.',
        },
        litio: {
            level: 'danger',
            label: '⚠️ PELIGRO CRÍTICO',
            emoji: '🔴',
            color: '#ef4444',
            bg: '#ef444415',
            description: 'Casos documentados de convulsiones con LSD + litio. Considerada la combinación más peligrosa en psicodélicos.',
            mechanism: 'Litio + LSD ha provocado neurológica severa en casos clínicos. Mecanismo no completamente aclarado.',
            recommendation: 'NUNCA combinar bajo ninguna circunstancia.',
        },
        mdma: {
            level: 'monitor',
            label: 'Candyflip — Riesgo elevado',
            emoji: '🟡',
            color: '#f59e0b',
            bg: '#f59e0b15',
            description: 'El "Candy flip" (LSD+MDMA) es una de las combinaciones más intensas. La duración se dispara (16-18h). Riesgo de golpe de calor, cardiotóxico y síndrome serotoninérgico leve.',
            mechanism: 'Ambas sustancias aumentan serotonina. El MDMA también aumenta temperatura corporal. Hay riesgo de sobrecarga cardiaca.',
            recommendation: 'Si se usa, hidratar constantemente, no bailar en exceso, tomar el MDMA cuando el LSD ya esté en el pico. Solo para usuarios muy experimentados.',
        },
        cannabis: {
            level: 'monitor',
            label: 'Precaución',
            emoji: '🟡',
            color: '#f59e0b',
            bg: '#f59e0b15',
            description: 'El cannabis intensifica notablemente el LSD. A dosis altas de ambos, puede provocar disociación intensa y loops de pensamiento difíciles de manejar.',
            recommendation: 'Si se combina, usar Cannabis en dosis mínimas y solo en el descenso. Nunca en la subida.',
        },
    },
    mdma: {
        alcohol: {
            level: 'danger',
            label: '⚠️ PELIGRO',
            emoji: '🔴',
            color: '#ef4444',
            bg: '#ef444415',
            description: 'El MDMA ya deshidrata y el alcohol empeora esto. La combinación aumenta el riesgo de golpe de calor, fallo renal y sobrecarga cardíaca.',
            mechanism: 'Ambos son cardiotóxicos en cierta medida. El alcohol bloquea la ADH y aumenta la deshidratación ya de por sí presente con MDMA.',
            recommendation: 'Evitar completamente. Beber solo agua (250ml/hora si se baila) o isotónicos.',
        },
        isrs: {
            level: 'danger',
            label: '⚠️ Síndrome Serotoninérgico',
            emoji: '🔴',
            color: '#ef4444',
            bg: '#ef444415',
            description: 'Combinación muy peligrosa. Puede provocar síndrome serotoninérgico: fiebre alta, rigidez muscular, convulsiones y en casos severos, muerte.',
            mechanism: 'El MDMA provoca liberación masiva de serotonina. Los ISRS bloquean su recaptación. La acumulación puede ser letal.',
            recommendation: 'NUNCA combinar. Si tomas ISRS, no uses MDMA. El efecto también estará reducido (doble motivo para evitarlo).',
        },
        maois: {
            level: 'danger',
            label: '⚠️ LETAL',
            emoji: '🔴',
            color: '#ef4444',
            bg: '#ef444415',
            description: 'La combinación de MDMA con MAOIs ha provocado muertes documentadas. Es la interacción más peligrosa del MDMA.',
            mechanism: 'Los MAOIs bloquean la degradación de serotonina. La liberación masiva de MDMA lleva a toxicidad serotoninérgica grave.',
            recommendation: 'ABSOLUTAMENTE PROHIBIDO. Esta combinación puede ser fatal.',
        },
        cannabis: {
            level: 'monitor',
            label: 'Precaución',
            emoji: '🟡',
            color: '#f59e0b',
            bg: '#f59e0b15',
            description: 'El cannabis puede aumentar la ansiedad y la taquicardia. Muchos usuarios lo reportan como una mezcla desagradable.',
            recommendation: 'Si se usa, esperar al descenso del MDMA. Nunca en la subida. Muy pequeñas dosis.',
        },
    },
    ayahuasca: {
        isrs: {
            level: 'danger',
            label: '⚠️ Síndrome Serotoninérgico',
            emoji: '🔴',
            color: '#ef4444',
            bg: '#ef444415',
            description: 'Combinación potencialmente mortal. Los MAOIs de la ayahuasca (harmina/harmalina) bloquean la degradación de serotonina. Los ISRS aumentan serotonina. Resultado: toxicidad severa.',
            mechanism: 'Inhibición de MAO-A + bloqueo de recaptación = catastrófico acúmulo de serotonina.',
            recommendation: 'NUNCA combinar. Si tomas ISRS debes suspenderlos con supervisión médica varias semanas antes. Sigue la dieta de MAOI estrictamente.',
        },
        alcohol: {
            level: 'danger',
            label: '⚠️ PELIGRO',
            emoji: '🔴',
            color: '#ef4444',
            bg: '#ef444415',
            description: 'El alcohol interacciona negativamente con los MAOIs de la ayahuasca. Aumenta el riesgo de hipotensión severa y crisis hipertensivas.',
            recommendation: 'No beber alcohol las 24h antes ni durante la ceremonia.',
        },
        cannabis: {
            level: 'monitor',
            label: 'Precaución',
            emoji: '🟡',
            color: '#f59e0b',
            bg: '#f59e0b15',
            description: 'El cannabis intensifica la visión y puede aumentar el contenido emocional difícil de procesar. En ceremonias, los curanderos suelen prohibirlo.',
            recommendation: 'Evitar. Si se usa, solo en microdosis muchas horas después de la sesión.',
        },
    },
};

// Catálogo de sustancias disponibles
const substanceOptions = [
    { id: 'psilocibina', label: 'Psilocibina / Setas' },
    { id: 'lsd', label: 'LSD / Ácido' },
    { id: 'mdma', label: 'MDMA / Éxtasis' },
    { id: 'ayahuasca', label: 'Ayahuasca / DMT' },
];

const compoundOptions = [
    { id: 'isrs', label: 'ISRS/Antidepresivos (Prozac, Sertralina…)' },
    { id: 'litio', label: 'Litio (estabilizador del ánimo)' },
    { id: 'maois', label: 'MAOIs (Tranilcipromina, Fenelzina…)' },
    { id: 'benzodiacepinas', label: 'Benzodiacepinas (Valium, Lorazepam…)' },
    { id: 'cannabis', label: 'Cannabis' },
    { id: 'alcohol', label: 'Alcohol' },
    { id: 'mdma', label: 'MDMA' },
    { id: 'lsd', label: 'LSD' },
    { id: 'psilocibina', label: 'Psilocibina' },
];

const riskIcons: Record<RiskLevel, typeof AlertTriangle> = {
    danger: AlertTriangle,
    caution: AlertTriangle,
    monitor: Info,
    safe: CheckCircle,
    unknown: Info,
};

export default function InteractionChecker() {
    const [substance1, setSubstance1] = useState('');
    const [substance2, setSubstance2] = useState('');
    const [result, setResult] = useState<InteractionResult | null>(null);
    const [checked, setChecked] = useState(false);

    const check = () => {
        setChecked(true);
        const s1 = interactions[substance1];
        if (!s1) { setResult(null); return; }
        const res = s1[substance2];
        setResult(res || null);
    };

    const reset = () => {
        setSubstance1('');
        setSubstance2('');
        setResult(null);
        setChecked(false);
    };

    const RiskIcon = result ? riskIcons[result.level] : null;

    return (
        <div className="space-y-6">
            {/* Selección */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Sustancia principal</label>
                    <select
                        value={substance1}
                        onChange={e => { setSubstance1(e.target.value); setChecked(false); setResult(null); }}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-psyche-violet/50 cursor-pointer"
                    >
                        <option value="" className="bg-[#0a0a0a]">Seleccionar…</option>
                        {substanceOptions.map(s => (
                            <option key={s.id} value={s.id} className="bg-[#0a0a0a]">{s.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Combinado con</label>
                    <select
                        value={substance2}
                        onChange={e => { setSubstance2(e.target.value); setChecked(false); setResult(null); }}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-psyche-violet/50 cursor-pointer"
                    >
                        <option value="" className="bg-[#0a0a0a]">Seleccionar…</option>
                        {compoundOptions.filter(c => c.id !== substance1).map(s => (
                            <option key={s.id} value={s.id} className="bg-[#0a0a0a]">{s.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                onClick={check}
                disabled={!substance1 || !substance2}
                className="vesica-btn w-full py-3 font-bold text-white gradient-psyche disabled:opacity-30 transition-opacity cursor-pointer"
            >
                Comprobar interacción
            </button>

            {/* Resultado */}
            {checked && result && RiskIcon && (
                <div className="rounded-2xl p-6 border" style={{ background: result.bg, borderColor: result.color + '40' }}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <RiskIcon size={20} style={{ color: result.color }} />
                            <div>
                                <p className="text-sm font-black" style={{ color: result.color }}>{result.emoji} {result.label}</p>
                            </div>
                        </div>
                        <button onClick={reset} className="p-1 text-white/30 hover:text-white/60 cursor-pointer">
                            <X size={16} />
                        </button>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{result.description}</p>
                    {result.mechanism && (
                        <div className="p-3 rounded-xl bg-white/5 mb-4">
                            <p className="text-[11px] text-white/40 uppercase tracking-wider mb-1">Mecanismo</p>
                            <p className="text-white/60 text-xs leading-relaxed">{result.mechanism}</p>
                        </div>
                    )}
                    <div className="p-3 rounded-xl border" style={{ background: result.color + '10', borderColor: result.color + '30' }}>
                        <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: result.color }}>Recomendación</p>
                        <p className="text-white/80 text-xs leading-relaxed font-medium">{result.recommendation}</p>
                    </div>
                </div>
            )}

            {checked && !result && substance1 && substance2 && (
                <div className="rounded-2xl p-6 border border-white/10 bg-white/5 text-center">
                    <Info size={24} className="text-white/30 mx-auto mb-3" />
                    <p className="text-white/50 text-sm">No tenemos datos específicos sobre esta combinación.</p>
                    <p className="text-white/30 text-xs mt-2">Consulta con TripSit (tripsit.me) para más información.</p>
                </div>
            )}

            <p className="text-white/20 text-[10px] text-center leading-relaxed">
                Esta herramienta es informativa basada en datos de TripSit y guías clínicas. No sustituye consejo médico profesional.
            </p>
        </div>
    );
}
