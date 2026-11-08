import { useTranslations } from 'next-intl';
import { MapPin, PackageCheck, ShieldCheck, Unlock } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Réassurance sous les formules : sans engagement, RGPD, hébergé en France, livré clé en main. */
export function PricingReassurance({ className }: { className?: string }) {
  const t = useTranslations('pricing.reassurance');
  const items = [
    { key: 'commitment', Icon: Unlock },
    { key: 'gdpr', Icon: ShieldCheck },
    { key: 'france', Icon: MapPin },
    { key: 'turnkey', Icon: PackageCheck },
  ] as const;
  return (
    <ul className={cn('grid gap-3 rounded-2xl border border-line bg-paper p-4 sm:grid-cols-2 lg:grid-cols-4 lg:p-5', className)}>
      {items.map(({ key, Icon }) => (
        <li key={key} className="flex items-start gap-3 rounded-xl bg-white p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mint/60 text-accent">
            <Icon aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span>
            <span className="block text-[15px] font-semibold text-ink">{t(`${key}.title`)}</span>
            <span className="mt-0.5 block text-[13px] leading-snug text-ink-2">{t(`${key}.text`)}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
