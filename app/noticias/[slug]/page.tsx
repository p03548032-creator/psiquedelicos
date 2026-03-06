import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarDays, ArrowLeft, Share2, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';

export const metadata = {
    title: 'Noticia — PortalPSY',
    description: 'Artículo detallado sobre actualidad psicodélica.'
};

// Reutilizamos los datos mock temporalmente hasta añadir la DB.
const NEWS_ITEMS = [
    {
        id: '1',
        slug: 'fda-revision-mdma',
        title: 'La FDA revisa nuevamente la terapia con MDMA para el TEPT',
        summary: 'Tras los recientes debates clínicos, la asamblea busca clarificar los protocolos de seguridad necesarios para su aprobación inminente.',
        content: `
El pasado mes, el comité asesor de la FDA (Administración de Alimentos y Medicamentos) concluyó una intensa sesión de tres días centrada exclusivamente en los protocolos clínicos requeridos para la terapia asistida con MDMA enfocada al Trastorno de Estrés Postraumático (TEPT).

### El camino hasta ahora
MAPS (Multidisciplinary Association for Psychedelic Studies) lleva más de dos décadas impulsando el reconocimiento del componente terapéutico de esta sustancia de manera estandarizada y segura. Los ensayos clínicos de Fase III demostraron una eficacia sin precedentes, superando a los ISRS convencionales (Inhibidores Selectivos de la Recaptación de Serotonina) con márgenes contundentes.

> "El 67% de los participantes que recibieron MDMA asistida por terapia ya no cumplían con los criterios diagnósticos para el TEPT dos meses después de su última sesión".

### ¿Cuáles son las trabas actuales?
A pesar de la eficacia clínica irrefutable, el panel de la FDA se debate actualmente en torno a la complejidad de la infraestructura del "Set & Setting". El requerimiento de dos terapeutas altamente capacitados por paciente durante sesiones de 8 horas eleva significativamente el costo y plantea desafíos logísticos de escalabilidad masiva en el sistema de salud tradicional.

* **Requerimiento de Supervisión:** La necesidad de monitoreo constante de la presión arterial.
* **Formación del personal:** Creación de acreditaciones oficiales para facilitadores clínicos.
* **Prevención de abusos:** Protocolos estrictos para evitar cualquier tipo de desviación en la praxis clínica dada la alta vulnerabilidad del paciente inducida por las características de empatógeno de la sustancia.

### Siguientes Pasos
Se espera que para finales del tercer trimestre de 2026, la FDA emita un veredicto definitivo o exija una Fase III b para cimentar los parámetros de seguridad e implementación ambulatoria.
        `,
        date: '24 Feb, 2026',
        category: 'Legalización',
        author: 'Antonio J. Caimary',
        image: 'https://images.unsplash.com/photo-1576086202517-c81eb50c9502?w=1200&auto=format&fit=crop&q=80',
    },
    {
        id: '2',
        slug: 'psilocibina-neuroplasticidad',
        title: 'Nuevos estudios sobre Psilocibina y neuroplasticidad',
        summary: 'Un reciente estudio revela de forma gráfica cómo se forman nuevas conexiones sinápticas tras una microdosis controlada.',
        content: `
La psilocibina sigue asombrando al mundo científico. Un equipo conjunto de la Universidad Johns Hopkins y el Imperial College de Londres acaba de publicar, en la prestigiosa revista Nature Neuroscience, mapas de calor neuronales y escáneres fMRI que evidencian gráficamente cómo la sustancia promueve el crecimiento sináptico.

### Microdosis a la luz del microscopio
El debate sobre si la microdosis de psilocibina (dosis subperceptuales en un rango de 0.1g a 0.3g de hongos secos) es un efecto placebo o tiene bases biológicas sólidas lleva años abierto. 

El último estudio inyectó trazadores biológicos en modelos para analizar, pasados los 28 días (un ciclo de protocolo Fadiman), los niveles de **BDNF** (Factor Neurotrófico Derivado del Cerebro). El BDNF actúa literalmente como un fertilizante para el cerebro, estimulando el crecimiento de nuevas espinas dendríticas.

### Resultados
Los individuos que completaron el ciclo reportaron, junto con un alivio medible del síndrome rumiatorio típico en cuadros depresivos, un incremento visualizado del 14% en la interconectividad de la Default Mode Network (Red Neuronal por Defecto), la superautopista informática del cerebro que orquesta la sensación de ego e identidad.

Queda mucha investigación por delante, pero la "psiquiatría biológica" ya no puede desviar la vista de las capacidades de las triptaminas clásicas.
        `,
        date: '18 Feb, 2026',
        category: 'Ciencia',
        author: 'Dra. E. Ramírez',
        image: 'https://images.unsplash.com/photo-1559757175-9b2f6385ab0f?w=1200&auto=format&fit=crop&q=80',
    },
    {
        id: '3',
        slug: 'futuro-redes-integracion',
        title: 'El futuro de las Redes Comunitarias de Integración',
        summary: 'Los foros y grupos locales están siendo un soporte fundamental para que los psiconautas reduzcan riesgos por su cuenta.',
        content: `
A medida que la popularidad de los estados alterados de conciencia y de los psicodélicos explota gracias a documentales masivos en Netflix y apariciones en grandes podcasts, emerge un problema fundamental: **El acceso al uso es infinito, pero el acceso a la integración es un lujo.**

### El surgimiento de los Círculos de Integración
La terapia psicodélica clandestina o clínica en el extranjero cuesta fácilmente entre los $1,500 y $4,500 USD por retiro/fin de semana. Esto deja al ciudadano de a pie en la estocada, tomando sustancias potencialmente cataclísmicas a nivel ontológico en festivales o en sus salones sin ninguna red de seguridad emocional posterior.

Aquí es donde están brillando las redes comunitarias como **PortalPSY**. La reducción de daños "entre pares" o Peer-to-Peer ha demostrado en plataformas como Reddit, y foros más oscuros como Erowid, Bluelight o Shroomery, ser un faro en la oscuridad para mucha gente.

1. **Compartir lo indecible:** Dar voz a la disolución del ego, a veces traumática, ayuda a mitigar la desrealización.
2. **Alertas tempranas:** Evitar síndromes serotoninérgicos mediante el cruce de farmacocinética comunitaria.
3. **Validación:** Sentirse comprendido frente al estigma imperante aún remanente en buena parte de la sociedad.

La integración comunitaria, organizada de forma anónima pero moderada, no solo es el futuro, es el presente que está salvando vidas.
        `,
        date: '10 Feb, 2026',
        category: 'Comunidad',
        author: 'Redacción PortalPSY',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80',
    }
];

