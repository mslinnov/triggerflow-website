import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui';
import { ROI_CASE, getPaybackBookings, getRoiAverageBasket, type DisplayPlan } from '@/data/pricing';

/** Chiffres en IBM Plex Sans Condensed, police chargée par `tarifs/page.tsx` quand le bloc est affiché. */
const CONDENSED = 'font-[family-name:var(--font-plex-condensed)] font-medium tabular-nums';

interface RoiBlockProps {
  plans: DisplayPlan[];
}

/**
 * « Ce que ça rapporte » : un cas client moyen, puis le nombre de réservations à ce panier moyen
 * qui remboursent chaque offre payante. Affiché seulement avec `PRICING_ROI_PREVIEW=1`.
 */
export function RoiBlock({ plans }: RoiBlockProps) {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const number = new Intl.NumberFormat(locale);
  // Panier arrondi à 10 € : « environ 210 € », pas 212,5.
  const basket = Math.round(getRoiAverageBasket() / 10) * 10;
  const paidPlans = plans.filter((plan) => Number(plan.price) > 0);

  return (
    <section className="bg-[#F2F7F6] py-16 md:py-24" aria-labelledby="roi-title">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#257A6C]">{t('roi.eyebrow')}</p>
        <h2 id="roi-title" className="mt-3 text-3xl font-medium tracking-tight text-brand-dark md:text-5xl">
          {t('roi.title')} <span className="text-[#257A6C]">{t('roi.titleAccent')}</span>
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="rounded-2xl border border-zinc-200/70 bg-white p-6 md:p-8">
            <p className="text-sm font-semibold text-[#257A6C]">{t('roi.caseLabel')}</p>
            <p className="mt-2 text-lg leading-relaxed text-brand-dark md:text-xl">
              {t('roi.caseBody', { rooms: ROI_CASE.rooms })}
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
              <div className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-zinc-600">{t('roi.bookingsLabel')}</dt>
                <dd className={`${CONDENSED} text-5xl text-brand-dark md:text-6xl`}>
                  {t('roi.bookings', { min: ROI_CASE.bookingsMin, max: ROI_CASE.bookingsMax })}
                </dd>
              </div>
              <div className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-zinc-600">{t('roi.revenueLabel')}</dt>
                <dd className={`${CONDENSED} text-5xl text-[#B2541C] md:text-6xl`}>
                  {t('roi.revenue', { amount: number.format(ROI_CASE.revenue) })}
                </dd>
              </div>
            </dl>
            <p className="mt-8 text-sm leading-relaxed text-zinc-500">{t('roi.disclaimer')}</p>
          </div>

          <div className="rounded-2xl border border-zinc-200/70 bg-white p-6 md:p-8">
            <h3 className="text-sm font-semibold text-[#257A6C]">{t('roi.paybackTitle')}</h3>
            <p className="mt-2 text-sm text-zinc-600">{t('roi.paybackIntro', { basket })}</p>
            <ul className="mt-4 divide-y divide-zinc-200 border-t border-zinc-200">
              {paidPlans.map((plan) => {
                const count = getPaybackBookings(plan.price);
                return (
                  <li key={plan.key} className="flex items-center justify-between gap-4 py-4">
                    <div>
                      <p className="font-medium text-brand-dark">{t(`plans.${plan.key}.name`)}</p>
                      <p className="text-sm text-zinc-600">{t('roi.planPrice', { price: plan.price })}</p>
                    </div>
                    <p className="text-right">
                      <span className={`${CONDENSED} block text-3xl leading-none text-[#B2541C]`}>{count}</span>
                      <span className="text-xs text-zinc-600">{t('roi.bookingsUnit', { count })}</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
