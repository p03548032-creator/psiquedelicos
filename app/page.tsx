import HeroSection from '@/sections/HeroSection';
import Link from 'next/link';
import { substances, articles } from '@/data/substances';
import { supabase } from '@/lib/supabase';
import { getIconComponent } from '@/lib/iconMap';
import { MetatronDivider, SeedOfLifeIcon } from '@/components/SacredGeometry';
import AuroraBanner from '@/components/AuroraBanner';
import BackToTopFab from '@/components/BackToTopFab';

import { FlaskConical, Microscope, HeartPulse, UserCheck, MessagesSquare, Headphones } from 'lucide-react';

const sections = [
  {
    href: '/sustancias',
    icon: FlaskConical,
    label: 'Sustancias',
    desc: 'Enciclopedia completa con efectos, dosis, riesgos y estado legal',
    color: '#c084fc',
  },
  {
    href: '/herramientas',
    icon: Microscope,
    label: 'Herramientas',
    desc: 'Calculadora de dosis, interacciones y planificador de microdosis',
    color: '#22d3ee',
  },
  {
    href: '/noticias',
    icon: Microscope,
    label: 'Noticias',
    desc: 'Ensayos clínicos, papers y actualidad científica en español',
    color: '#3b82f6',
  },
  {
    href: '/terapia-espana',
    icon: HeartPulse,
    label: 'Terapia en España',
    desc: 'Mapa de centros, cronología y marco legal actualizado 2026',
    color: '#f472b6',
  },
  {
    href: '/terapeutas',
    icon: UserCheck,
    label: 'Terapeutas',
    desc: 'Directorio verificado de centros e integradores en España',
    color: '#34d399',
  },
  {
    href: '/comunidad',
    icon: MessagesSquare,
    label: 'Comunidad',
    desc: 'Foro y espacio de debate libre de estigma',
    color: '#a78bfa',
  },
];

export const revalidate = 3600; // Cache de 1 hora para nuevas noticias

export default async function HomePage() {
  const featuredSubstances = substances.slice(0, 4);
  
  // Obtener los últimos 3 artículos publicados (más recientes primero)
  const { data: featuredArticles } = await supabase
    .from('articles')
    .select('id, slug, title, excerpt, icon_name')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(3);

  return (
    <>
      <HeroSection />
      <AuroraBanner />

      {/* ═══ SECCIONES DEL PORTAL ═══ */}
      <section className="relative py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm uppercase tracking-[0.3em] text-white/25 block mb-3">Explora el portal</span>
            <h2 className="text-3xl md:text-4xl font-black gradient-text">Todo lo que necesitas saber</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map(s => (
              <Link key={s.href} href={s.href}
                className="glass-sacred rounded-2xl p-6 hover:scale-[1.03] transition-all duration-300 group relative overflow-hidden border border-transparent hover:border-white/10">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at top left, ${s.color}15, transparent 60%)` }} />
                <div className="relative">
                  <span className="mb-4 block p-2 rounded-xl inline-flex" style={{ color: s.color, background: `${s.color}15` }}>
                    <s.icon size={28} strokeWidth={1.5} />
                  </span>
                  <h3 className="text-base font-bold text-white mb-2">{s.label}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium"
                    style={{ color: s.color }}>
                    Explorar <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MetatronDivider />

      {/* ═══ PREVIEW SUSTANCIAS ═══ */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-psyche-violet/60 block mb-3">Sustancias</span>
              <h2 className="text-3xl font-black gradient-text">Guía de Psicodélicos</h2>
            </div>
            <Link href="/sustancias" className="vesica-btn px-4 py-2 text-sm text-white/50 hover:text-white transition hidden sm:flex items-center gap-2">
              Ver todas <span>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredSubstances.map(s => (
              <Link key={s.id} href={`/sustancia/${s.id}`}
                className="glass-sacred rounded-2xl p-5 hover:scale-[1.04] transition-all duration-300 group border border-transparent hover:border-psyche-violet/20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at top left, rgba(124,58,237,0.1), transparent 70%)' }} />
                <span className="mb-3 block text-psyche-violet/80 group-hover:text-psyche-violet transition-colors">
                  <s.icon size={28} strokeWidth={1.5} />
                </span>
                <h3 className="text-sm font-bold text-white mb-1">{s.name}</h3>
                <p className="text-xs text-white/45">{s.aka}</p>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-6 sm:hidden">
            <Link href="/sustancias" className="vesica-btn px-5 py-2.5 text-sm text-white/50">Ver todas las sustancias →</Link>
          </div>
        </div>
      </section>

      <MetatronDivider />

      {/* ═══ PREVIEW ARTÍCULOS ═══ */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-psyche-cyan/60 block mb-3">Actualidad</span>
              <h2 className="text-3xl font-black gradient-text-cool">Últimas Noticias</h2>
            </div>
            <Link href="/noticias" className="vesica-btn px-4 py-2 text-sm text-white/50 hover:text-white transition hidden sm:flex items-center gap-2">
              Ver todas <span>→</span>
            </Link>
          </div>
          <div className="space-y-3">
            {(featuredArticles || []).map(a => {
              const Icon = getIconComponent(a.icon_name);
              return (
                <Link key={a.id} href={`/articulo/${a.slug}`}
                  className="glass-sacred rounded-2xl p-5 md:p-6 flex items-center gap-5 hover:scale-[1.01] transition-all duration-300 group border border-transparent hover:border-psyche-cyan/20">
                  <span className="w-10 h-10 rounded-xl bg-psyche-cyan/10 flex items-center justify-center text-psyche-cyan/80 flex-shrink-0 group-hover:bg-psyche-cyan/20 group-hover:text-psyche-cyan transition-all">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white mb-1 leading-snug line-clamp-1">{a.title}</h3>
                    <p className="text-white/45 text-xs leading-relaxed line-clamp-2">{a.excerpt}</p>
                  </div>
                  <span className="text-white/20 group-hover:text-psyche-cyan/60 group-hover:translate-x-1 transition-all flex-shrink-0">→</span>
                </Link>
              );
            })}
          </div>
          <div className="flex justify-center mt-6 sm:hidden">
            <Link href="/noticias" className="vesica-btn px-5 py-2.5 text-sm text-white/50">Ver todas las noticias →</Link>
          </div>
        </div>
      </section>

      <MetatronDivider />

      {/* ═══ CTA NEWSLETTER ═══ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="glass-sacred rounded-3xl p-8 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-psyche-violet blur-[100px]" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-psyche-pink blur-[100px]" />
            </div>
            <div className="relative">
              <SeedOfLifeIcon size={48} className="mx-auto mb-6 opacity-30" />
              <h2 className="text-2xl md:text-3xl font-black mb-4">
                <span className="gradient-text">El Pulso</span>{' '}
                <span className="text-white/80">de la Ciencia Psicodélica</span>
              </h2>
              <p className="text-white/45 max-w-xl mx-auto mb-8 leading-relaxed">
                Una newsletter mensual con análisis de ensayos clínicos, novedades regulatorias
                y entrevistas con investigadores españoles. Gratis.
              </p>
              <Link href="/newsletter"
                className="vesica-btn px-8 py-4 gradient-psyche text-white font-bold hover:scale-105 transition-all shadow-lg shadow-psyche-violet/20 inline-flex items-center gap-2">
                📬 Suscribirse gratis
              </Link>
              <p className="text-white/20 text-xs mt-4">Sale el primer lunes de cada mes · Sin spam</p>
            </div>
          </div>
        </div>
      </section>

      <BackToTopFab />
    </>
  );
}
