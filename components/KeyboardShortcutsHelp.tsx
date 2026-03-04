'use client';
import { useEffect, useState } from 'react';

const shortcuts = [
    { key: '⌘K', desc: 'Abrir búsqueda' },
    { key: 'Esc', desc: 'Cerrar overlays' },
    { key: '↑', desc: 'Subir arriba' },
];

export default function KeyboardShortcutsHelp() {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === '?' && !e.ctrlKey && !e.metaKey) setOpen(v => !v);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center" onClick={() => setOpen(false)}>
            <div className="glass-sacred rounded-2xl p-8 max-w-sm w-full mx-4" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-white/80 mb-4">⌨️ Atajos de teclado</h3>
                <div className="space-y-3">
                    {shortcuts.map(s => (
                        <div key={s.key} className="flex items-center justify-between">
                            <span className="text-sm text-white/50">{s.desc}</span>
                            <kbd className="px-2 py-1 rounded bg-white/10 text-xs text-white/60">{s.key}</kbd>
                        </div>
                    ))}
                </div>
                <button onClick={() => setOpen(false)} className="mt-6 text-xs text-white/30 hover:text-white/60">Cerrar</button>
            </div>
        </div>
    );
}
