import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}

/** Étiquette de section : mono, majuscules, accent, précédée d'un point. */
export function Eyebrow({ children, onDark, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 font-mono text-eyebrow font-medium uppercase',
        onDark ? 'text-mint' : 'text-accent',
        className
      )}
    >
      <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', onDark ? 'bg-mint' : 'bg-accent')} />
      {children}
    </p>
  );
}
