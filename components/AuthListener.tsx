'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthListener() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const supabase = createClient();

        // Función para redirigir si detectamos modo recuperación en el hash (#)
        const checkRecovery = () => {
            if (typeof window !== 'undefined' &&
                window.location.hash.includes('type=recovery') &&
                pathname !== '/reset-password') {

                // Forzamos la redirección de navegador para limpiar el estado y asegurar que se cargue el formulario
                window.location.href = '/reset-password';
                return true;
            }
            return false;
        };

        // 1. Comprobación inmediata al cargar
        if (checkRecovery()) return;

        // 2. Escuchar cambios en el estado de autenticación (evento oficial de Supabase)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'PASSWORD_RECOVERY' && pathname !== '/reset-password') {
                router.push('/reset-password');
                router.refresh();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, pathname]);

    return null;
}
