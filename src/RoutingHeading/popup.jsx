import React, { useState, useEffect } from 'react';
import Ratings from './Rating';

const css = `
  /* ── Overlay ── */
  .pw-overlay {
    position: fixed;
    inset: 0;
    background: rgba(18,16,13,0.72);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    backdrop-filter: blur(3px);
    animation: pw-fadein 0.25s ease;
    padding: 1.5rem;
  }

  /* ── Panel ── */
  .pw-panel {
    background: #f5f2ee;
    width: 100%;
    max-width: 860px;
    max-height: 90vh;
    overflow-y: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    animation: pw-slideup 0.32s cubic-bezier(0.25,0.46,0.45,0.94);
  }

  /* ── Image column ── */
  .pw-img-col {
    position: relative;
    background: #1c1c1c;
    overflow: hidden;
    min-height: 420px;
  }
  .pw-img-col img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 0.6s ease;
  }
  .pw-img-col img.fading { opacity: 0; }

  /* image dots */
  .pw-img-dots {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.4rem;
  }
  .pw-img-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(245,242,238,0.35);
    transition: background 0.3s, transform 0.3s;
    cursor: pointer;
    border: none;
    padding: 0;
  }
  .pw-img-dot--active {
    background: #c8a96e;
    transform: scale(1.3);
  }

  /* Sale ribbon */
  .pw-sale-ribbon {
    position: absolute;
    top: 1.2rem;
    left: 0;
    background: #c8a96e;
    color: #1c1c1c;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 500;
    padding: 0.3rem 0.9rem;
    z-index: 2;
  }

  /* ── Info column ── */
  .pw-info-col {
    padding: 2.8rem 2.4rem 2.4rem;
    display: flex;
    flex-direction: column;
    gap: 0;
    overflow-y: auto;
  }
  .pw-eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.62rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: #c8a96e;
    font-weight: 500;
    margin-bottom: 0.6rem;
  }
  .pw-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.6rem, 2.5vw, 2.2rem);
    font-weight: 300;
    color: #1c1c1c;
    line-height: 1.1;
    margin: 0 0 1.4rem;
  }

  /* Divider */
  .pw-rule {
    width: 32px;
    height: 1px;
    background: #c8a96e;
    margin-bottom: 1.4rem;
  }

  /* Price block */
  .pw-price-block {
    margin-bottom: 1.4rem;
  }
  .pw-price-label {
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(28,28,28,0.4);
    font-weight: 500;
    margin-bottom: 0.3rem;
  }
  .pw-price-row {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
  }
  .pw-price-final {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 300;
    color: #1c1c1c;
    line-height: 1;
  }
  .pw-price-orig {
    font-size: 0.85rem;
    color: rgba(28,28,28,0.35);
    text-decoration: line-through;
    font-weight: 300;
  }
  .pw-price-save {
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #8b6f47;
    font-weight: 500;
    background: rgba(200,169,110,0.12);
    padding: 0.2rem 0.55rem;
    align-self: flex-end;
    margin-bottom: 0.15rem;
  }

  /* Description */
  .pw-desc-label {
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(28,28,28,0.4);
    font-weight: 500;
    margin-bottom: 0.4rem;
  }
  .pw-desc {
    font-size: 0.84rem;
    line-height: 1.85;
    color: #555;
    font-weight: 300;
    margin-bottom: 1.6rem;
  }

  /* Star rating display */
  .pw-rating-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.8rem;
  }
  .pw-stars {
    display: flex;
    gap: 2px;
  }
  .pw-star {
    font-size: 0.85rem;
    line-height: 1;
  }
  .pw-star--on  { color: #c8a96e; }
  .pw-star--off { color: rgba(28,28,28,0.15); }
  .pw-rating-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 300;
    color: #1c1c1c;
  }
  .pw-rating-link {
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(28,28,28,0.35);
    font-weight: 500;
    cursor: pointer;
    border-bottom: 1px solid currentColor;
    padding-bottom: 1px;
    transition: color 0.25s;
    background: none;
    border-left: none;
    border-right: none;
    border-top: none;
  }
  .pw-rating-link:hover { color: #c8a96e; }

  /* Action buttons */
  .pw-actions {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-top: auto;
  }
  .pw-btn-primary {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 500;
    padding: 0.9rem 1.5rem;
    background: #1c1c1c;
    color: #f5f2ee;
    border: none;
    cursor: pointer;
    transition: background 0.3s;
    text-align: center;
  }
  .pw-btn-primary:hover { background: #c8a96e; color: #1c1c1c; }

  /* Close button */
  .pw-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;
    background: rgba(18,16,13,0.45);
    border: none;
    width: 34px;
    height: 34px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.25s;
  }
  .pw-close:hover { background: rgba(18,16,13,0.75); }
  .pw-close::before,
  .pw-close::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 1px;
    background: #f5f2ee;
  }
  .pw-close::before { transform: rotate(45deg); }
  .pw-close::after  { transform: rotate(-45deg); }

  @keyframes pw-fadein  { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pw-slideup {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 680px) {
    .pw-panel { grid-template-columns: 1fr; }
    .pw-img-col { min-height: 260px; }
    .pw-info-col { padding: 2rem 1.5rem; }
  }
`;

