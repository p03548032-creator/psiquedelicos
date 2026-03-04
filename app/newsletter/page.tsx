'use client';
import { useState } from 'react';
import Link from 'next/link';
import { MetatronDivider } from '@/components/SacredGeometry';

// Quitado el export de metadata dado que ahora es un 'use client' component.
// Podrás añadir la metadata en el `layout.tsx` si lo necesitas luego.

const benefits = [
    { emoji: '🔬', title: 'Análisis de ensayos clínicos', desc: 'Resumen mensual de los estudios más relevantes en España y Europa, explicados en lenguaje accesible.' },
    { emoji: '⚖️', title: 'Actualización regulatoria', desc: 'Te avisamos cuando cambia algo en la AEMPS, EMA o el Congreso que afecte a la terapia psicodélica.' },
    { emoji: '🗺️', title: 'Nuevos centros y terapeutas', desc: 'Cada mes añadimos nuevos centros verificados al directorio y te lo contamos primero.' },
    { emoji: '👩‍🔬', title: 'Entrevistas exclusivas', desc: 'Conversaciones con investigadores, terapeutas y activistas que lideran el campo en España.' },
];

const pastIssues = [
    { num: '01', date: 'Febrero 2026', title: 'El debut de la REMP y el estado del debate parlamentario', tag: 'Regulación' },
    { num: '02', date: 'Enero 2026', title: 'Hospital Sant Pau amplía el ensayo con psilocibina para adicciones', tag: 'Ensayos' },
    { num: '03', date: 'Diciembre 2025', title: 'El rechazo de la FDA al MDMA y qué significa para Europa', tag: 'Internacional' },
];

export default function NewsletterPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Simular petición a ConvertKit o API
        await new Promise(resolve => setTimeout(resolve, 800));

        setStatus('success');
    };

    return (
        <main className="min-h-screen pt-28">
            <div className="max-w-3xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="text-6xl mb-6">📬</div>
                    <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                        <span className="gradient-text">El Pulso</span>
                        <br />
                        <span className="text-white/80">de la Ciencia Psicodélica</span>
                    </h1>
                    <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto">
                        Una newsletter mensual para profesionales, investigadores y curiosos comprometidos
                        con el rigor científico. En español. Gratis.
                    </p>
                </div>

                {/* Formulario */}
                <div className="glass-sacred rounded-3xl p-8 md:p-10 mb-16 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-psyche-violet blur-[100px]" />
                        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-psyche-pink blur-[100px]" />
                    </div>
                    <div className="relative">
                        <h2 className="text-xl font-bold text-white text-center mb-2">Únete a más de 1.200 lectores</h2>
                        <p className="text-white/30 text-sm text-center mb-8">Sale el primer lunes de cada mes · Sin spam · Cancela cuando quieras</p>

                        {/* Estado de Éxito */}
                        {status === 'success' ? (
                            <div className="text-center p-8 glass-sacred rounded-2xl border-green-500/20 bg-green-500/10">
                                <span className="text-4xl mb-4 block">✨</span>
                                <h3 className="text-xl font-bold text-white mb-2">¡Gracias por unirte!</h3>
                                <p className="text-white/60 text-sm leading-relaxed mb-4">
                                    Tu suscripción ha sido confirmada. Como lo prometido es deuda, acabamos de enviarte a tu correo
                                    los <strong className="text-white/80">enlaces exclusivos de Spotify y YouTube</strong> con todas las playlists del portal.
                                </p>
                                <p className="text-white/30 text-xs">Revisa tu carpeta de spam u "Otros" por si acaso.</p>
                            </div>
                        ) : (
                            /* Sub Form */
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="text"
                                        name="first_name"
                                        placeholder="Tu nombre"
                                        required
                                        disabled={status === 'loading'}
                                        className="flex-1 glass-sacred rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-psyche-violet/40 border border-white/10 focus:border-1 transition disabled:opacity-50"
                                    />
                                    <input
                                        type="email"
                                        name="email_address"
                                        required
                                        disabled={status === 'loading'}
                                        placeholder="tu@email.com"
                                        className="flex-1 glass-sacred rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-psyche-violet/40 border border-white/10 transition disabled:opacity-50"
                                    />
                                </div>
                                <button type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full vesica-btn py-4 gradient-psyche text-white font-bold text-sm rounded-xl hover:scale-[1.02] transition-all shadow-lg shadow-psyche-violet/20 cursor-pointer disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2">
                                    {status === 'loading' ? (
                                        <>
                                            <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                                            Suscribiendo...
                                        </>
                                    ) : (
                                        '📬 Suscribirme y conseguir playlists'
                                    )}
                                </button>
                                <p className="text-white/15 text-xs text-center">
                                    Tus datos no se comparten con terceros. Puedes darte de baja en cualquier momento.
                                </p>
                            </form>
                        )}
                    </div>
                </div>

                <MetatronDivider />

                {/* Qué vas a recibir */}
                <div className="mt-16 mb-16">
                    <h2 className="text-2xl font-black text-center gradient-text mb-10">¿Qué recibirás cada mes?</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {benefits.map((b, i) => (
                            <div key={i} className="glass-sacred rounded-2xl p-6 hover:scale-[1.02] transition-all">
                                <span className="text-2xl mb-3 block">{b.emoji}</span>
                                <h3 className="text-sm font-bold text-white mb-2">{b.title}</h3>
                                <p className="text-white/40 text-xs leading-relaxed">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <MetatronDivider />

                {/* Últimos números */}
                <div className="mt-16 mb-20">
                    <h2 className="text-2xl font-black text-center text-white/80 mb-2">Números anteriores</h2>
                    <p className="text-white/25 text-sm text-center mb-10">Próximamente disponibles en Substack</p>
                    <div className="space-y-3">
                        {pastIssues.map((issue) => (
                            <div key={issue.num} className="glass-sacred rounded-xl p-5 flex items-center gap-4 hover:bg-white/[0.03] transition">
                                <span className="text-2xl font-black text-white/10 font-mono w-8 flex-shrink-0">#{issue.num}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white/70 text-sm font-medium leading-snug">{issue.title}</p>
                                    <p className="text-white/25 text-xs mt-0.5">{issue.date}</p>
                                </div>
                                <span className="vesica-btn px-2.5 py-1 text-[10px] text-white/30 flex-shrink-0">{issue.tag}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Volver */}
                <div className="text-center mb-20">
                    <Link href="/" className="text-white/20 text-sm hover:text-white/50 transition">← Volver al portal</Link>
                </div>
            </div>
        </main>
    );
}
