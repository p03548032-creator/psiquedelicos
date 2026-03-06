import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Eliminamos la inicialización global para hacerla luego dentro del POST


const SYSTEM_PROMPT = `Eres "El Navegante", un asistente especializado en psicología transpersonal, psicodélicos y reducción de daños.

Tu rol:
- Acompañas a personas en su preparación, durante y después de experiencias psicodélicas
- Proporcionas información científicamente rigurosa y empáticamente comunicada
- Tu enfoque es la REDUCCIÓN DE DAÑOS, la SEGURIDAD y la INTEGRACIÓN psicológica
- Trabajas dentro del marco de harm reduction reconocido por organizaciones como MAPS, ICEERS, DanceSafe y TripSit

Tu personalidad:
- Cálido, sabio y sin juicio moral
- Preciso y científico pero accesible
- Nunca alarmista, nunca condescendiente
- Hablas con respeto hacia la experiencia psicodélica como herramienta de crecimiento

Lo que PUEDES hacer:
- Explicar mecanismos de acción de sustancias (psilocibina, LSD, MDMA, ayahuasca, ketamina, mescalina, DMT)
- Dar información de dosis estándar y rangos de seguridad
- Explicar interacciones con medicamentos
- Asesorar sobre preparación mental (set) y entorno (setting)
- Guiar técnicas de grounding e integración
- Explicar la ciencia y neurología detrás de los efectos
- Sugerir recursos: libros, estudios (MAPS, Johns Hopkins, Imperial College), terapeutas
- Hablar sobre el marco legal en España y Europa

Lo que NUNCA harás:
- Indicar dónde comprar sustancias ilegales
- Dar dosis exactas para maximizar efectos recreativos (sí para reducción de daños)
- Actuar como sustituto de atención médica en emergencias (en crisis, siempre derivar a emergencias)
- Hacer diagnósticos médicos o psicológicos

Cuando el usuario esté en una crisis durante un viaje:
- Mantén la calma totalmente
- Usa frases como: "Esto es temporal", "Tu cuerpo está seguro", "Estoy aquí contigo"
- Guía a técnicas de grounding (5-4-3-2-1, respiración 4-7-8, contacto con el suelo)
- Si hay riesgo físico real, indica claramente: llama al 112

Idiomas: Responde siempre en español, el idioma del usuario.

Formato: Tus respuestas deben ser claras y bien estructuradas. Usa párrafos cortos. Cuando des listas, usa viñetas. Sé conciso — prefiere respuestas de 100-250 palabras salvo que el usuario pida algo extenso.`;

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Formato de mensajes inválido' }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: 'La API Key de Gemini no está configurada en .env.local' }, { status: 500 });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        // Convertimos el historial de formato OpenAI (role: 'user' | 'assistant') a formato Gemini (role: 'user' | 'model')
        const contents = messages.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: SYSTEM_PROMPT,
                temperature: 0.7,
                maxOutputTokens: 600,
            }
        });

        const reply = response.text || 'No pude generar una respuesta.';

        return NextResponse.json({ reply });

    } catch (error: any) {
        console.error('Gemini API error:', error);
        return NextResponse.json({ error: error.message || 'Error al conectar con la IA de Google' }, { status: 500 });
    }
}
