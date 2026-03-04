'use client';
import { useState, useEffect, useRef } from 'react';
import { MetatronDivider } from '@/components/SacredGeometry';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

/* ═══════════════════════════════════════════════════════
   COMUNIDAD & FORO — Portal de los Psicodélicos
   Sistema de foro con categorías, threads, votaciones,
   relatos de experiencias y directorio de recursos.
   ═══════════════════════════════════════════════════════ */

// ── Tipos ──
interface ForumCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  threadCount: number;
  postCount: number;
}

interface Thread {
  id: string;
  categoryId: string;
  title: string;
  author: User;
  createdAt: string;
  replies: number;
  views: number;
  votes: number;
  pinned: boolean;
  tags: string[];
  preview: string;
  lastReply: { author: string; time: string };
}

interface User {
  name: string;
  avatar: string;
  level: string;
  posts: number;
  joined: string;
  badge?: string;
}

interface ExperienceReport {
  id: string;
  substance: string;
  substanceEmoji: string;
  title: string;
  author: User;
  dose: string;
  setting: string;
  intention: string;
  rating: number;
  excerpt: string;
  readTime: string;
  reactions: { love: number; mindblown: number; helpful: number; solidarity: number };
  tags: string[];
  color: string;
}

// ── Datos del Foro ──
const categories: ForumCategory[] = [
  { id: 'experiencias', name: 'Relatos de Experiencias', emoji: '📖', color: '#a78bfa', description: 'Comparte y lee experiencias psicodélicas detalladas', threadCount: 2847, postCount: 18320 },
  { id: 'reduccion', name: 'Reducción de Daños', emoji: '🛡️', color: '#10b981', description: 'Preguntas sobre seguridad, dosificación e interacciones', threadCount: 1205, postCount: 9840 },
  { id: 'microdosis', name: 'Microdosificación', emoji: '🔬', color: '#06b6d4', description: 'Protocolos, experiencias y ciencia de las microdosis', threadCount: 956, postCount: 7230 },
  { id: 'integracion', name: 'Integración', emoji: '🌱', color: '#34d399', description: 'Procesar y dar sentido a las experiencias', threadCount: 734, postCount: 5120 },
  { id: 'ciencia', name: 'Ciencia & Investigación', emoji: '🧬', color: '#f472b6', description: 'Papers, ensayos clínicos, neurociencia psicodélica', threadCount: 521, postCount: 3850 },
  { id: 'legal', name: 'Legal en España', emoji: '⚖️', color: '#fbbf24', description: 'Legislación, derechos, situación legal actualizada', threadCount: 312, postCount: 2140 },
  { id: 'musica', name: 'Música & Set/Setting', emoji: '🎵', color: '#e879f9', description: 'Playlists, ambientación y preparación del espacio', threadCount: 445, postCount: 3210 },
  { id: 'cultivo', name: 'Etnobotánica', emoji: '🌿', color: '#4ade80', description: 'Plantas, hongos y el mundo natural psicoactivo', threadCount: 623, postCount: 4560 },
  { id: 'terapia', name: 'Terapia Psicodélica', emoji: '🏥', color: '#38bdf8', description: 'Ketamina terapéutica, ensayos, experiencias clínicas', threadCount: 287, postCount: 1980 },
  { id: 'meta', name: 'Meta & Presentaciones', emoji: '👋', color: '#94a3b8', description: 'Preséntate, sugerencias para el portal, feedback', threadCount: 198, postCount: 1450 },
];

const sampleUsers: User[] = [
  { name: 'PsicoExplorador', avatar: '🧭', level: 'Veterano', posts: 342, joined: 'Ene 2024', badge: '🌟' },
  { name: 'NeuronautaES', avatar: '🧠', level: 'Moderador', posts: 891, joined: 'Mar 2023', badge: '🛡️' },
  { name: 'MariaMicrodosis', avatar: '🔬', level: 'Contribuidor', posts: 156, joined: 'Jun 2025' },
  { name: 'EnteógenoAndaluz', avatar: '🌻', level: 'Activo', posts: 89, joined: 'Sep 2025' },
  { name: 'IntegradorBCN', avatar: '🌱', level: 'Veterano', posts: 267, joined: 'Dic 2023', badge: '💚' },
  { name: 'Dra.MenteAbierta', avatar: '⚕️', level: 'Profesional Verificado', posts: 445, joined: 'Feb 2024', badge: '✅' },
];

