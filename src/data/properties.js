import { mediaUrl, KM, resolveMediaUrl } from './mediaPaths';
import { generatedPropertyImages } from './generatedPropertyImages.js';

function galleryDedupeKey(resolvedUrl) {
  if (!resolvedUrl) return '';
  try {
    if (/^https?:\/\//i.test(resolvedUrl)) {
      return decodeURIComponent(new URL(resolvedUrl).pathname);
    }
    const p = resolvedUrl.startsWith('/') ? resolvedUrl : `/${resolvedUrl}`;
    return decodeURIComponent(p.split('?')[0]);
  } catch {
    return resolvedUrl;
  }
}

/** Cap merged CDN URLs per property — fewer parallel downloads; raise if you need longer galleries. */
const MAX_GALLERY_URLS = 14;

function imagesForProperty(propertyId, fallbackImages) {
  const gen = generatedPropertyImages[propertyId];
  const genList = Array.isArray(gen) ? gen : [];
  const fbList = Array.isArray(fallbackImages) ? fallbackImages : [];
  /** Prefer fallback URLs first, then generated scan. Dedupe by pathname so the same object is not requested twice. */
  const merged = [];
  const seenPath = new Set();
  for (const u of [...fbList, ...genList]) {
    const r = resolveMediaUrl(u);
    if (!r) continue;
    const key = galleryDedupeKey(r);
    if (!key || seenPath.has(key)) continue;
    seenPath.add(key);
    merged.push(r);
    if (merged.length >= MAX_GALLERY_URLS) break;
  }
  return merged;
}

/** 345/43 Trần Hưng Đạo — hotel & café imagery only (Align Dollhouse is named in copy but uses its own media elsewhere, not mixed here). */
const card345Images = [
  mediaUrl(KM.elWhereHotel, 'ELW_8250.jpg'),
  mediaUrl(KM.elWhereHotel, 'ELW_8303.jpg'),
  mediaUrl(KM.elWhereHotel, 'DUC_6452.jpg'),
  mediaUrl(KM.elWhereHotel, 'ELW_8378-HDR.jpg'),
  mediaUrl(KM.elWhereCafe, 'Copy of MUF_0021.jpg'),
  mediaUrl(KM.elWhereCafe, 'Copy of MUF_0033.jpg'),
  mediaUrl(KM.elWhereCafe, 'Copy of MUF_0086.jpg'),
  mediaUrl(KM.elWhereCafe, 'Copy of MUF_0142.jpg'),
];

const cardIntermecImages = [
  mediaUrl(KM.intermec27, 'kruler-space.jpg'),
  mediaUrl(KM.intermec27, 'retouch-15-1024x576.jpg'),
  mediaUrl(KM.intermec27, 'logo-png-01.png'),
];

const cardBaiaImages = [
  mediaUrl(KM.baia7476, 'baia-saigon-74-nam-ky-khoi-nghia-quan-1-5.webp'),
  mediaUrl(KM.baia7476, 'baia-3.jpg'),
  mediaUrl(KM.baia7476, 'a-toast-to-endless-nights.jpg'),
];

const card232Images = [
  mediaUrl(KM.mVillage232, '1_LIVING_VO_THI_SAU_04a4cef5d7.webp'),
  mediaUrl(KM.mVillage232, '336293654.jpg'),
  mediaUrl(KM.mVillage232, '488080378.jpg'),
];

const cardFptImages = [
  mediaUrl(KM.fpt311, 'photo1623029931315-16230299314801636840282.webp'),
  mediaUrl(KM.fpt311, 'y-nghia-logo-fpt-lan-3.jpg'),
  mediaUrl(KM.fpt311, 'FPT_logo_2010.svg.png'),
];

const lmakPipelineImages = [
  mediaUrl(KM.lmak132, 'b724183f528f404711e1391fa43a36c4.jpg'),
  mediaUrl(KM.lmak132, 'l_mak_logo.jpg'),
  mediaUrl(KM.lmak132, 'logo2.svg'),
];

const krulerVillageFallbackShort = ['1.jpg', '1.png', '2.jpg', '2.png', '3.jpg', '4.webp', '5.webp'].map((f) =>
  mediaUrl('Kruler Village', f)
);

const krulerVillageImages = [
  ...krulerVillageFallbackShort,
  mediaUrl(KM.krulerVillage874, '2e13a141f3c9e7d7bae743b7e556624e.jpg'),
  mediaUrl(KM.krulerVillage874, '96b5dd705ff7f2e6624a3567dc4fbf6a.jpg'),
  mediaUrl(KM.krulerVillage874, 'e1cd1198a4f48b8ccd8c14ca8561d871.jpg'),
  mediaUrl(KM.krulerVillage874, 'e655b3205b64cf81a5009b0f39f5a15a.jpg'),
];

