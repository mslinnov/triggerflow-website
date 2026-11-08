import { useTranslations } from 'next-intl';
import { FileCheck2, MapPin, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustStripProps {
  onDark?: boolean;
  align?: 'center' | 'left';
  className?: string;
}

/** « Hébergé en France · RGPD · DPA public », placé près des boutons d'action. */
export function TrustStrip({ onDark, align = 'center', className }: TrustStripProps) {
  const t = useTranslations('ds.trust');
  const items = [
    { icon: MapPin, label: t('france') },
    { icon: ShieldCheck, label: t('gdpr') },
    { icon: FileCheck2, label: t('dpa') },
  ];
  return (
    <ul
      className={cn(
        'flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[12px] uppercase tracking-[0.06em]',
        align === 'center' ? 'justify-center' : 'justify-start',
        onDark ? 'text-white/80' : 'text-ink-3',
        className
      )}
    >
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="inline-flex items-center gap-1.5">
          <Icon aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />
          {label}
        </li>
      ))}
    </ul>
  );
}