const threads: Thread[] = [
  {
    id: '1', categoryId: 'experiencias',
    title: 'Mi primera experiencia con psilocibina después de 15 años de depresión',
    author: sampleUsers[0], createdAt: 'Hace 3 horas', replies: 47, views: 1823, votes: 156, pinned: false,
    tags: ['Psilocibina', 'Depresión', 'Terapéutico'],
    preview: 'Quiero compartir algo que ha cambiado mi vida. Después de 15 años con depresión resistente y habiendo probado 8 antidepresivos diferentes...',
    lastReply: { author: 'IntegradorBCN', time: 'Hace 12 min' },
  },
  {
    id: '2', categoryId: 'reduccion',
    title: '⚠️ GUÍA ACTUALIZADA: Interacciones peligrosas con ISRS y psicodélicos',
    author: sampleUsers[1], createdAt: 'Hace 1 día', replies: 83, views: 5420, votes: 312, pinned: true,
    tags: ['Seguridad', 'ISRS', 'Interacciones', 'IMPORTANTE'],
    preview: 'Actualizo esta guía con la última evidencia. Si tomas antidepresivos ISRS/IRSN, lee esto ANTES de considerar cualquier psicodélico...',
    lastReply: { author: 'Dra.MenteAbierta', time: 'Hace 45 min' },
  },
  {
    id: '3', categoryId: 'microdosis',
    title: 'Protocolo Stamets Stack: 6 meses de resultados con tracking diario',
    author: sampleUsers[2], createdAt: 'Hace 2 días', replies: 64, views: 3210, votes: 198, pinned: false,
    tags: ['Stamets', 'Psilocibina', 'Datos', 'Long-term'],
    preview: 'He seguido el protocolo Stamets Stack (psilocibina + lion\'s mane + niacina) durante 6 meses completos. Aquí mis datos...',
    lastReply: { author: 'PsicoExplorador', time: 'Hace 2 horas' },
  },
  {
    id: '4', categoryId: 'ciencia',
    title: 'Nuevo paper: La psilocibina reestructura la red de modo por defecto a largo plazo',
    author: sampleUsers[5], createdAt: 'Hace 1 día', replies: 29, views: 1890, votes: 145, pinned: false,
    tags: ['Paper', 'Neurociencia', 'DMN', 'Psilocibina'],
    preview: 'Se acaba de publicar en Nature Neuroscience un estudio que demuestra que una sola dosis de psilocibina produce cambios en la conectividad...',
    lastReply: { author: 'NeuronautaES', time: 'Hace 4 horas' },
  },
  {
    id: '5', categoryId: 'integracion',
    title: 'Cómo gestionar una experiencia difícil que sigue resonando semanas después',
    author: sampleUsers[4], createdAt: 'Hace 5 horas', replies: 31, views: 980, votes: 87, pinned: false,
    tags: ['Integración', 'Experiencia difícil', 'Ayuda'],
    preview: 'Hace 3 semanas tuve una sesión de ayahuasca que fue absolutamente demoledora. No puedo decir que fuera "mala" porque siento que...',
    lastReply: { author: 'Dra.MenteAbierta', time: 'Hace 1 hora' },
  },
  {
    id: '6', categoryId: 'legal',
    title: '¿Qué pasa legalmente si te pillan con trufas de Ámsterdam en España?',
    author: sampleUsers[3], createdAt: 'Hace 3 días', replies: 42, views: 4510, votes: 67, pinned: false,
    tags: ['Legal', 'España', 'Trufas', 'Importación'],
    preview: 'Pregunta seria. He visto que las trufas de psilocibina son legales en Países Bajos, pero ¿qué ocurre si las traes a España?...',
    lastReply: { author: 'NeuronautaES', time: 'Hace 6 horas' },
  },
  {
    id: '7', categoryId: 'experiencias',
    title: 'DMT fumado: el viaje de 15 minutos que me llevó una vida entera procesar',
    author: sampleUsers[3], createdAt: 'Hace 4 días', replies: 73, views: 6200, votes: 234, pinned: false,
    tags: ['DMT', 'Breakthrough', 'Entidades', 'Relato detallado'],
    preview: 'Llevaba 2 años leyendo sobre DMT, preparándome mentalmente. Cuando finalmente lo intenté, nada de lo que había leído...',
    lastReply: { author: 'PsicoExplorador', time: 'Hace 8 horas' },
  },
  {
    id: '8', categoryId: 'terapia',
    title: 'Mi experiencia con esketamina (Spravato) en el Hospital Clínic de Barcelona',
    author: sampleUsers[4], createdAt: 'Hace 1 semana', replies: 56, views: 3870, votes: 178, pinned: false,
    tags: ['Esketamina', 'Spravato', 'Barcelona', 'Depresión'],
    preview: 'Quiero contar mi experiencia real con el tratamiento de esketamina nasal que ofrece el Hospital Clínic. Llevo 4 sesiones...',
    lastReply: { author: 'Dra.MenteAbierta', time: 'Hace 1 día' },
  },
];

