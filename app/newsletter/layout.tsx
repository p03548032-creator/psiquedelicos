import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Newsletter — El Pulso de la Ciencia Psicodélica | PortalPSY',
    description: 'Suscríbete gratis. Análisis mensual de investigación psicodélica en España, ensayos clínicos y novedades regulatorias. Más de 1.200 lectores.',
    keywords: ['newsletter psicodélicos', 'investigación psicodélica España', 'boletín ciencia psicodélica', 'psilocibina noticias'],
    alternates: { canonical: 'https://portalpsy.es/newsletter' },
    openGraph: {
        title: 'Newsletter PortalPSY — El Pulso de la Ciencia Psicodélica',
        description: 'Análisis mensual de investigación psicodélica en España. Gratis, sin spam.',
        type: 'website',
    },
};

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
