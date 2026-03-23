'use client';

import React, { useEffect, useState } from 'react';

const codeLines = [
  "import React from 'react';",
  "const App = () => {",
  "  const [data, setData] = useState([]);",
  "  return <div>{data}</div>;",
  "};",
];

export function TypingLoader() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentLineText, setCurrentLineText] = useState<string>('');
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(0);
        setCurrentLineText('');
        setCurrentLineIndex(0);
      }, 2000);
      return () => clearTimeout(timer);
    }

    const currentLine = codeLines[currentLineIndex];
    const textLength = currentLineText.length;

    if (textLength < currentLine.length) {
      const timer = setTimeout(() => {
        setCurrentLineText(currentLine.slice(0, textLength + 1));
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setVisibleLines(currentLineIndex + 1);
        setCurrentLineText('');
        setCurrentLineIndex(currentLineIndex + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentLineText, currentLineIndex]);

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10">
      {/* Header */}
      <div className="bg-white/5 border-b border-white/8 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-muted/40 ml-1">code-editor.tsx</span>
      </div>

      {/* Code — fixed height, all lines always in DOM */}
      <div className="bg-slate-950 px-4 py-3 font-mono text-xs overflow-hidden" style={{ height: 180 }}>
        {codeLines.map((line, index) => {
          const isTyping = index === currentLineIndex;
          const isDone = index < visibleLines;
          const isHidden = !isDone && !isTyping;

          return (
            <div key={index} className="mb-0.5 whitespace-nowrap" style={{ color: '#AAFF00', opacity: isHidden ? 0 : 1 }}>
              <span className="text-slate-600 mr-3 select-none">{index + 1}</span>
              {isDone ? line : isTyping ? currentLineText : line}
              {isTyping && (
                <span
                  className="inline-block w-1.5 h-3.5 ml-0.5 animate-pulse"
                  style={{ backgroundColor: '#AAFF00' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
