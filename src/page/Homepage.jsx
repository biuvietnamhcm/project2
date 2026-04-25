import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── Google Fonts injected once ─── */
const fontLink = document.getElementById('hf-fonts');
if (!fontLink) {
  const link = document.createElement('link');
  link.id = 'hf-fonts';
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap';
  document.head.appendChild(link);
}

/* ─── Inline styles (scoped to Homepage) ─── */
const css = `
  .hf-homepage {
    font-family: 'DM Sans', sans-serif;
    background: #f5f2ee;
    color: #1c1c1c;
    overflow-x: hidden;
  }

  /* ── Hero ── */
  .hf-hero {
    position: relative;
    height: 100vh;
    min-height: 620px;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }
  .hf-hero__bg {
    position: absolute;
    inset: 0;
    background-image: url('https://media.architecturaldigest.com/photos/5c50a83892ce212ce3f5165c/2:1/w_1280,c_limit/CS_24_012419_0022.jpg');
    background-size: cover;
    background-position: center 30%;
    transition: transform 0.1s linear;
  }
  .hf-hero__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(18,16,13,0.82) 0%,
      rgba(18,16,13,0.25) 55%,
      transparent 100%
    );
  }
  .hf-hero__content {
    position: relative;
    z-index: 2;
    padding: 0 6vw 7vh;
    max-width: 860px;
  }
  .hf-hero__eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #c8a96e;
    margin-bottom: 1.4rem;
    opacity: 0;
    animation: hf-rise 0.8s 0.2s forwards;
  }
  .hf-hero__headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3rem, 7vw, 6rem);
    font-weight: 300;
    line-height: 1.05;
    color: #f5f2ee;
    margin: 0 0 2rem;
    opacity: 0;
    animation: hf-rise 0.9s 0.45s forwards;
  }
  .hf-hero__headline em {
    font-style: italic;
    color: #c8a96e;
  }
  .hf-hero__actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    opacity: 0;
    animation: hf-rise 0.9s 0.7s forwards;
  }
  .hf-btn-primary {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 500;
    padding: 0.85rem 2.2rem;
    background: #c8a96e;
    color: #1c1c1c;
    border: none;
    cursor: pointer;
    transition: background 0.3s, transform 0.25s;
  }
  .hf-btn-primary:hover {
    background: #d9be8a;
    transform: translateY(-2px);
  }
  .hf-btn-ghost {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 500;
    padding: 0.85rem 2.2rem;
    background: transparent;
    color: #f5f2ee;
    border: 1px solid rgba(245,242,238,0.5);
    cursor: pointer;
    transition: border-color 0.3s, color 0.3s, transform 0.25s;
  }
  .hf-btn-ghost:hover {
    border-color: #c8a96e;
    color: #c8a96e;
    transform: translateY(-2px);
  }
  .hf-hero__scroll-hint {
    position: absolute;
    bottom: 2.5rem;
    right: 6vw;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: rgba(245,242,238,0.5);
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    opacity: 0;
    animation: hf-rise 1s 1.1s forwards;
  }
  .hf-hero__scroll-line {
    width: 1px;
    height: 48px;
    background: linear-gradient(to bottom, rgba(245,242,238,0.5), transparent);
    animation: hf-pulse-line 2s 1.5s infinite;
  }

  /* ── Section header ── */
  .hf-section-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 5.5rem 6vw 2.5rem;
  }
  .hf-section-head__title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 300;
    color: #1c1c1c;
    margin: 0;
    line-height: 1.1;
  }
  .hf-section-head__title em { font-style: italic; color: #8b6f47; }
  .hf-section-head__link {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #8b6f47;
    cursor: pointer;
    border-bottom: 1px solid #c8a96e;
    padding-bottom: 2px;
    white-space: nowrap;
    transition: color 0.25s;
  }
  .hf-section-head__link:hover { color: #1c1c1c; }

  /* ── Category grid ── */
  .hf-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto;
    gap: 1rem;
    padding: 0 6vw 6rem;
  }

  .hf-room {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background: #1c1c1c;
  }
  .hf-room img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    opacity: 0.78;
    transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94),
                opacity 0.4s;
    user-select: none;
    pointer-events: none;
  }
  .hf-room:hover img {
    transform: scale(1.06);
    opacity: 0.9;
  }
  .hf-room__label {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.6rem 1.8rem;
    background: linear-gradient(to top, rgba(18,16,13,0.65) 0%, transparent 60%);
  }
  .hf-room__eyebrow {
    font-size: 0.64rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #c8a96e;
    margin-bottom: 0.35rem;
    font-weight: 500;
  }
  .hf-room__name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.5rem, 2.5vw, 2.2rem);
    font-weight: 300;
    color: #f5f2ee;
    margin: 0 0 0.8rem;
    line-height: 1.1;
  }
  .hf-room__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(245,242,238,0.7);
    font-weight: 500;
    transition: color 0.3s, gap 0.3s;
  }
  .hf-room:hover .hf-room__cta {
    color: #c8a96e;
    gap: 0.75rem;
  }
  .hf-room__cta-arrow {
    width: 18px;
    height: 1px;
    background: currentColor;
    position: relative;
    transition: width 0.3s;
  }
  .hf-room__cta-arrow::after {
    content: '';
    position: absolute;
    right: 0;
    top: -3px;
    width: 6px;
    height: 6px;
    border-right: 1px solid currentColor;
    border-top: 1px solid currentColor;
    transform: rotate(45deg);
  }
  .hf-room:hover .hf-room__cta-arrow { width: 26px; }

  /* Grid placement */
  .hf-room--living  { grid-column: 1 / 8;  grid-row: 1; min-height: 480px; }
  .hf-room--office  { grid-column: 8 / 13; grid-row: 1; min-height: 480px; }
  .hf-room--dining  { grid-column: 1 / 5;  grid-row: 2; min-height: 340px; }
  .hf-room--bedroom { grid-column: 5 / 9;  grid-row: 2; min-height: 340px; }
  .hf-room--outdoor { grid-column: 9 / 13; grid-row: 2; min-height: 340px; }

  /* ── Values strip ── */
  .hf-values {
    background: #1c1c1c;
    padding: 4.5rem 6vw;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3rem 4rem;
  }
  .hf-value__icon {
    width: 32px;
    height: 1px;
    background: #c8a96e;
    margin-bottom: 1.4rem;
  }
  .hf-value__title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    font-weight: 400;
    color: #f5f2ee;
    margin: 0 0 0.6rem;
  }
  .hf-value__desc {
    font-size: 0.82rem;
    line-height: 1.75;
    color: rgba(245,242,238,0.55);
    margin: 0;
    font-weight: 300;
  }

  /* ── Rooms-in-focus strip ── */
  .hf-spotlight {
    padding: 5rem 6vw;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-items: center;
  }
  .hf-spotlight__img-wrap {
    position: relative;
    overflow: hidden;
    aspect-ratio: 4/5;
  }
  .hf-spotlight__img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .hf-spotlight__img-wrap:hover img { transform: scale(1.04); }
  .hf-spotlight__accent {
    position: absolute;
    top: 2rem;
    left: -1rem;
    width: 3px;
    height: 60px;
    background: #c8a96e;
  }
  .hf-spotlight__text {
    padding: 3rem 3rem 3rem 4rem;
  }
  .hf-spotlight__pre {
    font-size: 0.68rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #8b6f47;
    font-weight: 500;
    margin-bottom: 1.5rem;
  }
  .hf-spotlight__heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 300;
    line-height: 1.1;
    color: #1c1c1c;
    margin: 0 0 1.5rem;
  }
  .hf-spotlight__heading em { font-style: italic; color: #8b6f47; }
  .hf-spotlight__body {
    font-size: 0.88rem;
    line-height: 1.85;
    color: #555;
    font-weight: 300;
    margin: 0 0 2.2rem;
    max-width: 420px;
  }
  .hf-spotlight__stat {
    display: flex;
    gap: 2.5rem;
    margin-bottom: 2.5rem;
  }
  .hf-stat__num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem;
    font-weight: 300;
    color: #1c1c1c;
    line-height: 1;
  }
  .hf-stat__label {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #888;
    font-weight: 400;
    margin-top: 0.3rem;
  }

  /* ── Marquee ticker ── */
  .hf-ticker {
    border-top: 1px solid #e0dbd6;
    border-bottom: 1px solid #e0dbd6;
    overflow: hidden;
    padding: 1.1rem 0;
    background: #f5f2ee;
  }
  .hf-ticker__track {
    display: flex;
    gap: 0;
    animation: hf-marquee 28s linear infinite;
    width: max-content;
  }
  .hf-ticker__item {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 0 3rem;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #8b6f47;
    font-weight: 500;
    white-space: nowrap;
  }
  .hf-ticker__dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #c8a96e;
    flex-shrink: 0;
  }

  /* ── Keyframes ── */
  @keyframes hf-rise {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes hf-pulse-line {
    0%,100% { opacity: 0.4; transform: scaleY(1); }
    50% { opacity: 0.9; transform: scaleY(1.15); }
  }
  @keyframes hf-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .hf-room--living  { grid-column: 1 / 13; grid-row: 1; min-height: 320px; }
    .hf-room--office  { grid-column: 1 / 7;  grid-row: 2; min-height: 260px; }
    .hf-room--dining  { grid-column: 7 / 13; grid-row: 2; min-height: 260px; }
    .hf-room--bedroom { grid-column: 1 / 7;  grid-row: 3; min-height: 260px; }
    .hf-room--outdoor { grid-column: 7 / 13; grid-row: 3; min-height: 260px; }
    .hf-spotlight { grid-template-columns: 1fr; }
    .hf-spotlight__text { padding: 2rem 0; }
    .hf-spotlight__img-wrap { aspect-ratio: 16/9; }
  }
  @media (max-width: 600px) {
    .hf-hero__content { padding: 0 5vw 6vh; }
    .hf-section-head { flex-direction: column; gap: 1rem; padding: 4rem 5vw 2rem; }
    .hf-grid { padding: 0 5vw 4rem; gap: 0.6rem; }
    .hf-room--office,
    .hf-room--dining,
    .hf-room--bedroom,
    .hf-room--outdoor { grid-column: 1 / 13; }
    .hf-room--dining { grid-row: 3; }
    .hf-room--bedroom { grid-row: 4; }
    .hf-room--outdoor { grid-row: 5; }
    .hf-values { padding: 3.5rem 5vw; gap: 2.5rem 0; }
    .hf-spotlight { padding: 3.5rem 5vw; }
  }
`;

