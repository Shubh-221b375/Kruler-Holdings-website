import ImageCarousel from './ImageCarousel';

const sections = [
  {
    id: "philosophy",
    label: "THE ACE PHILOSOPHY",
    title: "Sport as Social\nInfrastructure",
    content: "Kruler approaches sport and wellness as interconnected pillars of modern living. Sport serves as social infrastructure — where communities are built. Recovery acts as performance support — where bodies are maintained. Our proprietary products complete the loop.",
    brand: "Ace",
    images: ['/media/ACE SQUAD PICKLEBALL/ACE Squad Pickleball.png', '/media/ACE CLUBHOUSE PICKLEBALL/z7796172017750_96cc1ef3573f5657571d746a857babdc.jpg']
  },
  {
    id: "clubhouse",
    label: "ACE CLUBHOUSE",
    title: "The Premium\nPickleball Venue",
    content: "Located at 90 Song Hành Xa Lộ Hà Nội, Ace Clubhouse offers premium courts, exclusive membership tiers, dynamic events, training programs, corporate team-building packages, and high-visibility sponsorship opportunities.",
    brand: "Ace Clubhouse",
    images: ['/media/ACE CLUBHOUSE PICKLEBALL/z7796164837280_b93171a722482b62af89ec18139f730f.jpg', '/media/ACE CLUBHOUSE PICKLEBALL/z7796166449986_df400c36a0a0278896ad0749decf778d.jpg', '/media/ACE CLUBHOUSE PICKLEBALL/z7796167560419_aae07d9670f46f7071004041bb4855f5.jpg']
  },
  {
    id: "squad",
    label: "ACE SQUAD",
    title: "The Pickleball\nSocial Club",
    content: "Curated skill-level play groups, weekly games, competitive tournaments, social nights, corporate networking programs, and member spotlights. Ace Squad is where players become a community.",
    brand: "Ace Squad",
    images: ['/media/ACE SQUAD PICKLEBALL/ACE Squad Pickleball - Black.png', '/media/ACE SQUAD PICKLEBALL/ACE Squad Pickleball - White.png']
  },
  {
    id: "recovery",
    label: "ACE RECOVERY",
    title: "Recovery as\nPerformance",
    content: "Floating therapy, ice bath, sauna, swimming pool, and personal massage — all under one roof. Tailored packages, memberships, and corporate wellness programs. Seamlessly cross-sold to Ace Squad and Ace Clubhouse members.",
    brand: "Ace Recovery",
    images: ['/media/Ace Recovery/1.jpg', '/media/Ace Recovery/2.jpg']
  },
  {
    id: "dien-giai",
    label: "ACE ĐIỆN GIẢI",
    title: "Hydration\nEngineered for Athletes",
    content: "The Ace electrolyte effervescent product. Designed for active individuals — before, during, or after exertion. Available in convenient formats. Retail and wholesale inquiries welcome.",
    brand: "Ace Điện Giải",
    images: ['/media/ACE ĐIỆN GIẢI/z7243177252298_f166eac3ab86090ccc161388ee42cd4d (2).jpg']
  },
  {
    id: "cross-sell",
    label: "THE CLOSED LOOP",
    title: "One Ecosystem,\nFour Brands",
    content: "Ace Clubhouse members feed into Ace Squad. Ace Squad players use Ace Recovery to stay at their peak. All groups hydrate with Ace Điện Giải. The ecosystem is one seamless closed loop — entirely Kruler-owned.",
    brand: "All Four Brands",
    images: ['/media/Ace Cross Sell/1.jpg', '/media/Ace Cross Sell/2.jpg']
  }
];

export default function SportsWellness() {
  return (
    <section className="sports-wellness-section" id="sports-wellness">

      {/* ── Hero ── */}
      <div className="sports-hero">
        <div className="sports-hero-bg">
          <ImageCarousel
            images={['/media/ACE CLUBHOUSE PICKLEBALL/z7796167560419_aae07d9670f46f7071004041bb4855f5.jpg', '/media/EL WHERE HOTEL LOGO/DUC_6443.jpg']}
            interval={5000}
          />
        </div>
        <div className="sports-hero-content reveal-up">
          <p className="sports-hero-label">KRULER SPORTS &amp; WELLNESS</p>
          <h2 className="sports-hero-title">The Ace Ecosystem</h2>
          <p className="sports-hero-subtitle">An old-money sports universe — built for those who play, recover, and repeat.</p>
          <span className="associated-brand">Associated brand: Ace (the umbrella)</span>
        </div>
      </div>

      {/* ── Sub-Sections ── */}
      <div className="container">
        <div className="sports-sections-list">
          {sections.map((sec, idx) => (
            <div className={`sports-item ${idx % 2 === 1 ? 'reverse' : ''}`} key={sec.id}>
              <div className="sports-item-media reveal-up">
                <ImageCarousel images={sec.images} interval={3500 + idx * 300} />
              </div>
              <div className="sports-item-content reveal-up">
                <p className="section-label">{sec.label}</p>
                <h3>{sec.title.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</h3>
                <p>{sec.content}</p>
                <span className="associated-brand">Associated brand: {sec.brand}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA Cluster ── */}
        <div className="sports-cta-cluster">
          <a href="#query" className="btn-round primary"><span>Book a court</span></a>
          <a href="#query" className="btn-round"><span>Join Ace Squad</span></a>
          <a href="#query" className="btn-round"><span>Book a recovery session</span></a>
          <a href="#query" className="btn-round"><span>Become a sponsor</span></a>
        </div>
      </div>

    </section>
  );
}
