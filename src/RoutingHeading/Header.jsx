import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

const css = `
  .hf-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    transition: background 0.4s ease, box-shadow 0.4s ease, padding 0.4s ease;
    padding: 1.8rem 6vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .hf-header--transparent {
    background: transparent;
  }
  .hf-header--solid {
    background: #f5f2ee;
    box-shadow: 0 1px 0 rgba(28,28,28,0.08);
    padding: 1.1rem 6vw;
  }

  /* ── Logo ── */
  .hf-header__logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    text-decoration: none;
    flex-shrink: 0;
  }
  .hf-header__logo-img {
    height: 36px;
    width: auto;
    object-fit: contain;
  }
  .hf-header__logo-wordmark {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    font-weight: 400;
    color: #f5f2ee;
    letter-spacing: 0.04em;
    line-height: 1;
    transition: color 0.4s;
  }
  .hf-header--solid .hf-header__logo-wordmark {
    color: #1c1c1c;
  }
  .hf-header__logo-wordmark em {
    font-style: italic;
    color: #c8a96e;
  }

  /* ── Nav ── */
  .hf-header__nav {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .hf-nav__link {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(245,242,238,0.8);
    text-decoration: none;
    transition: color 0.25s;
    position: relative;
    padding-bottom: 2px;
  }
  .hf-nav__link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: #c8a96e;
    transition: width 0.3s ease;
  }
  .hf-nav__link:hover::after { width: 100%; }
  .hf-nav__link:hover { color: #c8a96e; }

  .hf-header--solid .hf-nav__link {
    color: #555;
  }
  .hf-header--solid .hf-nav__link:hover {
    color: #1c1c1c;
  }

  /* ── Dropdown ── */
  .hf-nav__dropdown {
    position: relative;
  }
  .hf-nav__dropdown-trigger {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(245,242,238,0.8);
    transition: color 0.25s;
    position: relative;
    padding-bottom: 2px;
  }
  .hf-nav__dropdown-trigger::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: #c8a96e;
    transition: width 0.3s ease;
  }
  .hf-nav__dropdown:hover .hf-nav__dropdown-trigger::after { width: calc(100% - 14px); }
  .hf-nav__dropdown:hover .hf-nav__dropdown-trigger { color: #c8a96e; }
  .hf-header--solid .hf-nav__dropdown-trigger { color: #555; }
  .hf-header--solid .hf-nav__dropdown:hover .hf-nav__dropdown-trigger { color: #1c1c1c; }

  .hf-nav__chevron {
    width: 8px;
    height: 8px;
    border-right: 1px solid currentColor;
    border-bottom: 1px solid currentColor;
    transform: rotate(45deg) translateY(-2px);
    transition: transform 0.25s;
    flex-shrink: 0;
  }
  .hf-nav__dropdown:hover .hf-nav__chevron {
    transform: rotate(-135deg) translateY(-2px);
  }

  .hf-nav__dropdown-panel {
    position: absolute;
    top: calc(100% + 1.2rem);
    left: 50%;
    transform: translateX(-50%);
    background: #f5f2ee;
    border: 1px solid rgba(28,28,28,0.08);
    min-width: 200px;
    padding: 0.5rem 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
    transform: translateX(-50%) translateY(-6px);
  }
  .hf-nav__dropdown-panel::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: #f5f2ee;
    border-left: 1px solid rgba(28,28,28,0.08);
    border-top: 1px solid rgba(28,28,28,0.08);
  }
  .hf-nav__dropdown-panel::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    height: 1.4rem;
  }
  .hf-nav__dropdown:hover .hf-nav__dropdown-panel {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(-50%) translateY(0);
  }
  .hf-nav__dropdown-item {
    display: block;
    padding: 0.65rem 1.5rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #555;
    text-decoration: none;
    transition: color 0.2s, background 0.2s;
    white-space: nowrap;
  }
  .hf-nav__dropdown-item:hover {
    color: #1c1c1c;
    background: rgba(200,169,110,0.08);
  }

  /* ── CTA button in nav ── */
  .hf-header__cta {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 500;
    padding: 0.6rem 1.4rem;
    background: #c8a96e;
    color: #1c1c1c;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.3s, transform 0.25s;
    display: inline-block;
    flex-shrink: 0;
  }
  .hf-header__cta:hover {
    background: #d9be8a;
    transform: translateY(-1px);
  }

  /* ── Mobile toggle ── */
  .hf-header__toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }
  .hf-header__toggle span {
    display: block;
    width: 24px;
    height: 1px;
    background: #f5f2ee;
    transition: background 0.4s, transform 0.3s;
  }
  .hf-header--solid .hf-header__toggle span { background: #1c1c1c; }
  .hf-header__toggle.is-open span:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
  .hf-header__toggle.is-open span:nth-child(2) { opacity: 0; }
  .hf-header__toggle.is-open span:nth-child(3) { transform: rotate(-45deg) translate(4px, -4px); }

  /* ── Mobile drawer ── */
  .hf-header__drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(340px, 85vw);
    background: #1c1c1c;
    z-index: 999;
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
    display: flex;
    flex-direction: column;
    padding: 5rem 2.5rem 3rem;
    gap: 0.25rem;
  }
  .hf-header__drawer.is-open { transform: translateX(0); }
  .hf-header__drawer-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(18,16,13,0.55);
    z-index: 998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s;
  }
  .hf-header__drawer-backdrop.is-open {
    opacity: 1;
    pointer-events: auto;
  }
  .hf-drawer__link {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 300;
    color: rgba(245,242,238,0.7);
    text-decoration: none;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(245,242,238,0.08);
    transition: color 0.25s;
    display: block;
  }
  .hf-drawer__link:hover { color: #c8a96e; }
  .hf-drawer__sub {
    padding: 0.5rem 0 0.5rem 1.2rem;
    display: none;
  }
  .hf-drawer__sub.is-open { display: block; }
  .hf-drawer__sub-link {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(245,242,238,0.45);
    text-decoration: none;
    display: block;
    padding: 0.4rem 0;
    transition: color 0.25s;
  }
  .hf-drawer__sub-link:hover { color: #c8a96e; }

  @media (max-width: 900px) {
    .hf-header__nav { display: none; }
    .hf-header__cta { display: none; }
    .hf-header__toggle { display: flex; }
  }
`;

