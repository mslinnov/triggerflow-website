import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { moduleSlugs, getModuleSerializable } from '@/data/modules';
import { BreadcrumbListJsonLd } from '@/components/seo';
import ModulePageContent from './ModulePageContent';

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
    for (const slug of moduleSlugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'modulePage' });

  const moduleData = getModuleSerializable(slug);
  if (!moduleData) {
    return {
      title: 'Module non trouvé | TriggerFlow',
    };
  }

  const title = moduleData.seoTitle;
  const description = moduleData.description;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | TriggerFlow`,
      description,
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/produit/${slug}`,
      languages: {
        fr: `${baseUrl}/fr/produit/${slug}`,
        en: `${baseUrl}/en/produit/${slug}`,
        'x-default': `${baseUrl}/fr/produit/${slug}`,
      },
    },
  };
}

export default async function ModulePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const moduleData = getModuleSerializable(slug);

  if (!moduleData) {
    notFound();
  }

  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { name: 'TriggerFlow', url: `${baseUrl}/${locale}` },
          { name: locale === 'fr' ? 'Produit' : 'Product', url: `${baseUrl}/${locale}/produit` },
          { name: moduleData.title, url: `${baseUrl}/${locale}/produit/${slug}` },
        ]}
      />
      <ModulePageContent moduleSlug={slug} />
    </>
  );
}
