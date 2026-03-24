'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TrackableCta } from '@/components/analytics/trackable-cta';
import { usePageTransition } from '@/components/ui/page-transition';
import { LetterSlide } from '@/components/ui/letter-slide';

export function Navbar() {
  const { navigateTo } = usePageTransition();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Phase 1 : logo descend
    const t1 = setTimeout(() => setLogoVisible(true), 200);
    // Phase 2 : navbar se déplie (après que le logo soit arrivé)
    const t2 = setTimeout(() => setExpanded(true), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      if (currentY < 60) { setVisible(true); }
      else if (currentY > lastScrollY.current) { setVisible(false); setOpen(false); }
      else { setVisible(true); }
      lastScrollY.current = currentY;
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <header
      className="fixed left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300"
      style={{ top: visible ? 16 : -80 }}
    >
      <div className="w-full max-w-3xl" ref={ref}>
        {/* Barre principale */}
        <div
          className="rounded-full border border-white/10 bg-white/5 pl-3 pr-1.5 md:pl-5 md:pr-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          style={{
            width: expanded ? '100%' : 100,
            overflow: 'hidden',
            opacity: logoVisible ? 1 : 0,
            transform: logoVisible ? 'translateY(0)' : 'translateY(-16px)',
            transition: 'width 800ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 500ms ease, transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <div className="flex h-10 w-full items-center justify-between">
            {/* Logo — toujours à gauche, se déplace naturellement avec l'expansion de la pill */}
            <Link href="/" className="flex items-center shrink-0">
              <Image src="/logo/logo-horizontal.svg" alt="Siteasy" width={72} height={32} priority className="block" />
            </Link>

            {/* Nav desktop — grandit depuis la droite du logo */}
            <nav
              className="hidden items-center gap-6 md:flex"
              aria-label="Navigation principale"
              style={{
                maxWidth: expanded ? 400 : 0,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                opacity: expanded ? 1 : 0,
                transition: 'max-width 800ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 400ms ease 600ms',
              }}
            >
              <Link href="/#features" className="text-xs text-muted transition-colors hover:text-foreground">
                Fonctionnalités
              </Link>
              <Link href="/#pricing" className="text-xs text-muted transition-colors hover:text-foreground">
                Nos tarifs
              </Link>
              <Link href="/#gallery" className="text-xs text-muted transition-colors hover:text-foreground">
                Exemples
              </Link>
              <Link href="/#faq" className="text-xs text-muted transition-colors hover:text-foreground">
                FAQ
              </Link>
            </nav>

            {/* CTA desktop */}
            <div
              style={{
                opacity: expanded ? 1 : 0,
                transition: 'opacity 400ms ease 600ms',
                flexShrink: 0,
              }}
            >
              <TrackableCta
                href="/formulaire"
                className="letter-btn relative hidden h-7 rounded-full px-3 text-xs md:flex"
                location="navbar_cta"
              >
                <LetterSlide>Commencer</LetterSlide>
              </TrackableCta>
            </div>

            {/* Hamburger mobile */}
            <button
              onClick={() => setOpen(!open)}
              className="flex md:hidden flex-col items-center justify-center gap-[5px] w-9 h-9"
              aria-label="Menu"
              style={{
                opacity: expanded ? 1 : 0,
                transition: 'opacity 400ms ease 600ms',
                flexShrink: 0,
              }}
            >
              <span
                className="block h-[2px] w-5 rounded-full bg-white transition-all duration-200"
                style={{ transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }}
              />
              <span
                className="block h-[2px] w-5 rounded-full bg-white transition-all duration-200"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="block h-[2px] w-5 rounded-full bg-white transition-all duration-200"
                style={{ transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }}
              />
            </button>
          </div>
        </div>

        {/* Menu mobile — glass card */}
        {open && (
          <div className="md:hidden mt-2">
          <div className="rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-5 py-4 flex flex-col gap-1">
            <Link href="/#features" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm text-muted hover:text-foreground hover:bg-white/5 transition-colors">
              Fonctionnalités
            </Link>
            <Link href="/#pricing" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm text-muted hover:text-foreground hover:bg-white/5 transition-colors">
              Nos tarifs
            </Link>
            <Link href="/#gallery" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm text-muted hover:text-foreground hover:bg-white/5 transition-colors">
              Exemples
            </Link>
            <Link href="/#faq" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm text-muted hover:text-foreground hover:bg-white/5 transition-colors">
              FAQ
            </Link>
            <div className="mt-2 pt-2 border-t border-white/8">
              <button
                onClick={() => { setOpen(false); navigateTo('/formulaire'); }}
                className="letter-btn relative flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold text-zinc-950 transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#AAFF00' }}
              >
                <LetterSlide>Créer mon site</LetterSlide>
              </button>
            </div>
          </div>
          </div>
        )}
      </div>
    </header>
  );
}
