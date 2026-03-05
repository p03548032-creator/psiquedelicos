import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Bienvenido al Plan PRO | PortalPSY',
    description: '¡Tu suscripción PRO está activa! Accede a todas las sesiones de viaje y herramientas avanzadas.',
};

export default function ProSuccessPage() {
    return (
        <main className="min-h-screen bg-psyche-bg text-white flex items-center justify-center px-6">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/15 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 text-center max-w-xl">
                {/* Icono animado */}
                <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', boxShadow: '0 0 60px rgba(245,158,11,0.4)' }}
                >
                    <Star size={40} fill="white" color="white" strokeWidth={0} />
                </div>

                <h1 className="text-4xl md:text-5xl font-black mb-4">
                    ¡Bienvenido al <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>PRO</span>!
                </h1>

                <p className="text-white/60 text-lg leading-relaxed mb-4">
                    Tu suscripción está activa. Ya tienes acceso a todas las sesiones de viaje, el Modo Sesión Guiada y las herramientas de audio avanzadas.
                </p>

                <p className="text-white/30 text-sm mb-10">
                    Recibirás un email de confirmación en breve. Puedes cancelar en cualquier momento desde la página de billing.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/bienestar"
                        className="vesica-btn inline-flex items-center gap-2 px-8 py-4 text-white font-bold text-sm hover:scale-105 transition-transform shadow-2xl"
                        style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', boxShadow: '0 8px 30px rgba(245,158,11,0.3)' }}
                    >
                        Ir a la Sala de Viaje <ArrowRight size={16} />
                    </Link>
                    <Link href="/" className="vesica-btn inline-flex items-center gap-2 px-6 py-4 glass-sacred text-sm text-white/60 hover:text-white transition-colors">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </main>
    );
}
