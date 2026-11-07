import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}

/** Fonctionnalité : icône au trait, titre, texte court. */
export function FeatureItem({ icon: Icon, title, children, onDark, className }: FeatureItemProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <span
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-lg border',
          onDark ? 'border-white/15 text-mint' : 'border-line bg-paper text-accent'
        )}
      >
        <Icon aria-hidden className="h-5 w-5" strokeWidth={1.5} />
      </span>
      <h3 className={cn('mt-5 text-lg font-semibold tracking-[-0.01em]', onDark ? 'text-white' : 'text-ink')}>{title}</h3>
      <p className={cn('mt-2 text-[15px] leading-relaxed', onDark ? 'text-white/70' : 'text-ink-2')}>{children}</p>
    </div>
  );
}
