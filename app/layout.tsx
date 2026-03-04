import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'PortalPSY — Portal de referencia sobre psicodélicos en España',
  description: 'Información basada en evidencia científica sobre sustancias psicodélicas, terapia psicodélica en España, reducción de daños y cultura psiconáutica.',
  keywords: ['psicodélicos', 'psilocibina', 'MDMA', 'LSD', 'microdosificación', 'terapia psicodélica', 'España', 'reducción de daños'],
  openGraph: {
    title: 'PortalPSY — Portal Psicodélico en España',
    description: 'El portal de referencia sobre psicodélicos en España. Información, comunidad y ciencia.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PortalPSY',
    description: 'El portal de referencia sobre psicodélicos en España.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
