import Link from 'next/link';
import { MetatronDivider } from '@/components/SacredGeometry';

export const metadata = {
    title: 'Herramientas de Precaución — PortalPSY',
    description: 'Calculadora de dosis para psicodélicos, comprobador de interacciones y reducción de daños.'
};

export default function HerramientasHub() {
    return (
        <main className="min-h-screen pt-28 pb-20">
            <div className="max-w-4xl mx-auto px-6">

                <div className="text-center mb-16">
                    <span className="text-5xl mb-4 block">🛠️</span>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        Herramientas <br />
                        <span className="gradient-text">Reducción de Daños</span>
                    </h1>
                    <p className="text-white/50 text-base max-w-xl mx-auto">
                        Inspiradas en los estándares internacionales de *TripSit* y *RollSafe*. Utiliza nuestras calculadoras interactivas para prevenir malos viajes y cuidar tu salud neurológica.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* Calculadora */}
                    <Link href="/herramientas/calculadora-dosis" className="group glass-sacred rounded-3xl p-8 hover:scale-[1.02] transition-transform border border-white/5 hover:border-psyche-violet/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-psyche-violet/0 to-psyche-violet/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-5xl mb-4 block">⚖️</span>
                        <h2 className="text-2xl font-bold text-white mb-2">Calculadora de Dosis</h2>
                        <p className="text-white/40 text-sm leading-relaxed mb-6">
                            Estima los gramos secos y trufas a consumir según la intensidad deseada (microdosis a dosis heroica) y evalúa si tus anti-depresivos amortiguarán el efecto de las Setas.
                        </p>
                        <span className="vesica-btn bg-white/5 px-4 py-2 text-xs font-semibold text-psyche-violet mix-blend-screen group-hover:bg-psyche-violet/20 transition-all">
                            Abrir calculadora →
                        </span>
                    </Link>

                    {/* Interacciones */}
                    <Link href="/herramientas/interacciones" className="group glass-sacred rounded-3xl p-8 hover:scale-[1.02] transition-transform border border-white/5 hover:border-psyche-cyan/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-psyche-cyan/0 to-psyche-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-5xl mb-4 block">🧬</span>
                        <h2 className="text-2xl font-bold text-white mb-2">Combo Checker</h2>
                        <p className="text-white/40 text-sm leading-relaxed mb-6">
                            Verifica de manera instantánea si tu combinación (MDMA, Alcohol, LSD, ISRSs, Ayahuasca...) produce sinergias sanas, corta el efecto, o presenta un Síndrome Fatal.
                        </p>
                        <span className="vesica-btn bg-white/5 px-4 py-2 text-xs font-semibold text-psyche-cyan mix-blend-screen group-hover:bg-psyche-cyan/20 transition-all">
                            Comprobar mezcla →
                        </span>
                    </Link>
                </div>

                <div className="mt-16 text-center">
                    <MetatronDivider />
                    <Link href="/" className="inline-block mt-8 text-white/20 hover:text-white/50 transition text-sm">
                        ← Volver a inicio
                    </Link>
                </div>
            </div>
        </main>
    )
}
