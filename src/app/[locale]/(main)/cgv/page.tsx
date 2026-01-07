import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container } from '@/components/ui';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPages.terms' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TermsContent />;
}

function TermsContent() {
  const t = useTranslations('legalPages.terms');

  return (
    <main className="bg-white py-24 md:py-32">
      <Container>
        <article className="prose prose-zinc mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">
            {t('title')}
          </h1>

          <p className="lead">{t('lastUpdate')}: 01/01/2024</p>

          <section className="mt-8">
            <h2>{t('sections.object.title')}</h2>
            <p>{t('sections.object.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.services.title')}</h2>
            <p>{t('sections.services.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.pricing.title')}</h2>
            <p>{t('sections.pricing.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.payment.title')}</h2>
            <p>{t('sections.payment.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.duration.title')}</h2>
            <p>{t('sections.duration.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.termination.title')}</h2>
            <p>{t('sections.termination.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.liability.title')}</h2>
            <p>{t('sections.liability.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.jurisdiction.title')}</h2>
            <p>{t('sections.jurisdiction.content')}</p>
          </section>
        </article>
      </Container>
    </main>
  );
}
