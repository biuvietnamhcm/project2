import React, { useState, useRef, useEffect } from 'react';
import data from '../data/BedRoom.json';
import PopupWindow from '../RoutingHeading/popup';

const css = `
  .br-page {
    font-family: 'DM Sans', sans-serif;
    background: #f5f2ee;
    min-height: 100vh;
  }

  /* ── Hero banner ── */
  .br-hero {
    position: relative;
    background: #1c1c1c;
    padding: 5rem 6vw 4rem;
    overflow: hidden;
    margin-bottom: 0;
  }
  .br-hero::after {
    content: '';
    position: absolute;
    right: 6vw;
    top: 50%;
    transform: translateY(-50%);
    width: 180px;
    height: 1px;
    background: rgba(200,169,110,0.25);
  }
  .br-hero__eyebrow {
    font-size: 0.65rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    font-weight: 500;
    color: #c8a96e;
    margin-bottom: 1rem;
  }
  .br-hero__title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.4rem, 5vw, 4rem);
    font-weight: 300;
    color: #f5f2ee;
    line-height: 1.05;
    margin: 0;
  }
  .br-hero__title em {
    font-style: italic;
    color: #c8a96e;
  }

  /* ── Controls bar ── */
  .br-controls {
    display: flex;
    align-items: stretch;
    gap: 0;
    border-bottom: 1px solid rgba(28,28,28,0.1);
    background: #f5f2ee;
    position: sticky;
    top: 72px;
    z-index: 100;
  }

  /* Search */
  .br-search {
    flex: 1;
    position: relative;
    border-right: 1px solid rgba(28,28,28,0.1);
  }
  .br-search__icon {
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    pointer-events: none;
    opacity: 0.35;
  }
  .br-search input {
    width: 100%;
    height: 56px;
    border: none;
    background: transparent;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 300;
    letter-spacing: 0.04em;
    color: #1c1c1c;
    padding: 0 1.5rem 0 3.2rem;
    outline: none;
  }
  .br-search input::placeholder { color: rgba(28,28,28,0.3); }

  /* Custom dropdowns */
  .br-dropdown {
    position: relative;
    border-right: 1px solid rgba(28,28,28,0.1);
    flex-shrink: 0;
  }
  .br-dropdown__trigger {
    height: 56px;
    padding: 0 1.4rem;
    display: flex;
    align-items: center;
    gap: 0.55rem;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #555;
    white-space: nowrap;
    transition: color 0.25s;
  }
  .br-dropdown__trigger:hover,
  .br-dropdown--open .br-dropdown__trigger { color: #1c1c1c; }
  .br-dropdown__active-pill {
    display: inline-block;
    background: #c8a96e;
    color: #1c1c1c;
    font-size: 0.58rem;
    letter-spacing: 0.1em;
    padding: 2px 7px;
    font-weight: 500;
  }
  .br-chevron {
    width: 7px;
    height: 7px;
    border-right: 1px solid currentColor;
    border-bottom: 1px solid currentColor;
    transform: rotate(45deg) translateY(-2px);
    transition: transform 0.25s;
    flex-shrink: 0;
  }
  .br-dropdown--open .br-chevron {
    transform: rotate(-135deg) translateY(-1px);
  }
  .br-dropdown__panel {
    position: absolute;
    top: calc(100% + 1px);
    left: 0;
    background: #f5f2ee;
    border: 1px solid rgba(28,28,28,0.1);
    border-top: 2px solid #c8a96e;
    min-width: 200px;
    z-index: 200;
    opacity: 0;
    transform: translateY(-6px);
    pointer-events: none;
    transition: opacity 0.2s, transform 0.2s;
  }
  .br-dropdown--open .br-dropdown__panel {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
  .br-dropdown__item {
    display: block;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 0.75rem 1.4rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 300;
    letter-spacing: 0.04em;
    color: #555;
    cursor: pointer;
    transition: color 0.2s, padding-left 0.2s;
    border-bottom: 1px solid rgba(28,28,28,0.05);
  }
  .br-dropdown__item:last-child { border-bottom: none; }
  .br-dropdown__item:hover { color: #1c1c1c; padding-left: 1.8rem; }
  .br-dropdown__item--active { color: #c8a96e; font-weight: 500; }

  /* Results count */
  .br-meta {
    padding: 1.4rem 6vw 0.8rem;
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }
  .br-meta__count {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 300;
    color: #1c1c1c;
    line-height: 1;
  }
  .br-meta__label {
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(28,28,28,0.4);
    font-weight: 400;
  }

  /* ── Product grid ── */
  .br-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1px;
    background: rgba(28,28,28,0.08);
    margin: 0 0 6rem;
  }

  .br-card {
    background: #f5f2ee;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: background 0.3s;
    animation: br-fadein 0.5s both;
  }
  .br-card:hover { background: #fff; }

  .br-card__img-wrap {
    overflow: hidden;
    aspect-ratio: 4/3;
    position: relative;
  }
  .br-card__img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.88;
    transition: transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s;
    display: block;
  }
  .br-card:hover .br-card__img-wrap img {
    transform: scale(1.06);
    opacity: 1;
  }

  /* Hot badge */
  .br-card__hot {
    position: absolute;
    top: 0.9rem;
    right: 0.9rem;
    z-index: 2;
    width: 40px;
    height: 40px;
    object-fit: contain;
    animation: br-pulse 2.2s ease-in-out infinite;
    pointer-events: none;
  }

  /* Sale ribbon */
  .br-card__sale {
    position: absolute;
    top: 0;
    left: 0;
    background: #1c1c1c;
    color: #c8a96e;
    font-size: 0.58rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 500;
    padding: 0.3rem 0.75rem;
    z-index: 2;
  }

  .br-card__body {
    padding: 1.1rem 1.3rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .br-card__brand {
    font-size: 0.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c8a96e;
    font-weight: 500;
  }
  .br-card__name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 300;
    color: #1c1c1c;
    line-height: 1.2;
    margin: 0;
  }
  .br-card__pricing {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    margin-top: 0.2rem;
  }
  .br-card__price {
    font-size: 0.82rem;
    font-weight: 500;
    color: #1c1c1c;
    letter-spacing: 0.04em;
  }
  .br-card__price--struck {
    color: rgba(28,28,28,0.3);
    text-decoration: line-through;
    font-weight: 300;
  }
  .br-card__price--sale {
    color: #8b6f47;
    font-weight: 500;
  }
  .br-card__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(28,28,28,0.4);
    font-weight: 500;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-top: 0.6rem;
    transition: color 0.25s, gap 0.25s;
  }
  .br-card__cta-arrow {
    width: 16px;
    height: 1px;
    background: currentColor;
    position: relative;
    transition: width 0.3s;
  }
  .br-card__cta-arrow::after {
    content: '';
    position: absolute;
    right: 0;
    top: -3px;
    width: 5px;
    height: 5px;
    border-right: 1px solid currentColor;
    border-top: 1px solid currentColor;
    transform: rotate(45deg);
  }
  .br-card:hover .br-card__cta { color: #1c1c1c; gap: 0.75rem; }
  .br-card:hover .br-card__cta-arrow { width: 22px; }

  /* Empty state */
  .br-empty {
    grid-column: 1 / -1;
    padding: 6rem 2rem;
    text-align: center;
    background: #f5f2ee;
  }
  .br-empty__title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 300;
    color: rgba(28,28,28,0.25);
    margin-bottom: 0.5rem;
  }
  .br-empty__sub {
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(28,28,28,0.2);
  }

  @keyframes br-fadein {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes br-pulse {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.08); }
  }

  @media (max-width: 700px) {
    .br-controls { flex-wrap: wrap; top: 60px; }
    .br-search { border-right: none; border-bottom: 1px solid rgba(28,28,28,0.1); flex-basis: 100%; }
    .br-dropdown { border-right: none; border-bottom: 1px solid rgba(28,28,28,0.06); }
    .br-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
  }
`;

