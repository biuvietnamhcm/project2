import React, { useState } from 'react';

/* ─── Google Fonts (shared with Homepage, safe to re-inject) ─── */
if (!document.getElementById('hf-fonts')) {
  const link = document.createElement('link');
  link.id = 'hf-fonts';
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap';
  document.head.appendChild(link);
}

const css = `
  .faq-page {
    font-family: 'DM Sans', sans-serif;
    background: #f5f2ee;
    color: #1c1c1c;
    min-height: 100vh;
  }

  /* ── Hero ── */
  .faq-hero {
    background: #1c1c1c;
    padding: 7rem 6vw 5rem;
    position: relative;
    overflow: hidden;
  }
  .faq-hero__bar {
    width: 40px;
    height: 1px;
    background: #c8a96e;
    margin-bottom: 2rem;
  }
  .faq-hero__eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #c8a96e;
    font-weight: 500;
    margin-bottom: 1.2rem;
  }
  .faq-hero__title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.8rem, 6vw, 5rem);
    font-weight: 300;
    color: #f5f2ee;
    line-height: 1.05;
    margin: 0 0 1.5rem;
  }
  .faq-hero__title em {
    font-style: italic;
    color: #c8a96e;
  }
  .faq-hero__sub {
    font-size: 0.9rem;
    line-height: 1.8;
    color: rgba(245,242,238,0.5);
    font-weight: 300;
    max-width: 460px;
    margin: 0;
  }
  .faq-hero__deco {
    position: absolute;
    right: 6vw;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(6rem, 14vw, 12rem);
    font-weight: 300;
    color: rgba(200,169,110,0.08);
    line-height: 1;
    user-select: none;
    pointer-events: none;
  }

  /* ── Category tabs ── */
  .faq-tabs {
    display: flex;
    gap: 0;
    padding: 0 6vw;
    border-bottom: 1px solid #e0dbd6;
    background: #f5f2ee;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .faq-tabs::-webkit-scrollbar { display: none; }
  .faq-tab {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 500;
    color: #888;
    padding: 1.2rem 1.6rem;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
    transition: color 0.25s, border-color 0.25s;
    background: none;
    border-top: none;
    border-left: none;
    border-right: none;
  }
  .faq-tab:hover { color: #1c1c1c; }
  .faq-tab.active {
    color: #1c1c1c;
    border-bottom-color: #c8a96e;
  }

  /* ── Accordion list ── */
  .faq-list {
    max-width: 860px;
    margin: 0 auto;
    padding: 4rem 6vw 6rem;
  }

  .faq-item {
    border-bottom: 1px solid #e0dbd6;
  }
  .faq-item:first-child {
    border-top: 1px solid #e0dbd6;
  }

  .faq-trigger {
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    padding: 2rem 0;
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    text-align: left;
    transition: none;
  }
  .faq-trigger:hover .faq-q {
    color: #8b6f47;
  }

  .faq-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.9rem;
    font-weight: 400;
    color: #c8a96e;
    min-width: 2rem;
    padding-top: 2px;
    line-height: 1;
  }

  .faq-q {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    font-weight: 400;
    color: #1c1c1c;
    line-height: 1.3;
    flex: 1;
    transition: color 0.25s;
    margin: 0;
  }

  .faq-icon {
    width: 20px;
    height: 20px;
    position: relative;
    flex-shrink: 0;
    margin-top: 3px;
  }
  .faq-icon::before,
  .faq-icon::after {
    content: '';
    position: absolute;
    background: #c8a96e;
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s;
  }
  .faq-icon::before {
    width: 14px;
    height: 1px;
    top: 50%;
    left: 3px;
  }
  .faq-icon::after {
    width: 1px;
    height: 14px;
    left: 50%;
    top: 3px;
  }
  .faq-item.open .faq-icon::after {
    transform: scaleY(0);
    opacity: 0;
  }

  .faq-body {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1);
  }
  .faq-item.open .faq-body {
    max-height: 400px;
  }

  .faq-answer {
    padding: 0 0 2.2rem 4rem;
    font-size: 0.9rem;
    line-height: 1.9;
    color: #555;
    font-weight: 300;
    max-width: 620px;
  }

  /* ── Bottom CTA ── */
  .faq-cta {
    background: #1c1c1c;
    padding: 5rem 6vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
  }
  .faq-cta__text {}
  .faq-cta__eyebrow {
    font-size: 0.68rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c8a96e;
    font-weight: 500;
    margin-bottom: 0.8rem;
  }
  .faq-cta__heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 300;
    color: #f5f2ee;
    margin: 0;
    line-height: 1.1;
  }
  .faq-cta__heading em { font-style: italic; color: #c8a96e; }
  .hf-btn-primary {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 500;
    padding: 0.9rem 2.2rem;
    background: #c8a96e;
    color: #1c1c1c;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.3s, transform 0.25s;
    flex-shrink: 0;
  }
  .hf-btn-primary:hover {
    background: #d9be8a;
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    .faq-hero { padding: 5rem 5vw 4rem; }
    .faq-tabs { padding: 0 5vw; }
    .faq-list { padding: 3rem 5vw 5rem; }
    .faq-answer { padding-left: 3rem; }
    .faq-cta { padding: 4rem 5vw; flex-direction: column; align-items: flex-start; }
  }
`;