const ROOMS = [
  {
    key: 'living',
    route: 'livingroom',
    label: 'Living Room',
    eyebrow: 'Gathering spaces',
    imgSrc: null,          // will fall back to online src
    imgFallback: 'https://media.architecturaldigest.com/photos/5c50a83892ce212ce3f5165c/2:1/w_1280,c_limit/CS_24_012419_0022.jpg',
  },
  {
    key: 'office',
    route: 'homeoffice',
    label: 'Home Office',
    eyebrow: 'Work & focus',
    imgFallback: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
  },
  {
    key: 'dining',
    route: 'diningroom',
    label: 'Dining Room',
    eyebrow: 'Shared moments',
    imgFallback: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  },
  {
    key: 'bedroom',
    route: 'bedroom',
    label: 'Bedroom',
    eyebrow: 'Rest & retreat',
    imgFallback: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
  },
  {
    key: 'outdoor',
    route: 'outdoor',
    label: 'Outdoor',
    eyebrow: 'Open air living',
    imgFallback: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
  },
];

const TICKER_ITEMS = [
  'Handcrafted pieces',
  'Free in-home consultation',
  'Sustainable materials',
  '10-year craftsmanship warranty',
  'White-glove delivery',
  'Custom upholstery available',
  'Handcrafted pieces',
  'Free in-home consultation',
  'Sustainable materials',
  '10-year craftsmanship warranty',
  'White-glove delivery',
  'Custom upholstery available',
];

