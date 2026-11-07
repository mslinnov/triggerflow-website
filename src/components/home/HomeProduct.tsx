import { useTranslations } from 'next-intl';
import { Container, DsButton, ProductFrame, Section, SectionHeader } from '@/components/ds';
import { FlowTreeScenario } from '@/components/visuals';
import { Link } from '@/i18n/navigation';
import { productMenu } from '@/data/navigation';

export function HomeProduct() {
  const t = useTranslations('home2.product');
  const nav = useTranslations('nav');
  const steps = t.raw('steps') as { title: string; text: string }[];
  const tailored = t.raw('tailored') as { client: string; text: string }[];
  return (
    <Section tone="white" id="produit">
      <Container>
        {/* 5a. Le principe */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
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
          <ProductFrame label="app.trigger-flow.com/flows">
            <div className="bg-[radial-gradient(#E4E8E7_1px,transparent_1px)] [background-size:16px_16px]">
              <FlowTreeScenario />
            </div>
          </ProductFrame>
        </div>

        {/* 5b. Toute la plateforme */}
        <div className="mt-28 md:mt-36">
          <SectionHeader title={t('platformTitle')} titleMuted={t('platformMuted')} align="left" />
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {productMenu.map((col) => (
              <div key={col.key} className="bg-white p-6">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink-3">{nav(`columns.${col.key}`)}</p>
                <ul className="mt-5 space-y-4">
                  {col.items.map((item) => (
                    <li key={item.key}>
                      <Link href={item.href} className="group block">
                        <span className="block text-[15px] font-semibold text-ink group-hover:text-accent">{nav(`items.${item.key}`)}</span>
                        <span className="mt-0.5 block text-[13px] text-ink-3">{nav(`descriptions.${item.key}`)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
