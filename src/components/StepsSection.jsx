import { ArrowIcon } from './Header';

export default function StepsSection() {
  const steps = [
    { idx: '01', text: <>Understand Your Vision. <span className="em">We start by listening — your goals, your timeline, your ambitions.</span></> },
    { idx: '02', text: <>Strategic Planning. <span className="em">We map the path from concept to completion with precision.</span></> },
    { idx: '03', text: <>Execute & Deliver. <span className="em">We bring your project to life — on time, on budget, built to last.</span></> },
  ];

  return (
    <section className="steps-section">
      <div className="container">
        <div className="steps-row">
          <div className="steps-left">
            <h2>Real Estate,<br /><span className="em">Reimagined.</span></h2>
            <button className="btn-round" type="button">
              <span>Start Your Journey</span>
              <ArrowIcon />
            </button>
          </div>
          <div>
            <div className="steps-label">Our Process:</div>
            {steps.map(s => (
              <div className="step-item" key={s.idx}>
                <div className="step-index">{s.idx}</div>
                <div>{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
