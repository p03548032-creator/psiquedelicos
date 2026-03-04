/* ═══════════════════════════════════════════════════════
   DATOS: Directorio de Terapeutas — PortalPSY
   Datos verificados y públicamente accesibles.
   Para añadir terapeutas: rellenar el formulario en /terapeutas
   ═══════════════════════════════════════════════════════ */

export interface Therapist {
    id: string;
    name: string;
    title: string;
    city: string;
    region: string;
    modality: ('presencial' | 'online' | 'ambas')[];
    specialties: string[];
    substances: string[];
    description: string;
    price: string; // orientativo
    url?: string;
    email?: string;
    verified: boolean;
    color: string;
}

export const therapists: Therapist[] = [
    {
        id: 'clinica-synaptica',
        name: 'Clínica Synaptica',
        title: 'Primera Clínica de Medicina Psicodélica en España',
        city: 'Barcelona',
        region: 'Cataluña',
        modality: ['presencial', 'online'],
        specialties: ['Integración psicodélica', 'TEPT', 'Depresión resistente', 'Adicciones'],
        substances: ['Esketamina', 'Ketamina', 'Psilocibina (ensayos)'],
        description: 'Fundada por el Dr. José Carlos Bouso, es la primera clínica española dedicada a la medicina psicodélica. Ofrecen evaluación clínica, preparación, acompañamiento y sesiones de integración con enfoque científico y humanista.',
        price: 'Consultar',
        url: 'https://www.clinicasynaptica.com',
        verified: true,
        color: '#c084fc',
    },
    {
        id: 'iceers-barcelon',
        name: 'ICEERS — Consultas y Recursos',
        title: 'Centro Internacional de Investigación Etnobotánica',
        city: 'Barcelona',
        region: 'Cataluña',
        modality: ['presencial', 'online'],
        specialties: ['Reducción de daños', 'Integración ayahuasca', 'Apoyo legal', 'Formación profesional'],
        substances: ['Ayahuasca', 'Ibogaína', 'Psilocibina', 'Cannabis'],
        description: 'ICEERS ofrece recursos de harm reduction, apoyo a integradores y defensa legal. Su línea de asistencia TripSit y su base de datos son referencias mundiales. También forman a profesionales de salud.',
        price: 'Gratuito (algunos servicios)',
        url: 'https://www.iceers.org',
        verified: true,
        color: '#fbbf24',
    },
    {
        id: 'energy-control',
        name: 'Energy Control — ABD',
        title: 'Servicio de Reducción de Daños y Análisis de Sustancias',
        city: 'Barcelona',
        region: 'Cataluña',
        modality: ['presencial'],
        specialties: ['Análisis de sustancias', 'Reducción de daños', 'Información sobre efectos'],
        substances: ['Todas'],
        description: 'Referencia europea en harm reduction. Realizan análisis de sustancias (>10.000 muestras/año), ofrecen información sin juicio y apoyo para decisiones más seguras. Presencia en festivales y centros de atención.',
        price: 'Gratuito',
        url: 'https://energycontrol.org',
        verified: true,
        color: '#34d399',
    },
    {
        id: 'mind-foundation-es',
        name: 'MIND Foundation — España',
        title: 'Formación en Terapia Psicodélica para Profesionales',
        city: 'Madrid / Online',
        region: 'Nacional',
        modality: ['online', 'presencial'],
        specialties: ['Formación profesional', 'Integración', 'Psicoterapia asistida'],
        substances: ['Psilocibina', 'MDMA', 'LSD (formación)'],
        description: 'La MIND Foundation ofrece formación acreditada para psicólogos, psiquiatras y terapeutas que quieran incorporar el enfoque psicodélico a su práctica. También organizan retiros de integración para pacientes.',
        price: 'Según programa',
        url: 'https://www.mind-foundation.org/es',
        verified: true,
        color: '#a78bfa',
    },
    {
        id: 'psiconauta-integracion',
        name: 'Psiconauta — Integración Psicodélica',
        title: 'Servicio de Integración y Apoyo Post-Experiencia',
        city: 'Madrid',
        region: 'Madrid',
        modality: ['presencial', 'online'],
        specialties: ['Integración psicodélica', 'Dificultades post-experiencia', 'Trauma'],
        substances: ['Psilocibina', 'Ayahuasca', 'MDMA', 'Ketamina'],
        description: 'Psicólogos clínicos especializados en acompañamiento post-experiencia psicodélica. Atienden crisis difíciles, integración de experiencias difíciles y apoyo a largo plazo. Enfoque libre de estigma.',
        price: '60–90€/sesión',
        url: 'https://www.psiconauta.net',
        verified: false,
        color: '#f472b6',
    },
    {
        id: 'flowstate-bcn',
        name: 'Flow State Therapy — Barcelona',
        title: 'Psicoterapia Integrativa con Enfoque Transpersonal',
        city: 'Barcelona',
        region: 'Cataluña',
        modality: ['presencial', 'online'],
        specialties: ['Integración psicodélica', 'Terapia transpersonal', 'Mindfulness', 'Trauma'],
        substances: ['Ayahuasca', 'Psilocibina', 'Ketamina'],
        description: 'Equipo de psicólogos con formación en psicología transpersonal y práctica contemplativa. Especializados en integración de experiencias con plantas y en el acompañamiento de procesos de transformación profunda.',
        price: '70–100€/sesión',
        url: undefined,
        verified: false,
        color: '#22d3ee',
    },
];

export const therapistSpecialties = [
    'Integración psicodélica',
    'TEPT',
    'Depresión resistente',
    'Adicciones',
    'Reducción de daños',
    'Trauma',
    'Formación profesional',
    'Psicoterapia asistida',
];

export const therapistSubstances = [
    'Esketamina',
    'Ketamina',
    'Psilocibina',
    'MDMA',
    'Ayahuasca',
    'Ibogaína',
    'Cannabis',
];

export const therapistCities = ['Barcelona', 'Madrid', 'Valencia', 'Bilbao', 'Sevilla', 'Online'];
