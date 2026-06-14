'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MetatronDivider } from '@/components/SacredGeometry';
import TripTimer from '@/components/TripTimer';
import IntegrationJournal from '@/components/IntegrationJournal';
import {
    Calculator, AlertCircle, Clock, Sparkles, Heart,
    BookOpen, Music, CheckCircle2, ArrowRight,
    Shield, Users, Home, Sun, Moon, Wind
} from 'lucide-react';

const preTripChecklist = [
    { icon: Sun, text: 'He establecido una intención clara para este viaje' },
    { icon: Users, text: 'Estoy acompañado/a por alguien de confianza o hay un tripsitter' },
    { icon: Home, text: 'Mi entorno es seguro, cómodo y no seré interrumpido/a' },
    { icon: Shield, text: 'Conozco la sustancia, la dosis y la pureza de lo que consumo' },
    { icon: AlertCircle, text: 'No mezclo con sustancias incompatibles ni tomo medicación que interactúe' },
    { icon: Moon, text: 'Dispongo de tiempo suficiente (no tengo obligaciones en las próximas horas)' },
];

const musicLinks = [
    { name: 'Spotify — Psychedelic Healing', url: 'https://open.spotify.com/search/psychedelic%20ambient%20meditation', desc: 'Música ambiente para viajes' },
    { name: 'YouTube — Entheos Radio', url: 'https://www.youtube.com/watch?v=bcDxV97cHvE', desc: 'Transmissions en vivo para integración' },
    { name: 'YouTube — Psychedelic Trance', url: 'https://www.youtube.com/watch?v=UoDXGnLD0E4', desc: 'Música para el pico' },
];

