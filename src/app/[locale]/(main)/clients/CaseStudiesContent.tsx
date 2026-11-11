import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, MapPin } from 'lucide-react';
import { Container, CtaBand, Eyebrow, LogoWall, Section, SectionHeader, TestimonialCard } from '@/components/ds';
import { Link } from '@/i18n/navigation';
import { brand } from '@/data/brand';
import { clientLogos, homeClients } from '@/data/clients';
import { caseStudies, localizeCaseStudy } from '@/lib/case-studies';

interface Voice {
  quote: string;
  name: string;
  role: string;
  company: string;
}

/** Page Clients : cas clients documentés + témoignages publiés (docs/preuves.md). */
export default async function CaseStudiesContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'clientsPage' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const voices = t.raw('voices') as Voice[];
  return (
    <>
      <section className="bg-white pb-14 pt-14 md:pb-20 md:pt-20">
        <Container className="text-center">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.5rem]">{t('title')}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-lead">{t('subtitle')}</p>
        </Container>
      </section>

      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow={t('casesEyebrow')} title={t('casesTitle')} align="left" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {caseStudies.map((c) => localizeCaseStudy(c, locale)).map((cs) => (
              <Link key={cs.slug} href={`/clients/${cs.slug}`} className="group overflow-hidden rounded-xl border border-line bg-white transition-colors hover:border-accent">
                <div className="relative aspect-[16/9] overflow-hidden bg-paper">
                  <Image src={cs.image} alt={cs.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                </div>
                <div className="p-7">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">
                    <span className="inline-flex items-center gap-1"><MapPin aria-hidden className="h-3.5 w-3.5" />{cs.location}</span>
                    <span>{cs.pms}</span>
                  </div>
                  <h2 className="mt-3 text-h3 font-medium text-ink">{cs.name}</h2>
                  <p className="mt-1 text-[14px] text-ink-3">{cs.type}</p>
                  <p className="mt-5 text-[16px] leading-relaxed text-ink"><q>{cs.quote}</q></p>
                  <p className="mt-5 text-[14px] text-ink-2">{cs.contactName}, {cs.contactRole}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">
                    {t('read')}<ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={t('voicesEyebrow')} title={t('voicesTitle')} align="left" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {voices.map((v) => (
              <TestimonialCard key={v.name} {...v} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="paper" compact>
        <Container>
          <p className="text-center font-mono text-eyebrow font-medium uppercase text-ink-3">{t('logos')}</p>
          <LogoWall names={homeClients} logos={clientLogos} className="mt-8" />
        </Container>
      </Section>

      <CtaBand title={t('cta')} primary={{ label: nav('startFree'), href: brand.demoPage }} secondary={{ label: nav('seeProduct'), href: '/produit' }} />
    </>
  );
}
