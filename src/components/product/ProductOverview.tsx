import { getTranslations } from 'next-intl/server';
import { ArrowRight, Bot, RefreshCw, ShieldCheck } from 'lucide-react';
import { Container, CtaBand, DsButton, Eyebrow, ProductFrame, Section, SectionHeader, TrustStrip } from '@/components/ds';
import { HeroScenario } from '@/components/visuals';
import { Link } from '@/i18n/navigation';
import { brand } from '@/data/brand';
import { productMenu } from '@/data/navigation';

/** Vue d'ensemble de la plateforme : les produits rangés par moment du séjour, puis le socle commun. */
export async function ProductOverview({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'productOverview' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const pillars = [
    { icon: RefreshCw, key: 'sync', href: '/plateforme/synchronisation' },
    { icon: Bot, key: 'ai', href: '/plateforme/ia' },
    { icon: ShieldCheck, key: 'security', href: '/plateforme/securite' },
  ] as const;
  return (
    <>
      <section className="bg-white pb-16 pt-14 md:pb-24 md:pt-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h1 className="mt-5 text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.5rem]">{t('title')}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-lead">{t('subtitle')}</p>
            <div className="mt-9 flex justify-center">
              <DsButton href={brand.demoPage} arrow>{nav('startFree')}</DsButton>
            </div>
            <TrustStrip className="mt-7" />
          </div>
          <ProductFrame className="mx-auto mt-14 max-w-[1080px]"><HeroScenario /></ProductFrame>
        </Container>
      </section>

      {productMenu.map((col, i) => (
        <Section key={col.key} tone={i % 2 === 0 ? 'paper' : 'white'} compact>
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_2.2fr]">
              <div>
                <p className="font-mono text-eyebrow font-medium uppercase text-accent">0{i + 1}</p>
                <h2 className="mt-3 text-h3 font-medium text-ink">{nav(`columns.${col.key}`)}</h2>
                <p className="mt-2 text-[15px] text-ink-2">{t(`moments.${col.key}`)}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {col.items.map((item) => (
                  <Link key={item.key} href={item.href} className="group rounded-xl border border-line bg-white p-5 transition-colors hover:border-accent">
                    <p className="flex items-center justify-between text-[16px] font-semibold text-ink">
                      {nav(`items.${item.key}`)}
                      <ArrowRight aria-hidden className="h-4 w-4 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                    </p>
                    <p className="mt-1.5 text-[14px] text-ink-2">{nav(`descriptions.${item.key}`)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <section className="bg-ink py-20 text-white md:py-28">
        <Container>
          <SectionHeader eyebrow={t('foundationEyebrow')} title={t('foundationTitle')} align="left" onDark />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pillars.map(({ icon: Icon, key, href }) => (
              <Link key={key} href={href} className="group rounded-xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-mint/50">
                <Icon aria-hidden className="h-6 w-6 text-mint" strokeWidth={1.5} />
                <p className="mt-5 text-lg font-semibold">{t(`pillars.${key}.title`)}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{t(`pillars.${key}.text`)}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title={t('cta')} primary={{ label: nav('startFree'), href: brand.demoPage }} secondary={{ label: nav('pricing'), href: '/tarifs' }} />
    </>
  );
}
