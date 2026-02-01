#!/usr/bin/env npx tsx

/**
 * Article Import Pipeline
 *
 * Imports blog articles from the external articles folder:
 * 1. Parses YAML frontmatter
 * 2. Generates images via Replicate API
 * 3. Transforms content (image markers → MDX components, internal links → URLs)
 * 4. Writes .mdx file to content/blog/{silo-slug}/
 * 5. Moves source file to articles/implementes/
 *
 * Usage:
 *   npx tsx scripts/import-articles.ts                  # Import all
 *   npx tsx scripts/import-articles.ts --dry-run        # Preview without changes
 *   npx tsx scripts/import-articles.ts --skip-images    # Skip Replicate API calls
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import Replicate from 'replicate';

// ── Configuration ────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DEFAULT_SOURCE_DIR = path.resolve(
  PROJECT_ROOT,
  '../articles/a-implementer'
);
const IMPLEMENTED_DIR = path.resolve(PROJECT_ROOT, '../articles/implementes');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content', 'blog');
const IMAGES_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'blog');

const SOURCE_DIR = process.env.ARTICLES_SOURCE_DIR || DEFAULT_SOURCE_DIR;

const SILO_SLUG_MAP: Record<string, string> = {
  S1: 'automatisation',
  S2: 'experience-client',
  S3: 'revenue-upselling',
  S4: 'tech-integrations',
  S5: 'guides',
};

const MODEL_MAP: Record<string, string> = {
  'nano-banana': 'google/nano-banana',
  'nano-banana-pro': 'google/nano-banana-pro',
};

const DELAY_BETWEEN_IMAGES_MS = 2000;

// ── CLI args ─────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const SKIP_IMAGES = args.includes('--skip-images');

// ── Types ────────────────────────────────────────────────────────────

interface ArticleFrontmatter {
  silo: string;
  silo_nom: string;
  type: string;
  pilier_parent?: string;
  title: string;
  meta_description: string;
  mot_cle_principal: string;
  mots_cles_secondaires: string[];
  slug: string;
  url?: string;
  date_publication: string;
  date_mise_a_jour?: string;
  longueur_mots: number;
  temps_lecture: number;
  persona_cible: string;
  cta_principal: string;
  fonctionnalites_mises_en_avant: string[];
  pms_mentionnes: string[];
  liens_internes?: Array<{ fichier: string; ancre: string; contexte: string }>;
  liens_externes?: Array<{ url: string; ancre: string; contexte: string }>;
  images: Array<{
    id: string;
    filename: string;
    alt: string;
    placement: string;
    width: number;
    height: number;
    model: string;
    prompt: string;
  }>;
  locale?: string;
}

interface ParsedArticle {
  frontmatter: ArticleFrontmatter;
  content: string;
  rawFrontmatter: string;
  sourceFilename: string;
  sourcePath: string;
}

// ── Helpers ──────────────────────────────────────────────────────────

function log(emoji: string, message: string) {
  console.log(`${emoji}  ${message}`);
}

function logError(message: string) {
  console.error(`\x1b[31m✗  ${message}\x1b[0m`);
}

function getSiloSlug(siloId: string): string | undefined {
  return SILO_SLUG_MAP[siloId];
}

/**
 * Resolve an internal file reference to a blog URL.
 * Input: "S1-P-marketing-automation-hotelier.md"
 * Output: "/blog/automatisation/marketing-automation-hotelier/"
 */
