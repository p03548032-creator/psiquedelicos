import HeroSection from '@/sections/HeroSection';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getIconComponent } from '@/lib/iconMap';
import { MetatronDivider } from '@/components/SacredGeometry';
import AuroraBanner from '@/components/AuroraBanner';

import { FlaskConical, BookOpen, Microscope, HeartPulse, UserCheck, MessagesSquare, Shield, Beaker } from 'lucide-react';

const pillars = [
  {
    href: '/sustancias',
    icon: FlaskConical,
    label: 'Mapa de sustancias',
    desc: 'Fichas con efectos, dosis, seguridad y legality en España. Para decidir con información.',
    color: '#c084fc',
    stage: 'Preparación',
  },
  {
    href: '/herramientas',
    icon: Beaker,
    label: 'Herramientas',
    desc: 'Calculadora de dosis, interacciones y planificador de microdosis. Acceso gratuito.',
    color: '#22d3ee',
    stage: 'Preparación',
  },
  {
    href: '/herramientas/interacciones',
    icon: Shield,
    label: 'Reducción de daños',
    desc: 'Comprueba combinaciones, evita riesgos y sabe qué hacer en cada fase del viaje.',
    color: '#ef4444',
    stage: 'Durante',
  },
  {
    href: '/herramientas/calculadora-dosis',
    icon: Microscope,
    label: 'Calculadora de dosis',
    desc: 'Dosis aproximadas según sustancia y objetivo. Nunca es un sustituto del conocimiento personal.',
    color: '#06b6d4',
    stage: 'Preparación',
  },
  {
    href: '/noticias',
    icon: BookOpen,
    label: 'Artículos y guías',
    desc: 'Ciencia revisada, reducción de daños e integración. Sin sensacionalismo.',
    color: '#818cf8',
    stage: 'Integración',
  },
  {
    href: '/terapia-espana',
    icon: HeartPulse,
    label: 'Terapia en España',
    desc: 'Estado actual de la psicoterapia asistida con psicodélicos en 2026.',
    color: '#f472b6',
    stage: 'Integración',
  },
  {
    href: '/terapeutas',
    icon: UserCheck,
    label: 'Directorio de terapeutas',
    desc: 'Centros verificados e integradores en España.',
    color: '#34d399',
    stage: 'Integración',
  },
  {
    href: '/comunidad',
    icon: MessagesSquare,
    label: 'Comunidad',
    desc: 'Espacio para compartir experiencias y aprender de otros navegantes.',
    color: '#a78bfa',
    stage: 'Integración',
  },
];

export const revalidate = 3600;

export default async function HomePage() {
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

      <section className="relative py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.3em] text-white/25 block mb-3">Tu punto de partida</span>
            <h2 className="text-3xl md:text-4xl font-black gradient-text mb-3">
              Navega con información, no con intuición.
            </h2>
            <p className="text-white/45 text-base max-w-xl mx-auto">
              PortalPSY es un mapa. No te dice qué hacer. Te da lo que necesitas para decidir con responsabilidad.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {pillars.map(p => (
              <Link key={p.href} href={p.href}
                className="glass-sacred rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden border border-transparent hover:border-white/10">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at top left, ${p.color}10, transparent 60%)` }} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border"
                      style={{ color: p.color, borderColor: `${p.color}30`, background: `${p.color}08` }}>
                      {p.stage}
                    </span>
                    <span style={{ color: p.color }}>
                      <p.icon size={18} strokeWidth={1.5} />
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{p.label}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MetatronDivider />

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-psyche-cyan/60 block mb-3">Desde la comunidad</span>
              <h2 className="text-3xl font-black gradient-text-cool">Lo último</h2>
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
        </div>
      </section>

      <MetatronDivider />

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm uppercase tracking-[0.3em] text-white/25 block mb-4">Para quien esto le ayuda</span>
          <blockquote className="text-xl md:text-2xl font-medium text-white/70 leading-relaxed mb-8">
            &ldquo;Llevo años con ansiedad y la información sobre psicodélicos estaba desperdigada o cargada de sensacionalismo. PortalPSY es lo primero que me da datos sin intentar venderme nada.&rdquo;
          </blockquote>
          <cite className="text-white/30 text-sm not-italic">— Un navegante anónimo</cite>
        </div>
      </section>

      <MetatronDivider />
    </>
  );
}
