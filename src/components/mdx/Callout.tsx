import { cn } from '@/lib/utils';
import { Info, AlertTriangle, Lightbulb } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip';
  children: React.ReactNode;
}

/** Encadré d'article : menthe (info), pêche discret (attention), papier (astuce), bordure 1 px. */
const calloutStyles = {
  info: {
    container: 'border-mint bg-mint/40',
    icon: 'text-accent',
    Icon: Info,
  },
  warning: {
    container: 'border-peach bg-peach/25',
    icon: 'text-ink',
    Icon: AlertTriangle,
  },
  tip: {
    container: 'border-line bg-paper',
    icon: 'text-accent',
    Icon: Lightbulb,
  },
};

export function Callout({ type = 'info', children }: CalloutProps) {
  const style = calloutStyles[type];
  const { Icon } = style;

  return (
    <div className={cn('not-prose my-8 flex gap-4 rounded-xl border p-5 md:p-6', style.container)}>
      <Icon aria-hidden strokeWidth={1.75} className={cn('mt-0.5 h-5 w-5 shrink-0', style.icon)} />
      <div className="min-w-0 text-[16px] leading-relaxed text-ink-2 [&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/30 [&_a]:underline-offset-4 hover:[&_a]:decoration-accent [&_strong]:font-semibold [&_strong]:text-ink [&>*+*]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5">
        {children}
      </div>
    </div>
  );
}
