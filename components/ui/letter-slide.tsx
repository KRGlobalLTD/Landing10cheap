export function LetterSlide({ children }: { children: string }) {
  const chars = children.split('');
  const delay = (i: number) => `${Math.min(0.2 + i * 0.04, 0.65)}s`;

  const row = chars.map((ch, i) => (
    <span key={i} style={{ transition: `transform ${delay(i)}` }}>
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ));

  return (
    <span className="relative inline-flex items-center">
      <span className="ls-out">{row}</span>
      <span className="ls-in" aria-hidden>{row}</span>
    </span>
  );
}
