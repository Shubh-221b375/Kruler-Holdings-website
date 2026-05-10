import React from 'react';
import MarqueeText from './MarqueeText';
import ImageCarousel from './ImageCarousel';
import { ArrowIcon } from './Header';

const PageHero = ({ title, subtitle, label }) => (
  <section className="property-detail-hero">
    <div className="container">
      <p className="section-label">{label}</p>
      <h1 className="detail-title">{title}</h1>
      <div className="detail-divider" />
      <p className="detail-lead">{subtitle}</p>
    </div>
  </section>
);

export function About() {
  return (
    <div className="property-detail-page">
      {/* ── Visual Hero ── */}
      <section className="about-hero">
        <div className="about-hero-video">
          <video autoPlay muted loop playsInline>
            <source src="/videos/why-us.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay" />
        </div>
        <div className="container about-hero-content">
          <p className="section-label">OUR LEGACY</p>
          <h1 className="about-title">Built to <br /><span>Endure</span></h1>
          <p className="about-subtitle">Kruler Holdings is more than a developer. We are curators of time, space, and experience.</p>
        </div>
      </section>

      <MarqueeText text="ESTABLISHED 2026" speed={1.2} direction={1} color="rgba(255,255,255,0.05)" />

      {/* ── Story Section 1 ── */}
      <section className="about-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2 className="story-heading">A Visionary Approach</h2>
              <p>Founded with a vision to redefine the real estate landscape in Ho Chi Minh City, Kruler Holdings has grown into a multi-disciplinary powerhouse. We don't just develop properties; we curate ecosystems that foster community, productivity, and wellness.</p>
              <p>Our approach is rooted in "Old Money" principles—quality over quantity, patience over speculation, and craftsmanship over convenience. From boutique hotels to state-of-the-art office spaces, every project under the Kruler banner is a testament to our commitment to enduring value.</p>
            </div>
            <div className="story-media">
               <div className="story-img-wrapper">
                 <img src="/media/EL WHERE HOTEL LOGO/ELW_8250.jpg" alt="Legacy" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy Section ── */}
      <section className="about-philosophy">
        <div className="container">
           <div className="philosophy-grid">
             <div className="phi-card" style={{ backgroundImage: 'url("/media/74-76 Nam Ky Khoi Nghia/1.jpg")' }}>
                <div className="phi-card-overlay" />
                <div className="phi-card-content">
                  <span className="phi-num">01</span>
                  <h3>Strategic Foresight</h3>
                  <p>We anticipate urban shifts and invest in locations with long-term cultural and economic significance.</p>
                </div>
             </div>
             <div className="phi-card" style={{ backgroundImage: 'url("/media/EL WHERE HOTEL LOGO/DUC_6452.jpg")' }}>
                <div className="phi-card-overlay" />
                <div className="phi-card-content">
                  <span className="phi-num">02</span>
                  <h3>Design Excellence</h3>
                  <p>Minimalist, functional, and timeless. We collaborate with world-class architects to create iconic spaces.</p>
                </div>
             </div>
             <div className="phi-card" style={{ backgroundImage: 'url("/media/Lmak Office/building.jpg")' }}>
                <div className="phi-card-overlay" />
                <div className="phi-card-content">
                  <span className="phi-num">03</span>
                  <h3>Operational Rigor</h3>
                  <p>We don't just build; we manage. Every Kruler-operated brand ensures a consistent, premium experience.</p>
                </div>
             </div>
           </div>
        </div>
      </section>

      <MarqueeText text="QUALITY · PATIENCE · CRAFT" speed={1.8} direction={-1} color="rgba(186,160,119,0.1)" />

      {/* ── Image Showcase ── */}
      <section className="about-showcase">
        <div className="container">
           <div className="showcase-grid">
              <img src="/media/EL WHERE CAFE/Copy of MUF_0021 (1).jpg" alt="" className="parallax-img" />
              <div className="showcase-text">
                 <h2>Curating <br/>Lifestyles</h2>
                 <p>Beyond bricks and mortar, Kruler Holdings creates the fabric of daily life—where you wake up, where you work, and where you thrive.</p>
              </div>
              <img src="/media/Mvillage/2.jpg" alt="" className="parallax-img" />
           </div>
        </div>
      </section>
    </div>
  );
}


