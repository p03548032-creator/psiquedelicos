'use client';
import { useEffect, useState } from 'react';

export default function BackToTopFab() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const handler = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);
    if (!visible) return null;
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 z-40 w-10 h-10 rounded-full gradient-psyche text-white flex items-center justify-center shadow-lg shadow-psyche-violet/30 hover:scale-110 transition-transform"
            aria-label="Volver arriba"
        >↑</button>
    );
}
