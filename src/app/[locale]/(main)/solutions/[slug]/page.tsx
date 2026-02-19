import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { solutionSlugs, getSolutionSerializable } from '@/data/solutions';
import { BreadcrumbListJsonLd } from '@/components/seo';
import SolutionPageContent from './SolutionPageContent';

const baseUrl = 'https://www.trigger-flow.com';

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const locales = ['fr', 'en'];
  const params = [];

  for (const locale of locales) {
    for (const slug of solutionSlugs) {
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
        'fr-FR': `${baseUrl}/fr/solutions/${slug}`,
        'en-US': `${baseUrl}/en/solutions/${slug}`,
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
          { name: 'Solutions', url: `${baseUrl}/${locale}` },
          { name: solutionData.title, url: `${baseUrl}/${locale}/solutions/${slug}` },
        ]}
      />
      <SolutionPageContent solutionSlug={slug} />
    </>
  );
}
