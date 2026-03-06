import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // Obtenemos el usuario de la sesión actual
        // Nota: En una API route, hay que usar el cliente de auth normal para ver quién es
        const { data: { user } } = await supabase.auth.getUser(request.headers.get('Authorization')?.split(' ')[1] || '');

        // Como es una herramienta de debug para Juan, vamos a filtrar por su email directamente
        // para asegurar que funciona incluso sin headers complejos
        const { data: profile, error: fetchError } = await supabase
            .from('profiles')
            .update({ plan: 'pro' })
            .eq('email', 'fraga300@yahoo.es')
            .select()
            .single();

        if (fetchError) throw fetchError;

        return NextResponse.json({
            success: true,
            message: 'Plan PRO activado manualmente para fraga300@yahoo.es',
            profile
        });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
