import { mediaUrl, KM } from './mediaPaths';

/**
 * NETWORK marquee — `fallbackSrcs` tried in order if the primary `src` fails (404, CORS, or empty decode).
 */
export const brandItems = [
  { src: mediaUrl(KM.elWhereHotel, 'EL Where_logo-05 (1).png'), alt: 'EL Where Hotel' },
  { src: mediaUrl(KM.elWhereCafe, 'Copy of elcafe-logo-symbol-57 (1).jpg'), alt: 'EL Where Café' },
  {
    src: mediaUrl(KM.aceClubhouse, 'ACE CLUBHOUSE NEWEST Just LOGO beige.png'),
    alt: 'Ace Clubhouse',
    fallbackSrcs: [
      mediaUrl(KM.aceClubhouse, 'z7796172017750_96cc1ef3573f5657571d746a857babdc.jpg'),
      mediaUrl(KM.aceClubhouse, 'z7796164837280_b93171a722482b62af89ec18139f730f.jpg'),
    ],
  },
  {
    src: mediaUrl(KM.aceSquad, 'ACE Squad Pickleball - tagline.png'),
    alt: 'Ace Squad',
    fallbackSrcs: [
      mediaUrl(KM.aceSquad, 'ACE Squad Pickleball.png'),
      mediaUrl(KM.aceSquad, 'z7812743706320_2d80d6d11f699fd5995e0d2bbddb3621.jpg'),
    ],
  },
  {
    /** logo.png is often white/light on transparent — invisible on dark UI; prefer logo-2 then a color product shot. */
    src: mediaUrl(KM.aceDienGiai, 'logo-2.png'),
    alt: 'Ace Điện Giải',
    fallbackSrcs: [
      mediaUrl(KM.aceDienGiai, 'logo.png'),
      mediaUrl(KM.aceDienGiai, '555527878_122129694158951219_6381192580088487352_n.jpg'),
      mediaUrl(KM.aceDienGiai, '559269090_122132969342951219_4380205877606970263_n.jpg'),
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
