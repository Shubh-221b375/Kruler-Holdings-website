import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';

function itemHasImageUrls(item) {
  return Array.isArray(item?.images) && item.images.some((u) => u != null && String(u).trim() !== '');
}

export default function StackedCarousel({
  items,
  type = 'portfolio',
  onGalleryImageClick,
  /** When set, active-card click navigates here + `/${id}` (default `/property` for portfolio). */
  detailBasePath = '/property',
}) {
  const visibleItems = useMemo(() => (Array.isArray(items) ? items.filter(itemHasImageUrls) : []), [items]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const n = visibleItems.length;

  useEffect(() => {
    setActiveIndex((i) => Math.min(Math.max(0, i), Math.max(0, n - 1)));
  }, [n]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = useCallback(() => {
    if (n <= 0) return;
    setActiveIndex((prev) => (prev + 1) % n);
  }, [n]);

  const handlePrev = useCallback(() => {
    if (n <= 0) return;
    setActiveIndex((prev) => (prev - 1 + n) % n);
  }, [n]);

  const handleCardClick = (index, id) => {
    if (index === activeIndex && id) {
      const base = String(detailBasePath || '/property').replace(/\/+$/, '') || '/property';
      navigate(`${base}/${id}`);
    } else {
      setActiveIndex(index);
    }
  };

  const getCardStyles = (index) => {
    const total = n;
    if (total <= 0) return {};
    let diff = index - activeIndex;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);

    const scale = 1.15 - absDiff * 0.15;

    const isMobile = windowWidth <= 768;
    const isNarrow = windowWidth <= 420;
    const step = isNarrow ? 132 : isMobile ? 148 : 280;
    const translateX = diff * step;

    const zIndex = 10 - absDiff;

    /** Keep side/corner cards readable: no whole-card blur (it hid imagery). Depth = scale + translate + card shadow. */
    const blur = 0;

    const opacity = Math.max(0.78, 1 - absDiff * 0.09);

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      zIndex: Math.max(0, Math.floor(zIndex)),
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
      opacity,
      visibility: absDiff > 2 ? 'hidden' : 'visible',
    };
  };

  if (n === 0) {
    return null;
  }

  const ringAbs = (idx) => {
    let d = idx - activeIndex;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return Math.abs(d);
  };

  return (
    <div className="stacked-carousel-wrapper">
      <div className="stacked-carousel-container">
        {visibleItems.map((item, idx) => (
          <div
            className={`stacked-card ${idx === activeIndex ? 'active' : ''}`}
            key={item.id ?? `${type}-${idx}`}
            style={getCardStyles(idx)}
            onClick={() => handleCardClick(idx, item.id)}
          >
            <div className={`${type}-card`}>
              <div className={`${type}-card-media`}>
                <ImageCarousel
                  images={item.images}
                  interval={3500 + idx * 200}
                  fetchEnabled={ringAbs(idx) <= 2}
                  enableExpand={type === 'gallery'}
                  onExpandClick={
                    type === 'gallery' ? () => onGalleryImageClick?.(item.galleryIndex ?? idx) : undefined
                  }
                />
              </div>
              {type !== 'gallery' && (
                <div className={`${type}-card-content`}>
                  {item.sub && <p className="card-sub">{item.sub}</p>}
                  {item.num && <span className="node-num">{item.num}</span>}
                  {item.location && <p className="card-location">{item.location}</p>}
                  <h3>{item.title || item.name}</h3>
                  <p className="card-desc">{item.description || item.desc}</p>
                  {idx === activeIndex && item.id && (
                    <div className="view-more-hint">
                      <span>Click to view details</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-nav">
        <button type="button" onClick={handlePrev} className="nav-btn prev" aria-label="Previous">
          <svg viewBox="0 0 24 24" width="32" height="32">
            <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <div className="nav-dots">
          {visibleItems.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button type="button" onClick={handleNext} className="nav-btn next" aria-label="Next">
          <svg viewBox="0 0 24 24" width="32" height="32">
            <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
