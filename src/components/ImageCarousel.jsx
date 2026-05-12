import { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';

/** Ring distance for “load current ± N slides” when a gallery is large (limits parallel megabyte downloads). */
function ringDistance(idx, current, n) {
  if (n <= 1) return 0;
  const forward = (idx - current + n) % n;
  const backward = (current - idx + n) % n;
  return Math.min(forward, backward);
}

/**
 * @param {boolean} [fetchEnabled=true] Set false for stacked carousel slides that are not centered — they skip network until activated.
 */
export default function ImageCarousel({
  images,
  interval = 3000,
  className = '',
  enableExpand = false,
  onExpandClick,
  fetchEnabled = true,
}) {
  const rootRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [badUrls, setBadUrls] = useState(() => new Set());

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const syncNearViewport = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      if (r.top < vh + 720 && r.bottom > -720) setInView(true);
    };
    syncNearViewport();
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { root: null, rootMargin: '600px 0px 800px 0px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setBadUrls(new Set());
    setCurrentIndex(0);
  }, [images]);

  const goodImages = useMemo(
    () => (Array.isArray(images) ? images.filter((url) => url && !badUrls.has(url)) : []),
    [images, badUrls]
  );

  useEffect(() => {
    if (!goodImages.length) return;
    setCurrentIndex((i) => (i >= goodImages.length ? 0 : i));
  }, [goodImages]);

  const readyToFetch = inView && fetchEnabled;
  const n = goodImages.length;

  const shouldAttachSrc = (idx) => {
    if (!readyToFetch) return false;
    if (n <= 6) return true;
    return ringDistance(idx, currentIndex, n) <= 1;
  };

  useEffect(() => {
    if (!goodImages.length || !readyToFetch || goodImages.length <= 1) return undefined;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % goodImages.length);
    }, interval);
    return () => clearInterval(timer);
  }, [goodImages, interval, readyToFetch]);

  if (!goodImages.length) {
    return null;
  }

  const rootClass = ['image-carousel', className, enableExpand ? 'image-carousel--expandable' : ''].filter(Boolean).join(' ');

  return (
    <div className={rootClass} ref={rootRef}>
      {goodImages.map((img, idx) => {
        const attached = shouldAttachSrc(idx);
        const isActive = idx === currentIndex;
        return (
          <img
            key={`${img}-${idx}`}
            src={attached ? img : undefined}
            alt=""
            className={`carousel-img ${isActive ? 'active' : ''}`}
            sizes="(max-width: 768px) 100vw, min(960px, 90vw)"
            loading={attached && isActive ? 'eager' : 'lazy'}
            fetchPriority={attached && isActive ? 'high' : attached ? 'low' : undefined}
            decoding="async"
            referrerPolicy="no-referrer"
            role={enableExpand && isActive ? 'button' : undefined}
            tabIndex={enableExpand && isActive ? 0 : undefined}
            onError={() => {
              if (!attached) return;
              setBadUrls((prev) => {
                const next = new Set(prev);
                next.add(img);
                return next;
              });
            }}
            onClick={(e) => {
              if (!enableExpand || !onExpandClick || !isActive) return;
              e.stopPropagation();
              onExpandClick();
            }}
            onKeyDown={(e) => {
              if (!enableExpand || !onExpandClick || !isActive) return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onExpandClick();
              }
            }}
          />
        );
      })}
    </div>
  );
}
