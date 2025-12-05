// SuccessInTheField.jsx
// React component (CSS file: Successinthefield.css)
// Minimal visual changes. Classnames have been made unique (prefix: sifux-) as requested.
// Right-side cards displayed in a 1fr 1fr grid. "Next" and "Prev" buttons cycle through the list of cards
// showing two cards at a time. Clicking Next will place the next same-type card in view (wraps around).

import React, { useState } from 'react'
import './Successinthefield.css'

const cardData = [
  {
    id: 1,
    tag: 'CREATIVE AGENCY',
    title: `Overcoming Expansion An Initial Agency's Triumph`,
    excerpt: `In this case study, we dissect the challenges faced, the strategies employed, and the remarkable outcomes achieved through our collaborative efforts.`,
    imageUrl: 'https://media.gettyimages.com/id/2192204497/photo/sydney-australia-virat-kohli-of-india-looks-dejected-while-leaving-the-field-after-being.jpg?s=612x612&w=0&k=20&c=tYyWEcj2rS8PAc9qvdE-lh67fNmTCCzQ5rGXyG-rlmE='
  },
  {
    id: 2,
    tag: 'STARTUP COMPANY',
    title: 'Navigating Growth A Startup Agency Success Story.',
    excerpt: `In this case study, we dissect the challenges faced and the remarkable outcomes achieved through our collaborative efforts.`,
    imageUrl: 'https://media.gettyimages.com/id/2192204497/photo/sydney-australia-virat-kohli-of-india-looks-dejected-while-leaving-the-field-after-being.jpg?s=612x612&w=0&k=20&c=tYyWEcj2rS8PAc9qvdE-lh67fNmTCCzQ5rGXyG-rlmE='
  },
  {
    id: 3,
    tag: 'ENTERPRISE',
    title: 'Scaling Operations A Large Company Case Study',
    excerpt: `A deep dive into operational improvements and measurable KPIs delivered through targeted program improvements.`,
    imageUrl: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=ghi789'
  },
  {
    id: 4,
    tag: 'NON-PROFIT',
    title: 'Community Impact A Non-Profit Success Story',
    excerpt: `How mission-driven design and outreach increased program participation and measurable outcomes.`,
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=jkl012'
  }
]

const Successinthefield = () => {
  // index points to the first of the two cards currently visible
  const [index, setIndex] = useState(0)
  const len = cardData.length

  function next() {
    setIndex((prev) => (prev + 1) % len)
  }

  function prev() {
    setIndex((prev) => (prev - 1 + len) % len)
  }

  const firstCard = cardData[index]
  const secondCard = cardData[(index + 1) % len]

  return (
    <section className="sifux-section">
      <div className="sifux-container">
        <div className="sifux-grid">
          {/* Left hero */}
          <aside className="sifux-hero">
            <img
              className="sifux-hero-img"
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a2b3c"
              alt="Team meeting"
            />

            <div className="sifux-hero-overlay">
              <p className="sifux-tag">✺ <span>BUSINESS TRANSFORMATIONS</span> ✺</p>
              <h2 className="sifux-title">Success in the Field</h2>
              <p className="sifux-desc">
                Dive into the success story of <strong>[Client/Project Name]</strong> and witness firsthand the
                transformative journey that exemplifies the impact of our solutions.
              </p>

              <a className="sifux-cta" href="#stories">View All Stories</a>
            </div>
          </aside>

          {/* Right cards */}
          <div className="sifux-cards">
            <div className="sifux-cards-grid">
              <CaseCard key={firstCard.id} {...firstCard} />
              <CaseCard key={secondCard.id} {...secondCard} />
            </div>

            <div className="sifux-arrows">
              <button className="sifux-arrow" onClick={prev} aria-label="previous">←</button>
              <button className="sifux-arrow" onClick={next} aria-label="next">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CaseCard({ tag, title, excerpt, imageUrl }) {
  return (
    <article className="sifux-card">
      <div className="sifux-card-media">
        <img src={imageUrl} alt="card" />
      </div>
      <div className="sifux-card-body">
        <div className="sifux-card-tag">{tag}</div>
        <h3 className="sifux-card-title">{title}</h3>
        <p className="sifux-card-excerpt">{excerpt}</p>
        <a className="sifux-learn" href="#">LEARN MORE →</a>
      </div>
    </article>
  )
}

export default Successinthefield