const experienceReports: ExperienceReport[] = [
  {
    id: '1', substance: 'Psilocibina', substanceEmoji: '🍄',
    title: '3.5g de Cubensis en la Sierra de Gredos: encuentro con la muerte y renacimiento',
    author: sampleUsers[0],
    dose: '3.5g secos', setting: 'Naturaleza, montaña', intention: 'Resolver duelo no procesado',
    rating: 5,
    excerpt: 'Salí de casa a las 7am con mi mejor amigo como sitter. El plan era subir a una pradera que conozco bien en Gredos y sentarme a ver el amanecer. A las 8:30 ingerí las setas con un poco de chocolate negro...',
    readTime: '18 min', color: '#c084fc',
    reactions: { love: 89, mindblown: 45, helpful: 67, solidarity: 34 },
    tags: ['Naturaleza', 'Dosis alta', 'Duelo', 'Transformador'],
  },
  {
    id: '2', substance: 'LSD', substanceEmoji: '🌈',
    title: 'Microdosis de LSD y creatividad musical: diario de 3 meses como productor',
    author: sampleUsers[2],
    dose: '10μg cada 3 días', setting: 'Estudio de música, casa', intention: 'Potenciar creatividad',
    rating: 4,
    excerpt: 'Soy productor de música electrónica. Empecé un protocolo Fadiman con 10μg de 1P-LSD para ver si mejoraba mi proceso creativo. Aquí está mi diario detallado de 90 días...',
    readTime: '22 min', color: '#a78bfa',
    reactions: { love: 56, mindblown: 23, helpful: 112, solidarity: 18 },
    tags: ['Microdosis', 'Creatividad', 'Música', 'Protocolo Fadiman'],
  },
  {
    id: '3', substance: 'Ayahuasca', substanceEmoji: '🌿',
    title: 'Tres ceremonias de ayahuasca en España: lo bello y lo terrible',
    author: sampleUsers[3],
    dose: 'Variable (ceremonial)', setting: 'Centro ceremonial, Andalucía', intention: 'Sanación de trauma infantil',
    rating: 5,
    excerpt: 'Asistí a un retiro de 3 noches con un facilitador formado en tradición shipiba. La primera noche fue suave, la segunda me destrozó completamente, y la tercera...',
    readTime: '25 min', color: '#fbbf24',
    reactions: { love: 134, mindblown: 78, helpful: 56, solidarity: 89 },
    tags: ['Ceremonial', 'Trauma', 'Sanación', 'Retiro'],
  },
  {
    id: '4', substance: 'Ketamina', substanceEmoji: '💎',
    title: 'Ketamina terapéutica IV para depresión: lo que nadie te cuenta del K-hole clínico',
    author: sampleUsers[4],
    dose: '0.5mg/kg IV', setting: 'Clínica privada, Madrid', intention: 'Depresión resistente',
    rating: 4,
    excerpt: 'Después de probar 6 antidepresivos en 4 años, mi psiquiatra me derivó a una clínica que ofrece infusiones de ketamina IV. Esto es lo que experimenté...',
    readTime: '15 min', color: '#22d3ee',
    reactions: { love: 67, mindblown: 34, helpful: 156, solidarity: 45 },
    tags: ['Terapéutico', 'Clínico', 'Depresión', 'IV'],
  },
];