const VALUES = [
  {
    title: 'Artisan Craft',
    desc: 'Every piece is built by skilled artisans using time-honoured joinery techniques and sustainably sourced hardwoods.',
  },
  {
    title: 'Timeless Design',
    desc: 'We work with independent designers whose aesthetic stands apart from trends — furniture made to outlast fashions.',
  },
  {
    title: 'White-Glove Delivery',
    desc: 'From our workshop to your room, our trained team handles placement, assembly, and final finishing touches.',
  },
  {
    title: 'Lifetime Support',
    desc: 'Our in-house restoration team keeps your investment beautiful for decades. A relationship, not a transaction.',
  },
];

function RoomCard({ room, onClick, publicUrl }) {
  const localSrc = publicUrl + '/img/' + (room.key === 'living' ? 'livingroom.jpg'
    : room.key === 'office' ? 'homeoffice.png'
    : room.key === 'dining' ? 'diningroom.png'
    : room.key === 'bedroom' ? 'bedroom.jpg'
    : 'outdoor.png');

  return (
    <div className={`hf-room hf-room--${room.key}`} onClick={onClick}>
      <img
        src={localSrc}
        alt={room.label}
        draggable="false"
        onError={e => { e.currentTarget.src = room.imgFallback; }}
      />
      <div className="hf-room__label">
        <span className="hf-room__eyebrow">{room.eyebrow}</span>
        <h3 className="hf-room__name">{room.label}</h3>
        <span className="hf-room__cta">
          Explore
          <span className="hf-room__cta-arrow" />
        </span>
      </div>
    </div>
  );
}

