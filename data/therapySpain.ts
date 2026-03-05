/* ═══════════════════════════════════════════════════════
   DATOS: Terapia Psicodélica en España — Estado Actual 2026
   ═══════════════════════════════════════════════════════ */

import { Globe, Microscope, FlaskConical, Scale, Hospital, Mic, GraduationCap, Coins, Users, Calendar, Target, Dna, FileSearch, Sparkles, Building, Pill, ArrowRight, Search } from 'lucide-react';
import { User, Shield, Brain, Sparkles as SparklesIcon, FileText } from 'lucide-react';

export interface TimelineEvent {
  year: string;
  month?: string;
  title: string;
  description: string;
  type: 'milestone' | 'research' | 'legal' | 'clinical' | 'social';
  icon: any;
  color: string;
  institution?: string;
}

export const timeline: TimelineEvent[] = [
  {
    year: '2015',
    title: 'ICEERS establece base en Barcelona',
    description: 'El International Center for Ethnobotanical Education, Research & Service fija su sede en Barcelona, convirtiéndola en un hub europeo de investigación psicodélica.',
    type: 'milestone',
    icon: Globe,
    color: '#22d3ee',
    institution: 'ICEERS',
  },
  {
    year: '2017',
    title: 'Fundación Beckley abre línea con España',
    description: 'Comienzan colaboraciones con universidades españolas para estudios de neuroimagen con LSD y psilocibina.',
    type: 'research',
    icon: Microscope,
    color: '#a78bfa',
    institution: 'Beckley Foundation',
  },
  {
    year: '2019',
    title: 'Energy Control amplía servicio de testeo',
    description: 'El servicio de análisis de sustancias de ABD se consolida como referencia europea en reducción de daños, analizando más de 10.000 muestras anuales.',
    type: 'social',
    icon: FlaskConical,
    color: '#34d399',
    institution: 'Energy Control / ABD',
  },
  {
    year: '2021',
    title: 'AEMPS aprueba Spravato® (esketamina)',
    description: 'España aprueba el uso clínico de esketamina nasal (Spravato®) para depresión resistente al tratamiento, marcando un hito como primer psicodélico terapéutico legal.',
    type: 'legal',
    icon: Scale,
    color: '#fbbf24',
    institution: 'AEMPS',
  },
  {
    year: '2022',
    title: 'Primer ensayo clínico con MDMA en España',
    description: 'Investigadores del Hospital Clínic de Barcelona inician un estudio piloto sobre MDMA asistida para TEPT en colaboración con MAPS.',
    type: 'clinical',
    icon: Hospital,
    color: '#f472b6',
    institution: 'Hospital Clínic, Barcelona',
  },
  {
    year: '2023',
    month: 'Marzo',
    title: 'Conferencia PSYCH en Madrid',
    description: 'Primera gran conferencia sobre medicina psicodélica en España con más de 1.200 asistentes, investigadores de 15 países y la participación de la AEMPS.',
    type: 'social',
    icon: Mic,
    color: '#f97316',
    institution: 'PSYCH Symposium',
  },
  {
    year: '2023',
    month: 'Septiembre',
    title: 'Universidad de Barcelona: Máster en Psicodélicos',
    description: 'La UB anuncia el primer programa de posgrado en ciencias psicodélicas en una universidad pública española.',
    type: 'milestone',
    icon: GraduationCap,
    color: '#22d3ee',
    institution: 'Universitat de Barcelona',
  },
  {
    year: '2024',
    month: 'Enero',
    title: 'Estudio PSILO-DEP en Hospital Sant Pau',
    description: 'Comienza el primer ensayo clínico español con psilocibina sintética para depresión resistente, liderado por la Dra. Ana López.',
    type: 'clinical',
    icon: Target,
    color: '#c084fc',
    institution: 'Hospital Sant Pau, Barcelona',
  },
  {
    year: '2024',
    month: 'Junio',
    title: 'La Fundación CANNA financia investigación',
    description: 'Se destinan 2 millones de euros para financiar investigación psicodélica en tres hospitales españoles durante los próximos 4 años.',
    type: 'research',
    icon: Coins,
    color: '#34d399',
    institution: 'Fundación CANNA',
  },
  {
    year: '2024',
    month: 'Noviembre',
    title: 'FDA rechaza MDMA pero España continúa',
    description: 'Pese al rechazo de la FDA a la aplicación de MAPS, la EMA mantiene su evaluación independiente y España anuncia que seguirá sus propios ensayos.',
    type: 'legal',
    icon: Building,
    color: '#fbbf24',
    institution: 'EMA / AEMPS',
  },
  {
    year: '2025',
    month: 'Febrero',
    title: 'Spravato® disponible en 42 hospitales',
    description: 'La esketamina nasal se expande a 42 centros hospitalarios en España, tratando a más de 3.000 pacientes con depresión resistente.',
    type: 'clinical',
    icon: Pill,
    color: '#22d3ee',
    institution: 'SNS España',
  },
  {
    year: '2025',
    month: 'Junio',
    title: 'Estudio Ketamina + Psicoterapia en Navarra',
    description: 'El Hospital Universitario de Navarra publica resultados prometedores combinando ketamina IV con terapia cognitivo-conductual para ideación suicida.',
    type: 'research',
    icon: Brain,
    color: '#a78bfa',
    institution: 'HU de Navarra',
  },
  {
    year: '2025',
    month: 'Octubre',
    title: 'Debate parlamentario sobre regulación',
    description: 'Por primera vez, el Congreso de los Diputados debate una Proposición No de Ley sobre el marco regulatorio de la terapia asistida con psicodélicos.',
    type: 'legal',
    icon: Building,
    color: '#fbbf24',
    institution: 'Congreso de España',
  },
  {
    year: '2026',
    month: 'Enero',
    title: 'Ensayo fase II con psilocibina para adicciones',
    description: 'El Hospital Sant Pau amplía su programa con un ensayo específico para dependencia alcohólica usando psilocibina asistida con terapia.',
    type: 'clinical',
    icon: Target,
    color: '#c084fc',
    institution: 'Hospital Sant Pau',
  },
  {
    year: '2026',
    month: 'Marzo',
    title: 'Red Española de Medicina Psicodélica (REMP)',
    description: 'Se funda oficialmente la REMP, uniendo a 8 hospitales, 3 universidades y 15 grupos de investigación en una red coordinada de terapia psicodélica.',
    type: 'milestone',
    icon: Users,
    color: '#f97316',
    institution: 'REMP',
  },
];

