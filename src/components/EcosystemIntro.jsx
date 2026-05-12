import StackedCarousel from './StackedCarousel';
import { ecosystemCarouselItems } from '../data/ecosystemProducts';

export default function EcosystemIntro() {
  return (
    <section className="ecosystem-intro-section" id="ecosystem-intro">
      <div className="container">
        <div className="section-header reveal-up">
          <p className="section-label">KRULER-OWNED &amp; OPERATED</p>
          <h2 className="section-title">
            Sports &amp; Wellness
            <br />
            Ecosystem
          </h2>
          <p className="section-subtitle">
            The Ace ecosystem — Kruler&apos;s owned sports-and-wellness universe. Five Kruler-owned brands — Ace Clubhouse, Ace
            Squad, Ace Recovery, Ace Điện Giải, and Hyperdot — built around one venue, one community, and two consumer products.
          </p>
        </div>

        <StackedCarousel items={ecosystemCarouselItems} type="node" detailBasePath="/product" />

        <div className="cta-cluster">
          <a href="#query" className="btn-round primary">
            <span>Explore Opportunities</span>
          </a>
          <a href="#properties" className="btn-round">
            <span>View Portfolio</span>
          </a>
          <a href="#sports-wellness" className="btn-round">
            <span>Enter Sports &amp; Wellness</span>
          </a>
        </div>
      </div>
    </section>
  );
}
