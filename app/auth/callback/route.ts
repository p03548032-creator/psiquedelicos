import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const type = requestUrl.searchParams.get('type')
    const next = requestUrl.searchParams.get('next') ?? '/comunidad'

    if (code) {
        const supabase = createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Si es un enlace de recuperación de contraseña → ir a /reset-password
            if (type === 'recovery') {
                return NextResponse.redirect(new URL('/reset-password', requestUrl.origin))
            }
            return NextResponse.redirect(new URL(next, requestUrl.origin))
        }
    }

    // Si hay error o falta código, enviar al login de vuelta
    return NextResponse.redirect(new URL('/login', requestUrl.origin))
}
