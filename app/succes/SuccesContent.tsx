'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Zap, Mail, HeadphonesIcon, ArrowRight, ShieldCheck, Clock, Globe } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  {
    icon: CheckCircle,
    title: 'Paiement validé',
    desc: 'Votre commande est enregistrée et sécurisée.',
    done: true,
  },
  {
    icon: Zap,
    title: 'Génération de votre site',
    desc: 'Votre landing page est créée et mise en ligne sous 30 secondes.',
    done: true,
  },
  {
    icon: Mail,
    title: 'Confirmation par email',
    desc: 'Un email récapitulatif avec le lien de votre site vous est envoyé.',
    done: false,
  },
  {
    icon: HeadphonesIcon,
    title: 'Accompagnement inclus',
    desc: 'Notre équipe reste disponible pour toute modification.',
    done: false,
  },
];

const BADGES = [
  { icon: ShieldCheck, label: 'Paiement sécurisé' },
  { icon: Clock, label: 'Livraison 30 sec' },
  { icon: Globe, label: 'Hébergement inclus' },
];

export default function SuccesContent({ prenom }: { prenom?: string }) {
  const [visible, setVisible] = useState(false);
  const [stepsVisible, setStepsVisible] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const timers = STEPS.map((_, i) =>
      setTimeout(() => {
        setStepsVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 600 + i * 150)
    );
    return () => {
      clearTimeout(t1);
      timers.forEach(clearTimeout);
    };
  }, []);

  const displayName = prenom
    ? prenom.charAt(0).toUpperCase() + prenom.slice(1).toLowerCase()
    : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-16">
      <div
        className="w-full max-w-lg"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        {/* Icône succès */}
        <div className="mb-8 flex justify-center">
          <div
            className="relative flex h-20 w-20 items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(170,255,0,0.1)', border: '1px solid rgba(170,255,0,0.25)' }}
          >
            <CheckCircle className="h-9 w-9" style={{ color: '#AAFF00' }} />
            {/* Pulse ring */}
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ backgroundColor: 'rgba(170,255,0,0.15)', animationDuration: '2s' }}
            />
          </div>
        </div>

        {/* Titre */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-zinc-500">
            Commande confirmée
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {displayName ? (
              <>Merci, <span style={{ color: '#AAFF00' }}>{displayName}</span>&nbsp;!</>
            ) : (
              <>Merci pour votre <span style={{ color: '#AAFF00' }}>confiance</span>&nbsp;!</>
            )}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-zinc-400">
            Votre paiement a bien été reçu. Votre site web est en cours de préparation — vous recevrez un email de confirmation dans quelques instants.
          </p>
        </div>

        {/* Étapes */}
        <div className="mb-8 rounded-2xl border border-white/8 bg-white/[0.02] p-6">
          <p className="mb-5 text-xs font-medium uppercase tracking-widest text-zinc-500">
            Ce qui se passe maintenant
          </p>
          <div className="space-y-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4"
                  style={{
                    opacity: stepsVisible[i] ? 1 : 0,
                    transform: stepsVisible[i] ? 'translateX(0)' : 'translateX(-12px)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                  }}
                >
                  <div
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: step.done ? 'rgba(170,255,0,0.12)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${step.done ? 'rgba(170,255,0,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    }}
                  >
                    <Icon
                      className="h-4 w-4"
                      style={{ color: step.done ? '#AAFF00' : '#52525b' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${step.done ? 'text-white' : 'text-zinc-500'}`}>
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-zinc-600">{step.desc}</p>
                  </div>
                  {step.done && (
                    <div
                      className="mt-1 h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: '#AAFF00' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges de réassurance */}
        <div className="mb-8 flex justify-center gap-6">
          {BADGES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Icon className="h-4 w-4 text-zinc-400" />
              </div>
              <span className="text-center text-[10px] text-zinc-600">{label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-zinc-950 transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: '#AAFF00' }}
          >
            Retour à l'accueil
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-700">
          Un problème ?{' '}
          <a
            href="mailto:contact@krglobalsolutionsltd.com"
            className="text-zinc-500 underline underline-offset-2 hover:text-white transition-colors"
          >
            Contactez-nous
          </a>
        </p>
      </div>
    </div>
  );
}