function Homepage() {
  const navigate = useNavigate();
  const publicUrl = process.env.PUBLIC_URL || '';
  const heroRef = useRef(null);
  const [parallaxY, setParallaxY] = useState(0);

  /* Subtle parallax on hero bg */
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        setParallaxY(window.scrollY * 0.3);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = route => navigate('/' + route);

  const livingroomFallback = 'https://www.livingdesignsfurniture.com/wp-content/uploads/2024/02/ldf-showroom-1.webp';
  const bedroomFallback = 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80';

  return (
    <>
      <style>{css}</style>
      <div className="hf-homepage">

        {/* ── HERO ── */}
        <section className="hf-hero" ref={heroRef}>
          <div
            className="hf-hero__bg"
            style={{ transform: `translateY(${parallaxY}px)` }}
          />
          <div className="hf-hero__overlay" />
          <div className="hf-hero__content">
            <p className="hf-hero__eyebrow">Hudson Furnishings — Est. 2009</p>
            <h1 className="hf-hero__headline">
              Spaces shaped by<br />
              <em>intention</em> &amp; craft
            </h1>
            <div className="hf-hero__actions">
              <button className="hf-btn-primary" onClick={() => go('livingroom')}>
                Shop Collections
              </button>
              <button className="hf-btn-ghost" onClick={() => go('about')}>
                Our Story
              </button>
            </div>
          </div>
          <div className="hf-hero__scroll-hint">
            <span>Scroll</span>
            <span className="hf-hero__scroll-line" />
          </div>
        </section>

        {/* ── TICKER ── */}
        <div className="hf-ticker" aria-hidden="true">
          <div className="hf-ticker__track">
            {TICKER_ITEMS.map((item, i) => (
              <span className="hf-ticker__item" key={i}>
                <span className="hf-ticker__dot" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── CATEGORY SECTION ── */}
        <div className="hf-section-head">
          <h2 className="hf-section-head__title">
            Shop by <em>room</em>
          </h2>
          <span
            className="hf-section-head__link"
            onClick={() => go('livingroom')}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && go('livingroom')}
          >
            View all →
          </span>
        </div>

        <div className="hf-grid">
          {ROOMS.map(room => (
            <RoomCard
              key={room.key}
              room={room}
              onClick={() => go(room.route)}
              publicUrl={publicUrl}
            />
          ))}
        </div>

        {/* ── VALUES STRIP ── */}
        <section className="hf-values">
          {VALUES.map((v, i) => (
            <div key={i}>
              <div className="hf-value__icon" />
              <h4 className="hf-value__title">{v.title}</h4>
              <p className="hf-value__desc">{v.desc}</p>
            </div>
          ))}
        </section>

        {/* ── SPOTLIGHT ── */}
        <section className="hf-spotlight">
          <div className="hf-spotlight__img-wrap">
            <span className="hf-spotlight__accent" />
            <img
              src={publicUrl + '/img/livingroom.jpg'}
              alt="Hudson showroom living area"
              onError={e => { e.currentTarget.src = livingroomFallback; }}
            />
          </div>
          <div className="hf-spotlight__text">
            <p className="hf-spotlight__pre">The Hudson Experience</p>
            <h2 className="hf-spotlight__heading">
              Furniture that earns its<br /><em>place in your life</em>
            </h2>
            <p className="hf-spotlight__body">
              We believe a well-furnished room isn't about filling space — it's about
              creating a feeling. Each piece in our collection is chosen for longevity,
              comfort, and its ability to quietly anchor a room for years to come.
            </p>
            <div className="hf-spotlight__stat">
              <div>
                <div className="hf-stat__num">340+</div>
                <div className="hf-stat__label">Curated pieces</div>
              </div>
              <div>
                <div className="hf-stat__num">15</div>
                <div className="hf-stat__label">Years of craft</div>
              </div>
              <div>
                <div className="hf-stat__num">98%</div>
                <div className="hf-stat__label">Satisfied clients</div>
              </div>
            </div>
            <button className="hf-btn-primary" onClick={() => go('about')}>
              Our Philosophy
            </button>
          </div>
        </section>

        {/* ── BEDROOM TEASER ── */}
        <section
          style={{
            padding: '0 6vw 6rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}
        >
          {/* simple teaser cards */}
          {[
            {
              label: 'Bedroom',
              sub: 'Restful by design',
              route: 'bedroom',
              src: publicUrl + '/img/bedroom.jpg',
              fallback: bedroomFallback,
            },
            {
              label: 'Outdoor',
              sub: 'Bring comfort outside',
              route: 'outdoor',
              src: publicUrl + '/img/outdoor.png',
              fallback: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80',
            },
          ].map(card => (
            <div
              key={card.route}
              className="hf-room"
              style={{ minHeight: '380px' }}
              onClick={() => go(card.route)}
            >
              <img
                src={card.src}
                alt={card.label}
                draggable="false"
                onError={e => { e.currentTarget.src = card.fallback; }}
              />
              <div className="hf-room__label">
                <span className="hf-room__eyebrow">{card.sub}</span>
                <h3 className="hf-room__name">{card.label}</h3>
                <span className="hf-room__cta">
                  Explore <span className="hf-room__cta-arrow" />
                </span>
              </div>
            </div>
          ))}
        </section>

      </div>
    </>
  );
}

export default Homepage;