import { useTranslations } from 'next-intl';
import { CheckCheck, CreditCard, Star, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Petites cartes réelles qui flottent autour du visuel du hero (grand écran seulement, données de démo). */
export function HeroFloatingCards() {
  const t = useTranslations('home2.hero.floating');
  const card = 'absolute z-10 hidden w-[230px] rounded-xl border border-line bg-white p-3.5 shadow-[0_18px_40px_-18px_rgba(0,43,40,0.35)] xl:block';
  return (
    <div aria-hidden>
      <div className={cn(card, '-left-40 top-[42%] motion-safe:animate-[float_6s_ease-in-out_infinite]')}>
        <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-accent">
          <UserRound className="h-3.5 w-3.5" /> {t('profileLabel')}
        </p>
        <p className="mt-2 text-[14px] font-semibold text-ink">Camille Martin</p>
        <p className="text-[12px] text-ink-3">{t('profileMeta')}</p>
        <p className="mt-2 flex flex-wrap gap-1">
          {(t.raw('profileTags') as string[]).map((tag) => (
            <span key={tag} className="rounded-full bg-paper px-2 py-0.5 text-[10.5px] text-ink-2">{tag}</span>
          ))}
        </p>
      </div>
      <div className={cn(card, '-right-36 -top-8 motion-safe:animate-[float-slow_7s_ease-in-out_infinite]')}>
        <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#128C7E]">WhatsApp</p>
        <p className="mt-2 rounded-lg bg-[#DCF8C6] px-2.5 py-2 text-[12.5px] text-ink">
          {t('whatsapp')}
          <CheckCheck className="ml-1 inline h-3.5 w-3.5 text-[#34B7F1]" />
        </p>
      </div>
      <div className={cn(card, '-right-32 -bottom-10 motion-safe:animate-[float_6.5s_ease-in-out_infinite]')}>
        <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-accent">
          <CreditCard className="h-3.5 w-3.5" /> {t('upsellLabel')}
        </p>
        <p className="mt-2 flex items-baseline justify-between">
          <span className="text-[13px] text-ink">{t('upsellItem')}</span>
          <span className="text-[17px] font-semibold tabular-nums text-accent">+72 €</span>
        </p>
      </div>
      <div className={cn(card, '-left-28 -bottom-14 motion-safe:animate-[float-slow_7.5s_ease-in-out_infinite]')}>
        <p className="flex items-center gap-1 text-peach">
          {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
          <span className="ml-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">{t('reviewLabel')}</span>
        </p>
        <p className="mt-2 text-[12.5px] text-ink">« {t('review')} »</p>
      </div>
    </div>
  );
}
