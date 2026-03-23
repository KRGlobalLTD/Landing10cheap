'use client';

import { cn } from '@/lib/utils/cn';

type FormProgressProps = {
  currentStep: number;
  totalSteps: number;
  className?: string;
};

export function FormProgress({ currentStep, totalSteps, className }: FormProgressProps) {
  return (
    <div className={cn('flex items-center', className)}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return (
          <div key={step} className="flex flex-1 items-center">
            <div
              className={cn(
                'relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-all duration-300',
                isActive && 'ring-2 ring-offset-2 ring-offset-zinc-950',
                !isActive && !isCompleted && 'border border-zinc-700 bg-transparent text-zinc-500'
              )}
              style={
                isActive
                  ? { backgroundColor: '#AAFF00', color: '#0a0a0a' }
                  : isCompleted
                    ? { backgroundColor: 'rgba(170,255,0,0.25)', color: '#AAFF00' }
                    : undefined
              }
            >
              {isCompleted ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#AAFF00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                step
              )}
            </div>

            {i < totalSteps - 1 && (
              <div
                className="mx-1 h-px flex-1 transition-all duration-500"
                style={{
                  backgroundColor: step < currentStep ? 'rgba(170,255,0,0.3)' : 'rgb(39,39,42)',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
