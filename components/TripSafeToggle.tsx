'use client';
import { useEffect, useState } from 'react';

interface TripSafeToggleProps {
    onToggle: (active: boolean) => void;
}

export default function TripSafeToggle({ onToggle }: TripSafeToggleProps) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const stored = window.localStorage.getItem('trip-safe');
        if (stored === 'true') { setActive(true); onToggle(true); }
    }, [onToggle]);

    useEffect(() => {
        window.localStorage.setItem('trip-safe', String(active));
        onToggle(active);
    }, [active, onToggle]);

    return (
        <button
            onClick={() => setActive(prev => !prev)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition flex items-center gap-2 ${active ? 'bg-psyche-teal/30 text-psyche-teal border border-psyche-teal/40' : 'bg-white/5 text-white/40 border border-white/10'}`}
        >
            <span className={`w-2 h-2 rounded-full ${active ? 'bg-psyche-teal animate-pulse' : 'bg-white/30'}`} />
            Modo Trip-Safe
        </button>
    );
}
