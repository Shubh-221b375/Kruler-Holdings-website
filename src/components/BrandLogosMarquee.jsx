import { useCallback, useMemo, useState } from 'react';
import { brandItemsMarquee } from '../data/brandPartners';

function BrandCell({ item }) {
  const urls = useMemo(() => {
    const list = [item.src, ...(item.fallbackSrcs || [])].filter(Boolean);
    return list;
  }, [item.src, item.fallbackSrcs]);

  /** Index into `urls`; when equal to urls.length, every URL failed — show text. */
  const [attempt, setAttempt] = useState(0);

  const onImgError = useCallback(() => {
    setAttempt((a) => a + 1);
  }, []);

  if (!urls.length) {
    return (
      <div className="brands-partners-cell brands-partners-cell--text">
        <span>{item.alt || item.label}</span>
      </div>
    );
  }

  if (attempt >= urls.length) {
    return (
      <div className="brands-partners-cell brands-partners-cell--text">
        <span>{item.alt || item.label || 'Partner'}</span>
      </div>
    );
  }

  const src = urls[attempt];

  return (
    <div className="brands-partners-cell">
      <img
        key={src}
        src={src}
        alt={item.alt || ''}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        referrerPolicy="no-referrer"
        onError={onImgError}
      />
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
