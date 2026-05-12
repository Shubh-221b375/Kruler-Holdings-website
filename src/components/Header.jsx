import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLenisScroll } from '../LenisScrollContext';
import { NAVBAR_LOGO_SRC } from '../data/navbarLogo';

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path fill="currentColor" d="m20.78 12.531-6.75 6.75a.75.75 0 1 1-1.06-1.061l5.47-5.47H3.75a.75.75 0 1 1 0-1.5h14.69l-5.47-5.469a.75.75 0 1 1 1.06-1.061l6.75 6.75a.75.75 0 0 1 0 1.061" />
  </svg>
);

export { ArrowIcon };

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const scrollToTop = useLenisScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <div className="header-logo">
          <Link
            to="/"
            onClick={() => scrollToTop?.()}
            className="header-logo-link"
            aria-label="Kruler Holdings — Home"
          >
            <span className="header-logo-graphic-wrap" aria-hidden="true">
              <img
                src={NAVBAR_LOGO_SRC}
                alt=""
                className="header-logo-img"
                width={360}
                height={100}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (el.dataset.fallbackApplied) return;
                  el.dataset.fallbackApplied = '1';
                  el.src = '/logo.svg';
                }}
              />
            </span>
            <span className="header-logo-wordmark" aria-hidden="true">
              KRULER
            </span>
          </Link>
        </div>
        <nav className="header-nav">
          <a href="/#properties">Portfolio</a>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <a className="btn-round" href="#query">
          <span>Get In Touch</span>
          <ArrowIcon />
        </a>
      </div>
    </header>
  );
}

