'use client';

import { FormulaireData } from '@/types/formulaire';

interface Etape1Props {
  data: FormulaireData;
  onChange: <K extends keyof FormulaireData>(key: K, value: FormulaireData[K]) => void;
}

const PROFILS = [
  {
    id: 'professionnel' as const,
    icon: '🏢',
    label: 'Un professionnel',
    desc: 'Artisan, commerçant, freelance, entreprise…',
  },
  {
    id: 'particulier' as const,
    icon: '👤',
    label: 'Un particulier',
    desc: 'Portfolio, blog, mariage, association…',
  },
];

export function Etape1({ data, onChange }: Etape1Props) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">Sélectionnez votre profil pour personnaliser votre formulaire.</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PROFILS.map((profil) => {
          const isSelected = data.typeClient === profil.id;
          return (
            <button
              key={profil.id}
              type="button"
              onClick={() => onChange('typeClient', profil.id)}
              className={`group relative flex flex-col items-start gap-3 rounded-2xl border p-6 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-[#AAFF00] bg-[#1a1a1a]'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]'
              }`}
            >
              {/* Checkmark */}
              {isSelected && (
                <div className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#AAFF00]">
                  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              <span className="text-3xl">{profil.icon}</span>
              <div>
                <p className={`text-base font-semibold ${isSelected ? 'text-[#AAFF00]' : 'text-white'}`}>
                  {profil.label}
                </p>
                <p className="mt-1 text-xs text-zinc-500">{profil.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
