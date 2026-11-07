import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeftRight, CalendarClock, Check, Filter, Package, Users } from 'lucide-react';
import { Container, CtaBand, DsButton, Eyebrow, FaqList, FeatureItem, ProductFrame, Section, SectionHeader, TestimonialCard, TrustStrip } from '@/components/ds';
import { FlowTreeScenario } from '@/components/visuals';
import { BreadcrumbListJsonLd, FaqJsonLd } from '@/components/seo';
import { brand } from '@/data/brand';
import { pmsPages } from '@/content/pms';

const baseUrl = 'https://www.trigger-flow.com';
interface Props { params: Promise<{ locale: string; pms: string }> }

export function generateStaticParams() {
  return ['fr', 'en'].flatMap((locale) => Object.keys(pmsPages).map((pms) => ({ locale, pms })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pms } = await params;
  const page = pmsPages[pms];
  if (!page) return {};
  const t = await getTranslations({ locale, namespace: 'pmsPage' });
  const title = t('seoTitle', { pms: page.name });
  const description = t('seoDescription', { pms: page.name });
  return {
    title: { absolute: title },
    description,
    openGraph: { title, description },
    alternates: { canonical: `${baseUrl}/${locale}/integrations/pms/${pms}`, languages: { fr: `${baseUrl}/fr/integrations/pms/${pms}`, en: `${baseUrl}/en/integrations/pms/${pms}`, 'x-default': `${baseUrl}/fr/integrations/pms/${pms}` } },
  };
}

export default async function PmsRoute({ params }: Props) {
  const { locale, pms } = await params;
  setRequestLocale(locale);
  const page = pmsPages[pms];
  if (!page) notFound();
  const lang = locale === 'en' ? 'en' : 'fr';
  const t = await getTranslations({ locale, namespace: 'pmsPage' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const v = { pms: page.name };
  const faq = [1, 2, 3].map((i) => ({ question: t(`faq.q${i}`, v), answer: t(page.twoWay && i === 2 ? 'faq.a2TwoWay' : `faq.a${i}`, v) }));
  const uses = [
    { icon: CalendarClock, key: 'u1' },
    { icon: Filter, key: 'u2' },
    { icon: Package, key: 'u3' },
    { icon: Users, key: 'u4' },
  ] as const;

  return (
    <>
      <BreadcrumbListJsonLd items={[{ name: 'TriggerFlow', url: `${baseUrl}/${locale}` }, { name: nav('integrations'), url: `${baseUrl}/${locale}/integrations` }, { name: page.name, url: `${baseUrl}/${locale}/integrations/pms/${pms}` }]} />
      <FaqJsonLd items={faq} />
      <section className="bg-white pb-16 pt-14 md:pb-24 md:pt-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-40 items-center justify-center rounded-xl border border-line bg-white p-3">
              <Image src={page.logo} alt={page.name} width={140} height={48} className="max-h-10 w-auto object-contain" />
            </div>
            <Eyebrow className="mt-6">{t('eyebrow')}</Eyebrow>
            <h1 className="mt-4 text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.25rem]">{t('title', v)}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{t(page.twoWay ? 'subtitleTwoWay' : 'subtitle', v)}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <DsButton href={brand.demoUrl} arrow>{nav('startFree')}</DsButton>
              <DsButton href="/integrations" variant="secondary">{t('allIntegrations')}</DsButton>
            </div>
            <TrustStrip className="mt-7" />
          </div>
          <ProductFrame className="mx-auto mt-14 max-w-[760px]" label="app.trigger-flow.com/flows">
            <div className="bg-[radial-gradient(#E4E8E7_1px,transparent_1px)] [background-size:16px_16px]"><FlowTreeScenario /></div>
          </ProductFrame>
        </Container>
      </section>

      {page.clients.length > 0 && (
        <section className="border-y border-line bg-white py-10">
          <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <span className="font-mono text-eyebrow uppercase text-ink-3">{t('usedBy', v)}</span>
            {page.clients.map((c) => <span key={c} className="text-[15px] font-semibold text-ink/70">{c}</span>)}
          </Container>
        </section>
      )}

      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow={t('usesEyebrow')} title={t('usesTitle', v)} align="left" />
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {uses.map((u) => <FeatureItem key={u.key} icon={u.icon} title={t(`${u.key}.title`)}>{t(`${u.key}.text`, v)}</FeatureItem>)}
          </div>
          {page.twoWay && (
            <p className="mt-10 flex items-center gap-2 text-[15px] text-ink"><ArrowLeftRight className="h-4 w-4 text-accent" />{t('twoWay', v)}</p>
          )}
        </Container>
      </Section>

      {page.quote && (
        <Section tone="white" compact>
          <Container className="max-w-3xl">
            <TestimonialCard quote={page.quote.text[lang]} name={page.quote.name} role={page.quote.role[lang]} company={page.quote.company} />
          </Container>
        </Section>
      )}

      <Section tone="white">
        <Container narrow>
          <SectionHeader eyebrow="FAQ" title={t('faqTitle', v)} align="left" />
          <div className="mt-10"><FaqList items={faq} /></div>
          <ul className="mt-10 space-y-2 text-[15px] text-ink-2">
            {[t('points.p1'), t('points.p2'), t('points.p3')].map((p) => <li key={p} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-accent" />{p}</li>)}
          </ul>
        </Container>
      </Section>

      <CtaBand title={t('cta', v)} primary={{ label: nav('startFree'), href: brand.demoUrl }} secondary={{ label: t('allIntegrations'), href: '/integrations' }} />
    </>
  );
}
