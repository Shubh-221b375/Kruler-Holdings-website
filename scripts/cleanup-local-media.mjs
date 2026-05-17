/**
 * Frees disk space from local media copies (safe when using S3/CDN).
 *   npm run cleanup:media
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const mediaRoot = path.join(root, 'public', 'media');

if (fs.existsSync(mediaRoot)) {
  fs.rmSync(mediaRoot, { recursive: true, force: true });
  console.log('[cleanup:media] Removed public/media');
} else {
  console.log('[cleanup:media] public/media not present');
}

console.log('[cleanup:media] Also run: npm cache clean --force');
