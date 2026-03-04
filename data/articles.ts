/* ═══════════════════════════════════════════════════════
   DATOS: Artículos completos del Portal PSY
   ═══════════════════════════════════════════════════════ */

export interface ArticleFull {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  readTime: string;
  color: string;
  icon: string;
  author: string;
  date: string;
  heroQuote?: string;
  heroQuoteAuthor?: string;
  sections: {
    title: string;
    content: string;
    subsections?: { title: string; content: string }[];
    callout?: { type: 'warning' | 'info' | 'tip'; text: string };
    list?: string[];
  }[];
  references: { title: string; url?: string }[];
  relatedArticles: string[];
}

export const articlesFull: ArticleFull[] = [
  {
    id: '1',
    title: 'Microdosificación: Guía Completa 2026',
    subtitle: 'Todo sobre protocolos, sustancias, evidencia científica y experiencias reales de microdosis',
    excerpt: 'Todo lo que necesitas saber sobre protocolos de microdosis con LSD y psilocibina. Protocolos Fadiman y Stamets actualizados.',
    category: 'Guía',
    readTime: '12 min',
    color: '#a78bfa',
    icon: '⚗️',
    author: 'Equipo PortalPSY',
    date: '15 de enero de 2026',
    heroQuote: 'La microdosis no es un atajo hacia la iluminación. Es una herramienta sutil que amplifica lo que ya hay dentro de ti.',
    heroQuoteAuthor: 'Dr. James Fadiman',
    sections: [
      {
        title: '¿Qué es la microdosificación?',
        content: 'La microdosificación consiste en tomar dosis sub-perceptuales de sustancias psicodélicas — típicamente entre 1/10 y 1/20 de una dosis completa. A esta dosis, no se experimentan efectos psicodélicos evidentes: no hay distorsiones visuales, ni alteraciones de consciencia profundas. Lo que se busca es un efecto sutil sobre la cognición, el estado de ánimo y la creatividad.\n\nEl concepto fue popularizado por el Dr. James Fadiman a partir de 2011, cuando comenzó a recopilar informes de personas que experimentaban con esta práctica. Desde entonces, la microdosificación ha pasado de ser una práctica underground a un campo de investigación científica legítimo, con ensayos controlados en universidades como Imperial College London, la Universidad de Maastricht y la Universidad de Toronto.',
      },
      {
        title: 'Sustancias utilizadas',
        content: 'Las dos sustancias más comunes para microdosis son el LSD y la psilocibina, aunque también se experimenta con mescalina, DMT y derivados como el 1P-LSD.',
        subsections: [
          {
            title: 'LSD (Ácido Lisérgico)',
            content: 'Dosis: 5-20 μg (microgramos). Duración del efecto: 8-12 horas de efecto sutil. Ventajas: duración larga, fácil de dosificar con dilución volumétrica, energizante. Consideraciones: puede interferir con el sueño si se toma tarde. La dilución volumétrica (disolver un blotter en agua destilada o vodka y dosificar con jeringa) es el método más preciso.',
          },
          {
            title: 'Psilocibina (Setas)',
            content: 'Dosis: 0.1-0.3 g de setas secas (o 1-3 mg de psilocibina sintética). Duración del efecto: 4-6 horas de efecto sutil. Ventajas: más "orgánica" y emocional, duración más corta, menos interferencia con el sueño. Consideraciones: la potencia varía según la especie y el lote. Psilocybe cubensis es la más estandarizada. Se recomienda moler y homogeneizar las setas para mayor consistencia.',
          },
        ],
      },
      {
        title: 'Protocolos de microdosificación',
        content: 'Existen varios protocolos establecidos, cada uno con su propia lógica y calendario.',
        subsections: [
          {
            title: 'Protocolo Fadiman (1 día sí, 2 días no)',
            content: 'Día 1: Microdosis. Día 2: Transición (efectos residuales sutiles). Día 3: Descanso. Repetir. Duración recomendada: 4-8 semanas, luego descanso de 2-4 semanas. Este es el protocolo más estudiado y el más conservador. Permite evaluar claramente los efectos del día de dosis vs. los días sin ella.',
          },
          {
            title: 'Protocolo Stamets (4 días sí, 3 días no)',
            content: 'Días 1-4: Microdosis de psilocibina + niacina (100-200mg) + Lion\'s Mane (500mg-1g). Días 5-7: Descanso. Paul Stamets propone esta combinación "stack" argumentando que la niacina facilita la distribución de la psilocibina a las neuronas periféricas, y el Lion\'s Mane potencia la neurogénesis. Aunque la evidencia científica de esta sinergia es limitada, muchos usuarios reportan resultados positivos.',
          },
          {
            title: 'Protocolo Nightcap (antes de dormir)',
            content: 'Microdosis baja tomada 30-60 minutos antes de dormir. Algunos usuarios reportan sueños más vívidos y mayor claridad al despertar. Menos estudiado pero interesante para quienes experimentan ansiedad con las microdosis diurnas.',
          },
        ],
      },
      {
        title: 'Evidencia científica: ¿Qué dice la ciencia en 2026?',
        content: 'La investigación sobre microdosificación ha avanzado enormemente en los últimos años, pero los resultados son mixtos y hay que ser honestos sobre ello.',
        subsections: [
          {
            title: 'Estudios a favor',
            content: 'Estudio Maastricht 2024: 34 participantes microdosificaron trufas de psilocibina en un ensayo controlado con placebo. Se observaron mejoras significativas en pensamiento divergente y bienestar emocional. Análisis Imperial College 2025: Meta-análisis de 12 estudios que confirma efectos leves pero consistentes en regulación emocional y reducción de rumiación.',
          },
          {
            title: 'Estudios que cuestionan',
            content: 'Estudio Beckley-Imperial 2022: El ensayo controlado más grande hasta la fecha (191 participantes) no encontró diferencias significativas entre microdosis de LSD y placebo en medidas primarias, sugiriendo un fuerte efecto placebo. Auto-ceguamiento 2023: Un estudio con "ceguización ciudadana" mostró que los participantes no podían distinguir de forma fiable entre microdosis y placebo.',
          },
        ],
        callout: {
          type: 'info',
          text: 'La conclusión más honesta en 2026: los efectos de la microdosificación son probablemente reales pero pequeños, y una parte significativa del beneficio puede deberse al ritual, la intención y el efecto placebo — lo cual no los hace menos válidos.',
        },
      },
      {
        title: 'Guía práctica: cómo empezar',
        content: 'Si decides experimentar con microdosis, estas son las pautas esenciales basadas en la evidencia y la reducción de daños.',
        list: [
          'Empieza con la dosis más baja posible y ve subiendo lentamente.',
          'Lleva un diario detallado: estado de ánimo, energía, sueño, productividad, creatividad.',
          'No microdosifiques si tomas ISRS, litio u otros psicofármacos sin consultar.',
          'Usa un día libre para tu primera microdosis (para evaluar la reacción).',
          'No conduzcas ni operes maquinaria pesada los días de dosis.',
          'Toma descansos regulares: la tolerancia se desarrolla y el cuerpo necesita resetear.',
          'Testea tu sustancia con kits de reactivo (Ehrlich para LSD/psilocibina).',
          'La microdosis NO es un sustituto de la terapia profesional.',
        ],
        callout: {
          type: 'warning',
          text: 'Contraindicaciones absolutas: trastorno bipolar, esquizofrenia, antecedentes de psicosis, embarazo, lactancia. Contraindicaciones relativas: trastornos de ansiedad severos, uso de ISRS/IMAO.',
        },
      },
    ],
    references: [
      { title: 'Fadiman, J. (2011). The Psychedelic Explorer\'s Guide. Park Street Press.' },
      { title: 'Polito, V. & Stevenson, R.J. (2019). A systematic study of microdosing psychedelics. PLOS One.', url: 'https://doi.org/10.1371/journal.pone.0211023' },
      { title: 'Szigeti, B. et al. (2021). Self-blinding citizen science to explore psychedelic microdosing. eLife.', url: 'https://doi.org/10.7554/eLife.62878' },
      { title: 'de Wit, H. et al. (2022). Repeated low doses of LSD in healthy adults. Neuropsychopharmacology.' },
      { title: 'Universidad de Maastricht (2024). Psilocybin microdose effects on cognition and emotion.' },
    ],
    relatedArticles: ['3', '5', '4'],
  },
  {
    id: '2',
    title: 'Terapia Psicodélica en España: Estado Actual',
    subtitle: 'Los ensayos clínicos, la regulación y el futuro de la psiquiatría psicodélica en España',
    excerpt: 'Los ensayos clínicos con MDMA y psilocibina en hospitales españoles. Cronología hacia la legalización terapéutica.',
    category: 'Investigación',
    readTime: '8 min',
    color: '#f472b6',
    icon: '🏥',
    author: 'Equipo PortalPSY',
    date: '10 de febrero de 2026',
    heroQuote: 'No estamos hablando del futuro, estamos hablando del presente. Los psicodélicos ya están cambiando la psiquiatría.',
    heroQuoteAuthor: 'Dr. José Carlos Bouso, ICEERS',
    sections: [
      {
        title: 'España en la vanguardia europea',
        content: 'España se ha posicionado silenciosamente como uno de los países líderes en Europa en la investigación con sustancias psicodélicas aplicadas a la salud mental. Con la aprobación de la esketamina nasal (Spravato®) en 2021, ensayos clínicos activos con psilocibina y MDMA, y una comunidad científica que incluye nombres históricos como el Dr. Jordi Riba y el equipo de ICEERS, el país tiene todos los ingredientes para liderar la revolución psicodélica del continente.\n\nEn 2026, el panorama es alentador: 42 hospitales ya administran esketamina, el Hospital Sant Pau de Barcelona conduce ensayos con psilocibina, el Hospital Clínic trabaja con MDMA para TEPT, y se ha fundado la Red Española de Medicina Psicodélica (REMP) uniendo 8 hospitales y 15 grupos de investigación.',
      },
      {
        title: 'Esketamina: el pionero',
        content: 'La esketamina nasal (Spravato®, Janssen) es actualmente el único psicodélico aprobado para uso terapéutico en España. Su aprobación por la AEMPS en 2021, siguiendo la autorización de la EMA, marcó un antes y un después.\n\nEl tratamiento está indicado para adultos con trastorno depresivo mayor que no han respondido a al menos dos antidepresivos. Se administra exclusivamente en hospitales o centros autorizados, bajo supervisión directa durante al menos 2 horas. En 2025, 42 hospitales en 15 comunidades autónomas ofrecen este tratamiento, y más de 3.200 pacientes han sido tratados.\n\nLos resultados en la práctica clínica real confirman los datos de los ensayos: respuesta en el 45-55% de pacientes, con remisión en el 25-30%. Lo más notable es la rapidez: muchos pacientes reportan mejoría en las primeras 24-48 horas, frente a las 4-6 semanas de los antidepresivos convencionales.',
      },
      {
        title: 'Psilocibina: la promesa más cercana',
        content: 'El Hospital de la Santa Creu i Sant Pau de Barcelona lidera la investigación con psilocibina en España. El ensayo PSILO-DEP, iniciado en enero de 2024, evalúa la psilocibina sintética (25 mg) en pacientes con depresión resistente al tratamiento.\n\nEl protocolo sigue el modelo desarrollado por el Imperial College London: sesiones preparatorias con el equipo terapéutico, una o dos sesiones con dosis alta en un entorno controlado y confortable, y varias sesiones de integración posteriores. Todo bajo supervisión de psiquiatras y psicólogos.\n\nEn 2026, el programa se ha ampliado para incluir un segundo ensayo: psilocibina asistida con terapia para dependencia alcohólica. Los resultados preliminares son prometedores, con tasas de abstinencia superiores al 60% a los 6 meses.',
        callout: {
          type: 'info',
          text: 'Para participar en los ensayos clínicos, los pacientes deben ser remitidos por su psiquiatra. Los criterios de inclusión son estrictos y la demanda supera la oferta de plazas disponibles.',
        },
      },
      {
        title: 'MDMA: el camino complicado',
        content: 'La MDMA asistida con psicoterapia para el TEPT es quizás la terapia psicodélica con más evidencia acumulada, gracias a los ensayos de fase III de MAPS que mostraron que el 67% de los participantes dejaron de cumplir criterios de TEPT tras el tratamiento.\n\nSin embargo, el camino no ha sido lineal. En 2024, la FDA rechazó la solicitud de aprobación de MAPS, citando deficiencias metodológicas y preocupaciones sobre el ceguimiento de los estudios. Esto no ha detenido la investigación europea: la EMA mantiene su propia evaluación independiente, y España ha decidido continuar sus propios ensayos.\n\nEl Hospital Clínic de Barcelona mantiene su estudio piloto de MDMA para TEPT, y los resultados preliminares españoles son consistentes con los datos internacionales. La estimación actual es que la EMA podría pronunciarse sobre la MDMA terapéutica entre 2027 y 2028.',
      },
      {
        title: 'Marco legal: complejidad y esperanza',
        content: 'El panorama legal español para los psicodélicos terapéuticos es un mosaico de situaciones:\n\n• Esketamina (Spravato®): Completamente legal y financiada por el SNS.\n• Ketamina IV: Legal como medicamento, uso antidepresivo off-label.\n• Psilocibina: Sustancia fiscalizada, solo accesible en ensayos clínicos autorizados por AEMPS.\n• MDMA: Sustancia fiscalizada, investigación clínica autorizada.\n• LSD: Sustancia fiscalizada, sin ensayos clínicos activos en España.\n• Ayahuasca: Situación ambigua, uso ceremonial tolerado.\n\nEl debate parlamentario de octubre de 2025, donde se discutió por primera vez una Proposición No de Ley sobre terapia psicodélica, señala que el tema ha llegado a la agenda política. Aunque no se aprobó ninguna medida concreta, el simple hecho de que se debata en el Congreso es un avance significativo.',
      },
      {
        title: '¿Qué esperar en los próximos años?',
        content: 'Las proyecciones más realistas para España son:\n\n2026-2027: Resultados de los ensayos españoles con psilocibina y MDMA. Posible ampliación del programa Spravato® a más hospitales.\n\n2027-2028: Decisión de la EMA sobre MDMA terapéutica. Si es positiva, España podría implementar programas de acceso en 6-12 meses.\n\n2028-2030: Posible inicio de ensayos con psilocibina de fase III en Europa. Desarrollo de formación especializada para terapeutas psicodélicos.\n\nMientras tanto, la Red Española de Medicina Psicodélica (REMP) trabaja para coordinar la investigación, establecer protocolos compartidos y formar a la próxima generación de psiquiatras y psicólogos en terapia asistida con psicodélicos.',
        callout: {
          type: 'tip',
          text: 'Si eres profesional de salud mental interesado en este campo, la Universitat de Barcelona ofrece desde 2023 un programa de posgrado en ciencias psicodélicas, el primero en una universidad pública española.',
        },
      },
    ],
    references: [
      { title: 'Hospital Sant Pau — Ensayo PSILO-DEP. Registro de ensayos clínicos.' },
      { title: 'MAPS (2024). MDMA-assisted therapy for PTSD: FDA Advisory Committee briefing.' },
      { title: 'Janssen (2023). SPRAVATO® (esketamina) — Ficha técnica AEMPS.' },
      { title: 'ICEERS (2025). Annual Report on Psychedelic Research in Spain.', url: 'https://www.iceers.org' },
      { title: 'Congreso de los Diputados (2025). Proposición No de Ley sobre terapia psicodélica.' },
    ],
    relatedArticles: ['1', '5', '3'],
  },
  {
    id: '3',
    title: 'Set & Setting: La Ciencia del Contexto',
    subtitle: 'Cómo el estado mental y el entorno determinan el 80% de tu experiencia psicodélica',
    excerpt: 'Por qué el 80% de la experiencia psicodélica depende del estado mental y el entorno. Cómo preparar el espacio perfecto.',
    category: 'Educación',
    readTime: '6 min',
    color: '#22d3ee',
    icon: '🧠',
    author: 'Equipo PortalPSY',
    date: '5 de diciembre de 2025',
    heroQuote: 'Los psicodélicos no son la experiencia. Son la llave. El set y el setting son la puerta.',
    heroQuoteAuthor: 'Timothy Leary',
    sections: [
      {
        title: '¿Qué es "Set & Setting"?',
        content: 'El concepto de "set & setting" fue acuñado por Timothy Leary en los años 60, aunque la idea ya existía en tradiciones indígenas desde hace milenios. Se refiere a los dos factores no-farmacológicos más importantes que determinan el curso de una experiencia psicodélica:\n\n**Set** (mindset): Tu estado mental, emocional y físico antes y durante la experiencia. Incluye tus intenciones, expectativas, miedos, estado de ánimo, nivel de cansancio, y tu relación con la sustancia.\n\n**Setting** (entorno): El lugar físico, social y cultural donde ocurre la experiencia. Incluye el espacio, la iluminación, la música, la temperatura, las personas presentes, y la sensación general de seguridad.\n\nLa investigación moderna ha confirmado lo que los chamanes siempre supieron: estos factores pueden ser más determinantes que la sustancia misma o la dosis.',
      },
      {
        title: 'La ciencia detrás del set',
        content: 'Estudios de Robin Carhart-Harris (Imperial College) y Roland Griffiths (Johns Hopkins) han demostrado que las experiencias más beneficiosas terapéuticamente se correlacionan con estados previos de apertura, confianza y voluntad de "soltar el control".\n\nPor el contrario, la ansiedad anticipatoria, la resistencia al proceso, o cargas emocionales no procesadas pueden llevar a experiencias difíciles — aunque, paradójicamente, estas experiencias "desafiantes" a veces resultan ser las más terapéuticas a largo plazo cuando son adecuadamente integradas.\n\nLa intención es particularmente importante. No se trata de tener una expectativa rígida de lo que va a pasar, sino una dirección general: "quiero explorar mi relación con la ansiedad", "quiero conectar con la gratitud", "quiero entender un patrón de comportamiento".',
        callout: {
          type: 'info',
          text: 'Dato clave: en los ensayos clínicos de Johns Hopkins, el 94% de los participantes que tuvieron una "experiencia mística completa" la describieron como una de las 5 experiencias más significativas de su vida.',
        },
      },
      {
        title: 'Preparación del set: guía práctica',
        content: 'Una buena preparación mental puede marcar la diferencia entre una experiencia transformadora y una traumática.',
        list: [
          'Días previos: reduce el estrés, duerme bien, come sano, evita conflictos.',
          'Intención: escríbela y léela antes de la sesión. Sé específico pero flexible.',
          'Emociones pendientes: si hay algo que te preocupa profundamente, considera si es el momento adecuado.',
          'Ayuno: no comer 3-4 horas antes (reduce náuseas y mejora absorción).',
          'Compromisos: asegúrate de no tener obligaciones durante 24-48h.',
          'Información: conoce la sustancia, la dosis, los efectos esperados y la duración.',
          'Meditación: 10-15 minutos de meditación antes de la ingesta pueden centrar la mente.',
          'Mantra personal: ten una frase de anclaje para momentos difíciles ("confío en el proceso", "esto pasará").',
        ],
      },
      {
        title: 'El setting ideal: creando un espacio sagrado',
        content: 'El entorno físico comunica seguridad o amenaza a un nivel profundo, y los psicodélicos amplifican esta percepción exponencialmente.',
        subsections: [
          {
            title: 'Espacio físico',
            content: 'Elige un lugar donde te sientas completamente seguro. Tu casa, la casa de un amigo de confianza, o la naturaleza (con precauciones). Evita: espacios públicos, fiestas (para experiencias profundas), lugares desconocidos. Prepara: cojines, mantas, agua, fruta, algo para dibujar/escribir. Temperatura agradable, posibilidad de ir al baño fácilmente.',
          },
          {
            title: 'Iluminación',
            content: 'La luz natural suave es ideal. Velas (seguras) o luces cálidas tenues. Evita fluorescentes y luces frías. Tener una antifaz disponible para momentos de introspección con los ojos cerrados.',
          },
          {
            title: 'Música',
            content: 'La música es una herramienta terapéutica crucial. Johns Hopkins publicó una playlist específica para sesiones de psilocibina que sigue un arco emocional: ascenso (música clásica suave), meseta (piezas orquestales intensas), descenso (música étnica/ambiental), retorno (canciones con significado personal). Evita música con letras distractoras, géneros agresivos, o tu playlist habitual de fiesta.',
          },
          {
            title: 'Personas presentes',
            content: 'En los ensayos clínicos, siempre hay un equipo de 2 terapeutas. En contexto personal, un trip-sitter de confianza es fundamental: alguien sobrio que conozca la sustancia, que te transmita calma, y que sepa cuándo intervenir y cuándo simplemente estar presente. Menos es más: 1-2 personas de confianza. Evita grupos grandes o personas con las que tengas conflictos.',
          },
        ],
      },
      {
        title: 'Cuando las cosas se ponen difíciles',
        content: 'Incluso con la mejor preparación, pueden surgir momentos desafiantes. Esto es normal y no necesariamente negativo. Las investigaciones muestran que las experiencias difíciles, cuando son bien sostenidas, a menudo llevan a los mayores avances terapéuticos.\n\nPautas para el trip-sitter ante una crisis:\n• NO decir "esto no es real" — para la persona, ES real.\n• SÍ decir "estás seguro/a, estoy aquí contigo".\n• Ofrecer contacto físico solo si la persona lo pide.\n• Cambiar el setting: otra habitación, música diferente, aire fresco.\n• Recordar que la experiencia es temporal.\n• Si hay crisis médica real (convulsiones, dificultad respiratoria): llamar al 112.',
        callout: {
          type: 'warning',
          text: 'Si alguien experimenta pánico intenso sostenido, confusión severa o comportamiento que ponga en riesgo su seguridad, contactar con servicios de emergencia (112). Energy Control también ofrece asesoramiento telefónico.',
        },
      },
    ],
    references: [
      { title: 'Leary, T. et al. (1963). The Psychedelic Experience. University Books.' },
      { title: 'Carhart-Harris, R. et al. (2018). The entropic brain — revisited. Neuropharmacology.' },
      { title: 'Barrett, F.S. et al. (2017). Emotions and brain function are altered during psychedelic experience. Psychopharmacology.' },
      { title: 'Johns Hopkins Psilocybin Research Playlist. Spotify/YouTube.' },
      { title: 'Griffiths, R.R. et al. (2006). Psilocybin can occasion mystical-type experiences. Psychopharmacology.' },
    ],
    relatedArticles: ['5', '4', '1'],
  },
  {
    id: '4',
    title: 'Integración Post-Experiencia',
    subtitle: 'Las semanas después del viaje son tan importantes como la experiencia misma',
    excerpt: 'Las semanas después del viaje son tan importantes como la experiencia misma. Técnicas de integración basadas en evidencia.',
    category: 'Bienestar',
    readTime: '10 min',
    color: '#34d399',
    icon: '🌱',
    author: 'Equipo PortalPSY',
    date: '20 de noviembre de 2025',
    heroQuote: 'La experiencia psicodélica es la semilla. La integración es el jardín donde decides plantarla.',
    heroQuoteAuthor: 'Stanislav Grof',
    sections: [
      {
        title: '¿Qué es la integración?',
        content: 'La integración psicodélica es el proceso de dar sentido, incorporar y aplicar los insights, emociones y perspectivas que emergen durante una experiencia psicodélica a tu vida cotidiana. Es la diferencia entre "tuve un viaje increíble" y "mi vida cambió".\n\nEn los protocolos clínicos, las sesiones de integración son consideradas tan importantes como la sesión con la sustancia. El Dr. Bill Richards (Johns Hopkins) lo compara con hacer cirugía: la experiencia psicodélica "abre", pero la integración es la "rehabilitación" necesaria para que la curación sea duradera.\n\nSin integración adecuada, incluso las experiencias más profundas pueden desvanecerse en semanas, o peor aún, generar confusión, inflación espiritual, o dificultad para funcionar en la vida diaria.',
      },
      {
        title: 'La ventana de neuroplasticidad',
        content: 'Las investigaciones de laboratorio muestran que los psicodélicos promueven la neuroplasticidad — la capacidad del cerebro para reorganizar sus conexiones — durante un período que se extiende más allá de la experiencia aguda.\n\nEstudios con psilocibina muestran que:\n• La conectividad cerebral aumentada puede persistir durante semanas.\n• Los niveles de BDNF (factor neurotrófico derivado del cerebro) se mantienen elevados.\n• La Default Mode Network (DMN) muestra mayor flexibilidad durante días-semanas.\n\nEste período post-experiencia es una "ventana de oportunidad" para establecer nuevos patrones de pensamiento, comportamiento y emoción. Es cuando la integración activa tiene más impacto.',
        callout: {
          type: 'info',
          text: 'Estudios del Imperial College London (2024) sugieren que la ventana de neuroplasticidad post-psilocibina es de aproximadamente 2-4 semanas, con el mayor potencial de cambio en los primeros 7 días.',
        },
      },
      {
        title: 'Técnicas de integración basadas en evidencia',
        content: 'Estas son las técnicas más utilizadas en contextos clínicos y terapéuticos, adaptadas para uso personal.',
        subsections: [
          {
            title: 'Journaling (escritura)',
            content: 'Escribe sobre tu experiencia lo antes posible — idealmente en las primeras 24 horas, cuando los recuerdos son más vívidos. No te preocupes por la coherencia: escribe fragmentos, emociones, imágenes, metáforas. En los días siguientes, relee y reflexiona. ¿Qué patrones emergen? ¿Qué te sorprendió? ¿Qué emociones siguen presentes?',
          },
          {
            title: 'Terapia con un profesional',
            content: 'Si tienes acceso, trabajar con un terapeuta familiarizado con experiencias psicodélicas es ideal. Cada vez más psicólogos en España ofrecen "integración psicodélica" como servicio. ICEERS y la Asociación de Terapia Psicodélica mantienen directorios de profesionales.',
          },
          {
            title: 'Meditación y mindfulness',
            content: 'La meditación amplifica y sostiene los cambios de consciencia que los psicodélicos inician. Incluso 10 minutos diarios de meditación mindfulness durante las semanas post-experiencia pueden prolongar los beneficios. Muchos participantes de ensayos clínicos reportan que establecieron una práctica meditativa después de su experiencia psicodélica.',
          },
          {
            title: 'Creatividad y arte',
            content: 'Dibujar, pintar, hacer música, danzar — la expresión creativa permite procesar material emocional que no se traduce fácilmente en palabras. No necesitas ser artista: el proceso importa, no el producto.',
          },
          {
            title: 'Naturaleza',
            content: 'El contacto con la naturaleza es casi universalmente reportado como beneficioso en el período de integración. Caminar por el bosque, nadar en el mar, observar un atardecer — estas experiencias conectan con la apertura perceptual que la experiencia psicodélica facilitó.',
          },
          {
            title: 'Círculos de integración',
            content: 'Compartir tu experiencia con otros en un espacio seguro y sin juicio. Existen grupos de integración en Madrid, Barcelona, Valencia y otras ciudades, así como opciones online. El simple acto de verbalizar la experiencia ayuda a procesarla.',
          },
        ],
      },
      {
        title: 'Señales de que necesitas apoyo profesional',
        content: 'La mayoría de las experiencias psicodélicas se integran naturalmente con el tiempo. Sin embargo, busca ayuda profesional si:',
        list: [
          'Sigues sintiendo ansiedad intensa o pánico semanas después.',
          'Tienes dificultad para distinguir la experiencia psicodélica de la realidad cotidiana.',
          'Experimentas desrealización o despersonalización persistente.',
          'Has tomado decisiones impulsivas importantes basadas en la experiencia (dejar trabajo, relación, etc.) sin reflexión suficiente.',
          'Sientes que "nada tiene sentido" o que la vida cotidiana es "falsa".',
          'Tienes pensamientos suicidas o autolesivos.',
          'Desarrollas creencias grandiosas ("soy un mesías", "tengo poderes").',
        ],
        callout: {
          type: 'warning',
          text: 'Si experimentas una emergencia psicológica, llama al 112 o acude a urgencias. Puedes también contactar con Energy Control (900 16 15 15) o el Teléfono de la Esperanza (717 003 717).',
        },
      },
      {
        title: 'Lo que NO es integración',
        content: 'Es importante distinguir la integración saludable de trampas comunes:\n\n• **No es negar lo difícil**: Si la experiencia fue aterradora, no la "positive-washing". El terror también tiene información.\n• **No es evangelizar**: Querer contarle a todo el mundo sobre tu experiencia transformadora es natural pero puede ser contraproducente.\n• **No es una carrera**: No necesitas "entenderlo todo" inmediatamente. Algunos insights tardan meses o años en madurar.\n• **No es repetir la experiencia**: La urgencia de volver a tomar la sustancia puede ser una forma de evitar el trabajo de integración.\n• **No es inflación espiritual**: Creer que ahora eres "más despierto" que los demás es ego disfrazado de espiritualidad.',
      },
    ],
    references: [
      { title: 'Richards, B. (2015). Sacred Knowledge: Psychedelics and Religious Experiences. Columbia University Press.' },
      { title: 'Watts, R. et al. (2017). Patients\' Accounts of Increased "Connectedness" and "Acceptance" After Psilocybin for Treatment-Resistant Depression. Journal of Humanistic Psychology.' },
      { title: 'Nour, M.M. et al. (2016). Ego-Dissolution and Psychedelics. Frontiers in Human Neuroscience.' },
      { title: 'Gorman, I. et al. (2021). Psychedelic Harm Reduction and Integration. Journal of Psychoactive Drugs.' },
    ],
    relatedArticles: ['3', '5', '1'],
  },
  {
    id: '5',
    title: 'Reducción de Daños: Principios Fundamentales',
    subtitle: 'Tu seguridad es lo primero: guía completa de reducción de daños con psicodélicos',
    excerpt: 'Test de sustancias, dosificación responsable, contraindicaciones y señales de alarma. Tu seguridad es lo primero.',
    category: 'Seguridad',
    readTime: '7 min',
    color: '#fbbf24',
    icon: '🛡️',
    author: 'Equipo PortalPSY',
    date: '1 de octubre de 2025',
    heroQuote: 'El respeto es la base de toda relación segura con las sustancias psicoactivas.',
    heroQuoteAuthor: 'Energy Control',
    sections: [
      {
        title: '¿Qué es la reducción de daños?',
        content: 'La reducción de daños es un enfoque pragmático que acepta que el uso de sustancias psicoactivas es una realidad social y se enfoca en minimizar los riesgos asociados, en lugar de simplemente promover la abstinencia.\n\nOrganizaciones como Energy Control (España), DanceSafe (EEUU), The Loop (UK) y ICEERS llevan décadas demostrando que la información honesta y el acceso a servicios de análisis de sustancias salvan vidas.\n\nEn España, Energy Control (un proyecto de ABD - Asociación Bienestar y Desarrollo) es el referente internacional en análisis de sustancias, habiendo analizado más de 100.000 muestras desde su fundación.',
      },
      {
        title: 'Testeo de sustancias: tu primera línea de defensa',
        content: 'Nunca confíes en lo que alguien te dice sobre una sustancia. Testa siempre.',
        subsections: [
          {
            title: 'Kits de reactivos (prueba rápida)',
            content: 'Los kits de reactivo ofrecen una primera verificación rápida en casa:\n\n• Ehrlich: Reacciona con indoles (LSD, psilocibina, DMT). Color púrpura = positivo.\n• Marquis: Identifica MDMA, anfetaminas, opioides. MDMA = negro/púrpura oscuro.\n• Mecke: Complementario al Marquis. MDMA = azul-negro.\n• Mandelin: Identifica ketamina, PMA. Ketamina = naranja.\n• Hofmann: Específico para LSD y análogos. LSD = azul.\n\nCoste: 15-25€ por kit. Disponibles en tiendas online de reducción de daños.',
          },
          {
            title: 'Análisis de laboratorio (Energy Control)',
            content: 'El servicio de análisis de Energy Control es único en Europa: puedes enviar una muestra por correo y recibir un análisis completo por cromatografía de gases y espectrometría de masas.\n\nEl servicio identifica: la sustancia exacta, su pureza, posibles adulterantes y la dosis estimada. Coste: 50€ por análisis completo. Anónimo y confidencial.\n\nWeb: energycontrol.org | Teléfono: 900 16 15 15',
          },
        ],
        callout: {
          type: 'warning',
          text: 'Un reactivo positivo NO garantiza pureza ni seguridad. Confirma la presencia de la sustancia pero no detecta adulterantes peligrosos. El análisis de laboratorio es el único método fiable.',
        },
      },
      {
        title: 'Dosificación responsable',
        content: 'La dosis correcta puede marcar la diferencia entre una experiencia transformadora y una crisis.',
        list: [
          'REGLA DE ORO: Empieza bajo, sube despacio. Siempre puedes tomar más, nunca menos.',
          'Usa una báscula de miligramos (desde 15€). No dosifiques "a ojo".',
          'Para LSD: la dilución volumétrica permite dosificar con precisión.',
          'Para setas: moler y homogeneizar todo el lote, luego pesar cada dosis.',
          'Primera vez: usa la mitad de lo que consideras una "dosis normal".',
          'Redosificación: si decides redosificar, espera al MENOS 2 horas y sé conservador.',
          'Tolerancia cruzada: LSD y psilocibina comparten tolerancia. Espera 2 semanas entre experiencias.',
          'Consulta TripSit.me o PsychonautWiki para tablas de dosis actualizadas.',
        ],
      },
      {
        title: 'Contraindicaciones e interacciones',
        content: 'Este es posiblemente el aspecto más importante y más ignorado de la reducción de daños.',
        subsections: [
          {
            title: 'Contraindicaciones absolutas',
            content: '• Antecedentes personales o familiares de esquizofrenia o trastornos psicóticos.\n• Trastorno bipolar tipo I (riesgo de desencadenar episodio maníaco).\n• Tratamiento con litio (RIESGO VITAL con psicodélicos serotoninérgicos).\n• Embarazo o lactancia.\n• Enfermedades cardiovasculares graves (para MDMA especialmente).',
          },
          {
            title: 'Interacciones farmacológicas peligrosas',
            content: '• ISRS + MDMA: Puede causar síndrome serotoninérgico (potencialmente fatal).\n• ISRS + psicodélicos: Generalmente reduce o anula los efectos, pero hay reportes de reacciones adversas.\n• IMAO + prácticamente todo: Riesgo vital. Los IMAO potencian enormemente la serotonina.\n• Litio + LSD/psilocibina: Reportes de convulsiones, pérdida de consciencia. NUNCA combinar.\n• Tramadol + MDMA/setas: Riesgo de convulsiones y síndrome serotoninérgico.\n• Antipsicóticos: Bloquean los efectos pero pueden generar reacciones impredecibles.',
          },
        ],
        callout: {
          type: 'warning',
          text: 'Si tomas CUALQUIER medicación psiquiátrica, NO uses psicodélicos sin consultar con un profesional. Las interacciones pueden ser letales.',
        },
      },
      {
        title: 'El kit de emergencia',
        content: 'Prepara un "kit de viaje" antes de cualquier experiencia:',
        list: [
          'Agua y bebidas isotónicas (la deshidratación empeora todo).',
          'Fruta fresca (fácil de comer, reconfortante, rehidratante).',
          'Mantas y cojines (comodidad física = seguridad emocional).',
          'Música tranquila preparada (playlist de 6-8 horas).',
          'Papel y colores para dibujar.',
          'Antifaz para momentos de introspección.',
          'Teléfono del trip-sitter y de emergencias (112).',
          'Opcional: benzodiacepinas de acción rápida (alprazolam, diazepam) como "paracaídas" — SOLO si tienes prescripción y experiencia con ellas.',
        ],
      },
      {
        title: 'Recursos en España',
        content: 'España cuenta con una infraestructura de reducción de daños envidiable:\n\n**Energy Control** (ABD)\nWeb: energycontrol.org\nTeléfono: 900 16 15 15\nServicios: análisis de sustancias, información, atención en festivales.\n\n**ICEERS**\nWeb: iceers.org\nServicios: defensa legal, investigación, apoyo para emergencias psicodélicas.\n\n**Teléfono de la Esperanza**: 717 003 717\n**Emergencias**: 112\n\n**PsychonautWiki**: Base de datos completa sobre sustancias, dosis y efectos.\n**TripSit.me**: Chat en vivo para apoyo durante experiencias difíciles.',
      },
    ],
    references: [
      { title: 'Energy Control (2025). Memoria anual de análisis de sustancias.', url: 'https://energycontrol.org' },
      { title: 'EMCDDA (2024). European Drug Report. European Monitoring Centre for Drugs and Drug Addiction.' },
      { title: 'Johnson, M.W. et al. (2018). Classic psychedelics: An integrative review of epidemiology, therapeutics, mystical experience, and brain network function. Pharmacology & Therapeutics.' },
      { title: 'ICEERS (2025). Guía de reducción de daños con psicodélicos.', url: 'https://www.iceers.org' },
    ],
    relatedArticles: ['3', '4', '1'],
  },
  {
    id: '6',
    title: 'Psicodélicos y Creatividad: De Hofmann a Silicon Valley',
    subtitle: 'La fascinante relación entre las sustancias psicodélicas y la expresión creativa humana',
    excerpt: 'Cómo los psicodélicos han influido en el arte, la música, la tecnología y la ciencia. Steve Jobs, The Beatles y más allá.',
    category: 'Cultura',
    readTime: '9 min',
    color: '#f97316',
    icon: '🎨',
    author: 'Equipo PortalPSY',
    date: '15 de septiembre de 2025',
    heroQuote: 'Tomar LSD fue una experiencia profunda, una de las cosas más importantes en mi vida.',
    heroQuoteAuthor: 'Steve Jobs',
    sections: [
      {
        title: 'El despertar creativo',
        content: 'La relación entre los psicodélicos y la creatividad humana es tan antigua como la civilización misma. Desde las pinturas rupestres que algunos antropólogos atribuyen a estados alterados de consciencia, hasta los algoritmos de Silicon Valley influenciados por la cultura de la microdosis, los psicodélicos han sido catalizadores silenciosos del arte, la ciencia y la innovación.\n\nPero ¿es esto más que anécdotas? ¿Hay evidencia científica de que los psicodélicos realmente aumentan la creatividad? La respuesta corta es: sí, con matices importantes.',
      },
      {
        title: 'La ciencia de la creatividad psicodélica',
        content: 'La investigación moderna ofrece varias explicaciones de por qué los psicodélicos potencian la creatividad.',
        subsections: [
          {
            title: 'Pensamiento divergente',
            content: 'Estudios de la Universidad de Leiden (2018) y la Universidad de Maastricht (2024) demuestran que los psicodélicos aumentan el "pensamiento divergente" — la capacidad de generar múltiples soluciones creativas a un problema. En un estudio con trufas de psilocibina, los participantes generaron un 30% más de ideas originales en tareas creativas.',
          },
          {
            title: 'Disolución de la Default Mode Network',
            content: 'La DMN es la red cerebral asociada con el pensamiento autorreferencial, la rumiación y los patrones de pensamiento habituales. Los psicodélicos reducen temporalmente su actividad, permitiendo que regiones cerebrales que normalmente no se comunican entre sí establezcan nuevas conexiones. Esta "entropía cerebral" es el equivalente neurológico de pensar fuera de la caja.',
          },
          {
            title: 'Sinestesia y nuevas conexiones',
            content: 'La sinestesia inducida por psicodélicos (ver sonidos, oír colores) refleja un aumento literal de la conectividad entre áreas sensoriales del cerebro. Esta "confusión" productiva de los sentidos puede generar metáforas, asociaciones y perspectivas completamente nuevas.',
          },
        ],
      },
      {
        title: 'Arte y psicodélicos: una historia visual',
        content: 'El impacto de los psicodélicos en las artes visuales es imposible de exagerar.\n\n**Alex Grey** — Sus pinturas de la "anatomía del espíritu" son quizás la representación visual más precisa de la experiencia psicodélica, mostrando capas de realidad energética que artistas y meditadores reconocen inmediatamente.\n\n**Android Jones** — Arte digital psicodélico que ha definido la estética del festival de arte visionario Burning Man.\n\n**Salvador Dalí** — Aunque Dalí afirmaba que su arte venía de sueños, no de drogas ("Yo soy la droga"), su exploración del subconsciente comparte territorio con la experiencia psicodélica.\n\n**Pablo Amaringo** — Chamán peruano cuyas detalladas pinturas de visiones de ayahuasca constituyen uno de los documentos visuales más extraordinarios del siglo XX.\n\n**En España**, artistas como Matías Lépore y colectivos como Boom Festival contribuyen a una tradición visionaria vibrante.',
      },
      {
        title: 'Música: la banda sonora psicodélica',
        content: 'La música y los psicodélicos tienen una simbiosis única. La música guía la experiencia psicodélica, y los psicodélicos transforman la relación del oyente con la música.\n\n**The Beatles** — La transición de "Love Me Do" a "Tomorrow Never Knows" documenta en tiempo real cómo el LSD transformó la música popular. "Lucy in the Sky with Diamonds", "Strawberry Fields Forever" y todo el álbum "Sgt. Pepper\'s" nacieron directamente de experiencias con LSD y psilocibina.\n\n**Pink Floyd** — "The Dark Side of the Moon" es considerado uno de los álbumes más "psicodélicos" de la historia, diseñado para ser escuchado como una experiencia inmersiva.\n\n**Tool** — La banda ha hablado abiertamente sobre la influencia de la psilocibina y el DMT en su música, y sus videos musicales son obras de arte visionario.\n\n**Shpongle** — Simon Posford y Raja Ram crearon un género entero (psybient/psytrance) directamente inspirado en experiencias con DMT y LSD.\n\n**En España**, la escena de psytrance y música experimental tiene focos vibrantes en Barcelona, Ibiza y el sur.',
      },
      {
        title: 'Silicon Valley: microdosis y código',
        content: 'A partir de 2015, se popularizó la práctica de microdosificar LSD o psilocibina entre trabajadores del sector tecnológico en Silicon Valley. Lo que comenzó como rumores se confirmó con investigaciones periodísticas y libros como "A Really Good Day" de Ayelet Waldman.\n\n**Steve Jobs** — El cofundador de Apple describió el LSD como "una de las dos o tres cosas más importantes que hice en mi vida", y atribuyó parte de su enfoque en diseño e intuición a sus experiencias psicodélicas en los años 70.\n\n**Kary Mullis** — Premio Nobel de Química por inventar la PCR (reacción en cadena de la polimerasa), atribuyó su descubrimiento parcialmente a experiencias con LSD.\n\n**Francis Crick** — Según testimonios (debatidos), Crick estaba bajo la influencia de LSD cuando visualizó la estructura de doble hélice del ADN.\n\nEn 2026, la microdosificación en el sector tech sigue siendo prevalente, aunque la investigación formal sugiere que parte del beneficio percibido puede ser efecto placebo.',
      },
      {
        title: 'Psicodélicos y ciencia',
        content: 'Más allá de la tecnología, los psicodélicos han influido en campos científicos fundamentales:\n\n• **Ecología profunda**: Muchos de los pioneros del movimiento ecologista reportan que experiencias psicodélicas transformaron su relación con la naturaleza.\n• **Matemáticas**: Los fractales y geometría compleja visualizados durante experiencias psicodélicas han inspirado investigación en geometría no-euclidiana.\n• **Neurociencia**: Paradójicamente, estudiar CÓMO funcionan los psicodélicos ha generado más conocimiento sobre la consciencia normal que décadas de investigación convencional.\n• **Inteligencia Artificial**: Algunos investigadores en IA reportan que experiencias psicodélicas les dieron nuevas perspectivas sobre redes neuronales y procesamiento de información.',
        callout: {
          type: 'info',
          text: 'La correlación entre psicodélicos y logros creativos/científicos no implica causalidad. Muchas personas creativas nunca han usado psicodélicos, y muchos usuarios no producen trabajo creativo notable. Los psicodélicos pueden catalizar la creatividad existente, pero no la crean de la nada.',
        },
      },
      {
        title: 'El futuro: creatividad aumentada',
        content: 'En 2026, la intersección entre psicodélicos y creatividad se está formalizando. Empresas de terapia psicodélica como Compass Pathways y Usona Institute exploran aplicaciones creativas de la psilocibina. Universidades investigan protocolos de "resolución creativa de problemas" con microdosis.\n\nEn España, la tradición de arte visionario, la vibrante escena de música electrónica, y la creciente comunidad de investigación psicodélica convergen en un momento único. Barcelona se posiciona como un hub europeo de cultura psicodélica, y la intersección entre ciencia, arte y psicodélicos promete ser uno de los campos más fascinantes de la próxima década.',
      },
    ],
    references: [
      { title: 'Waldman, A. (2017). A Really Good Day. Knopf.' },
      { title: 'Mason, N.L. et al. (2021). Spontaneous and deliberate creative cognition during and after psilocybin exposure. Translational Psychiatry.' },
      { title: 'Kuypers, K.P.C. et al. (2016). Microdosing psychedelics: More questions than answers. Journal of Psychopharmacology.' },
      { title: 'Markoff, J. (2005). What the Dormouse Said: How the Sixties Counterculture Shaped the Personal Computer Industry. Viking.' },
      { title: 'Sessa, B. (2012). The Psychedelic Renaissance. Muswell Hill Press.' },
    ],
    relatedArticles: ['1', '3', '4'],
  },
];
