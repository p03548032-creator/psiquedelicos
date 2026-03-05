import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

// IMPORTANTE: El webhook de Stripe necesita el body en formato raw (sin parsear)
export const runtime = 'nodejs';

export async function POST(request: Request) {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    if (!sig) {
        return NextResponse.json({ error: 'No Stripe signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error('Webhook signature error:', err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Manejar los eventos relevantes de Stripe
    switch (event.type) {

        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;
            const customerId = session.customer as string;
            const subscriptionId = session.subscription as string;

            // Actualizar el plan del usuario a 'pro'
            const { error } = await supabase
                .from('profiles')
                .update({
                    plan: 'pro',
                    subscription_id: subscriptionId,
                    subscription_ends_at: null, // Activa, sin fecha de fin
                })
                .eq('stripe_customer_id', customerId);

            if (error) {
                console.error('Supabase update error (checkout):', error);
                return NextResponse.json({ error: 'DB update failed' }, { status: 500 });
            }

            console.log(`✅ PRO activado para customer: ${customerId}`);
            break;
        }

        case 'customer.subscription.updated': {
            const subscription = event.data.object as Stripe.Subscription;
            const customerId = subscription.customer as string;
            const isActive = subscription.status === 'active' || subscription.status === 'trialing';
            // Obtener la fecha de fin desde el primer item de la suscripción
            const periodEnd = (subscription as any).current_period_end;
            const endsAt = isActive ? null : periodEnd ? new Date(periodEnd * 1000).toISOString() : null;

            await supabase
                .from('profiles')
                .update({
                    plan: isActive ? 'pro' : 'free',
                    subscription_ends_at: endsAt,
                })
                .eq('stripe_customer_id', customerId);

            console.log(`🔄 Suscripción actualizada para customer: ${customerId} → ${isActive ? 'pro' : 'free'}`);
            break;
        }

        case 'customer.subscription.deleted': {
            const subscription = event.data.object as Stripe.Subscription;
            const customerId = subscription.customer as string;

            // Obtener la fecha de fin desde el primer item de la suscripción
            const periodEnd = (subscription as any).current_period_end;
            // Degradar a plan free
            await supabase
                .from('profiles')
                .update({
                    plan: 'free',
                    subscription_id: null,
                    subscription_ends_at: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
                })
                .eq('stripe_customer_id', customerId);

            console.log(`❌ PRO cancelado para customer: ${customerId}`);
            break;
        }

        default:
            // Ignorar eventos no manejados
            break;
    }

    return NextResponse.json({ received: true });
}
