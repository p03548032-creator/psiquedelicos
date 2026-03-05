import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Aviso Legal | PortalPSY',
    description: 'Información legal y condiciones generales de uso de PortalPSY.',
};

export default function AvisoLegalPage() {
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
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Aviso </span>
                        <span className="text-transparent bg-clip-text gradient-psyche">Legal</span>
                    </h1>

                    <div className="prose prose-invert prose-psyche max-w-none text-white/80 space-y-6">
                        <p className="text-sm text-white/40">Última actualización: Marzo 2026</p>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Identidad del Titular</h2>
                            <p>En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), se reflejan los siguientes datos: el titular de dominio web es <strong>PortalPSY</strong> (en adelante, el Portal), con domicilio a estos efectos en España, correo electrónico de contacto: contacto@portalpsy.es.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Propósito del Portal</h2>
                            <p>PortalPSY es una plataforma informativa y de difusión cultural-científica centrada en el estudio, investigación y contexto terapéutico de las sustancias psicodélicas. <strong>En ningún caso PortalPSY promueve, incita, facilita ni fomenta el uso, consumo, venta o adquisición de sustancias ilícitas.</strong> Toda la información proporcionada está destinada exclusivamente a la reducción de daños y a la divulgación de conocimientos científicos e históricos.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Usuarios</h2>
                            <p>El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. Las citadas Condiciones serán de aplicación independientemente de las Condiciones Generales de Contratación que en su caso resulten de obligado cumplimiento. <strong>El portal está dirigido estrictamente a personas mayores de edad (18 años o la mayoría legal en la jurisdicción del usuario).</strong></p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Propiedad Intelectual e Industrial</h2>
                            <p>PortalPSY por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, etc.). Todos los derechos reservados.</p>
                            <p>La reproducción, distribución y comunicación pública de parte o la totalidad de los contenidos de esta página web, con fines comerciales o no, quedan sujetas a citar explícitamente a la fuente original y proveer un enlace hacia la misma.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Exclusión de Garantías y Responsabilidad</h2>
                            <p>PortalPSY no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, decisiones tomadas basadas en la información proporcionada (véase <Link href="/descargo-responsabilidad" className="text-psyche-violet hover:underline">Descargo de Responsabilidad</Link>), o la transmisión de virus o programas maliciosos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.</p>
                            <p>Los enlaces (links) e hipertexto que posibiliten, a través del sitio web, acceder a prestaciones y servicios ofrecidos por terceros, no pertenecen ni se encuentran bajo el control de PortalPSY; dicha entidad no se hace responsable ni de la información contenida en los mismos ni de cualesquiera efectos que pudieran derivarse de dicha información.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">6. Modificaciones de las Condiciones de Uso y Aviso Legal</h2>
                            <p>PortalPSY podrá modificar en cualquier momento las condiciones aquí determinadas, siendo debidamente publicadas como aquí aparecen. La vigencia de las citadas condiciones irá en función de su exposición y estarán vigentes hasta que sean modificadas por otras debidamente publicadas.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">7. Legislación Aplicable y Jurisdicción</h2>
                            <p>La relación entre PortalPSY y el USUARIO se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y tribunales de la ciudad que corresponda por ley aplicable al titular del sitio web.</p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
