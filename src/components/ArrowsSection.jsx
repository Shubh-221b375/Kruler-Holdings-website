export default function ArrowsSection() {
  return (
    <section className="arrows-section">
      <div className="container">
        <div className="arrows-title">
          <h2>This isn't just <span className="em">about property.</span></h2>
        </div>
        <div className="arrows-grid">
          {[1, 2, 3, 4].map(i => (
            <div className="arrows-item" key={i}>
              <img src={`/images/arrow-${i}.jpg`} alt="" />
            </div>
          ))}
        </div>
        <div className="arrows-text">
          <p>It's about legacy. Growth. Creating something that outlasts you. You're not just investing in real estate.{' '}
            <span className="em">You're building the future. That's what we help you shape.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
