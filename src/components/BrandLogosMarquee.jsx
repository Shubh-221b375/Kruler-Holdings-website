import { brandItemsMarquee } from '../data/brandPartners';

function BrandCell({ item }) {
  if (item.src) {
    return (
      <div className="brands-partners-cell">
        <img src={item.src} alt={item.alt || ''} loading="lazy" decoding="async" fetchPriority="low" referrerPolicy="no-referrer" />
      </div>
    );
  }
  return (
    <div className="brands-partners-cell brands-partners-cell--text">
      <span>{item.label}</span>
    </div>
  );
}

/** NETWORK heading + infinite single-row logo marquee (right → left), above EcosystemIntro. */
export default function BrandLogosMarquee() {
  const row = [...brandItemsMarquee, ...brandItemsMarquee];

  return (
    <section className="brand-logos-marquee-section" id="brands-partners" aria-label="Brands and partners">
      <div className="container">
        <div className="section-header brands-partners-header reveal-up">
          <p className="section-label">NETWORK</p>
          <h2 className="section-title">Brands &amp; Partners</h2>
          <p className="section-subtitle">
            Named operators and Kruler-owned brands across hospitality, sport, wellness, technology, and urban living.
          </p>
        </div>
      </div>

      <div className="brand-logos-marquee-strip" role="region" aria-label="Brand logos marquee">
        <div className="brand-logos-marquee-rail">
          <div className="brand-logos-marquee-track">
            {row.map((item, idx) => (
              <BrandCell key={`${item.src || item.label}-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