function StarsDisplay({ rate }) {
  return (
    <div className="pw-stars" aria-label={`${rate} out of 5 stars`}>
      {[1,2,3,4,5].map(n => (
        <span key={n} className={`pw-star ${n <= Math.round(rate) ? 'pw-star--on' : 'pw-star--off'}`}>
          ★
        </span>
      ))}
    </div>
  );
}

function PopupWindow({ product, closePopup }) {
  const [imgIdx, setImgIdx]         = useState(0);
  const [fading, setFading]         = useState(false);
  const [showRating, setShowRating] = useState(false);

  /* Auto-cycle images */
  useEffect(() => {
    if (product.image.length < 2) return;
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setImgIdx(i => (i + 1) % product.image.length);
        setFading(false);
      }, 600);
    }, 5000);
    return () => clearInterval(id);
  }, [product.image.length]);

  /* Close on Escape */
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') closePopup(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closePopup]);

  const salePrice = product.offer
    ? (product.price * (1 - product.offer / 100)).toFixed(2)
    : null;

  return (
    <>
      <style>{css}</style>

      <div className="pw-overlay" onClick={e => e.target === e.currentTarget && closePopup()}>
        <div className="pw-panel" role="dialog" aria-modal="true" aria-label={product.name}>

          {/* ── Image column ── */}
          <div className="pw-img-col">
            <button className="pw-close" onClick={closePopup} aria-label="Close" />
            {product.offer && <span className="pw-sale-ribbon">Sale — {product.offer}% off</span>}
            <img
              src={product.image[imgIdx]}
              alt={product.name}
              className={fading ? 'fading' : ''}
              draggable="false"
            />
            {product.image.length > 1 && (
              <div className="pw-img-dots">
                {product.image.map((_, i) => (
                  <button
                    key={i}
                    className={`pw-img-dot${i === imgIdx ? ' pw-img-dot--active' : ''}`}
                    onClick={() => { setFading(true); setTimeout(() => { setImgIdx(i); setFading(false); }, 300); }}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── Info column ── */}
          <div className="pw-info-col">
            {product.brand && <p className="pw-eyebrow">{product.brand}</p>}
            <h2 className="pw-name">{product.name}</h2>
            <div className="pw-rule" />

            {/* Price */}
            <div className="pw-price-block">
              <p className="pw-price-label">Price</p>
              <div className="pw-price-row">
                <span className="pw-price-final">
                  ${salePrice ?? Number(product.price).toFixed(2)}
                </span>
                {product.offer && (
                  <>
                    <span className="pw-price-orig">${Number(product.price).toFixed(2)}</span>
                    <span className="pw-price-save">−{product.offer}%</span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            {product.desc && (
              <>
                <p className="pw-desc-label">About this piece</p>
                <p className="pw-desc">{product.desc}</p>
              </>
            )}

            {/* Rating */}
            {product.rate !== undefined && (
              <div className="pw-rating-row">
                <StarsDisplay rate={product.rate} />
                <span className="pw-rating-num">{product.rate}</span>
                <button className="pw-rating-link" onClick={() => setShowRating(true)}>
                  Rate this piece
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="pw-actions">
              <button className="pw-btn-primary" onClick={() => setShowRating(true)}>
                Leave a Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {showRating && <Ratings CloseRaiting={() => setShowRating(false)} />}
    </>
  );
}

export default PopupWindow;