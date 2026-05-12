/**
 * Prints the AWS CLI command to upload `public/media` so URLs match the app
 * (`/media/<folder>/<file>` → same keys under bucket prefix `media/`).
 *
 * Run after: npm run sync-media
 */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const localMedia = path.join(root, 'public', 'media');

console.log(`
Kruler Holdings — S3 / CDN layout (mirrors "Kruler's Media" → public/media)

1) Sync local media to your bucket under prefix "media/" (folder names & files must match public/media exactly):

   aws s3 sync "${localMedia.replace(/\\/g, '/')}" s3://YOUR_BUCKET_NAME/media --delete

   (Drop --delete if you do not want S3 objects removed when files disappear locally.)

2) Point the site at the bucket or CloudFront URL (no trailing slash), e.g.:

   VITE_MEDIA_BASE_URL=https://d1234567890.cloudfront.net

3) Production build. To ship HTML/JS without duplicating images in dist, set the same variable for the build (see scripts/rm-dist-media-if-cdn.mjs):

   Put VITE_MEDIA_BASE_URL in .env or .env.production in the project root (see .env.example). Pre-scripts load these files so sync/generate skip without local public/media.

   set VITE_MEDIA_BASE_URL=https://d1234567890.cloudfront.net
   npm run build

   On Unix: VITE_MEDIA_BASE_URL=https://... npm run build
`);
