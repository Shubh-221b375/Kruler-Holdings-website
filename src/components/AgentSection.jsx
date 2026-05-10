import { ArrowIcon } from './Header';

export default function AgentSection() {
  return (
    <section className="agent-section">
      <div className="container">
        <div className="agent-row">
          <div>
            <div className="agent-label">For Partners</div>
            <div className="agent-small-img">
              <img src="/images/agent-1.jpg" alt="Partnership opportunity" />
            </div>
          </div>
          <div>
            <div className="agent-above-text">
              Don't Just Invest. <span className="em">Own the Outcome.</span>
            </div>
            <div className="agent-big-img">
              <img src="/images/agent-2.jpg" alt="Kruler development" />
            </div>
            <div className="agent-below-text">
              At Kruler, our partners don't just fund projects — they shape them.{' '}
              <span className="em">
                We give strategic investors direct involvement in developments that
                deliver exceptional returns. Every project is backed by deep market
                knowledge, meticulous planning, and a track record of success across
                Ho Chi Minh City's most sought-after districts.
              </span>
            </div>
            <div className="agent-controls">
              <a className="btn-round" href="#contact">
                <span>Partner With Us</span>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
