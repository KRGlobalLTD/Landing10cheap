'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Stepper } from '@/components/formulaire/Stepper';
import { EtapeProfil } from '@/components/formulaire/EtapeProfil';
import { Etape2 } from '@/components/formulaire/Etape2';
import { Etape3 } from '@/components/formulaire/Etape3';
import { FormulaireData, INITIAL_FORM_DATA } from '@/types/formulaire';
import { saveFormToStorage, loadFormFromStorage } from '@/hooks/useFormPersist';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FormulairePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<FormulaireData>(INITIAL_FORM_DATA);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const saved = loadFormFromStorage();
    const prefillMetier = searchParams.get('metier') || '';
    const prefillVille = searchParams.get('ville') || '';

    setData((prev) => {
      const next = { ...prev, ...(saved ?? {}) };
      if (prefillVille) next.ville = prefillVille;
      if (prefillMetier) { next.metier = prefillMetier; next.typeClient = 'professionnel'; }
      return next;
    });
  }, [searchParams]);

  function onChange<K extends keyof FormulaireData>(key: K, value: FormulaireData[K]) {
    setData((prev) => {
      const next = { ...prev, [key]: value };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { logoFile, ...rest } = next;
      saveFormToStorage(rest);
      return next;
    });
  }

  function onBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  const step1Valid = data.typeClient !== '' && (
    data.typeClient === 'professionnel'
      ? data.metier.trim() !== '' && data.nomEntreprise.trim() !== '' && data.ville.trim() !== '' && data.visibiliteAdresse !== ''
      : data.typeProjet !== ''
  );

  const step2Valid = data.objectifVisiteur !== '' && data.ton !== '';

  const step3Valid =
    data.prenom.trim() !== '' && EMAIL_REGEX.test(data.email) && data.rgpd;

  function isStepValid(s: number) {
    if (s === 1) return step1Valid;
    if (s === 2) return step2Valid;
    return step3Valid;
  }

  function goNext() { setDirection(1); setStep((s) => s + 1); }
  function goBack() { setDirection(-1); setStep((s) => s - 1); }

  async function handleSubmit() {
    setIsLoading(true);
    setSubmitError(null);
    try {
      const checkoutPayload = {
        customerEmail: data.email || undefined,
        businessName: data.nomEntreprise || data.typeProjet || undefined,
      };
      console.log('PAYLOAD ENVOYÉ:', JSON.stringify(checkoutPayload, null, 2));
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutPayload),
      });
      const payload = (await response.json()) as { error?: string; url?: string };
      if (!response.ok || !payload.url) {
        console.error('[checkout] Stripe API error:', payload);
        throw new Error(payload.error ?? 'Impossible de créer la session de paiement.');
      }
      window.location.href = payload.url;
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.');
      setIsLoading(false);
    }
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0, filter: 'blur(4px)' }),
    center: { x: 0, opacity: 1, filter: 'blur(0px)' },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, filter: 'blur(4px)' }),
  };

  const STEP_TITLES: Record<number, { title: string; sub: string }> = {
    1: { title: 'Votre profil', sub: 'Dites-nous qui vous êtes et décrivez votre activité.' },
    2: { title: 'Votre site', sub: 'Comment voulez-vous apparaître en ligne ?' },
    3: { title: 'Vos coordonnées', sub: 'Où vous envoyer votre site ?' },
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(170,255,0,0.15)' }}>
            <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none">
              <path d="M6 16l7 7 13-13" stroke="#AAFF00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Commande enregistrée !</h2>
          <p className="text-zinc-400">Redirection vers le paiement…</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <button
        onClick={() => router.back()}
        className="fixed left-6 top-6 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-zinc-400 backdrop-blur-sm transition-all hover:border-white/25 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Retour
      </button>
      <div className="mx-auto max-w-xl px-4 py-12">

        <div className="mb-10 text-center">
          <p className="mb-1 text-xs font-medium uppercase tracking-widest text-zinc-500">Créer mon site</p>
          <h1 className="text-2xl font-bold text-white">
            Votre site web en <span style={{ color: '#AAFF00' }}>30 secondes</span>
          </h1>
        </div>

        <div className="mb-10">
          <Stepper currentStep={step} />
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">{STEP_TITLES[step]?.title}</h2>
            <p className="mt-1 text-sm text-zinc-500">{STEP_TITLES[step]?.sub}</p>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 1 && <EtapeProfil data={data} onChange={onChange} />}
              {step === 2 && <Etape2 data={data} onChange={onChange} />}
              {step === 3 && <Etape3 data={data} onChange={onChange} touched={touched} onBlur={onBlur} />}
            </motion.div>
          </AnimatePresence>

          <div className={`mt-8 flex ${step > 1 ? 'justify-between' : 'justify-end'} items-center gap-4`}>
            {step > 1 && (
              <button type="button" onClick={goBack} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Retour
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={!isStepValid(step)}
                className="group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-zinc-950 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#AAFF00' }}
              >
                Continuer
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            ) : (
              <div className="w-full space-y-4">
                {submitError && (
                  <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {submitError}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!step3Valid || isLoading}
                  className="group flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-zinc-950 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#AAFF00' }}
                >
                  {isLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />Chargement…</>
                  ) : (
                    <>Passer au paiement — 14,99€<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
                  )}
                </button>
                <div className="flex flex-wrap justify-center gap-4">
                  {['Remboursé sous 7 jours', 'Hébergement inclus', 'Paiement sécurisé'].map((badge) => (
                    <span key={badge} className="flex items-center gap-1 text-xs text-zinc-500">
                      <span style={{ color: '#AAFF00' }}>✓</span>{badge}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-700">
          <button
            type="button"
            onClick={() => { setData(INITIAL_FORM_DATA); setStep(1); localStorage.removeItem('siteasy_form'); }}
            className="hover:text-zinc-400 transition-colors"
          >
            Recommencer depuis le début
          </button>
        </p>
      </div>
    </div>
  );
}
