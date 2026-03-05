import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Descargo de Responsabilidad | PortalPSY',
    description: 'Aviso importante sobre la limitación de la información referente a sustancias, dosis y terapias.',
};

export default function DescargoPage() {
    return (
        <main className="min-h-screen bg-psyche-bg text-white relative flex flex-col pt-24 pb-20">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-psyche-violet/20 rounded-full blur-[150px] mix-blend-screen" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 w-full flex-1">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
                        <ArrowLeft size={16} /> Volver al Inicio
                    </Link>
                </div>

                <div className="glass-sacred p-8 md:p-12 rounded-2xl border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl bg-black/40">

                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-red-500/20 rounded-xl text-red-400">
                            <AlertTriangle size={36} strokeWidth={2} />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
                            <span className="text-white">Descargo de </span>
                            <span className="text-red-400">Responsabilidad Médica</span>
                        </h1>
                    </div>

                    <div className="prose prose-invert prose-psyche max-w-none text-white/80 space-y-6">

                        <div className="p-6 border-l-4 border-red-500 bg-red-500/5 my-8">
                            <p className="text-lg font-bold text-white m-0 tracking-wide">La información brindada en PortalPSY NO CONSTITUYE NI SUSTITUYE una evaluación, consejo, diagnóstico o tratamiento de salud médica, psiquiátrica ni psicológica bajo ninguna circunstancia.</p>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Ausencia de Relación Médico-Paciente</h2>
                            <p>El uso de la información publicada en PortalPSY carece de valor prescriptivo. Los administradores, redactores y mantenedores técnicos no están prestando consejos particulares a nivel clínico, por lo que la lectura u asimilación de nuestros contenidos bajo ningún precepto crea una vinculación, relación, ni tutela médica formal y/u ortodoxa entre el usuario y los autores del portal.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Ilegalidad en el Consumo y Adquisición</h2>
                            <p>Queremos ser rotundos: <strong>Gran parte de las sustancias mencionadas, listadas y descritas en este portal son consideradas sustancias ilegales, fiscalizadas o fuertemente controladas</strong> a lo ancho de la inmensa mayoría de jurisdicciones mundiales, incluída España, según lo dictado por los correspondientes acuerdos de la ONU y legislaciones territoriales.</p>
                            <p>Poseer, poseer con intención de distribuir, sintetizar o procesar tales compuestos acarrea graves penas privativas de libertad u onerosas multas y acciones legales.</p>
                            <p>El propósito del portal obedece a la libre divulgación científica, teórica y cultural de cara a la mitigación y <strong>Reducción de Daños</strong> en el uso imperante dentro de la sociedad presente que desoye prohibiciones y de forma inevitable experimenta de mutuo acuerdo y auto-responsabilidad personal con dichas moléculas, minimizando impactos para la salud pública u accidentes.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Sobre Herramientas (Dosificación e Interacciones)</h2>
                            <p>La "Calculadora de Dosis" y el "Combo-Checker" de interacción operan basándose en bibliografía documentada por el grueso de ONGs en el campo y entidades públicas que ejecutan testeos activos (PsychonautWiki, Tripsit, EnergyControl, Erowid, etc.).</p>
                            <p>Estos valores son meras escalas logarítmicas de <strong>referencia teórica</strong> generalizada y no pueden predecir bajo ningún escenario posibles idiosincrasias químicas, intolerancias, purezas impuras, presencias de cortes adulterantes, metabolismo excepcional, cruces imprevisibles en la asimilación estomacal del usuario singular o crisis psicóticas inducidas.</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2 text-white/70">
                                <li><strong>Nunca</strong> ingiera una sustancia no probada y no testada formalmente con reagentes / tests colorimétricos.</li>
                                <li><strong>Nunca</strong> inicie una dosis fuerte creyendo la cuantificación supuesta que la figura de un traficante u amigo pueda alegar. Asuma siempre que las cifras pueden estar adulteradas o mal-equilibradas.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Emergencias Médicas</h2>
                            <p>En caso de una intoxicación masiva accidental o reacción traumática física grave que requiera inminente atención vital, este sitio no brinda ni operará ayuda de salvamento: por favor, contacte en el estado más calmado posible o indique en su auxilio contactar a los <strong>servicios de urgencias telefónicos estatales y proporcione detalles sobre lo ingerido de la forma más honesta</strong> al operador de apoyo médico para lograr viabilizar la respuesta idónea (Ej. 112).</p>
                        </section>

                    </div>
                </div>
            </div>
        </main>
    );
}
