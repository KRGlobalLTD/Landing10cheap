'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';
import { usePageTransition } from '@/components/ui/page-transition';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function BankCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ perspective: '1000px' }}>
      <div
        className="relative w-full rounded-2xl p-6 overflow-hidden cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'linear-gradient(135deg, #AAFF00 0%, #7acc00 50%, #5a9900 100%)',
          boxShadow: hovered
            ? '0 35px 70px rgba(170,255,0,0.4), 0 12px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.3)'
            : '0 25px 50px rgba(170,255,0,0.25), 0 8px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
          transform: hovered ? 'rotateX(8deg) rotateY(-12deg) translateY(-6px)' : 'rotateX(4deg) rotateY(-4deg)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.35s ease, box-shadow 0.35s ease',
          aspectRatio: '1.586',
        }}
      >
        {/* Reflet haut */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 40%, transparent 60%)',
          }}
        />
        {/* Cercles décoratifs */}
        <div
          className="absolute -right-8 -top-8 w-48 h-48 rounded-full opacity-20"
          style={{ background: 'rgba(0,0,0,0.3)' }}
        />
        <div
          className="absolute -right-4 -bottom-12 w-56 h-56 rounded-full opacity-15"
          style={{ background: 'rgba(0,0,0,0.25)' }}
        />

        {/* Logo */}
        <div className="relative flex items-center justify-between mb-6">
          <span className="text-sm font-bold tracking-widest text-black/60 uppercase">Siteasy</span>
          {/* Visa wordmark */}
          <svg viewBox="0 0 100 32" className="h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="26" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="900" fontStyle="italic" fill="rgba(0,0,0,0.5)">VISA</text>
          </svg>
        </div>

        {/* Puce EMV */}
        <div className="relative mb-5">
          <div
            className="w-10 h-8 rounded-md"
            style={{
              background: 'linear-gradient(135deg, #c8a800 0%, #f0d060 40%, #c8a800 100%)',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            <div className="w-full h-full rounded-md grid grid-cols-2 gap-px p-1 opacity-60">
              <div className="rounded-sm bg-yellow-600/50" />
              <div className="rounded-sm bg-yellow-600/50" />
              <div className="rounded-sm bg-yellow-600/50" />
              <div className="rounded-sm bg-yellow-600/50" />
            </div>
          </div>
        </div>

        {/* Numéro de carte */}
        <div className="relative mb-4">
          <p className="font-mono text-lg tracking-[0.2em] text-black/70 font-semibold">
            •••• •••• •••• 4242
          </p>
        </div>

        {/* Bas de carte */}
        <div className="relative flex items-end justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-black/40 mb-0.5">Titulaire</p>
            <p className="text-sm font-semibold text-black/60 tracking-wide">VOTRE NOM</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-widest text-black/40 mb-0.5">Expire</p>
            <p className="text-sm font-semibold text-black/60">12/28</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const appearance = {
  theme: 'night' as const,
  variables: {
    colorPrimary: '#AAFF00',
    colorBackground: '#111111',
    colorText: '#ffffff',
    colorTextSecondary: '#a1a1aa',
    colorDanger: '#f87171',
    borderRadius: '8px',
    fontFamily: 'inherit',
    spacingUnit: '4px',
  },
  rules: {
    '.Input': {
      border: '1px solid rgba(255,255,255,0.1)',
      backgroundColor: '#0a0a0a',
    },
    '.Input:focus': {
      border: '1px solid #AAFF00',
      boxShadow: '0 0 0 2px rgba(170,255,0,0.15)',
    },
    '.Label': {
      color: '#a1a1aa',
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
  },
};

function CheckoutForm({ prenom }: { prenom?: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setError(null);

    const returnUrl = new URL(`${window.location.origin}/succes`);
    if (prenom) returnUrl.searchParams.set('prenom', prenom);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl.toString(),
      },
    });

    if (stripeError) {
      setError(stripeError.message ?? 'Une erreur est survenue.');
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement options={{ layout: 'tabs' }} />

      {error && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full rounded-full py-4 text-sm font-semibold text-zinc-950 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#AAFF00' }}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Traitement…
          </span>
        ) : (
          'Payer — 9,99€'
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
        <ShieldCheck className="h-3.5 w-3.5" style={{ color: '#AAFF00' }} />
        Paiement 100% sécurisé via Stripe
      </div>
    </form>
  );
}

function CheckoutPageInner() {
  const { navigateTo } = usePageTransition();
  const searchParams = useSearchParams();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const prenom = searchParams.get('prenom') ?? undefined;

  useEffect(() => {
    const email = searchParams.get('email') ?? undefined;
    const business = searchParams.get('business') ?? undefined;
    const briefId = searchParams.get('briefId') ?? undefined; // FIXED: read briefId saved before payment

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerEmail: email, businessName: business, briefId }), // FIXED: pass briefId into Stripe metadata
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError(data.error ?? 'Erreur lors de la création du paiement.');
        }
      })
      .catch(() => setError('Erreur réseau. Veuillez réessayer.'));
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <button
        onClick={() => navigateTo('/formulaire')}
        className="fixed left-6 top-6 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-zinc-400 backdrop-blur-sm transition-all hover:border-white/25 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Retour
      </button>

      <div className="mx-auto max-w-5xl px-4 py-20">
        <div className="mb-10 text-center">
          <p className="mb-1 text-xs font-medium uppercase tracking-widest text-zinc-500">Finaliser</p>
          <h1 className="text-2xl font-bold text-white">
            Votre site web en <span style={{ color: '#AAFF00' }}>30 secondes</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-400">Hébergement inclus · Livraison instantanée</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="w-full lg:w-1/2">
            <BankCard />
          </div>

          <div className="w-full lg:w-1/2">
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8">
          {error ? (
            <div className="space-y-4 text-center">
              <p className="text-sm text-red-400">{error}</p>
              <button
                onClick={() => navigateTo('/formulaire')}
                className="text-sm text-zinc-400 underline hover:text-white"
              >
                Retour au formulaire
              </button>
            </div>
          ) : !clientSecret ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
            </div>
          ) : (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
              <CheckoutForm prenom={prenom} />
            </Elements>
          )}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
      <CheckoutPageInner />
    </Suspense>
  );
}
