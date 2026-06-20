import { companyStats, type StatId } from '@/data/company-stats';

interface KeyFiguresGridProps {
  children: React.ReactNode;
}

export function KeyFiguresGrid({ children }: KeyFiguresGridProps) {
  return (
    <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      {children}
    </div>
  );
}

export function KeyFigureCard({ value, label, statId, locale }: { value?: string; label: string; statId?: string; locale?: string }) {
  const s = statId ? companyStats[statId as StatId] : undefined;
  const resolved = s ? (locale === 'fr' ? s.fr : s.en) : value;
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 text-center shadow-sm">
      <div className="text-3xl font-bold text-brand-primary">{resolved}</div>
      <div className="mt-2 text-sm text-gray-600">{label}</div>
    </div>
  );
}
