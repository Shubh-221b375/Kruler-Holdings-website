import { Link } from 'react-router-dom';
import InquiryForm, { NewsletterSignup } from './InquiryForm';
import { NAVBAR_LOGO_SRC } from '../data/navbarLogo';
import { useLenisScroll } from '../LenisScrollContext';

export default function Footer() {
  const scrollToTop = useLenisScroll();
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-newsletter-title">Subscribe to our Newsletter</div>
            <NewsletterSignup />
          </div>
          <div className="footer-query-col" id="query">
            <div className="footer-newsletter-title">Send a Query</div>
            <InquiryForm variant="footer" />
          </div>
        </div>

        <div className="footer-links">
          <nav className="footer-nav">
            <a href="#properties">Properties</a>
            <a href="#about">About Us</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="footer-socials">
            <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>

        <div className="footer-brand">
          <Link to="/" className="footer-brand-link" aria-label="Kruler Holdings — Home" onClick={() => scrollToTop?.()}>
            <img
              src={NAVBAR_LOGO_SRC}
              alt=""
              className="footer-brand-img"
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
            <span className="footer-brand-wordmark">Kruler Holdings</span>
          </Link>
        </div>

        <div className="footer-bottom">
          <div className="footer-sublinks">
            <a href="#">Terms</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div>Copyright © 2026</div>
        </div>
      </div>
    </footer>
  );
}
