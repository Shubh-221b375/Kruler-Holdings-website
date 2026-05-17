import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { portfolioCards, developmentCards } from '../data/properties';
import { displayMediaUrl } from '../data/mediaPaths';
import StackedCarousel from './StackedCarousel';
import MarqueeText from './MarqueeText';
import ImageLightbox from './ImageLightbox';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const property = [...portfolioCards, ...developmentCards].find(p => p.id === id);

  useEffect(() => {
    setLightboxIndex(null);
  }, [id]);

  if (!property) {
    return (
      <div className="container" style={{ padding: '10rem 2rem', textAlign: 'center' }}>
        <h2>Property not found</h2>
        <button onClick={() => navigate('/')} className="btn-round" style={{marginTop: '2rem'}}>Back Home</button>
      </div>
    );
  }

  // Prepare gallery items for StackedCarousel
  const galleryItems = property.images
    .map((img, idx) => ({
      id: `${property.id}-view-${idx}`,
      galleryIndex: idx,
      title: `${property.title} - View ${idx + 1}`,
      description: property.title,
      images: [img],
    }))
    .filter((item) => item.images[0] && String(item.images[0]).trim());

  return (
    <div className="property-detail-page">
      {/* ── Cinematic Hero ── */}
      <section className="property-hero">
        <div className="property-hero-bg">
          <button
            type="button"
            className="property-hero-bg-expand"
            aria-label="View full image"
            onClick={() => setLightboxIndex(0)}
          >
            {property.images?.[0] ? (
              <img
                src={displayMediaUrl(property.images[0], { width: 1280 })}
                alt={property.title}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            ) : null}
          </button>
          <div className="hero-overlay" />
        </div>
        
        <div className="container property-hero-content">
          <button onClick={() => navigate('/')} className="back-btn-minimal">
            <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>
            <span>Portfolio</span>
          </button>
          
          <p className="section-label reveal-up visible">{property.sub || property.location}</p>
          <h1 className="property-main-title">{property.title}</h1>
        </div>
      </section>

      <MarqueeText text={property.title} speed={1.2} direction={1} color="rgba(255,255,255,0.05)" />

      {/* ── Info Section ── */}
      <section className="property-info-section">
        <div className="container">
          <div className="property-info-grid">
            <div className="info-main">
               <h2 className="info-heading">Project Overview</h2>
               <p className="info-lead">{property.description}</p>
               <p className="info-body">{property.fullDescription}</p>
            </div>
            <div className="info-side">
               <div className="info-meta-card">
                  <div className="meta-row">
                    <span className="meta-label">STATUS</span>
                    <span className="meta-value">
                      {property.status ?? (property.location ? 'Under Construction' : 'Operational')}
                    </span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">MANAGEMENT</span>
                    <span className="meta-value">Kruler Holdings</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">ASSET CLASS</span>
                    <span className="meta-value">{property.sub || 'Commercial'}</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <MarqueeText text="VISUAL PORTFOLIO" speed={2} direction={-1} color="rgba(186,160,119,0.1)" />

      {galleryItems.length > 0 && (
      <section className="detail-gallery-section">
        <div className="container">
          <div className="section-header center">
            <p className="section-label">GALLERY</p>
            <h2 className="section-title">Architectural Details</h2>
          </div>
          
          <div className="gallery-container">
            <StackedCarousel items={galleryItems} type="gallery" onGalleryImageClick={(i) => setLightboxIndex(i)} />
          </div>
        </div>
      </section>
      )}
      {lightboxIndex !== null && property.images.length > 0 && (
        <ImageLightbox
          images={property.images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={property.images.length > 1 ? setLightboxIndex : undefined}
        />
      )}
    </div>
  );
}
