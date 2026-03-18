import { Button } from '@/components/ui/button';

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
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          disabled={!canGoBack || isLoading}
          className="w-full sm:w-auto"
        >
          Précédent
        </Button>

        <Button type="button" onClick={onNext} disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? loadingLabel : computedNextLabel}
        </Button>
      </div>
    </div>
  );
}
