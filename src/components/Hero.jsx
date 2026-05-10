import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowIcon } from './Header';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef(null);
  const stickyRef = useRef(null);
  const contentRef = useRef(null);
  const houseRef = useRef(null);
  const houseImgRef = useRef(null);
  const brandLayerRef = useRef(null);
  const brandOutlineRef = useRef(null);
  const brandSubRef = useRef(null);
  const smokeRef = useRef(null);
  const cloudsRef = useRef(null);
  const whiteOverlayRef = useRef(null);
  const backRef = useRef(null);
  const circleMaskRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const ctx = gsap.context(() => {
      gsap.set(root, { visibility: 'visible' });

      /* ── Main scroll-driven timeline ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: false,
        },
      });

      // Phase 1: Headline exit
      tl.to(contentRef.current, {
        opacity: 0,
        y: -150,
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.in',
      }, 0);

      // Phase 2: Building rise and zoom
      tl.to(houseRef.current, {
        y: '-32vh',
        duration: 0.5,
        ease: 'power2.inOut',
      }, 0);

      tl.to(houseImgRef.current, {
        scale: 1.55,
        duration: 0.6,
        ease: 'power1.inOut',
      }, 0);

      tl.to(backRef.current, {
        scale: 1.35,
        duration: 0.8,
        ease: 'none',
      }, 0);

      // Phase 3: Circle Mask expansion
      tl.fromTo(circleMaskRef.current,
        { r: 0 },
        { r: '200%', duration: 0.4, ease: 'power3.inOut' },
        0.05
      );

      // Phase 4: Brand Text Parallax Overlap
      tl.fromTo(brandOutlineRef.current,
        { opacity: 0, y: 100, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' },
        0.15
      );

      tl.fromTo(brandLayerRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0.35
      );

      tl.to(brandOutlineRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      }, 0.5);

      tl.fromTo(brandSubRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        0.55
      );

      // Phase 5: Smoke & Clouds
      tl.to(smokeRef.current, {
        y: '-40vh',
        opacity: 0,
        duration: 0.5,
      }, 0);

      tl.to(cloudsRef.current, {
        y: '-50vh',
        opacity: 0.2,
        duration: 0.6,
      }, 0);

      // Final Fade
      tl.to(whiteOverlayRef.current, {
        opacity: 1,
        duration: 0.15,
        ease: 'power2.inOut',
      }, 0.9);

    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={rootRef} style={{ visibility: 'hidden' }}>
      <div className="hero-sticky" ref={stickyRef}>
        <div className="hero-back">
          <img ref={backRef} src="/images/back.jpg" alt="" />
        </div>

        <div className="hero-house" ref={houseRef}>
          <img ref={houseImgRef} src="/images/house.png" alt="Property" />
        </div>

        <div className="hero-clouds" ref={cloudsRef}>
          <div className="hero-cloud"><img src="/images/cloud.png" alt="" /></div>
          <div className="hero-cloud"><img src="/images/cloud.png" alt="" /></div>
        </div>

        <div className="hero-smoke" ref={smokeRef}>
          <img src="/images/smoke.png" alt="" />
        </div>

        {/* Brand Outline Layer */}
        <div className="hero-brand-outline" ref={brandOutlineRef}>
          <svg className="hero-outline-svg" viewBox="0 0 1200 500">
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="hero-outline-text">
              KRULER
            </text>
          </svg>
        </div>

        {/* Brand Masked Layer */}
        <div className="hero-brand-mask" ref={brandLayerRef}>
          <svg className="hero-mask-svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <mask id="heroTextMask">
                <rect width="100%" height="100%" fill="white" />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="hero-mask-text" fill="black">
                  KRULER
                </text>
              </mask>
              <mask id="heroCircleMask">
                <circle ref={circleMaskRef} cx="50%" cy="50%" r="0" fill="white" />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="#f5f3f0" mask="url(#heroTextMask)" />
          </svg>
          <div className="hero-brand-sub" ref={brandSubRef}>
            HOLDINGS
          </div>
        </div>

        {/* Hero Content (Initial State) */}
        <div className="hero-content" ref={contentRef}>
          <div className="container">
            <h1>Discover Your Legacy</h1>
            <p className="hero-subtitle">
              Visionary development. <strong>Strategic investments.</strong>{' '}
              <span className="em">A portfolio built to endure.</span>
            </p>
            <div className="hero-actions">
              <a href="#query" className="btn-round hero-btn">
                <span>Get In Touch</span>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="hero-white-overlay" ref={whiteOverlayRef} />
      </div>
    </section>
  );
}
