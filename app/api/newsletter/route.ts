import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

// Inicializar SDKs
const resend = new Resend(process.env.RESEND_API_KEY);

// Obligatorio usar el Service Role Key para poder bypasear RLS al escribir en la base de datos desde el backend
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Usamos la secret key para backend operations
);

export async function POST(request: Request) {
    try {
        const { firstName, email } = await request.json();

        if (!email || !firstName) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        // 1. Guardar o verificar en Supabase
        const { data: existingSubscriber, error: selectError } = await supabaseAdmin
            .from('subscribers')
            .select('id, status')
            .eq('email', email)
            .single();

        if (existingSubscriber) {
            // Si ya estaba activo
            if (existingSubscriber.status === 'active') {
                return NextResponse.json({
                    success: false,
                    message: '¡Ya estás suscrito con este email!'
                }, { status: 409 });
            } else {
                // Si se había desuscrito, lo volvemos a activar
                await supabaseAdmin
                    .from('subscribers')
                    .update({ status: 'active' })
                    .eq('email', email);
            }
        } else {
            // Nuevo suscriptor, lo insertamos
            const { error: insertError } = await supabaseAdmin
                .from('subscribers')
                .insert([{ name: firstName, email: email }]);

            if (insertError) {
                console.error('Error insertando en Supabase:', insertError);
                return NextResponse.json({ error: 'Error guardando en la base de datos' }, { status: 500 });
            }
        }

        // 2. Enviar el correo de Bienvenida vía Resend
        const { data: emailData, error: emailError } = await resend.emails.send({
            from: 'PortalPSY <boletin@portalpsy.es>', // Reemplaza esto con tu dominio verificado en Resend en cuanto puedas
            to: [email],
            subject: `¡Bienvenido/a al Portal, ${firstName}! ✨`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <h1 style="color: #7c3aed;">Bienvenido/a a la comunidad ✨</h1>
                    <p>Hola <strong>${firstName}</strong>,</p>
                    <p>Mil gracias por unirte a la newsletter del <strong>PortalPSY</strong>. Cada mes recibirás los análisis clínicos y novedades de investigación psicodélica más importantes sin censuras ni relleno.</p>
                    
                    <h2 style="color: #4CAF50; margin-top: 30px;">Tus regalos de bienvenida 🎁</h2>
                    <p>Como lo prometido es deuda, aquí tienes el acceso a nuestras playlists de integración musical cuidadosamente curadas:</p>
                    <ul>
                        <li><a href="https://open.spotify.com/playlist/7v886H1F562725V977D06T" target="_blank" rel="noopener noreferrer">Playlist Integración - Spotify ↗</a></li>
                        <li><a href="https://youtube.com/playlist?list=PLjVrv8KngW_ySns-C8hVd5E2U1a6VzCqy" target="_blank" rel="noopener noreferrer">Frecuencias Solfeggio - YouTube ↗</a></li>
                    </ul>
                    
                    <p style="margin-top: 40px;">¡Nos leemos en el próximo boletín!</p>
                    <hr style="border: 0; border-top: 1px solid #ededed; margin: 40px 0;">
                    <p style="font-size: 11px; color: #999;">
                        PortalPSY — Información, no incitación. Tu consciencia, tu responsabilidad.<br>
                        Has recibido este email porque te suscribiste en portalpsy.es
                    </p>
                </div>
            `
        });

        if (emailError) {
            console.error('Error de Resend:', emailError);
            // Aunque Resend falle (ej. dominio sin verificar), notificamos el éxito parcial del registro.
            return NextResponse.json({
                success: true,
                warning: 'Usuario guardado pero hubo un problema enviando el correo. Verifica tu cuenta de Resend.'
            });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error in /api/newsletter:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
