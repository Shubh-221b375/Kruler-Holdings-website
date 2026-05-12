import { useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisScrollContext } from './LenisScrollContext';
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
import BrandLogosMarquee from './components/BrandLogosMarquee';
import ServiceDetail from './components/ServiceDetail';
import EcosystemProductDetail from './components/EcosystemProductDetail';
import { About, Services, Contact } from './components/InfoPages';

gsap.registerPlugin(ScrollTrigger);

function scrollMainToTop(lenisRef) {
  const lenis = lenisRef.current;
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  }
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  ScrollTrigger.refresh();
}

function ScrollToTop({ lenisRef }) {
  const { pathname, hash } = useLocation();

  // Run before paint so route changes do not flash the previous scroll position (Lenis + native).
  useLayoutEffect(() => {
    if (hash) return;
    scrollMainToTop(lenisRef);
  }, [pathname, hash, lenisRef]);

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace(/^#/, '');
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        const el = document.getElementById(id);
        const lenis = lenisRef.current;
        if (el && lenis) {
          lenis.scrollTo(el, { offset: -100, duration: 1.05 });
        } else if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          scrollMainToTop(lenisRef);
        }
        ScrollTrigger.refresh();
      });
    });
    return () => {
      cancelAnimationFrame(outer);
      if (inner) cancelAnimationFrame(inner);
    };
  }, [pathname, hash, lenisRef]);
  return null;
}

/** ScrollTrigger-based reveal; re-binds on route so headings stay visible after navigation (see MarqueeText cleanup fix). */
function RevealScrollTriggers() {
  const { pathname, key } = useLocation();

  useEffect(() => {
    let active = true;
    const triggers = [];
    let rafInner = 0;

    const rafOuter = requestAnimationFrame(() => {
      rafInner = requestAnimationFrame(() => {
        if (!active) return;
        document.querySelectorAll('.reveal-up, .reveal-left').forEach((el) => {
          triggers.push(
            ScrollTrigger.create({
              trigger: el,
              start: 'top 85%',
              onEnter: () => el.classList.add('visible'),
            })
          );
        });
        ScrollTrigger.refresh();
      });
    });

    return () => {
      active = false;
      cancelAnimationFrame(rafOuter);
      if (rafInner) cancelAnimationFrame(rafInner);
      triggers.forEach((t) => t.kill());
    };
  }, [pathname, key]);

  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeText text="KRULER SPACE" speed={1.5} direction={1} />
      <WhyKruler />
      <Portfolio />
      <BrandLogosMarquee />
      <EcosystemIntro />
      <MarqueeText text="ACE SQUAD" speed={1.2} direction={1} />
      <SportsWellness />
      <ServiceList />
      <MarqueeText text="LEGACY" speed={2.5} direction={-1} />
    </>
  );
}

export default function App() {
  const lenisRef = useRef(null);

  const scrollToTop = useCallback(() => {
    scrollMainToTop(lenisRef);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenis.scrollTo(0, { immediate: true });

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', onLenisScroll);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.off('scroll', onLenisScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);


  return (
    <Router>
      <LenisScrollContext.Provider value={scrollToTop}>
        <RevealScrollTriggers />
        <ScrollToTop lenisRef={lenisRef} />
        <div className="loading-line" />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/product/:id" element={<EcosystemProductDetail />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </LenisScrollContext.Provider>
    </Router>
  );
}

