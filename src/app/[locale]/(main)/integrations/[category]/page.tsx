import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, CircleCheck, Info } from 'lucide-react';
import { Container, CtaBand, DsButton, Eyebrow, FeatureItem, Section, SectionHeader, TrustStrip } from '@/components/ds';
import { BreadcrumbListJsonLd } from '@/components/seo';
import { Link } from '@/i18n/navigation';
import { brand } from '@/data/brand';
import { integrationCategoryPages } from '@/content/integration-categories';
import { integrationCategories } from '../IntegrationsContent';

const baseUrl = 'https://www.trigger-flow.com';
interface Props { params: Promise<{ locale: string; category: string }> }


/** Toute adresse hors generateStaticParams renvoie une vraie 404 (pas de soft 404). */
export const dynamicParams = false;

export function generateStaticParams() {
  return ['fr', 'en'].flatMap((locale) => Object.keys(integrationCategoryPages).map((category) => ({ locale, category })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  const page = integrationCategoryPages[category];
  if (!page) return {};
  const lang = locale === 'en' ? 'en' : 'fr';
  const t = await getTranslations({ locale, namespace: 'integrations' });
  const title = `${t(`categories.${page.key}.title`)} | TriggerFlow`;
  return {
    title: { absolute: title },
    description: page.subtitle[lang],
    openGraph: { title, description: page.subtitle[lang] },
    alternates: { canonical: `${baseUrl}/${locale}/integrations/${category}`, languages: { fr: `${baseUrl}/fr/integrations/${category}`, en: `${baseUrl}/en/integrations/${category}`, 'x-default': `${baseUrl}/fr/integrations/${category}` } },
  };
}

export default async function IntegrationCategoryRoute({ params }: Props) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const page = integrationCategoryPages[category];
  const data = page && integrationCategories.find((c) => c.key === page.key);
  if (!page || !data) notFound();
  const lang = locale === 'en' ? 'en' : 'fr';
  const t = await getTranslations({ locale, namespace: 'integrations' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const label = t(`categories.${page.key}.title`);
  const others = Object.values(integrationCategoryPages).filter((p) => p.slug !== page.slug);

  return (
    <>
      <BreadcrumbListJsonLd items={[{ name: 'TriggerFlow', url: `${baseUrl}/${locale}` }, { name: nav('integrations'), url: `${baseUrl}/${locale}/integrations` }, { name: label, url: `${baseUrl}/${locale}/integrations/${category}` }]} />
      <section className="bg-white pb-14 pt-14 md:pb-20 md:pt-20">
        <Container className="text-center">
          <Eyebrow>{label}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.25rem]">{page.title[lang]}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{page.subtitle[lang]}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <DsButton href={brand.demoUrl} arrow>{nav('startFree')}</DsButton>
            <DsButton href={`/produit/${page.product.slug}`} variant="secondary">{page.product.label[lang]}</DsButton>
          </div>
          <TrustStrip className="mt-7" />
          <ul className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3">
            {data.integrations.map((i) => {
              const name = t(`categories.${page.key}.integrations.${i.key}.name`);
              return (
                <li key={i.key} className="rounded-xl border border-line bg-white p-5 text-left">
                  <div className="flex h-10 items-center"><Image src={i.logo} alt={name} width={120} height={40} className="max-h-9 w-auto object-contain" /></div>
                  <p className="mt-3 text-[14px] font-semibold text-ink">{name}</p>
                  <p className="mt-0.5 text-[12.5px] text-ink-3">{t(`categories.${page.key}.integrations.${i.key}.description`)}</p>
                </li>
              );
            })}
          </ul>
          {page.note && <p className="mt-6 inline-flex items-center gap-2 text-[14px] text-ink-2"><Info aria-hidden className="h-4 w-4 text-accent" />{page.note[lang]}</p>}
        </Container>
      </section>

      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow={t('categoryPage.usesEyebrow')} title={t('categoryPage.usesTitle')} align="left" />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {page.uses.map((u) => <FeatureItem key={u.title.fr} icon={CircleCheck} title={u.title[lang]}>{u.text[lang]}</FeatureItem>)}
          </div>
          <Link href={`/produit/${page.product.slug}`} className="mt-10 inline-flex items-center gap-1.5 text-[15px] font-medium text-accent hover:text-accent-hover">
            {page.product.label[lang]} <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </Container>
      </Section>

      <Section tone="white" compact>
        <Container>
          <p className="font-mono text-eyebrow uppercase text-ink-3">{t('categoryPage.others')}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/integrations#pms" className="rounded-full border border-line px-4 py-2 text-[14px] text-ink-2 hover:border-accent hover:text-ink">{t('categories.pms.title')}</Link>
            {others.map((o) => (
              <Link key={o.slug} href={`/integrations/${o.slug}`} className="rounded-full border border-line px-4 py-2 text-[14px] text-ink-2 hover:border-accent hover:text-ink">{t(`categories.${o.key}.title`)}</Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title={t('cta.title')} primary={{ label: nav('startFree'), href: brand.demoUrl }} secondary={{ label: t('allIntegrations'), href: '/integrations' }} />
    </>
  );
}
