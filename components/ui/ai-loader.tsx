'use client';

import * as React from "react";

interface LoaderProps {
  size?: number;
  text?: string;
}

export const AiLoader: React.FC<LoaderProps> = ({ size = 120, text = "Génération" }) => {
  const letters = text.split("");

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-6">
      <style>{`
        @keyframes loaderCircle {
          0% {
            transform: rotate(90deg);
            box-shadow:
              0 6px 12px 0 #AAFF00 inset,
              0 12px 18px 0 #7acc00 inset,
              0 36px 36px 0 #3d7a00 inset,
              0 0 3px 1.2px rgba(170, 255, 0, 0.4),
              0 0 6px 1.8px rgba(170, 255, 0, 0.2);
          }
          50% {
            transform: rotate(270deg);
            box-shadow:
              0 6px 12px 0 #ccff33 inset,
              0 12px 6px 0 #AAFF00 inset,
              0 24px 36px 0 #5a9900 inset,
              0 0 3px 1.2px rgba(170, 255, 0, 0.4),
              0 0 6px 1.8px rgba(170, 255, 0, 0.2);
          }
          100% {
            transform: rotate(450deg);
            box-shadow:
              0 6px 12px 0 #AAFF00 inset,
              0 12px 18px 0 #7acc00 inset,
              0 36px 36px 0 #3d7a00 inset,
              0 0 3px 1.2px rgba(170, 255, 0, 0.4),
              0 0 6px 1.8px rgba(170, 255, 0, 0.2);
          }
        }

        @keyframes loaderLetter {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          20% { opacity: 1; transform: scale(1.15); }
          40% { opacity: 0.6; transform: translateY(0); }
        }

        .ai-loader-circle {
          animation: loaderCircle 5s linear infinite;
        }

        .ai-loader-letter {
          animation: loaderLetter 3s infinite;
        }
      `}</style>

      <div
        className="relative flex items-center justify-center select-none"
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-0 rounded-full ai-loader-circle" />
        {letters.map((letter, index) => (
          <span
            key={index}
            className="inline-block text-white ai-loader-letter text-sm font-semibold"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
      </div>

      <p className="text-xs text-zinc-500 tracking-widest uppercase">En cours…</p>
    </div>
  );
};
