import Link from 'next/link';
import { MetatronDivider } from '@/components/SacredGeometry';
import { Calculator, Orbit, Sparkles, AlertCircle, Headphones, ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Sala Libre — PortalPSY',
    description: 'Herramientas gratuitas para reducción de daños y bienestar psicodélico.'
};

export default function SalaLibreHub() {
    return (
        <main className="min-h-screen pt-28 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-psyche-cyan/10 blur-[150px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-psyche-violet/10 blur-[150px] rounded-full mix-blend-screen" />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">

                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 mb-6">
                        <Sparkles size={14} className="text-psyche-cyan" />
                        Acceso Abierto
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        Sala <span className="gradient-text-cool">Libre</span>
                    </h1>
                    <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
                        Herramientas esenciales de reducción de daños, cálculo de dosis y recursos de prueba para la comunidad.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    {/* Calculadora (Gratis Total) */}
                    <div className="group glass-sacred rounded-3xl p-8 hover:scale-[1.02] transition-transform border border-white/5 hover:border-psyche-violet/30 relative overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-psyche-violet/0 to-psyche-violet/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                            <Calculator className="text-psyche-violet" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">Calculadora de Dosis</h2>
                        <p className="text-white/40 text-sm leading-relaxed mb-8 flex-grow">
                            Estima los gramos secos a consumir según la intensidad deseada (microdosis a dosis heroica) y tu peso corporal. Una herramienta vital para no excederse en el primer viaje.
                        </p>
                        <Link href="/herramientas/calculadora-dosis" className="inline-flex items-center justify-center gap-2 vesica-btn bg-white/5 py-3 text-sm font-semibold text-psyche-violet hover:bg-psyche-violet/20 hover:text-white transition-all w-full mt-auto">
                            Abrir Calculadora <ArrowRight size={16} />
                        </Link>
                    </div>

                    {/* Combo Checker (Gratis Total) */}
                    <div className="group glass-sacred rounded-3xl p-8 hover:scale-[1.02] transition-transform border border-white/5 hover:border-psyche-cyan/30 relative overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-psyche-cyan/0 to-psyche-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                            <AlertCircle className="text-psyche-cyan" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">Combo Checker Básico</h2>
                        <p className="text-white/40 text-sm leading-relaxed mb-8 flex-grow">
                            Verifica de manera instantánea si tu combinación (MDMA, Alcohol, LSD, ISRSs...) produce sinergias sanas, corta el efecto, o presenta un riesgo fatal para tu salud.
                        </p>
                        <Link href="/herramientas/interacciones" className="inline-flex items-center justify-center gap-2 vesica-btn bg-white/5 py-3 text-sm font-semibold text-psyche-cyan hover:bg-psyche-cyan/20 hover:text-white transition-all w-full mt-auto">
                            Comprobar Mezcla <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

                {/* Banner Upsell a PRO */}
                <div className="glass-sacred rounded-3xl p-8 md:p-12 border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent relative overflow-hidden">
                    {/* Aura de fondo para el banner */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-500/20 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        <div className="w-20 h-20 rounded-full border border-amber-500/30 bg-amber-500/10 flex flex-shrink-0 items-center justify-center">
                            <Orbit className="text-amber-400" size={32} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                                ¿Quieres la experiencia <span className="text-amber-400">completa?</span>
                            </h3>
                            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
                                La Sala Libre es solo el principio. Si quieres tener acceso a nuestro <strong>Trip Timer</strong> interativo, el <strong>Diario de Integración</strong> cifrado, el <strong>Reproductor Nativo HD</strong> sin interrupciones y conectarte con nuestra <strong>IA especialista El Navegante</strong>, tienes que entrar en la Sala PRO.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
                                <Link href="/sala-pro" className="vesica-btn bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3 text-sm transition-all shadow-lg shadow-amber-500/20">
                                    ✦ Desbloquear Sala PRO
                                </Link>
                                <span className="text-white/30 text-xs font-mono">Solo 4,90€/mes. Cancela cuando quieras.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <MetatronDivider />
                </div>
            </div>
        </main>
    )
}
