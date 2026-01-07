import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { moduleSlugs, getModuleSerializable } from '@/data/modules';
import ModulePageContent from './ModulePageContent';

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

  const title = `${moduleData.title} - ${t('meta.titleSuffix')}`;
  const description = moduleData.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
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

  return <ModulePageContent moduleSlug={slug} />;
}
