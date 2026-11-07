import { companyStats, type StatId } from '@/data/company-stats';

interface KeyFiguresGridProps {
  children: React.ReactNode;
}

export function KeyFiguresGrid({ children }: KeyFiguresGridProps) {
  return <div className="not-prose my-8 grid grid-cols-1 gap-4 sm:grid-cols-3">{children}</div>;
}

export function KeyFigureCard({ value, label, statId, locale }: { value?: string; label: string; statId?: string; locale?: string }) {
  const s = statId ? companyStats[statId as StatId] : undefined;
  const resolved = s ? (locale === 'fr' ? s.fr : s.en) : value;
  return (
    <div className="rounded-xl border border-line bg-white p-5">
      <div className="font-mono text-[2rem] font-medium leading-none tracking-[-0.02em] text-ink">{resolved}</div>
      <div className="mt-3 text-[14px] leading-snug text-ink-2">{label}</div>
    </div>
  );
}
