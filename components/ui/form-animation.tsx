'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Building2, User, Phone, Calendar, Check, ArrowRight, ChevronDown } from 'lucide-react';

const PHASE_DURATIONS = [2400, 4000, 4000, 4000];
const FADE_MS = 400;
const CURSOR_TRANSITION = 550;
const TARGET_TEXT = "Coffee Paris";

const PALETTES = [
  { name: 'Élégant', color: '#6366f1' },
  { name: 'Nature',  color: '#22c55e' },
  { name: 'Océan',   color: '#38bdf8' },
  { name: 'Chaleur', color: '#AAFF00' },
];

const DROPDOWN_OPTIONS = [
  'Artisan / Artisanat',
  'Commerce / Boutique',
  'Restaurant / Bar / Café',
  'Freelance / Consultant',
];
const SELECTED_OPTION_INDEX = 2;

function CursorIcon({ clicking }: { clicking: boolean }) {
  return (
    <svg width="22" height="26" viewBox="0 0 22 26" fill="none"
      style={{ transform: clicking ? 'scale(0.8)' : 'scale(1)', transition: 'transform 0.1s ease', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))' }}
    >
      <path d="M3 2L3 20L8.5 15L13 23L15.5 21.8L11 14H18.5L3 2Z" fill="white" stroke="#222" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

const StepBadge = ({ label }: { label: string }) => (
  <span className="inline-block text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/8 text-zinc-400">{label}</span>
);

const ContinueBtn = ({ targetRef }: { targetRef?: React.RefObject<HTMLButtonElement> }) => (
  <div className="flex justify-end mt-2">
    <button ref={targetRef} className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] font-semibold text-zinc-950 pointer-events-none" style={{ backgroundColor: '#AAFF00' }}>
      Continuer <ArrowRight className="w-2.5 h-2.5" />
    </button>
  </div>
);

// ─── PHASE 1
function Phase1({ subStep, refs }: { subStep: number; refs: { proCard: React.RefObject<HTMLDivElement>; continueBtn: React.RefObject<HTMLButtonElement> } }) {
  const proSelected = subStep >= 1;
  return (
    <div className="space-y-2">
      <div className="space-y-0.5">
        <StepBadge label="Étape 1 / 4" />
        <h3 className="text-sm font-bold text-white mt-1">Je suis…</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div ref={refs.proCard} className="rounded-xl p-2 border flex flex-col gap-1 transition-all duration-200"
          style={{ borderColor: proSelected ? '#AAFF00' : 'rgba(255,255,255,0.08)', backgroundColor: proSelected ? 'rgba(170,255,0,0.06)' : '#1a1a1a' }}
        >
          <Building2 className="w-4 h-4 transition-colors duration-200" style={{ color: proSelected ? '#AAFF00' : '#71717a' }} />
          <span className="text-xs font-semibold transition-colors duration-200" style={{ color: proSelected ? '#AAFF00' : 'white' }}>Un professionnel</span>
          <span className="text-[10px] text-zinc-500">Artisan, commerçant…</span>
        </div>
        <div className="rounded-xl p-2 border border-white/8 bg-[#1a1a1a] flex flex-col gap-1">
          <User className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-semibold text-white">Un particulier</span>
          <span className="text-[10px] text-zinc-500">Projet personnel…</span>
        </div>
      </div>
      <ContinueBtn targetRef={refs.continueBtn} />
    </div>
  );
}

// ─── PHASE 2
function Phase2({ subStep, typedText, optionHovered, refs }: {
  subStep: number; typedText: string; optionHovered: boolean;
  refs: { selectField: React.RefObject<HTMLDivElement>; selectedOption: React.RefObject<HTMLDivElement>; nameInput: React.RefObject<HTMLDivElement>; continueBtn: React.RefObject<HTMLButtonElement> }
}) {
  const dropdownOpen = subStep === 1;
  const selectedValue = subStep >= 2 ? DROPDOWN_OPTIONS[SELECTED_OPTION_INDEX] : null;
  return (
    <div className="space-y-2">
      <div className="space-y-0.5">
        <StepBadge label="Étape 2 / 4" />
        <h3 className="text-sm font-bold text-white mt-1">Votre activité</h3>
      </div>
      <div className="space-y-1.5">
        <div ref={refs.selectField} className="flex items-center justify-between rounded-xl border px-3 py-2 text-xs transition-all duration-200"
          style={{ borderColor: dropdownOpen ? '#AAFF00' : 'rgba(255,255,255,0.1)', backgroundColor: '#1a1a1a', borderBottomLeftRadius: dropdownOpen ? 4 : undefined, borderBottomRightRadius: dropdownOpen ? 4 : undefined }}
        >
          <span className={selectedValue ? 'text-zinc-200' : 'text-zinc-500'}>{selectedValue ?? "Votre secteur d'activité"}</span>
          <ChevronDown className="w-3 h-3 text-zinc-400 transition-transform duration-200" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </div>

        {dropdownOpen && (
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(170,255,0,0.5)', backgroundColor: '#161616', marginTop: -2 }}>
            {DROPDOWN_OPTIONS.map((opt, i) => (
              <div key={opt} ref={i === SELECTED_OPTION_INDEX ? refs.selectedOption : undefined}
                className="flex items-center px-3 py-2 text-xs"
                style={{
                  backgroundColor: i === SELECTED_OPTION_INDEX && optionHovered ? 'rgba(170,255,0,0.10)' : 'transparent',
                  color: i === SELECTED_OPTION_INDEX && optionHovered ? '#AAFF00' : '#71717a',
                  borderBottom: i < DROPDOWN_OPTIONS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  fontWeight: i === SELECTED_OPTION_INDEX && optionHovered ? 600 : 400,
                }}
              >
                {i === SELECTED_OPTION_INDEX && optionHovered && <span className="mr-1.5 text-[10px]" style={{ color: '#AAFF00' }}>›</span>}
                {opt}
              </div>
            ))}
          </div>
        )}

        {!dropdownOpen && (
          <>
            <div ref={refs.nameInput} className="rounded-xl border px-3 py-2 text-xs min-h-[32px] transition-all duration-200"
              style={{ borderColor: subStep >= 3 ? '#AAFF00' : 'rgba(255,255,255,0.1)', backgroundColor: '#1a1a1a' }}
            >
              {typedText.length === 0
                ? <span className="text-zinc-600">Nom de votre établissement</span>
                : <span className="text-zinc-300">{typedText}{typedText.length < TARGET_TEXT.length && <span className="inline-block w-0.5 h-3 ml-px align-middle animate-pulse" style={{ backgroundColor: '#AAFF00' }} />}</span>
              }
            </div>
            <div className="rounded-xl border border-white/10 bg-[#1a1a1a] px-3 py-2 text-xs text-zinc-600">Adresse (optionnel)</div>
          </>
        )}
      </div>
      {!dropdownOpen && <ContinueBtn targetRef={refs.continueBtn} />}
    </div>
  );
}

// ─── PHASE 3
function Phase3({ subStep, refs }: {
  subStep: number;
  refs: { rdvCard: React.RefObject<HTMLDivElement>; chaleurPalette: React.RefObject<HTMLDivElement>; continueBtn: React.RefObject<HTMLButtonElement> }
}) {
  const rdvSelected = subStep >= 1;
  const selectedPalette = subStep >= 2 ? 3 : -1;
  return (
    <div className="space-y-2">
      <div className="space-y-0.5">
        <StepBadge label="Étape 3 / 4" />
        <h3 className="text-sm font-bold text-white mt-1">Votre site</h3>
      </div>
      <p className="text-[10px] text-zinc-500">Que voulez-vous que vos visiteurs fassent ?</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl p-2 border border-white/8 bg-[#1a1a1a] flex flex-col gap-1">
          <Phone className="w-3.5 h-3.5 text-zinc-500" />
          <span className="text-[10px] font-medium text-zinc-400">Vous appeler</span>
        </div>
        <div ref={refs.rdvCard} className="rounded-xl p-2 border flex flex-col gap-1 transition-all duration-200"
          style={{ borderColor: rdvSelected ? '#AAFF00' : 'rgba(255,255,255,0.08)', backgroundColor: rdvSelected ? 'rgba(170,255,0,0.06)' : '#1a1a1a' }}
        >
          <Calendar className="w-3.5 h-3.5 transition-colors duration-200" style={{ color: rdvSelected ? '#AAFF00' : '#71717a' }} />
          <span className="text-[10px] font-medium transition-colors duration-200" style={{ color: rdvSelected ? '#AAFF00' : 'white' }}>Prendre RDV</span>
        </div>
      </div>
      <div className="flex items-center pt-1" style={{ gap: 0 }}>
        {PALETTES.map((p, i) => (
          <div key={p.name} ref={i === 3 ? refs.chaleurPalette : undefined} className="flex flex-col items-center gap-0.5" style={{ width: 52 }}>
            <div className="w-5 h-5 rounded-full transition-all duration-200"
              style={{ backgroundColor: p.color, outline: i === selectedPalette ? '2px solid white' : '2px solid transparent', outlineOffset: '2px', transform: i === selectedPalette ? 'scale(1.15)' : 'scale(1)' }}
            />
            <span className="text-[9px] text-zinc-500">{p.name}</span>
          </div>
        ))}
      </div>
      <ContinueBtn targetRef={refs.continueBtn} />
    </div>
  );
}

// ─── PHASE 4
function Phase4() {
  const [progress, setProgress] = useState(0);
  useEffect(() => { const t = setTimeout(() => setProgress(100), 80); return () => clearTimeout(t); }, []);
  return (
    <div className="flex flex-col items-center justify-center space-y-2 py-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(170,255,0,0.12)', border: '1.5px solid rgba(170,255,0,0.4)' }}>
        <Check className="w-5 h-5 stroke-[2.5]" style={{ color: '#AAFF00' }} />
      </div>
      <div className="text-center space-y-0.5">
        <p className="text-sm font-bold text-white">Votre site est prêt !</p>
        <p className="text-[10px] text-zinc-500">En ligne dans moins de 24h</p>
      </div>
      <div className="w-full h-1 rounded-full bg-white/8 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: '#AAFF00', transition: `width ${PHASE_DURATIONS[3] * 0.75}ms cubic-bezier(0.4,0,0.2,1)` }} />
      </div>
      <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] font-semibold tracking-wider text-zinc-300">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#AAFF00' }} />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#AAFF00' }} />
        </span>
        EN LIGNE
      </div>
    </div>
  );
}

// ─── MAIN
export function FormAnimation() {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);
  const [subStep, setSubStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [cursorPos, setCursorPos] = useState({ x: 60, y: 40 });
  const [clicking, setClicking] = useState(false);
  const [optionHovered, setOptionHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const r = {
    p1: { proCard: useRef<HTMLDivElement>(null), continueBtn: useRef<HTMLButtonElement>(null) },
    p2: { selectField: useRef<HTMLDivElement>(null), selectedOption: useRef<HTMLDivElement>(null), nameInput: useRef<HTMLDivElement>(null), continueBtn: useRef<HTMLButtonElement>(null) },
    p3: { rdvCard: useRef<HTMLDivElement>(null), chaleurPalette: useRef<HTMLDivElement>(null), continueBtn: useRef<HTMLButtonElement>(null) },
  };

  function centerOf(el: React.RefObject<HTMLElement | null>): { x: number; y: number } {
    const container = containerRef.current;
    const target = el.current;
    if (!container || !target) return { x: 60, y: 40 };
    const cr = container.getBoundingClientRect();
    const er = target.getBoundingClientRect();
    return { x: er.left - cr.left + er.width / 2, y: er.top - cr.top + er.height / 2 };
  }

  function moveTo(x: number, y: number) { setCursorPos({ x, y }); }
  function moveToEl(el: React.RefObject<HTMLElement | null>) { const p = centerOf(el); moveTo(p.x, p.y); }

  function doClick(advance?: boolean) {
    setClicking(true);
    setTimeout(() => setClicking(false), 180);
    if (advance) setSubStep(s => s + 1);
  }

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setPhase(p => (p + 1) % 4);
        setSubStep(0);
        setTypedText('');
        setOptionHovered(false);
        setVisible(true);
      }, FADE_MS);
    }, PHASE_DURATIONS[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const T: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => { T.push(setTimeout(fn, ms)); };

    if (phase === 0) {
      at(0,    () => moveTo(60, 40));
      at(300,  () => moveToEl(r.p1.proCard));
      at(800,  () => doClick(true));
      at(1400, () => moveToEl(r.p1.continueBtn));
      at(1900, () => doClick());
    }

    if (phase === 1) {
      at(0,    () => moveTo(60, 40));
      at(300,  () => moveToEl(r.p2.selectField));
      at(800,  () => doClick(true));
      at(1050, () => moveToEl(r.p2.selectedOption));
      at(1050 + CURSOR_TRANSITION, () => setOptionHovered(true));
      at(1800, () => { doClick(true); setOptionHovered(false); });
      at(2100, () => moveToEl(r.p2.nameInput));
      at(2600, () => doClick(true));
      at(3600, () => moveToEl(r.p2.continueBtn));
    }

    if (phase === 2) {
      at(0,    () => moveTo(60, 40));
      at(300,  () => moveToEl(r.p3.rdvCard));
      at(780,  () => doClick(true));
      at(1300, () => moveToEl(r.p3.chaleurPalette));
      at(1750, () => doClick(true));
      at(2300, () => moveToEl(r.p3.continueBtn));
      at(2700, () => doClick());
    }

    return () => T.forEach(clearTimeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== 1 || subStep < 3) return;
    if (typedText.length >= TARGET_TEXT.length) return;
    const t = setTimeout(() => setTypedText(TARGET_TEXT.slice(0, typedText.length + 1)), 75);
    return () => clearTimeout(t);
  }, [phase, subStep, typedText]);

  return (
    <div ref={containerRef} className="relative w-full"
      style={{ borderRadius: 16, backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.08)', padding: 16, boxShadow: '0 8px 40px rgba(0,0,0,0.4)', overflow: 'hidden' }}
    >
      {phase !== 3 && (
        <div className="pointer-events-none absolute z-50"
          style={{ left: cursorPos.x, top: cursorPos.y, transition: `left ${CURSOR_TRANSITION}ms cubic-bezier(0.25,0.46,0.45,0.94), top ${CURSOR_TRANSITION}ms cubic-bezier(0.25,0.46,0.45,0.94)` }}
        >
          <CursorIcon clicking={clicking} />
        </div>
      )}

      <div style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease`, height: 240, overflow: 'hidden' }}>
        {phase === 0 && <Phase1 subStep={subStep} refs={r.p1} />}
        {phase === 1 && <Phase2 subStep={subStep} typedText={typedText} optionHovered={optionHovered} refs={r.p2} />}
        {phase === 2 && <Phase3 subStep={subStep} refs={r.p3} />}
        {phase === 3 && <Phase4 />}
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-3">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="rounded-full transition-all duration-300"
            style={{ width: i === phase ? 16 : 6, height: 6, backgroundColor: i === phase ? '#AAFF00' : 'rgba(255,255,255,0.15)' }}
          />
        ))}
      </div>
    </div>
  );
}
