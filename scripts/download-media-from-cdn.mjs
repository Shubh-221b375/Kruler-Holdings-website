/**
 * Downloads /media/... files from the public S3 bucket into public/media (no AWS credentials).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generatedPropertyImages } from '../src/data/generatedPropertyImages.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const mediaRoot = path.join(root, 'public', 'media');
const cdnBase = (process.env.VITE_MEDIA_BASE_URL || 'https://kruler-holdings-website.s3.amazonaws.com').replace(
  /\/+$/,
  ''
);

const CONCURRENCY = 4;

function collectPaths() {
  const set = new Set();
  for (const list of Object.values(generatedPropertyImages)) {
    if (!Array.isArray(list)) continue;
    for (const p of list) {
      if (p && String(p).startsWith('/media/')) set.add(String(p));
    }
  }
  return [...set];
}

async function downloadOne(mediaPath) {
  const url = cdnBase + mediaPath;
  const rel = decodeURIComponent(mediaPath.replace(/^\/media\//, ''));
  const dest = path.join(mediaRoot, rel);
  if (fs.existsSync(dest)) return { dest, skipped: true };
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) {
    return { dest, error: `${res.status} ${url}` };
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return { dest, bytes: buf.length };
}

async function pool(items, worker) {
  let i = 0;
  async function run() {
    while (i < items.length) {
      const idx = i++;
      await worker(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, run));
}

const paths = collectPaths();
console.log(`[download-media-from-cdn] ${paths.length} paths from generatedPropertyImages → ${mediaRoot}`);

if (!paths.length) {
  console.warn('[download-media-from-cdn] No paths found.');
  process.exit(0);
}

fs.mkdirSync(mediaRoot, { recursive: true });

let ok = 0;
let skip = 0;
let fail = 0;

await pool(paths, async (p) => {
  try {
    const r = await downloadOne(p);
    if (r.error) {
      fail += 1;
      console.warn('[download-media-from-cdn]', r.error);
    } else if (r.skipped) {
      skip += 1;
    } else {
      ok += 1;
      if (ok % 10 === 0) console.log(`[download-media-from-cdn] ${ok} downloaded…`);
    }
  } catch (e) {
    fail += 1;
    console.warn('[download-media-from-cdn]', p, e.message);
  }
});

console.log(`[download-media-from-cdn] Done: ${ok} new, ${skip} skipped, ${fail} failed.`);
