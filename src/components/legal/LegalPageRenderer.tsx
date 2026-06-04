import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { LegalPageLayout } from './LegalPageLayout';
import { Callout, InternalLink } from '@/components/mdx';
import {
  LegalTable,
  LegalThead,
  LegalTr,
  LegalTh,
  LegalTd,
} from './LegalTable';
import { getLegalDoc, type LegalSlug } from '@/lib/legal';
import type { Locale } from '@/i18n/routing';

const BASE_URL = 'https://www.trigger-flow.com';

const legalMdxComponents = {
  Callout,
  InternalLink,
  table: LegalTable,
  thead: LegalThead,
  tr: LegalTr,
  th: LegalTh,
  td: LegalTd,
};

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
};

interface LegalPageRendererProps {
  slug: LegalSlug;
  locale: Locale;
}

export async function LegalPageRenderer({ slug, locale }: LegalPageRendererProps) {
  const doc = getLegalDoc(slug, locale);

  if (!doc) {
    notFound();
  }

  return (
    <LegalPageLayout
      title={doc.frontmatter.title}
      version={doc.frontmatter.version}
      effectiveDate={doc.frontmatter.effectiveDate}
      lastUpdated={doc.frontmatter.lastUpdated}
    >
      <MDXRemote
        source={doc.content}
        components={legalMdxComponents}
        options={mdxOptions}
      />
    </LegalPageLayout>
  );
}

export function buildLegalMetadata(slug: LegalSlug, locale: Locale): Metadata {
  const doc = getLegalDoc(slug, locale);
  if (!doc) return {};

  return {
    title: doc.frontmatter.metaTitle,
    description: doc.frontmatter.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/${locale}/${slug}`,
      languages: {
        'fr-FR': `${BASE_URL}/fr/${slug}`,
        'en-US': `${BASE_URL}/en/${slug}`,
      },
    },
  };
}
