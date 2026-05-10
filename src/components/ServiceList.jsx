import React from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: "develop",
    num: "01",
    title: "Develop",
    desc: "Strategic land acquisition, architectural selection, and world-class design partnerships — delivering landmark properties across District 1 and District 3.",
    img: "/media/services/ELW_8623-HDR.jpg"
  },
  {
    id: "invest",
    num: "02",
    title: "Invest",
    desc: "Structured investment opportunities with transparent reporting, proven returns, and hands-on project management. Your capital, our expertise, shared success.",
    img: "/media/services/invest_bg.jpg"
  },
  {
    id: "manage",
    num: "03",
    title: "Manage",
    desc: "Full-service property management for commercial and residential assets. From tenant relations to maintenance, we protect and grow your investment around the clock.",
    img: "/media/services/336293654.jpg"
  }
];

export default function ServiceList() {
  const navigate = useNavigate();

  return (
    <section className="service-list-section">
      <div className="container">
        <div className="service-list-header reveal-up">
           <p className="section-label">SERVICES</p>
           <h2 className="how-kruler-title">How Kruler <br/><span>Can Help You</span></h2>
        </div>
      </div>

      <div className="service-list-container">
        {services.map((s, i) => (
          <div 
            key={i} 
            className="service-row"
            onClick={() => navigate(`/services/${s.id}`)}
          >
            <div className="row-bg" style={{ backgroundImage: `url("${s.img}")` }} />
            <div className="container row-inner">
              <span className="row-num">{s.num}</span>
              <p className="row-desc">{s.desc}</p>
              <div className="row-action">
                <span className="row-title">{s.title}</span>
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="container service-list-footer">
         <p>Our integrated team guides you through every stage of development and investment <em>with expert knowledge and reliable support.</em></p>
      </div>
    </section>
  );
}
