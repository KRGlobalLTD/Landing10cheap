'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/container';

const STATS = [
  { target: 2400, prefix: '', suffix: ' +', decimals: 0, label: 'Sites générés' },
  { target: 4.9,  prefix: '', suffix: ' / 5', decimals: 1, label: 'Note moyenne' },
  { target: 24,   prefix: '', suffix: 'h', decimals: 0, label: 'Délai de livraison' },
  { target: 98,   prefix: '', suffix: ' %', decimals: 0, label: 'Clients satisfaits' },
];

function useCountUp(target: number, decimals: number, duration: number, started: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [started, target, decimals, duration]);

  return value;
}

function StatCounter({ stat, started, index }: { stat: typeof STATS[0]; started: boolean; index: number }) {
  const value = useCountUp(stat.target, stat.decimals, 1800, started);
  const display = stat.decimals > 0 ? value.toFixed(stat.decimals) : Math.floor(value).toLocaleString('fr-FR');

  return (
    <div
      className="flex flex-col items-center gap-1 py-2 text-center"
      style={{
        borderRight: index === STATS.length - 1 ? 'none' : '1px solid rgba(170,255,0,0.5)',
      }}
    >
      <span className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">
        {stat.prefix}{display}{stat.suffix}
      </span>
      <span className="text-base text-muted">{stat.label}</span>
    </div>
  );
}

export function SocialProofSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="border-y border-white/5 py-16">
      <Container>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCounter key={stat.label} stat={stat} started={started} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
