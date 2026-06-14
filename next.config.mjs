import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // React 19 + Next 15
  reactStrictMode: true,

  // Turbopack para dev (más rápido)
  // Ya habilitado via --turbopack flag en dev script

  // Partial Prerendering — híbrido ISR/SSR (requiere Next.js canary)
  // typedRoutes: true, // Validación estricta de hrefs — desactívala si usas hrefs dinámicos de strings


  // Optimización de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },

  // Compilador optimizado
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
    // Decorar componentes React 19
    reactRemoveProperties: process.env.NODE_ENV === 'production'
      ? { properties: ['^data-testid$', '^__testid$'] }
      : false,
  },

  // Cabeceras de seguridad HTTP
  async headers() {
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(self), geolocation=()' },
      // Content Security Policy (stricta)
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: https://images.unsplash.com https://plus.unsplash.com https://*.supabase.co blob:",
          "font-src 'self' data:",
          "connect-src 'self' https://*.supabase.co https://generativelanguage.googleapis.com https://api.resend.com",
          "media-src 'self' blob:",
          "frame-src 'none'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
        ].join('; '),
      },
    ];

    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Cabeceras de cache para assets estáticos
      {
        source: '/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  // Redirects — normalize trailing slashes
  async redirects() {
    return [
      // Normalizar trailing slashes
      {
        source: '/(.*)/',
        destination: '/$1',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
