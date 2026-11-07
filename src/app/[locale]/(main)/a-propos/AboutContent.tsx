import { getLocale, getTranslations } from 'next-intl/server';
import { Container, CtaBand, Eyebrow, ProofStat, Section, SectionHeader, TrustStrip } from '@/components/ds';
import { brand } from '@/data/brand';
import { stat } from '@/data/company-stats';

/** À propos : faits de marque lus dans brand.ts (création, ville, entité) ; aucun nombre de clients ni d'employés. */
export async function AboutContent() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const story = t.raw('story') as { year: string; title: string; text: string }[];
  const principles = t.raw('principles') as { title: string; text: string }[];
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

      <CtaBand title={t('cta')} primary={{ label: nav('startFree'), href: brand.demoUrl }} secondary={{ label: t('join'), href: '/carrieres' }} />
    </>
  );
}
