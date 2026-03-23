'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

const QUESTIONS = [
  {
    id: 'activity',
    label: 'Quelle est votre activité ?',
    options: [
      { value: 'restaurant', label: '🍽️ Restaurant' },
      { value: 'artisan', label: '🔨 Artisan' },
      { value: 'freelance', label: '💻 Freelance' },
      { value: 'portfolio', label: '🎨 Portfolio' }
    ]
  },
  {
    id: 'goal',
    label: 'Quel est votre objectif principal ?',
    options: [
      { value: 'clients', label: '📞 Attirer des clients' },
      { value: 'showcase', label: '✨ Présenter mon travail' },
      { value: 'booking', label: '📅 Prendre des réservations' },
      { value: 'sell', label: '🛒 Vendre mes services' }
    ]
  },
  {
    id: 'style',
    label: 'Quel style vous correspond ?',
    options: [
      { value: 'minimal', label: '◽ Épuré & minimaliste' },
      { value: 'modern', label: '⚡ Moderne & tech' },
      { value: 'warm', label: '🌿 Chaleureux & naturel' },
      { value: 'bold', label: '🔥 Bold & impactant' }
    ]
  }
];

type Answers = Record<string, string>;

const PREVIEWS: Record<string, { headline: string; sub: string; accent: string; tag: string }> = {
  restaurant: {
    headline: 'Bienvenue au Provençal',
    sub: 'Cuisine méditerranéenne • Réservations ouvertes',
    accent: '#f59e0b',
    tag: 'Restaurant'
  },
  artisan: {
    headline: 'Menuiserie Leblanc',
    sub: 'Création sur-mesure depuis 1998 • Devis gratuit',
    accent: '#84cc16',
    tag: 'Artisan'
  },
  freelance: {
    headline: 'Sophie Martin — Dev Web',
    sub: 'Développement React & Node.js • Disponible',
    accent: '#38bdf8',
    tag: 'Freelance'
  },
  portfolio: {
    headline: 'Lucas Créations',
    sub: 'Photographe & Directeur artistique • Paris',
    accent: '#f472b6',
    tag: 'Portfolio'
  }
};

export function InteractiveDemoSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const currentQ = QUESTIONS[step];
  const preview = PREVIEWS[answers.activity ?? 'freelance'];

  function handleSelect(value: string) {
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(step + 1), 180);
    } else {
      setTimeout(() => setDone(true), 180);
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setDone(false);
  }

  return (
    <section id="demo" className="border-y border-white/5 py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted/50">
            Démo interactive
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            <span style={{ color: '#AAFF00' }}>Essayez maintenant</span> —{' '}
            sans inscription.
          </h2>
          <p className="mt-4 text-sm text-muted">
            Répondez aux questions ci-dessous et voyez votre site prendre forme en temps réel.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Left: wizard */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
            {!done ? (
              <>
                {/* Progress */}
                <div className="mb-6 flex gap-1.5">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        i <= step ? 'bg-accent' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>

                <p className="mb-1 text-xs text-muted/50">
                  Question {step + 1} / {QUESTIONS.length}
                </p>
                <h3 className="mb-5 text-base font-medium text-foreground">{currentQ.label}</h3>

                <div className="grid grid-cols-2 gap-3">
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className={`flex min-h-[52px] items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                        answers[currentQ.id] === opt.value
                          ? 'border-accent/60 bg-accent/10 text-foreground'
                          : 'border-white/8 bg-white/[0.02] text-muted hover:border-white/20 hover:bg-white/5 hover:text-foreground'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-5 py-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-2xl">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-foreground">Votre site est prêt !</p>
                  <p className="mt-1 text-sm text-muted">
                    En vrai, ça prendrait moins de 60 secondes.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {Object.entries(answers).map(([, v]) => (
                    <span
                      key={v}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted"
                    >
                      {v}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button href="/formulaire" className="h-10 rounded-full px-6 text-sm">
                    Créer le vrai
                  </Button>
                  <button
                    onClick={reset}
                    className="text-sm text-muted underline-offset-2 hover:text-foreground hover:underline"
                  >
                    Recommencer
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: live preview */}
          <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#0c0c0f] shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
            {/* Browser bar */}
            <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <div className="mx-auto h-5 w-40 rounded-md bg-white/5 px-2 flex items-center">
                <span className="text-[9px] text-muted/50 truncate">
                  votre-site.fr
                </span>
              </div>
            </div>

            {/* Preview content */}
            <div className="relative px-5 py-8 transition-all duration-500">
              {/* Glow accent */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20 transition-all duration-700"
                style={{
                  background: `radial-gradient(ellipse 60% 50% at 50% 100%, ${preview?.accent ?? '#8b5cf6'}40 0%, transparent 70%)`
                }}
              />

              {/* Fake nav */}
              <div className="mb-6 flex items-center justify-between">
                <div
                  className="h-3 w-20 rounded-full transition-colors duration-500"
                  style={{ backgroundColor: `${preview?.accent ?? '#8b5cf6'}60` }}
                />
                <div className="flex gap-2">
                  <div className="h-2 w-10 rounded-full bg-white/10" />
                  <div className="h-2 w-10 rounded-full bg-white/10" />
                  <div
                    className="h-5 w-14 rounded-full transition-colors duration-500"
                    style={{ backgroundColor: `${preview?.accent ?? '#8b5cf6'}50` }}
                  />
                </div>
              </div>

              {/* Fake hero text */}
              <div className="space-y-2 text-center">
                <div className="mx-auto inline-block rounded-full px-3 py-1 text-[10px] font-medium text-muted/60 border border-white/10 bg-white/5">
                  {preview?.tag ?? 'Votre site'}
                </div>
                <p className="text-base font-semibold text-foreground transition-all duration-500">
                  {preview?.headline ?? 'Votre site web'}
                </p>
                <p className="text-xs text-muted transition-all duration-500">
                  {preview?.sub ?? 'Répondez aux questions pour voir votre aperçu'}
                </p>
                <div
                  className="mx-auto mt-3 h-7 w-24 rounded-full transition-colors duration-500"
                  style={{ backgroundColor: `${preview?.accent ?? '#8b5cf6'}70` }}
                />
              </div>

              {/* Fake cards */}
              <div className="mt-6 grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-xl border border-white/5 bg-white/[0.02] p-3 space-y-1.5">
                    <div
                      className="h-1.5 w-8 rounded-full transition-colors duration-500"
                      style={{ backgroundColor: `${preview?.accent ?? '#8b5cf6'}50` }}
                    />
                    <div className="h-1.5 w-full rounded-full bg-white/10" />
                    <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