export const portfolioCards = [
  {
    id: '345-43-tran-hung-dao',
    status: 'Operational',
    title: 'Kruler Space · 345/43 Trần Hưng Đạo',
    sub: 'EL Where Hotel · EL Where Café · Align Dollhouse',
    description:
      'Kruler’s owner-operated mixed-use building — Wabi-Sabi-inspired boutique hotel, art-led café, and DTC fashion studio under one envelope.',
    fullDescription:
      'Phường Cầu Ông Lãnh · 280 m² · Owner-operated. Kruler’s owner-operated mixed-use building, fully activated by three Kruler-owned brands under one envelope: EL Where Hotel (Wabi-Sabi-inspired boutique hotel), EL Where Café (art-led café and gathering space), and Align Dollhouse (direct-to-consumer fashion studio). Kruler operates the building itself — not a tenant-led asset. Kruler role: Developer / Owner / Operator.',
    images: imagesForProperty('345-43-tran-hung-dao', card345Images),
  },
  {
    id: '27-29-nam-ky-khoi-nghia',
    status: 'Operational',
    title: 'Kruler Space · 27–29 Nam Kỳ Khởi Nghĩa',
    sub: 'Corporate tenant · InterMec',
    description:
      'A central Bến Thành building occupied by InterMec — a high-tech international medical clinic focused on musculoskeletal and joint-care services.',
    fullDescription:
      'Phường Bến Thành, District 1 · 320 m². A central Bến Thành building occupied by InterMec, a high-tech international medical clinic focused on musculoskeletal and joint-care services. The address operates as part of InterMec’s clinical network in Vietnam, adding a healthcare-services layer to Kruler’s commercial portfolio. Kruler role: Developer / Landlord / Healthcare-service asset partner.',
    images: imagesForProperty('27-29-nam-ky-khoi-nghia', cardIntermecImages),
  },
  {
    id: '74-76-nam-ky-khoi-nghia',
    status: 'Operational',
    title: 'Kruler Space · 74–76 Nam Kỳ Khởi Nghĩa',
    sub: 'Corporate tenant · Baia Saigon',
    description:
      'A District 1 commercial asset leased to Baia Saigon — an independent high-end club and DJ-led entertainment operator anchoring central Saigon nightlife.',
    fullDescription:
      'Phường Bến Thành, District 1 · 960 m². A District 1 commercial asset leased to Baia Saigon, an independent high-end club and DJ-led entertainment operator anchoring central Saigon nightlife. The address sits inside the city’s most concentrated hospitality and tourism corridor. Kruler role: Developer / Landlord / Commercial asset owner.',
    images: imagesForProperty('74-76-nam-ky-khoi-nghia', cardBaiaImages),
  },
  {
    id: '232-15-vo-thi-sau',
    status: 'Operational',
    title: 'Kruler Space · 232/15 Võ Thị Sáu',
    sub: 'M Village · EveryHalf Coffee',
    description:
      'A large-footprint Kruler-developed property operated by M Village and EveryHalf Coffee — one address, two operators, two complementary income streams.',
    fullDescription:
      'Phường Xuân Hòa · 1,500 m² land. A large-footprint Kruler-developed property operated by two corporate tenants: M Village (Vietnamese urban-living and homestay brand) and EveryHalf Coffee (Vietnamese specialty coffee roaster and café). One address, two operators, two complementary income streams. Kruler role: Developer / Landlord / Partner asset owner.',
    images: imagesForProperty('232-15-vo-thi-sau', card232Images),
  },
  {
    id: '311-le-van-sy',
    status: 'Operational',
    title: 'Kruler Space · 311 Lê Văn Sỹ',
    sub: 'Corporate tenant · FPT Corporation',
    description:
      'A commercial property leased to FPT — Vietnam’s largest publicly listed technology corporation — for technology-focused business operations.',
    fullDescription:
      'Phường Tân Sơn Hóa · 600 m² land. A commercial property leased to FPT — Vietnam’s largest publicly listed technology corporation, active across software, IT services, telecommunications, and education — for technology-focused business operations. Kruler role: Developer / Landlord / Commercial asset owner.',
    images: imagesForProperty('311-le-van-sy', cardFptImages),
  },
];

export const developmentCards = [
  {
    id: 'lmak-office-pipeline',
    status: 'Under Construction',
    title: "Kruler Space · 132A Nguyễn Đình Chính",
    location: "Future tenant · L'mak · Phường Phú Nhuận · 1,000 m² land",
    description: 'Pre-leased office asset under construction — L’mak signed as the long-term corporate tenant on completion.',
    fullDescription:
      'An office asset under construction, with L’mak signed as the long-term corporate tenant on completion. A pre-leased development — shaped to the tenant’s operational requirements. Kruler role: Developer / Builder / Future landlord.',
    images: imagesForProperty('lmak-office-pipeline', lmakPipelineImages),
  },
  {
    id: 'kruler-village-long-phuoc',
    status: 'In Development',
    title: 'Kruler Village · 874 Long Phước',
    location: 'Phường Long Phước · 3 hectares · Biệt thự villa compound',
    description:
      'Kruler’s first residential product line — a Kruler-developed, owned, operated, and managed biệt thự villa compound.',
    fullDescription:
      'Our first residential product line — a Kruler-developed, owned, operated, and managed biệt thự villa compound designed for ownership, trading, and long-term community value. Three hectares at Long Phước — owned, operated, and managed end-to-end. Kruler role: Developer / Owner / Operator / Manager.',
    images: imagesForProperty('kruler-village-long-phuoc', krulerVillageImages),
  },
];
