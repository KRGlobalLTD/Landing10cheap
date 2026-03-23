import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

type StepNavigationProps = {
  canGoBack: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  className?: string;
  isLoading?: boolean;
  nextLabel?: string;
  loadingLabel?: string;
};

export function StepNavigation({
  canGoBack,
  isLastStep,
  onBack,
  onNext,
  className,
  isLoading = false,
  nextLabel,
  loadingLabel = 'Chargement...'
}: StepNavigationProps) {
  const computedNextLabel = nextLabel ?? (isLastStep ? 'Terminer' : 'Suivant');

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={!canGoBack || isLoading}
          className="flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300 disabled:pointer-events-none disabled:opacity-0"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Précédent
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={isLoading}
          className="group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-zinc-950 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
          style={{ backgroundColor: '#AAFF00' }}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {loadingLabel}
            </>
          ) : (
            <>
              {computedNextLabel}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