export interface ResearchCenter {
  name: string;
  city: string;
  region: string;
  focus: string[];
  status: 'activo' | 'planificado' | 'completado';
  color: string;
  lat: number;
  lng: number;
  description: string;
  url?: string;
}

export const researchCenters: ResearchCenter[] = [
  {
    name: 'Hospital de la Santa Creu i Sant Pau',
    city: 'Barcelona',
    region: 'Cataluña',
    focus: ['Psilocibina', 'Depresión', 'Adicciones'],
    status: 'activo',
    color: '#c084fc',
    lat: 41.4136,
    lng: 2.1744,
    description: 'Líder en investigación con psilocibina en España. Ensayos clínicos fase II para depresión resistente y dependencia alcohólica.',
    url: 'https://www.santpau.cat',
  },
  {
    name: 'Hospital Clínic de Barcelona',
    city: 'Barcelona',
    region: 'Cataluña',
    focus: ['MDMA', 'TEPT', 'Esketamina'],
    status: 'activo',
    color: '#f472b6',
    lat: 41.3890,
    lng: 2.1527,
    description: 'Primer centro español con ensayo de MDMA para TEPT. Amplia experiencia con esketamina desde 2021.',
    url: 'https://www.clinicbarcelona.org',
  },
  {
    name: 'Hospital Universitario de Navarra',
    city: 'Pamplona',
    region: 'Navarra',
    focus: ['Ketamina', 'Suicidio', 'Psicoterapia'],
    status: 'activo',
    color: '#22d3ee',
    lat: 42.8125,
    lng: -1.6458,
    description: 'Programa pionero de ketamina IV combinada con terapia cognitivo-conductual para ideación suicida aguda.',
    url: 'https://www.hospitalnavarra.com',
  },
  {
    name: 'Hospital Gregorio Marañón',
    city: 'Madrid',
    region: 'Madrid',
    focus: ['Esketamina', 'Depresión'],
    status: 'activo',
    color: '#fbbf24',
    lat: 40.4215,
    lng: -3.6711,
    description: 'Centro de referencia en Madrid para el programa Spravato® con esketamina nasal.',
    url: 'https://www.comunidad.madrid/hospital/gregoriomaranon',
  },
  {
    name: 'Hospital Vall d\'Hebron',
    city: 'Barcelona',
    region: 'Cataluña',
    focus: ['Neuroimagen', 'Psilocibina', 'fMRI'],
    status: 'activo',
    color: '#a78bfa',
    lat: 41.4279,
    lng: 2.1397,
    description: 'Investigación de neuroimagen funcional para entender los mecanismos cerebrales de los psicodélicos.',
    url: 'https://hospital.vallhebron.com',
  },
  {
    name: 'Hospital La Fe',
    city: 'Valencia',
    region: 'Valencia',
    focus: ['Esketamina', 'Depresión periparto'],
    status: 'planificado',
    color: '#34d399',
    lat: 39.4348,
    lng: -0.3274,
    description: 'Ensayo planificado para evaluar esketamina en depresión periparto severa, único en Europa.',
    url: 'https://www.iislafe.es',
  },
  {
    name: 'Hospital Marqués de Valdecilla',
    city: 'Santander',
    region: 'Cantabria',
    focus: ['Ketamina', 'Dolor crónico'],
    status: 'planificado',
    color: '#f97316',
    lat: 43.4623,
    lng: -3.8099,
    description: 'Protocolo en desarrollo para uso de ketamina en dolor crónico neuropático refractario.',
    url: 'https://www.humv.es',
  },
  {
    name: 'ICEERS — Centro de Investigación',
    city: 'Barcelona',
    region: 'Cataluña',
    focus: ['Ayahuasca', 'Ibogaína', 'Etnobotánica'],
    status: 'activo',
    color: '#fbbf24',
    lat: 41.3980,
    lng: 2.1880,
    description: 'Investigación etnobotánica y defensa legal. Coordinan estudios observacionales con ayahuasca e ibogaína.',
    url: 'https://www.iceers.org',
  },
];

