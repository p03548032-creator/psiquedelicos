import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // Obtener datos del cuerpo
        const { userId, email, origin = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000' } = await request.json();

        if (!userId || !email) {
            return NextResponse.json({ error: 'Se requiere autenticación' }, { status: 401 });
        }

        // Buscar si el usuario ya tiene un Stripe Customer ID
        const { data: profile } = await supabase
            .from('profiles')
            .select('stripe_customer_id, plan')
            .eq('id', userId)
            .single();

        // Si ya es PRO, avisar
        if (profile?.plan === 'pro') {
            return NextResponse.json({ error: 'Ya tienes el plan PRO activo.' }, { status: 400 });
        }

        let customerId = profile?.stripe_customer_id;

        // Si no tiene customer en Stripe, crearlo
        if (!customerId) {
            const customer = await stripe.customers.create({
                email,
                metadata: { supabase_user_id: userId },
            });
            customerId = customer.id;

            // Guardar el customer_id en Supabase
            await supabase
                .from('profiles')
                .update({ stripe_customer_id: customerId })
                .eq('id', userId);
        }

        // Crear la sesión de Checkout de Stripe
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID_PRO!,
                    quantity: 1,
                },
            ],
            success_url: `${origin}/pro/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/pro`,
            locale: 'es',
            metadata: {
                supabase_user_id: userId,
            },
        });

        return NextResponse.json({ url: session.url });

    } catch (error: any) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
