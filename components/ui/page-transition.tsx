'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type TransitionContextType = {
  navigateTo: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType>({ navigateTo: () => {} });

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [opacity, setOpacity] = useState(0);
  const [active, setActive] = useState(false);
  const router = useRouter();

  const navigateTo = useCallback((href: string) => {
    setActive(true);
    setOpacity(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOpacity(1);
        setTimeout(() => {
          router.push(href);
          setTimeout(() => {
            setOpacity(0);
            setTimeout(() => setActive(false), 250);
          }, 80);
        }, 220);
      });
    });
  }, [router]);

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}
      {active && (
        <div
          className="fixed inset-0 z-[9999] bg-zinc-950 pointer-events-none"
          style={{ opacity, transition: 'opacity 220ms ease' }}
        />
      )}
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  return useContext(TransitionContext);
}
