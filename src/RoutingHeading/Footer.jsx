import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const css = `
  .hf-footer {
    font-family: 'DM Sans', sans-serif;
    background: #1c1c1c;
    color: rgba(245,242,238,0.55);
  }

  /* ── Main grid ── */
  .hf-footer__main {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr 1fr;
    gap: 3rem 4rem;
    padding: 5rem 6vw 4rem;
    border-bottom: 1px solid rgba(245,242,238,0.08);
  }

  /* ── Brand column ── */
  .hf-footer__brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 300;
    color: #f5f2ee;
    margin: 0 0 0.75rem;
    line-height: 1.1;
  }
  .hf-footer__brand-name em {
    font-style: italic;
    color: #c8a96e;
  }
  .hf-footer__tagline {
    font-size: 0.8rem;
    line-height: 1.75;
    color: rgba(245,242,238,0.4);
    font-weight: 300;
    margin: 0 0 2rem;
    max-width: 240px;
  }
  .hf-footer__social {
    display: flex;
    gap: 1.2rem;
    align-items: center;
  }
  .hf-footer__social-link {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(245,242,238,0.4);
    text-decoration: none;
    transition: color 0.25s;
    font-weight: 500;
    position: relative;
    padding-bottom: 2px;
  }
  .hf-footer__social-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: #c8a96e;
    transition: width 0.3s;
  }
  .hf-footer__social-link:hover { color: #c8a96e; }
  .hf-footer__social-link:hover::after { width: 100%; }

  /* ── Nav columns ── */
  .hf-footer__col-title {
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #c8a96e;
    font-weight: 500;
    margin: 0 0 1.4rem;
  }
  .hf-footer__col ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }
  .hf-footer__col a {
    font-size: 0.8rem;
    color: rgba(245,242,238,0.45);
    text-decoration: none;
    transition: color 0.25s;
    font-weight: 300;
    letter-spacing: 0.02em;
  }
  .hf-footer__col a:hover { color: #f5f2ee; }

  /* ── Contact column ── */
  .hf-footer__contact-item {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin-bottom: 0.9rem;
  }
  .hf-footer__contact-label {
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(245,242,238,0.3);
    font-weight: 500;
  }
  .hf-footer__contact-value {
    font-size: 0.8rem;
    color: rgba(245,242,238,0.55);
    font-weight: 300;
  }
  .hf-footer__contact-value a {
    color: inherit;
    text-decoration: none;
    transition: color 0.25s;
  }
  .hf-footer__contact-value a:hover { color: #c8a96e; }

  /* ── Ticker bar ── */
  .hf-footer__ticker {
    border-top: 1px solid rgba(245,242,238,0.06);
    border-bottom: 1px solid rgba(245,242,238,0.06);
    overflow: hidden;
    padding: 0.9rem 0;
    background: rgba(0,0,0,0.2);
  }
  .hf-footer__ticker-track {
    display: flex;
    width: max-content;
    animation: hf-footer-marquee 40s linear infinite;
  }
  .hf-footer__ticker-item {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 0 2.5rem;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(245,242,238,0.3);
    font-weight: 400;
    white-space: nowrap;
  }
  .hf-footer__ticker-dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #c8a96e;
    opacity: 0.6;
    flex-shrink: 0;
  }

  /* ── Video section ── */
  .hf-footer__video-wrap {
    padding: 4rem 6vw;
    border-bottom: 1px solid rgba(245,242,238,0.06);
  }
  .hf-footer__video-eyebrow {
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #c8a96e;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  .hf-footer__video-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    font-weight: 300;
    color: #f5f2ee;
    margin: 0 0 2rem;
  }
  .hf-footer__video-title em { font-style: italic; color: #c8a96e; }
  .hf-footer__video-frame {
    position: relative;
    padding-bottom: 42.85%; /* 16:7 — cinematic crop */
    overflow: hidden;
    background: #111;
  }
  .hf-footer__video-frame iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  /* ── Bottom bar ── */
  .hf-footer__bottom {
    padding: 1.8rem 6vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  .hf-footer__copy {
    font-size: 0.7rem;
    color: rgba(245,242,238,0.25);
    font-weight: 300;
    letter-spacing: 0.04em;
  }
  .hf-footer__meta {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.65rem;
    color: rgba(245,242,238,0.2);
    font-weight: 300;
    letter-spacing: 0.06em;
  }
  .hf-footer__meta-sep {
    width: 1px;
    height: 12px;
    background: rgba(245,242,238,0.15);
  }

  /* ── Keyframes ── */
  @keyframes hf-footer-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .hf-footer__main {
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem 3rem;
      padding: 4rem 6vw 3rem;
    }
    .hf-footer__brand { grid-column: 1 / -1; }
  }
  @media (max-width: 600px) {
    .hf-footer__main {
      grid-template-columns: 1fr;
      padding: 3.5rem 5vw 2.5rem;
    }
    .hf-footer__bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 1.5rem 5vw;
    }
    .hf-footer__video-wrap { padding: 3rem 5vw; }
  }
`;

