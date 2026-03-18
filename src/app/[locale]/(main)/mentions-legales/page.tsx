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

          <p className="text-sm text-zinc-500">{t('lastUpdate')}</p>

          <section className="mt-8">
            <h2>{t('sections.editor.title')}</h2>
            <p>{t('sections.editor.intro')}</p>
            <p className="text-lg font-semibold">{t('sections.editor.companyName')}</p>
            <ul>
              <li><strong>{t('sections.editor.legalForm')} :</strong> {t('sections.editor.legalFormValue')}</li>
              <li><strong>{t('sections.editor.capital')} :</strong> {t('sections.editor.capitalValue')}</li>
              <li><strong>{t('sections.editor.address')} :</strong> {t('sections.editor.addressValue')}</li>
              <li><strong>{t('sections.editor.rcs')} :</strong> {t('sections.editor.rcsValue')}</li>
              <li><strong>{t('sections.editor.vat')} :</strong> {t('sections.editor.vatValue')}</li>
              <li><strong>{t('sections.editor.email')} :</strong> {t('sections.editor.emailValue')}</li>
              <li><strong>{t('sections.editor.phone')} :</strong> {t('sections.editor.phoneValue')}</li>
              <li><strong>{t('sections.editor.director')} :</strong> {t('sections.editor.directorValue')}</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2>{t('sections.hosting.title')}</h2>
            <p>{t('sections.hosting.intro')}</p>
            <p className="text-lg font-semibold">{t('sections.hosting.providerName')}</p>
            <ul>
              <li><strong>{t('sections.hosting.address')} :</strong> {t('sections.hosting.addressValue')}</li>
              <li><strong>{t('sections.hosting.website')} :</strong> {t('sections.hosting.websiteValue')}</li>
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
            <h2>{t('sections.responsibility.title')}</h2>
            <p>{t('sections.responsibility.content')}</p>
          </section>

          <section className="mt-8">
            <h2>{t('sections.links.title')}</h2>
            <p>{t('sections.links.content')}</p>
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