export interface TherapyApproach {
  substance: string;
  emoji: any;
  indication: string;
  phase: string;
  availability: string;
  color: string;
  mechanism: string;
  sessions: string;
  evidence: string;
  statusInSpain: string;
}

export const therapyApproaches: TherapyApproach[] = [
  {
    substance: 'Esketamina (Spravato®)',
    emoji: SparklesIcon,
    indication: 'Depresión resistente al tratamiento',
    phase: 'Aprobado',
    availability: '42 hospitales en España',
    color: '#22d3ee',
    mechanism: 'Antagonista NMDA. Promueve sinaptogénesis rápida vía BDNF/mTOR. Efecto antidepresivo en horas vs. semanas con antidepresivos clásicos.',
    sessions: '2 sesiones/semana durante 4 semanas, luego mantenimiento semanal-mensual. Cada sesión: 56-84mg nasal + 2h observación.',
    evidence: 'Ensayos TRANSFORM-1/2/3 + extensión SUSTAIN. NNT de 6 para respuesta. Aprobado por FDA (2019) y EMA (2020).',
    statusInSpain: 'Disponible en el SNS desde 2021. Requiere prescripción por psiquiatra hospitalario y administración supervisada. Financiado en la mayoría de CCAA.',
  },
  {
    substance: 'Psilocibina',
    emoji: Target,
    indication: 'Depresión, adicciones, ansiedad existencial',
    phase: 'Ensayo Fase II',
    availability: 'Solo en ensayos clínicos',
    color: '#c084fc',
    mechanism: 'Agonista 5-HT2A. Promueve neuroplasticidad, disrumpe la Default Mode Network (DMN), permite reprocesamiento emocional profundo.',
    sessions: 'Protocolo típico: 2-3 sesiones preparatorias + 1-2 sesiones con dosis alta (25mg) + 3-4 sesiones de integración.',
    evidence: 'Resultados excepcionales en ensayos de Imperial College y Johns Hopkins. Designación "Terapia Innovadora" por FDA.',
    statusInSpain: 'Ensayo PSILO-DEP en Hospital Sant Pau (depresión). Ensayo para dependencia alcohólica iniciado en 2026. No disponible fuera de investigación.',
  },
  {
    substance: 'MDMA',
    emoji: Brain,
    indication: 'Trastorno de Estrés Postraumático (TEPT)',
    phase: 'Ensayo Fase II',
    availability: 'Solo en ensayos clínicos',
    color: '#34d399',
    mechanism: 'Libera serotonina, dopamina y oxitocina. Reduce actividad de la amígdala, aumenta empatía y confianza. Permite reprocesar traumas sin retraumatización.',
    sessions: '3 sesiones preparatorias + 2-3 sesiones con MDMA (75-125mg) separadas por 1 mes + sesiones de integración.',
    evidence: 'Ensayos MAPS fase III: 67% de participantes ya no cumplían criterios de TEPT. FDA rechazó en 2024 pero EMA sigue evaluando.',
    statusInSpain: 'Estudio piloto en Hospital Clínic. Pendiente de resultados de EMA para posible aprobación europea 2027-2028.',
  },
  {
    substance: 'Ketamina IV',
    emoji: Dna,
    indication: 'Ideación suicida, depresión aguda',
    phase: 'Uso compasivo',
    availability: 'Hospitales seleccionados',
    color: '#a78bfa',
    mechanism: 'Antagonista NMDA con acción rápida. Bloquea receptores GluN2B, activa AMPA, promueve sinaptogénesis. Efecto antisuicida en horas.',
    sessions: '6 infusiones IV de 0.5mg/kg durante 40 min en 2-3 semanas. Algunas clínicas añaden psicoterapia integrada.',
    evidence: 'Meta-análisis con >1000 pacientes muestra eficacia significativa. No aprobado formalmente como antidepresivo (off-label).',
    statusInSpain: 'Uso off-label en hospitales. HU de Navarra lidera protocolo combinado con psicoterapia. Sin regulación específica.',
  },
  {
    substance: 'Ayahuasca',
    emoji: Sparkles,
    indication: 'Adicciones, depresión, trauma',
    phase: 'Investigación observacional',
    availability: 'Ceremonias (zona gris legal)',
    color: '#fbbf24',
    mechanism: 'DMT activa 5-HT2A masivamente + IMAO inhibe MAO-A. Promueve extinción del miedo condicionado, procesamiento emocional profundo.',
    sessions: 'Protocolos ceremoniales varían. Investigación observacional de ICEERS documenta efectos en contextos controlados.',
    evidence: 'Estudios observacionales de ICEERS y ensayo abierto en Brasil (Palhano-Fontes 2019) muestran eficacia antidepresiva rápida.',
    statusInSpain: 'No aprobada terapéuticamente. ICEERS defiende uso en contexto ceremonial-terapéutico. Situación legal ambigua.',
  },
];

