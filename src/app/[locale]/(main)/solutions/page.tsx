import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Container, CtaBand, Eyebrow, Section } from '@/components/ds';
import { Link } from '@/i18n/navigation';
import { brand } from '@/data/brand';
import { solutions } from '@/data/solutions';
import { solutionsMenu } from '@/data/navigation';
import { pageAlternates } from '@/lib/seo';

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'solutionLanding' });
  return { title: t('indexTitle'), description: t('indexSubtitle'), alternates: pageAlternates(locale, '/solutions') };
}

export default async function SolutionsIndex({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'solutionLanding' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  return (
    <>
      <section className="bg-white pb-14 pt-14 md:pb-20 md:pt-20">
        <Container className="text-center">
          <Eyebrow>{t('indexEyebrow')}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.5rem]">{t('indexTitle')}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-lead">{t('indexSubtitle')}</p>
        </Container>
      </section>
      <Section tone="paper">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solutionsMenu.map((item) => {
              const s = solutions[item.href.split('/').pop() as string];
              if (!s) return null;
              const Icon = s.icon;
              return (
                <Link key={item.key} href={item.href} className="group flex flex-col rounded-xl border border-line bg-white p-7 transition-colors hover:border-accent">
                  <Icon aria-hidden className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  <p className="mt-5 text-lg font-semibold text-ink">{nav(`items.${item.key}`)}</p>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-2">{s.headline}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">{t('learnMore')}<ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>
      <CtaBand title={t('cta')} primary={{ label: nav('startFree'), href: brand.demoUrl }} secondary={{ label: nav('seeProduct'), href: '/produit' }} />
    </>
  );
}
