import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getCaseStudyBySlug, getAllSlugs } from '@/lib/case-studies';
import CaseStudyDetail from './CaseStudyDetail';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  return <CaseStudyDetail slug={slug} />;
}
