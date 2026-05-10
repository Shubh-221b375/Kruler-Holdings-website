import { useState } from 'react';

const testimonials = [
  {
    quote: "Kruler transformed our vision into reality. Their attention to detail and understanding of the Ho Chi Minh City market is unmatched. Every milestone was delivered with precision.",
    author: "Nguyen Thanh",
  },
  {
    quote: "Working with the Kruler team gave us confidence from day one. They don't just build properties — they build relationships. Our investment has exceeded every expectation.",
    author: "David Chen",
  },
  {
    quote: "From site selection to final delivery, Kruler's process is seamless. Their local expertise combined with international standards made all the difference for our portfolio.",
    author: "Marie Laurent",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-title">
          <h2>Don't Take <span className="em">Our Word for It.</span></h2>
        </div>
        <div className="testimonials-grid">
          <div>
            <div className="testimonials-divider" />
            <div className="testimonial-quote">
              <p>&ldquo;{testimonials[active].quote}&rdquo;</p>
            </div>
            <div className="testimonial-info">
              <div className="testimonial-author">{testimonials[active].author}</div>
              <div className="testimonial-separator">/</div>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
              </div>
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonial-dot ${i === active ? 'active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="testimonials-preview">
            <img src="/images/testimonial.jpg" alt="Kruler project" />
          </div>
        </div>
      </div>
    </section>
  );
}
