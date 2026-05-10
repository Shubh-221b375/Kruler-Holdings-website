import React from 'react';

export default function WhyKruler() {
  return (
    <section className="why-kruler-section">
      <div className="container">
        <div className="why-kruler-header">
          <h2 className="why-title reveal-up">Why Kruler</h2>
          <div className="why-desc reveal-up">
            <p>Your vision deserves more than just a property — it deserves a foundation. We bring strategic thinking, decades of market insight, and a commitment to building lasting value in every project we undertake.</p>
          </div>
        </div>
        
        <div className="why-kruler-video">
          <div className="video-card">
            <video autoPlay muted loop playsInline>
              <source src="/videos/why-us.mp4" type="video/mp4" />
            </video>
            <div className="video-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}
