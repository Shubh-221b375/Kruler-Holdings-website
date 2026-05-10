import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MarqueeText from './MarqueeText';

const serviceDetails = {
  develop: {
    title: "Develop",
    subtitle: "Landmark Properties, Defined by Design.",
    desc: "From strategic land acquisition to world-class architectural selection, Kruler's development arm is built on a foundation of local expertise and global standards.",
    fullDesc: "We don't just build buildings; we build legacies. Our development process is a rigorous journey of site selection, feasibility analysis, and partnership with the world's most innovative architects. Every project in our portfolio is a testament to our commitment to District 1 and District 3's urban fabric.",
    img: "/media/services/ELW_8623-HDR.jpg",
    whyUs: [
      "Strategic Site Selection",
      "World-Class Design Partnerships",
      "Sustainable Construction Standards",
      "Local Regulatory Expertise"
    ]
  },
  invest: {
    title: "Invest",
    subtitle: "Transparent Growth, Shared Success.",
    desc: "Kruler provides structured investment opportunities with a focus on risk mitigation and high-yield returns in the premium commercial sector.",
    fullDesc: "Your capital deserves an expert foundation. We offer institutional-grade reporting, proven performance metrics, and a hands-on approach to asset management. Our investors are partners in our vision to reshape the skyline of Ho Chi Minh City.",
    img: "/media/services/invest_bg.jpg",
    whyUs: [
      "Institutional Grade Reporting",
      "Proven Yield Performance",
      "Direct Asset Management",
      "Portfolio Diversification"
    ]
  },
  manage: {
    title: "Manage",
    subtitle: "Full-Service Asset Stewardship.",
    desc: "Kruler's management division ensures that every property operates at peak efficiency while maintaining the highest standards of tenant relations.",
    fullDesc: "A property's value is sustained through meticulous care. From high-end residential villas to corporate office towers, we provide 24/7 maintenance, proactive tenant leasing, and optimized operational strategies that protect and grow your investment.",
    img: "/media/services/336293654.jpg",
    whyUs: [
      "24/7 Operational Support",
      "Proactive Tenant Relations",
      "Efficiency Optimization",
      "Long-term Value Preservation"
    ]
  }
};

const testimonials = [
  {
    name: "Jonathan Chen",
    role: "CEO, L'mak Global",
    text: "Kruler's attention to detail during the development phase of our headquarters was unparalleled. They delivered a landmark building that perfectly represents our brand."
  },
  {
    name: "Sarah Nguyen",
    role: "Principal Investor",
    text: "Investing with Kruler has been the most transparent and rewarding experience in my real estate portfolio. Their reporting is world-class."
  },
  {
    name: "Marcus Wong",
    role: "Corporate Tenant, Baia Saigon",
    text: "The management team at Kruler is exceptional. They treat our business premises with the same care as their own flagship properties."
  }
];

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = serviceDetails[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) return <div className="container" style={{padding:'10rem'}}>Service not found.</div>;

  return (
    <div className="service-detail-page">
      <section className="service-hero">
        <div className="service-hero-bg">
          <img src={service.img} alt={service.title} />
          <div className="hero-overlay" />
        </div>
        <div className="container service-hero-content">
          <button onClick={() => navigate('/')} className="back-btn-minimal">
            <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>
            <span>Back to Services</span>
          </button>
          <p className="section-label reveal-up visible">OUR EXPERTISE</p>
          <h1 className="service-main-title">{service.title}</h1>
          <p className="service-subtitle">{service.subtitle}</p>
        </div>
      </section>

      <MarqueeText text={service.title} speed={1.2} direction={1} color="rgba(255,255,255,0.05)" />

      <section className="service-info-section">
        <div className="container">
          <div className="service-info-grid">
            <div className="info-main">
               <h2 className="info-heading">Strategy & Impact</h2>
               <p className="info-lead">{service.desc}</p>
               <p className="info-body">{service.fullDesc}</p>
            </div>
            <div className="info-side">
               <div className="info-meta-card">
                  <h3 className="meta-card-title">Why Choose Us</h3>
                  <ul className="why-us-list">
                    {service.whyUs.map((item, idx) => (
                      <li key={idx}>
                        <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="section-header center">
            <p className="section-label">CLIENT VOICES</p>
            <h2 className="section-title">Trusted by Industry Leaders</h2>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div className="testimonial-card" key={idx}>
                <div className="quote-icon">"</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <p className="author-name">{t.name}</p>
                  <p className="author-role">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
