import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const css = `
  .au-page {
    font-family: 'DM Sans', sans-serif;
    background: #f5f2ee;
    color: #1c1c1c;
    overflow-x: hidden;
  }

  /* ─── Scroll-reveal base ─── */
  .au-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.85s cubic-bezier(0.25,0.46,0.45,0.94),
                transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .au-reveal.au-visible { opacity: 1; transform: translateY(0); }
  .au-reveal--left  { transform: translateX(-32px); }
  .au-reveal--right { transform: translateX(32px);  }
  .au-reveal--left.au-visible,
  .au-reveal--right.au-visible { transform: translateX(0); }

  /* ─── HERO ─── */
  .au-hero {
    position: relative;
    min-height: 92vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
  }
  .au-hero__left {
    background: #1c1c1c;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 6rem 5vw 5rem 6vw;
    position: relative;
  }
  .au-hero__left::after {
    content: '';
    position: absolute;
    top: 3rem;
    right: 0;
    width: 1px;
    height: 60px;
    background: rgba(200,169,110,0.4);
  }
  .au-hero__eyebrow {
    font-size: 0.62rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #c8a96e;
    font-weight: 500;
    margin-bottom: 1.8rem;
    animation: au-rise 0.8s 0.2s both;
  }
  .au-hero__headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3rem, 5.5vw, 5.5rem);
    font-weight: 300;
    color: #f5f2ee;
    line-height: 1.02;
    margin: 0 0 2.5rem;
    animation: au-rise 0.9s 0.4s both;
  }
  .au-hero__headline em {
    font-style: italic;
    color: #c8a96e;
    display: block;
  }
  .au-hero__tagline {
    font-size: 0.82rem;
    line-height: 1.85;
    color: rgba(245,242,238,0.5);
    font-weight: 300;
    max-width: 340px;
    animation: au-rise 0.9s 0.65s both;
  }
  .au-hero__year {
    position: absolute;
    bottom: 3rem;
    right: -1.5rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 9rem;
    font-weight: 300;
    color: rgba(200,169,110,0.06);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.04em;
  }
  .au-hero__right {
    position: relative;
    overflow: hidden;
  }
  .au-hero__right img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 25%;
    display: block;
    transform: scale(1.04);
    animation: au-zoom-out 1.6s 0.1s cubic-bezier(0.25,0.46,0.45,0.94) both;
  }
  .au-hero__right::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(28,28,28,0.2), transparent);
  }

  /* Scroll cue */
  .au-hero__scroll {
    position: absolute;
    bottom: 2.5rem;
    left: 6vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(245,242,238,0.35);
    animation: au-rise 1s 1.2s both;
  }
  .au-hero__scroll-line {
    width: 1px;
    height: 44px;
    background: linear-gradient(to bottom, rgba(200,169,110,0.5), transparent);
    animation: au-pulse-line 2s 1.5s infinite;
  }

  /* ─── STATS STRIP ─── */
  .au-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid rgba(28,28,28,0.08);
    border-bottom: 1px solid rgba(28,28,28,0.08);
  }
  .au-stat {
    padding: 3rem 2rem;
    border-right: 1px solid rgba(28,28,28,0.08);
    text-align: center;
    transition: background 0.3s;
  }
  .au-stat:last-child { border-right: none; }
  .au-stat:hover { background: rgba(200,169,110,0.04); }
  .au-stat__num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3.2rem;
    font-weight: 300;
    color: #1c1c1c;
    line-height: 1;
    margin-bottom: 0.3rem;
  }
  .au-stat__num em { font-style: normal; color: #c8a96e; }
  .au-stat__label {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(28,28,28,0.4);
    font-weight: 500;
  }

  /* ─── STORY SECTION ─── */
  .au-story {
    display: grid;
    grid-template-columns: 5fr 7fr;
    min-height: 70vh;
  }
  .au-story__img-col {
    position: relative;
    overflow: hidden;
  }
  .au-story__img-col img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .au-story__img-col:hover img { transform: scale(1.04); }
  .au-story__accent {
    position: absolute;
    top: 3.5rem;
    right: -2px;
    width: 4px;
    height: 80px;
    background: #c8a96e;
  }
  .au-story__text-col {
    padding: 6rem 7vw 6rem 5vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .au-story__pre {
    font-size: 0.62rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #c8a96e;
    font-weight: 500;
    margin-bottom: 1.4rem;
  }
  .au-story__heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 300;
    color: #1c1c1c;
    line-height: 1.1;
    margin: 0 0 2rem;
  }
  .au-story__heading em { font-style: italic; color: #8b6f47; }
  .au-story__body {
    font-size: 0.88rem;
    line-height: 1.9;
    color: #555;
    font-weight: 300;
    margin-bottom: 2.5rem;
  }
  .au-story__quote {
    border-left: 3px solid #c8a96e;
    padding: 0.5rem 0 0.5rem 1.6rem;
    margin: 0;
  }
  .au-story__quote p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    font-style: italic;
    font-weight: 300;
    color: #1c1c1c;
    line-height: 1.55;
    margin: 0 0 0.4rem;
  }
  .au-story__quote cite {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(28,28,28,0.4);
    font-style: normal;
  }

  /* ─── COMMITMENT (reversed) ─── */
  .au-commitment {
    display: grid;
    grid-template-columns: 7fr 5fr;
    min-height: 65vh;
    background: #1c1c1c;
  }
  .au-commitment__text-col {
    padding: 6rem 5vw 6rem 6vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .au-commitment__pre {
    font-size: 0.62rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #c8a96e;
    font-weight: 500;
    margin-bottom: 1.4rem;
  }
  .au-commitment__heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 300;
    color: #f5f2ee;
    line-height: 1.1;
    margin: 0 0 2rem;
  }
  .au-commitment__heading em { font-style: italic; color: #c8a96e; }
  .au-commitment__body {
    font-size: 0.88rem;
    line-height: 1.9;
    color: rgba(245,242,238,0.5);
    font-weight: 300;
    max-width: 480px;
  }
  .au-commitment__img-col {
    position: relative;
    overflow: hidden;
  }
  .au-commitment__img-col img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    opacity: 0.75;
    transition: opacity 0.4s, transform 0.8s;
  }
  .au-commitment__img-col:hover img { opacity: 0.88; transform: scale(1.04); }

  /* ─── VALUES ─── */
  .au-values {
    padding: 7rem 6vw;
  }
  .au-values__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 4rem;
  }
  .au-values__title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 300;
    color: #1c1c1c;
    margin: 0;
  }
  .au-values__title em { font-style: italic; color: #8b6f47; }
  .au-values__rule {
    flex: 1;
    height: 1px;
    background: rgba(28,28,28,0.1);
    margin: 0 3rem;
  }

  .au-values__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border: 1px solid rgba(28,28,28,0.08);
  }
  .au-value {
    padding: 3rem 2.8rem;
    border-right: 1px solid rgba(28,28,28,0.08);
    position: relative;
    transition: background 0.3s;
    overflow: hidden;
  }
  .au-value:last-child { border-right: none; }
  .au-value::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: #c8a96e;
    transition: width 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .au-value:hover { background: rgba(200,169,110,0.04); }
  .au-value:hover::before { width: 100%; }

  .au-value__num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 4rem;
    font-weight: 300;
    color: rgba(28,28,28,0.06);
    line-height: 1;
    margin-bottom: 1.2rem;
    letter-spacing: -0.02em;
  }
  .au-value__icon-line {
    width: 28px;
    height: 1px;
    background: #c8a96e;
    margin-bottom: 1.2rem;
  }
  .au-value__title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 400;
    color: #1c1c1c;
    margin: 0 0 0.75rem;
  }
  .au-value__desc {
    font-size: 0.82rem;
    line-height: 1.85;
    color: #666;
    font-weight: 300;
    margin: 0;
  }

  /* ─── TIMELINE ─── */
  .au-timeline {
    padding: 0 6vw 7rem;
  }
  .au-timeline__title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 300;
    color: #1c1c1c;
    margin: 0 0 3.5rem;
  }
  .au-timeline__title em { font-style: italic; color: #8b6f47; }
  .au-timeline__track {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .au-timeline__track::before {
    content: '';
    position: absolute;
    left: 5.5rem;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(28,28,28,0.1);
  }
  .au-milestone {
    display: grid;
    grid-template-columns: 5.5rem 1fr;
    gap: 0 2.5rem;
    padding: 2rem 0;
    border-bottom: 1px solid rgba(28,28,28,0.06);
    align-items: start;
    transition: background 0.3s;
  }
  .au-milestone:hover { background: rgba(200,169,110,0.03); }
  .au-milestone__year {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem;
    font-weight: 300;
    color: #c8a96e;
    text-align: right;
    padding-top: 0.15rem;
    letter-spacing: 0.04em;
    position: relative;
  }
  .au-milestone__year::after {
    content: '';
    position: absolute;
    right: -2.55rem;
    top: 0.55rem;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #c8a96e;
    border: 2px solid #f5f2ee;
    outline: 1px solid rgba(200,169,110,0.5);
  }
  .au-milestone__text h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem;
    font-weight: 400;
    color: #1c1c1c;
    margin: 0 0 0.35rem;
  }
  .au-milestone__text p {
    font-size: 0.8rem;
    line-height: 1.75;
    color: #777;
    font-weight: 300;
    margin: 0;
  }

  /* ─── CTA ─── */
  .au-cta {
    background: #1c1c1c;
    padding: 8rem 6vw;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 4rem;
  }
  .au-cta__left {}
  .au-cta__pre {
    font-size: 0.62rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #c8a96e;
    font-weight: 500;
    margin-bottom: 1.2rem;
  }
  .au-cta__heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.2rem, 4vw, 3.6rem);
    font-weight: 300;
    color: #f5f2ee;
    line-height: 1.08;
    margin: 0;
  }
  .au-cta__heading em { font-style: italic; color: #c8a96e; }
  .au-cta__actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex-shrink: 0;
  }
  .au-btn-primary {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 500;
    padding: 1rem 2.4rem;
    background: #c8a96e;
    color: #1c1c1c;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.3s, transform 0.25s;
  }
  .au-btn-primary:hover { background: #d9be8a; transform: translateY(-2px); }
  .au-btn-ghost {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 500;
    padding: 1rem 2.4rem;
    background: transparent;
    color: rgba(245,242,238,0.55);
    border: 1px solid rgba(245,242,238,0.2);
    cursor: pointer;
    white-space: nowrap;
    transition: border-color 0.3s, color 0.3s, transform 0.25s;
    text-align: center;
  }
  .au-btn-ghost:hover { border-color: #c8a96e; color: #c8a96e; transform: translateY(-2px); }

  /* ─── Keyframes ─── */
  @keyframes au-rise {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes au-zoom-out {
    from { transform: scale(1.1); }
    to   { transform: scale(1.04); }
  }
  @keyframes au-pulse-line {
    0%,100% { opacity: 0.4; }
    50%      { opacity: 0.9; }
  }

  /* ─── Responsive ─── */
  @media (max-width: 900px) {
    .au-hero { grid-template-columns: 1fr; min-height: auto; }
    .au-hero__right { height: 50vw; }
    .au-hero__left { padding: 4rem 5vw; }
    .au-stats { grid-template-columns: repeat(2, 1fr); }
    .au-stat:nth-child(2) { border-right: none; }
    .au-story { grid-template-columns: 1fr; }
    .au-story__img-col { height: 55vw; }
    .au-story__text-col { padding: 4rem 5vw; }
    .au-commitment { grid-template-columns: 1fr; }
    .au-commitment__img-col { height: 55vw; order: -1; }
    .au-commitment__text-col { padding: 4rem 5vw; }
    .au-values__grid { grid-template-columns: 1fr; }
    .au-value { border-right: none; border-bottom: 1px solid rgba(28,28,28,0.08); }
    .au-value:last-child { border-bottom: none; }
    .au-cta { grid-template-columns: 1fr; gap: 2.5rem; }
    .au-cta__actions { flex-direction: row; flex-wrap: wrap; }
  }
  @media (max-width: 580px) {
    .au-values { padding: 4rem 5vw; }
    .au-timeline { padding: 0 5vw 5rem; }
    .au-cta { padding: 5rem 5vw; }
  }
`;

