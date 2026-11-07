import { clampDescription } from '@/lib/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { moduleSlugs, getModuleSerializable } from '@/data/modules';
import { BreadcrumbListJsonLd, FaqJsonLd } from '@/components/seo';
import { productLandings, redirectedProductSlugs } from '@/content/products';
import { ProductLandingPage } from '@/components/product/ProductLandingPage';
import ModulePageContent from './ModulePageContent';

const baseUrl = 'https://www.trigger-flow.com';

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}


/** Toute adresse hors generateStaticParams renvoie une vraie 404 (pas de soft 404). */
export const dynamicParams = false;

export async function generateStaticParams() {
  const locales = ['fr', 'en'];
  const params = [];

  for (const locale of locales) {
    // Anciennes pages remplacées par une landing (redirigées en 301 dans next.config.ts).
    const legacy = redirectedProductSlugs;
    for (const slug of moduleSlugs.filter((s) => !legacy.has(s))) {
      params.push({ locale, slug });
    }
    for (const slug of Object.keys(productLandings)) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const landing = productLandings[slug];
  if (landing) {
    const lang = locale === 'en' ? 'en' : 'fr';
    return {
      title: { absolute: landing.seo.title[lang] },
      description: clampDescription(landing.seo.description[lang]),
      openGraph: { title: landing.seo.title[lang], description: clampDescription(landing.seo.description[lang]), type: 'website' },
      alternates: {
        canonical: `${baseUrl}/${locale}/produit/${slug}`,
        languages: { fr: `${baseUrl}/fr/produit/${slug}`, en: `${baseUrl}/en/produit/${slug}`, 'x-default': `${baseUrl}/fr/produit/${slug}` },
      },
    };
  }

  const moduleData = getModuleSerializable(slug);
  if (!moduleData) {
    return {
      title: 'Module non trouvé | TriggerFlow',
    };
  }

  const title = moduleData.seoTitle;
  const description = moduleData.description;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | TriggerFlow`,
      description,
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/produit/${slug}`,
      languages: {
        fr: `${baseUrl}/fr/produit/${slug}`,
        en: `${baseUrl}/en/produit/${slug}`,
        'x-default': `${baseUrl}/fr/produit/${slug}`,
      },
    },
  };
}

export default async function ModulePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const landing = productLandings[slug];
  if (landing) {
    const lang = locale === 'en' ? 'en' : 'fr';
    return (
      <>
        <BreadcrumbListJsonLd
          items={[
            { name: 'TriggerFlow', url: `${baseUrl}/${locale}` },
            { name: locale === 'fr' ? 'Produit' : 'Product', url: `${baseUrl}/${locale}/produit` },
            { name: landing.name[lang], url: `${baseUrl}/${locale}/produit/${slug}` },
          ]}
        />
        <FaqJsonLd items={landing.faq.map((f) => ({ question: f.q[lang], answer: f.a[lang] }))} />
        <ProductLandingPage product={landing} locale={locale} />
      </>
    );
  }

  const moduleData = getModuleSerializable(slug);

  if (!moduleData) {
    notFound();
  }

  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { name: 'TriggerFlow', url: `${baseUrl}/${locale}` },
          { name: locale === 'fr' ? 'Produit' : 'Product', url: `${baseUrl}/${locale}/produit` },
          { name: moduleData.title, url: `${baseUrl}/${locale}/produit/${slug}` },
        ]}
      />
      <ModulePageContent moduleSlug={slug} />
    </>
  );
}
