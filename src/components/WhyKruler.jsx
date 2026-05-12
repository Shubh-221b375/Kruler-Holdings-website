import React from 'react';

export default function WhyKruler() {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    // Only play video when it's near the viewport to save resources
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      });
    }, { threshold: 0.1 });

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

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
            <video 
              ref={videoRef}
              muted 
              loop 
              playsInline 
              preload="none"
              style={{ background: '#000', opacity: 0, transition: 'opacity 1s' }}
              onCanPlay={(e) => e.target.style.opacity = 1}
            >
              <source src="/videos/why-kruler-hcmc.mp4" type="video/mp4" />
            </video>
            <div className="video-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

