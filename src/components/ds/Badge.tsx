import { cn } from '@/lib/utils';

interface DsBadgeProps {
  children: React.ReactNode;
  tone?: 'mint' | 'peach' | 'outline';
  className?: string;
}

/** Pilule : menthe par défaut, pêche pour « Nouveau » ou un événement positif. */
export function DsBadge({ children, tone = 'mint', className }: DsBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium',
        tone === 'mint' && 'bg-mint text-ink',
        tone === 'peach' && 'bg-peach text-ink',
        tone === 'outline' && 'border border-line text-ink-2',
        className
      )}
    >
      {children}
    </span>
  );
}
