import { cn } from '@/lib/utils';
import { Info, AlertTriangle, Lightbulb } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip';
  children: React.ReactNode;
}

const calloutStyles = {
  info: {
    container: 'border-brand-primary/20 bg-brand-light/30',
    icon: 'text-brand-primary',
    Icon: Info,
  },
  warning: {
    container: 'border-brand-accent/40 bg-brand-accent/10',
    icon: 'text-brand-accent',
    Icon: AlertTriangle,
  },
  tip: {
    container: 'border-brand-primary/30 bg-brand-primary/5',
    icon: 'text-brand-primary',
    Icon: Lightbulb,
  },
};

export function Callout({ type = 'info', children }: CalloutProps) {
  const style = calloutStyles[type];
  const { Icon } = style;

  return (
    <div
      className={cn(
        'my-6 flex gap-3 rounded-lg border p-4',
        style.container
      )}
    >
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', style.icon)} />
      <div className="text-sm leading-relaxed [&>p]:m-0">{children}</div>
    </div>
  );
}
