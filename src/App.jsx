import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './page/Homepage';
import './App.css';
import Header from './RoutingHeading/Header';
import LivingRoom from './page/LivingRoom';
import Footer from './RoutingHeading/Footer';
import ContactUs from './page/Contact';
import Outdoor from './page/OutDoor';
import BedRoom from './page/Bedroom';
import React, { useEffect, useRef, useState } from 'react';
import Homeoffice from './page/Homeoffice';
import DiningRoom from './page/Diningroom';
import AboutUs from './page/AboutUs';
import FaqPage from './page/FAQ';
import Gallery from './page/gallery';

/* ─── Inline styles ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');

  /* ── Visit counter ── */
  .hf-counter {
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    z-index: 900;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #1c1c1c;
    border: 1px solid rgba(200,169,110,0.25);
    padding: 0.45rem 0.9rem 0.45rem 0.7rem;
    pointer-events: none;
    animation: hf-app-fadein 0.6s 1s both;
  }
  .hf-counter__eye {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    opacity: 0.5;
  }
  .hf-counter__eye circle,
  .hf-counter__eye ellipse {
    fill: #c8a96e;
  }
  .hf-counter__num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.9rem;
    font-weight: 300;
    color: rgba(245,242,238,0.55);
    letter-spacing: 0.06em;
    line-height: 1;
  }
  .hf-counter__label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.58rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(245,242,238,0.25);
    font-weight: 400;
    margin-left: 0.15rem;
  }

  /* ── Scroll-to-top ── */
  .hf-scrollup {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 900;
    width: 44px;
    height: 44px;
    background: #1c1c1c;
    border: 1px solid rgba(200,169,110,0.3);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s, border-color 0.3s, transform 0.3s;
    opacity: 0;
    transform: translateY(12px);
    pointer-events: none;
  }
  .hf-scrollup.visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
  .hf-scrollup:hover {
    background: #c8a96e;
    border-color: #c8a96e;
    transform: translateY(-2px);
  }
  .hf-scrollup:hover .hf-scrollup__arrow {
    border-color: #1c1c1c;
  }
  .hf-scrollup__arrow {
    width: 10px;
    height: 10px;
    border-top: 1.5px solid rgba(245,242,238,0.7);
    border-right: 1.5px solid rgba(245,242,238,0.7);
    transform: rotate(-45deg) translate(1px, 1px);
    transition: border-color 0.3s;
  }

  /* ── Progress ring on scroll button ── */
  .hf-scrollup__ring {
    position: absolute;
    inset: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    pointer-events: none;
  }
  .hf-scrollup__ring-track {
    fill: none;
    stroke: rgba(200,169,110,0.12);
    stroke-width: 1.5;
  }
  .hf-scrollup__ring-fill {
    fill: none;
    stroke: #c8a96e;
    stroke-width: 1.5;
    stroke-linecap: butt;
    transition: stroke-dashoffset 0.15s linear;
    transform: rotate(-90deg);
    transform-origin: center;
  }

  @keyframes hf-app-fadein {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

/* Eye SVG (no external icon dep) */
function EyeIcon() {
  return (
    <svg className="hf-counter__eye" viewBox="0 0 14 10" fill="none" aria-hidden="true">
      <path
        d="M1 5C1 5 3 1 7 1C11 1 13 5 13 5C13 5 11 9 7 9C3 9 1 5 1 5Z"
        stroke="#c8a96e"
        strokeWidth="1"
        strokeOpacity="0.6"
        fill="none"
      />
      <circle cx="7" cy="5" r="1.8" fill="#c8a96e" fillOpacity="0.55" />
    </svg>
  );
}

/* Scroll progress ring */
const RADIUS = 22;
const CIRC = 2 * Math.PI * RADIUS;

function ScrollButton({ visible, onClick, progress }) {
  const offset = CIRC - progress * CIRC;
  return (
    <button
      className={`hf-scrollup${visible ? ' visible' : ''}`}
      onClick={onClick}
      aria-label="Scroll to top"
    >
      <svg className="hf-scrollup__ring" viewBox="0 0 46 46">
        <circle className="hf-scrollup__ring-track" cx="23" cy="23" r={RADIUS} />
        <circle
          className="hf-scrollup__ring-fill"
          cx="23"
          cy="23"
          r={RADIUS}
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="hf-scrollup__arrow" />
    </button>
  );
}

function App() {
  const [visitCount, setVisitCount] = useState(0);
  const hasVisited = useRef(false);
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* ── Visit counter ── */
  useEffect(() => {
    if (hasVisited.current) return;
    hasVisited.current = true;
    const stored = parseInt(localStorage.getItem('visitCount') || '0', 10);
    const next = stored + 1;
    localStorage.setItem('visitCount', next);
    setVisitCount(next);
  }, []);

  /* ── Scroll tracking ── */
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setShowButton(scrolled > 500);
      setScrollProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Router>
      <style>{css}</style>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/"          element={<Homepage />} />
          <Route path="/home"      element={<Homepage />} />
          <Route path="/livingroom" element={<LivingRoom />} />
          <Route path="/contact"   element={<ContactUs />} />
          <Route path="/outdoor"   element={<Outdoor />} />
          <Route path="/bedroom"   element={<BedRoom />} />
          <Route path="/homeoffice" element={<Homeoffice />} />
          <Route path="/diningroom" element={<DiningRoom />} />
          <Route path="/about"     element={<AboutUs />} />
          <Route path="/faq"       element={<FaqPage />} />
          <Route path="/gallery"   element={<Gallery />} />
        </Routes>
        <Footer />

        {/* ── Visit counter ── */}
        <div className="hf-counter" aria-label={`${visitCount} visits`}>
          <EyeIcon />
          <span className="hf-counter__num">{visitCount}</span>
          <span className="hf-counter__label">visits</span>
        </div>

        {/* ── Scroll to top ── */}
        <ScrollButton
          visible={showButton}
          onClick={scrollToTop}
          progress={scrollProgress}
        />
      </div>
    </Router>
  );
}

export default App;