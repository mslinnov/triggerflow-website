#!/usr/bin/env npx tsx

/**
 * Generate missing blog images via Replicate API
 *
 * Reads all existing .mdx articles in content/blog/, checks which images
 * are missing from public/images/blog/{slug}/, and generates them.
 *
 * Usage:
 *   npx tsx scripts/generate-images.ts              # Generate all missing images
 *   npx tsx scripts/generate-images.ts --dry-run    # Preview without generating
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import Replicate from 'replicate';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Load .env.local
const envPath = path.join(PROJECT_ROOT, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content', 'blog');
const IMAGES_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'blog');

const MODEL_MAP: Record<string, string> = {
  'nano-banana': 'google/nano-banana',
  'nano-banana-pro': 'google/nano-banana-pro',
};

const DELAY_BETWEEN_IMAGES_MS = 2000;
const DRY_RUN = process.argv.includes('--dry-run');

interface ImageMeta {
  id: string;
  filename: string;
  alt: string;
  width: number;
  height: number;
  model: string;
  prompt: string;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log(DRY_RUN ? '🔍 DRY RUN — no files will be written\n' : '🎨 Generating missing blog images\n');

  if (!DRY_RUN && !process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN is not set in .env.local');
    process.exit(1);
  }

  const replicate = DRY_RUN ? null : new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

  // Find all .mdx articles
  const silos = fs.readdirSync(CONTENT_DIR).filter((d) =>
    fs.statSync(path.join(CONTENT_DIR, d)).isDirectory()
  );

  let totalImages = 0;
  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const silo of silos) {
    const siloDir = path.join(CONTENT_DIR, silo);
    const files = fs.readdirSync(siloDir).filter((f) => f.endsWith('.mdx'));

    for (const file of files) {
      const filePath = path.join(siloDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      const slug = data.slug as string;
      const images = (data.images || []) as ImageMeta[];

      if (images.length === 0) continue;

      console.log(`\n📄 ${silo}/${slug} — ${images.length} images`);

      const imageDir = path.join(IMAGES_DIR, slug);
      if (!fs.existsSync(imageDir)) {
        if (!DRY_RUN) {
          fs.mkdirSync(imageDir, { recursive: true });
        }
        console.log(`   📁 Created public/images/blog/${slug}/`);
      }

      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        totalImages++;

        const outputPath = path.join(imageDir, img.filename);

        if (fs.existsSync(outputPath)) {
          console.log(`   ⏭️  ${img.filename} (exists)`);
          skipped++;
          continue;
        }

        const modelId = MODEL_MAP[img.model];
        if (!modelId) {
          console.error(`   ❌ Unknown model "${img.model}" for "${img.id}"`);
          failed++;
          continue;
        }

        if (DRY_RUN) {
          console.log(`   🔍 Would generate: ${img.filename} (${modelId}, ${img.width}x${img.height})`);
          continue;
        }

        try {
          console.log(`   🎨 Generating: ${img.filename} (${modelId}, ${img.width}x${img.height})...`);

          const output = await replicate!.run(modelId as `${string}/${string}`, {
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
            console.error(`   ❌ No output URL for "${img.id}"`);
            failed++;
            continue;
          }

          const response = await fetch(imageUrl);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const buffer = Buffer.from(await response.arrayBuffer());
          fs.writeFileSync(outputPath, buffer);

          console.log(`   ✅ Saved: ${img.filename} (${(buffer.length / 1024).toFixed(0)} KB)`);
          generated++;
        } catch (err) {
          console.error(`   ❌ Failed "${img.id}": ${err}`);
          failed++;
        }

        // Rate limiting
        if (i < images.length - 1) {
          await sleep(DELAY_BETWEEN_IMAGES_MS);
        }
      }
    }
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`Total: ${totalImages} images`);
  console.log(`  ✅ Generated: ${generated}`);
  console.log(`  ⏭️  Skipped (exist): ${skipped}`);
  if (failed > 0) console.log(`  ❌ Failed: ${failed}`);
  console.log();
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
