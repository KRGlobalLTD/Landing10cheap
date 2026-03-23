'use client';

const STEPS = [
  { number: 1, label: 'Votre profil' },
  { number: 2, label: 'Votre site' },
  { number: 3, label: 'Coordonnées' },
];

interface StepperProps {
  currentStep: number;
}

export function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-center w-full">
      {STEPS.map((step, i) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              {/* Pastille */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#AAFF00] text-zinc-950'
                    : isActive
                    ? 'border-2 border-[#AAFF00] bg-transparent text-[#AAFF00]'
                    : 'border border-white/20 bg-transparent text-zinc-500'
                }`}
              >
                {isCompleted ? (
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              {/* Label */}
              <span className={`text-[10px] font-medium whitespace-nowrap ${isActive ? 'text-white' : isCompleted ? 'text-[#AAFF00]' : 'text-zinc-500'}`}>
                {step.label}
              </span>
            </div>

            {/* Ligne de connexion */}
            {i < STEPS.length - 1 && (
              <div
                className="mx-3 mb-5 h-px w-8 sm:w-14 transition-all duration-500"
                style={{ backgroundColor: step.number < currentStep ? '#AAFF00' : 'rgba(255,255,255,0.1)' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