function resolveInternalLink(fileRef: string): string | null {
  // Pattern: S{n}-{type}-{slug}.md
  const match = fileRef.match(/^(S\d)-(P|S|A)-(.+)\.md$/);
  if (!match) return null;

  const [, siloId, , slug] = match;
  const siloSlug = getSiloSlug(siloId);
  if (!siloSlug) return null;

  return `/blog/${siloSlug}/${slug}/`;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Parse ────────────────────────────────────────────────────────────

function parseArticle(filepath: string): ParsedArticle | null {
  const sourceFilename = path.basename(filepath);

  try {
    const raw = fs.readFileSync(filepath, 'utf-8');
    const { data, content } = matter(raw);
    const fm = data as ArticleFrontmatter;

    // Validate required fields
    const missing: string[] = [];
    if (!fm.silo) missing.push('silo');
    if (!fm.title) missing.push('title');
    if (!fm.slug) missing.push('slug');
    if (!fm.images || !Array.isArray(fm.images)) missing.push('images');

    if (missing.length > 0) {
      logError(
        `${sourceFilename}: Missing required fields: ${missing.join(', ')}`
      );
      return null;
    }

    if (!getSiloSlug(fm.silo)) {
      logError(`${sourceFilename}: Unknown silo "${fm.silo}"`);
      return null;
    }

    // Extract raw frontmatter string (everything between --- markers)
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
    const rawFrontmatter = fmMatch ? fmMatch[1] : '';

    return {
      frontmatter: fm,
      content,
      rawFrontmatter,
      sourceFilename,
      sourcePath: filepath,
    };
  } catch (err) {
    logError(`${sourceFilename}: Failed to parse — ${err}`);
    return null;
  }
}

// ── Image generation ─────────────────────────────────────────────────

async function generateImages(
  article: ParsedArticle
): Promise<Map<string, boolean>> {
  const results = new Map<string, boolean>();
  const { frontmatter } = article;
  const imageDir = path.join(IMAGES_DIR, frontmatter.slug);

  if (!fs.existsSync(imageDir)) {
    if (!DRY_RUN) {
      fs.mkdirSync(imageDir, { recursive: true });
      log('📁', `Created directory: public/images/blog/${frontmatter.slug}/`);
    } else {
      log('🔍', `[DRY-RUN] Would create directory: public/images/blog/${frontmatter.slug}/`);
    }
  }

  if (!process.env.REPLICATE_API_TOKEN) {
    logError('REPLICATE_API_TOKEN is not set. Skipping image generation.');
    frontmatter.images.forEach((img) => results.set(img.id, false));
    return results;
  }

  const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

  for (let i = 0; i < frontmatter.images.length; i++) {
    const img = frontmatter.images[i];
    const outputPath = path.join(imageDir, img.filename);

    // Skip if image already exists
    if (fs.existsSync(outputPath)) {
      log('⏭️', `Image already exists: ${img.filename}`);
      results.set(img.id, true);
      continue;
    }

    const modelId = MODEL_MAP[img.model];
    if (!modelId) {
      logError(`Unknown model "${img.model}" for image "${img.id}"`);
      results.set(img.id, false);
      continue;
    }

    if (DRY_RUN) {
      log('🔍', `[DRY-RUN] Would generate: ${img.filename} (${modelId})`);
      results.set(img.id, true);
      continue;
    }

    try {
      log('🎨', `Generating image: ${img.filename} (${modelId})...`);

      const output = await replicate.run(modelId as `${string}/${string}`, {
        input: {
          prompt: img.prompt.trim(),
          width: img.width,
          height: img.height,
        },
      });

      // Replicate returns FileOutput objects — use String() to get the URL
      let imageUrl: string | null = null;
      if (typeof output === 'string') {
        imageUrl = output;
      } else if (Array.isArray(output) && output.length > 0) {
        imageUrl = String(output[0]);
      } else if (output) {
        imageUrl = String(output);
      }

      if (!imageUrl || !imageUrl.startsWith('http')) {
        logError(`No output URL for image "${img.id}"`);
        results.set(img.id, false);
        continue;
      }

      // Download image
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} downloading image`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(outputPath, buffer);

      log(
        '✅',
        `Saved: public/images/blog/${frontmatter.slug}/${img.filename} (${(buffer.length / 1024).toFixed(0)} KB)`
      );
      results.set(img.id, true);
    } catch (err) {
      logError(`Image "${img.id}" failed: ${err}`);
      results.set(img.id, false);
    }

    // Rate limiting delay between images
    if (i < frontmatter.images.length - 1) {
      await sleep(DELAY_BETWEEN_IMAGES_MS);
    }
  }

  return results;
}

// ── Content transformation ───────────────────────────────────────────

function transformContent(content: string): string {
  let result = content;

  // Replace <!-- IMAGE: id --> markers with <ImageBlock id="id" />
  result = result.replace(
    /<!--\s*IMAGE:\s*(\S+)\s*-->/g,
    '<ImageBlock id="$1" />'
  );

  // Replace internal file links: [text](S1-P-slug.md) → [text](/blog/silo/slug/)
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+\.md)\)/g,
    (match, text: string, fileRef: string) => {
      const resolvedUrl = resolveInternalLink(fileRef);
      if (resolvedUrl) {
        return `[${text}](${resolvedUrl})`;
      }
      log('⚠️', `Could not resolve internal link: ${fileRef}`);
      return match;
    }
  );

  return result;
}

// ── Write MDX ────────────────────────────────────────────────────────

function writeArticleMDX(article: ParsedArticle): boolean {
  const { frontmatter, rawFrontmatter } = article;
  const siloSlug = getSiloSlug(frontmatter.silo)!;
  const siloDir = path.join(CONTENT_DIR, siloSlug);
  const outputPath = path.join(siloDir, `${frontmatter.slug}.mdx`);

  // Build frontmatter: add locale if missing, remove image prompts (too long for MDX)
  let finalFrontmatter = rawFrontmatter;

  // Add locale if not present
  if (!frontmatter.locale) {
    finalFrontmatter = `locale: fr\n${finalFrontmatter}`;
  }

  // Transform content
  const transformedContent = transformContent(article.content);

  const mdxContent = `---\n${finalFrontmatter}\n---\n${transformedContent}`;

  if (DRY_RUN) {
    log(
      '🔍',
      `[DRY-RUN] Would write: content/blog/${siloSlug}/${frontmatter.slug}.mdx`
    );
    return true;
  }

  // Ensure silo directory exists
  if (!fs.existsSync(siloDir)) {
    fs.mkdirSync(siloDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, mdxContent, 'utf-8');
  log('📝', `Written: content/blog/${siloSlug}/${frontmatter.slug}.mdx`);
  return true;
}

// ── Move source ──────────────────────────────────────────────────────

function moveToImplemented(article: ParsedArticle): boolean {
  if (DRY_RUN) {
    log(
      '🔍',
      `[DRY-RUN] Would move: ${article.sourceFilename} → articles/implementes/`
    );
    return true;
  }

  if (!fs.existsSync(IMPLEMENTED_DIR)) {
    fs.mkdirSync(IMPLEMENTED_DIR, { recursive: true });
  }

  const destPath = path.join(IMPLEMENTED_DIR, article.sourceFilename);
  fs.renameSync(article.sourcePath, destPath);
  log('📦', `Moved: ${article.sourceFilename} → articles/implementes/`);
  return true;
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  TriggerFlow — Article Import Pipeline');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  if (DRY_RUN) {
    log('🔍', 'DRY-RUN mode — no files will be modified');
    console.log('');
  }

  if (SKIP_IMAGES) {
    log('⏭️', 'SKIP-IMAGES mode — Replicate API will not be called');
    console.log('');
  }

  // Check source directory
  if (!fs.existsSync(SOURCE_DIR)) {
    logError(`Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }

  // Check Replicate token (warn but don't exit)
  if (!process.env.REPLICATE_API_TOKEN && !SKIP_IMAGES && !DRY_RUN) {
    logError(
      'REPLICATE_API_TOKEN not set. Images will not be generated.'
    );
    logError('Set it in .env.local or pass --skip-images to suppress this warning.');
    console.log('');
  }

  // Scan for .md files
  const files = fs
    .readdirSync(SOURCE_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => path.join(SOURCE_DIR, f));

  if (files.length === 0) {
    log('📭', 'No .md files found in source directory.');
    return;
  }

  log('📂', `Found ${files.length} article(s) to import:`);
  files.forEach((f) => console.log(`     • ${path.basename(f)}`));
  console.log('');

  // Process each article
  let successCount = 0;
  let errorCount = 0;

  for (const filepath of files) {
    const filename = path.basename(filepath);
    console.log(`─── ${filename} ───`);

    // 1. Parse
    const article = parseArticle(filepath);
    if (!article) {
      errorCount++;
      console.log('');
      continue;
    }

    const { frontmatter } = article;
    const siloSlug = getSiloSlug(frontmatter.silo)!;
    log('📖', `"${frontmatter.title}"`);
    log('🏷️', `Silo: ${frontmatter.silo} (${siloSlug}) | Type: ${frontmatter.type} | Slug: ${frontmatter.slug}`);

    // 2. Generate images
    if (!SKIP_IMAGES && frontmatter.images.length > 0) {
      log('🖼️', `${frontmatter.images.length} image(s) to generate`);
      await generateImages(article);
    } else if (SKIP_IMAGES) {
      log('⏭️', `Skipping ${frontmatter.images.length} image(s)`);
    }

    // 3. Write MDX
    const written = writeArticleMDX(article);
    if (!written) {
      logError(`Failed to write MDX for ${filename}`);
      errorCount++;
      console.log('');
      continue;
    }

    // 4. Move source
    moveToImplemented(article);

    successCount++;
    console.log('');
  }

  // Summary
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log(
    '✅',
    `Import complete: ${successCount} succeeded, ${errorCount} failed`
  );
  if (DRY_RUN) {
    log('🔍', 'DRY-RUN — no files were actually modified');
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
}

main().catch((err) => {
  logError(`Fatal error: ${err}`);
  process.exit(1);
});
