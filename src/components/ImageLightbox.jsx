import { useEffect } from 'react';

export default function ImageLightbox({ images, index, onClose, onIndexChange }) {
  const safeImages = images?.filter(Boolean) ?? [];
  const len = safeImages.length;
  const i = len === 0 ? 0 : Math.min(Math.max(0, index), len - 1);
  const src = safeImages[i];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (len <= 1 || !onIndexChange) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onIndexChange((i - 1 + len) % len);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        onIndexChange((i + 1) % len);
      }
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onIndexChange, i, len]);

  if (!src || len === 0) return null;

  return (
    <div className="image-lightbox" role="dialog" aria-modal="true" aria-label="Expanded image">
      <button type="button" className="image-lightbox-backdrop" aria-label="Close" onClick={onClose} />
      <div className="image-lightbox-inner">
        <button type="button" className="image-lightbox-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
        {len > 1 && onIndexChange && (
          <>
            <button
              type="button"
              className="image-lightbox-nav image-lightbox-nav--prev"
              aria-label="Previous image"
              onClick={() => onIndexChange((i - 1 + len) % len)}
            >
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
                <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button
              type="button"
              className="image-lightbox-nav image-lightbox-nav--next"
              aria-label="Next image"
              onClick={() => onIndexChange((i + 1) % len)}
            >
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
                <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </>
        )}
        <div className="image-lightbox-frame">
          <img src={src} alt="" className="image-lightbox-img" decoding="async" />
        </div>
        {len > 1 && <p className="image-lightbox-counter">{i + 1} / {len}</p>}
      </div>
    </div>
  );
}
