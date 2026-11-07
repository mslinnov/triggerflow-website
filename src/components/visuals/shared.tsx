import { cn } from '@/lib/utils';

/** Apparition d'un élément quand le scénario atteint l'étape `at`. */
/** `as="li"` quand Reveal est l'enfant direct d'une liste (structure accessible ul > li). */
export function Reveal({ show, children, className, from = 'up', as: Tag = 'div' }: { show: boolean; children: React.ReactNode; className?: string; from?: 'up' | 'left' | 'scale'; as?: 'div' | 'li' }) {
  const hidden = from === 'up' ? 'translate-y-2' : from === 'left' ? '-translate-x-2' : 'scale-95';
  return (
    <Tag
      className={cn('transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]', show ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : cn('opacity-0', hidden), className)}
    >
      {children}
    </Tag>
  );
}

/** Nœud de flow (style de l'éditeur réel de l'app). */
export function FlowNode({
  kind,
  label,
  title,
  active,
  icon,
  className,
}: {
  kind: 'trigger' | 'condition' | 'action';
  label: string;
  title: string;
  active: boolean;
  icon: React.ReactNode;
  className?: string;
}) {
  const tone =
    kind === 'trigger' ? 'text-accent-hover bg-mint/60' : kind === 'condition' ? 'text-[#8A5A1C] bg-peach/50' : 'text-ink bg-paper';
  return (
    <div
      className={cn(
        'rounded-xl border bg-white px-3.5 py-3 transition-all duration-500',
        active ? 'border-accent shadow-[0_0_0_3px_rgba(0,111,104,0.12)]' : 'border-line',
        className
      )}
    >
      <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.06em]', tone)}>
        {label}
      </span>
      <div className="mt-2 flex items-center gap-2 text-[13px] font-semibold text-ink">
        <span className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-md', active ? 'bg-accent text-white' : 'bg-paper text-ink-3')}>{icon}</span>
        <span className="leading-tight">{title}</span>
      </div>
    </div>
  );
}

/** Trait vertical entre deux nœuds, qui se remplit quand l'étape est atteinte. */
export function Connector({ active, className }: { active: boolean; className?: string }) {
  return (
    <div className={cn('relative mx-auto h-6 w-px bg-line', className)}>
      <div className={cn('absolute inset-x-0 top-0 bg-accent transition-all duration-500', active ? 'h-full' : 'h-0')} />
    </div>
  );
}
