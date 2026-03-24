'use client';

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { usePageTransition } from "@/components/ui/page-transition";
import { LetterSlide } from "@/components/ui/letter-slide";

const METIERS = [
  "Plombier",
  "Fleuriste",
  "Barber",
  "Électricien",
  "Photographe",
  "Coach sportif",
  "Coiffeur",
  "Paysagiste",
  "Restaurateur",
  "Dentiste",
];

export function HeroSection() {
  const { navigateTo } = usePageTransition();
  const [metier, setMetier] = useState("");
  const [ville, setVille] = useState("");
  const metierRef = useRef<HTMLInputElement>(null);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const [metierFocused, setMetierFocused] = useState(false);

  useEffect(() => {
    if (metier !== "" || metierFocused) return;

    let cancelled = false;
    let metierIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      if (cancelled) return;
      const current = METIERS[metierIdx];

      if (!deleting) {
        charIdx++;
        setAnimatedPlaceholder(current.slice(0, charIdx));
        if (charIdx === current.length) {
          deleting = true;
          timer = setTimeout(tick, 1600);
        } else {
          timer = setTimeout(tick, 60);
        }
      } else {
        charIdx--;
        setAnimatedPlaceholder(current.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          metierIdx = (metierIdx + 1) % METIERS.length;
          timer = setTimeout(tick, 300);
        } else {
          timer = setTimeout(tick, 35);
        }
      }
    }

    timer = setTimeout(tick, 800);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [metier, metierFocused]);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (metier) params.set("metier", metier);
    if (ville) params.set("ville", ville);
    const query = params.toString();
    navigateTo(`/formulaire${query ? `?${query}` : ""}`);
  }

  return (
    <div className="relative w-full text-white overflow-hidden font-sans" style={{ background: "radial-gradient(ellipse 50% 60% at 0% 50%, #aaff0018 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 100% 50%, #aaff0018 0%, transparent 70%), #0a0a0a" }}>
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-cursor { animation: cursor-blink 0.9s step-end infinite; }

        @keyframes hero-fadein {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-fadein { animation: hero-fadein 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
      `}</style>

      {/* Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(170,255,0,0.08) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-8 sm:px-12"
        style={{ paddingTop: 140, paddingBottom: 100 }}
      >

        {/* 2. Titre */}
        <h1 className="font-bold tracking-tighter leading-none mb-6 text-[44px] md:text-[82px]">
          <span className="hero-fadein text-white block" style={{ animationDelay: "0.1s" }}>Votre site web</span>
          <span className="hero-fadein block md:text-[100px]" style={{ color: "#AAFF00", animationDelay: "0.25s" }}>
            en 30 secondes.
          </span>
        </h1>

        {/* 3. Sous-titre */}
        <p className="hero-fadein mb-10 md:mb-36 leading-relaxed" style={{ color: "#a0a0a0", fontSize: 15, maxWidth: 480, animationDelay: "0.4s" }}>
          Renseignez vos informations avec vos mots. Notre IA se charge de créer un site qui vous correspond.
        </p>

        {/* 4. Barre de saisie */}
        {/* Desktop — barre horizontale */}
        <form
          onSubmit={handleSubmit}
          className="hero-fadein hidden md:flex items-center"
          style={{
            animationDelay: "0.55s",
            maxWidth: 560,
            width: "100%",
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: 9999,
            padding: 8,
            gap: 0,
          }}
        >
          {/* Métier */}
          <div className="flex items-center gap-2 flex-1 min-w-0 px-3" style={{ height: 48 }}>
            <span className="text-sm shrink-0 select-none" style={{ color: "#6b7280" }}>Je suis</span>
            <div className="relative flex-1 min-w-0 flex items-center h-full">
              <input
                ref={metierRef}
                type="text"
                value={metier}
                onChange={e => setMetier(e.target.value)}
                onFocus={() => setMetierFocused(true)}
                onBlur={() => setMetierFocused(false)}
                className="absolute inset-0 w-full bg-transparent border-none text-sm font-semibold"
                style={{
                  outline: "none",
                  caretColor: (metier === "" && !metierFocused) ? "transparent" : "#AAFF00",
                  color: (metier === "" && !metierFocused) ? "transparent" : "white",
                }}
              />
              {metier === "" && !metierFocused && (
                <span className="flex items-center text-sm font-semibold pointer-events-none select-none whitespace-nowrap overflow-hidden" style={{ color: "#AAFF00", maxWidth: "100%" }}>
                  {animatedPlaceholder || <span style={{ color: "#4b5563" }}>métier...</span>}
                  {animatedPlaceholder && (
                    <span className="hero-cursor inline-block w-[2px] h-3.5 ml-0.5 rounded-sm" style={{ backgroundColor: "#AAFF00", flexShrink: 0 }} />
                  )}
                </span>
              )}
            </div>
          </div>
          {/* Divider vertical */}
          <div style={{ width: 1, height: 24, backgroundColor: "#2a2a2a", flexShrink: 0 }} />
          {/* Ville */}
          <div className="flex items-center gap-2 flex-1 min-w-0 px-3" style={{ height: 48 }}>
            <span className="text-sm shrink-0 select-none" style={{ color: "#6b7280" }}>à</span>
            <input
              type="text"
              value={ville}
              onChange={e => setVille(e.target.value)}
              placeholder="votre ville..."
              className="flex-1 bg-transparent border-none text-white text-sm min-w-0"
              style={{ color: "white", caretColor: "#AAFF00", outline: "none" }}
            />
          </div>
          {/* CTA */}
          <button
            type="submit"
            className="letter-btn relative inline-flex items-center justify-center gap-1.5 font-bold text-sm text-zinc-950 hover:opacity-90 active:scale-[0.98] transition-all shrink-0"
            style={{ backgroundColor: "#AAFF00", borderRadius: 9999, padding: "14px 20px" }}
          >
            <LetterSlide>Créer mon site</LetterSlide>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Mobile — vertical */}
        <form
          onSubmit={handleSubmit}
          className="hero-fadein flex md:hidden items-center"
          style={{
            animationDelay: "0.55s",
            width: "min(420px, calc(100% - 32px))",
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: 16,
            padding: 8,
            gap: 0,
            flexDirection: "column",
          }}
        >
          {/* Métier field */}
          <div className="flex items-center gap-2 w-full px-3 rounded-[10px] border border-[#2f2f2f] bg-[#242424]" style={{ height: 48 }}>
            <span className="text-sm shrink-0 select-none" style={{ color: "#6b7280" }}>Je suis</span>
            <div className="relative flex-1 min-w-0 flex items-center h-full">
              <input
                type="text"
                value={metier}
                onChange={e => setMetier(e.target.value)}
                onFocus={() => setMetierFocused(true)}
                onBlur={() => setMetierFocused(false)}
                className="absolute inset-0 w-full bg-transparent border-none text-sm font-semibold"
                style={{
                  outline: "none",
                  caretColor: (metier === "" && !metierFocused) ? "transparent" : "#AAFF00",
                  color: (metier === "" && !metierFocused) ? "transparent" : "white",
                }}
              />
              {metier === "" && !metierFocused && (
                <span className="flex items-center text-sm font-semibold pointer-events-none select-none whitespace-nowrap overflow-hidden" style={{ color: "#AAFF00", maxWidth: "100%" }}>
                  {animatedPlaceholder || <span style={{ color: "#4b5563" }}>métier...</span>}
                  {animatedPlaceholder && (
                    <span className="hero-cursor inline-block w-[2px] h-3.5 ml-0.5 rounded-sm" style={{ backgroundColor: "#AAFF00", flexShrink: 0 }} />
                  )}
                </span>
              )}
            </div>
          </div>
          {/* Ville field */}
          <div className="flex items-center gap-2 w-full px-3 mt-2 rounded-[10px] border border-[#2f2f2f] bg-[#242424]" style={{ height: 48 }}>
            <span className="text-sm shrink-0 select-none" style={{ color: "#6b7280" }}>à</span>
            <input
              type="text"
              value={ville}
              onChange={e => setVille(e.target.value)}
              placeholder="votre ville..."
              className="flex-1 bg-transparent border-none text-white text-sm min-w-0"
              style={{ color: "white", caretColor: "#AAFF00", outline: "none" }}
            />
          </div>
          <div style={{ height: 8 }} />
          <button
            type="submit"
            className="letter-btn relative inline-flex items-center justify-center gap-1.5 font-bold text-sm text-zinc-950 hover:opacity-90 active:scale-[0.98] transition-all w-full"
            style={{ backgroundColor: "#AAFF00", borderRadius: 10, padding: "14px 0" }}
          >
            <LetterSlide>Créer mon site</LetterSlide>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>


        {/* 6. Badges de réassurance */}
        <div className="hero-fadein flex flex-wrap items-center justify-center mt-6" style={{ gap: 32, animationDelay: "0.7s" }}>
          {["Responsive", "Hébergement inclus", "En ligne immédiatement"].map(text => (
            <span key={text} className="flex items-center gap-1.5 text-sm" style={{ color: "#6b7280" }}>
              <span style={{ color: "#AAFF00" }}>✓</span>
              {text}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
