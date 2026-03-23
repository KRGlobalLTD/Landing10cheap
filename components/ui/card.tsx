import { cn } from '@/lib/utils/cn';
import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return <article className={cn('rounded-xl border border-border bg-card p-6 shadow-soft', className)}>{children}</article>;
}
