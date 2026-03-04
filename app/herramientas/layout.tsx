import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Herramientas de Reducción de Daños — PortalPSY',
    description: 'Calculadora de dosis de psilocibina y trufas, comprobador de interacciones entre sustancias (Combo Checker). Basado en estándares de TripSit y RollSafe.',
    keywords: ['calculadora dosis psilocibina', 'calculadora setas mágicas', 'interacciones drogas', 'combo checker', 'reducción de daños'],
    alternates: { canonical: 'https://portalpsy.es/herramientas' },
    openGraph: {
        title: 'Herramientas de Reducción de Daños — PortalPSY',
        description: 'Calculadora de dosis y comprobador de interacciones entre sustancias. Seguridad primero.',
        type: 'website',
    },
};

export default function HerramientasLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
