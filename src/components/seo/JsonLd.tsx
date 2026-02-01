import { useTranslations } from 'next-intl';
import type { Article } from '@/types/blog';

const baseUrl = 'https://www.trigger-flow.com';

interface JsonLdProps {
  locale: string;
}

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TriggerFlow',
    alternateName: 'TriggerFlow by Utelys',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      'TriggerFlow est la solution SaaS leader pour l\'automatisation de la relation client dans l\'hôtellerie.',
    foundingDate: '2020',
    founders: [
      {
        '@type': 'Organization',
        name: 'Utelys',
        url: 'https://www.utelys.fr',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressCountry: 'FR',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'contact@trigger-flow.com',
        availableLanguage: ['French', 'English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'contact@trigger-flow.com',
        url: 'https://app.lemcal.com/@trigger-flow/demo',
        availableLanguage: ['French', 'English'],
      },
    ],
    sameAs: ['https://www.linkedin.com/company/triggerflow/'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareApplicationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TriggerFlow',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'CRM',
    operatingSystem: 'Web',
    description:
      'Solution SaaS pour automatiser SMS, emails et fidélisation client dans l\'hôtellerie. Synchronisation PMS, enquêtes satisfaction, upselling.',
    url: baseUrl,
    author: {
      '@type': 'Organization',
      name: 'TriggerFlow',
      url: baseUrl,
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Découverte',
        description: 'Pour tester la solution',
        price: '0',
        priceCurrency: 'EUR',
        priceValidUntil: '2025-12-31',
      },
      {
        '@type': 'Offer',
        name: 'Communication',
        description: 'Pour automatiser vos communications',
        price: '99',
        priceCurrency: 'EUR',
        priceValidUntil: '2025-12-31',
        billingIncrement: 'P1M',
      },
      {
        '@type': 'Offer',
        name: 'Conversion',
        description: 'Pour booster vos ventes',
        price: '199',
        priceCurrency: 'EUR',
        priceValidUntil: '2025-12-31',
        billingIncrement: 'P1M',
      },
      {
        '@type': 'Offer',
        name: 'Marketing+',
        description: 'Pour les hôtels ambitieux',
        price: '349',
        priceCurrency: 'EUR',
        priceValidUntil: '2025-12-31',
        billingIncrement: 'P1M',
      },
    ],
    featureList: [
      'Synchronisation PMS',
      'SMS & Emails automatisés',
      'Enquêtes de satisfaction',
      'Ventes additionnelles',
      'Tableaux de bord analytiques',
      'Templates personnalisables',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQPageJsonLd({ locale }: JsonLdProps) {
  const faqItems =
    locale === 'fr'
      ? [
          {
            question: 'Combien de temps prend la mise en place ?',
            answer:
              'La mise en place est rapide et simple. En moyenne, nos clients sont opérationnels en moins de 48h. Notre équipe vous accompagne à chaque étape pour configurer vos premières automatisations.',
          },
          {
            question: 'TriggerFlow est-il compatible avec mon PMS ?',
            answer:
              'Nous sommes compatibles avec les principaux PMS du marché : Mews, Opera, Protel, Clock, Misterbooking, Asterio et bien d\'autres. Si votre PMS n\'est pas dans la liste, contactez-nous pour vérifier la compatibilité.',
          },
          {
            question: 'Puis-je personnaliser les messages envoyés ?',
            answer:
              'Absolument ! Tous les messages sont entièrement personnalisables. Vous pouvez utiliser des variables dynamiques (nom du client, dates de séjour, numéro de chambre...) et adapter le ton à votre établissement.',
          },
          {
            question: 'Quelles actions marketing puis-je automatiser ?',
            answer:
              'TriggerFlow permet d\'automatiser de nombreuses actions : SMS/emails de bienvenue, enquêtes satisfaction, offres de services additionnels, programmes de fidélité, relances post-séjour et bien plus encore.',
          },
        ]
      : [
          {
            question: 'How long does the setup take?',
            answer:
              'Setup is quick and simple. On average, our customers are operational in less than 48 hours. Our team supports you every step of the way to configure your first automations.',
          },
          {
            question: 'Is TriggerFlow compatible with my PMS?',
            answer:
              'We are compatible with major PMS on the market: Mews, Opera, Protel, Clock, Misterbooking, Asterio and many more. If your PMS is not on the list, contact us to check compatibility.',
          },
          {
            question: 'Can I customize the messages sent?',
            answer:
              'Absolutely! All messages are fully customizable. You can use dynamic variables (guest name, stay dates, room number...) and adapt the tone to your property.',
          },
          {
            question: 'What marketing actions can I automate?',
            answer:
              'TriggerFlow allows you to automate many actions: welcome SMS/emails, satisfaction surveys, additional services offers, loyalty programs, post-stay follow-ups and much more.',
          },
        ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
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

export function WebsiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TriggerFlow',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
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
      <OrganizationJsonLd />
      <SoftwareApplicationJsonLd />
      <FAQPageJsonLd locale={locale} />
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
      '@type': 'Organization',
      name: 'TriggerFlow',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TriggerFlow',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png` },
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
