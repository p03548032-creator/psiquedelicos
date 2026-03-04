'use client';
import { useEffect, useState } from 'react';

export default function FocusModeToggle() {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const stored = window.localStorage.getItem('focus-mode');
        if (stored === 'true') { setActive(true); document.body.classList.add('focus-mode'); }
    }, []);

    useEffect(() => {
        window.localStorage.setItem('focus-mode', String(active));
        document.body.classList.toggle('focus-mode', active);
    }, [active]);

    return (
        <button
            onClick={() => setActive(prev => !prev)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition flex items-center gap-2 ${active ? 'bg-psyche-cyan/30 text-psyche-cyan border border-psyche-cyan/40' : 'bg-white/5 text-white/40 border border-white/10'}`}
        >
            <span className={`w-2 h-2 rounded-full ${active ? 'bg-psyche-cyan animate-pulse' : 'bg-white/30'}`} />
            Modo Focus
        </button>
    );
}
