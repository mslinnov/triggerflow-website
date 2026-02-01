#!/usr/bin/env npx tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Replicate from 'replicate';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Load .env.local
const envPath = path.join(PROJECT_ROOT, '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

async function main() {
  const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

  console.log('Testing google/nano-banana...\n');

  const output = await replicate.run('google/nano-banana' as `${string}/${string}`, {
    input: {
      prompt: 'A modern hotel lobby with warm lighting, minimalist design',
      width: 512,
      height: 512,
    },
  });

  console.log('Output type:', typeof output);
  console.log('Output constructor:', output?.constructor?.name);
  console.log('Is array:', Array.isArray(output));

  // FileOutput has a .url() method and toString() returns the URL
  const url = String(output);
  console.log('toString():', url);

  // Check if it has url method
  if (output && typeof (output as any).url === 'function') {
    const urlResult = await (output as any).url();
    console.log('.url():', urlResult);
  }

  // Try fetching
  if (url.startsWith('http')) {
    const resp = await fetch(url);
    console.log('Fetch status:', resp.status, resp.headers.get('content-type'));
    const buf = Buffer.from(await resp.arrayBuffer());
    console.log('Size:', (buf.length / 1024).toFixed(0), 'KB');
    fs.writeFileSync('/tmp/test-replicate-output.webp', buf);
    console.log('Saved to /tmp/test-replicate-output.webp');
  }
}

main().catch(console.error);
