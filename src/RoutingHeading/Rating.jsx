import React, { useState } from 'react';

const css = `
  /* ── Backdrop ── */
  .rt-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(18,16,13,0.6);
    backdrop-filter: blur(4px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    animation: rt-fadein 0.2s ease;
  }

  /* ── Panel ── */
  .rt-panel {
    background: #f5f2ee;
    width: 100%;
    max-width: 480px;
    padding: 2.8rem 2.6rem 2.4rem;
    position: relative;
    animation: rt-slideup 0.3s cubic-bezier(0.25,0.46,0.45,0.94);
    border-top: 3px solid #c8a96e;
  }

  /* Close */
  .rt-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    width: 28px;
    height: 28px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.35;
    transition: opacity 0.2s, transform 0.3s;
  }
  .rt-close:hover { opacity: 1; transform: rotate(90deg); }
  .rt-close::before,
  .rt-close::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 1px;
    background: #1c1c1c;
  }
  .rt-close::before { transform: rotate(45deg); }
  .rt-close::after  { transform: rotate(-45deg); }

  /* Header */
  .rt-eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.62rem;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: #c8a96e;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  .rt-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    font-weight: 300;
    color: #1c1c1c;
    line-height: 1.1;
    margin: 0 0 0.4rem;
  }
  .rt-sub {
    font-size: 0.78rem;
    color: rgba(28,28,28,0.4);
    font-weight: 300;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  /* Star picker */
  .rt-stars-label {
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(28,28,28,0.4);
    font-weight: 500;
    margin-bottom: 0.6rem;
    display: block;
  }
  .rt-stars {
    display: flex;
    gap: 0.3rem;
    margin-bottom: 1.8rem;
  }
  .rt-star-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px;
    font-size: 1.8rem;
    line-height: 1;
    transition: transform 0.15s;
    color: rgba(28,28,28,0.12);
  }
  .rt-star-btn:hover,
  .rt-star-btn.rt-star-btn--on { color: #c8a96e; }
  .rt-star-btn:hover { transform: scale(1.15); }

  /* Textarea */
  .rt-field-label {
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(28,28,28,0.4);
    font-weight: 500;
    margin-bottom: 0.5rem;
    display: block;
  }
  .rt-textarea {
    width: 100%;
    min-height: 110px;
    border: 1px solid rgba(28,28,28,0.15);
    border-radius: 0;
    background: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.86rem;
    font-weight: 300;
    color: #1c1c1c;
    padding: 0.8rem 1rem;
    resize: vertical;
    outline: none;
    transition: border-color 0.25s;
    margin-bottom: 1.6rem;
    display: block;
    box-sizing: border-box;
  }
  .rt-textarea:focus { border-color: #c8a96e; }
  .rt-textarea::placeholder { color: rgba(28,28,28,0.28); }

  /* Error */
  .rt-error {
    font-size: 0.72rem;
    color: #a0522d;
    letter-spacing: 0.04em;
    margin-top: -1.2rem;
    margin-bottom: 1rem;
    display: block;
  }

  /* Submit */
  .rt-submit {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 500;
    width: 100%;
    padding: 0.9rem 1.5rem;
    background: #1c1c1c;
    color: #f5f2ee;
    border: none;
    cursor: pointer;
    transition: background 0.3s;
  }
  .rt-submit:hover { background: #c8a96e; color: #1c1c1c; }
  .rt-submit:disabled { opacity: 0.4; cursor: not-allowed; }

  /* Success state */
  .rt-success {
    text-align: center;
    padding: 1rem 0;
  }
  .rt-success__icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(200,169,110,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.2rem;
  }
  .rt-success__tick {
    width: 18px;
    height: 10px;
    border-left: 1.5px solid #c8a96e;
    border-bottom: 1.5px solid #c8a96e;
    transform: rotate(-45deg) translateY(-2px);
  }
  .rt-success__title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 300;
    color: #1c1c1c;
    margin-bottom: 0.4rem;
  }
  .rt-success__sub {
    font-size: 0.78rem;
    color: rgba(28,28,28,0.4);
    font-weight: 300;
  }

  @keyframes rt-fadein  { from { opacity: 0; } to { opacity: 1; } }
  @keyframes rt-slideup {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

function Ratings({ CloseRaiting }) {
  const [feedback, setFeedback]   = useState('');
  const [rating, setRating]       = useState(0);
  const [hovered, setHovered]     = useState(0);
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!feedback.trim())  e.feedback = 'Please share your thoughts before submitting.';
    if (rating === 0)      e.rating   = 'Please select a star rating.';
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    console.log('Rating submitted:', { rating, feedback });
    setSubmitted(true);
  };

  /* Close on Escape */
  React.useEffect(() => {
    const handler = e => { if (e.key === 'Escape') CloseRaiting(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [CloseRaiting]);

  return (
    <>
      <style>{css}</style>
      <div className="rt-backdrop" onClick={e => e.target === e.currentTarget && CloseRaiting()}>
        <div className="rt-panel" role="dialog" aria-modal="true" aria-label="Rate this product">
          <button className="rt-close" onClick={CloseRaiting} aria-label="Close" />

          {submitted ? (
            /* ── Success state ── */
            <div className="rt-success">
              <div className="rt-success__icon">
                <div className="rt-success__tick" />
              </div>
              <p className="rt-success__title">Thank you</p>
              <p className="rt-success__sub">Your feedback helps us curate better pieces.</p>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} noValidate>
              <p className="rt-eyebrow">Hudson Furnishings</p>
              <h2 className="rt-title">Share your experience</h2>
              <p className="rt-sub">
                Your review helps other customers make confident choices.
              </p>

              {/* Star selector */}
              <span className="rt-stars-label">Your rating</span>
              <div className="rt-stars" role="radiogroup" aria-label="Star rating">
                {[1,2,3,4,5].map(n => (
                  <button
                    key={n}
                    type="button"
                    className={`rt-star-btn${n <= (hovered || rating) ? ' rt-star-btn--on' : ''}`}
                    onClick={() => { setRating(n); setErrors(er => ({ ...er, rating: undefined })); }}
                    onMouseEnter={() => setHovered(n)}
                    onMouseLeave={() => setHovered(0)}
                    aria-label={`${n} star${n > 1 ? 's' : ''}`}
                    aria-pressed={rating === n}
                  >
                    ★
                  </button>
                ))}
              </div>
              {errors.rating && <span className="rt-error">{errors.rating}</span>}

              {/* Feedback textarea */}
              <label className="rt-field-label" htmlFor="rt-feedback">Your feedback</label>
              <textarea
                id="rt-feedback"
                className="rt-textarea"
                placeholder="What did you love? What could be improved?"
                value={feedback}
                onChange={e => {
                  setFeedback(e.target.value);
                  if (e.target.value.trim()) setErrors(er => ({ ...er, feedback: undefined }));
                }}
                rows={4}
              />
              {errors.feedback && <span className="rt-error">{errors.feedback}</span>}

              <button type="submit" className="rt-submit">
                Submit Review
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Ratings;