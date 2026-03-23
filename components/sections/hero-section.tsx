'use client';

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

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

type Phase = "idle" | "leaving" | "fading";

export function HeroSection() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
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
    if (typeof window !== "undefined") {
      localStorage.setItem("prefill_metier", metier);
      localStorage.setItem("prefill_ville", ville);
    }
    setPhase("leaving");
    setTimeout(() => setPhase("fading"), 480);
    setTimeout(() => router.push("/formulaire"), 780);
  }

  return (
    <div className="relative w-full bg-zinc-950 text-white overflow-hidden font-sans">
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-cursor { animation: cursor-blink 0.9s step-end infinite; }
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
        <h1 className="font-bold tracking-tighter leading-none mb-6 text-[44px] md:text-[72px]">
          <span className="text-white block">Votre site web</span>
          <span className="block" style={{ color: "#AAFF00" }}>en 30 secondes.</span>
        </h1>

        {/* 3. Sous-titre */}
        <p className="mb-52 md:mb-36 leading-relaxed" style={{ color: "#a0a0a0", fontSize: 15, maxWidth: 480 }}>
          Renseignez vos informations avec vos mots. Notre IA se charge de créer un site qui vous correspond.
        </p>

        {/* 4. Barre de saisie */}
        {/* Desktop — barre horizontale */}
        <form
          onSubmit={handleSubmit}
          className="hidden md:flex items-center"
          style={{
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
            className="inline-flex items-center justify-center gap-1.5 font-bold text-sm text-zinc-950 hover:opacity-90 active:scale-[0.98] transition-all shrink-0"
            style={{ backgroundColor: "#AAFF00", borderRadius: 9999, padding: "14px 20px" }}
          >
            Créer mon site
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Mobile — vertical */}
        <form
          onSubmit={handleSubmit}
          className="flex md:hidden items-center"
          style={{
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
            className="inline-flex items-center justify-center gap-1.5 font-bold text-sm text-zinc-950 hover:opacity-90 active:scale-[0.98] transition-all w-full"
            style={{ backgroundColor: "#AAFF00", borderRadius: 10, padding: "14px 0" }}
          >
            Créer mon site
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>


        {/* 6. Badges de réassurance */}
        <div className="flex flex-wrap items-center justify-center mt-6" style={{ gap: 32 }}>
          {["Responsive", "Hébergé inclus", "En ligne immédiatement"].map(text => (
            <span key={text} className="flex items-center gap-1.5 text-sm" style={{ color: "#6b7280" }}>
              <span style={{ color: "#AAFF00" }}>✓</span>
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Fade overlay */}
      <div
        className="absolute inset-0 z-30 bg-zinc-950 pointer-events-none transition-opacity duration-300"
        style={{ opacity: phase === "fading" ? 1 : 0 }}
      />
    </div>
  );
}