const ALL_FAQS = [
  {
    category: 'Products',
    question: 'What types of furniture do you offer?',
    answer:
      'At Hudson Furnishings, we specialise in a wide range of home furniture — bedroom sets, sofas, mattresses, and kitchen furniture. We also provide custom orders through our exclusive Palliser studio.',
  },
  {
    category: 'Products',
    question: 'Can I customise my furniture?',
    answer:
      'Absolutely. We are the only Palliser custom order studio in the area, offering over 300 different fabrics and leathers to create furniture that perfectly fits your style and needs.',
  },
  {
    category: 'Products',
    question: 'Are your products eco-friendly?',
    answer:
      'We are committed to sustainability and source many of our materials from eco-friendly suppliers. Look for our eco-friendly collections in-store — our team can point you to them directly.',
  },
  {
    category: 'Shopping',
    question: 'How do I choose the right furniture for my home?',
    answer:
      'Our showrooms are designed to make navigation effortless. Our staff is available to provide personalised advice and ideas on how to complement your existing décor — no appointment necessary.',
  },
  {
    category: 'Shopping',
    question: 'Can I place an order online?',
    answer:
      'Currently, we encourage in-store shopping to provide a fully personalised experience. You can browse our collections online and contact us to arrange custom orders or reserve pieces.',
  },
  {
    category: 'Shopping',
    question: 'What are your store hours?',
    answer:
      'We are open Monday to Saturday from 10 AM to 6 PM and Sunday from 12 PM to 5 PM. We look forward to helping you find the perfect pieces for your home.',
  },
  {
    category: 'Orders & Delivery',
    question: 'What is your return policy?',
    answer:
      'We offer a straightforward return policy. If you are not satisfied with your purchase, you may return it within 30 days for a refund or exchange, provided it is in its original condition.',
  },
  {
    category: 'Orders & Delivery',
    question: 'Do you offer financing options?',
    answer:
      'Yes, we provide various financing options to make your purchase more manageable. Please speak with our sales team in-store for details tailored to your situation.',
  },
  {
    category: 'Care',
    question: 'How do I care for my furniture?',
    answer:
      'Care varies by material. For fabric upholstery, regular vacuuming and prompt spot-cleaning are key. Leather benefits from occasional conditioning every 6–12 months. Hardwood surfaces should be kept away from direct sunlight and wiped with a slightly damp cloth.',
  },
  {
    category: 'Design',
    question: 'What if I need help with interior design?',
    answer:
      'Our team is passionate about interiors and is here to help. We offer complimentary consultation services to guide you in choosing the right pieces and designing your space with intention.',
  },
];

const CATEGORIES = ['All', ...Array.from(new Set(ALL_FAQS.map(f => f.category)))];

function FaqPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = activeTab === 'All'
    ? ALL_FAQS
    : ALL_FAQS.filter(f => f.category === activeTab);

  const toggle = i => setOpenIndex(prev => (prev === i ? null : i));

  /* reset open item when tab changes */
  const changeTab = tab => {
    setActiveTab(tab);
    setOpenIndex(null);
  };

  return (
    <>
      <style>{css}</style>
      <div className="faq-page">

        {/* ── Hero ── */}
        <div className="faq-hero">
          <div className="faq-hero__bar" />
          <p className="faq-hero__eyebrow">Help Centre</p>
          <h1 className="faq-hero__title">
            Frequently asked<br /><em>questions</em>
          </h1>
          <p className="faq-hero__sub">
            Everything you need to know about shopping, customisation, delivery,
            and care at Hudson Furnishings.
          </p>
          <div className="faq-hero__deco" aria-hidden="true">FAQ</div>
        </div>

        {/* ── Category tabs ── */}
        <div className="faq-tabs" role="tablist">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`faq-tab${activeTab === cat ? ' active' : ''}`}
              onClick={() => changeTab(cat)}
              role="tab"
              aria-selected={activeTab === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Accordion ── */}
        <div className="faq-list">
          {filtered.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`faq-item${isOpen ? ' open' : ''}`}>
                <button
                  className="faq-trigger"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="faq-q">{faq.question}</h2>
                  <span className="faq-icon" aria-hidden="true" />
                </button>
                <div className="faq-body" aria-hidden={!isOpen}>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="faq-cta">
          <div className="faq-cta__text">
            <p className="faq-cta__eyebrow">Still have questions?</p>
            <h2 className="faq-cta__heading">
              We are happy to<br /><em>help in person</em>
            </h2>
          </div>
          <button
            className="hf-btn-primary"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Us
          </button>
        </div>

      </div>
    </>
  );
}

export default FaqPage;