import React, { useState, useMemo } from 'react';
import diningRoomData from '../data/DiningRoomData.json';
import homeOfficeData from '../data/HomeOffice.json';
import livingRoomData from '../data/LivingRoomData.json';
import outdoorData from '../data/OutDoor.json';
import bedroomData from '../data/BedRoom.json';

/* ─── Google Fonts ─── */
if (!document.getElementById('hf-fonts')) {
  const link = document.createElement('link');
  link.id = 'hf-fonts';
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap';
  document.head.appendChild(link);
}

const css = `
  .gl-page {
    font-family: 'DM Sans', sans-serif;
    background: #f5f2ee;
    color: #1c1c1c;
    min-height: 100vh;
  }

  /* ── Hero ── */
  .gl-hero {
    background: #1c1c1c;
    padding: 7rem 6vw 5rem;
    position: relative;
    overflow: hidden;
  }
  .gl-hero__bar {
    width: 40px;
    height: 1px;
    background: #c8a96e;
    margin-bottom: 2rem;
  }
  .gl-hero__eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #c8a96e;
    font-weight: 500;
    margin-bottom: 1.2rem;
  }
  .gl-hero__title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.8rem, 6vw, 5rem);
    font-weight: 300;
    color: #f5f2ee;
    line-height: 1.05;
    margin: 0 0 1.5rem;
  }
  .gl-hero__title em { font-style: italic; color: #c8a96e; }
  .gl-hero__sub {
    font-size: 0.9rem;
    line-height: 1.8;
    color: rgba(245,242,238,0.5);
    font-weight: 300;
    max-width: 460px;
    margin: 0;
  }
  .gl-hero__deco {
    position: absolute;
    right: 5vw;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(5rem, 13vw, 11rem);
    font-weight: 300;
    color: rgba(200,169,110,0.07);
    line-height: 1;
    user-select: none;
    pointer-events: none;
    letter-spacing: -0.02em;
  }

  /* ── Filter bar ── */
  .gl-filter-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.8rem 6vw;
    border-bottom: 1px solid #e0dbd6;
    flex-wrap: wrap;
  }
  .gl-tabs {
    display: flex;
    gap: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .gl-tabs::-webkit-scrollbar { display: none; }
  .gl-tab {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 500;
    color: #888;
    padding: 0.55rem 1.2rem;
    cursor: pointer;
    border: none;
    border-bottom: 2px solid transparent;
    background: none;
    white-space: nowrap;
    transition: color 0.25s, border-color 0.25s;
  }
  .gl-tab:hover { color: #1c1c1c; }
  .gl-tab.active { color: #1c1c1c; border-bottom-color: #c8a96e; }
  .gl-count {
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    color: #aaa;
    font-weight: 300;
    white-space: nowrap;
  }
  .gl-count span { color: #8b6f47; font-weight: 500; }

  /* ── Masonry grid ── */
  .gl-grid {
    columns: 4;
    column-gap: 0.75rem;
    padding: 3rem 6vw 6rem;
  }
  @media (max-width: 1100px) { .gl-grid { columns: 3; } }
  @media (max-width: 720px)  { .gl-grid { columns: 2; column-gap: 0.5rem; padding: 2rem 4vw 4rem; } }
  @media (max-width: 420px)  { .gl-grid { columns: 1; } }

  .gl-card {
    break-inside: avoid;
    margin-bottom: 0.75rem;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    background: #1c1c1c;
    display: block;
  }
  @media (max-width: 720px) { .gl-card { margin-bottom: 0.5rem; } }

  .gl-card img {
    display: block;
    width: 100%;
    height: auto;
    opacity: 0.82;
    transition: transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s;
  }
  .gl-card:hover img { transform: scale(1.07); opacity: 1; }
  .gl-card__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(18,16,13,0.75) 0%, transparent 55%);
    opacity: 0;
    transition: opacity 0.35s;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.2rem 1.2rem 1rem;
  }
  .gl-card:hover .gl-card__overlay { opacity: 1; }
  .gl-card__name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem;
    font-weight: 400;
    color: #f5f2ee;
    line-height: 1.2;
    margin: 0 0 0.25rem;
  }
  .gl-card__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .gl-card__price {
    font-size: 0.75rem;
    font-weight: 500;
    color: #c8a96e;
    letter-spacing: 0.05em;
  }
  .gl-card__category {
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(245,242,238,0.55);
    font-weight: 500;
  }

  /* ── Lightbox ── */
  .gl-lb {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(18,16,13,0.92);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    animation: gl-fade-in 0.25s forwards;
  }
  @keyframes gl-fade-in { from { opacity: 0; } to { opacity: 1; } }
  .gl-lb__inner {
    position: relative;
    max-width: 860px;
    width: 100%;
    animation: gl-rise 0.3s forwards;
  }
  @keyframes gl-rise {
    from { transform: translateY(16px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  .gl-lb img {
    width: 100%;
    height: auto;
    max-height: 75vh;
    object-fit: contain;
    display: block;
  }
  .gl-lb__info {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 1rem 0 0;
    gap: 1rem;
  }
  .gl-lb__name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 300;
    color: #f5f2ee;
    margin: 0;
  }
  .gl-lb__name em { font-style: italic; color: #c8a96e; }
  .gl-lb__price {
    font-size: 1rem;
    font-weight: 500;
    color: #c8a96e;
    white-space: nowrap;
  }
  .gl-lb__close {
    position: absolute;
    top: -2.5rem;
    right: 0;
    background: none;
    border: none;
    color: rgba(245,242,238,0.55);
    font-size: 0.78rem;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    letter-spacing: 0.1em;
    transition: color 0.25s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0;
  }
  .gl-lb__close:hover { color: #c8a96e; }
  .gl-lb__close-bar {
    position: relative;
    width: 16px;
    height: 16px;
  }
  .gl-lb__close-bar::before,
  .gl-lb__close-bar::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 1px;
    background: currentColor;
    top: 50%;
    left: 0;
  }
  .gl-lb__close-bar::before { transform: rotate(45deg); }
  .gl-lb__close-bar::after  { transform: rotate(-45deg); }
  .gl-lb__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: 1px solid rgba(245,242,238,0.2);
    color: rgba(245,242,238,0.6);
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1rem;
    transition: border-color 0.25s, color 0.25s;
  }
  .gl-lb__nav:hover { border-color: #c8a96e; color: #c8a96e; }
  .gl-lb__prev { left: -3.5rem; }
  .gl-lb__next { right: -3.5rem; }
  @media (max-width: 700px) {
    .gl-lb__prev { left: -1.8rem; }
    .gl-lb__next { right: -1.8rem; }
  }

  /* ── Empty state ── */
  .gl-empty {
    text-align: center;
    padding: 6rem 2rem;
  }
  .gl-empty__text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 300;
    color: #aaa;
  }
  .gl-empty__text em { font-style: italic; color: #c8a96e; }

  @media (max-width: 600px) {
    .gl-filter-bar { padding: 1.2rem 4vw; }
    .gl-hero { padding: 5rem 5vw 4rem; }
  }
`;

