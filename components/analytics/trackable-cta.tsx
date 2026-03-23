'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import { usePageTransition } from '@/components/ui/page-transition';

type TrackableCtaProps = {
  href: string;
  children: ReactNode;
  location: string;
  variant?: 'primary' | 'ghost';
  className?: string;
};

export function TrackableCta({ href, children, location, variant, className }: TrackableCtaProps) {
  const { navigateTo } = usePageTransition();

  return (
    <Button
      href={href}
      variant={variant}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        trackEvent('cta_click', { location, href });
        navigateTo(href);
      }}
    >
      {children}
    </Button>
  );
}
