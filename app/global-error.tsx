'use client';

/** Error boundary global — captura errores de toda la app.
 *  Muestra una UI mínima que no rompe el layout. */
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Loguear a Sentry o servicio de errores
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#050510',
          color: '#e8e0f0',
          fontFamily: 'system-ui, sans-serif',
          padding: '2rem',
        }}>
          <div style={{ maxWidth: '480px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌌</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Algo se ha roto
            </h1>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Ha ocurrido un error inesperado. Estamos trabajando en resolverlo.
              Si el problema persiste, prueba a recargar la página.
            </p>
            {error.digest && (
              <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem', fontFamily: 'monospace' }}>
                ID: {error.digest}
              </p>
            )}
            <button
              onClick={reset}
              style={{
                padding: '0.625rem 1.5rem',
                borderRadius: '9999px',
                background: '#7c3aed',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.8125rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Recargar la página
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
