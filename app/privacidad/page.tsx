import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Política de Privacidad | PortalPSY',
    description: 'En PortalPSY valoramos y protegemos tu privacidad. Lee nuestra política sobre el tratamiento de datos.',
};

export default function PrivacidadPage() {
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
                        <span className="text-transparent bg-clip-text gradient-psyche">Privacidad</span>
                    </h1>

                    <div className="prose prose-invert prose-psyche max-w-none text-white/80 space-y-6">
                        <p className="text-sm text-white/40">Última actualización: Marzo 2026</p>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Principio Fundamental</h2>
                            <p>En PortalPSY el anonimato y la confidencialidad de nuestros usuarios es una prioridad absoluta dada la naturaleza de nuestros contenidos. Únicamente recopilamos los datos estrictamente necesarios para el funcionamiento técnico del portal y para la prestación de servicios explícitamente solicitados por el usuario (como la suscripción a nuestra newsletter).</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Datos Recopilados y Finalidad</h2>
                            <p>Recopilamos información de forma directa cuando nos la proporcionas voluntariamente:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2 text-white/70">
                                <li><strong>Newsletter:</strong> Cuando te suscribes a nuestra lista de correo, recopilamos tu dirección de correo electrónico y/o nombre con la única finalidad de enviarte las actualizaciones correspondientes. Esta información es gestionada de manera segura mediante proveedores como Resend y Supabase.</li>
                                <li><strong>Comunidad / Foro (Próximamente):</strong> Para registrarte como usuario, es posible que solicitemos un alias/nombre de usuario y una cuenta de correo, de cara a la recuperación de contraseñas.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Base Legitimadora del Tratamiento</h2>
                            <p>El tratamiento de tus datos personales se realiza bajo el consentimiento expreso e inequívoco del usuario al suscribirse o registrarse en nuestros servicios, cumpliendo con el Reglamento General de Protección de Datos (RGPD) de la Unión Europea y la Ley Orgánica 3/2018 (LOPDGDD).</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Conservación de Datos y Compartición a Terceros</h2>
                            <p>No venderemos, cederemos ni distribuiremos información personal a terceros bajo ningún concepto, salvo los proveedores de infraestructura tecnológica (Vercel, Supabase, Resend) que procesan los datos como "Encargados de Tratamiento" bajo estrictas políticas de confidencialidad e infraestructura encriptada, o en caso de que sea requerido por una orden judicial pautada mediante el correspondiente marco legal de investigación criminal grave.</p>
                            <p>Tus datos se conservarán mientras no solicites su supresión o hasta que PortalPSY cese la prestación del servicio para el que fueron recopilados.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Medidas de Seguridad</h2>
                            <p>PortalPSY implementa medidas de seguridad técnicas avanzadas para salvaguardar la integridad de los datos alojados. El sitio exige conexión a través del protocolo seguro HTTPS/SSL garantizando el cifrado de todas las comunicaciones entre cliente y servidor.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">6. Derechos del Usuario (ARCO)</h2>
                            <p>Como titular de los datos, puedes ejercer en cualquier momento tus derechos de Acceso, Rectificación, Cancelación y Oposición (así como Portabilidad y Limitación) contactando a: <strong>contacto@portalpsy.es</strong>.</p>
                            <p>En el caso concreto de la newsletter, todos los correos enviados incluyen un enlace directo de "Darse de baja" al final del documento.</p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
