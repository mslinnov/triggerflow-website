import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { solutionSlugs, getSolutionSerializable } from '@/data/solutions';
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
  const t = await getTranslations({ locale, namespace: 'solutionPage' });

  const solutionData = getSolutionSerializable(slug);
  if (!solutionData) {
    return {
      title: 'Solution non trouvée | TriggerFlow',
    };
  }

  const title = `TriggerFlow pour ${solutionData.title}`;
  const description = solutionData.description;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | TriggerFlow`,
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
          { name: solutionData.title, url: `${baseUrl}/${locale}/solutions/${slug}` },
        ]}
      />
      <SolutionLanding slug={slug} locale={locale} />
    </>
  );
}
