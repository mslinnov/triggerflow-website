import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { AboutContent } from './AboutContent';
import { pageAlternates } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('meta.title'),
    alternates: pageAlternates(locale, '/entreprise/a-propos'),
    description: t('meta.description'),
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}
