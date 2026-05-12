import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEcosystemProductById } from '../data/ecosystemProducts';
import MarqueeText from './MarqueeText';
import ImageLightbox from './ImageLightbox';

const ENQUIRY_TO = { pathname: '/', hash: '#query' };

export default function EcosystemProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const product = getEcosystemProductById(id);

  useEffect(() => {
    setLightboxIndex(null);
  }, [id]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '10rem 2rem', textAlign: 'center' }}>
        <h2>Experience not found</h2>
        <button type="button" onClick={() => navigate('/')} className="btn-round" style={{ marginTop: '2rem' }}>
          Back home
        </button>
      </div>
    );
  }

  const isProduct = product.pageKind === 'product';
  const heroImg = product.images?.[0];
  const ctaPrimary = 'Enquire';
  const ctaSub = isProduct
    ? 'Stockist, club pack, or personal stash — tell us what you want to buy.'
    : 'Leagues, memberships, recovery passes, and partnerships — we will tailor a reply.';

  return (
    <div className="ecosystem-product-page" data-page-kind={product.pageKind}>
      <section className="ep-hero">
        <div className="ep-hero-bg">
          {heroImg ? (
            <button
              type="button"
              className="ep-hero-bg-expand"
              aria-label="View full image"
              onClick={() => setLightboxIndex(0)}
            >
              <img src={heroImg} alt={product.name} loading="eager" fetchPriority="high" decoding="async" />
            </button>
          ) : null}
          <div className="ep-hero-gradient" />
          <div className="ep-hero-noise" aria-hidden />
        </div>

        <div className="container ep-hero-inner">
          <button
            type="button"
            onClick={() => navigate({ pathname: '/', hash: '#ecosystem-intro' })}
            className="back-btn-minimal"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
            </svg>
            <span>Ecosystem</span>
          </button>

          <p className="ep-kicker reveal-up visible">
            <span className="ep-num">{product.num}</span>
            {product.categoryLabel}
          </p>
          <h1 className="ep-title">{product.name}</h1>
          {product.desc ? <p className="ep-subline">{product.desc}</p> : null}
          <p className="ep-headline">{product.headline}</p>

          <div className="ep-hero-cta">
            <Link to={ENQUIRY_TO} className="btn-round primary ep-btn-glow">
              <span>{ctaPrimary}</span>
            </Link>
            <Link to={ENQUIRY_TO} className="btn-round ep-btn-ghost">
              <span>Request pricing &amp; availability</span>
            </Link>
          </div>
          <p className="ep-cta-note">{ctaSub}</p>
        </div>
      </section>

      <MarqueeText
        text={product.marqueeWord || product.name.toUpperCase()}
        speed={1.15}
        direction={1}
        color="rgba(255,255,255,0.04)"
      />

      <section className="ep-section ep-pitch">
        <div className="container">
          <div className="ep-pitch-grid">
            <div className="ep-pitch-copy">
              <p className="section-label">Why it exists</p>
              <h2 className="ep-section-title">{isProduct ? 'Built to sell out, not sit on a shelf.' : 'Kruler-owned. Operator-grade.'}</h2>
              <p className="ep-pitch-text">{product.pitch}</p>
              <ul className="ep-bullet-list">
                {product.bullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <Link to={ENQUIRY_TO} className="ep-inline-cta">
                Enquire
                <span className="ep-inline-cta-arrow" aria-hidden>
                  →
                </span>
              </Link>
            </div>
            <aside className="ep-spec-card">
              <p className="ep-spec-card-label">At a glance</p>
              <ul className="ep-spec-rows">
                {product.highlights.map((row) => (
                  <li key={row.label}>
                    <span className="ep-spec-k">{row.label}</span>
                    <span className="ep-spec-v">{row.value}</span>
                  </li>
                ))}
              </ul>
              <div className="ep-spec-card-footer">
                <p>Kruler Holdings — Sports &amp; Wellness ecosystem</p>
                <Link to={ENQUIRY_TO} className="btn-round primary ep-spec-cta">
                  <span>Enquire</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="ep-section ep-gallery-section">
        <div className="container">
          <div className="section-header center">
            <p className="section-label">Gallery</p>
            <h2 className="section-title">{isProduct ? 'See the product in the wild' : 'Spaces & moments'}</h2>
            <p className="section-subtitle ep-gallery-sub">
              Tap any image to expand. Ready to move forward? Use the enquiry form — we respond to serious buyers and partners first.
            </p>
          </div>
          <div className="ep-gallery-grid">
            {product.images.slice(0, 16).map((src, i) => (
              <button
                key={src}
                type="button"
                className="ep-gallery-tile"
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={src}
                  alt={`${product.name} — ${i + 1}`}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={i < 2 ? 'high' : 'low'}
                  referrerPolicy="no-referrer"
                />
                <span className="ep-gallery-zoom-hint">View</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="ep-section ep-final-cta">
        <div className="container ep-final-inner">
          <div className="ep-final-copy">
            <h2 className="ep-final-title">{isProduct ? 'Want it on your shelf or in your bag?' : 'Want this in your city or your calendar?'}</h2>
            <p className="ep-final-lead">
              {isProduct
                ? 'Tell us quantity, timeline, and whether you are retail, club, or personal — we will come back with next steps.'
                : 'Tell us dates, group size, or partnership angle — our team routes enquiries directly to the right operator.'}
            </p>
          </div>
          <div className="ep-final-actions">
            <Link to={ENQUIRY_TO} className="btn-round primary ep-btn-glow ep-btn-large">
              <span>{ctaPrimary}</span>
            </Link>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && product.images.length > 0 ? (
        <ImageLightbox
          images={product.images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={product.images.length > 1 ? setLightboxIndex : undefined}
        />
      ) : null}
    </div>
  );
}
