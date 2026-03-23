'use client';

import { useEffect, useRef, useState } from 'react';

const LIME = '#AAFF00';

function Badge({ label }: { label: string }) {
  return (
    <span style={{ backgroundColor: '#1a1a1a', color: LIME, fontSize: 11, padding: '3px 8px', borderRadius: 4, display: 'inline-block', marginBottom: 16 }}>
      {label}
    </span>
  );
}

import React from 'react';

const Card = React.forwardRef<HTMLDivElement, { children: React.ReactNode; style?: React.CSSProperties }>(
  function Card({ children, style }, ref) {
  return (
    <div
      ref={ref}
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
});
Card.displayName = 'Card';

function PerformancesCard({ started }: { started: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const duration = 1400;
    const target = 94;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started]);

  return (
    <Card style={{ height: 260 }}>
      <Badge label="Performance" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ fontSize: 64, fontWeight: 700, color: LIME, lineHeight: 1 }}>{count}</span>
        <div style={{ width: '80%', height: 4, backgroundColor: '#1a1a1a', borderRadius: 2, marginTop: 10 }}>
          <div style={{ width: `${count}%`, height: '100%', backgroundColor: LIME, borderRadius: 2 }} />
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
      <div style={{ backgroundColor: '#0d0d0d', paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 8, height: 110, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 7 }}>
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

function DesignCard({ started }: { started: boolean }) {
  const colors = ['#c9a96e', '#2d6a4f', '#1d3557', '#e63946', '#9b5de5'];
  const [visible, setVisible] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          colors.forEach((_, i) => {
            setTimeout(() => setVisible(i + 1), i * 200);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Card style={{ height: 260, padding: 0, overflow: 'hidden' }} ref={cardRef}>
      {/* Zone visuelle haut */}
      <div style={{ backgroundColor: '#0d0d0d', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', flex: 1 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          {colors.map((c, i) => (
            <div
              key={c}
              style={{
                width: 20, height: 20, borderRadius: '50%', backgroundColor: c, flexShrink: 0,
                opacity: i < visible ? 1 : 0,
                transform: i < visible ? 'scale(1)' : 'scale(0.4)',
                transition: 'opacity 300ms ease, transform 300ms ease',
              }}
            />
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

const DOMAINS = ['café-de-paris.fr', 'café-de-paris.krglobalsolutionsltd.com'];

function HostingCard() {
  const [domainIdx, setDomainIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setDomainIdx(i => (i + 1) % DOMAINS.length);
        setFade(true);
      }, 220);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card style={{ height: 260, padding: 0, overflow: 'hidden' }}>
      {/* Zone visuelle haut — mockup navigateur */}
      <div style={{ backgroundColor: '#0d0d0d', paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 0, height: 110, display: 'flex', alignItems: 'flex-start' }}>
        <div style={{ borderRadius: 8, border: '1px solid #2a2a2a', overflow: 'hidden', width: '100%' }}>
          <div style={{ backgroundColor: '#1a1a1a', height: 32, display: 'flex', alignItems: 'center', padding: '0 8px', gap: 6 }}>
            {/* Boutons macOS */}
            <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
              {['#ef4444', '#eab308', '#22c55e'].map(c => (
                <div key={c} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: c, opacity: 0.8 }} />
              ))}
            </div>
            {/* Barre d'adresse */}
            <div style={{ flex: 1, backgroundColor: '#111111', borderRadius: 4, border: '1px solid #2a2a2a', height: 20, display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4, overflow: 'hidden' }}>
              {/* Icône cadenas */}
              <svg width="8" height="9" viewBox="0 0 8 9" fill="none" style={{ flexShrink: 0 }}>
                <rect x="1" y="4" width="6" height="5" rx="1" fill="#4b5563" />
                <path d="M2.5 4V2.5a1.5 1.5 0 013 0V4" stroke="#4b5563" strokeWidth="1" fill="none" />
              </svg>
              <span style={{
                fontSize: 10,
                color: '#6b7280',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'inline-block',
                transition: 'opacity 220ms ease, transform 220ms ease',
                opacity: fade ? 1 : 0,
                transform: fade ? 'translateY(0)' : 'translateY(-6px)',
              }}>
                {DOMAINS[domainIdx]}
              </span>
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
      <div style={{ padding: '48px 20px 20px' }}>
        <Badge label="Hébergement" />
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>En ligne en un clic</h3>
        <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
          Sous-domaine krglobalsolutionsltd.com ou votre propre domaine.
        </p>
      </div>
    </Card>
  );
}

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="border-y border-white/5 py-24">
      <div ref={ref} className="px-4 md:px-[40px]" style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Un site complet,{' '}
            <span style={{ color: LIME }}>pas un template vide.</span>
          </h2>
          <p className="mt-4 text-sm text-muted">
            Chaque site généré embarque d&apos;office tout ce qu&apos;une agence facturerait en supplément.
          </p>
        </div>

        {/* Bento — desktop */}
        <div className="hidden lg:flex lg:flex-col" style={{ gap: 16 }}>
          {/* Row 1 — 58 / 42 */}
          <div style={{ display: 'grid', gridTemplateColumns: '58fr 42fr', gap: 16 }}>
            <PerformancesCard started={started} />
            <SeoCard />
          </div>
          {/* Row 2 — 42 / 58 */}
          <div style={{ display: 'grid', gridTemplateColumns: '42fr 58fr', gap: 16 }}>
            <DesignCard started={started} />
            <HostingCard />
          </div>
        </div>

        {/* Mobile — stacked */}
        <div className="flex flex-col gap-4 lg:hidden">
          <PerformancesCard started={started} />
          <SeoCard />
          <DesignCard started={started} />
          <HostingCard />
        </div>
      </div>
    </section>
  );
}
