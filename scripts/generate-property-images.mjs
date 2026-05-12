/**
 * After `npm run sync-media`, scans `public/media/<folder>` for each property
 * and writes `src/data/generatedPropertyImages.js` so cards and galleries use
 * every photo in that folder (JPEG/PNG/WebP/AVIF/GIF/SVG).
 *
 * When `VITE_MEDIA_BASE_URL` is set and there is no usable local `public/media`,
 * skips writing so existing URLs in generatedPropertyImages.js stay valid for S3.
 */
import './load-root-env.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { KM } from '../src/data/mediaPaths.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const mediaRoot = path.join(root, 'public', 'media');
const outFile = path.join(root, 'src', 'data', 'generatedPropertyImages.js');

const mediaCdnBase = String(process.env.VITE_MEDIA_BASE_URL || '').trim();
const isCi = process.env.VERCEL === '1' || process.env.CI === 'true';

if (mediaCdnBase && !fs.existsSync(mediaRoot)) {
  console.log(
    '[generate-property-images] Skipped: VITE_MEDIA_BASE_URL set and public/media is missing — keeping src/data/generatedPropertyImages.js as-is (paths resolve via CDN).'
  );
  process.exit(0);
}

if (!fs.existsSync(mediaRoot)) {
  if (isCi && fs.existsSync(outFile)) {
    console.log(
      '[generate-property-images] Skipped: no public/media on CI — keeping committed src/data/generatedPropertyImages.js.'
    );
    process.exit(0);
  }
  if (!isCi) {
    console.error(
      '[generate-property-images] Missing public/media. Run `npm run sync-media` locally, or set VITE_MEDIA_BASE_URL on Vercel for CDN-only builds.'
    );
    process.exit(1);
  }
  console.error(
    '[generate-property-images] Missing public/media and generatedPropertyImages.js — add VITE_MEDIA_BASE_URL on Vercel or commit src/data/generatedPropertyImages.js.'
  );
  process.exit(1);
}

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif|svg)$/i;

function mediaUrl(folderName, fileName) {
  return `/media/${encodeURIComponent(folderName)}/${encodeURIComponent(fileName)}`;
}

function listImagesInFolder(folderName) {
  const dir = path.join(mediaRoot, folderName);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f) && !f.startsWith('.'))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((f) => mediaUrl(folderName, f));
}

/** Any `public/media` directory whose name contains "Kruler Village" (short folder, long caption, typos). */
function collectKrulerVillageImages(mediaRoot, kmLongName) {
  const names = new Set();
  if (fs.existsSync(mediaRoot)) {
    for (const ent of fs.readdirSync(mediaRoot, { withFileTypes: true })) {
      if (!ent.isDirectory()) continue;
      if (/kruler\s*village/i.test(ent.name)) names.add(ent.name);
    }
  }
  names.add('Kruler Village');
  names.add(kmLongName);

  const ordered = [...names].filter((n) => {
    const dir = path.join(mediaRoot, n);
    return fs.existsSync(dir) && fs.statSync(dir).isDirectory();
  });
  ordered.sort((a, b) => {
    const shortA = /^kruler village$/i.test(a);
    const shortB = /^kruler village$/i.test(b);
    if (shortA && !shortB) return -1;
    if (!shortA && shortB) return 1;
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  });

  const urls = [];
  for (const folder of ordered) {
    urls.push(...listImagesInFolder(folder));
  }
  return [...new Set(urls)];
}

/**
 * @type {Array<{ id: string, folders: string[] }>}
 * `folders` are tried in order; the first folder that contains at least one image wins.
 * Multiple folders (e.g. hotel + café) concatenate in order.
 */
const targets = [
  {
    id: '345-43-tran-hung-dao',
    folders: [KM.elWhereHotel, KM.elWhereCafe],
    merge: true,
  },
  { id: '27-29-nam-ky-khoi-nghia', folders: [KM.intermec27] },
  { id: '74-76-nam-ky-khoi-nghia', folders: [KM.baia7476] },
  { id: '232-15-vo-thi-sau', folders: [KM.mVillage232] },
  { id: '311-le-van-sy', folders: [KM.fpt311] },
  { id: 'lmak-office-pipeline', folders: [KM.lmak132] },
];

const generated = {};

for (const entry of targets) {
  const { id, folders, merge } = entry;
  if (merge) {
    const urls = [];
    for (const folder of folders) {
      urls.push(...listImagesInFolder(folder));
    }
    generated[id] = urls;
    continue;
  }
  let urls = [];
  for (const folder of folders) {
    const found = listImagesInFolder(folder);
    if (found.length) {
      urls = found;
      break;
    }
  }
  generated[id] = urls;
}

generated['kruler-village-long-phuoc'] = collectKrulerVillageImages(mediaRoot, KM.krulerVillage874);

if (mediaCdnBase) {
  const allEmpty = Object.values(generated).every(
    (a) => Array.isArray(a) && a.length === 0
  );
  if (allEmpty) {
    console.log(
      '[generate-property-images] Skipped: no images under public/media — keeping src/data/generatedPropertyImages.js (CDN mode).'
    );
    process.exit(0);
  }
}

const serialized = JSON.stringify(generated, null, 2);
const fileBody =
  '/**\n' +
  ' * Auto-generated by npm run generate:property-images — do not edit by hand.\n' +
  ' * Re-run after adding photos under public/media or running sync-media.\n' +
  ' */\n' +
  'export const generatedPropertyImages = ' +
  serialized +
  ';\n';

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, fileBody, 'utf8');
console.log('[generate-property-images] Wrote', path.relative(root, outFile));
