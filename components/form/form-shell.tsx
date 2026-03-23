'use client';

import { useEffect, useMemo, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { Card } from '@/components/ui/card';
import { FormProgress } from '@/components/form/form-progress';
import { StepNavigation } from '@/components/form/step-navigation';
import { FormStepDefinition, FormStepKey } from '@/lib/types/form';
import { User, Target, Package, Palette, FileText, Mail, ClipboardList } from 'lucide-react';
import { clientFormSchema } from '@/lib/validations/form';
import {
  clearBriefIdFromStorage,
  clearFormDraftFromStorage,
  readBriefIdFromStorage,
  readFormDraftFromStorage,
  saveBriefIdToStorage,
  saveFormDraftToStorage
} from '@/lib/utils/storage';
import { SITEASY_PAYMENT } from '@/lib/constants/payment';
import { ActivityStep } from './steps/activity-step';
import { ContactDeliveryStep } from './steps/contact-delivery-step';
import { ContentStep } from './steps/content-step';
import { DesignStep } from './steps/design-step';
import { IdentityStep } from './steps/identity-step';
import { OfferStep } from './steps/offer-step';
import { ReviewStep } from './steps/review-step';
import { FormData, FormFilesData, INITIAL_FORM_DATA, INITIAL_FORM_FILES } from './steps/types';

type StepDefinition = FormStepDefinition & {
  icon: React.ComponentType<{ className?: string }>;
  render: (props: {
    data: FormData;
    files: FormFilesData;
    onSectionChange: <K extends keyof FormData>(
      section: K,
      field: keyof FormData[K],
      value: string
    ) => void;
    onFilesChange: (field: keyof FormFilesData, files: File[]) => void;
    onEditSection: (step: FormStepKey) => void;
  }) => JSX.Element;
};

const STEP_DEFINITIONS: StepDefinition[] = [
  {
    index: 0,
    key: 'identity',
    title: 'Votre activité',
    description: "Comment s'appelle votre entreprise et dans quel secteur travaillez-vous ?",
    icon: User,
    render: ({ data, files, onSectionChange, onFilesChange }) => (
      <IdentityStep
        data={data}
        files={files}
        onSectionChange={onSectionChange}
        onFilesChange={onFilesChange}
      />
    )
  },
  {
    index: 1,
    key: 'business',
    title: 'Vos clients',
    description: "Qui cherchez-vous à atteindre et quel est l'objectif de votre site ?",
    icon: Target,
    render: ({ data, files, onSectionChange, onFilesChange }) => (
      <ActivityStep
        data={data}
        files={files}
        onSectionChange={onSectionChange}
        onFilesChange={onFilesChange}
      />
    )
  },
  {
    index: 2,
    key: 'offer',
    title: 'Votre offre',
    description: 'Que proposez-vous et à quel prix ? Décrivez votre service principal.',
    icon: Package,
    render: ({ data, files, onSectionChange, onFilesChange }) => (
      <OfferStep data={data} files={files} onSectionChange={onSectionChange} onFilesChange={onFilesChange} />
    )
  },
  {
    index: 3,
    key: 'design',
    title: 'Votre style',
    description: 'Quel look souhaitez-vous ? Partagez vos inspirations visuelles.',
    icon: Palette,
    render: ({ data, files, onSectionChange, onFilesChange }) => (
      <DesignStep
        data={data}
        files={files}
        onSectionChange={onSectionChange}
        onFilesChange={onFilesChange}
      />
    )
  },
  {
    index: 4,
    key: 'content',
    title: 'Votre contenu',
    description: 'Quels textes, photos ou pages souhaitez-vous inclure ?',
    icon: FileText,
    render: ({ data, files, onSectionChange, onFilesChange }) => (
      <ContentStep
        data={data}
        files={files}
        onSectionChange={onSectionChange}
        onFilesChange={onFilesChange}
      />
    )
  },
  {
    index: 5,
    key: 'contact',
    title: 'Vos coordonnées',
    description: 'Comment vous contacter et quand souhaitez-vous recevoir votre site ?',
    icon: Mail,
    render: ({ data, files, onSectionChange, onFilesChange }) => (
      <ContactDeliveryStep
        data={data}
        files={files}
        onSectionChange={onSectionChange}
        onFilesChange={onFilesChange}
      />
    )
  },
  {
    index: 6,
    key: 'review',
    title: 'Récapitulatif',
    description: 'Vérifiez vos informations avant de procéder au paiement.',
    icon: ClipboardList,
    render: ({ data, onEditSection }) => <ReviewStep data={data} onEditSection={onEditSection} />
  }
];

function mergeFormDataWithInitial(data: Partial<FormData>): FormData {
  return {
    identity: {
      ...INITIAL_FORM_DATA.identity,
      ...data.identity
    },
    business: {
      ...INITIAL_FORM_DATA.business,
      ...data.business
    },
    offer: {
      ...INITIAL_FORM_DATA.offer,
      ...data.offer
    },
    design: {
      ...INITIAL_FORM_DATA.design,
      ...data.design
    },
    content: {
      ...INITIAL_FORM_DATA.content,
      ...data.content
    },
    contact: {
      ...INITIAL_FORM_DATA.contact,
      ...data.contact
    }
  };
}

function getFirstValidationErrorMessage(data: FormData) {
  const validationResult = clientFormSchema.safeParse(data);

  if (validationResult.success) {
    return null;
  }

  return validationResult.error.issues[0]?.message ?? 'Veuillez compléter correctement les champs requis.';
}

function toAssetFileNames(files: File[]): string[] {
  return files.map((file) => file.name).filter((fileName) => fileName.trim().length > 0);
}

export function FormShell() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [formFiles, setFormFiles] = useState<FormFilesData>(INITIAL_FORM_FILES);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [hasHydratedFromStorage, setHasHydratedFromStorage] = useState(false);
  const [briefId, setBriefId] = useState<string | null>(null);

  const totalSteps = STEP_DEFINITIONS.length;
  const currentStepNumber = currentStepIndex + 1;
  const currentStep = STEP_DEFINITIONS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  useEffect(() => {
    const persistedDraft = readFormDraftFromStorage();

    if (persistedDraft) {
      setFormData(mergeFormDataWithInitial(persistedDraft.data));

      setCurrentStepIndex(() => {
        const maxStepIndex = totalSteps - 1;

        if (persistedDraft.currentStepIndex < 0) {
          return 0;
        }

        if (persistedDraft.currentStepIndex > maxStepIndex) {
          return maxStepIndex;
        }

        return persistedDraft.currentStepIndex;
      });
    }

    setBriefId(readBriefIdFromStorage());
    setHasHydratedFromStorage(true);
  }, [totalSteps]);

  useEffect(() => {
    if (!hasHydratedFromStorage) {
      return;
    }

    saveFormDraftToStorage({
      data: formData,
      currentStepIndex
    });
  }, [currentStepIndex, formData, hasHydratedFromStorage]);

  const onSectionChange = <K extends keyof FormData>(
    section: K,
    field: keyof FormData[K],
    value: string
  ) => {
    setFormData((previousData) => ({
      ...previousData,
      [section]: {
        ...previousData[section],
        [field]: value
      }
    }));

    setCheckoutError(null);
  };

  const onFilesChange = (field: keyof FormFilesData, files: File[]) => {
    setFormFiles((previousFiles) => ({
      ...previousFiles,
      [field]: files
    }));
  };

  const handleNext = () => {
    if (isLastStep || isCreatingCheckoutSession) {
      return;
    }

    setCurrentStepIndex((previousIndex) => previousIndex + 1);
  };

  const handlePrevious = () => {
    if (isFirstStep || isCreatingCheckoutSession) {
      return;
    }

    setCurrentStepIndex((previousIndex) => previousIndex - 1);
    setCheckoutError(null);
  };

  const createOrUpdateBrief = async () => {
    const briefResponse = await fetch('/api/briefs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        briefId: briefId ?? undefined,
        formData,
        assets: {
          logoFileNames: toAssetFileNames(formFiles.logo),
          photoFileNames: toAssetFileNames(formFiles.photos)
        }
      })
    });

    const briefPayload = (await briefResponse.json()) as { error?: string; briefId?: string };

    if (!briefResponse.ok || !briefPayload.briefId) {
      throw new Error(briefPayload.error ?? 'Impossible de sauvegarder le brief client.');
    }

    setBriefId(briefPayload.briefId);
    saveBriefIdToStorage(briefPayload.briefId);

    return briefPayload.briefId;
  };

  const handleStartCheckout = async () => {
    if (isCreatingCheckoutSession) {
      return;
    }

    const validationError = getFirstValidationErrorMessage(formData);

    if (validationError) {
      setCheckoutError(validationError);
      return;
    }

    setCheckoutError(null);
    setIsCreatingCheckoutSession(true);

    try {
      const persistedBriefId = await createOrUpdateBrief();
      trackEvent('begin_checkout', { source: 'formulaire' });

      const params = new URLSearchParams({
        briefId: persistedBriefId,
        email: formData.contact.email,
        business: formData.identity.brandName,
      });
      window.location.assign(`/checkout?${params.toString()}`);
    } catch (error) {
      const fallbackErrorMessage = "Le paiement n'a pas pu être lancé. Veuillez réessayer dans un instant.";
      setCheckoutError(error instanceof Error ? error.message : fallbackErrorMessage);
      setIsCreatingCheckoutSession(false);
    }
  };

  const handleResetForm = () => {
    if (isCreatingCheckoutSession) {
      return;
    }

    setFormData(INITIAL_FORM_DATA);
    setFormFiles(INITIAL_FORM_FILES);
    setCurrentStepIndex(0);
    setCheckoutError(null);
    setBriefId(null);
    clearFormDraftFromStorage();
    clearBriefIdFromStorage();
  };

  const handleEditSection = (step: FormStepKey) => {
    if (isCreatingCheckoutSession) {
      return;
    }

    const targetStepIndex = STEP_DEFINITIONS.findIndex((definition) => definition.key === step);

    if (targetStepIndex === -1 || targetStepIndex === currentStepIndex) {
      return;
    }

    setCurrentStepIndex(targetStepIndex);
    setCheckoutError(null);
  };

  const wasPaymentCancelled = useMemo(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const search = new URLSearchParams(window.location.search);
    return search.get('payment') === 'cancelled';
  }, []);

  const StepIcon = currentStep.icon;

  return (
    <Card className="overflow-hidden border-zinc-800 bg-zinc-950 text-zinc-100">
      {/* Progress header */}
      <div className="border-b border-zinc-800/60 bg-zinc-900/40 px-6 py-4">
        <FormProgress currentStep={currentStepNumber} totalSteps={totalSteps} />
      </div>

      <div className="space-y-6 p-6">
        {/* Step header */}
        <div className="flex items-start gap-4">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
            style={{ backgroundColor: 'rgba(170,255,0,0.12)' }}
          >
            <StepIcon className="h-5 w-5 text-[#AAFF00]" />
          </div>
          <div className="space-y-1 pt-0.5">
            <h2 className="text-lg font-semibold leading-tight text-zinc-100">{currentStep.title}</h2>
            <p className="text-sm text-zinc-400">{currentStep.description}</p>
          </div>
        </div>

        {/* Step content */}
        {currentStep.render({
          data: formData,
          files: formFiles,
          onSectionChange,
          onFilesChange,
          onEditSection: handleEditSection
        })}

        {/* Notifications */}
        {wasPaymentCancelled && (
          <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
            Paiement annulé. Reprenez votre formulaire et relancez le paiement quand vous êtes prêt.
          </p>
        )}

        {checkoutError && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {checkoutError}
          </p>
        )}

        {/* Navigation */}
        <StepNavigation
          canGoBack={!isFirstStep}
          isLastStep={isLastStep}
          onBack={handlePrevious}
          onNext={isLastStep ? handleStartCheckout : handleNext}
          isLoading={isCreatingCheckoutSession}
          nextLabel={
            isLastStep
              ? `Payer ${SITEASY_PAYMENT.amountInCents / 100} €`
              : undefined
          }
          loadingLabel="Redirection vers le paiement..."
        />

        {/* Footer */}
        <div className="flex items-center justify-center border-t border-zinc-800/60 pt-4">
          <button
            type="button"
            onClick={handleResetForm}
            disabled={isCreatingCheckoutSession}
            className="text-xs text-zinc-600 transition-colors hover:text-zinc-400 disabled:pointer-events-none"
          >
            Recommencer depuis le début
          </button>
        </div>
      </div>
    </Card>
  );
}
