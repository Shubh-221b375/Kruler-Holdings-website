import { ArrowIcon } from './Header';

const services = [
  {
    num: '01',
    label: 'Develop',
    text: 'Ground-up development backed by deep local knowledge, strategic site selection, and world-class design partnerships — delivering landmark properties across District 1 and District 3.',
    img: '/images/buy.jpg',
  },
  {
    num: '02',
    label: 'Invest',
    text: 'Structured investment opportunities with transparent reporting, proven returns, and hands-on project management. Your capital, our expertise, shared success.',
    img: '/images/sell.jpg',
  },
  {
    num: '03',
    label: 'Manage',
    text: 'Full-service property management for commercial and residential assets. From tenant relations to maintenance, we protect and grow your investment around the clock.',
    img: '/images/rent.jpg',
  },
];

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="services-header">
          <div className="services-caption">Services</div>
          <div className="services-title">
            <h2>How Kruler<br /><span className="em">Can Help You</span></h2>
          </div>
        </div>
      </div>
      <div className="services-items">
        {services.map(s => (
          <div className="service-item" key={s.num}>
            <div className="service-item-bg">
              <img src={s.img} alt={s.label} />
            </div>
            <div className="service-item-inner">
              <div className="service-item-num">{s.num}</div>
              <div className="service-item-text">
                <h3>{s.text}</h3>
              </div>
              <div className="service-item-more">
                <span>{s.label}</span>
                <ArrowIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container">
        <div className="services-brief">
          Our integrated team guides you through every stage of development and investment{' '}
          <span className="em">with expert knowledge and reliable support.</span>
        </div>
        <div className="services-action">
          <button className="btn-round" type="button">
            <span>Get Started with Kruler</span>
            <ArrowIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
