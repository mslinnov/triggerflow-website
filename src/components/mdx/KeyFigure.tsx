interface KeyFigureProps {
  value: string;
  label: string;
  description?: string;
}

export function KeyFigure({ value, label, description }: KeyFigureProps) {
  return (
    <div className="my-8 rounded-r-lg border-l-4 border-brand-primary bg-brand-primary/5 p-6">
      <div className="text-4xl font-bold text-brand-primary">{value}</div>
      <div className="mt-1 text-lg font-semibold text-gray-900">{label}</div>
      {description && (
        <div className="mt-2 text-sm text-gray-600">{description}</div>
      )}
    </div>
  );
}
