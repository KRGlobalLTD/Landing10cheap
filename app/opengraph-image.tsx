import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'KR Global Solutions LTD — Votre site web professionnel en 30 secondes pour 9,99€';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#070707',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px 80px',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(170,255,0,0.12)',
            border: '1px solid rgba(170,255,0,0.3)',
            borderRadius: 999,
            padding: '8px 20px',
            marginBottom: 40,
          }}
        >
          <span style={{ color: '#AAFF00', fontSize: 16, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            KR Global Solutions LTD
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#f4f4f5',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Votre site web en{' '}
          <span style={{ color: '#AAFF00' }}>30 secondes</span>
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: 28,
            color: '#a1a1aa',
            textAlign: 'center',
            lineHeight: 1.4,
            marginBottom: 48,
          }}
        >
          Design professionnel · Hébergement inclus · Mise en ligne immédiate
        </div>

        {/* Price pill */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#AAFF00',
            borderRadius: 999,
            padding: '14px 40px',
          }}
        >
          <span style={{ color: '#070707', fontSize: 28, fontWeight: 800 }}>
            9,99€ — Commencer maintenant
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