// ── Componente: Thread Card ──
function ThreadCard({ thread }: { thread: Thread }) {
  const [voted, setVoted] = useState(false);
  const cat = categories.find(c => c.id === thread.categoryId);

  return (
    <div className={`group p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 ${thread.pinned ? 'border-l-2' : ''}`}
      style={{ borderLeftColor: thread.pinned ? cat?.color : undefined }}>
      <div className="flex gap-4">
        {/* Votos */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <button
            onClick={() => setVoted(!voted)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${voted ? 'bg-psyche-violet/20 text-psyche-violet' : 'bg-white/5 text-white/30 hover:text-white/60'
              }`}
          >
            ▲
          </button>
          <span className={`text-sm font-bold ${voted ? 'text-psyche-violet' : 'text-white/50'}`}>
            {thread.votes + (voted ? 1 : 0)}
          </span>
        </div>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {thread.pinned && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold">
                📌 FIJADO
              </span>
            )}
            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${cat?.color}15`, color: cat?.color }}>
              {cat?.emoji} {cat?.name}
            </span>
          </div>

          <h4 className="text-base font-semibold text-white/90 group-hover:text-white transition-colors mb-2 cursor-pointer">
            {thread.title}
          </h4>

          <p className="text-sm text-white/35 mb-3 line-clamp-2">{thread.preview}</p>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">{thread.author.avatar}</span>
              <span className="text-xs text-white/50">{thread.author.name}</span>
              {thread.author.badge && <span className="text-xs">{thread.author.badge}</span>}
            </div>
            <span className="text-xs text-white/20">{thread.createdAt}</span>
            <div className="flex items-center gap-3 text-xs text-white/25 ml-auto">
              <span>💬 {thread.replies}</span>
              <span>👁 {thread.views.toLocaleString()}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {thread.tags.map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30">
                #{tag}
              </span>
            ))}
          </div>

          {/* Última respuesta */}
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2 text-xs text-white/25">
            <span>↩️ Última respuesta por <span className="text-white/40">{thread.lastReply.author}</span></span>
            <span>· {thread.lastReply.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Componente: Experience Report Card ──
function ExperienceCard({ report }: { report: ExperienceReport }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `${report.color}15` }}
          >
            {report.substanceEmoji}
          </div>
          <div>
            <span className="text-xs font-semibold" style={{ color: report.color }}>{report.substance}</span>
            <p className="text-xs text-white/30">{report.dose} · {report.setting}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-sm ${i < report.rating ? '' : 'opacity-20'}`}>✦</span>
          ))}
        </div>
      </div>

      {/* Título */}
      <h4 className="text-base font-semibold text-white/90 mb-2 cursor-pointer hover:text-white transition-colors" onClick={() => setExpanded(!expanded)}>
        {report.title}
      </h4>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-3 text-xs text-white/30">
        <span>{report.author.avatar} {report.author.name}</span>
        <span>📖 {report.readTime}</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5">
          🎯 {report.intention}
        </span>
      </div>

      {/* Preview / Expandido */}
      <div className={`text-sm text-white/40 leading-relaxed overflow-hidden transition-all duration-500 ${expanded ? 'max-h-96' : 'max-h-16'}`}>
        {report.excerpt}
        {expanded && (
          <p className="mt-4 text-white/25 italic text-xs border-l-2 border-white/10 pl-3">
            Este es un extracto del relato. En la versión completa del foro encontrarás todos los detalles,
            la cronología hora a hora, las reflexiones del autor y los comentarios de la comunidad.
          </p>
        )}
      </div>

      <button onClick={() => setExpanded(!expanded)} className="text-xs text-psyche-violet/70 hover:text-psyche-violet mt-2 cursor-pointer">
        {expanded ? '▲ Ver menos' : '▼ Leer más'}
      </button>

      {/* Reacciones */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
        {[
          { emoji: '❤️', key: 'love' as const, label: 'Me resonó' },
          { emoji: '🤯', key: 'mindblown' as const, label: 'Increíble' },
          { emoji: '🙏', key: 'helpful' as const, label: 'Útil' },
          { emoji: '🤝', key: 'solidarity' as const, label: 'Solidaridad' },
        ].map(reaction => (
          <button
            key={reaction.key}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-xs"
            title={reaction.label}
          >
            <span>{reaction.emoji}</span>
            <span className="text-white/30">{report.reactions[reaction.key]}</span>
          </button>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {report.tags.map(tag => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/25">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Componente: Nuevo Post (simulado -> DB) ──
function NewPostForm({ onClose, currentUser }: { onClose: () => void, currentUser: any }) {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isExperience, setIsExperience] = useState(false);
  const [substance, setSubstance] = useState('');
  const [dose, setDose] = useState('');
  const [setting, setSetting] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (title && content && category) {
      if (!currentUser) {
        alert("Por favor, inicia sesión para publicar en la comunidad.");
        router.push('/login');
        return;
      }

      setLoading(true);
      const supabase = createClient();

      let error;

      if (isExperience) {
        // Insert into experience_reports
        const { error: expError } = await supabase.from('experience_reports').insert({
          author_id: currentUser.id,
          title,
          content,
          substance,
          dose,
          setting,
          intention: 'Compartir', // Hardcoded for simplified form
          rating: 5 // Default for now
        });
        error = expError;
      } else {
        // Insert into forum_topics
        const { error: forumError } = await supabase.from('forum_topics').insert({
          author_id: currentUser.id,
          title,
          content,
          category,
          is_pinned: false
        });
        error = forumError;
      }

      setLoading(false);

      if (error) {
        console.error("Error inserting post:", error);
        alert("Ocurrió un error al publicar. Inténtalo de nuevo.");
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        router.refresh();
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl border border-green-500/20 bg-green-500/5 text-center">
        <span className="text-5xl block mb-4">✅</span>
        <h4 className="text-xl font-bold text-white/90 mb-2">¡Publicado!</h4>
        <p className="text-sm text-white/50">Tu aportación ha sido enviada. La comunidad te lo agradece 🙏</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl border border-psyche-violet/15 bg-psyche-violet/[0.03] space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-bold text-white/90">✍️ Nuevo Post</h4>
        <button onClick={onClose} className="text-white/30 hover:text-white/60 text-xl cursor-pointer">✕</button>
      </div>

      {/* Tipo */}
      <div className="flex gap-3">
        <button
          onClick={() => setIsExperience(false)}
          className={`vesica-btn px-4 py-2 text-sm cursor-pointer ${!isExperience ? 'gradient-psyche text-white' : 'glass-sacred text-white/50'}`}
        >
          💬 Discusión
        </button>
        <button
          onClick={() => setIsExperience(true)}
          className={`vesica-btn px-4 py-2 text-sm cursor-pointer ${isExperience ? 'gradient-psyche text-white' : 'glass-sacred text-white/50'}`}
        >
          📖 Relato de Experiencia
        </button>
      </div>

      {/* Categoría */}
      <div>
        <label className="text-xs text-white/40 block mb-2">Categoría</label>
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 6).map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer ${category === cat.id
                ? 'text-white'
                : 'bg-white/5 text-white/40 hover:text-white/60'
                }`}
              style={{
                background: category === cat.id ? `${cat.color}30` : undefined,
                color: category === cat.id ? cat.color : undefined,
              }}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Campos específicos de experiencia */}
      {isExperience && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
          <div>
            <label className="text-[10px] text-white/40 block mb-1">Sustancia</label>
            <input
              value={substance}
              onChange={e => setSubstance(e.target.value)}
              placeholder="Psilocibina, LSD..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 placeholder-white/20 focus:border-psyche-violet/40 outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] text-white/40 block mb-1">Dosis</label>
            <input
              value={dose}
              onChange={e => setDose(e.target.value)}
              placeholder="2.5g, 100μg..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 placeholder-white/20 focus:border-psyche-violet/40 outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] text-white/40 block mb-1">Setting</label>
            <input
              value={setting}
              onChange={e => setSetting(e.target.value)}
              placeholder="Naturaleza, casa..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 placeholder-white/20 focus:border-psyche-violet/40 outline-none"
            />
          </div>
        </div>
      )}

      {/* Título */}
      <div>
        <label className="text-xs text-white/40 block mb-2">Título</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Un título descriptivo..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 placeholder-white/20 focus:border-psyche-violet/30 outline-none"
        />
      </div>

      {/* Contenido */}
      <div>
        <label className="text-xs text-white/40 block mb-2">Contenido</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Comparte tu experiencia, pregunta o reflexión..."
          rows={6}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/80 placeholder-white/20 focus:border-psyche-violet/30 outline-none resize-none"
        />
      </div>

      {/* Info */}
      <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
        <p className="text-xs text-amber-400/70 flex items-start gap-2">
          <span className="text-base">⚠️</span>
          <span>
            <strong>Normas de la comunidad:</strong> No se permite promocionar la venta ni el consumo irresponsable.
            Todos los relatos deben incluir contexto de reducción de daños. Los posts son revisados por moderadores.
          </span>
        </p>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!title || !content || !category || loading}
        className={`vesica-btn w-full py-3 font-semibold text-sm transition-all cursor-pointer ${title && content && category && !loading
          ? 'gradient-psyche text-white shadow-lg shadow-psyche-violet/20 hover:scale-[1.02]'
          : 'bg-white/5 text-white/20 cursor-not-allowed'
          }`}
      >
        {loading ? 'Publicando...' : 'Publicar en la comunidad'}
      </button>
    </div>
  );
}

