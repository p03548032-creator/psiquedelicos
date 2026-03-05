import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Política de Cookies | PortalPSY',
    description: 'Información sobre cómo utilizamos las cookies para mejorar el rendimiento de nuestro portal.',
};

export default function CookiesPage() {
    return (
        <main className="min-h-screen bg-psyche-bg text-white relative flex flex-col pt-24 pb-20">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-psyche-violet/30 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-psyche-cyan/20 rounded-full blur-[150px] mix-blend-screen" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 w-full flex-1">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
                        <ArrowLeft size={16} /> Volver al Inicio
                    </Link>
                </div>

                <div className="glass-sacred p-8 md:p-12 rounded-2xl border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl bg-black/40">
                    <h1 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Política de </span>
                        <span className="text-transparent bg-clip-text gradient-psyche">Cookies</span>
                    </h1>

                    <div className="prose prose-invert prose-psyche max-w-none text-white/80 space-y-6">
                        <p className="text-sm text-white/40">Última actualización: Marzo 2026</p>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">¿Qué son las cookies?</h2>
                            <p>Una cookie es un fichero que se descarga en su dispositivo al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información técnica sobre los hábitos de navegación de un usuario o de su equipo y facilitar el rendimiento de determinadas funciones.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">¿Qué cookies utiliza PortalPSY?</h2>
                            <p>PortalPSY aboga por un ecosistema web limpio, privado y lo menos invasivo posible. Por tanto, nuestro uso de cookies está altamente restringido:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2 text-white/70">
                                <li><strong>Cookies Técnicas / Estrictamente Necesarias:</strong> Son aquellas que permiten al usuario la navegación a través de la página web y la utilización de las diferentes opciones o servicios que en ella existen (ej: sesión de autenticación con Supabase si inicias sesión, control de tráfico, identificar la sesión de componentes interactivos de las calculadoras). Estas no pueden desactivarse de manera genérica ya que comprometería la funcionalidad de la web.</li>
                                <li><strong>Cookies de Análisis Anónimo (Propias / Terceros):</strong> Utilizamos contadores estadísticos de privacidad prioritaria integrados en Edge Functions (sin rastreadores invasivos como Google Analytics convencional) meramente para saber las métricas de carga en nuestros servidores y secciones más visitadas a un nivel general, no identificativo.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">Consentimiento y Revocación</h2>
                            <p>Al utilizar esta web estás aceptando el uso mínimo y necesario para que el sitio funcione apropiadamente. Al no emplear cookies de perfilado publicitario invasivo ni remarketing a terceros ajenos a la web, el nivel de trazabilidad es nulo.</p>
                            <p>Pese a ello, cuentas en tus navegadores (Chrome, Firefox, Safari, Brave...) con recursos para desactivarlas. Puedes restringir, bloquear o borrar las cookies configurando las opciones pertinentes, aunque esto podría afectar al funcionamiento de los reproductores y calculadoras internamente desarrollados.</p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
