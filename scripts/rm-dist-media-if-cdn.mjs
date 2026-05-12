/**
 * After `vite build`, removes `dist/media` when `VITE_MEDIA_BASE_URL` is set
 * so production deploys rely on S3/CloudFront (see scripts/print-s3-media-sync.mjs).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const distMedia = path.join(root, 'dist', 'media');

const base = process.env.VITE_MEDIA_BASE_URL;
if (base != null && String(base).trim() !== '') {
  if (fs.existsSync(distMedia)) {
    fs.rmSync(distMedia, { recursive: true, force: true });
    console.info('[postbuild] Removed dist/media (VITE_MEDIA_BASE_URL is set).');
  }
}
