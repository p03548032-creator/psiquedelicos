'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { BookOpen, Plus, X, Calendar, ChevronDown, ChevronUp, Save, Trash2, Loader } from 'lucide-react';

interface DiaryEntry {
    id: string;
    created_at: string;
    substance: string;
    intention: string;
    what_i_felt: string;
    what_i_learned: string;
    action: string;
    mood: number; // 1-5
    tags: string[];
}

const substanceOptions = [
    'Psilocibina / Setas', 'LSD', 'MDMA', 'Ayahuasca / DMT', 'Ketamina',
    'Meditación profunda', 'Respiración holotrópica', 'Otro',
];

const guidedQuestions = [
    { field: 'intention', label: '¿Cuál era tu intención?', placeholder: 'Qué buscabas explorar, sanar o entender…' },
    { field: 'what_i_felt', label: '¿Qué viviste?', placeholder: 'Las imágenes, emociones, sensaciones más importantes…' },
    { field: 'what_i_learned', label: '¿Qué aprendiste?', placeholder: 'Los insights, mensajes o patrones que identificaste…' },
    { field: 'action', label: '¿Qué acción quieres tomar?', placeholder: 'Un cambio concreto en tu vida cotidiana…' },
];

const moodEmojis = ['', '😔', '😞', '😐', '😌', '✨'];
const moodLabels = ['', 'Muy difícil', 'Difícil', 'Neutral', 'Positivo', 'Muy positivo'];

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('es-ES', {
        day: 'numeric', month: 'long', year: 'numeric',
    });
}

interface IntegrationDiaryProps {
    userId: string;
}

