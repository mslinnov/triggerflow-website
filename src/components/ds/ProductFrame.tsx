import { cn } from '@/lib/utils';

interface ProductFrameProps {
  children: React.ReactNode;
  /** Barre de fenêtre minimale avec l'adresse de l'app. */
  chrome?: boolean;
  label?: string;
  className?: string;
}

/** Cadre unique des visuels produit : papier, bordure 1 px, rayon 16 px, ombre unique. */
export function ProductFrame({ children, chrome = true, label = 'app.trigger-flow.com', className }: ProductFrameProps) {
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-line bg-white shadow-product', className)}>
      {chrome && (
        <div className="flex h-9 items-center gap-2 border-b border-line bg-paper px-4">
          <span aria-hidden className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </span>
          <span className="mx-auto font-mono text-[11px] text-ink-3">{label}</span>
        </div>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
