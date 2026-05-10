export default function WhySection() {
  return (
    <section className="why-section" id="about">
      <div className="container">
        <div className="why-grid">
          <div className="why-title">
            <h2>Why Kruler</h2>
          </div>
          <div className="why-text">
            Your vision deserves more than just a property — it deserves a foundation.{' '}
            <span className="em">
              We bring strategic thinking, decades of market insight, and a commitment to building lasting value in every project we undertake.
            </span>
          </div>
        </div>
        <div className="why-video">
          <video src="/videos/why-us.mp4" autoPlay playsInline loop muted />
        </div>
      </div>
    </section>
  );
}
