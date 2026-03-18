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

          <p className="text-sm text-zinc-500">{t('lastUpdate')}</p>

          {/* 1. Responsable de traitement */}
          <section className="mt-8">
            <h2>{t('sections.controller.title')}</h2>
            <ul>
              <li><strong>{t('sections.controller.company')} :</strong> {t('sections.controller.companyValue')}</li>
              <li><strong>{t('sections.controller.rcs')} :</strong> {t('sections.controller.rcsValue')}</li>
              <li><strong>{t('sections.controller.address')} :</strong> {t('sections.controller.addressValue')}</li>
              <li><strong>{t('sections.controller.representative')} :</strong> {t('sections.controller.representativeValue')}</li>
              <li><strong>{t('sections.controller.dpo')} :</strong> {t('sections.controller.dpoValue')}</li>
            </ul>
          </section>

          {/* 2. Données collectées */}
          <section className="mt-8">
            <h2>{t('sections.dataCollected.title')}</h2>
            <h3>{t('sections.dataCollected.platformTitle')}</h3>
            <p>{t('sections.dataCollected.platformContent')}</p>
            <h3>{t('sections.dataCollected.usageTitle')}</h3>
            <p>{t('sections.dataCollected.usageContent')}</p>
          </section>

          {/* 3. Finalités */}
          <section className="mt-8">
            <h2>{t('sections.purposes.title')}</h2>
            <ol>
              <li>{t('sections.purposes.item1')}</li>
              <li>{t('sections.purposes.item2')}</li>
              <li>{t('sections.purposes.item3')}</li>
              <li>{t('sections.purposes.item4')}</li>
              <li>{t('sections.purposes.item5')}</li>
            </ol>
          </section>

          {/* 4. Base légale */}
          <section className="mt-8">
            <h2>{t('sections.legalBasis.title')}</h2>
            <ul>
              <li>{t('sections.legalBasis.item1')}</li>
              <li>{t('sections.legalBasis.item2')}</li>
              <li>{t('sections.legalBasis.item3')}</li>
            </ul>
          </section>

          {/* 5. Destinataires */}
          <section className="mt-8">
            <h2>{t('sections.recipients.title')}</h2>
            <h3>{t('sections.recipients.subprocessorsTitle')}</h3>
            <ul>
              <li><strong>{t('sections.recipients.hosting')}</strong></li>
              <li><strong>{t('sections.recipients.emails')}</strong></li>
              <li><strong>{t('sections.recipients.sms')}</strong></li>
              <li><strong>{t('sections.recipients.payment')}</strong></li>
              <li><strong>{t('sections.recipients.analytics')}</strong></li>
            </ul>
            <h3>{t('sections.recipients.transfersTitle')}</h3>
            <p>{t('sections.recipients.transfersContent')}</p>
          </section>

          {/* 6. Durée de conservation */}
          <section className="mt-8">
            <h2>{t('sections.retention.title')}</h2>
            <ul>
              <li><strong>{t('sections.retention.account')}</strong></li>
              <li><strong>{t('sections.retention.billing')}</strong></li>
              <li><strong>{t('sections.retention.analyticsData')}</strong></li>
            </ul>
          </section>

          {/* 7. Droits des utilisateurs */}
          <section className="mt-8">
            <h2>{t('sections.rights.title')}</h2>
            <p>{t('sections.rights.intro')}</p>
            <ol>
              <li>{t('sections.rights.item1')}</li>
              <li>{t('sections.rights.item2')}</li>
              <li>{t('sections.rights.item3')}</li>
              <li>{t('sections.rights.item4')}</li>
              <li>{t('sections.rights.item5')}</li>
              <li>{t('sections.rights.item6')}</li>
              <li>{t('sections.rights.item7')}</li>
            </ol>
            <p className="font-semibold">{t('sections.rights.contactTitle')}</p>
            <ul>
              <li>{t('sections.rights.contactEmail')}</li>
              <li>{t('sections.rights.contactAddress')}</li>
            </ul>
            <p>{t('sections.rights.responseTime')}</p>
            <p>{t('sections.rights.recourse')}</p>
          </section>

          {/* 8. Sécurité */}
          <section className="mt-8">
            <h2>{t('sections.security.title')}</h2>
            <ul>
              <li>{t('sections.security.item1')}</li>
              <li>{t('sections.security.item2')}</li>
              <li>{t('sections.security.item3')}</li>
              <li>{t('sections.security.item4')}</li>
              <li>{t('sections.security.item5')}</li>
            </ul>
          </section>

          {/* 9. Cookies */}
          <section className="mt-8">
            <h2>{t('sections.cookies.title')}</h2>
            <p>{t('sections.cookies.intro')}</p>
            <ul>
              <li>{t('sections.cookies.item1')}</li>
              <li>{t('sections.cookies.item2')}</li>
              <li>{t('sections.cookies.item3')}</li>
            </ul>
            <p>{t('sections.cookies.consent')}</p>
          </section>

          {/* 10. B2B / Mineurs */}
          <section className="mt-8">
            <h2>{t('sections.b2b.title')}</h2>
            <p>{t('sections.b2b.content')}</p>
          </section>

          {/* 11. Mises à jour */}
          <section className="mt-8">
            <h2>{t('sections.updates.title')}</h2>
            <p>{t('sections.updates.content')}</p>
          </section>

          {/* 12. Contact */}
          <section className="mt-8">
            <h2>{t('sections.contact.title')}</h2>
            <p>{t('sections.contact.email')}</p>
            <p>{t('sections.contact.address')}</p>
          </section>
        </article>
      </Container>
    </main>
  );
}