export function Services() {
  return (
    <div className="property-detail-page">
      {/* ── Services Hero ── */}
      <section className="about-hero" style={{ height: '70vh' }}>
        <div className="about-hero-video">
          <img src="/media/Lmak Office/building.jpg" alt="Services" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div className="video-overlay" style={{ background: 'rgba(0,0,0,0.7)' }} />
        </div>
        <div className="container about-hero-content">
          <p className="section-label">WHAT WE DO</p>
          <h1 className="about-title">Expertise & <br /><span>Management</span></h1>
          <p className="about-subtitle">End-to-end real estate solutions and comprehensive brand management.</p>
        </div>
      </section>

      <MarqueeText text="DEVELOPMENT · ASSETS · LIFESTYLE" speed={1.5} direction={1} color="rgba(255,255,255,0.05)" />

      {/* ── Service Items ── */}
      <section className="about-story" style={{ background: 'var(--bg-dark)' }}>
        <div className="container">
          <div className="story-grid">
            <div className="story-media">
               <div className="story-img-wrapper" style={{ aspectRatio: '16/9' }}>
                 <img src="/media/232-15 Vo Thi Sau/1.jpg" alt="Development" />
               </div>
            </div>
            <div className="story-content">
              <span className="phi-num">CORE SERVICE</span>
              <h2 className="story-heading">Real Estate Development</h2>
              <p>Full-cycle development from site acquisition and feasibility to architectural design and construction management. We identify high-potential sites and transform them into landmark properties that define the skyline.</p>
            </div>
          </div>

          <div className="story-grid" style={{ marginTop: '10rem', direction: 'rtl' }}>
            <div className="story-media" style={{ direction: 'ltr' }}>
               <div className="story-img-wrapper" style={{ aspectRatio: '16/9' }}>
                 <img src="/media/Lmak Office/lobby.jpg" alt="Asset Management" />
               </div>
            </div>
            <div className="story-content" style={{ direction: 'ltr' }}>
              <span className="phi-num">STRATEGIC OVERSIGHT</span>
              <h2 className="story-heading">Asset Management</h2>
              <p>Strategic oversight of commercial and residential portfolios to maximize yield and ensure long-term appreciation. Our team employs data-driven insights to optimize operational performance and tenant retention.</p>
            </div>
          </div>

          <div className="story-grid" style={{ marginTop: '10rem' }}>
            <div className="story-media">
               <div className="story-img-wrapper" style={{ aspectRatio: '16/9' }}>
                 <img src="/media/EL WHERE HOTEL LOGO/DUC_6443.jpg" alt="Hospitality" />
               </div>
            </div>
            <div className="story-content">
              <span className="phi-num">BRANDED ECOSYSTEMS</span>
              <h2 className="story-heading">Hospitality & Lifestyle</h2>
              <p>Creation and operation of unique F&B and hospitality brands, including EL Where Café and EL Where Hotel. We build the communities that inhabit our spaces, ensuring every touchpoint reflects the Kruler standard of excellence.</p>
            </div>
          </div>
        </div>
      </section>

      <MarqueeText text="THE KRULER STANDARD" speed={2.5} direction={-1} color="rgba(186,160,119,0.1)" />
    </div>
  );
}