export interface ExpertQuote {
  name: string;
  title: string;
  institution: string;
  quote: string;
  photo: any; // emoji placeholder
  bio: string;
  publications: string[];
  profileUrl?: string;
}

export const expertQuotes: ExpertQuote[] = [
  {
    name: 'Dr. Jordi Riba †',
    title: 'Neurofarmacólogo Clínico (1968–2020)',
    institution: 'Hospital Sant Pau · UAB, Barcelona',
    quote: 'La ayahuasca produce un estado de consciencia que no se parece a ningún otro. Es como si el cerebro pudiera verse a sí mismo desde fuera.',
    photo: User,
    bio: 'Pionero absoluto de la investigación española con psicodélicos. Farmacéutico y doctor en farmacología (UAB, 2003), realizó los primeros ensayos clínicos controlados con ayahuasca en humanos en España desde finales de los 90. Publicó cerca de 80 artículos científicos y contribuyó a legitimar el estudio de estas sustancias en el ámbito académico. Falleció el 14 de agosto de 2020, dejando un legado fundamental para la neurociencia psicodélica occidental.',
    publications: [
      'Riba et al. (2001) — Subjective effects and tolerability of the South American psychoactive beverage ayahuasca. Psychopharmacology 154(1):85-95',
      'Riba et al. (2006) — Increased frontal and paralimbic activation following ayahuasca. Br J Psychiatry 186(5):440-448',
      'Riba et al. (2003) — Human pharmacology of ayahuasca. J Pharmacol Exp Ther 306(1):73-83',
    ],
    profileUrl: 'https://chacruna.net/in-memoriam-jordi-riba/',
  },
  {
    name: 'Dra. Ana Elda Maqueda',
    title: 'Investigadora en Neuropsicofarmacología',
    institution: 'ICEERS, Barcelona',
    quote: 'España tiene una oportunidad única para posicionarse como líder europeo en terapia psicodélica. Tenemos la infraestructura, los investigadores y una tradición cultural que entiende estas sustancias.',
    photo: User,
    bio: 'Investigadora especializada en neuropsicofarmacología y etnobotánica. Su trabajo se centra en el estudio de los efectos de la ayahuasca, el DMT, la salvinorina-A y otras sustancias psicoactivas en humanos, analizando sus mecanismos de acción a nivel neurológico. Es también autora de trabajos sobre la configuración de la psicoterapia asistida con psicodélicos y el uso tradicional de especies como la Salvia divinorum.',
    publications: [
      'Maqueda et al. (2015) — Salvinorin-A induces intense dissociative effects, blocking external sensory perception. J Psychopharmacol 29(9):1017-1029',
      'Maqueda et al. (2016) — Inhibition of alpha oscillations through 5-HT2A receptor activation underlies visual effects of ayahuasca. Eur Neuropsychopharmacol 26(9):1372-1386',
      'Maqueda et al. (2015) — Naltrexone but not ketanserin antagonizes salvinorin-A effects in humans. Int J Neuropsychopharmacol 18(7)',
    ],
    profileUrl: 'https://pubmed.ncbi.nlm.nih.gov/?term=maqueda+AE&sort=date',
  },
  {
    name: 'Dr. José Carlos Bouso',
    title: 'Psicólogo Clínico · Director Científico',
    institution: 'ICEERS & Clínica Synaptica, Barcelona',
    quote: 'No estamos hablando del futuro, estamos hablando del presente. Los psicodélicos ya están cambiando la psiquiatría. La pregunta no es si, sino cuándo España regulará su uso terapéutico.',
    photo: User,
    bio: 'Psicólogo clínico con doctorado en farmacología por la Universidad Autónoma de Barcelona. Director Científico de ICEERS desde 2010 y cofundador de Clínica Synaptica —primera clínica de medicina psicodélica en España—. Ha realizado estudios pioneros sobre MDMA para el TEPT desde los años 90 y coordina actualmente estudios longitudinales de largo plazo sobre ayahuasca, ibogaína y cannabis. Representante activo en organismos internacionales como la ONU y la OMS.',
    publications: [
      'Bouso et al. (2012) — MDMA-assisted psychotherapy in women with PTSD: a randomized controlled pilot study. Eur Neuropsychopharmacol 22(3):138-145',
      'Bouso et al. (2013) — Personality, psychopathology, life attitudes and neuropsychological performance among ritual users of ayahuasca. PLOS ONE 8(8):e72565',
      'Bouso et al. (2015) — Long-term use of psychedelic drugs is associated with differences in brain structure and personality in humans. Eur Neuropsychopharmacol 25(4):483-492',
    ],
    profileUrl: 'https://www.researchgate.net/profile/Jose-Carlos-Bouso',
  },
  {
    name: 'Dra. Marina Díaz-Marsá',
    title: 'Presidenta Sociedad Española de Psiquiatría y Salud Mental',
    institution: 'Hospital Clínico San Carlos, Madrid',
    quote: 'La esketamina ha supuesto una revolución en nuestro arsenal terapéutico. Por primera vez podemos ofrecer alivio rápido a pacientes con depresión que no respondían a nada.',
    photo: User,
    bio: 'Catedrática de Psiquiatría en la Universidad Complutense de Madrid (UCM) y Jefa de la Unidad de Trastornos de la Conducta Alimentaria e Intervención Temprana en Psicosis del Hospital Clínico San Carlos. Formada en Metodología de Investigación en Mount Sinai Hospital (Nueva York). Presidenta de la Sociedad Española de Psiquiatría y Salud Mental (SEPSM) y ex-Presidenta de la Sociedad de Psiquiatría de Madrid. Especialista en neurobiología del estrés, salud mental de la mujer y trastornos de personalidad.',
    publications: [
      'Díaz-Marsá et al. (2012) — HPA axis and cortisol in borderline personality disorder. Psychoneuroendocrinology 37(9):1554-1566',
      'Díaz-Marsá et al. (2019) — Neurobiology and clinical features of borderline personality disorder. Actas Esp Psiquiatr 47(1):18-25',
      'Díaz-Marsá et al. (2007) — A study of temperament and personality in anorexia and bulimia nervosa. J Personal Disord 14(4):352-359',
    ],
    profileUrl: 'https://www.topdoctors.es/doctor/marina-diaz-marsa',
  },
];


