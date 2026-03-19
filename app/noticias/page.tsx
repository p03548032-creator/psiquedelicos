import Link from 'next/link';
import { Newspaper, CalendarDays, ArrowRight, Microscope, Scale, Users, Info } from 'lucide-react';
import { MetatronDivider } from '@/components/SacredGeometry';
import { supabase } from '@/lib/supabase';
import { getIconComponent } from '@/lib/iconMap';
import Image from 'next/image';
import NewsImage from '@/components/NewsImage';

export const revalidate = 3600;

export const metadata = {
    title: 'Noticias y Actualidad Psicodélica — PortalPSY',
    description: 'Últimas noticias sobre investigación, legalización y uso terapéutico de psicodélicos.'
};

export default async function NoticiasPage() {
    const { data: articles } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('publish_date', { ascending: false });

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
                    {(articles || []).map((item) => {
                        const Icon = getIconComponent(item.icon_name || 'FileText');
                        
                        // Determinar color de badge según categoría
                        const getCategoryStyle = (cat: string) => {
                            const lowCat = cat?.toLowerCase() || '';
                            if (lowCat.includes('legal')) return { color: 'text-psyche-pink', bg: 'bg-psyche-pink/10', border: 'border-psyche-pink/20' };
                            if (lowCat.includes('cienc') || lowCat.includes('investig')) return { color: 'text-psyche-cyan', bg: 'bg-psyche-cyan/10', border: 'border-psyche-cyan/20' };
                            if (lowCat.includes('comun')) return { color: 'text-psyche-violet', bg: 'bg-psyche-violet/10', border: 'border-psyche-violet/20' };
                            return { color: 'text-white/60', bg: 'bg-white/5', border: 'border-white/10' };
                        };

                        const catStyle = getCategoryStyle(item.category);
                        
                        // Override de emergencia para imágenes rotas conocidas basándonos en el título
                        let finalImageUrl = item.image_url;
                        const titleLower = (item.title || '').toLowerCase();
                        if (titleLower.includes('fda') && titleLower.includes('mdma')) {
                            finalImageUrl = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80';
                        } else if (titleLower.includes('psilocibina') && titleLower.includes('neuroplasticidad')) {
                            finalImageUrl = 'https://images.unsplash.com/photo-1508213638299-5fbc362c3463?w=800&auto=format&fit=crop&q=80';
                        }

                        return (
                            <Link href={`/articulo/${item.slug}`} key={item.id} className="group glass-sacred rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl hover:shadow-psyche-violet/10">
                                <div className="h-52 w-full relative overflow-hidden bg-void flex items-center justify-center">
                                    <NewsImage 
                                        src={finalImageUrl} 
                                        alt={item.title} 
                                        iconName={item.icon_name}
                                    />
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className={`backdrop-blur-md ${catStyle.bg} ${catStyle.color} ${catStyle.border} text-[10px] uppercase font-bold px-3 py-1.5 rounded-full border shadow-lg`}>
                                            {item.category}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60 pointer-events-none" />
                                </div>

                                <div className="p-7 flex flex-col flex-1 relative">
                                    <div className="flex items-center gap-2 text-[10px] text-white/30 mb-4 uppercase tracking-widest font-medium">
                                        <CalendarDays size={12} />
                                        {new Date(item.publish_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-psyche-pink transition-colors leading-tight line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/45 text-sm leading-relaxed flex-grow line-clamp-3 font-light italic">
                                        "{item.excerpt}"
                                    </p>
                                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                        <span className="text-psyche-violet text-sm font-bold flex items-center gap-2 group-hover:text-psyche-pink transition-colors">
                                            Leer artículo completo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="text-center">
                    <MetatronDivider />
                    <p className="text-white/30 text-[10px] mt-8 uppercase tracking-widest">
                        Información contrastada y actualizada dinámicamente
                    </p>
                </div>

            </div>
        </main>
    );
}