const MILESTONES = [
  { year: '2009', title: 'Founded in Hudson, NY', desc: 'A small corner shop opens on Warren Street with 40 handpicked pieces and a simple belief: good furniture changes how you live.' },
  { year: '2013', title: 'First artisan partnership', desc: 'We established our first direct relationship with a Vermont workshop, beginning a model of transparent, traceable sourcing.' },
  { year: '2016', title: 'Flagship showroom opens', desc: 'Moved into our current 6,000 sq ft space, designed to feel like a home, not a warehouse.' },
  { year: '2019', title: 'Sustainability charter signed', desc: 'Committed formally to FSC-certified timber, natural upholstery, and carbon-neutral delivery across all orders.' },
  { year: '2024', title: '340+ pieces, 15 years of craft', desc: 'Today our collection spans every room, every style — still chosen by hand, still built to outlast fashion.' },
];

const VALUES = [
  {
    num: '01',
    title: 'Quality Without Compromise',
    desc: 'Every joint, finish, and fabric is scrutinised before it reaches our floor. We source only from makers who share our intolerance for the ordinary.',
  },
  {
    num: '02',
    title: 'Responsible Making',
    desc: 'Sustainably sourced timber, low-VOC finishes, natural textiles. Beautiful objects should not cost the earth — literally.',
  },
  {
    num: '03',
    title: 'Rooted in Community',
    desc: 'Hudson gave us our start. We invest in local makers, support neighbourhood initiatives, and design spaces that bring people together.',
  },
];