const TICKER_ITEMS = [
  'Est. 2009 — New York',
  'Free in-home consultation',
  'Sustainably sourced hardwoods',
  '10-year craftsmanship warranty',
  'White-glove delivery',
  'Custom upholstery available',
  'Est. 2009 — New York',
  'Free in-home consultation',
  'Sustainably sourced hardwoods',
  '10-year craftsmanship warranty',
  'White-glove delivery',
  'Custom upholstery available',
];

function Footer() {
  const [dateTime, setDateTime] = useState(new Date());
  const [coords, setCoords] = useState({ lat: null, lng: null });

  useEffect(() => {
    const id = setInterval(() => setDateTime(new Date()), 1000);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setCoords({
          lat: pos.coords.latitude.toFixed(2),
          lng: pos.coords.longitude.toFixed(2),
        });
      });
    }
    return () => clearInterval(id);
  }, []);

  const year = dateTime.getFullYear();

  return (
    <>
      <style>{css}</style>
      <footer className="hf-footer">

        {/* ── Main link grid ── */}
        <div className="hf-footer__main">

          {/* Brand column */}
          <div className="hf-footer__brand">
            <p className="hf-footer__brand-name">Hudson <em>Furnishings</em></p>
            <p className="hf-footer__tagline">
              Handcrafted pieces built to outlast trends — chosen for longevity,
              comfort, and the quiet confidence they bring to every room.
            </p>
            <div className="hf-footer__social">
              <a
                className="hf-footer__social-link"
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >Instagram</a>
              <a
                className="hf-footer__social-link"
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >Facebook</a>
              <a
                className="hf-footer__social-link"
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >YouTube</a>
            </div>
          </div>

          {/* Collections column */}
          <div className="hf-footer__col">
            <p className="hf-footer__col-title">Collections</p>
            <ul>
              <li><Link to="/livingroom">Living Room</Link></li>
              <li><Link to="/bedroom">Bedroom</Link></li>
              <li><Link to="/diningroom">Dining Room</Link></li>
              <li><Link to="/outdoor">Outdoor</Link></li>
              <li><Link to="/homeoffice">Home Office</Link></li>
            </ul>
          </div>

          {/* Company column */}
          <div className="hf-footer__col">
            <p className="hf-footer__col-title">Company</p>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="hf-footer__col">
            <p className="hf-footer__col-title">Reach Us</p>
            <div className="hf-footer__contact-item">
              <span className="hf-footer__contact-label">Email</span>
              <span className="hf-footer__contact-value">
                <a href="mailto:info@hudsonfurnishings.com">info@hudsonfurnishings.com</a>
              </span>
            </div>
            <div className="hf-footer__contact-item">
              <span className="hf-footer__contact-label">Phone</span>
              <span className="hf-footer__contact-value">
                <a href="tel:+11234567890">(123) 456-7890</a>
              </span>
            </div>
            <div className="hf-footer__contact-item">
              <span className="hf-footer__contact-label">Showroom</span>
              <span className="hf-footer__contact-value">123 Furniture St<br />New York, NY 10001</span>
            </div>
          </div>
        </div>

        {/* ── Ticker ── */}
        <div className="hf-footer__ticker" aria-hidden="true">
          <div className="hf-footer__ticker-track">
            {TICKER_ITEMS.map((item, i) => (
              <span className="hf-footer__ticker-item" key={i}>
                <span className="hf-footer__ticker-dot" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── Video feature ── */}
        <div className="hf-footer__video-wrap">
          <p className="hf-footer__video-eyebrow">Inside Hudson</p>
          <h3 className="hf-footer__video-title">
            A closer look at <em>how we work</em>
          </h3>
          <div className="hf-footer__video-frame">
            <iframe
              src="https://www.youtube.com/embed/H8_W_MMej00"
              title="Hudson Furnishings — Inside the showroom"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="hf-footer__bottom">
          <span className="hf-footer__copy">
            © {year} Hudson Furnishings. All rights reserved.
          </span>
          <div className="hf-footer__meta">
            <span>{dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            {coords.lat && (
              <>
                <span className="hf-footer__meta-sep" />
                <span>{coords.lat}°, {coords.lng}°</span>
              </>
            )}
            <span className="hf-footer__meta-sep" />
            <span>{dateTime.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>

      </footer>
    </>
  );
}

export default Footer;