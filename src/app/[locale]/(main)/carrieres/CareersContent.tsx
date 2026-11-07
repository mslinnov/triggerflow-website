import { getLocale, getTranslations } from 'next-intl/server';
import { Mail } from 'lucide-react';
import { Container, CtaBand, Eyebrow, ProofStat, Section, SectionHeader } from '@/components/ds';
import { brand } from '@/data/brand';

/** Carrières : pas de nombre de collaborateurs (décision du 25/10/2026) ; faits lus dans brand.ts. */
export default async function CareersContent() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'careersPage' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const values = t.raw('values') as { title: string; text: string }[];
  return (
    <>
      <section className="bg-white pb-16 pt-14 md:pb-24 md:pt-20">
        <Container className="text-center">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.5rem]">{t('title')}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-lead">{t('subtitle')}</p>
        </Container>
      </section>
      <section className="border-y border-line bg-white py-12">
        <Container className="grid gap-10 sm:grid-cols-3">
          <ProofStat value={brand.foundingDate} label={t('facts.founded')} />
          <ProofStat value={brand.foundingCity} label={t('facts.city')} />
          <ProofStat value={t('facts.remoteValue')} label={t('facts.remote')} />
        </Container>
      </section>
      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow={t('valuesEyebrow')} title={t('valuesTitle')} align="left" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-line bg-white p-7">
                <p className="text-lg font-semibold text-ink">{v.title}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container narrow className="text-center">
          <SectionHeader title={t('openTitle')} subtitle={t('openText')} />
          <a href="mailto:careers@trigger-flow.com" className="mt-8 inline-flex items-center gap-2 rounded-lg border border-ink/80 px-5 py-3 font-mono text-[13px] uppercase tracking-[0.04em] text-ink hover:bg-ink hover:text-white">
            <Mail aria-hidden className="h-4 w-4" /> careers@trigger-flow.com
          </a>
        </Container>
      </Section>
      <CtaBand title={t('cta')} primary={{ label: nav('startFree'), href: brand.demoPage }} secondary={{ label: nav('seeProduct'), href: '/produit' }} />
    </>
  );
}
