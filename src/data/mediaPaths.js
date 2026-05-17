/**
 * Media under `public/media/` is synced from `Kruler's Media/` (see scripts/sync-kruler-media.mjs).
 * For production CDN, set `VITE_MEDIA_BASE_URL` (no trailing slash), e.g. your CloudFront or S3 website URL.
 * Upload the same folder tree as `public/media/` to the bucket under prefix `media/` (see scripts/print-s3-media-sync.mjs).
 *
 * Images are served from S3 as-is (no re-upload required). Optional WebP variants: set
 * `VITE_USE_MEDIA_VARIANTS=true` only if `*.w960.webp` files already exist on S3.
 *
 * Vercel: `vercel.json` rewrites `/media/*` to this bucket so relative `/media/...` URLs still work if the build
 * omitted `VITE_MEDIA_BASE_URL`. Change that rewrite if you switch buckets.
 */
import { MEDIA_VARIANTS } from './generatedMediaVariants.js';

function mediaBaseUrl() {
  const env = typeof import.meta !== 'undefined' ? import.meta.env : undefined;
  if (!env) return '';
  const raw = env.VITE_MEDIA_BASE_URL;
  if (raw == null || String(raw).trim() === '') return '';
  return String(raw).replace(/\/+$/, '');
}

function withMediaBase(pathStartingWithSlash) {
  const base = mediaBaseUrl();
  if (!base) return pathStartingWithSlash;
  return `${base}${pathStartingWithSlash}`;
}

/** Stable key for variant lookup (decoded /media/... path, no query). */
export function mediaPathKey(pathOrUrl) {
  if (pathOrUrl == null || pathOrUrl === '') return '';
  const s = String(pathOrUrl);
  try {
    if (/^https?:\/\//i.test(s)) {
      return decodeURIComponent(new URL(s).pathname);
    }
    const p = s.startsWith('/') ? s : `/${s}`;
    return decodeURIComponent(p.split('?')[0]);
  } catch {
    return s.split('?')[0];
  }
}

function encodeMediaPath(pathKey) {
  if (!pathKey.startsWith('/media/')) return pathKey;
  const rest = pathKey.slice('/media/'.length);
  const parts = rest.split('/').filter(Boolean);
  return `/media/${parts.map((p) => encodeURIComponent(p)).join('/')}`;
}

function useMediaVariants() {
  const env = typeof import.meta !== 'undefined' ? import.meta.env : undefined;
  return env?.VITE_USE_MEDIA_VARIANTS === 'true';
}

function pickVariantPath(pathKey, width = 960) {
  if (!useMediaVariants()) return null;
  const variants = MEDIA_VARIANTS[pathKey];
  if (!variants || typeof variants !== 'object') return null;
  const w = Number(width) || 960;
  if (variants[w]) return variants[w];
  const keys = Object.keys(variants)
    .map(Number)
    .filter((n) => !Number.isNaN(n))
    .sort((a, b) => a - b);
  if (!keys.length) return null;
  const best = keys.reduce((prev, cur) => (Math.abs(cur - w) < Math.abs(prev - w) ? cur : prev));
  return variants[best];
}

/**
 * @param {string} pathOrUrl
 * @param {{ width?: number }} [options] Prefer a generated WebP variant at this width when listed in MEDIA_VARIANTS.
 */
export function resolveMediaUrl(pathOrUrl, options = {}) {
  if (pathOrUrl == null || pathOrUrl === '') return '';
  const s = String(pathOrUrl);
  if (/^https?:\/\//i.test(s)) {
    const key = mediaPathKey(s);
    const variant = pickVariantPath(key, options.width);
    if (variant) return withMediaBase(encodeMediaPath(variant));
    return s;
  }
  const pathKey = mediaPathKey(s);
  const variant = pickVariantPath(pathKey, options.width);
  const path = variant ? variant : pathKey.startsWith('/') ? pathKey : `/${pathKey}`;
  return withMediaBase(encodeMediaPath(path.startsWith('/') ? path : `/${path}`));
}

/** Folder + file under `/media/...` (local or prefixed with `VITE_MEDIA_BASE_URL`). */
export function mediaUrl(folderName, fileName, options = {}) {
  const path = `/media/${folderName}/${fileName}`;
  return resolveMediaUrl(path, options);
}

/** Pick display URL (variant when available) for an already-resolved carousel or gallery URL. */
export function displayMediaUrl(url, options = {}) {
  return resolveMediaUrl(url, options);
}

/** Exact folder names as they appear inside `Kruler's Media` */
export const KM = {
  elWhereHotel: 'EL WHERE HOTEL',
  elWhereCafe: 'EL WHERE CAFE',
  intermec27: 'Kruler Space · 27-29 Nam Kỳ Khởi Nghĩa — corporate tenant Intermec NEWLY ADDED',
  baia7476: 'Kruler Space · 74-76 Nam Kỳ Khởi Nghĩa — corporate tenant Baia Saigon NEWLY ADDED',
  mVillage232: 'Kruler Space 232.15 Võ Thị Sáu corporate tenants M Village',
  fpt311: 'Kruler Space · 311 Lê Văn Sỹ — corporate tenant FPT NEWLY ADDED',
  lmak132: "Kruler Space · 132A Nguyễn Đình Chính — future corporate tenant L'mak",
  /** Must match the folder name under `Kruler's Media` after sync. A shorter folder `Kruler Village` is also supported — see `generate:property-images` (tried first for that property). */
  krulerVillage874:
    'Kruler Village · 874 Long Phước — Kruler-owned, operated, and managed residential villa compound (biệt thự compound NEWLY ADDED',
  aceClubhouse: 'ACE CLUBHOUSE PICKLEBALL',
  aceSquad: 'Ace Squad Pickleball Social Club',
  aceRecovery: 'Ace Recovery & Wellness Center (floating therapy, ice bath, sauna, swimming pool, personal massage)',
  aceDienGiai: 'Ace Điện Giải (electrolyte effervescent product)',
  hyperdot: 'Hyperdot (pickleball ball brand)',
  krulerHq: 'KRULER HOLDINGS HQ 35.11 Trần Đình Xu',
};