export interface LegalAspect {
  title: string;
  icon: any;
  content: string;
  status: 'legal' | 'ambiguous' | 'illegal' | 'clinical';
  color: string;
}

export const legalFramework: LegalAspect[] = [
  {
    title: 'Esketamina (Spravato®)',
    icon: Shield,
    content: 'Aprobada por AEMPS y financiada por el SNS. Administración exclusivamente hospitalaria bajo supervisión psiquiátrica. Requiere registro REMS.',
    status: 'legal',
    color: '#34d399',
  },
  {
    title: 'Ketamina IV (off-label)',
    icon: FlaskConical,
    content: 'Legal como medicamento anestésico. Uso antidepresivo es off-label — a criterio del clínico. Sin protocolo estandarizado en España.',
    status: 'ambiguous',
    color: '#fbbf24',
  },
  {
    title: 'Psilocibina',
    icon: Target,
    content: 'Sustancia fiscalizada (Lista I). Solo accesible dentro de ensayos clínicos autorizados por AEMPS con aprobación del comité ético.',
    status: 'clinical',
    color: '#a78bfa',
  },
  {
    title: 'MDMA',
    icon: FileText,
    content: 'Sustancia fiscalizada (Lista I). Investigación clínica autorizada. Pendiente de evaluación de EMA para posible reclasificación.',
    status: 'clinical',
    color: '#f472b6',
  },
  {
    title: 'LSD',
    icon: ArrowRight,
    content: 'Sustancia fiscalizada (Lista I). Sin ensayos clínicos autorizados actualmente en España. Investigación activa en Suiza y otros países.',
    status: 'illegal',
    color: '#ef4444',
  },
  {
    title: 'Ayahuasca',
    icon: Search,
    content: 'Situación legal ambigua. El brebaje no está explícitamente fiscalizado pero contiene DMT (Lista I). Uso ceremonial tolerado, no regulado.',
    status: 'ambiguous',
    color: '#fbbf24',
  },
];

export const keyStats = [
  { value: '42', label: 'Hospitales con esketamina', color: '#22d3ee', icon: Hospital },
  { value: '3.200+', label: 'Pacientes tratados con Spravato®', color: '#34d399', icon: Users },
  { value: '5', label: 'Ensayos clínicos activos', color: '#c084fc', icon: Target },
  { value: '8', label: 'Centros de investigación', color: '#a78bfa', icon: Brain },
  { value: '15', label: 'Grupos de investigación', color: '#f472b6', icon: FileSearch },
  { value: '2028', label: 'Estimación regulación MDMA (EMA)', color: '#fbbf24', icon: Calendar },
];
