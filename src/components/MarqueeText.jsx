import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeText({ text, speed = 1, direction = 1, color = 'rgba(255,255,255,0.03)' }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    tl.fromTo(textEl, 
      { 
        x: (direction === 1 ? 200 : -200),
        rotateX: -10,
        skewX: -5,
        opacity: 0.4
      },
      {
        x: (direction === 1 ? -400 : 400) * speed,
        rotateX: 10,
        skewX: 5,
        opacity: 0.8,
        ease: 'none'
      }
    );


    return () => {
      tl.kill();
    };
  }, [direction, speed]);

  return (
    <div className="marquee-text-container" ref={containerRef}>
      <div 
        className="marquee-text-inner" 
        ref={textRef}
        style={{ color: color }}
      >
        {Array(10).fill(text).join(' · ')}
      </div>
    </div>
  );
}
