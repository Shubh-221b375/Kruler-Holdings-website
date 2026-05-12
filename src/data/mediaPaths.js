/**
 * Media under `public/media/` is synced from `Kruler's Media/` (see scripts/sync-kruler-media.mjs).
 * For production CDN, set `VITE_MEDIA_BASE_URL` (no trailing slash), e.g. your CloudFront or S3 website URL.
 * Upload the same folder tree as `public/media/` to the bucket under prefix `media/` (see scripts/print-s3-media-sync.mjs).
 *
 * Vercel: `vercel.json` rewrites `/media/*` to this bucket so relative `/media/...` URLs still work if the build
 * omitted `VITE_MEDIA_BASE_URL`. Change that rewrite if you switch buckets.
 */
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

/** Folder + file under `/media/...` (local or prefixed with `VITE_MEDIA_BASE_URL`). */
export function mediaUrl(folderName, fileName) {
  const path = `/media/${encodeURIComponent(folderName)}/${encodeURIComponent(fileName)}`;
  return withMediaBase(path);
}

/**
 * Resolves a path from `generatedPropertyImages` or any `/media/...` string to a full URL when CDN base is set.
 */
export function resolveMediaUrl(pathOrUrl) {
  if (pathOrUrl == null || pathOrUrl === '') return '';
  const s = String(pathOrUrl);
  if (/^https?:\/\//i.test(s)) return s;
  const path = s.startsWith('/') ? s : `/${s}`;
  return withMediaBase(path);
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
