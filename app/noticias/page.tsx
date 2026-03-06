import Link from 'next/link';
import { Newspaper, CalendarDays, ArrowRight } from 'lucide-react';
import { MetatronDivider } from '@/components/SacredGeometry';

export const metadata = {
    title: 'Noticias y Actualidad Psicodélica — PortalPSY',
    description: 'Últimas noticias sobre investigación, legalización y uso terapéutico de psicodélicos.'
};

const NEWS_ITEMS = [
    {
        id: '1',
        slug: 'fda-revision-mdma',
        title: 'La FDA revisa nuevamente la terapia con MDMA para el TEPT',
        summary: 'Tras los recientes debates clínicos, la asamblea busca clarificar los protocolos de seguridad necesarios para su aprobación inminente.',
        date: '24 Feb, 2026',
        category: 'Legalización',
        image: 'https://images.unsplash.com/photo-1576086202517-c81eb50c9502?w=800&auto=format&fit=crop&q=80',
    },
    {
        id: '2',
        slug: 'psilocibina-neuroplasticidad',
        title: 'Nuevos estudios sobre Psilocibina y neuroplasticidad',
        summary: 'Un reciente estudio revela de forma gráfica cómo se forman nuevas conexiones sinápticas tras una microdosis controlada.',
        date: '18 Feb, 2026',
        category: 'Ciencia',
        image: 'https://images.unsplash.com/photo-1559757175-9b2f6385ab0f?w=800&auto=format&fit=crop&q=80',
    },
    {
        id: '3',
        slug: 'futuro-redes-integracion',
        title: 'El futuro de las Redes Comunitarias de Integración',
        summary: 'Los foros y grupos locales están siendo un soporte fundamental para que los psiconautas reduzcan riesgos por su cuenta.',
        date: '10 Feb, 2026',
        category: 'Comunidad',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=80',
    }
];

export default function NoticiasPage() {
    return (
        <main className="min-h-screen pt-28 pb-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 mb-6 uppercase tracking-widest">
                        <Newspaper size={14} className="text-psyche-pink" />
                        Actualidad Global
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                        Noticias e <span className="gradient-text">Investigación</span>
                    </h1>
                    <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
                        Explora los últimos avances científicos, cambios legales y eventos de la comunidad psicodélica y de integración clínica.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {NEWS_ITEMS.map((item) => (
                        <Link href={`/noticias/${item.slug}`} key={item.id} className="group glass-sacred rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all flex flex-col h-full hover:-translate-y-1">
                            <div className="h-48 w-full relative overflow-hidden bg-white/5">
                                {/* Placeholder de imagen */}
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                <div className="absolute top-4 left-4">
                                    <span className="backdrop-blur-md bg-black/50 text-white/90 text-[10px] uppercase font-bold px-3 py-1.5 rounded-full border border-white/10">
                                        {item.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-2 text-xs text-white/40 mb-3">
                                    <CalendarDays size={12} />
                                    {item.date}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-psyche-pink transition-colors leading-snug">
                                    {item.title}
                                </h3>
                                <p className="text-white/50 text-sm leading-relaxed flex-grow">
                                    {item.summary}
                                </p>
                                <div className="mt-6 pt-6 border-t border-white/5">
                                    <span className="text-psyche-violet text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Leer más <ArrowRight size={14} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center">
                    <MetatronDivider />
                    <p className="text-white/30 text-xs mt-8">
                        Sección alimentada estáticamente con propósitos de la reestructuración web. Pronto contará con integración a base de datos.
                    </p>
                </div>

            </div>
        </main>
    );
}
