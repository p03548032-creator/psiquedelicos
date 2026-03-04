import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LoginClient from './LoginClient'

export default async function LoginPage() {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    // If already logged in, redirect to forum or home
    if (session) {
        redirect('/comunidad')
    }

    return (
        <main className="min-h-screen pt-32 pb-20 flex items-center justify-center">
            <div className="max-w-md w-full px-6">
                <div className="glass-sacred rounded-3xl p-8 relative overflow-hidden">
                    {/* Background glows */}
                    <div className="absolute top-0 left-0 w-40 h-40 bg-psyche-violet/20 blur-3xl rounded-full mix-blend-screen" />
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-psyche-blue/20 blur-3xl rounded-full mix-blend-screen" />

                    <div className="relative z-10">
                        <h1 className="text-2xl font-black text-center mb-2">Bienvenido a PortalPSY</h1>
                        <p className="text-white/40 text-sm text-center mb-8">
                            Únete a la comunidad de reducción de daños e integración psicodélica.
                        </p>

                        <LoginClient />
                    </div>
                </div>
            </div>
        </main>
    )
}
