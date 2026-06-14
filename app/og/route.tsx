import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          background: 'linear-gradient(135deg, #050510 0%, #0f1729 40%, #1a0a2e 100%)',
          padding: '60px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              boxShadow: '0 0 40px rgba(124, 58, 237, 0.5)',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="4" fill="#a855f7" />
              <line x1="12" y1="2" x2="12" y2="6" stroke="#fff" strokeWidth="1.5" />
              <line x1="12" y1="18" x2="12" y2="22" stroke="#fff" strokeWidth="1.5" />
              <line x1="2" y1="12" x2="6" y2="12" stroke="#fff" strokeWidth="1.5" />
              <line x1="18" y1="12" x2="22" y2="12" stroke="#fff" strokeWidth="1.5" />
            </svg>
          </div>
          <span
            style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#fff',
              letterSpacing: '-0.5px',
            }}
          >
            PortalPSY
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <h1
            style={{
              fontSize: '56px',
              fontWeight: '800',
              color: '#fff',
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: '-1px',
            }}
          >
            Antes de decidir,
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              infórmate.
            </span>
          </h1>

          <p
            style={{
              fontSize: '22px',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.5,
              margin: 0,
              maxWidth: '700px',
            }}
          >
            Información rigurosa sobre psicodélicos.{' '}
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>
              Sin ventas, sin alarmismo.
            </span>
          </p>
        </div>

        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '60px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '120px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
