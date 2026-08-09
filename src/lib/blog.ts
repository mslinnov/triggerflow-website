import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import GithubSlugger from 'github-slugger';
import { silos, getSiloBySlug } from '@/data/silos';
import type { Article, FaqItem, Silo, TOCItem } from '@/types/blog';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

function parseFrontmatter(
  fileContent: string,
  siloSlug: string,
  filePath: string
): Article | null {
  try {
    const { data, content } = matter(fileContent);

    const silo = getSiloBySlug(siloSlug);
    if (!silo) {
      console.warn(`[blog] Unknown silo slug "${siloSlug}" for file: ${filePath}`);
      return null;
    }

    if (!data.title || !data.slug) {
      console.warn(`[blog] Missing required fields (title, slug) in: ${filePath}`);
      return null;
    }

    const stats = readingTime(content);

    return {
      slug: data.slug,
      translationKey: data.translationKey ?? null,
      silo: silo.id,
      siloNom: data.silo_nom ?? silo.nom,
      siloSlug: silo.slug,
      type: data.type ?? 'support',
      pilierParent: data.pilier_parent ?? null,
      title: data.title,
      metaDescription: data.meta_description ?? '',
      motClePrincipal: data.mot_cle_principal ?? '',
      motsClesSecondaires: data.mots_cles_secondaires ?? [],
      datePublication: String(data.date_publication ?? ''),
      dateMiseAJour: String(data.date_mise_a_jour ?? data.date_publication ?? ''),
      longueurMots: data.longueur_mots ?? stats.words,
      tempsLecture: data.temps_lecture ?? Math.ceil(stats.minutes),
      personaCible: data.persona_cible ?? 'tous',
      ctaPrincipal: data.cta_principal ?? 'demo',
      fonctionnalitesMisesEnAvant: data.fonctionnalites_mises_en_avant ?? [],
      pmsMentionnes: data.pms_mentionnes ?? [],
      liensInternes: data.liens_internes ?? [],
      liensExternes: data.liens_externes ?? [],
      images: data.images ?? [],
      content,
      locale: data.locale ?? 'fr',
    };
  } catch (error) {
    console.warn(`[blog] Error parsing frontmatter in: ${filePath}`, error);
    return null;
  }
}

export function getAllArticles(locale: string): Article[] {
  const articles: Article[] = [];

  for (const silo of silos) {
    const siloDir = path.join(CONTENT_DIR, silo.slug);
    if (!fs.existsSync(siloDir)) continue;

    const files = fs.readdirSync(siloDir).filter((f) => f.endsWith('.mdx'));

    for (const file of files) {
      const filePath = path.join(siloDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const article = parseFrontmatter(fileContent, silo.slug, filePath);

      if (article && article.locale === locale) {
        articles.push(article);
      }
    }
  }

  return articles.sort((a, b) => {
    if (!a.datePublication || !b.datePublication) return 0;
    return b.datePublication.localeCompare(a.datePublication);
  });
}

export function getArticleBySlug(
  siloSlug: string,
  slug: string,
  locale: string
): Article | null {
  const siloDir = path.join(CONTENT_DIR, siloSlug);
  if (!fs.existsSync(siloDir)) return null;

  const files = fs.readdirSync(siloDir).filter((f) => f.endsWith('.mdx'));

  for (const file of files) {
    const filePath = path.join(siloDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const article = parseFrontmatter(fileContent, siloSlug, filePath);

    if (article && article.slug === slug && article.locale === locale) {
      return article;
    }
  }

  return null;
}

export function getArticlesBySilo(siloSlug: string, locale: string): Article[] {
  const siloDir = path.join(CONTENT_DIR, siloSlug);
  if (!fs.existsSync(siloDir)) return [];

  const files = fs.readdirSync(siloDir).filter((f) => f.endsWith('.mdx'));
  const articles: Article[] = [];

  for (const file of files) {
    const filePath = path.join(siloDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const article = parseFrontmatter(fileContent, siloSlug, filePath);

    if (article && article.locale === locale) {
      articles.push(article);
    }
  }

  return articles.sort((a, b) => {
    if (!a.datePublication || !b.datePublication) return 0;
    return b.datePublication.localeCompare(a.datePublication);
  });
}

export function getArticleByTranslationKey(
  translationKey: string,
  locale: string
): Article | null {
  const articles = getAllArticles(locale);
  return articles.find((a) => a.translationKey === translationKey) ?? null;
}

export function getSilos(): Silo[] {
  return silos;
}

export function generateTableOfContents(content: string): TOCItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TOCItem[] = [];
  const slugger = new GithubSlugger();
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = slugger.slug(text);

    items.push({ id, text, level });
  }

  return items;
}

/** Titre du H2 qui ouvre la section FAQ, en FR et en EN. */
const FAQ_HEADING = /^##\s+(questions?\s+fréquentes|frequently\s+asked\s+questions?)\s*$/im;

/** Une question de FAQ : un paragraphe entièrement en gras. */
const FAQ_QUESTION = /^\*\*(.+?)\*\*$/;

/**
 * Réduit le markdown/MDX inline en texte nu — le JSON-LD attend du texte,
 * pas des astérisques ni des composants React.
 */
function stripInlineMarkup(text: string): string {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extrait les paires question/réponse de la section « Questions fréquentes »
 * d'un article, pour les baliser en FAQPage.
 *
 * Les 10 articles suivent la même forme : un H2 FAQ, puis des paragraphes
 * `**Question ?**` suivis de leur réponse (parfois séparés par `---`).
 * Retourne un tableau vide si l'article n'a pas de section FAQ.
 */
export function extractFaqItems(content: string): FaqItem[] {
  const heading = content.match(FAQ_HEADING);
  if (!heading || heading.index === undefined) return [];

  // De la fin du titre FAQ jusqu'au H2 suivant (ou la fin de l'article).
  const afterHeading = content.slice(heading.index + heading[0].length);
  const nextHeading = afterHeading.search(/^##\s+/m);
  const section = nextHeading === -1 ? afterHeading : afterHeading.slice(0, nextHeading);

  const items: FaqItem[] = [];
  let current: { question: string; answer: string[] } | null = null;

  const flush = () => {
    if (!current) return;
    const answer = stripInlineMarkup(current.answer.join(' '));
    if (answer) items.push({ question: current.question, answer });
    current = null;
  };

  for (const rawLine of section.split('\n')) {
    const line = rawLine.trim();
    if (!line || line === '---') continue;

    const question = line.match(FAQ_QUESTION);
    if (question) {
      flush();
      current = { question: stripInlineMarkup(question[1]), answer: [] };
    } else if (current) {
      current.answer.push(line);
    }
  }
  flush();

  return items;
}