const BRANDS  = ['Ashley', 'IKEA', 'Roche Bobois'];
const SORTS   = [
  { value: 'lowToHigh', label: 'Price: Low to High' },
  { value: 'highToLow', label: 'Price: High to Low' },
  { value: 'A-Z',       label: 'Name: A → Z' },
  { value: 'Z-A',       label: 'Name: Z → A' },
];

function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return { open, setOpen, ref };
}

function BedRoom() {
  const [products]         = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortOption, setSortOption]       = useState('');
  const [showPopup, setShowPopup]         = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const brandDD = useDropdown();
  const sortDD  = useDropdown();

  const url        = process.env.PUBLIC_URL || '';
  const hotIcon    = `${url}/img/hotoffericon.png`;

  const applyPrice = p => p.offer ? p.price * (1 - p.offer / 100) : p.price;

  const displayed = (() => {
    let list = products.filter(p => {
      const matchName  = p.name.toLowerCase().startsWith(searchTerm.toLowerCase());
      const matchBrand = selectedBrand ? p.brand === selectedBrand : true;
      return matchName && matchBrand;
    });
    switch (sortOption) {
      case 'highToLow': return [...list].sort((a,b) => applyPrice(b) - applyPrice(a));
      case 'lowToHigh': return [...list].sort((a,b) => applyPrice(a) - applyPrice(b));
      case 'A-Z':       return [...list].sort((a,b) => a.name.localeCompare(b.name));
      case 'Z-A':       return [...list].sort((a,b) => b.name.localeCompare(a.name));
      default:          return list;
    }
  })();

  const activeSortLabel = SORTS.find(s => s.value === sortOption)?.label;

  return (
    <>
      <style>{css}</style>
      <div className="br-page">

        {/* ── Hero ── */}
        <div className="br-hero">
          <p className="br-hero__eyebrow">Hudson Furnishings — Bedroom</p>
          <h1 className="br-hero__title">
            Rest &amp; <em>Retreat</em>
          </h1>
        </div>

        {/* ── Controls ── */}
        <div className="br-controls">

          {/* Search */}
          <div className="br-search">
            <svg className="br-search__icon" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="5.5" cy="5.5" r="4.5" stroke="#1c1c1c" strokeWidth="1"/>
              <line x1="9" y1="9" x2="13" y2="13" stroke="#1c1c1c" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search bedroom pieces…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              aria-label="Search products"
            />
          </div>

          {/* Brand filter */}
          <div
            className={`br-dropdown${brandDD.open ? ' br-dropdown--open' : ''}`}
            ref={brandDD.ref}
          >
            <button
              className="br-dropdown__trigger"
              onClick={() => brandDD.setOpen(o => !o)}
              aria-haspopup="listbox"
            >
              Brand
              {selectedBrand && <span className="br-dropdown__active-pill">{selectedBrand}</span>}
              <span className="br-chevron" />
            </button>
            <div className="br-dropdown__panel" role="listbox">
              {BRANDS.map(b => (
                <button
                  key={b}
                  className={`br-dropdown__item${selectedBrand === b ? ' br-dropdown__item--active' : ''}`}
                  onClick={() => { setSelectedBrand(b); brandDD.setOpen(false); }}
                >
                  {b}
                </button>
              ))}
              <button
                className={`br-dropdown__item${!selectedBrand ? ' br-dropdown__item--active' : ''}`}
                onClick={() => { setSelectedBrand(''); brandDD.setOpen(false); }}
              >
                All Brands
              </button>
            </div>
          </div>

          {/* Sort filter */}
          <div
            className={`br-dropdown${sortDD.open ? ' br-dropdown--open' : ''}`}
            ref={sortDD.ref}
          >
            <button
              className="br-dropdown__trigger"
              onClick={() => sortDD.setOpen(o => !o)}
              aria-haspopup="listbox"
            >
              Sort
              {activeSortLabel && <span className="br-dropdown__active-pill">on</span>}
              <span className="br-chevron" />
            </button>
            <div className="br-dropdown__panel" role="listbox">
              {SORTS.map(s => (
                <button
                  key={s.value}
                  className={`br-dropdown__item${sortOption === s.value ? ' br-dropdown__item--active' : ''}`}
                  onClick={() => { setSortOption(s.value); sortDD.setOpen(false); }}
                >
                  {s.label}
                </button>
              ))}
              <button
                className={`br-dropdown__item${!sortOption ? ' br-dropdown__item--active' : ''}`}
                onClick={() => { setSortOption(''); sortDD.setOpen(false); }}
              >
                Default
              </button>
            </div>
          </div>
        </div>

        {/* ── Results count ── */}
        <div className="br-meta">
          <span className="br-meta__count">{displayed.length}</span>
          <span className="br-meta__label">
            result{displayed.length !== 1 ? 's' : ''}
            {selectedBrand ? ` in ${selectedBrand}` : ''}
            {searchTerm ? ` for "${searchTerm}"` : ''}
          </span>
        </div>

        {/* ── Product grid ── */}
        <div className="br-grid">
          {displayed.length === 0 ? (
            <div className="br-empty">
              <p className="br-empty__title">No pieces found</p>
              <p className="br-empty__sub">Try adjusting your search or filters</p>
            </div>
          ) : displayed.map((product, i) => (
            <div
              className="br-card"
              key={product.id}
              style={{ animationDelay: `${Math.min(i * 0.05, 0.4)}s` }}
              onClick={() => { setSelectedProduct(product); setShowPopup(true); }}
            >
              <div className="br-card__img-wrap">
                {product.offer && (
                  <>
                    <img src={hotIcon} alt="Hot offer" className="br-card__hot" />
                    <span className="br-card__sale">Sale</span>
                  </>
                )}
                <img src={product.image[0]} alt={product.name} draggable="false" />
              </div>

              <div className="br-card__body">
                {product.brand && <span className="br-card__brand">{product.brand}</span>}
                <h3 className="br-card__name">{product.name}</h3>
                <div className="br-card__pricing">
                  {product.offer ? (
                    <>
                      <span className="br-card__price br-card__price--struck">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="br-card__price br-card__price--sale">
                        ${(product.price * (1 - product.offer / 100)).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="br-card__price">${product.price.toFixed(2)}</span>
                  )}
                </div>
                <button className="br-card__cta" tabIndex={-1}>
                  View details <span className="br-card__cta-arrow" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {showPopup && (
        <PopupWindow
          product={selectedProduct}
          closePopup={() => setShowPopup(false)}
        />
      )}
    </>
  );
}

export default BedRoom;