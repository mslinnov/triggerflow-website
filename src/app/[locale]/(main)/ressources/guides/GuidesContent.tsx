import { getTranslations } from 'next-intl/server';
import { ArrowRight, BookOpen, CalendarDays, FileText, Newspaper } from 'lucide-react';
import { Container, CtaBand, Eyebrow, Section } from '@/components/ds';
import { Link } from '@/i18n/navigation';
import { brand } from '@/data/brand';

/**
 * Ressources réelles uniquement : les trois guides PDF (landings /lp/*-livre-blanc),
 * le calendrier marketing et le blog. Aucun contenu « à venir ».
 */
const RESOURCES = [
  { key: 'upsell', href: '/lp/upsell-hotel-livre-blanc', icon: FileText },
  { key: 'postStay', href: '/lp/post-sejour-hotel-livre-blanc', icon: FileText },
  { key: 'clientsOta', href: '/lp/clients-ota-hotel-livre-blanc', icon: FileText },
  { key: 'calendar', href: '/calendrier-marketing', icon: CalendarDays },
  { key: 'blog', href: '/blog', icon: Newspaper },
] as const;

export default async function GuidesContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'guidesPage' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  return (
    <>
      <section className="bg-white pb-14 pt-14 md:pb-20 md:pt-20">
        <Container className="text-center">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.5rem]">{t('title')}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{t('subtitle')}</p>
        </Container>
      </section>
      <Section tone="paper">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.filter((r) => locale === 'fr' || r.key !== 'calendar').map((r) => {
              const Icon = r.icon;
              return (
                <Link key={r.key} href={r.href} className="group flex flex-col rounded-xl border border-line bg-white p-7 transition-colors hover:border-accent">
                  <div className="flex items-center justify-between">
                    <Icon aria-hidden className="h-6 w-6 text-accent" strokeWidth={1.5} />
                    <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">{t(`items.${r.key}.type`)}</span>
                  </div>
                  <p className="mt-5 text-lg font-semibold text-ink">{t(`items.${r.key}.title`)}</p>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-2">{t(`items.${r.key}.text`)}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">{t(`items.${r.key}.cta`)}<ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
                </Link>
              );
            })}
          </div>
          <p className="mt-10 flex items-center gap-2 text-[14px] text-ink-3"><BookOpen aria-hidden className="h-4 w-4" />{t('note')}</p>
        </Container>
      </Section>
      <CtaBand title={t('cta')} primary={{ label: nav('startFree'), href: brand.demoPage }} secondary={{ label: nav('seeProduct'), href: '/produit' }} />
    </>
  );
}
