'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { ArrowRight, Mail } from 'lucide-react';

export function EmailCaptureSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="py-16">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] px-8 py-10 text-center">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(170,255,0,0.05) 0%, transparent 70%)' }}
          />
          <div className="relative">
            <div className="mb-1 flex items-center justify-center gap-2">
              <Mail className="h-4 w-4" style={{ color: '#AAFF00' }} />
              <p className="text-xs font-medium uppercase tracking-widest text-muted/50">Pas encore prêt ?</p>
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">
              Reçois un exemple de site gratuit
            </h3>
            <p className="mb-6 text-sm text-muted">
              On t&apos;envoie un exemple concret dans ton secteur pour que tu voies ce qu&apos;on peut faire pour toi.
            </p>

            {submitted ? (
              <p className="text-sm font-medium" style={{ color: '#AAFF00' }}>
                ✓ C&apos;est noté — regarde ta boîte mail dans quelques minutes.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mx-auto flex max-w-sm gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted/40 outline-none focus:border-[#AAFF00]/40"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#AAFF00' }}
                >
                  Envoyer
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
