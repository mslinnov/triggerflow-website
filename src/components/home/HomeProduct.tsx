import { useTranslations } from 'next-intl';
import { Container, DsButton, ProductFrame, Section, SectionHeader } from '@/components/ds';
import { DataFlowScenario } from '@/components/visuals';
import { Link } from '@/i18n/navigation';
import { productMenu } from '@/data/navigation';
import { BedDouble, CalendarClock, Repeat, Star } from 'lucide-react';

/** Les étapes de la frise, dans l'ordre du parcours client. */
const phases = [
  { key: 'before', Icon: CalendarClock },
  { key: 'during', Icon: BedDouble },
  { key: 'after', Icon: Star },
  { key: 'marketing', Icon: Repeat },
] as const;

export function HomeProduct() {
  const t = useTranslations('home2.product');
  const nav = useTranslations('nav');
  const steps = t.raw('steps') as { title: string; text: string }[];
  const foundations = productMenu.find((c) => c.key === 'core')?.items ?? [];
  const tailored = t.raw('tailored') as { client: string; text: string }[];
  return (
    <Section tone="white" id="produit">
      <Container>
        {/* 5a. Le principe */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader eyebrow={t('eyebrow')} title={t('title')} titleMuted={t('titleMuted')} subtitle={t('subtitle')} align="left" />
            <ol className="mt-10 space-y-6">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line font-mono text-[12px] text-accent">{i + 1}</span>
                  <div>
                    <p className="text-[16px] font-semibold text-ink">{s.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <ProductFrame label="app.trigger-flow.com/flows" className="lg:sticky lg:top-28">
            <div className="bg-[radial-gradient(#E4E8E7_1px,transparent_1px)] [background-size:16px_16px]">
              <DataFlowScenario />
            </div>
          </ProductFrame>
        </div>

        {/* 5b. Toute la plateforme : la frise du séjour, puis le socle commun */}
        <div className="mt-28 md:mt-36">
          <SectionHeader title={t('platformTitle')} titleMuted={t('platformMuted')} align="left" />
          <ol className="relative ml-4 mt-12 grid gap-10 md:ml-0 md:grid-cols-4 md:gap-6">
            {/* La ligne du temps, de l'avant-séjour au retour du client */}
            <div aria-hidden className="absolute left-0 right-0 top-[15px] hidden h-px bg-gradient-to-r from-accent via-accent/60 to-accent/20 md:block" />
            {phases.map(({ key, Icon }) => {
              const col = productMenu.find((c) => c.key === key);
              if (!col) return null;
              return (
                <li key={key} className="relative border-l border-line pl-6 md:border-l-0 md:pl-0">
                  <span className="absolute -left-[16px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-accent bg-white text-accent md:static">
                    <Icon aria-hidden className="h-4 w-4" />
                  </span>
                  <p className="mt-0 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3 md:mt-5">{t(`timeline.${key}.when`)}</p>
                  <p className="mt-1 text-[18px] font-semibold text-ink">{t(`timeline.${key}.label`)}</p>
                  <ul className="mt-5 space-y-2">
                    {col.items.map((item) => (
                      <li key={item.key}>
                        <Link href={item.href} className="group block rounded-lg border border-line bg-white px-4 py-3 transition-colors hover:border-accent">
                          <span className="block text-[15px] font-semibold text-ink group-hover:text-accent">{nav(`items.${item.key}`)}</span>
                          <span className="mt-0.5 block text-[13px] text-ink-3">{nav(`descriptions.${item.key}`)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>

          {/* Le socle : présent tout au long du parcours */}
          <div className="mt-10 rounded-2xl bg-ink p-6 text-white md:p-8">
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-mint">{t('timeline.core.when')}</p>
              <p className="text-[14px] text-white/70">{t('timeline.core.label')}</p>
            </div>
            <ul className="mt-6 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
              {foundations.map((item) => (
                <li key={item.key} className="bg-ink">
                  <Link href={item.href} className="group block h-full p-4 transition-colors hover:bg-white/[0.04]">
                    <span className="block text-[15px] font-semibold text-white group-hover:text-mint">{nav(`items.${item.key}`)}</span>
                    <span className="mt-0.5 block text-[13px] text-white/65">{nav(`descriptions.${item.key}`)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <DsButton href="/produit" variant="link" arrow className="mt-6">
            {t('seeAll')}
          </DsButton>
        </div>

        {/* 5c. Taillé pour votre hôtel */}
        <div className="mt-28 md:mt-36">
          <SectionHeader title={t('tailoredTitle')} titleMuted={t('tailoredMuted')} subtitle={t('tailoredText')} align="left" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {tailored.map((ex) => (
              <figure key={ex.client} className="rounded-xl border border-line bg-paper p-7">
                <figcaption className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-accent">{ex.client}</figcaption>
                <p className="mt-4 text-[16px] leading-relaxed text-ink">{ex.text}</p>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