const NAV_ROOMS = [
  { label: 'Living Room', to: '/livingroom' },
  { label: 'Bedroom', to: '/bedroom' },
  { label: 'Dining Room', to: '/diningroom' },
  { label: 'Outdoor', to: '/outdoor' },
  { label: 'Home Office', to: '/homeoffice' },
];

function Header() {
  const navigate = useNavigate();
  const url = process.env.PUBLIC_URL || '';
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [furnitureOpen, setFurnitureOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <style>{css}</style>

      {/* ── Main header bar ── */}
      <header className={`hf-header ${isScrolled ? 'hf-header--solid' : 'hf-header--transparent'}`}>
        {/* Logo */}
        <span className="hf-header__logo" onClick={() => navigate('/')}>
          <img
            className="hf-header__logo-img"
            src={`${url}/img/storelogo.png`}
            alt="Hudson Furnishings"
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
          <span className="hf-header__logo-wordmark">
            Hudson <em>Furnishings</em>
          </span>
        </span>

        {/* Desktop nav */}
        <nav className="hf-header__nav" aria-label="Main navigation">
          {/* All Furniture dropdown */}
          <div className="hf-nav__dropdown">
            <button className="hf-nav__dropdown-trigger" aria-haspopup="true">
              All Furniture
              <span className="hf-nav__chevron" aria-hidden="true" />
            </button>
            <div className="hf-nav__dropdown-panel" role="menu">
              {NAV_ROOMS.map(r => (
                <Link key={r.to} className="hf-nav__dropdown-item" to={r.to} role="menuitem">
                  {r.label}
                </Link>
              ))}
            </div>
          </div>

          <Link className="hf-nav__link" to="/gallery">Gallery</Link>
          <Link className="hf-nav__link" to="/about">About</Link>
          <Link className="hf-nav__link" to="/contact">Contact</Link>
          <Link className="hf-nav__link" to="/faq">FAQ</Link>
        </nav>

        {/* Desktop CTA */}
        <Link className="hf-header__cta" to="/livingroom">Shop Now</Link>

        {/* Mobile hamburger */}
        <button
          className={`hf-header__toggle${drawerOpen ? ' is-open' : ''}`}
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setDrawerOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </header>

      {/* ── Mobile backdrop ── */}
      <div
        className={`hf-header__drawer-backdrop${drawerOpen ? ' is-open' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* ── Mobile drawer ── */}
      <nav
        className={`hf-header__drawer${drawerOpen ? ' is-open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!drawerOpen}
      >
        <button
          className="hf-nav__dropdown-trigger"
          style={{ color: 'rgba(245,242,238,0.5)', marginBottom: '0.5rem', paddingBottom: 0 }}
          onClick={() => setFurnitureOpen(o => !o)}
        >
          All Furniture
          <span className="hf-nav__chevron" aria-hidden="true" style={{ borderColor: 'currentColor' }} />
        </button>
        <div className={`hf-drawer__sub${furnitureOpen ? ' is-open' : ''}`}>
          {NAV_ROOMS.map(r => (
            <Link key={r.to} className="hf-drawer__sub-link" to={r.to} onClick={closeDrawer}>
              {r.label}
            </Link>
          ))}
        </div>

        {[
          { label: 'Gallery', to: '/gallery' },
          { label: 'About', to: '/about' },
          { label: 'Contact', to: '/contact' },
          { label: 'FAQ', to: '/faq' },
        ].map(link => (
          <Link key={link.to} className="hf-drawer__link" to={link.to} onClick={closeDrawer}>
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}

export default Header;