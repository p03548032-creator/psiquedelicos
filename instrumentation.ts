/** Instrumentación global de Next.js 15.
 *  Registra errores y métricas de rendimiento.
 *
 *  Para Sentry:
 *    npm install @sentry/nextjs
 *    Añade NEXT_PUBLIC_SENTRY_DSN a .env.local
 *
 *  Para Web Vitals:
 *    npm install web-vitals
 *    Añade NEXT_PUBLIC_ENABLE_TELEMETRY=true */

export async function register() {
  // ── Sentry (opcional) ──
  // Se activa solo si @sentry/nextjs está instalado y DSN configurado
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const Sentry = require('@sentry/nextjs');
      Sentry.init({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE ?? '0.1'),
        replaysSessionSampleRate: 0.05,
        replaysOnErrorSampleRate: 1.0,
        environment: process.env.NODE_ENV,
      });
    } catch {
      // @sentry/nextjs no instalado — continuar sin tracking de errores
    }
  }

  // ── Web Vitals (opcional) ──
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_ENABLE_TELEMETRY === 'true') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { onCLS, onINP, onFCP, onLCP, onTTFB } = require('web-vitals');
      const report = ({ name, value, id }: { name: string; value: number; id: string }) => {
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/telemetry', JSON.stringify({
            name, value, id,
            route: window.__NEXT_DATA__?.page ?? window.location.pathname,
          }));
        }
      };
      onCLS(report); onINP(report); onFCP(report); onLCP(report); onTTFB(report);
    } catch {
      // web-vitals no disponible
    }
  }
}

export async function onRequestDone() {}