// ── Componente: Estadísticas de Comunidad ──
function CommunityStats() {
  const stats = [
    { label: 'Miembros', value: '12.847', emoji: '👥', color: '#a78bfa' },
    { label: 'Threads', value: '8.128', emoji: '💬', color: '#f472b6' },
    { label: 'Respuestas', value: '57.600', emoji: '↩️', color: '#22d3ee' },
    { label: 'Experiencias', value: '2.340', emoji: '📖', color: '#fbbf24' },
    { label: 'Online ahora', value: '147', emoji: '🟢', color: '#34d399' },
    { label: 'Desde', value: '2023', emoji: '📅', color: '#94a3b8' },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {stats.map(stat => (
        <div key={stat.label} className="text-center p-3 rounded-xl border border-white/5 bg-white/[0.02]">
          <span className="text-xl block mb-1">{stat.emoji}</span>
          <p className="text-lg font-black" style={{ color: stat.color }}>{stat.value}</p>
          <p className="text-[10px] text-white/30">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

// ── Componente: Leaderboard / Top Contributors ──
function TopContributors() {
  return (
    <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
      <h4 className="text-sm font-bold text-white/70 mb-4">🏆 Top Contribuidores</h4>
      <div className="space-y-3">
        {sampleUsers.slice(0, 5).map((user, i) => (
          <div key={user.name} className="flex items-center gap-3">
            <span className="text-lg w-7 text-center">
              {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}
            </span>
            <span className="text-lg">{user.avatar}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/80 truncate">
                {user.name} {user.badge || ''}
              </p>
              <p className="text-[10px] text-white/30">{user.level} · {user.posts} posts</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Componente: Reglas de la Comunidad ──
function CommunityRules() {
  const rules = [
    { emoji: '🤝', title: 'Respeto absoluto', desc: 'Cada persona tiene su propio camino. No juzgamos experiencias, dosis ni sustancias.' },
    { emoji: '🛡️', title: 'Reducción de daños primero', desc: 'Toda información compartida debe priorizar la seguridad. Si ves algo peligroso, reporta.' },
    { emoji: '🚫', title: 'Nada de sourcing', desc: 'Prohibido preguntar o indicar dónde comprar sustancias. Tolerancia cero.' },
    { emoji: '🔬', title: 'Evidencia sobre opinión', desc: 'Cita fuentes cuando hables de ciencia. Distingue experiencia personal de hecho probado.' },
    { emoji: '🧠', title: 'Honestidad radical', desc: 'Cuenta lo bueno Y lo malo. Los relatos honestos salvan vidas.' },
    { emoji: '❤️', title: 'Cuida a la comunidad', desc: 'Si alguien pide ayuda, responde con empatía. Somos una red de apoyo.' },
  ];

  return (
    <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
      <h4 className="text-sm font-bold text-white/70 mb-4">📜 Normas de la Comunidad</h4>
      <div className="space-y-3">
        {rules.map(rule => (
          <div key={rule.title} className="flex items-start gap-3">
            <span className="text-lg flex-shrink-0">{rule.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-white/70">{rule.title}</p>
              <p className="text-xs text-white/30">{rule.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Componente Principal: CommunitySection ──
export default function CommunitySection({ dbTopics = [], dbReports = [], currentUser = null }: { dbTopics?: any[], dbReports?: any[], currentUser?: any }) {
  const [activeView, setActiveView] = useState<'foro' | 'experiencias' | 'nuevo'>('foro');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Format Supabase DB topics into the UI Thread interface
  const formattedDbTopics: Thread[] = dbTopics.map(topic => ({
    id: topic.id,
    categoryId: topic.category,
    title: topic.title,
    author: {
      name: topic.profiles?.username || 'Usuario Anónimo',
      avatar: topic.profiles?.avatar_url || '🧑‍🚀',
      level: topic.profiles?.role === 'admin' ? 'Administrador' : 'Miembro',
      posts: 0,
      joined: new Date(topic.created_at).toLocaleDateString()
    },
    createdAt: new Date(topic.created_at).toLocaleDateString(),
    replies: 0,
    views: 0,
    votes: 0,
    pinned: topic.is_pinned,
    tags: [],
    preview: topic.content,
    lastReply: { author: topic.profiles?.username || 'Anónimo', time: new Date(topic.updated_at).toLocaleDateString() }
  }));

  // Combine static mock data with real DB topic data
  const combinedThreads = [...formattedDbTopics, ...threads];

  const filteredThreads = combinedThreads.filter(t => {
    if (activeCategory && t.categoryId !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return t.title.toLowerCase().includes(q) || t.tags.some(tag => tag.toLowerCase().includes(q));
    }
    return true;
  }).sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.votes - a.votes;
  });

  // Format Supabase DB reports into the UI ExperienceReport interface
  const formattedDbReports: ExperienceReport[] = dbReports.map(report => ({
    id: report.id,
    substance: report.substance,
    substanceEmoji: report.substance === 'Psilocibina' ? '🍄' : report.substance === 'LSD' ? '🌈' : report.substance === 'Ayahuasca' ? '🌿' : '💊',
    title: report.title,
    author: {
      name: report.profiles?.username || 'Usuario Anónimo',
      avatar: report.profiles?.avatar_url || '🧑‍🚀',
      level: report.profiles?.role === 'admin' ? 'Administrador' : 'Miembro',
      posts: 0,
      joined: new Date(report.created_at).toLocaleDateString()
    },
    dose: report.dose || 'Desconocida',
    setting: report.setting || 'No especificado',
    intention: report.intention || 'Exploración',
    rating: report.rating || 5,
    excerpt: report.content,
    readTime: '5 min', // Simplificación para demo
    reactions: { love: 0, mindblown: 0, helpful: 0, solidarity: 0 },
    tags: [],
    color: '#a78bfa'
  }));

  // Combine static mock data with real DB report data
  const combinedReports = [...formattedDbReports, ...experienceReports];

  const totalThreads = categories.reduce((s, c) => s + c.threadCount, 0);
  const totalPosts = categories.reduce((s, c) => s + c.postCount, 0);

  return (
    <section id="comunidad" className="relative py-32 px-6" ref={sectionRef}>
      <div className={`relative max-w-6xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 vesica-btn px-5 py-2 glass-sacred text-sm text-psyche-pink mb-6">
            <span className="w-2 h-2 rounded-full bg-psyche-pink animate-pulse" />
            Comunidad · {totalThreads.toLocaleString()} threads · {totalPosts.toLocaleString()} posts
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="gradient-text-warm">Comunidad</span>
            <span className="block text-white/90 mt-2">Psiconáutica</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            Un espacio seguro para compartir experiencias, aprender de otros y crecer juntos.
            Relatos honestos, reducción de daños y apoyo mutuo.
          </p>
        </div>

        {/* Stats */}
        <CommunityStats />

        <MetatronDivider />

        {/* Vista selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex gap-2">
            {[
              { id: 'foro' as const, label: '💬 Foro', desc: 'Discusiones' },
              { id: 'experiencias' as const, label: '📖 Experiencias', desc: 'Relatos' },
            ].map(view => (
              <button
                key={view.id}
                onClick={() => { setActiveView(view.id); setShowNewPost(false); }}
                className={`vesica-btn px-5 py-2.5 text-sm transition-all cursor-pointer ${activeView === view.id
                  ? 'gradient-psyche text-white shadow-lg shadow-psyche-violet/20'
                  : 'glass-sacred text-white/50 hover:text-white/80'
                  }`}
              >
                {view.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            {/* Search */}
            <div className="relative">
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar..."
                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 pl-9 text-sm text-white/80 placeholder-white/20 focus:border-psyche-violet/30 outline-none w-40 sm:w-56"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm">🔍</span>
            </div>

            <button
              onClick={() => { setShowNewPost(!showNewPost); setActiveView('nuevo'); }}
              className="vesica-btn px-5 py-2.5 gradient-psyche text-white text-sm font-semibold hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-psyche-violet/20"
            >
              ✍️ Nuevo Post
            </button>
          </div>
        </div>

        {/* Nuevo post form */}
        {(showNewPost || activeView === 'nuevo') && (
          <div className="mb-8">
            <NewPostForm onClose={() => { setShowNewPost(false); setActiveView('foro'); }} currentUser={currentUser} />
          </div>
        )}

        {/* Main content */}
        {activeView === 'foro' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            {/* Left: Threads */}
            <div className="space-y-6">
              {/* Categorías filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer ${!activeCategory ? 'gradient-psyche text-white' : 'bg-white/5 text-white/40 hover:text-white/60'
                    }`}
                >
                  Todos
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer ${activeCategory === cat.id ? 'text-white' : 'bg-white/5 text-white/40 hover:text-white/60'
                      }`}
                    style={{
                      background: activeCategory === cat.id ? `${cat.color}30` : undefined,
                      color: activeCategory === cat.id ? cat.color : undefined,
                    }}
                  >
                    {cat.emoji} {cat.name}
                  </button>
                ))}
              </div>

              {/* Thread list */}
              <div className="space-y-3">
                {filteredThreads.map(thread => (
                  <ThreadCard key={thread.id} thread={thread} />
                ))}
              </div>

              {filteredThreads.length === 0 && (
                <div className="text-center py-16">
                  <span className="text-4xl block mb-4">🔍</span>
                  <p className="text-white/40">No se encontraron threads con esos criterios</p>
                </div>
              )}

              {/* Pagination hint */}
              <div className="text-center py-4">
                <button className="vesica-btn px-8 py-3 glass-sacred text-sm text-white/50 hover:text-white/80 cursor-pointer">
                  Cargar más threads...
                </button>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-4">
              <TopContributors />
              <CommunityRules />

              {/* Categorías con stats */}
              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                <h4 className="text-sm font-bold text-white/70 mb-4">📂 Categorías</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                      className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-all cursor-pointer ${activeCategory === cat.id ? 'bg-white/5' : 'hover:bg-white/[0.03]'
                        }`}
                    >
                      <span className="text-sm">{cat.emoji}</span>
                      <span className="text-xs text-white/60 flex-1 truncate">{cat.name}</span>
                      <span className="text-[10px] text-white/20">{cat.threadCount}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vista: Experiencias */}
        {activeView === 'experiencias' && (
          <div className="space-y-8">
            {/* Header de experiencias */}
            <div className="p-6 rounded-2xl border border-amber-500/15 bg-amber-500/[0.03]">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📖</span>
                <div>
                  <h4 className="text-base font-bold text-white/90 mb-1">Relatos de Experiencias</h4>
                  <p className="text-sm text-white/40">
                    Experiencias reales compartidas por la comunidad. Cada relato incluye sustancia, dosis, setting, intención
                    y una narración honesta. <span className="text-amber-400/70">Los relatos honestos (incluidos los difíciles) salvan vidas.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Grid de experiencias */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {combinedReports.map(report => (
                <ExperienceCard key={report.id} report={report} />
              ))}
            </div>

            {/* Formulario de nueva experiencia */}
            <div className="text-center">
              <button
                onClick={() => { setShowNewPost(true); setActiveView('nuevo'); }}
                className="vesica-btn px-8 py-3 gradient-psyche text-white text-sm font-semibold hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-psyche-violet/20"
              >
                📖 Compartir mi experiencia
              </button>
              <p className="text-xs text-white/25 mt-3">Tu relato puede ayudar a otra persona a tener una experiencia más segura</p>
            </div>
          </div>
        )}

        {/* Nota final */}
        <div className="mt-16 p-6 rounded-2xl border border-psyche-violet/10 bg-psyche-violet/[0.02] text-center">
          <p className="text-sm text-white/40 max-w-2xl mx-auto">
            <span className="text-lg block mb-3">🌐</span>
            Esta comunidad está en fase de lanzamiento. Pronto podrás crear tu perfil, seguir a otros usuarios,
            guardar threads favoritos y recibir notificaciones. <span className="text-psyche-violet/70">Únete a la lista de espera</span> para
            ser de los primeros en participar.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <input
              placeholder="tu@email.com"
              className="bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm text-white/80 placeholder-white/20 focus:border-psyche-violet/30 outline-none w-full sm:w-72"
            />
            <button className="vesica-btn px-6 py-2.5 gradient-psyche text-white text-sm font-semibold hover:scale-105 transition-transform cursor-pointer">
              Unirme a la lista de espera
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
