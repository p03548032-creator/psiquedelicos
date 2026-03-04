const highlights = [
    { title: 'Directorio Clínico', description: 'Encuentra terapeutas, centros médicos y ensayos activos en territorio español.', badge: 'Verificado' },
    { title: 'Reducción de Daños', description: 'Guías de dosificación seguras, interacciones (Combo Checker) y buenas prácticas.', badge: 'Trip-Safe' },
    { title: 'Soporte e Integración', description: 'Frecuencias inmersivas de sonido y herramientas post-experiencia psicodélica.', badge: 'Bienestar' },
    { title: 'Comunidad Segura', description: 'Foro de debate libre de estigmas. Conecta con otros usuarios y comparte experiencias.', badge: 'Foro' },
];

export default function AuroraBanner() {
    return (
        <section className="relative overflow-hidden border-y border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.4),_transparent_55%),radial-gradient(circle_at_20%_20%,_rgba(6,182,212,0.35),_transparent_45%),radial-gradient(circle_at_80%_30%,_rgba(219,39,119,0.35),_transparent_50%)] opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            <div className="relative max-w-6xl mx-auto px-6 py-14">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
                    <div className="max-w-xl">
                        <p className="text-xs uppercase tracking-[0.4em] text-white/40">Portal de Referencia</p>
                        <h2 className="text-3xl md:text-4xl font-semibold text-white/90 mt-4">Herramientas gratuitas para un viaje seguro</h2>
                        <p className="text-white/50 mt-4">Integramos información científica contrastada, un directorio de profesionales en España y utilidades de bienestar. Todo pensado para acompañarte antes, durante y después de la experiencia psicodélica.</p>
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
