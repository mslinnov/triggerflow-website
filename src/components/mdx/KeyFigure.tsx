interface KeyFigureProps {
  value: string;
  label: string;
  description?: string;
}

/** Chiffre de preuve (charte) : chiffre en mono, libellé dessous. */
export function KeyFigure({ value, label, description }: KeyFigureProps) {
  return (
    <div className="not-prose my-8 rounded-xl border border-line bg-paper p-6 md:p-7">
      <div className="font-mono text-[2.25rem] font-medium leading-none tracking-[-0.02em] text-ink md:text-[2.75rem]">{value}</div>
      <div className="mt-3 text-[17px] font-medium text-ink">{label}</div>
      {description && <div className="mt-2 text-[15px] leading-relaxed text-ink-2">{description}</div>}
    </div>
  );
}
