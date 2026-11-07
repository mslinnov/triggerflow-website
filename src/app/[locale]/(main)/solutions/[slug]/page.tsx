import { clampDescription } from '@/lib/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { solutionSlugs, getSolutionSerializable, solutions } from '@/data/solutions';
import { localizeSolution } from '@/data/solutions-en';
import { BreadcrumbListJsonLd } from '@/components/seo';
import { SolutionLanding } from '@/components/solutions/SolutionLanding';

const baseUrl = 'https://www.trigger-flow.com';

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}


/** Toute adresse hors generateStaticParams renvoie une vraie 404 (pas de soft 404). */
export const dynamicParams = false;

export async function generateStaticParams() {
  const locales = ['fr', 'en'];
  const params = [];

  for (const locale of locales) {
    // Les solutions « objectif » sont redirigées vers les landings produit (next.config.ts).
    for (const slug of solutionSlugs.filter((x) => !['booster-upsell', 'automatiser-communication', 'augmenter-avis', 'fideliser-clients'].includes(x))) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!solutions[slug]) return {};
  const solutionData = localizeSolution(solutions[slug], locale);
  const name = solutionData.title.charAt(0).toLowerCase() + solutionData.title.slice(1);
  const title = locale === 'en' ? `Hotel CRM for ${name} | TriggerFlow` : `CRM pour ${name} | TriggerFlow`;
  const description = clampDescription(solutionData.description);

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/solutions/${slug}`,
      languages: {
        fr: `${baseUrl}/fr/solutions/${slug}`,
        en: `${baseUrl}/en/solutions/${slug}`,
        'x-default': `${baseUrl}/fr/solutions/${slug}`,
      },
    },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const solutionData = getSolutionSerializable(slug);

  if (!solutionData) {
    notFound();
  }

  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { name: 'TriggerFlow', url: `${baseUrl}/${locale}` },
          { name: 'Solutions', url: `${baseUrl}/${locale}/solutions` },
          { name: localizeSolution(solutions[slug], locale).title, url: `${baseUrl}/${locale}/solutions/${slug}` },
        ]}
      />
      <SolutionLanding slug={slug} locale={locale} />
    </>
  );
}
