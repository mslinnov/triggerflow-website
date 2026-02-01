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

export function KeyFigureCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 text-center shadow-sm">
      <div className="text-3xl font-bold text-brand-primary">{value}</div>
      <div className="mt-2 text-sm text-gray-600">{label}</div>
    </div>
  );
}
