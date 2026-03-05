'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AuthListener() {
    const router = useRouter();

    useEffect(() => {
        const supabase = createClient();

        // Comprobación inmediata por si llegamos con el hash de recuperación
        if (typeof window !== 'undefined' && window.location.hash.includes('type=recovery')) {
            router.push('/reset-password');
        }

        // Escuchar cambios en el estado de autenticación (evento oficial)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'PASSWORD_RECOVERY') {
                router.push('/reset-password');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router]);

    return null; // Este componente no renderiza nada visualmente
}
