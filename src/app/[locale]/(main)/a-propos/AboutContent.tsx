import { getLocale, getTranslations } from 'next-intl/server';
import { BrandMark, Container, CtaBand, Eyebrow, ProofStat, Section, SectionHeader, TrustStrip } from '@/components/ds';
import { brand } from '@/data/brand';
import { stat } from '@/data/company-stats';

/** À propos : faits de marque lus dans brand.ts (création, ville, entité) ; aucun nombre de clients ni d'employés. */
export async function AboutContent() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const story = t.raw('story') as { year: string; title: string; text: string }[];
  const principles = t.raw('principles') as { title: string; text: string }[];
  const logoParts = t.raw('logo.parts') as { name: string; text: string }[];
  const partShapes = ['trigger', 'flows', 'arrow'] as const;
  return (
    <>
      <section className="bg-white pb-16 pt-14 md:pb-24 md:pt-20">
        <Container className="text-center">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-4xl text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.5rem]">{t('title')}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-lead">{t('subtitle')}</p>
        </Container>
      </section>

      <section className="border-y border-line bg-white py-12">
        <Container className="grid gap-10 sm:grid-cols-4">
          <ProofStat value={brand.foundingDate} label={t('facts.founded')} />
          <ProofStat value={brand.foundingCity} label={t('facts.city')} />
          <ProofStat value={String(brand.pms.length)} label={t('facts.pms')} />
          <ProofStat value={stat('messages', locale)} label={t('facts.messages')} />
        </Container>
      </section>

      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow={t('storyEyebrow')} title={t('storyTitle')} align="left" />
          <ol className="mt-12 space-y-0 border-l border-line">
            {story.map((s) => (
              <li key={s.year + s.title} className="relative pb-10 pl-8 last:pb-0">
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-accent">{s.year}</p>
                <p className="mt-1 text-h3 font-medium text-ink">{s.title}</p>
                <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-ink-2">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="dark" aria-labelledby="logo-title">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="flex aspect-square w-full max-w-[240px] sm:max-w-[440px] items-center justify-center justify-self-center rounded-3xl bg-accent">
            <BrandMark className="h-[46%] w-auto text-white" />
          </div>
          <div>
            <p className="font-mono text-eyebrow font-medium uppercase text-mint">{t('logo.eyebrow')}</p>
            <h2 id="logo-title" className="mt-4 text-balance text-h2 font-medium tracking-[-0.02em] text-white">{t('logo.title')}</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/80">{t('logo.text')}</p>
            <ol className="mt-10 grid gap-4">
              {logoParts.map((p, i) => (
                <li key={p.name} className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-mint text-accent-hover">
                    <BrandMark part={partShapes[i]} className={partShapes[i] === 'flows' ? 'h-auto w-11' : 'h-10 w-auto'} />
                  </span>
                  <span>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-white/60">0{i + 1}</span>
                    <span className="mt-0.5 block text-[17px] font-semibold text-white">{p.name}</span>
                    <span className="mt-1 block text-[14.5px] leading-relaxed text-white/75">{p.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[13px] text-white/60">{t('logo.credit')}</p>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={t('principlesEyebrow')} title={t('principlesTitle')} align="left" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="rounded-xl border border-line p-7">
                <p className="text-lg font-semibold text-ink">{p.title}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="paper" compact>
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-eyebrow font-medium uppercase text-accent">{t('companyEyebrow')}</p>
            <p className="mt-3 text-[16px] text-ink">{t('company')}</p>
          </div>
          <TrustStrip align="left" />
        </Container>
      </Section>

      <CtaBand title={t('cta')} primary={{ label: nav('startFree'), href: brand.demoPage }} secondary={{ label: t('join'), href: '/carrieres' }} />
    </>
  );
}
