import { brand } from '@/data/brand';
import { companyStats, stat } from '@/data/company-stats';
import { modulesList } from '@/data/modules';
import { solutions } from '@/data/solutions';
import { getEntryPrice, getPricingPhase } from '@/data/pricing';
import { getAuthor } from '@/data/authors';
import type { Article } from '@/types/blog';

/**
 * Fichiers /llms.txt et /llms-full.txt : la carte du site pour les moteurs IA.
 * Tout est généré depuis les sources de vérité (brand.ts, company-stats.ts, pricing.ts,
 * modules, solutions, articles MDX) : un nouvel article y apparaît sans rien toucher ici.
 */

const baseUrl = brand.url;

function attributes(raw: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  for (const match of raw.matchAll(/(\w+)=(?:"([^"]*)"|\{["'`]?([^}]*?)["'`]?\})/g)) {
    attrs[match[1]] = match[2] ?? match[3] ?? '';
  }
  return attrs;
}

/**
 * Réduit le corps MDX d'un article en texte lisible par un modèle : les composants
 * de chiffres deviennent des lignes « valeur : libellé », les chiffres TriggerFlow
 * (`<Stat>`, `statId`) sont résolus, les composants décoratifs disparaissent et les
 * liens relatifs deviennent absolus.
 */
export function mdxToPlainText(content: string, locale: string): string {
  return content
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/<Stat\s+([^>]*?)\/>/g, (_, raw: string) => stat(attributes(raw).id ?? '', locale))
    .replace(/<KeyFigure(?:Card)?\s+([\s\S]*?)\/>/g, (_, raw: string) => {
      const a = attributes(raw);
      const value = a.statId ? stat(a.statId, locale) : a.value ?? '';
      const description = a.description ? ` (${a.description})` : '';
      return `- ${value} : ${a.label ?? ''}${description}`;
    })
    .replace(/<(ImageBlock|NewsletterInline)\b[\s\S]*?\/>/g, '')
    .replace(/<\/?[A-Z][A-Za-z]*\b[^>]*>/g, '')
    .replace(/\]\(\//g, `](${baseUrl}/`)
    .replace(/^[ \t]+(- )/gm, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function articleUrl(article: Article): string {
  return `${baseUrl}/${article.locale}/blog/${article.siloSlug}/${article.slug}`;
}

function keyFacts(): string {
  const entryPrice = getEntryPrice(getPricingPhase());
  return `## Key facts
- Category: hotel CRM and guest experience platform (CRM hôtelier), for independent hotels and hotel groups
- Company: ${brand.name}, published by ${brand.legalName}, founded in ${brand.foundingDate} in ${brand.foundingCity}, France
- Pricing: public and transparent, free plan, paid plans from €${entryPrice}/month, no setup fee, no minimum number of rooms (${baseUrl}/en/tarifs)
- Adoption: ${companyStats.hotels.en} hotels, ${companyStats.messages.en} messages sent; Google rating ${companyStats.rating.en}
- Native PMS integrations: ${brand.pms.join(', ')}
- Channels: email, SMS, WhatsApp, unified inbox
- Setup: operational in less than 48 hours, support 7 days a week
- Languages: French, English
- Book a demo: ${brand.demoUrl}`;
}

function articleList(articles: Article[]): string {
  return articles
    .map((a) => `- [${a.title}](${articleUrl(a)}): ${a.metaDescription}`)
    .join('\n');
}

export function buildLlmsTxt(articles: { fr: Article[]; en: Article[] }): string {
  const products = modulesList
    .map((m) => `- [${m.seoTitle}](${baseUrl}/fr/produit/${m.slug}) (EN: ${baseUrl}/en/produit/${m.slug})`)
    .join('\n');
  const solutionPages = Object.values(solutions)
    .map((s) => `- [${s.title}](${baseUrl}/fr/solutions/${s.slug}): ${s.headline}`)
    .join('\n');

  return `# ${brand.name}

> ${brand.definition.en}

${brand.definition.fr}

${keyFacts()}

## Main pages
- [Home (FR)](${baseUrl}/fr) / [Home (EN)](${baseUrl}/en)
- [Pricing / Tarifs](${baseUrl}/fr/tarifs)
- [PMS integrations / Intégrations](${baseUrl}/fr/integrations)
- [Mews integration](${baseUrl}/fr/integrations/pms/mews)
- [Customer stories / Cas clients](${baseUrl}/fr/ressources/cas-clients)
- [About / À propos](${baseUrl}/fr/entreprise/a-propos)

## Product modules (FR pages, EN at /en/)
${products}

## Solutions by hotel type and goal (FR)
${solutionPages}

## Guides (FR)
${articleList(articles.fr)}

## Guides (EN)
${articleList(articles.en)}

## Optional
- [Full text of all guides](${baseUrl}/llms-full.txt)
`;
}

export function buildLlmsFullTxt(articles: { fr: Article[]; en: Article[] }): string {
  const body = [...articles.fr, ...articles.en]
    .map((a) => {
      const author = getAuthor(a.auteur);
      return `# ${a.title}

URL: ${articleUrl(a)}
Language: ${a.locale}
Author: ${author.name}, ${a.locale === 'fr' ? author.role.fr : author.role.en}
Updated: ${a.dateMiseAJour}

${mdxToPlainText(a.content, a.locale)}`;
    })
    .join('\n\n---\n\n');

  return `# ${brand.name}: full text

> ${brand.definition.en}

${keyFacts()}

---

${body}
`;
}
