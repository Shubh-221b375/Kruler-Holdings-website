import { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import { displayMediaUrl, resolveMediaUrl } from '../data/mediaPaths';

/** Ring distance for “load current ± N slides” (limits parallel megabyte downloads). */
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
      if (r.top < vh + 280 && r.bottom > -280) setInView(true);
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
      { root: null, rootMargin: '200px 0px 280px 0px', threshold: 0 }
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
    if (n <= 1) return true;
    return ringDistance(idx, currentIndex, n) <= 1;
  };

  /** Warm only the next slide so crossfade is ready without a download burst. */
  useEffect(() => {
    if (!readyToFetch || n < 2) return undefined;
    const nextUrl = goodImages[(currentIndex + 1) % n];
    if (!nextUrl) return undefined;
    const im = new Image();
    im.referrerPolicy = 'no-referrer';
    im.src = displayMediaUrl(nextUrl, { width: 960 });
    return undefined;
  }, [currentIndex, goodImages, n, readyToFetch]);

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
        const src = attached ? displayMediaUrl(img, { width: isActive ? 1280 : 960 }) : undefined;
        return (
          <img
            key={`${img}-${idx}`}
            src={src}
            alt=""
            className={`carousel-img ${isActive ? 'active' : ''}`}
            sizes="(max-width: 768px) 100vw, min(720px, 88vw)"
            loading={attached && isActive ? 'eager' : 'lazy'}
            fetchPriority={attached && isActive ? 'high' : attached ? 'low' : undefined}
            decoding="async"
            referrerPolicy="no-referrer"
            role={enableExpand && isActive ? 'button' : undefined}
            tabIndex={enableExpand && isActive ? 0 : undefined}
            onError={(e) => {
              if (!attached) return;
              const el = e.currentTarget;
              if (el.dataset.fallback !== '1') {
                const original = resolveMediaUrl(img);
                if (original && el.src !== original) {
                  el.dataset.fallback = '1';
                  el.src = original;
                  return;
                }
              }
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