export default function SalaViajesHub() {
    const [showTimer, setShowTimer] = useState(false);
    const [showJournal, setShowJournal] = useState(false);

    return (
        <main className="min-h-screen pt-28 pb-20 relative overflow-hidden">
            {showTimer && <TripTimer onClose={() => setShowTimer(false)} onGoToJournal={() => {
                setShowTimer(false);
                setTimeout(() => document.getElementById('integracion')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }} />}

            <title>Sala de Viajes — PortalPSY</title>
            <meta name="description" content="Herramientas para cada fase del viaje psicodélico: preparación, durante y integración." />

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-psyche-cyan/10 blur-[150px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-psyche-violet/10 blur-[150px] rounded-full mix-blend-screen" />
            </div>

            {/* Floating Grounding Button */}
            <button
                onClick={() => setShowTimer(true)}
                className="fixed bottom-8 right-8 z-40 flex items-center gap-2 px-5 py-3 rounded-full glass-sacred border border-red-500/30 bg-red-500/10 text-red-400/80 hover:bg-red-500/20 hover:text-red-400 shadow-lg shadow-red-500/10 transition-all cursor-pointer"
                aria-label="Abrir monitor de viaje y técnicas de calma"
            >
                <Heart size={18} className="animate-pulse" />
                <span className="text-sm font-semibold hidden sm:inline">Necesito calma</span>
            </button>

            <div className="max-w-5xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 mb-6">
                        <Sparkles size={14} className="text-psyche-cyan" />
                        Acceso Abierto
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        Sala de <span className="gradient-text-cool">Viajes</span>
                    </h1>
                    <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
                        Un mapa para cada fase de tu experiencia. De la preparación a la integración, tienes herramientas gratuitas a tu disposición.
                    </p>
                </div>

                {/* Phase 1: Preparación */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-psyche-cyan/20 flex items-center justify-center">
                            <Sun size={16} className="text-psyche-cyan" strokeWidth={2} />
                        </div>
                        <h2 className="text-xl font-black text-white">Preparación</h2>
                        <span className="text-white/20 text-xs ml-auto">Antes del viaje</span>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {/* Calculadora */}
                        <div className="group glass-sacred rounded-2xl p-6 hover:scale-[1.02] transition-transform border border-white/5 hover:border-psyche-violet/30 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-psyche-violet/0 to-psyche-violet/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                                    <Calculator className="text-psyche-violet" size={20} />
                                </div>
                                <h3 className="text-base font-bold text-white mb-2">Calculadora de Dosis</h3>
                                <p className="text-white/40 text-xs leading-relaxed mb-4">
                                    Estima la dosis según peso corporal e intensidad deseada.
                                </p>
                                <Link href="/herramientas/calculadora-dosis"
                                    className="inline-flex items-center gap-1.5 text-psyche-violet/80 hover:text-white text-xs font-medium transition-colors">
                                    Abrir <ArrowRight size={12} />
                                </Link>
                            </div>
                        </div>

                        {/* Combo Checker */}
                        <div className="group glass-sacred rounded-2xl p-6 hover:scale-[1.02] transition-transform border border-white/5 hover:border-psyche-cyan/30 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-psyche-cyan/0 to-psyche-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                                    <AlertCircle className="text-psyche-cyan" size={20} />
                                </div>
                                <h3 className="text-base font-bold text-white mb-2">Combo Checker</h3>
                                <p className="text-white/40 text-xs leading-relaxed mb-4">
                                    Verifica combinaciones de sustancias y riesgos.
                                </p>
                                <Link href="/herramientas/interacciones"
                                    className="inline-flex items-center gap-1.5 text-psyche-cyan/80 hover:text-white text-xs font-medium transition-colors">
                                    Comprobar <ArrowRight size={12} />
                                </Link>
                            </div>
                        </div>

                        {/* Checklist */}
                        <div className="glass-sacred rounded-2xl p-6 border border-white/5">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                                <Shield className="text-amber-400" size={20} />
                            </div>
                            <h3 className="text-base font-bold text-white mb-3">Checklist de Seguridad</h3>
                            <ul className="space-y-2.5">
                                {preTripChecklist.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <CheckCircle2 size={14} className="text-amber-400/60 mt-0.5 flex-shrink-0" />
                                        <span className="text-white/40 text-xs leading-relaxed">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <MetatronDivider />

                {/* Phase 2: Durante */}
                <section className="my-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                            <Wind size={16} className="text-pink-400" strokeWidth={2} />
                        </div>
                        <h2 className="text-xl font-black text-white">Durante el Viaje</h2>
                        <span className="text-white/20 text-xs ml-auto">Monitor en tiempo real</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Monitor de Viaje */}
                        <div className="group glass-sacred rounded-3xl p-8 hover:scale-[1.02] transition-transform border border-white/5 hover:border-pink-500/30 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                                    <Clock className="text-pink-400" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Monitor de Viaje</h3>
                                <p className="text-white/40 text-sm leading-relaxed mb-6">
                                    Temporizador en vivo con fases psicodélicas y técnicas de relajación para momentos difíciles.
                                </p>
                                <button onClick={() => setShowTimer(true)}
                                    className="inline-flex items-center gap-2 vesica-btn bg-white/5 py-3 px-5 text-sm font-semibold text-pink-400 hover:bg-pink-500/20 hover:text-white transition-all cursor-pointer">
                                    Iniciar Monitor <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Música */}
                        <div className="group glass-sacred rounded-3xl p-8 hover:scale-[1.02] transition-transform border border-white/5 hover:border-psyche-cyan/30 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-psyche-cyan/0 to-psyche-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                                    <Music size={24} className="text-psyche-cyan" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Música para el Viaje</h3>
                                <p className="text-white/40 text-sm leading-relaxed mb-6">
                                    Generador de audio por fases del viaje. Mezcla capas de sonido, elige preset y activa timer. Sin interrupciones.
                                </p>
                                <Link href="/musica"
                                    className="inline-flex items-center gap-2 vesica-btn bg-white/5 py-3 px-5 text-sm font-semibold text-psyche-cyan hover:bg-psyche-cyan/20 hover:text-white transition-all cursor-pointer">
                                    Abrir Sala de Música <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <MetatronDivider />

                {/* Phase 3: Integración */}
                <section id="integracion" className="my-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-psyche-violet/20 flex items-center justify-center">
                            <Moon size={16} className="text-psyche-violet" strokeWidth={2} />
                        </div>
                        <h2 className="text-xl font-black text-white">Integración</h2>
                        <span className="text-white/20 text-xs ml-auto">Después del viaje</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <IntegrationJournal />

                        {/* Recursos de integración */}
                        <div className="glass-sacred rounded-3xl p-8 border border-white/5">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                                <BookOpen size={24} className="text-psyche-violet" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Recursos de Integración</h3>
                            <p className="text-white/40 text-sm leading-relaxed mb-6">
                                Los insights sin integración se desvanecen. Estas herramientas te ayudan a llevarlos a tu vida.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    { label: 'Guía de Integración', href: '/articulo/integracion-psicodélicos', desc: 'Cómo transformar experiencias en cambios duraderos' },
                                    { label: 'Set & Setting', href: '/articulo/set-setting', desc: 'El marco que determina la calidad del viaje' },
                                    { label: 'Comunidad', href: '/comunidad', desc: 'Conecta con otras personas en proceso' },
                                ].map((item, i) => (
                                    <li key={i}>
                                        <Link href={item.href}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/[0.08] transition-colors group">
                                            <ArrowRight size={14} className="text-white/20 group-hover:text-psyche-violet/60 transition-colors" />
                                            <div>
                                                <p className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">{item.label}</p>
                                                <p className="text-white/25 text-xs">{item.desc}</p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Safety footer */}
                <div className="mt-16 p-6 rounded-2xl bg-red-500/5 border border-red-500/15 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <AlertCircle size={20} className="text-red-400/60 flex-shrink-0" />
                    <p className="text-white/40 text-sm leading-relaxed">
                        Si estás en crisis o necesitas ayuda urgente, llama al <strong className="text-white/60">112</strong>. Para información sobre sustancias, consulta a <a href="https://energycontrol.org" target="_blank" rel="noopener noreferrer" className="text-psyche-cyan/60 hover:text-psyche-cyan underline">Energy Control</a>.
                    </p>
                </div>

                <div className="mt-16 text-center">
                    <MetatronDivider />
                </div>
            </div>
        </main>
    );
}
