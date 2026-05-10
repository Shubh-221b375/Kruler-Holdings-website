import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';

export default function StackedCarousel({ items, type = 'portfolio' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const handleCardClick = (index, id) => {
    if (index === activeIndex && id) {
      navigate(`/property/${id}`);
    } else {
      setActiveIndex(index);
    }
  };

  const getCardStyles = (index) => {
    const total = items.length;
    let diff = index - activeIndex;

    // Handle wrap-around for circular carousel
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);
    
    // Scale: Middle card (absDiff=0) is 1.15, others decrease
    const scale = 1.15 - (absDiff * 0.15);
    
    // Responsive translation: use smaller step on mobile
    const isMobile = windowWidth <= 768;
    const step = isMobile ? 180 : 280;
    const translateX = diff * step; 
    
    // Z-index: Higher for center
    const zIndex = 10 - absDiff;
    
    // Blur: Increase with distance from center
    const blur = absDiff * 3;
    
    // Opacity: Fade out cards further away
    const opacity = 1 - (absDiff * 0.3);

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      zIndex: Math.max(0, Math.floor(zIndex)),
      filter: `blur(${blur}px)`,
      opacity: Math.max(0, opacity),
      visibility: absDiff > 2 ? 'hidden' : 'visible'
    };
  };


  return (
    <div className="stacked-carousel-wrapper">
      <div className="stacked-carousel-container">
        {items.map((item, idx) => (
          <div 
            className={`stacked-card ${idx === activeIndex ? 'active' : ''}`}
            key={idx}
            style={getCardStyles(idx)}
            onClick={() => handleCardClick(idx, item.id)}
          >
            <div className={`${type}-card`}>
              <div className={`${type}-card-media`}>
                <ImageCarousel images={item.images} interval={3500 + idx * 200} />
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
        <button onClick={handlePrev} className="nav-btn prev" aria-label="Previous">
          <svg viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        <div className="nav-dots">
          {items.map((_, i) => (
            <button 
              key={i} 
              className={`dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
        <button onClick={handleNext} className="nav-btn next" aria-label="Next">
          <svg viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>
      </div>
    </div>
  );
}
