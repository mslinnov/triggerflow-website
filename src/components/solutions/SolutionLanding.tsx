import { getTranslations } from 'next-intl/server';
import { ArrowRight, Check, X } from 'lucide-react';
import { Container, CtaBand, DsButton, Eyebrow, FaqList, ProductFrame, ProofStat, Section, SectionHeader, TestimonialCard, TrustStrip } from '@/components/ds';
import { HeroScenario } from '@/components/visuals';
import { Link } from '@/i18n/navigation';
import { brand } from '@/data/brand';
import { solutions } from '@/data/solutions';
import { productLandings } from '@/content/products';

/** Anciens slugs de modules (solutions.ts) → nouvelles landings produit. */
const MODULE_TO_LANDING: Record<string, string> = {
  ...Object.fromEntries(Object.values(productLandings).flatMap((p) => (p.legacySlug ? [[p.legacySlug, p.slug]] : []))),
  sms: 'inbox',
  whatsapp: 'inbox',
  email: 'campaigns',
};
const landingHref = (slug: string) => `/produit/${MODULE_TO_LANDING[slug] ?? slug}`;
const landingName = (slug: string, lang: 'fr' | 'en') => productLandings[MODULE_TO_LANDING[slug] ?? slug]?.name[lang] ?? slug;

/** Page segment (hôtels indépendants, groupes…) dans la charte, à partir de src/data/solutions.ts. */
export async function SolutionLanding({ slug, locale }: { slug: string; locale: string }) {
  const s = solutions[slug];
  if (!s) return null;
  const lang = locale === 'en' ? 'en' : 'fr';
  const t = await getTranslations({ locale, namespace: 'solutionLanding' });
  const nav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <section className="bg-white pb-16 pt-14 md:pb-24 md:pt-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{s.title}</Eyebrow>
            <h1 className="mt-5 text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.5rem]">{s.headline}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-lead">{s.description}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <DsButton href={brand.demoUrl} arrow>{nav('startFree')}</DsButton>
              <DsButton href="/tarifs" variant="secondary">{nav('pricing')}</DsButton>
            </div>
            <TrustStrip className="mt-7" />
          </div>
          <ProductFrame className="mx-auto mt-14 max-w-[1080px]"><HeroScenario /></ProductFrame>
        </Container>
      </section>

      <section className="border-y border-line bg-white py-12">
        <Container className="grid gap-10 sm:grid-cols-3">
          {s.stats.map((st) => <ProofStat key={st.label} value={`${st.value}${st.suffix ?? ''}`} label={st.label} />)}
        </Container>
      </section>

      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow={t('challenges')} title={t('challengesTitle')} align="left" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {s.challenges.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="rounded-xl border border-line bg-white p-6">
                  <Icon aria-hidden className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  <p className="mt-4 text-[16px] font-semibold text-ink">{c.title}</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{c.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {(s.painPoints?.length || s.benefits?.length) && (
        <Section tone="white">
          <Container>
            <SectionHeader eyebrow={t('beforeAfter')} title={t('beforeAfterTitle')} align="left" />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-line bg-paper p-7">
                <p className="font-mono text-eyebrow uppercase text-ink-3">{t('without')}</p>
                <ul className="mt-5 space-y-3">{s.painPoints?.map((p) => <li key={p} className="flex gap-2.5 text-[15px] text-ink-2"><X aria-hidden className="mt-1 h-4 w-4 shrink-0 text-ink-3" />{p}</li>)}</ul>
              </div>
              <div className="rounded-xl border border-accent bg-white p-7">
                <p className="font-mono text-eyebrow uppercase text-accent">{t('with')}</p>
                <ul className="mt-5 space-y-3">{s.benefits?.map((p) => <li key={p} className="flex gap-2.5 text-[15px] text-ink"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-accent" />{p}</li>)}</ul>
              </div>
            </div>
          </Container>
        </Section>
      )}

      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow={t('features')} title={t('featuresTitle')} align="left" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {s.features.map((f) => (
              <Link key={f.slug + f.highlight} href={landingHref(f.slug)} className="group flex flex-col rounded-xl border border-line bg-white p-7 transition-colors hover:border-accent">
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-accent">{landingName(f.slug, lang)}</span>
                <p className="mt-3 text-lg font-semibold text-ink">{f.highlight}</p>
                {f.whyForPersona && <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{f.whyForPersona}</p>}
                {f.bullets && <ul className="mt-4 space-y-1.5">{f.bullets.map((b) => <li key={b} className="flex gap-2 text-[14px] text-ink-2"><Check aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />{b}</li>)}</ul>}
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-accent">{t('learnMore')}<ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {s.useCases.length > 0 && (
        <Section tone="white">
          <Container>
            <SectionHeader eyebrow={t('useCases')} title={t('useCasesTitle')} align="left" />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {s.useCases.map((u) => (
                <div key={u.title} className="rounded-xl border border-line p-7">
                  <p className="text-[16px] font-semibold text-ink">{u.title}</p>
                  <p className="mt-2 text-[14.5px] text-ink-2">{u.description}</p>
                  <ol className="mt-4 space-y-1.5">{u.steps.map((st, i) => <li key={st} className="flex gap-2 text-[13.5px] text-ink-2"><span className="font-mono text-accent">{i + 1}.</span>{st}</li>)}</ol>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {s.testimonial && (
        <Section tone="paper" compact>
          <Container className="max-w-3xl">
            <TestimonialCard quote={s.testimonial.quote} name={s.testimonial.author} role={s.testimonial.role} company={s.testimonial.hotel} />
          </Container>
        </Section>
      )}

      {s.faq && s.faq.length > 0 && (
        <Section tone="white">
          <Container narrow>
            <SectionHeader eyebrow="FAQ" title={t('faqTitle')} align="left" />
            <div className="mt-10"><FaqList items={s.faq} /></div>
          </Container>
        </Section>
      )}

      <CtaBand title={s.ctaTitle ?? t('cta')} text={s.ctaSubtitle} primary={{ label: nav('startFree'), href: brand.demoUrl }} secondary={{ label: nav('seeProduct'), href: '/produit' }} />
    </>
  );
}
