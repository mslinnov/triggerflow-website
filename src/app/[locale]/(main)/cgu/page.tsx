import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container } from '@/components/ui';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPages.termsOfUse' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function TermsOfUsePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TermsOfUseContent />;
}

function TermsOfUseContent() {
  const t = useTranslations('legalPages.termsOfUse');

  return (
    <main className="bg-white py-24 md:py-32">
      <Container>
        <article className="prose prose-zinc mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">
            {t('title')}
          </h1>

          <p className="lead">{t('lastUpdate')}: 01/01/2024</p>

          <section className="mt-8">
            <h2>{t('sections.acceptance.title')}</h2>
            <p>{t('sections.acceptance.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.access.title')}</h2>
            <p>{t('sections.access.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.account.title')}</h2>
            <p>{t('sections.account.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.usage.title')}</h2>
            <p>{t('sections.usage.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.prohibited.title')}</h2>
            <p>{t('sections.prohibited.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.intellectual.title')}</h2>
            <p>{t('sections.intellectual.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.modifications.title')}</h2>
            <p>{t('sections.modifications.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.contact.title')}</h2>
            <p>{t('sections.contact.content')}</p>
          </section>
        </article>
      </Container>
    </main>
  );
}
