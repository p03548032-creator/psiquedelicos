export interface ArticleCore {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  color: string;
  iconKey: string;
  emoji: string;
}

export const articlesCore: ArticleCore[] = [
  {
    id: '1',
    title: 'Microdosificación: Guía Completa 2026',
    excerpt: 'Todo lo que necesitas saber sobre protocolos de microdosis con LSD y psilocibina. Protocolos Fadiman y Stamets actualizados.',
    category: 'Guía',
    readTime: '12 min',
    color: '#a78bfa',
    iconKey: 'TestTube',
    emoji: '⚗️',
  },
  {
    id: '2',
    title: 'Terapia Psicodélica en España: Estado Actual',
    excerpt: 'Los ensayos clínicos con MDMA y psilocibina en hospitales españoles. Cronología hacia la legalización terapéutica.',
    category: 'Investigación',
    readTime: '8 min',
    color: '#f472b6',
    iconKey: 'HeartPulse',
    emoji: '🏥',
  },
  {
    id: '3',
    title: 'Set & Setting: La Ciencia del Contexto',
    excerpt: 'Por qué el 80% de la experiencia psicodélica depende del estado mental y el entorno. Cómo preparar el espacio perfecto.',
    category: 'Educación',
    readTime: '6 min',
    color: '#22d3ee',
    iconKey: 'Brain',
    emoji: '🧠',
  },
  {
    id: '4',
    title: 'Integración Post-Experiencia',
    excerpt: 'Las semanas después del viaje son tan importantes como la experiencia misma. Técnicas de integración basadas en evidencia.',
    category: 'Bienestar',
    readTime: '10 min',
    color: '#34d399',
    iconKey: 'Leaf',
    emoji: '🌱',
  },
  {
    id: '5',
    title: 'Reducción de Daños: Principios Fundamentales',
    excerpt: 'Test de sustancias, dosificación responsable, contraindicaciones y señales de alarma. Tu seguridad es lo primero.',
    category: 'Seguridad',
    readTime: '7 min',
    color: '#fbbf24',
    iconKey: 'ShieldAlert',
    emoji: '🛡️',
  },
  {
    id: '6',
    title: 'Psicodélicos y Creatividad: De Hofmann a Silicon Valley',
    excerpt: 'Cómo los psicodélicos han influido en el arte, la música, la tecnología y la ciencia. Steve Jobs, The Beatles y más allá.',
    category: 'Cultura',
    readTime: '9 min',
    color: '#f97316',
    iconKey: 'Palette',
    emoji: '🎨',
  },
];
