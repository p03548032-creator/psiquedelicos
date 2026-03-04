export interface Substance {
  id: string;
  name: string;
  aka: string;
  emoji: string;
  category: string;
  color: string;
  colorFrom: string;
  colorTo: string;
  duration: string;
  onset: string;
  description: string;
  effects: string[];
  safety: string;
  legalES: string;
}

export const substances: Substance[] = [
  {
    id: 'lsd',
    name: 'LSD-25',
    aka: 'Ácido, Tripi, Lucy',
    emoji: '🌈',
    category: 'Lisergamida',
    color: '#a78bfa',
    colorFrom: '#7c3aed',
    colorTo: '#a78bfa',
    duration: '8-12 horas',
    onset: '30-90 minutos',
    description: 'Sintetizado por Albert Hofmann en 1938, el ácido lisérgico es una de las sustancias psicoactivas más potentes conocidas. Actúa sobre los receptores 5-HT2A de serotonina, disolviendo los filtros perceptuales habituales.',
    effects: ['Sinestesia', 'Disolución del ego', 'Distorsión temporal', 'Pensamiento divergente', 'Intensificación emocional', 'Patrones fractales'],
    safety: 'No mezclar con litio ni antipsicóticos. Tener un trip-sitter de confianza. Dosis habitual: 75-200μg.',
    legalES: 'Sustancia fiscalizada en España. No penalizado el autoconsumo privado.',
  },
  {
    id: 'psilocibina',
    name: 'Psilocibina',
    aka: 'Setas mágicas, Hongos',
    emoji: '🍄',
    category: 'Triptamina',
    color: '#c084fc',
    colorFrom: '#9333ea',
    colorTo: '#c084fc',
    duration: '4-6 horas',
    onset: '20-60 minutos',
    description: 'Presente en más de 200 especies de hongos, la psilocibina se convierte en psilocina en el cuerpo. Investigaciones recientes en Johns Hopkins y Imperial College demuestran su eficacia contra la depresión resistente.',
    effects: ['Conexión emocional profunda', 'Apertura espiritual', 'Risas incontrolables', 'Conexión con la naturaleza', 'Introspección', 'Visiones orgánicas'],
    safety: 'Empezar con dosis bajas (1-1.5g secos). Identificar correctamente la especie. No mezclar con ISRS.',
    legalES: 'Las esporas son legales. El cultivo y posesión del hongo con psilocibina está fiscalizado.',
  },
  {
    id: 'dmt',
    name: 'DMT',
    aka: 'La Molécula del Espíritu',
    emoji: '👁️',
    category: 'Triptamina',
    color: '#f472b6',
    colorFrom: '#db2777',
    colorTo: '#f472b6',
    duration: '15-30 min (fumado) / 4-6h (oral+IMAO)',
    onset: 'Inmediato (fumado) / 45 min (oral)',
    description: 'La dimetiltriptamina es endógena al cuerpo humano y está presente en cientos de plantas. Rick Strassman la llamó "la molécula del espíritu" por la intensidad de las experiencias que produce, a menudo descritas como encuentros con entidades.',
    effects: ['Visiones hiperdimensionales', 'Encuentro con entidades', 'Muerte del ego completa', 'Experiencia de eternidad', 'Geometría imposible', 'Renacimiento'],
    safety: 'Experiencia extremadamente intensa. Requiere supervisión. NUNCA combinar con IMAO a menos que sea ayahuasca preparada por experto.',
    legalES: 'Sustancia fiscalizada. Plantas que la contienen no están reguladas específicamente.',
  },
  {
    id: 'mescalina',
    name: 'Mescalina',
    aka: 'Peyote, San Pedro',
    emoji: '🌵',
    category: 'Fenetilamina',
    color: '#34d399',
    colorFrom: '#059669',
    colorTo: '#34d399',
    duration: '8-12 horas',
    onset: '1-2 horas',
    description: 'Usada ceremonialmente por pueblos indígenas durante milenios, la mescalina produce una experiencia única que combina la claridad mental con la apertura emocional. Aldous Huxley documentó su experiencia en "Las Puertas de la Percepción".',
    effects: ['Colores hipersaturados', 'Empatía profunda', 'Conexión con la tierra', 'Claridad mental', 'Patrones geométricos', 'Revelaciones personales'],
    safety: 'Duración larga — planificar el día completo. Puede causar náuseas iniciales. Hidratarse bien.',
    legalES: 'Mescalina fiscalizada. Cactus ornamentales (San Pedro) legales para cultivo.',
  },
  {
    id: 'ayahuasca',
    name: 'Ayahuasca',
    aka: 'La Liana del Alma, Yagé',
    emoji: '🌿',
    category: 'DMT + IMAO',
    color: '#fbbf24',
    colorFrom: '#d97706',
    colorTo: '#fbbf24',
    duration: '4-8 horas',
    onset: '30-60 minutos',
    description: 'Brebaje ancestral amazónico que combina DMT con inhibidores de la monoaminooxidasa (IMAO). La experiencia es profundamente sanadora y purgativa, utilizada por chamanes durante siglos para diagnóstico y curación espiritual.',
    effects: ['Purga física y emocional', 'Visiones narrativas', 'Sanación de traumas', 'Conexión ancestral', 'Comprensión de la muerte', 'Renacimiento espiritual'],
    safety: 'SOLO con facilitador experimentado. Dieta previa obligatoria. Múltiples contraindicaciones farmacológicas (ISRS, IMAO, estimulantes). Riesgo de síndrome serotoninérgico.',
    legalES: 'Situación legal ambigua en España. Ceremonias se realizan en contexto religioso/terapéutico.',
  },
  {
    id: 'ketamina',
    name: 'Ketamina',
    aka: 'Keta, Special K, Vitamina K',
    emoji: '💎',
    category: 'Disociativo',
    color: '#22d3ee',
    colorFrom: '#0891b2',
    colorTo: '#22d3ee',
    duration: '1-3 horas',
    onset: '5-15 minutos',
    description: 'Originalmente un anestésico, la ketamina es el único psicodélico aprobado médicamente para depresión resistente (esketamina nasal). Actúa sobre receptores NMDA de glutamato, produciendo disociación y neuroplasticidad.',
    effects: ['Disociación cuerpo-mente', 'K-hole (dosis altas)', 'Experiencia extracorpórea', 'Pensamiento abstracto', 'Sinestesia', 'Alivio del dolor emocional'],
    safety: 'No mezclar NUNCA con depresores (alcohol, benzos, opioides). Riesgo de dependencia con uso frecuente. Daño vesical con abuso crónico.',
    legalES: 'Medicamento controlado. Uso médico legal con receta. Uso recreativo fiscalizado.',
  },
];

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  color: string;
  icon: string;
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'Microdosificación: Guía Completa 2026',
    excerpt: 'Todo lo que necesitas saber sobre protocolos de microdosis con LSD y psilocibina. Protocolos Fadiman y Stamets actualizados.',
    category: 'Guía',
    readTime: '12 min',
    color: '#a78bfa',
    icon: '⚗️',
  },
  {
    id: '2',
    title: 'Terapia Psicodélica en España: Estado Actual',
    excerpt: 'Los ensayos clínicos con MDMA y psilocibina en hospitales españoles. Cronología hacia la legalización terapéutica.',
    category: 'Investigación',
    readTime: '8 min',
    color: '#f472b6',
    icon: '🏥',
  },
  {
    id: '3',
    title: 'Set & Setting: La Ciencia del Contexto',
    excerpt: 'Por qué el 80% de la experiencia psicodélica depende del estado mental y el entorno. Cómo preparar el espacio perfecto.',
    category: 'Educación',
    readTime: '6 min',
    color: '#22d3ee',
    icon: '🧠',
  },
  {
    id: '4',
    title: 'Integración Post-Experiencia',
    excerpt: 'Las semanas después del viaje son tan importantes como la experiencia misma. Técnicas de integración basadas en evidencia.',
    category: 'Bienestar',
    readTime: '10 min',
    color: '#34d399',
    icon: '🌱',
  },
  {
    id: '5',
    title: 'Reducción de Daños: Principios Fundamentales',
    excerpt: 'Test de sustancias, dosificación responsable, contraindicaciones y señales de alarma. Tu seguridad es lo primero.',
    category: 'Seguridad',
    readTime: '7 min',
    color: '#fbbf24',
    icon: '🛡️',
  },
  {
    id: '6',
    title: 'Psicodélicos y Creatividad: De Hofmann a Silicon Valley',
    excerpt: 'Cómo los psicodélicos han influido en el arte, la música, la tecnología y la ciencia. Steve Jobs, The Beatles y más allá.',
    category: 'Cultura',
    readTime: '9 min',
    color: '#f97316',
    icon: '🎨',
  },
];

export const safetyRules = [
  { icon: '⚖️', title: 'Conoce tu sustancia', text: 'Usa kits de testeo (Ehrlich, Marquis, Mecke). Nunca consumas algo sin verificar.' },
  { icon: '🧪', title: 'Dosifica con precisión', text: 'Empieza bajo, sube despacio. Una báscula de miligramos cuesta 15€ y puede salvarte la vida.' },
  { icon: '🤝', title: 'Trip Sitter', text: 'Ten siempre a alguien sobrio de confianza, especialmente en primeras experiencias.' },
  { icon: '🏠', title: 'Set & Setting', text: 'Espacio seguro, cómodo y familiar. Estado mental positivo. Sin obligaciones al día siguiente.' },
  { icon: '💊', title: 'Interacciones', text: 'Consulta interacciones farmacológicas. ISRS, litio, IMAO y otros pueden ser peligrosos.' },
  { icon: '🆘', title: 'Plan de emergencia', text: 'Ten a mano: agua, fruta, manta, música tranquila. Saber dónde está urgencias. 112 para emergencias.' },
];