/* ── IntersectionObserver reveal hook ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll('.au-reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('au-visible'); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    targets.forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function AboutUs() {
  const navigate = useNavigate();
  const pageRef  = useReveal();

  return (
    <>
      <style>{css}</style>
      <div className="au-page" ref={pageRef}>

        {/* ── HERO ── */}
        <section className="au-hero">
          <div className="au-hero__left">
            <p className="au-hero__eyebrow">Est. 2009 — Hudson, New York</p>
            <h1 className="au-hero__headline">
              Furniture made<br />
              <em>with intention</em>
            </h1>
            <p className="au-hero__tagline">
              We've spent fifteen years proving that beautiful, responsible
              furniture isn't a luxury reserved for the few — it's a standard
              every home deserves.
            </p>
            <span className="au-hero__year">09</span>
            <div className="au-hero__scroll">
              <span>Scroll</span>
              <span className="au-hero__scroll-line" />
            </div>
          </div>
          <div className="au-hero__right">
            <img
              src="https://res.cloudinary.com/fortyfournorth/image/upload/v1629982148/The%20Look%20Company/Blogs/4.0_Design_Concept_room_for_retail-2_okntq3.jpg"
              alt="Hudson Furnishings showroom"
            />
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="au-stats">
          {[
            { num: '15', suffix: '', label: 'Years of craft' },
            { num: '340', suffix: '+', label: 'Curated pieces' },
            { num: '98', suffix: '%', label: 'Client satisfaction' },
            { num: '12', suffix: '', label: 'Artisan partners' },
          ].map((s, i) => (
            <div className="au-stat au-reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="au-stat__num">{s.num}<em>{s.suffix}</em></div>
              <div className="au-stat__label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── STORY ── */}
        <section className="au-story">
          <div className="au-story__img-col au-reveal au-reveal--left">
            <span className="au-story__accent" />
            <img
              src="https://res.cloudinary.com/fortyfournorth/image/upload/v1629982148/The%20Look%20Company/Blogs/4.0_Design_Concept_room_for_retail-2_okntq3.jpg"
              alt="Our showroom interior"
            />
          </div>
          <div className="au-story__text-col au-reveal au-reveal--right">
            <p className="au-story__pre">Our Story</p>
            <h2 className="au-story__heading">
              A small shop with a<br /><em>very clear point of view</em>
            </h2>
            <p className="au-story__body">
              Hudson Furnishings began as a single room on Warren Street — forty
              pieces, one principle. We believed then, as we do now, that the
              furniture you live with shapes how you feel in your own home. We
              chose pieces that were quiet but confident, built for decades not
              seasons.
            </p>
            <p className="au-story__body">
              That approach drew in homeowners, then designers, then architects.
              Word spread the way it always does in a small town: slowly, honestly,
              and with staying power. Fifteen years on, the shop is larger. The
              principle isn't.
            </p>
            <blockquote className="au-story__quote">
              <p>The best rooms don't announce themselves. They simply make you feel at home the moment you walk in.</p>
              <cite>— Founders, Hudson Furnishings</cite>
            </blockquote>
          </div>
        </section>

        {/* ── COMMITMENT ── */}
        <section className="au-commitment">
          <div className="au-commitment__text-col au-reveal au-reveal--left">
            <p className="au-commitment__pre">Our Commitment</p>
            <h2 className="au-commitment__heading">
              Beauty that doesn't<br /><em>cost the earth</em>
            </h2>
            <p className="au-commitment__body">
              We work only with makers who can trace the origin of every material.
              FSC-certified hardwoods, natural-fibre upholstery, low-VOC finishes —
              these aren't marketing claims. They're the baseline we negotiate from.
            </p>
            <p className="au-commitment__body" style={{ marginTop: '1rem' }}>
              Our white-glove delivery team assembles every piece in your home,
              removing all packaging and ensuring nothing goes to landfill. A
              relationship with Hudson Furnishings doesn't end at the door.
            </p>
          </div>
          <div className="au-commitment__img-col au-reveal au-reveal--right">
            <img
              src="https://i.pinimg.com/564x/e1/2f/24/e12f24d02e355676bb14ab04ba628594.jpg"
              alt="Artisan craftsmanship"
            />
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="au-values">
          <div className="au-values__header au-reveal">
            <h2 className="au-values__title">What we <em>stand for</em></h2>
            <div className="au-values__rule" />
          </div>
          <div className="au-values__grid">
            {VALUES.map((v, i) => (
              <div className="au-value au-reveal" key={i} style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="au-value__num">{v.num}</div>
                <div className="au-value__icon-line" />
                <h3 className="au-value__title">{v.title}</h3>
                <p className="au-value__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="au-timeline">
          <h2 className="au-timeline__title au-reveal">
            Fifteen years,<br /><em>a few milestones</em>
          </h2>
          <div className="au-timeline__track">
            {MILESTONES.map((m, i) => (
              <div className="au-milestone au-reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="au-milestone__year">{m.year}</div>
                <div className="au-milestone__text">
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="au-cta">
          <div className="au-cta__left au-reveal au-reveal--left">
            <p className="au-cta__pre">Come and see us</p>
            <h2 className="au-cta__heading">
              The showroom is worth<br /><em>the visit</em>
            </h2>
          </div>
          <div className="au-cta__actions au-reveal au-reveal--right">
            <button className="au-btn-primary" onClick={() => navigate('/contact')}>
              Book a Consultation
            </button>
            <button className="au-btn-ghost" onClick={() => navigate('/gallery')}>
              Browse the Gallery
            </button>
          </div>
        </section>

      </div>
    </>
  );
}