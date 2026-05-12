import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ImageCarousel from './ImageCarousel';
import { mediaUrl, KM } from '../data/mediaPaths';

const sections = [
  {
    id: 'clubhouse',
    label: 'ACE CLUBHOUSE',
    title: 'Ace Clubhouse\nPickleball Field',
    content:
      'Old-money-inspired venue at 90 Song Hành Xa Lộ Hà Nội, Phường Bình Trưng. The physical foundation of Kruler’s sports ecosystem — premium pickleball venue and sports layer.',
    brand: 'Ace Clubhouse',
    images: [
      mediaUrl(KM.aceClubhouse, 'z7796172017750_96cc1ef3573f5657571d746a857babdc.jpg'),
      mediaUrl(KM.aceClubhouse, 'z7796171333698_46067a763a747e76009f7a75dd310794.jpg'),
      mediaUrl(KM.aceClubhouse, 'z7796167560419_aae07d9670f46f7071004041bb4855f5.jpg'),
    ],
  },
  {
    id: 'squad',
    label: 'ACE SQUAD',
    title: 'Ace Squad\nPickleball Social Club',
    content:
      'Skill-organised social club for sporty professionals — competition, networking, and lifestyle membership. The community node that connects play to the wider Ace platform.',
    brand: 'Ace Squad',
    images: [
      mediaUrl(KM.aceSquad, 'z7812743706320_2d80d6d11f699fd5995e0d2bbddb3621.jpg'),
      mediaUrl(KM.aceSquad, 'ACE Squad Pickleball - tagline.png'),
    ],
  },
  {
    id: 'recovery',
    label: 'ACE RECOVERY & WELLNESS',
    title: 'Ace Recovery\n& Wellness Center',
    content:
      'Floating therapy, ice bath, sauna, swimming pool, personal massage — open to Ace members and the city. Wellness and recovery engineered for athletic performance.',
    brand: 'Ace Recovery',
    images: [
      mediaUrl(KM.aceRecovery, '7c1ea1d81f09564419121d7aaa4ef8b2.jpg'),
      mediaUrl(KM.aceRecovery, 'dfb1e6b3fb952727a91d856d39bc0f83.jpg'),
    ],
  },
  {
    id: 'dien-giai',
    label: 'ACE ĐIỆN GIẢI',
    title: 'Ace Điện Giải',
    content:
      'Effervescent electrolyte product designed to replenish minerals lost during physical activity and sport — the hydration node of the Ace loop.',
    brand: 'Ace Điện Giải',
    images: [
      mediaUrl(KM.aceDienGiai, '559269090_122132969342951219_4380205877606970263_n.jpg'),
      mediaUrl(KM.aceDienGiai, '568246639_122134935494951219_6002775709767710468_n.jpg'),
    ],
  },
  {
    id: 'hyperdot',
    label: 'HYPERDOT',
    title: 'Hyperdot',
    content:
      'Pickleball ball brand supplying Ace’s own venues and external markets — equipment that closes the ecosystem loop.',
    brand: 'Hyperdot',
    images: [
      mediaUrl(KM.hyperdot, 'z7789220597283_cae43942dc5a2f31a6d120d7f19c954b.jpg'),
      mediaUrl(KM.hyperdot, 'Screenshot 2026-05-11 102436.png'),
    ],
  },
];

const heroImages = [
  mediaUrl(KM.aceClubhouse, 'Screenshot 2026-05-11 095139.png'),
  mediaUrl(KM.aceClubhouse, 'z7796164837280_b93171a722482b62af89ec18139f730f.jpg'),
];

export default function SportsWellness() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const mediaEls = root.querySelectorAll('.sports-parallax-inner');
    const onMove = (e) => {
      const { clientX, clientY } = e;
      mediaEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (clientX - cx) / (r.width || 1);
        const dy = (clientY - cy) / (r.height || 1);
        gsap.to(el, {
          rotateY: dx * 6,
          rotateX: -dy * 5,
          x: dx * 8,
          y: dy * 6,
          duration: 0.6,
          ease: 'power2.out',
          transformPerspective: 1100,
        });
      });
    };

    const onLeave = () => {
      mediaEls.forEach((el) => {
        gsap.to(el, { rotateY: 0, rotateX: 0, x: 0, y: 0, duration: 0.8, ease: 'power3.out' });
      });
    };

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    return () => {
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section className="sports-wellness-section" id="sports-wellness" ref={sectionRef}>
      <div className="sports-hero">
        <div className="sports-hero-bg">
          <ImageCarousel images={heroImages} interval={5000} />
        </div>
        <div className="sports-hero-content reveal-up">
          <p className="sports-hero-label">KRULER SPORTS &amp; WELLNESS</p>
          <h2 className="sports-hero-title">The Ace Ecosystem</h2>
          <p className="sports-hero-subtitle">
            Ace is not a pickleball court. It is a closed-loop sports and wellness platform — venue, community, recovery centre,
            and two owned products. Kruler owns every node of the loop.
          </p>
          <span className="associated-brand">Kruler-owned platform: Ace</span>
        </div>
      </div>

      <div className="container">
        <div className="sports-sections-list">
          {sections.map((sec, idx) => (
            <div className={`sports-item ${idx % 2 === 1 ? 'reverse' : ''}`} key={sec.id}>
              <div className="sports-item-media reveal-up">
                <div className="sports-parallax-inner">
                  <ImageCarousel images={sec.images} interval={3800 + idx * 280} />
                </div>
              </div>
              <div className="sports-item-content reveal-up">
                <p className="section-label">{sec.label}</p>
                <h3>
                  {sec.title.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h3>
                <p>{sec.content}</p>
                <span className="associated-brand">Associated brand: {sec.brand}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="sports-cta-cluster">
          <a href="#query" className="btn-round primary">
            <span>Book a court</span>
          </a>
          <a href="#query" className="btn-round">
            <span>Join Ace Squad</span>
          </a>
          <a href="#query" className="btn-round">
            <span>Book recovery</span>
          </a>
          <a href="#query" className="btn-round">
            <span>Become a sponsor</span>
          </a>
        </div>
      </div>
    </section>
  );
}
