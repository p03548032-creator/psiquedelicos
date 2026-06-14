export interface SubstanceCore {
  id: string;
  name: string;
  aka: string;
  emoji: string;
  iconKey: string;
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

export const substancesCore: SubstanceCore[] = [
  {
    id: 'lsd',
    name: 'LSD-25',
    aka: 'Ácido, Tripi, Lucy',
    emoji: '🌈',
    iconKey: 'Eye',
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
    iconKey: 'Leaf',
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
    iconKey: 'Sparkles',
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
    iconKey: 'Droplet',
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
    iconKey: 'Leaf',
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
    iconKey: 'Beaker',
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
