'use client';

import { Container } from '@/components/ui/container';
import { AiLoader } from '@/components/ui/ai-loader';
import { TypewriterQuestions } from '@/components/ui/typewriter-questions';

const STEPS = [
  {
    number: '01',
    title: 'Remplissez le formulaire',
    description:
      "Décrivez votre activité, votre objectif et le style que vous voulez. Pas de jargon technique, juste vos mots.",
  },
  {
    number: '02',
    title: "L'IA génère votre site",
    description:
      "Textes professionnels, photos, structure complète. Tout est modifiable.",
  },
  {
    number: '03',
    title: 'Publiez en un clic',
    description:
      "Sous-domaine KR Global ou votre propre domaine. En ligne immédiatement.",
  }
];

const CIRCLE_STYLE = {
  backgroundColor: 'rgba(170,255,0,0.1)',
  border: '1px solid rgba(170,255,0,0.4)',
  color: '#AAFF00',
  boxShadow: '0 0 0 5px rgba(170,255,0,0.05)',
};

function BrowserMockup() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-lg">
      {/* Browser bar */}
      <div className="bg-[#1a1a1a] px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-2 bg-white/5 rounded px-3 py-0.5 text-[10px] text-muted/40 font-mono">
          siteasy.io
        </div>
      </div>
      {/* Fake site content */}
      <div className="bg-[#0e0e0e] p-3 space-y-2" style={{ height: 180 }}>
        {/* Hero */}
        <div className="rounded-lg h-8 w-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(170,255,0,0.25) 0%, rgba(0,180,120,0.2) 100%)' }}>
          <div className="h-1.5 w-1/2 rounded-full bg-white/20" />
        </div>
        {/* Text lines */}
        <div className="space-y-1.5 px-1">
          <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
          <div className="h-1.5 w-1/2 rounded-full bg-white/6" />
        </div>
        {/* Mini cards */}
        <div className="grid grid-cols-3 gap-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-7 rounded-md bg-white/5 border border-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="py-24">
      <Container>
        {/* Title */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted/50">
            Comment ça marche
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Créez votre site <span style={{ color: '#AAFF00' }}>en 3 étapes.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-white/8 bg-[#111113] overflow-hidden flex flex-col"
              style={{ height: 420 }}
            >
              {/* Visual zone — 55% */}
              <div
                className="flex overflow-hidden"
                style={{
                  height: '55%',
                  backgroundColor: '#111111',
                  padding: step.number === '01' ? 20 : 12,
                  paddingTop: step.number === '01' ? 20 : 24,
                  alignItems: step.number === '03' ? 'flex-start' : 'center',
                  justifyContent: 'center',
                }}
              >
                <div className="w-full" style={{ maxWidth: step.number === '01' ? '80%' : '95%', height: step.number !== '03' ? '100%' : undefined }}>
                  {step.number === '01' && <TypewriterQuestions />}
                  {step.number === '02' && <AiLoader size={110} text="" />}
                  {step.number === '03' && <BrowserMockup />}
                </div>
              </div>

              {/* Text zone — 45% */}
              <div className="flex flex-col justify-start px-6 pt-11 pb-4" style={{ height: '45%' }}>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={CIRCLE_STYLE}
                  >
                    {step.number}
                  </div>
                  <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted/70 pl-12">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}
