'use client';

import { ReactNode } from 'react';

interface CardSelectableProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export function CardSelectable({ selected, onClick, children, className = '' }: CardSelectableProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
        selected
          ? 'border-[#AAFF00] bg-[#1a1a1a]'
          : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
      } ${className}`}
    >
      {children}
    </button>
  );
}
