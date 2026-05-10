import { useState, useEffect } from 'react';

export default function ImageCarousel({ images, interval = 3000, className = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images || images.length === 0) {
    // Render a placeholder if no images are provided
    return (
      <div className={`image-carousel placeholder ${className}`}>
        <div className="placeholder-text">Media Placeholder</div>
      </div>
    );
  }

  return (
    <div className={`image-carousel ${className}`}>
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`media-${idx}`}
          className={`carousel-img ${idx === currentIndex ? 'active' : ''}`}
          loading="lazy"
        />
      ))}
    </div>
  );
}
