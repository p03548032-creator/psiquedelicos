const highlights = [
    { title: 'Mapa Vivo 2026', description: 'Explora centros y ensayos activos en tiempo real. Integración con datos abiertos de AEMPS.', badge: 'Live' },
    { title: 'Modo Trip-Safe', description: 'UI suave, animaciones ralentizadas, lectura ampliada y guía de respiración.', badge: 'Accesibilidad' },
    { title: 'Audio Sinestésico', description: 'Solfeggio + binaurales + soundscapes generativos sincronizados.', badge: 'NeuroSound' },
    { title: 'Comunidad Real', description: 'Relatos, debates y votaciones con normas de cuidado colectivo. Comunidad real con Supabase.', badge: 'UGC' },
];

export default function AuroraBanner() {
    return (
        <section className="relative overflow-hidden border-y border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.4),_transparent_55%),radial-gradient(circle_at_20%_20%,_rgba(6,182,212,0.35),_transparent_45%),radial-gradient(circle_at_80%_30%,_rgba(219,39,119,0.35),_transparent_50%)] opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            <div className="relative max-w-6xl mx-auto px-6 py-14">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
                    <div className="max-w-xl">
                        <p className="text-xs uppercase tracking-[0.4em] text-white/40">Novedades 2026</p>
                        <h2 className="text-3xl md:text-4xl font-semibold text-white/90 mt-4">Mejoras sensoriales para la nueva era</h2>
                        <p className="text-white/50 mt-4">Integramos herramientas avanzadas de bienestar, sonido inmersivo y comunidad responsable. Todo pensado para el viaje psicodélico moderno.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {highlights.map(item => (
                            <div key={item.title} className="glass-sacred rounded-2xl p-4">
                                <div className="flex items-center justify-between text-xs text-white/40">
                                    <span>{item.badge}</span>
                                    <span className="text-psyche-violet">•</span>
                                </div>
                                <h3 className="text-white/80 font-semibold mt-2">{item.title}</h3>
                                <p className="text-white/40 text-xs mt-2">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
