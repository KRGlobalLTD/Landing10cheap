import { cn } from '@/lib/utils/cn';
import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return <div className={cn('container w-full', className)}>{children}</div>;
}
