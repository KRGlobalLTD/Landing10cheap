'use client';

import { useEffect, useState } from 'react';

const QUESTIONS = [
  { label: 'VOTRE MÉTIER',   answer: 'Restaurant / Bar / Café' },
  { label: 'VOTRE OBJECTIF', answer: 'Prendre rendez-vous' },
  { label: 'VOTRE TON',      answer: 'Chaleureux' },
];

const CHAR_SPEED   = 50;   // ms par caractère
const BETWEEN_Q    = 400;  // ms entre chaque question
const PAUSE_END    = 2000; // ms pause une fois tout écrit
const FADE_MS      = 300;  // ms fade out/in reset
const START_DELAY  = 500;  // ms avant démarrage

export function TypewriterQuestions() {
  // qIdx = index de la question en cours de frappe (-1 = pas commencé)
  const [qIdx, setQIdx]     = useState(-1);
  const [typed, setTyped]   = useState<string[]>(['', '', '']);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const T: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => {
      const t = setTimeout(() => { if (!cancelled) fn(); }, ms);
      T.push(t);
      return t;
    };

    function runCycle() {
      // reset state
      setTyped(['', '', '']);
      setQIdx(-1);

      let cursor = START_DELAY;

      QUESTIONS.forEach((q, qi) => {
        // révèle le label de la question
        at(cursor, () => setQIdx(qi));
        cursor += 80;

        // frappe chaque caractère
        for (let c = 1; c <= q.answer.length; c++) {
          const char = c;
          at(cursor, () => {
            setTyped(prev => {
              const next = [...prev];
              next[qi] = q.answer.slice(0, char);
              return next;
            });
          });
          cursor += CHAR_SPEED;
        }

        cursor += BETWEEN_Q;
      });

      // pause puis reset
      at(cursor + PAUSE_END, () => {
        setVisible(false);
        at(FADE_MS, () => {
          setVisible(true);
          runCycle();
        });
      });
    }

    runCycle();
    return () => { cancelled = true; T.forEach(clearTimeout); };
  }, []);

  return (
    <div
      className="flex flex-col justify-center w-full h-full px-4 pt-8"
      style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
    >
      {/* Live indicator */}
      <div className="flex items-center gap-1.5 mb-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#AAFF00' }} />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#AAFF00' }} />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#AAFF00' }}>
          En direct
        </span>
      </div>

      {/* Questions */}
      <div className="flex flex-col">
        {QUESTIONS.map((q, i) => (
          <div key={i}>
            {/* Question row */}
            <div className="py-2">
              <p
                className="text-[11px] uppercase mb-1 transition-opacity duration-200"
                style={{
                  color: '#6b7280',
                  letterSpacing: '0.1em',
                  opacity: qIdx >= i ? 1 : 0,
                }}
              >
                {q.label}
              </p>
              <p className="text-sm font-bold text-white min-h-[20px]">
                {typed[i]}
                {qIdx === i && typed[i].length < q.answer.length && (
                  <span
                    className="inline-block w-0.5 h-4 ml-0.5 align-middle animate-pulse"
                    style={{ backgroundColor: '#AAFF00' }}
                  />
                )}
              </p>
            </div>

            {/* Separator */}
            {i < QUESTIONS.length - 1 && (
              <div style={{ height: 1, backgroundColor: '#2a2a2a' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
