import { mediaUrl, KM } from './mediaPaths';

/**
 * NETWORK marquee — full-color marks & lifestyle shots (no white-field logo comps, no UI screenshots).
 * Paths must exist under the same `media/` tree on S3 as elsewhere.
 */
export const brandItems = [
  { src: mediaUrl(KM.elWhereHotel, 'EL Where_logo-05 (1).png'), alt: 'EL Where Hotel' },
  { src: mediaUrl(KM.elWhereCafe, 'Copy of elcafe-logo-symbol-57 (1).jpg'), alt: 'EL Where Café' },
  { src: mediaUrl(KM.aceClubhouse, 'ACE CLUBHOUSE NEWEST Just LOGO beige.png'), alt: 'Ace Clubhouse' },
  /** Full-color mark (avoid `ACE Squad Pickleball.png` if S3 key differs — tagline asset is a reliable fallback). */
  { src: mediaUrl(KM.aceSquad, 'ACE Squad Pickleball - tagline.png'), alt: 'Ace Squad' },
  { src: mediaUrl(KM.aceDienGiai, 'logo.png'), alt: 'Ace Điện Giải' },
  { src: mediaUrl(KM.hyperdot, 'z7789220597283_cae43942dc5a2f31a6d120d7f19c954b.jpg'), alt: 'Hyperdot' },
  { src: mediaUrl(KM.baia7476, 'baia-logo.jpg'), alt: 'Baia Saigon' },
  { src: mediaUrl(KM.intermec27, 'logo-png-01.png'), alt: 'InterMec' },
  { src: mediaUrl(KM.fpt311, 'y-nghia-logo-fpt-lan-3.jpg'), alt: 'FPT' },
  { src: mediaUrl(KM.mVillage232, 'logo-mvillage-b.png'), alt: 'M Village' },
];

/** Drop entries whose URL looks like a white-box logo comp or a screen grab (defensive if list is edited later). */
export function brandItemAllowedInMarquee(item) {
  if (!item?.src) return false;
  const s = String(item.src);
  if (/WH\s*BG|Screenshot\s+20|Screenshot%20/i.test(s)) return false;
  if (/Pickleball\s*-\s*White\.png/i.test(s) || /White\.png/i.test(s)) return false;
  return true;
}

export const brandItemsMarquee = brandItems.filter(brandItemAllowedInMarquee);
