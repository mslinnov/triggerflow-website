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

          <p className="text-sm text-zinc-500">{t('lastUpdate')}</p>

          <section className="mt-8">
            <h2>{t('sections.object.title')}</h2>
            <p>{t('sections.object.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.services.title')}</h2>
            <h3>{t('sections.services.descriptionTitle')}</h3>
            <p>{t('sections.services.descriptionContent')}</p>
            <h3>{t('sections.services.modificationTitle')}</h3>
            <p>{t('sections.services.modificationContent')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.account.title')}</h2>
            <h3>{t('sections.account.registrationTitle')}</h3>
            <p>{t('sections.account.registrationContent')}</p>
            <h3>{t('sections.account.complianceTitle')}</h3>
            <p>{t('sections.account.complianceContent')}</p>
            <h3>{t('sections.account.betaTitle')}</h3>
            <p>{t('sections.account.betaContent')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.intellectual.title')}</h2>
            <p>{t('sections.intellectual.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.data.title')}</h2>
            <h3>{t('sections.data.controllerTitle')}</h3>
            <p>{t('sections.data.controllerContent')}</p>
            <h3>{t('sections.data.securityTitle')}</h3>
            <p>{t('sections.data.securityContent')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.liability.title')}</h2>
            <h3>{t('sections.liability.availabilityTitle')}</h3>
            <p>{t('sections.liability.availabilityContent')}</p>
            <h3>{t('sections.liability.warrantiesTitle')}</h3>
            <p>{t('sections.liability.warrantiesContent')}</p>
            <h3>{t('sections.liability.indemnificationTitle')}</h3>
            <p>{t('sections.liability.indemnificationContent')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.modifications.title')}</h2>
            <p>{t('sections.modifications.content')}</p>
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
