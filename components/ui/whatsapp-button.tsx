'use client';

import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants/site';

export function WhatsAppButton() {
  return (
    <a
      href={SITE_CONFIG.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter via WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3"
    >
      <span className="pointer-events-none max-w-0 overflow-hidden whitespace-nowrap rounded-full border border-white/10 bg-card px-0 py-2.5 text-xs font-medium text-foreground opacity-0 shadow-soft transition-all duration-300 ease-out group-hover:max-w-[160px] group-hover:px-4 group-hover:opacity-100">
        Parler à un expert
      </span>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent shadow-[0_4px_20px_rgba(170,255,0,0.25)] transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_4px_28px_rgba(170,255,0,0.4)]">
        <MessageCircle className="h-5 w-5 text-black" strokeWidth={2.5} />
      </span>
    </a>
  );
}
