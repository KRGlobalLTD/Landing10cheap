'use client';

const LIME = '#AAFF00';

function Badge({ label }: { label: string }) {
  return (
    <span style={{ backgroundColor: '#1a1a1a', color: LIME, fontSize: 11, padding: '3px 8px', borderRadius: 4, display: 'inline-block', marginBottom: 16 }}>
      {label}
    </span>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      className="group"
      style={{
        backgroundColor: '#111111',
        border: '1px solid #1f1f1f',
        borderRadius: 16,
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 200ms, transform 200ms',
        ...style,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '#2a2a2a';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '#1f1f1f';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}
    >
      {children}
    </div>
  );
}

function PerformancesCard() {
  return (
    <Card style={{ height: 260 }}>
      <Badge label="Performance" />
      {/* Visuel */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ fontSize: 64, fontWeight: 700, color: LIME, lineHeight: 1 }}>94</span>
        <div style={{ width: '80%', height: 4, backgroundColor: '#1a1a1a', borderRadius: 2, marginTop: 10 }}>
          <div style={{ width: '94%', height: '100%', backgroundColor: LIME, borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>Performances maximales</h3>
        <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
          Score Lighthouse 90+ par défaut. Images optimisées, chargement rapide.
        </p>
      </div>
    </Card>
  );
}

function SeoCard() {
  const bullets = ['SSR / rendu serveur', 'Schema.org LocalBusiness', 'Sitemap automatique', 'Meta tags optimisés'];
  return (
    <Card style={{ height: 260, padding: 0, overflow: 'hidden' }}>
      {/* Zone visuelle haut */}
      <div style={{ backgroundColor: '#0d0d0d', padding: '16px 20px', height: 110, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 7 }}>
        {bullets.map(b => (
          <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: LIME, fontSize: 13, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 13, color: '#ffffff' }}>{b}</span>
          </div>
        ))}
      </div>
      {/* Texte bas */}
      <div style={{ padding: '20px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Badge label="SEO" />
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>Optimisé pour Google</h3>
        <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
          Rendu serveur, Schema.org, sitemap automatique.
        </p>
      </div>
    </Card>
  );
}

function DesignCard() {
  const colors = ['#c9a96e', '#2d6a4f', '#1d3557', '#e63946', '#9b5de5'];
  return (
    <Card style={{ height: 260, padding: 0, overflow: 'hidden' }}>
      {/* Zone visuelle haut */}
      <div style={{ backgroundColor: '#0d0d0d', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', flex: 1 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          {colors.map(c => (
            <div key={c} style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: c, flexShrink: 0 }} />
          ))}
        </div>
        <span style={{ fontSize: 10, color: '#6b7280' }}>Palette personnalisée</span>
      </div>
      {/* Texte bas */}
      <div style={{ padding: '20px' }}>
        <Badge label="Design" />
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>Un design fait pour vous.</h3>
        <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
          Choisissez votre palette de couleurs. La typographie s&apos;adapte automatiquement à votre style.
        </p>
      </div>
    </Card>
  );
}

function HostingCard() {
  return (
    <Card style={{ height: 260, padding: 0, overflow: 'hidden' }}>
      {/* Zone visuelle haut — mockup navigateur */}
      <div style={{ backgroundColor: '#0d0d0d', padding: '16px 20px', flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ borderRadius: 8, border: '1px solid #2a2a2a', overflow: 'hidden', width: '100%' }}>
          <div style={{ backgroundColor: '#1a1a1a', height: 28, display: 'flex', alignItems: 'center', padding: '0 10px', gap: 8 }}>
            <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
              {['#ef4444', '#eab308', '#22c55e'].map(c => (
                <div key={c} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: c, opacity: 0.8 }} />
              ))}
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <span style={{ fontSize: 11, color: LIME }}>votresite.siteasy.io</span>
            </div>
          </div>
          <div style={{ backgroundColor: '#0d0d0d', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ width: '65%', height: 12, backgroundColor: 'rgba(170,255,0,0.4)', borderRadius: 3 }} />
            <div style={{ width: '80%', height: 6, backgroundColor: '#2a2a2a', borderRadius: 2 }} />
            <div style={{ width: '55%', height: 6, backgroundColor: '#2a2a2a', borderRadius: 2 }} />
            <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
              <div style={{ width: 40, height: 30, backgroundColor: '#1a1a1a', borderRadius: 4 }} />
              <div style={{ width: 40, height: 30, backgroundColor: '#1a1a1a', borderRadius: 4 }} />
            </div>
          </div>
        </div>
      </div>
      {/* Texte bas */}
      <div style={{ padding: '4px 20px 20px' }}>
        <Badge label="Hébergement" />
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>En ligne en un clic</h3>
        <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
          Sous-domaine siteasy.io ou votre propre domaine. SSL automatique.
        </p>
      </div>
    </Card>
  );
}

export function FeaturesSection() {
  return (
    <section className="border-y border-white/5 py-24">
      <div style={{ maxWidth: 900, margin: '0 auto', paddingLeft: 40, paddingRight: 40 }}>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-14">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted/50">Ce qui est inclus</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Tout ce dont vous avez besoin.{' '}
            <span style={{ color: LIME }}>Rien de superflu.</span>
          </h2>
          <p className="mt-4 text-sm text-muted">
            Chaque site généré embarque d&apos;office tout ce qu&apos;une agence facturerait en supplément.
          </p>
        </div>

        {/* Bento — desktop */}
        <div className="hidden lg:flex lg:flex-col" style={{ gap: 10 }}>
          {/* Row 1 — 58 / 42 */}
          <div style={{ display: 'grid', gridTemplateColumns: '58fr 42fr', gap: 10 }}>
            <PerformancesCard />
            <SeoCard />
          </div>
          {/* Row 2 — 42 / 58 */}
          <div style={{ display: 'grid', gridTemplateColumns: '42fr 58fr', gap: 10 }}>
            <DesignCard />
            <HostingCard />
          </div>
        </div>

        {/* Mobile — stacked */}
        <div className="flex flex-col gap-4 lg:hidden">
          <PerformancesCard />
          <SeoCard />
          <DesignCard />
          <HostingCard />
        </div>
      </div>
    </section>
  );
}
