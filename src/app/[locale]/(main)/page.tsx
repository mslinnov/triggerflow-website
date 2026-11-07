import { Metadata } from 'next';
import { brand } from '@/data/brand';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HomeHero, HomeProof, HomeResults, HomeProduct, HomeReliability, HomeTestimonials, HomeSecurity, HomePricing } from '@/components/home';
import { Container, CtaBand, FaqList, Section, SectionHeader } from '@/components/ds';
import { HOME_FAQ_KEYS } from '@/data/home-faq';
import { HomePageJsonLd } from '@/components/seo';
import { getDisplayPlans, getPricingPhase } from '@/data/pricing';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

const baseUrl = 'https://www.trigger-flow.com';

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: 'TriggerFlow | CRM hôtelier & automatisation relation client',
    en: 'TriggerFlow | Hotel CRM & Guest Relationship Automation',
  };

  const descriptions: Record<string, string> = {
    fr: `CRM hôtelier avec marketing automation et workflows : emails, SMS, WhatsApp automatisés, programme fidélité et avis Google. Connecté nativement à ${brand.pms.length} PMS. Hébergé en France.`,
    en: `Hotel CRM with marketing automation and workflows: automated emails, SMS, WhatsApp, loyalty program and Google reviews. Natively connected to ${brand.pms.length} PMS. Hosted in France.`,
  };

  return {
    // Le titre contient déjà la marque → `absolute` pour éviter le doublon « … | TriggerFlow | TriggerFlow ».
    title: { absolute: titles[locale] ?? titles.fr },
    description: descriptions[locale] ?? descriptions.fr,
    openGraph: {
      title: titles[locale] ?? titles.fr,
      description: descriptions[locale] ?? descriptions.fr,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        fr: `${baseUrl}/fr`,
        en: `${baseUrl}/en`,
        'x-default': `${baseUrl}/fr`,
      },
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home2.cta' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const faq = await getTranslations({ locale, namespace: 'faq' });
  const faqItems = HOME_FAQ_KEYS.map((key) => ({ question: faq(`items.${key}.question`), answer: faq(`items.${key}.answer`) }));

  return (
    <>
      <HomePageJsonLd locale={locale} />
      <HomeHero />
      <HomeProof />
      <HomeResults />
      <HomeProduct />
      <HomeReliability />
      <HomeTestimonials />
      <HomeSecurity />
      <HomePricing plans={getDisplayPlans(getPricingPhase())} />
      <Section tone="white">
        <Container narrow>
          <SectionHeader title={faq('title')} align="left" />
          <div className="mt-10">
            <FaqList items={faqItems} />
          </div>
        </Container>
      </Section>
      <CtaBand
        title={t('title')}
        text={t('text')}
        primary={{ label: nav('startFree'), href: brand.demoUrl }}
        secondary={{ label: nav('seeProduct'), href: '#produit' }}
      />
    </>
  );
}