export function Contact() {
  return (
    <div className="property-detail-page contact-page">
      <section className="about-hero contact-hero">
        <div className="about-hero-video">
          <img
            src="/media/Lmak Office/lobby.jpg"
            alt=""
            className="contact-hero-img"
          />
          <div className="video-overlay contact-hero-overlay" />
        </div>
        <div className="container about-hero-content">
          <p className="section-label">CONNECT</p>
          <h1 className="about-title">
            Let&apos;s <br />
            <span>Begin</span>
          </h1>
          <p className="about-subtitle">
            Investment, partnerships, leasing, and bespoke property enquiries—our team responds to every conversation with discretion and intent.
          </p>
        </div>
      </section>

      <MarqueeText
        text="KRULER · HO CHI MINH · DISTRICT 1"
        speed={1.35}
        direction={1}
        color="rgba(255,255,255,0.06)"
      />

      <section className="contact-intro">
        <div className="container">
          <p className="section-label">PRIVATE ENQUIRIES</p>
          <h2 className="contact-section-title">
            A doorway to <span>what&apos;s next</span>
          </h2>
          <p className="contact-lead">
            Share your vision—we&apos;ll arrange the right conversation, whether you are exploring a first acquisition or scaling an institutional portfolio across the Kruler ecosystem.
          </p>
        </div>
      </section>

      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-column">
              <div className="contact-card">
                <span className="contact-card-num">01</span>
                <h3>Headquarters</h3>
                <p>
                  345/43 Trần Hưng Đạo, District 1
                  <br />
                  Ho Chi Minh City, Vietnam
                </p>
              </div>
              <div className="contact-card">
                <span className="contact-card-num">02</span>
                <h3>Direct line</h3>
                <p>
                  <a href="mailto:vuonga.dang@gmail.com" className="contact-inline-link">
                    vuonga.dang@gmail.com
                  </a>
                </p>
                <p className="contact-card-note">We aim to reply within two business days.</p>
              </div>
              <div className="contact-card">
                <span className="contact-card-num">03</span>
                <h3>Studio hours</h3>
                <p>
                  Monday — Friday
                  <br />
                  09:00 — 18:00 (ICT)
                </p>
                <p className="contact-card-note">Site tours by appointment.</p>
              </div>
            </div>

            <div className="contact-form-column" id="query">
              <div className="contact-form-shell">
                <div className="contact-form-header">
                  <p className="section-label">ENQUIRY</p>
                  <h3 className="contact-form-title">Tell us what you&apos;re building</h3>
                  <p className="contact-form-sub">
                    Fields marked with context help us route your note to the right director.
                  </p>
                </div>
                <form
                  className="contact-enquiry-form"
                  action="https://formspree.io/f/mqakovge"
                  method="POST"
                >
                  <div className="contact-form-row">
                    <label className="contact-field">
                      <span>Name</span>
                      <input type="text" name="name" placeholder="Full name" required autoComplete="name" />
                    </label>
                    <label className="contact-field">
                      <span>Email</span>
                      <input
                        type="email"
                        name="_replyto"
                        placeholder="you@company.com"
                        required
                        autoComplete="email"
                      />
                    </label>
                  </div>
                  <div className="contact-form-row">
                    <label className="contact-field">
                      <span>Phone</span>
                      <input type="tel" name="phone" placeholder="+84 · optional" autoComplete="tel" />
                    </label>
                    <label className="contact-field">
                      <span>I&apos;m interested in</span>
                      <select name="topic" defaultValue="" required>
                        <option value="" disabled>
                          Select a focus
                        </option>
                        <option value="investment">Investment &amp; acquisitions</option>
                        <option value="partnership">Partnership &amp; joint venture</option>
                        <option value="leasing">Leasing &amp; tenancy</option>
                        <option value="hospitality">Hospitality &amp; operations</option>
                        <option value="general">General enquiry</option>
                      </select>
                    </label>
                  </div>
                  <label className="contact-field contact-field-full">
                    <span>Message</span>
                    <textarea
                      name="message"
                      placeholder="Project scope, timeline, or questions—we read every detail."
                      rows="6"
                      required
                    />
                  </label>
                  <button type="submit" className="contact-submit-btn">
                    <span>Submit enquiry</span>
                    <ArrowIcon />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-map-section">
        <div className="container">
          <p className="section-label">LOCATION</p>
          <h2 className="story-heading contact-map-heading">
            District 1, <span>Ho Chi Minh City</span>
          </h2>
          <p className="contact-map-lead">
            Our studio sits on Trần Hưng Đạo—minutes from the financial core and the cultural pulse of Saigon.
          </p>
          <div className="contact-map-frame">
            <iframe
              title="Kruler Holdings — 345/43 Trần Hưng Đạo, District 1, Ho Chi Minh City"
              src="https://www.google.com/maps?q=345+Tran+Hung+Dao+District+1+Ho+Chi+Minh+City+Vietnam&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <MarqueeText
        text="CONNECT · COLLABORATE · GROW"
        speed={1.6}
        direction={-1}
        color="rgba(186,160,119,0.12)"
      />
    </div>
  );
}

