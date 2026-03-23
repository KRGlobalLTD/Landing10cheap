'use client';

import { useState } from 'react';
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import { CreditCard3D } from '@/components/checkout/credit-card-3d';

export default function PaiementPage() {
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  function formatCardNumber(val: string) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }

  function formatExpiry(val: string) {
    const clean = val.replace(/\D/g, '').slice(0, 4);
    if (clean.length >= 3) return clean.slice(0, 2) + '/' + clean.slice(2);
    return clean;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-zinc-500">Étape finale</p>
          <h1 className="text-3xl font-bold tracking-tight">
            Informations de <span style={{ color: '#AAFF00' }}>paiement</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-400">Paiement unique sécurisé — 14,99€</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

          {/* Left — Card 3D */}
          <div className="flex flex-col items-center gap-4">
            <CreditCard3D />
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Lock className="h-3.5 w-3.5" />
              Connexion SSL 256-bit chiffrée
            </div>

          </div>

          {/* Right — Form */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8">
            <div className="space-y-5">

              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">Nom sur la carte</label>
                <input
                  type="text"
                  placeholder="Jean Dupont"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-[#AAFF00]/50 transition-colors"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">Numéro de carte</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-[#AAFF00]/50 transition-colors font-mono tracking-widest"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">Expiration</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-[#AAFF00]/50 transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-[#AAFF00]/50 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
                <span className="text-sm text-zinc-400">Total TTC · paiement unique</span>
                <span className="text-xl font-bold text-white">14,99€</span>
              </div>

              {/* CTA */}
              <button
                className="group flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-zinc-950 transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: '#AAFF00' }}
              >
                Confirmer le paiement
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Trust */}
              <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                <ShieldCheck className="h-4 w-4" style={{ color: '#AAFF00' }} />
                Satisfait ou remboursé sous 7 jours
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
