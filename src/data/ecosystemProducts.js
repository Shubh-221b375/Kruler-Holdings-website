import { mediaUrl, KM } from './mediaPaths';

/**
 * Kruler sports & wellness ecosystem — carousel items + rich copy for `/product/:id` pages.
 * `pageKind`: "product" (consumer SKU tone) vs "experience" (venue / membership tone).
 */
export const ecosystemProducts = [
  {
    id: 'ace-clubhouse',
    num: '01',
    name: 'Ace Clubhouse Pickleball Field',
    pageKind: 'experience',
    categoryLabel: 'Venue & pickleball',
    marqueeWord: 'ACE CLUBHOUSE',
    headline: 'Your home court for serious play and electric nights.',
    pitch:
      'Ace Clubhouse is Kruler’s flagship pickleball field — premium surfacing, pro-grade lighting, and an atmosphere built for leagues, corporate events, and weekend warriors who expect more than a taped gym line.',
    bullets: [
      'Tournament-ready court layout and consistent ball bounce',
      'Evening sessions under crisp lighting — play doesn’t stop at sunset',
      'Built for leagues, brand activations, and private block bookings',
    ],
    highlights: [
      { label: 'Operated by', value: 'Kruler Holdings' },
      { label: 'Ideal for', value: 'Leagues · Events · Training' },
    ],
    images: [
      mediaUrl(KM.aceClubhouse, 'z7796164837280_b93171a722482b62af89ec18139f730f.jpg'),
      mediaUrl(KM.aceClubhouse, 'z7796172366441_016ff79b729727318c89f221ce48cfe3.jpg'),
      mediaUrl(KM.aceClubhouse, 'z7796173074689_5cf46ef040c987bc15ac380a8c1e692f.jpg'),
      mediaUrl(KM.aceClubhouse, 'z7796172017750_96cc1ef3573f5657571d746a857babdc.jpg'),
      mediaUrl(KM.aceClubhouse, 'Screenshot 2026-05-11 095139.png'),
    ],
  },
  {
    id: 'ace-squad',
    num: '02',
    name: 'Ace Squad Pickleball Social Club',
    pageKind: 'experience',
    categoryLabel: 'Community & membership',
    marqueeWord: 'ACE SQUAD',
    headline: 'Where pickleball people actually want to hang out after the match.',
    pitch:
      'Ace Squad is the social layer of the Ace universe — curated sessions, friendly competition, and a calendar that feels like a club, not a spreadsheet. Built for players who want connection as much as cardio.',
    bullets: [
      'Member-first programming — social ladders, mixers, and themed nights',
      'Beginner-friendly onboarding so first-timers feel welcome fast',
      'The same Kruler standard you see across our owned venues',
    ],
    highlights: [
      { label: 'Format', value: 'Social club · Events' },
      { label: 'Vibe', value: 'Inclusive · Competitive · Fun' },
    ],
    images: [
      mediaUrl(KM.aceSquad, 'ACE Squad Pickleball - tagline.png'),
      mediaUrl(KM.aceSquad, 'z7812743692514_e65e067c4b193d70a32b11642288c864.jpg'),
      mediaUrl(KM.aceSquad, 'z7812743706320_2d80d6d11f699fd5995e0d2bbddb3621.jpg'),
    ],
  },
  {
    id: 'ace-recovery',
    num: '03',
    name: 'Ace Recovery & Wellness Center',
    desc: 'Floating therapy · Ice bath · Sauna · Swimming pool · Personal massage',
    pageKind: 'experience',
    categoryLabel: 'Recovery & spa',
    marqueeWord: 'ACE RECOVERY',
    headline: 'Recover like you train — with intent, science, and stillness.',
    pitch:
      'Ace Recovery is Kruler’s wellness anchor: floating therapy, contrast pools, sauna, and hands-on bodywork in one calm environment. It exists so athletes and operators can reset the nervous system, not just “relax for an hour.”',
    bullets: [
      'Contrast protocols — cold plunge, heat, and guided recovery flows',
      'Floating therapy for deep rest and sensory reset',
      'Personal massage and hydro experiences under one roof',
    ],
    highlights: [
      { label: 'Signature', value: 'Float · Ice · Heat · Pool' },
      { label: 'For', value: 'Athletes · Teams · Everyday stress' },
    ],
    images: [
      mediaUrl(KM.aceRecovery, '7c1ea1d81f09564419121d7aaa4ef8b2.jpg'),
      mediaUrl(KM.aceRecovery, 'dfb1e6b3fb952727a91d856d39bc0f83.jpg'),
    ],
  },
  {
    id: 'ace-dien-giai',
    num: '04',
    name: 'Ace Điện Giải',
    desc: 'Electrolyte effervescent product',
    pageKind: 'product',
    categoryLabel: 'Hydration you can feel',
    marqueeWord: 'ACE ĐIỆN GIẢI',
    headline: 'Effervescent electrolytes built for sweat, sun, and long days on court.',
    pitch:
      'Ace Điện Giải is Kruler’s consumer hydration play — a crisp effervescent formula that replaces what you lose when you move. Drop a tablet, watch it fizz, and get back to playing sharp without the sugar crash of typical sports drinks.',
    bullets: [
      'Electrolyte balance tuned for active lifestyles — not just “flavored water”',
      'Portable format — stash a tube in your bag and you are covered',
      'Pairs perfectly with Ace Squad sessions and outdoor pickleball days',
    ],
    highlights: [
      { label: 'Format', value: 'Effervescent tablets' },
      { label: 'Best for', value: 'Training · Heat · Travel' },
    ],
    images: [
      mediaUrl(KM.aceDienGiai, '555527878_122129694158951219_6381192580088487352_n.jpg'),
      mediaUrl(KM.aceDienGiai, '556766124_122129936540951219_8441292616681957493_n.jpg'),
      mediaUrl(KM.aceDienGiai, '559269090_122132969342951219_4380205877606970263_n.jpg'),
      mediaUrl(KM.aceDienGiai, '584472686_122140961132951219_673617603428335029_n.jpg'),
      mediaUrl(KM.aceDienGiai, 'Logo WH BG.png'),
    ],
  },
  {
    id: 'hyperdot',
    num: '05',
    name: 'Hyperdot',
    desc: 'Pickleball ball brand',
    pageKind: 'product',
    categoryLabel: 'Official-feel pickleball',
    marqueeWord: 'HYPERDOT',
    headline: 'The ball that keeps its shape — so your game stays honest.',
    pitch:
      'Hyperdot is Kruler’s pickleball ball brand: consistent bounce, durable seam feel, and visibility you notice under lights. If you have ever chased a wobble off the paddle, you already know why a serious ball matters.',
    bullets: [
      'Engineered for predictable flight — fewer “mystery” hops at net',
      'Outdoor-ready durability without a rock-hard dead feel',
      'Built for players who log hours — not novelty packaging',
    ],
    highlights: [
      { label: 'Use case', value: 'Outdoor · Club · Training' },
      { label: 'Identity', value: 'Kruler-owned brand' },
    ],
    images: [
      mediaUrl(KM.hyperdot, 'z7789220597283_cae43942dc5a2f31a6d120d7f19c954b.jpg'),
      mediaUrl(KM.hyperdot, 'Screenshot 2026-05-11 102436.png'),
    ],
  },
];

/** Carousel: same shape StackedCarousel expects */
export const ecosystemCarouselItems = ecosystemProducts.map(
  ({ id, num, name, desc, images }) => ({
    id,
    num,
    name,
    desc,
    images,
  })
);

export function getEcosystemProductById(id) {
  return ecosystemProducts.find((p) => p.id === id) ?? null;
}