const SOURCES = [
  { data: diningRoomData, label: 'Dining Room' },
  { data: homeOfficeData, label: 'Home Office' },
  { data: livingRoomData, label: 'Living Room' },
  { data: outdoorData,    label: 'Outdoor'     },
  { data: bedroomData,    label: 'Bedroom'     },
];

const TABS = ['All', ...SOURCES.map(s => s.label)];

/* Stable random image pick — computed once on module load */
const ALL_ITEMS = SOURCES.flatMap(({ data, label }) =>
  data.map(item => ({
    id:       item.id,
    name:     item.name,
    price:    item.price,
    category: label,
    image:    item.image[Math.floor(Math.random() * item.image.length)],
  }))
);

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');
  const [lightbox,  setLightbox]  = useState(null);

  const filtered = useMemo(
    () => activeTab === 'All' ? ALL_ITEMS : ALL_ITEMS.filter(i => i.category === activeTab),
    [activeTab]
  );

  const openLightbox  = idx => setLightbox(idx);
  const closeLightbox = ()  => setLightbox(null);
  const prevItem = () => setLightbox(i => (i - 1 + filtered.length) % filtered.length);
  const nextItem = () => setLightbox(i => (i + 1) % filtered.length);

  React.useEffect(() => {
    if (lightbox === null) return;
    const handler = e => {
      if (e.key === 'ArrowLeft')  prevItem();
      if (e.key === 'ArrowRight') nextItem();
      if (e.key === 'Escape')     closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, filtered.length]);

  const active = lightbox !== null ? filtered[lightbox] : null;

  return (
    <>
      <style>{css}</style>
      <div className="gl-page">

        {/* ── Hero ── */}
        <div className="gl-hero">
          <div className="gl-hero__bar" />
          <p className="gl-hero__eyebrow">Our Collection</p>
          <h1 className="gl-hero__title">
            A curated<br /><em>gallery</em>
          </h1>
          <p className="gl-hero__sub">
            Browse every piece across our five room collections — from intimate
            bedrooms to open-air outdoor living.
          </p>
          <div className="gl-hero__deco" aria-hidden="true">Gallery</div>
        </div>

        {/* ── Filter bar ── */}
        <div className="gl-filter-bar">
          <div className="gl-tabs" role="tablist">
            {TABS.map(tab => (
              <button
                key={tab}
                className={`gl-tab${activeTab === tab ? ' active' : ''}`}
                onClick={() => { setActiveTab(tab); setLightbox(null); }}
                role="tab"
                aria-selected={activeTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>
          <p className="gl-count">
            <span>{filtered.length}</span>&nbsp;pieces
          </p>
        </div>

        {/* ── Masonry grid ── */}
        {filtered.length > 0 ? (
          <div className="gl-grid">
            {filtered.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="gl-card"
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.name}`}
                onKeyDown={e => e.key === 'Enter' && openLightbox(idx)}
              >
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className="gl-card__overlay">
                  <p className="gl-card__name">{item.name}</p>
                  <div className="gl-card__meta">
                    <span className="gl-card__price">
                      ${item.price?.toLocaleString() ?? '—'}
                    </span>
                    <span className="gl-card__category">{item.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="gl-empty">
            <p className="gl-empty__text">
              No pieces in <em>{activeTab}</em> yet.
            </p>
          </div>
        )}

        {/* ── Lightbox ── */}
        {active && (
          <div
            className="gl-lb"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={active.name}
          >
            <div className="gl-lb__inner" onClick={e => e.stopPropagation()}>
              <button
                className="gl-lb__close"
                onClick={closeLightbox}
                aria-label="Close"
              >
                <span className="gl-lb__close-bar" />
                Close
              </button>
              <button className="gl-lb__nav gl-lb__prev" onClick={prevItem} aria-label="Previous">
                &#8592;
              </button>
              <button className="gl-lb__nav gl-lb__next" onClick={nextItem} aria-label="Next">
                &#8594;
              </button>
              <img src={active.image} alt={active.name} />
              <div className="gl-lb__info">
                <h2 className="gl-lb__name">
                  {active.name}&nbsp;<em>— {active.category}</em>
                </h2>
                <span className="gl-lb__price">
                  ${active.price?.toLocaleString() ?? '—'}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}