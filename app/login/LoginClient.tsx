'use client'

import { createClient } from '@/lib/supabase/client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export default function LoginClient() {
    const supabase = createClient()

    // Dummy mode handling for build time or empty env vars
    const isMockAuth = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('aqui_tu_project');

    if (isMockAuth) {
        return (
            <div className="text-center p-6 border border-amber-500/20 bg-amber-500/10 rounded-xl text-amber-200/80 text-sm">
                ⚠️ <strong>Modo desarrollo:</strong> Las variables de Supabase no están configuradas en `.env.local`.
                El login está desactivado para no romper el renderizado.
            </div>
        )
    }

    return (
        <Auth
            supabaseClient={supabase}
            appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: '#7c3aed',
                            brandAccent: '#8b5cf6',
                            brandButtonText: 'white',
                            defaultButtonBackground: 'rgba(255, 255, 255, 0.05)',
                            defaultButtonBackgroundHover: 'rgba(255, 255, 255, 0.1)',
                            inputBackground: 'rgba(0, 0, 0, 0.2)',
                            inputBorder: 'rgba(255, 255, 255, 0.1)',
                            inputBorderHover: 'rgba(255, 255, 255, 0.2)',
                            inputBorderFocus: '#7c3aed',
                            inputText: 'white',
                        }
                    }
                },
                className: {
                    container: 'auth-container',
                    button: 'vesica-btn rounded-xl font-medium',
                    input: 'rounded-xl',
                    label: 'text-white/50 text-sm',
                    message: 'text-sm'
                }
            }}
            providers={['google']}
            redirectTo={`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/auth/callback`}
            localization={{
                variables: {
                    sign_in: {
                        email_label: 'Dirección email',
                        password_label: 'Contraseña',
                        button_label: 'Entrar',
                        loading_button_label: 'Iniciando sesión...',
                        social_provider_text: 'Entrar con {{provider}}',
                        link_text: '¿Ya tienes una cuenta? Entra aquí'
                    },
                    sign_up: {
                        email_label: 'Dirección email',
                        password_label: 'Crea una contraseña',
                        button_label: 'Crear cuenta',
                        loading_button_label: 'Creando cuenta...',
                        social_provider_text: 'Entrar con {{provider}}',
                        link_text: '¿No tienes cuenta? Regístrate',
                        confirmation_text: 'Revisa tu correo para el link de confirmación'
                    }
                }
            }}
        />
    )
}
