'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function QuickAccessDock() {
    const [show, setShow] = useState(true);
    const [hasAudio, setHasAudio] = useState(false);

    useEffect(() => {
        const handler = () => setHasAudio(true);
        window.addEventListener('audio-started', handler as EventListener);
        return () => window.removeEventListener('audio-started', handler as EventListener);
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-40">
            <div className="flex flex-col items-end gap-3">
                <div className="flex flex-col gap-2">
                    {show && hasAudio && (
                        <Link href="/musica"
                            className="flex items-center gap-2 px-4 py-2 rounded-full glass-sacred text-xs text-psyche-violet/70 hover:text-psyche-violet border border-psyche-violet/20 transition-colors"
                            title="Ir a la Sala de Música"
                        >
                            🎵 Música
                        </Link>
                    )}
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
                        className="w-11 h-11 rounded-full glass-sacred flex items-center justify-center text-white/70 hover:text-white transition cursor-pointer"
                        title="Buscar (⌘K)"
                        aria-label="Abrir buscador"
                    >
                        🔍
                    </button>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-11 h-11 rounded-full glass-sacred flex items-center justify-center text-white/70 hover:text-white transition cursor-pointer"
                        title="Subir arriba"
                        aria-label="Subir arriba"
                    >
                        ⬆️
                    </button>
                    <button
                        onClick={() => setShow(s => !s)}
                        className="w-11 h-11 rounded-full glass-sacred flex items-center justify-center text-white/40 hover:text-white transition cursor-pointer"
                        title={show ? 'Ocultar dock' : 'Mostrar dock'}
                        aria-label={show ? 'Ocultar dock' : 'Mostrar dock'}
                    >
                        {show ? '✕' : '☰'}
                    </button>
                </div>
            </div>
        </div>
    );
}
