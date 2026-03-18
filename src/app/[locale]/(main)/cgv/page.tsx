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

          <p className="text-sm text-zinc-500">{t('lastUpdate')}</p>

          <section className="mt-8">
            <h2>{t('sections.object.title')}</h2>
            <p>{t('sections.object.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.offers.title')}</h2>
            <h3>{t('sections.offers.formulasTitle')}</h3>
            <ul>
              <li>{t('sections.offers.formulaDiscovery')}</li>
              <li>{t('sections.offers.formulaCommunication')}</li>
              <li>{t('sections.offers.formulaConversion')}</li>
              <li>{t('sections.offers.formulaAllInclusive')}</li>
            </ul>
            <h3>{t('sections.offers.commissionTitle')}</h3>
            <p>{t('sections.offers.commissionContent')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.orders.title')}</h2>
            <h3>{t('sections.orders.processTitle')}</h3>
            <p>{t('sections.orders.processContent')}</p>
            <h3>{t('sections.orders.pricingTitle')}</h3>
            <p>{t('sections.orders.pricingContent')}</p>
            <h3>{t('sections.orders.refundTitle')}</h3>
            <p>{t('sections.orders.refundContent')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.duration.title')}</h2>
            <h3>{t('sections.duration.initialTitle')}</h3>
            <p>{t('sections.duration.initialContent')}</p>
            <h3>{t('sections.duration.terminationTitle')}</h3>
            <p>{t('sections.duration.terminationContent')}</p>
            <h3>{t('sections.duration.consequencesTitle')}</h3>
            <p>{t('sections.duration.consequencesContent')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.liability.title')}</h2>
            <h3>{t('sections.liability.obligationTitle')}</h3>
            <p>{t('sections.liability.obligationContent')}</p>
            <h3>{t('sections.liability.limitationsTitle')}</h3>
            <p>{t('sections.liability.limitationsContent')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.revision.title')}</h2>
            <p>{t('sections.revision.content')}</p>
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
