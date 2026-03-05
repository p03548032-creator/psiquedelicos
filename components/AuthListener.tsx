'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthListener() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const supabase = createClient();

        // Función para redirigir si detectamos modo recuperación en CUALQUIER parte de la URL
        const checkRecovery = () => {
            if (typeof window !== 'undefined') {
                const url = window.location.href;
                if (url.includes('type=recovery') && pathname !== '/reset-password') {
                    // Forzamos la redirección total del navegador
                    window.location.href = '/reset-password';
                    return true;
                }
            }
            return false;
        };

        // 1. Comprobación inmediata al cargar (Fragment/Implicit flow)
        if (checkRecovery()) return;

        // 2. Escuchar cambios en el estado de autenticación (evento oficial de Supabase)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'PASSWORD_RECOVERY' && pathname !== '/reset-password') {
                window.location.href = '/reset-password';
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, pathname]);

    return null;
}
