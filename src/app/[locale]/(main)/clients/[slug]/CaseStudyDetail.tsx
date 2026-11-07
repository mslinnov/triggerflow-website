import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, ArrowRight, Check, MapPin, Server } from 'lucide-react';
import { Container, CtaBand, Eyebrow, Section } from '@/components/ds';
import { Link } from '@/i18n/navigation';
import { brand } from '@/data/brand';
import { getAdjacentCaseStudies, getCaseStudyBySlug } from '@/lib/case-studies';

/** Fiche cas client (charte) : récit en questions-réponses, citation, points clés. Rédigée en français. */
export default async function CaseStudyDetail({ slug, locale }: { slug: string; locale: string }) {
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return null;
  const { prev, next } = getAdjacentCaseStudies(slug);
  const t = await getTranslations({ locale, namespace: 'caseDetail' });
  const nav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <section className="bg-white pb-12 pt-10 md:pb-16 md:pt-14">
        <Container>
          <Link href="/clients" className="inline-flex items-center gap-1.5 text-[14px] text-ink-3 hover:text-ink">
            <ArrowLeft aria-hidden className="h-4 w-4" /> {t('back')}
          </Link>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Eyebrow>{t('eyebrow')}</Eyebrow>
              <h1 className="mt-4 text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.25rem]">{cs.name}</h1>
              <p className="mt-3 text-lg text-ink-2">{cs.type}</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] uppercase tracking-[0.06em] text-ink-3">
                <span className="inline-flex items-center gap-1.5"><MapPin aria-hidden className="h-4 w-4" />{cs.location}</span>
                <span className="inline-flex items-center gap-1.5"><Server aria-hidden className="h-4 w-4" />{cs.pms}</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
              <Image src={cs.image} alt={cs.name} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </section>

      <Section tone="paper" compact>
        <Container narrow className="text-center">
          <blockquote className="text-balance text-[1.5rem] font-medium leading-[1.35] tracking-[-0.015em] text-ink md:text-[2rem]">« {cs.quote} »</blockquote>
          <p className="mt-6 text-[15px] font-semibold text-ink">{cs.contactName}</p>
          <p className="text-[14px] text-ink-3">{cs.contactRole}, {cs.name}</p>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-eyebrow font-medium uppercase text-accent">{t('objectives')}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {cs.objectives.map((o) => <li key={o} className="rounded-full bg-mint px-3 py-1 text-[13px] text-ink">{o}</li>)}
              </ul>
              <p className="mt-8 font-mono text-eyebrow font-medium uppercase text-accent">{t('highlights')}</p>
              <ul className="mt-4 space-y-3">
                {cs.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-[15px] text-ink"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-accent" />{h}</li>
                ))}
              </ul>
            </aside>
            <div className="space-y-12">
              {cs.sections.map((s) => (
                <article key={s.question}>
                  <h2 className="text-h3 font-medium text-ink">{s.question}</h2>
                  <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-ink-2">
                    {s.answer.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper" compact>
        <Container className="grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link href={`/clients/${prev.slug}`} className="group rounded-xl border border-line bg-white p-6 hover:border-accent">
              <p className="font-mono text-[11px] uppercase text-ink-3">{t('prev')}</p>
              <p className="mt-2 flex items-center gap-2 text-[16px] font-semibold text-ink"><ArrowLeft aria-hidden className="h-4 w-4" />{prev.name}</p>
            </Link>
          ) : <span />}
          {next && (
            <Link href={`/clients/${next.slug}`} className="group rounded-xl border border-line bg-white p-6 text-right hover:border-accent">
              <p className="font-mono text-[11px] uppercase text-ink-3">{t('next')}</p>
              <p className="mt-2 flex items-center justify-end gap-2 text-[16px] font-semibold text-ink">{next.name}<ArrowRight aria-hidden className="h-4 w-4" /></p>
            </Link>
          )}
        </Container>
      </Section>

      <CtaBand title={t('cta')} primary={{ label: nav('startFree'), href: brand.demoPage }} secondary={{ label: nav('seeProduct'), href: '/produit' }} />
    </>
  );
}
