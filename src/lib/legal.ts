import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Locale } from '@/i18n/routing';

export interface LegalDocFrontmatter {
  title: string;
  slug: string;
  version: string;
  effectiveDate: string;
  lastUpdated: string;
  metaTitle: string;
  metaDescription: string;
}

export interface LegalDoc {
  frontmatter: LegalDocFrontmatter;
  content: string;
}

const LEGAL_DIR = path.join(process.cwd(), 'content', 'legal');

const KNOWN_SLUGS = [
  'cgv',
  'cgu',
  'mentions-legales',
  'politique-confidentialite',
] as const;

export type LegalSlug = (typeof KNOWN_SLUGS)[number];

export function isLegalSlug(value: string): value is LegalSlug {
  return (KNOWN_SLUGS as readonly string[]).includes(value);
}

export function getAllLegalSlugs(): readonly LegalSlug[] {
  return KNOWN_SLUGS;
}

export function getLegalDoc(slug: LegalSlug, locale: Locale = 'fr'): LegalDoc | null {
  const candidates = [
    path.join(LEGAL_DIR, locale, `${slug}.mdx`),
    path.join(LEGAL_DIR, 'fr', `${slug}.mdx`),
  ];

  for (const filePath of candidates) {
    if (!fs.existsSync(filePath)) continue;
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return {
      frontmatter: data as LegalDocFrontmatter,
      content,
    };
  }

  return null;
}
