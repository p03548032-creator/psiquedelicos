'use client';
import { useState } from 'react';

export default function QuickAccessDock() {
    const [show, setShow] = useState(true);

    return (
        <div className="fixed bottom-6 right-6 z-40">
            <div className="flex flex-col items-end gap-3">
                {show && (
                    <div className="glass-sacred rounded-2xl px-4 py-2 text-[11px] text-white/40 shadow-lg">
                        Accesos rápidos
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
                        className="w-11 h-11 rounded-full glass-sacred flex items-center justify-center text-white/70 hover:text-white transition"
                        title="Buscar (⌘K)"
                    >🔍</button>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-11 h-11 rounded-full glass-sacred flex items-center justify-center text-white/70 hover:text-white transition"
                        title="Subir arriba"
                    >⬆️</button>
                    <button
                        onClick={() => setShow(!show)}
                        className="w-11 h-11 rounded-full glass-sacred flex items-center justify-center text-white/40 hover:text-white transition"
                        title="Ocultar dock"
                    >{show ? '✕' : '☰'}</button>
                </div>
            </div>
        </div>
    );
}
