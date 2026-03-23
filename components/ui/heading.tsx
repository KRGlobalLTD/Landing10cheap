import { cn } from '@/lib/utils/cn';
import { ReactNode } from 'react';

type HeadingProps = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  action?: ReactNode;
  className?: string;
};

export function Heading({ title, subtitle, align = 'left', action, className }: HeadingProps) {
  return (
    <div className={cn('space-y-3', align === 'center' && 'text-center', className)}>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{title}</h2>
      {subtitle ? <p className="max-w-2xl text-sm text-muted md:text-base">{subtitle}</p> : null}
      {action ? <div>{action}</div> : null}
    </div>
  );
}
