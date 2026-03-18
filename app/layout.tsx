import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AuthListener from '@/components/AuthListener';

export const metadata: Metadata = {
  metadataBase: new URL('https://portalpsy.es'),
  title: 'PortalPSY — Portal de referencia sobre psicodélicos en España',
  description: 'Información basada en evidencia científica sobre sustancias psicodélicas, terapia psicodélica en España, reducción de daños y cultura psiconáutica.',
  keywords: ['psicodélicos', 'psilocibina', 'MDMA', 'LSD', 'microdosificación', 'terapia psicodélica', 'España', 'reducción de daños'],
  openGraph: {
    title: 'PortalPSY — Portal Psicodélico en España',
    description: 'El portal de referencia sobre psicodélicos en España. Información, comunidad y ciencia.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://portalpsy.es',
    siteName: 'PortalPSY',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PortalPSY',
    description: 'El portal de referencia sobre psicodélicos en España.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#050510" />
      </head>
      <body>
        <AuthListener />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}