export default function NoticiaPage({ params }: { params: { slug: string } }) {
    const article = NEWS_ITEMS.find(item => item.slug === params.slug);

    if (!article) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-28 pb-32">
            <article className="max-w-3xl mx-auto px-6">

                {/* Botón Volver */}
                <Link href="/noticias" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-10 transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Volver a Noticias
                </Link>

                {/* Categoría y Fecha */}
                <div className="flex items-center gap-4 mb-6">
                    <span className="backdrop-blur-md bg-psyche-pink/10 text-psyche-pink text-[10px] uppercase font-bold px-3 py-1.5 rounded-full border border-psyche-pink/30">
                        {article.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-white/40">
                        <CalendarDays size={14} />
                        {article.date}
                    </span>
                </div>

                {/* Titular */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-8">
                    {article.title}
                </h1>

                {/* Resumen */}
                <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed mb-10 border-l-4 border-psyche-violet pl-6">
                    {article.summary}
                </p>

                {/* Autor */}
                <div className="flex items-center gap-4 mb-12 pb-8 border-b border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-psyche-violet to-psyche-cyan flex items-center justify-center font-bold text-lg shadow-lg">
                        {article.author.charAt(0)}
                    </div>
                    <div>
                        <p className="font-bold text-white text-sm">{article.author}</p>
                        <p className="text-xs text-white/40">Autorías de PortalPSY</p>
                    </div>
                </div>

                {/* Imagen Principal */}
                <figure className="mb-14 relative rounded-3xl overflow-hidden glass-sacred border border-white/5">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-auto object-cover max-h-[60vh]"
                    />
                    <figcaption className="p-4 text-xs text-center text-white/30 italic">
                        Fotografía referencial para {article.title}
                    </figcaption>
                </figure>

                {/* Cuerpo del Artículo */}
                <div className="prose prose-invert prose-lg prose-psyche max-w-none mb-16
                    prose-headings:font-black prose-headings:text-white prose-headings:tracking-tight
                    prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-6
                    prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-6
                    prose-a:text-psyche-cyan prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-white prose-strong:font-bold
                    prose-blockquote:border-l-psyche-violet prose-blockquote:bg-psyche-violet/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:text-white/80 prose-blockquote:italic
                    prose-ul:list-disc prose-ul:text-white/70 prose-li:my-2
                ">
                    {/* Renderizamos de manera cruda el HTML/Markdown simple por ahora */}
                    <div dangerouslySetInnerHTML={{
                        __html: article.content
                            .replace(/\n\n/g, '</p><p>')
                            .replace(/\n/g, '<br/>')
                            .replace(/### (.*?)\<br\/\>/g, '<h3>$1</h3>')
                            .replace(/\> \"(.*?)\"\<br\/\>/g, '<blockquote>"$1"</blockquote>')
                            .replace(/\* \*\*(.*?)\*\*(.*?)\<br\/\>/g, '<li><strong>$1</strong>$2</li>')
                            .replace(/1\. \*\*(.*?)\*\*(.*?)\<br\/\>/g, '<li><strong>$1</strong>$2</li>')
                            .replace(/2\. \*\*(.*?)\*\*(.*?)\<br\/\>/g, '<li><strong>$1</strong>$2</li>')
                            .replace(/3\. \*\*(.*?)\*\*(.*?)\<br\/\>/g, '<li><strong>$1</strong>$2</li>')
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }} />
                </div>

                {/* Controles Sociales Inferiores */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-t border-white/10">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-white/40 uppercase tracking-widest mr-2">Compartir</span>
                        <button className="w-10 h-10 rounded-full glass-sacred flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                            <Twitter size={16} />
                        </button>
                        <button className="w-10 h-10 rounded-full glass-sacred flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                            <Facebook size={16} />
                        </button>
                        <button className="w-10 h-10 rounded-full glass-sacred flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                            <LinkIcon size={16} />
                        </button>
                    </div>
                </div>

            </article>
        </main>
    );
}
