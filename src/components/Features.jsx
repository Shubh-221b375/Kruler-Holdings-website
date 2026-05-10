import { ArrowIcon } from './Header';

const features = [
  {
    title: 'Asset Management',
    text: 'Maximizing returns on your property portfolio with strategic oversight.',
    img: '/images/mortgage.jpg',
  },
  {
    title: 'Property Operations',
    text: 'Let us handle the details so you can enjoy the rewards.',
    img: '/images/property-management.jpg',
  },
  {
    title: 'Construction & Development',
    text: 'Guiding projects from blueprint to handover with expert precision.',
    img: '/images/development.jpg',
  },
];

export default function Features() {
  return (
    <section className="features-section">
      <div className="container">
        <div className="features-grid">
          <div>
            <div className="features-title">
              <h2>Support<br />Beyond <span className="em">Building</span><br /><span className="em">and Selling</span></h2>
            </div>
          </div>
          <div>
            <div className="features-text">
              <p>The real estate market never stands still — and neither do we.{' '}
                <span className="em">Our experts offer continued support beyond the sale, helping you maximize your investment.</span>
              </p>
            </div>
            <div className="features-actions">
              <a className="btn-round dark" href="#services">
                <span>Discover Our Services</span>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="features-items">
          {features.map(f => (
            <div className="feature-card" key={f.title}>
              <div className="feature-card-bg">
                <img src={f.img} alt={f.title} />
              </div>
              <div className="feature-card-body">
                <h3>{f.title}</h3>
                <p>{f.text}</p>
                <div className="feature-card-more">
                  <button className="btn-round dark" type="button">
                    <span>Learn More</span>
                    <ArrowIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
