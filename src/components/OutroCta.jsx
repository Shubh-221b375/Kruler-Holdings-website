import { ArrowIcon } from './Header';

export default function OutroCta() {
  return (
    <section className="outro-section">
      <div className="outro-bg">
        <img src="/images/outro-bg.jpg" alt="" />
      </div>
      <div className="container outro-content">
        <div className="outro-title">
          <h2>Your Vision. <span className="em">We'll Build It Together.</span></h2>
        </div>
        <div className="outro-actions">
          <button className="btn-round primary" type="button">
            <span>Let's Get Started</span>
            <ArrowIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
