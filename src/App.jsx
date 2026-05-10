import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import EcosystemIntro from './components/EcosystemIntro';
import SportsWellness from './components/SportsWellness';
import Footer from './components/Footer';
import PropertyDetail from './components/PropertyDetail';
import MarqueeText from './components/MarqueeText';
import WhyKruler from './components/WhyKruler';
import ServiceList from './components/ServiceList';
import ServiceDetail from './components/ServiceDetail';
import { About, Services, Contact } from './components/InfoPages';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeText text="KRULER SPACE" speed={1.5} direction={1} />
      <WhyKruler />
      <Portfolio />
      <MarqueeText text="THE ECOSYSTEM" speed={2} direction={-1} />
      <EcosystemIntro />
      <MarqueeText text="ACE SQUAD" speed={1.2} direction={1} />
      <SportsWellness />
      <ServiceList />
      <MarqueeText text="LEGACY" speed={2.5} direction={-1} />
    </>
  );
}


import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Global Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left');
    revealElements.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => el.classList.add('visible'),
        // Optional: remove if you only want it to reveal once
        // onLeaveBack: () => el.classList.remove('visible') 
      });
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);


  return (
    <Router>
      <ScrollToTop />
      <div className="loading-line" />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

