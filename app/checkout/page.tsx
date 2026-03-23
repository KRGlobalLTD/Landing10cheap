'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowRight, Loader2, ShieldCheck, Clock, Pencil } from 'lucide-react';
import { CreditCard3D } from '@/components/checkout/credit-card-3d';

const INCLUDED = [
  'Site web complet livré en 24h',
  'Design unique adapté à votre activité',
  'Hébergement 1 an inclus',
  '1 modification mineure offerte',
  'Support par e-mail',
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const briefId = searchParams.get('briefId');
  const email = searchParams.get('email');
  const business = searchParams.get('business');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    if (isLoading || !briefId) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerEmail: email, businessName: business, briefId }),
      });
      const payload = (await response.json()) as { error?: string; url?: string };
      if (!response.ok || !payload.url) throw new Error(payload.error ?? 'Impossible de créer la session de paiement.');
      window.location.assign(payload.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.');
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted/50">Paiement sécurisé</p>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Votre site web en{' '}
            <span style={{ color: '#AAFF00' }}>24h.</span>
          </h1>
          {business && (
            <p className="mt-2 text-sm text-zinc-400">
              Pour <span className="font-medium text-white">{business}</span>
            </p>
          )}
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

          {/* Left — Card 3D */}
          <div className="flex flex-col items-center gap-6" style={{ marginTop: '-90px' }}>
            <CreditCard3D />
          </div>

          {/* Right — Recap + CTA */}
          <div className="flex flex-col gap-6">

            {/* Included list */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <h2 className="mb-4 text-sm font-semibold text-white">Ce qui est inclus</h2>
              <ul className="space-y-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                    <span style={{ color: '#AAFF00' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price recap */}
            <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4">
              <span className="text-sm text-zinc-400">Total TTC</span>
              <span className="text-2xl font-bold text-white">14,99€</span>
            </div>

            {/* Guarantees */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <ShieldCheck className="h-4 w-4" style={{ color: '#AAFF00' }} />
                Paiement sécurisé Stripe
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <Clock className="h-4 w-4" style={{ color: '#AAFF00' }} />
                Livraison sous 24h
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <Pencil className="h-4 w-4" style={{ color: '#AAFF00' }} />
                1 modif. offerte
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            {/* CTA */}
            <button
              onClick={handlePay}
              disabled={isLoading || !briefId}
              className="group flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-zinc-950 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
              style={{ backgroundColor: '#AAFF00' }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Redirection vers le paiement…
                </>
              ) : (
                <>
                  Payer maintenant — 14,99€
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <button
              onClick={() => router.push('/formulaire')}
              className="text-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              ← Modifier mon formulaire
            </button>

            <p className="text-center text-xs text-zinc-600">
              Satisfait ou remboursé sous 7 jours · Aucun abonnement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  );
}
