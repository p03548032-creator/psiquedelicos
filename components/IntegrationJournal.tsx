'use client';

import { useState, useRef } from 'react';
import { BookOpen, Send, RotateCcw, CheckCircle } from 'lucide-react';

const prompts = [
    { label: '¿Qué he sentido?', placeholder: 'Describe las emociones, sensaciones o imágenes que surgieron durante la experiencia...', key: 'feelings' },
    { label: '¿Qué quiero recordar?', placeholder: 'Anota los insights, descubrimientos o momentos clave que no quieres olvidar...', key: 'insights' },
    { label: '¿Qué quiero integrar?', placeholder: '¿Qué cambio o intención nueva surge de esta experiencia para tu vida cotidiana?...', key: 'intention' },
];

export default function IntegrationJournal() {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [saved, setSaved] = useState(false);
    const [savedContent, setSavedContent] = useState<string[]>([]);
    const textareasRef = useRef<Record<string, HTMLTextAreaElement | null>>({});

    const handleSave = () => {
        const entries = prompts.map(p => answers[p.key] || '');
        if (entries.some(e => e.trim())) {
            setSavedContent(entries);
            setSaved(true);
        }
    };

    const handleReset = () => {
        setAnswers({});
        setSaved(false);
        setSavedContent([]);
    };

    if (saved) {
        return (
            <div className="glass-sacred rounded-3xl p-8 border border-psyche-violet/20 text-center">
                <CheckCircle size={40} className="text-psyche-violet mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-white mb-2">Entrada guardada</h3>
                <p className="text-white/40 text-sm mb-6 max-w-sm mx-auto">
                    Lo que escribes aquí es solo para ti. Tu privacidad está protegida.
                </p>
                <div className="space-y-3 text-left mb-6">
                    {prompts.map((p, i) => savedContent[i] && (
                        <div key={p.key} className="p-4 rounded-xl bg-white/5 border border-white/5">
                            <p className="text-psyche-violet/80 text-xs font-medium mb-1">{p.label}</p>
                            <p className="text-white/60 text-sm leading-relaxed">{savedContent[i]}</p>
                        </div>
                    ))}
                </div>
                <button onClick={handleReset}
                    className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors cursor-pointer">
                    <RotateCcw size={14} /> Nueva entrada
                </button>
            </div>
        );
    }

    return (
        <div className="glass-sacred rounded-3xl p-8 border border-psyche-violet/20">
            <div className="flex items-center gap-3 mb-6">
                <BookOpen size={20} className="text-psyche-violet" strokeWidth={1.5} />
                <div>
                    <h3 className="text-lg font-bold text-white">Diario de Integración</h3>
                    <p className="text-white/30 text-xs">Solo tú puedes ver esto. Privacidad total.</p>
                </div>
            </div>

            <div className="space-y-5 mb-6">
                {prompts.map((prompt) => (
                    <div key={prompt.key}>
                        <label className="block text-white/50 text-sm font-medium mb-2">
                            {prompt.label}
                        </label>
                        <textarea
                            ref={(el) => { textareasRef.current[prompt.key] = el; }}
                            value={answers[prompt.key] || ''}
                            onChange={(e) => setAnswers(prev => ({ ...prev, [prompt.key]: e.target.value }))}
                            placeholder={prompt.placeholder}
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white/70 text-sm leading-relaxed placeholder:text-white/20 focus:outline-none focus:border-psyche-violet/40 focus:bg-white/[0.07] transition-all resize-none"
                        />
                    </div>
                ))}
            </div>

            <button onClick={handleSave}
                className="w-full inline-flex items-center justify-center gap-2 vesica-btn py-3 text-sm font-semibold text-psyche-violet hover:bg-psyche-violet/20 hover:text-white transition-all cursor-pointer">
                <Send size={14} /> Guardar entrada
            </button>
        </div>
    );
}
