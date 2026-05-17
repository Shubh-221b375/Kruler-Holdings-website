/**
 * Full media optimization pipeline:
 * 1) Ensure public/media exists (Kruler's Media, or HTTPS download from public S3)
 * 2) Generate *.w960.webp / *.w1280.webp + generatedMediaVariants.js
 * 3) Upload variant files to S3 (needs AWS CLI credentials)
 *
 *   npm run media:variants:deploy:full
 *
 * Prefer `npm run media:variants:deploy` (streaming, low disk) unless you need full local copies.
 */
import './load-root-env.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const mediaRoot = path.join(root, 'public', 'media');
const krulerSrc = path.join(root, "Kruler's Media");
const bucket = process.env.S3_BUCKET || 'kruler-holdings-website';
const s3Prefix = 's3://' + bucket + '/media';

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', cwd: root, shell: process.platform === 'win32' });
  if (r.error) {
    console.error('[pipeline] Failed:', cmd, r.error.message);
    process.exit(1);
  }
  return r.status ?? 0;
}

function hasAwsCli() {
  const r = spawnSync('aws', ['--version'], { stdio: 'pipe', shell: process.platform === 'win32' });
  return r.status === 0;
}

function mediaHasFiles() {
  if (!fs.existsSync(mediaRoot)) return false;
  const stack = [mediaRoot];
  while (stack.length) {
    const dir = stack.pop();
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) stack.push(p);
      else if (/\.(jpe?g|png|webp)$/i.test(ent.name)) return true;
    }
  }
  return false;
}

console.log('[pipeline] Kruler media variants — bucket:', bucket);

if (!mediaHasFiles()) {
  if (fs.existsSync(krulerSrc)) {
    console.log("[pipeline] sync-kruler-media…");
    const prev = process.env.VITE_MEDIA_BASE_URL;
    delete process.env.VITE_MEDIA_BASE_URL;
    const code = run('node', ['scripts/sync-kruler-media.mjs']);
    if (prev) process.env.VITE_MEDIA_BASE_URL = prev;
    if (code !== 0) process.exit(code);
  } else {
    console.log('[pipeline] Downloading gallery files over HTTPS (public S3)…');
    fs.mkdirSync(path.join(root, 'public'), { recursive: true });
    const dl = run('node', ['scripts/download-media-from-cdn.mjs']);
    if (dl !== 0) process.exit(dl);
  }
}

if (!mediaHasFiles()) {
  console.error('[pipeline] public/media has no images after sync/download.');
  process.exit(1);
}

console.log('[pipeline] Generating WebP variants…');
const genCode = run('node', ['scripts/generate-media-variants.mjs']);
if (genCode !== 0) process.exit(genCode);

if (!hasAwsCli()) {
  console.warn(
    '[pipeline] AWS CLI not installed. Upload variants manually:\n' +
      `  aws s3 sync public/media ${s3Prefix} --exclude "*" --include "*.w960.webp" --include "*.w1280.webp"`
  );
  process.exit(0);
}

console.log('[pipeline] Uploading WebP variants to', s3Prefix, '…');
const uploadCode = run('aws', [
  's3',
  'sync',
  mediaRoot.replace(/\\/g, '/'),
  s3Prefix,
  '--exclude',
  '*',
  '--include',
  '*.w960.webp',
  '--include',
  '*.w1280.webp',
]);

if (uploadCode !== 0) {
  console.warn(
    '[pipeline] S3 upload failed (configure: aws configure). Variants are on disk under public/media.\n' +
      `  Retry: aws s3 sync public/media ${s3Prefix} --exclude "*" --include "*.w960.webp" --include "*.w1280.webp"`
  );
  process.exit(uploadCode);
}

console.log('[pipeline] Done. Commit src/data/generatedMediaVariants.js and redeploy.');
