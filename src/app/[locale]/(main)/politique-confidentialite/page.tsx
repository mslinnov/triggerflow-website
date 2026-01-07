import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container } from '@/components/ui';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPages.privacy' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyPolicyContent />;
}

function PrivacyPolicyContent() {
  const t = useTranslations('legalPages.privacy');

  return (
    <main className="bg-white py-24 md:py-32">
      <Container>
        <article className="prose prose-zinc mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">
            {t('title')}
          </h1>

          <p className="lead">{t('lastUpdate')}: 01/01/2024</p>

          <section className="mt-8">
            <h2>{t('sections.introduction.title')}</h2>
            <p>{t('sections.introduction.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.dataCollected.title')}</h2>
            <p>{t('sections.dataCollected.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.purpose.title')}</h2>
            <p>{t('sections.purpose.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.legalBasis.title')}</h2>
            <p>{t('sections.legalBasis.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.retention.title')}</h2>
            <p>{t('sections.retention.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.sharing.title')}</h2>
            <p>{t('sections.sharing.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.rights.title')}</h2>
            <p>{t('sections.rights.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.cookies.title')}</h2>
            <p>{t('sections.cookies.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.security.title')}</h2>
            <p>{t('sections.security.content')}</p>
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
