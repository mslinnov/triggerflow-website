import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import {
  LegalPageRenderer,
  buildLegalMetadata,
} from '@/components/legal/LegalPageRenderer';
import type { Locale } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildLegalMetadata('contrat-prestation', locale);
}

export default async function ContratPrestationPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPageRenderer slug="contrat-prestation" locale={locale} />;
}
