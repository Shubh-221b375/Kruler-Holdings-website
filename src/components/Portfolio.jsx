import { useNavigate } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import StackedCarousel from './StackedCarousel';
import { portfolioCards, developmentCards } from '../data/properties';
import useReveal from '../hooks/useReveal';

function cardHasImages(card) {
  return Array.isArray(card?.images) && card.images.some((u) => u != null && String(u).trim() !== '');
}

export default function Portfolio() {
  const navigate = useNavigate();
  const headerRef1 = useReveal();
  const headerRef2 = useReveal();
  const pipelineCards = developmentCards.filter(cardHasImages);

  return (
    <section className="portfolio-section" id="properties">
      <div className="container">

        {/* ── Section Header ── */}
        <div className="section-header reveal-up" ref={headerRef1}>
          <p className="section-label">KRULER SPACE</p>
          <h2 className="section-title">Real Estate &amp;<br />Development Portfolio</h2>
          <p className="section-subtitle">
            Kruler Space operating portfolio across central Ho Chi Minh City — each asset with named corporate tenants or Kruler-owned operating brands.
          </p>
        </div>

        {/* ── Portfolio Cards ── */}
        <StackedCarousel items={portfolioCards.filter(cardHasImages)} type="portfolio" />

        {/* ── On-Going Development ── */}
        {pipelineCards.length > 0 && (
        <>
        <div className="section-header reveal-up" ref={headerRef2} style={{ marginTop: '9rem' }}>
          <p className="section-label">PIPELINE</p>
          <h2 className="section-title">On-Going Real Estate<br />Development</h2>
          <p className="section-subtitle">Two projects shaping the next chapter — one pre-leased office completion and one residential compound.</p>
        </div>


        <div className="development-grid">
          {pipelineCards.map((card, idx) => (
            <div className="development-card" key={card.id} style={{cursor: 'pointer'}} onClick={() => navigate(`/property/${card.id}`)}>

              <div className="development-card-media">
                <ImageCarousel images={card.images} interval={4000 + idx * 500} />
              </div>
              <div className="development-card-content">
                <p className="card-location">{card.location}</p>
                <h3>{card.title}</h3>
                <p className="card-desc">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
        </>
        )}

      </div>
    </section>
  );
}
