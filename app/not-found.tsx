import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{
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
        <div style={{
          fontSize: '4rem',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #7c3aed, #db2777)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
          lineHeight: 1,
        }}>
          404
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Página no encontrada
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Esta ruta no existe o ha sido movida. Puede que el contenido que buscas
          aún no esté disponible.
        </p>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.625rem 1.5rem',
          borderRadius: '9999px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#e8e0f0',
          fontWeight: 500,
          fontSize: '0.8125rem',
          textDecoration: 'none',
        }}>
          ← Volver al mapa
        </Link>
      </div>
    </main>
  );
}
