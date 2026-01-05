import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container } from '@/components/ui';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPages.legalNotice' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function LegalNoticePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LegalNoticeContent />;
}

function LegalNoticeContent() {
  const t = useTranslations('legalPages.legalNotice');

  return (
    <main className="bg-white py-24 md:py-32">
      <Container>
        <article className="prose prose-zinc mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">
            {t('title')}
          </h1>

          <section className="mt-8">
            <h2>{t('sections.editor.title')}</h2>
            <p>{t('sections.editor.content')}</p>
            <ul>
              <li><strong>{t('sections.editor.company')}</strong> TriggerFlow SAS</li>
              <li><strong>{t('sections.editor.address')}</strong> 123 Rue de l'Innovation, 75001 Paris, France</li>
              <li><strong>{t('sections.editor.capital')}</strong> 10 000 €</li>
              <li><strong>{t('sections.editor.rcs')}</strong> Paris B 123 456 789</li>
              <li><strong>{t('sections.editor.vat')}</strong> FR 12 345678901</li>
              <li><strong>{t('sections.editor.director')}</strong> [Nom du Directeur]</li>
              <li><strong>{t('sections.editor.email')}</strong> contact@trigger-flow.com</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2>{t('sections.hosting.title')}</h2>
            <p>{t('sections.hosting.content')}</p>
            <ul>
              <li><strong>{t('sections.hosting.provider')}</strong> Vercel Inc.</li>
              <li><strong>{t('sections.hosting.address')}</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2>{t('sections.intellectual.title')}</h2>
            <p>{t('sections.intellectual.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.data.title')}</h2>
            <p>{t('sections.data.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.cookies.title')}</h2>
            <p>{t('sections.cookies.content')}</p>
          </section>
        </article>
      </Container>
    </main>
  );
}
