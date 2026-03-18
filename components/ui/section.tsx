import { cn } from '@/lib/utils/cn';
import { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export function Section({ children, className }: SectionProps) {
  return <section className={cn('py-14 md:py-20', className)}>{children}</section>;
}