export default function IntegrationDiary({ userId }: IntegrationDiaryProps) {
    const [view, setView] = useState<'list' | 'new'>('list');
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [loadingEntries, setLoadingEntries] = useState(true);
    const [saving, setSaving] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [form, setForm] = useState({
        substance: '',
        intention: '',
        what_i_felt: '',
        what_i_learned: '',
        action: '',
        mood: 3,
        tags: '',
    });

    const supabase = createClient();

    const loadEntries = async () => {
        setLoadingEntries(true);
        const { data } = await supabase
            .from('diary_entries')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        setEntries((data || []) as DiaryEntry[]);
        setLoadingEntries(false);
    };

    useEffect(() => {
        loadEntries();
    }, [userId]);

    const handleSave = async () => {
        if (!form.substance || !form.what_i_felt) return;
        setSaving(true);
        const entry = {
            user_id: userId,
            substance: form.substance,
            intention: form.intention,
            what_i_felt: form.what_i_felt,
            what_i_learned: form.what_i_learned,
            action: form.action,
            mood: form.mood,
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        };
        await supabase.from('diary_entries').insert(entry);
        setForm({ substance: '', intention: '', what_i_felt: '', what_i_learned: '', action: '', mood: 3, tags: '' });
        setSaving(false);
        setView('list');
        loadEntries();
    };

    const handleDelete = async (id: string) => {
        await supabase.from('diary_entries').delete().eq('id', id);
        setEntries(prev => prev.filter(e => e.id !== id));
    };

    return (
        <div>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-white font-black text-lg flex items-center gap-2">
                        <BookOpen size={18} className="text-emerald-400" /> Diario de Integración
                    </h3>
                    <p className="text-white/40 text-xs mt-0.5">{entries.length} entradas guardadas</p>
                </div>
                <button
                    onClick={() => setView(view === 'new' ? 'list' : 'new')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer"
                    style={{
                        background: view === 'new' ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #10b981, #059669)',
                        color: view === 'new' ? 'rgba(255,255,255,0.5)' : 'white',
                    }}
                >
                    {view === 'new' ? <><X size={14} /> Cancelar</> : <><Plus size={14} /> Nueva entrada</>}
                </button>
            </div>

            {/* FORMULARIO NUEVA ENTRADA */}
            {view === 'new' && (
                <div className="space-y-5">
                    {/* Sustancia */}
                    <div>
                        <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Experiencia con</label>
                        <div className="flex flex-wrap gap-2">
                            {substanceOptions.map(s => (
                                <button key={s} onClick={() => setForm(f => ({ ...f, substance: s }))}
                                    className="px-3 py-1.5 rounded-lg text-xs border transition-all cursor-pointer"
                                    style={{
                                        borderColor: form.substance === s ? '#10b98160' : 'rgba(255,255,255,0.08)',
                                        background: form.substance === s ? '#10b98115' : 'transparent',
                                        color: form.substance === s ? '#10b981' : 'rgba(255,255,255,0.5)',
                                    }}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Estado emocional */}
                    <div>
                        <label className="text-xs text-white/40 uppercase tracking-widest block mb-3">
                            ¿Cómo fue la experiencia? — {moodEmojis[form.mood]} {moodLabels[form.mood]}
                        </label>
                        <input type="range" min={1} max={5} value={form.mood}
                            onChange={e => setForm(f => ({ ...f, mood: Number(e.target.value) }))}
                            className="w-full accent-emerald-500 cursor-pointer" />
                        <div className="flex justify-between text-[10px] text-white/25 mt-1">
                            <span>Muy difícil</span><span>Muy positivo</span>
                        </div>
                    </div>

                    {/* Preguntas guiadas */}
                    {guidedQuestions.map(q => (
                        <div key={q.field}>
                            <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">{q.label}</label>
                            <textarea
                                rows={3}
                                placeholder={q.placeholder}
                                value={form[q.field as keyof typeof form] as string}
                                onChange={e => setForm(f => ({ ...f, [q.field]: e.target.value }))}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-emerald-500/40 resize-none transition-colors"
                            />
                        </div>
                    ))}

                    {/* Tags */}
                    <div>
                        <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Etiquetas (separadas por coma)</label>
                        <input
                            type="text"
                            placeholder="miedo, amor, infancia, rendición…"
                            value={form.tags}
                            onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-emerald-500/40 transition-colors"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving || !form.substance || !form.what_i_felt}
                        className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-40 cursor-pointer"
                        style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                        {saving ? <><Loader size={14} className="animate-spin" /> Guardando…</> : <><Save size={14} /> Guardar en el Diario</>}
                    </button>
                </div>
            )}

            {/* LISTA DE ENTRADAS */}
            {view === 'list' && (
                <div>
                    {loadingEntries && (
                        <div className="text-center py-12 text-white/20 text-sm">
                            <Loader size={20} className="animate-spin mx-auto mb-3" />
                            Cargando entradas…
                        </div>
                    )}
                    {!loadingEntries && entries.length === 0 && (
                        <div className="text-center py-16">
                            <BookOpen size={40} className="text-white/10 mx-auto mb-4" strokeWidth={1} />
                            <p className="text-white/30 text-sm mb-1">Tu diario está vacío</p>
                            <p className="text-white/20 text-xs">Registra tu primera experiencia de integración</p>
                        </div>
                    )}
                    <div className="space-y-3">
                        {entries.map(entry => (
                            <div key={entry.id} className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                                <button
                                    onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                                    className="w-full p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-white/[0.03] transition-colors">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className="text-2xl flex-shrink-0">{moodEmojis[entry.mood]}</span>
                                        <div className="min-w-0">
                                            <p className="text-white font-semibold text-sm truncate">{entry.substance}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <Calendar size={10} className="text-white/30" />
                                                <span className="text-white/30 text-xs">{formatDate(entry.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {entry.tags?.slice(0, 2).map(t => (
                                            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">{t}</span>
                                        ))}
                                        {expandedId === entry.id ? <ChevronUp size={14} className="text-white/30" /> : <ChevronDown size={14} className="text-white/30" />}
                                    </div>
                                </button>
                                {expandedId === entry.id && (
                                    <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4">
                                        {entry.intention && (
                                            <div>
                                                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Intención</p>
                                                <p className="text-white/70 text-sm leading-relaxed">{entry.intention}</p>
                                            </div>
                                        )}
                                        {entry.what_i_felt && (
                                            <div>
                                                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Lo que viví</p>
                                                <p className="text-white/70 text-sm leading-relaxed">{entry.what_i_felt}</p>
                                            </div>
                                        )}
                                        {entry.what_i_learned && (
                                            <div>
                                                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Lo que aprendí</p>
                                                <p className="text-white/70 text-sm leading-relaxed">{entry.what_i_learned}</p>
                                            </div>
                                        )}
                                        {entry.action && (
                                            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                                <p className="text-[10px] text-emerald-400 uppercase tracking-wider mb-1">Mi compromiso</p>
                                                <p className="text-white/80 text-sm">{entry.action}</p>
                                            </div>
                                        )}
                                        <button onClick={() => handleDelete(entry.id)}
                                            className="flex items-center gap-1.5 text-xs text-red-400/50 hover:text-red-400 transition-colors cursor-pointer">
                                            <Trash2 size={12} /> Eliminar entrada
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
