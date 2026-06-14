import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AuthListener from '@/components/AuthListener';
import { publicEnv } from '@/lib/env';

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.NEXT_PUBLIC_URL),
  title: {
    default: 'PortalPSY — Un mapa para explorar la consciencia',
    template: '%s | PortalPSY',
  },
  description: 'Información rigurosa sobre psicodélicos, reducción de daños y bienestar. Sin ventas, sin alarmismo. Para decidir con información.',
  keywords: ['psicodélicos', 'psilocibina', 'MDMA', 'LSD', 'microdosificación', 'terapia psicodélica', 'España', 'reducción de daños', 'set & setting'],
  authors: [{ name: 'PortalPSY' }],
  creator: 'PortalPSY',
  publisher: 'PortalPSY',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'PortalPSY',
    title: 'PortalPSY — Un mapa para explorar la consciencia',
    description: 'Información rigurosa sobre psicodélicos, reducción de daños y bienestar. Sin ventas, sin alarmismo.',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'PortalPSY — Un mapa para explorar la consciencia' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@portalpsy',
    creator: '@portalpsy',
    title: 'PortalPSY — Un mapa para explorar la consciencia',
    description: 'Información rigurosa sobre psicodélicos. Sin ventas.',
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#050510',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Preconnect a recursos críticos */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://*.supabase.co" />
      </head>
      <body>
        {/* Auth listener global — supervive a navigaciones */}
        <AuthListener />
        {/* Navigation con Suspense para streaming */}
        <Suspense fallback={null}>
          <Navigation />
        </Suspense>
        <Suspense fallback={
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 24, height: 24, border: '2px solid #7c3aed', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
          </div>
        }>
          {children}
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
