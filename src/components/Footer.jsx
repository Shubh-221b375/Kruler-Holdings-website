import { ArrowIcon } from './Header';

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-newsletter-title">Subscribe to our Newsletter</div>
            <form className="footer-newsletter-form" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Enter email address" />
              <button type="submit" aria-label="Subscribe">
                <ArrowIcon />
              </button>
            </form>
          </div>
          <div className="footer-query-col" id="query">
            <div className="footer-newsletter-title">Send a Query</div>
            <form 
              className="footer-query-form" 
              action="https://formspree.io/f/mqakovge" 
              method="POST"
            >
              <div className="footer-form-row">
                <input type="text" name="name" placeholder="Name" required />
                <input type="email" name="_replyto" placeholder="Email" required />
              </div>
              <textarea name="message" placeholder="Your Message" rows="2" required></textarea>
              <button type="submit" className="footer-submit-btn">
                <span>Send Message</span>
                <ArrowIcon />
              </button>
            </form>
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

        <div className="footer-logo">KRULER</div>

        <div className="footer-bottom">
          <div className="footer-sublinks">
            <a href="#">Terms</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div>Kruler Holdings</div>
          <div>Copyright © 2026</div>
        </div>
      </div>
    </footer>
  );
}
