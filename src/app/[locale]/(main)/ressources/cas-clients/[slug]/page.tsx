import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getCaseStudyBySlug, getAllSlugs } from '@/lib/case-studies';
import CaseStudyDetail from './CaseStudyDetail';
import { pageAlternates } from '@/lib/seo';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) return {};

  const title = `${caseStudy.name} | Cas client TriggerFlow`;
  const description = `Découvrez comment ${caseStudy.name} (${caseStudy.location}) utilise TriggerFlow pour ${caseStudy.objectives.slice(0, 2).join(' et ').toLowerCase()}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [caseStudy.image],
    },
    // Fiches rédigées en français seulement (src/lib/case-studies.ts) : pas de hreflang en tant qu'elles ne sont pas traduites.
    alternates: pageAlternates(locale, `/ressources/cas-clients/${slug}`, ['fr']),
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  return <CaseStudyDetail slug={slug} />;
}
