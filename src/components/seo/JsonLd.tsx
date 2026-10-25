import { useTranslations } from 'next-intl';
import type { Article, FaqItem } from '@/types/blog';
import { getDisplayPlans, getPricingPhase, type PricingPhase } from '@/data/pricing';
import { brand } from '@/data/brand';
import { getAuthor } from '@/data/authors';
import { HOME_FAQ_KEYS } from '@/data/home-faq';

const baseUrl = brand.url;
const ORG_ID = `${baseUrl}/#organization`;

interface JsonLdProps {
  locale: string;
}

/**
 * Un abonnement mensuel : le prix récurrent se déclare dans un
 * `UnitPriceSpecification` (unitCode `MON` = par mois), pas sur l'Offer nue.
 */
function buildOffers(locale: string, phase: PricingPhase) {
  return getDisplayPlans(phase).map((plan) => ({
    '@type': 'Offer',
    name: locale === 'fr' ? plan.name.fr : plan.name.en,
    description: locale === 'fr' ? plan.description.fr : plan.description.en,
    url: `${baseUrl}/${locale}/tarifs`,
    price: plan.price,
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    // La grille actuelle expire à la hausse du 1er janvier 2027 ; la suivante n'a pas d'échéance.
    ...(phase === 'announce' ? { priceValidUntil: '2026-12-31' } : {}),
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: plan.price,
      priceCurrency: 'EUR',
      billingDuration: 1,
      billingIncrement: 1,
      unitCode: 'MON',
    },
  }));
}

export function OrganizationJsonLd({ locale = 'fr' }: { locale?: string } = {}) {
  const lang = locale === 'fr' ? 'fr' : 'en';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: brand.name,
    legalName: brand.legalName,
    url: baseUrl,
    logo: brand.logo,
    description: brand.definition[lang],
    slogan: brand.slogan[lang],
    foundingDate: brand.foundingDate,
    foundingLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: brand.foundingCity, addressCountry: brand.country },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: brand.foundingCity,
      addressCountry: brand.country,
    },
    knowsAbout: brand.knowsAbout[lang],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: brand.email,
        availableLanguage: ['French', 'English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: brand.email,
        url: brand.demoUrl,
        availableLanguage: ['French', 'English'],
      },
    ],
    sameAs: [...brand.sameAs],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareApplicationJsonLd({ locale = 'fr' }: { locale?: string } = {}) {
  const phase = getPricingPhase();
  const lang = locale === 'fr' ? 'fr' : 'en';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TriggerFlow',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'CRM',
    operatingSystem: 'Web',
    slogan: brand.slogan[lang],
    description: brand.definition[lang],
    url: baseUrl,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    offers: buildOffers(locale, phase),
    featureList: [...brand.featureList[lang]],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQ de la page d'accueil : lit les mêmes messages que la section FAQ visible, pour que
 * le balisage reflète exactement ce que la page affiche (exigence Google, et un seul
 * endroit à tenir à jour).
 */
export function FAQPageJsonLd() {
  const t = useTranslations('faq.items');
  const faqItems = HOME_FAQ_KEYS.map((key) => ({
    question: t(`${key}.question`),
    answer: t(`${key}.answer`),
  }));

  return <FaqJsonLd items={faqItems} />;
}

/**
 * Balise une liste de questions/réponses en FAQPage.
 *
 * Google a restreint le *rich result* FAQ aux sites institutionnels : n'attends
 * pas d'accordéon dans la SERP. L'intérêt ici est l'AEO — donner aux moteurs
 * génératifs (AI Overviews, ChatGPT, Perplexity) des paires Q/R explicitement
 * délimitées et donc citables, plutôt qu'un mur de texte à découper.
 */
export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Schema Product/Offer de la page tarifs.
 *
 * Le prix public est le différenciateur n°1 de TriggerFlow face à des
 * concurrents en « devis sur demande » : autant le rendre lisible par machine.
 */
export function PricingJsonLd({ locale, phase }: JsonLdProps & { phase: PricingPhase }) {
  const plans = getDisplayPlans(phase);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'TriggerFlow',
    category: locale === 'fr' ? 'CRM hôtelier' : 'Hotel CRM',
    description:
      locale === 'fr'
        ? 'CRM hôtelier et plateforme d\'expérience client : données clients centralisées depuis votre PMS, segmentation, communication multicanale, enquêtes, avis, ventes additionnelles et fidélité.'
        : 'Hotel CRM and guest experience platform: guest data centralized from your PMS, segmentation, multichannel communication, surveys, reviews, upselling and loyalty.',
    url: `${baseUrl}/${locale}/tarifs`,
    brand: {
      '@type': 'Organization',
      name: 'TriggerFlow',
      url: baseUrl,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: String(Math.min(...plans.map((plan) => Number(plan.price)))),
      highPrice: String(Math.max(...plans.map((plan) => Number(plan.price)))),
      offerCount: plans.length,
      offers: buildOffers(locale, phase),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TriggerFlow',
    url: baseUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function HomePageJsonLd({ locale }: JsonLdProps) {
  return (
    <>
      <OrganizationJsonLd locale={locale} />
      <SoftwareApplicationJsonLd locale={locale} />
      <FAQPageJsonLd />
      <WebsiteJsonLd />
    </>
  );
}

interface BlogPostingJsonLdProps {
  article: Article;
  locale: string;
}

export function BlogPostingJsonLd({ article, locale }: BlogPostingJsonLdProps) {
  const url = `${baseUrl}/${locale}/blog/${article.siloSlug}/${article.slug}`;
  const heroImage = article.images.find((img) => img.id === 'hero');
  const author = getAuthor(article.auteur);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.metaDescription,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: article.datePublication,
    dateModified: article.dateMiseAJour,
    wordCount: article.longueurMots,
    articleSection: article.siloNom,
    keywords: [article.motClePrincipal, ...article.motsClesSecondaires].join(', '),
    inLanguage: locale === 'fr' ? 'fr-FR' : 'en-US',
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role[locale === 'fr' ? 'fr' : 'en'],
      worksFor: { '@type': 'Organization', '@id': ORG_ID, name: brand.name },
      ...(author.linkedin ? { sameAs: [author.linkedin] } : {}),
    },
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: brand.name,
      logo: { '@type': 'ImageObject', url: brand.logo },
    },
  };

  if (heroImage) {
    schema.image = {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/blog/${article.slug}/${heroImage.filename}`,
      width: heroImage.width,
      height: heroImage.height,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbListJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbListJsonLd({ items }: BreadcrumbListJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
