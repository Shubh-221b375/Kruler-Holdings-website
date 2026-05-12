import { mediaUrl, KM } from './mediaPaths';

/**
 * NETWORK marquee — `fallbackSrcs` tried in order if the primary `src` fails (404, CORS, or empty decode).
 */
export const brandItems = [
  { src: mediaUrl(KM.elWhereHotel, 'EL Where_logo-05 (1).png'), alt: 'EL Where Hotel' },
  { src: mediaUrl(KM.elWhereCafe, 'Copy of elcafe-logo-symbol-57 (1).jpg'), alt: 'EL Where Café' },
  {
    src: mediaUrl(KM.aceSquad, 'ACE Squad Pickleball - tagline.png'),
    alt: 'Ace Squad',
    fallbackSrcs: [
      mediaUrl(KM.aceSquad, 'ACE Squad Pickleball.png'),
      mediaUrl(KM.aceSquad, 'z7812743706320_2d80d6d11f699fd5995e0d2bbddb3621.jpg'),
    ],
  },
  {
    src: mediaUrl(KM.hyperdot, 'z7789220597283_cae43942dc5a2f31a6d120d7f19c954b.jpg'),
    alt: 'Hyperdot',
    fallbackSrcs: [mediaUrl(KM.hyperdot, '1.jpg')],
  },
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
