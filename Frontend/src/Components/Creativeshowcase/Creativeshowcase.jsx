import React, { useEffect, useRef, useState } from 'react';
import './CreativeShowcase.css';

const portfolioItems = [
  {
    id: 1,
    title: 'Human Resources Transformation',
    description: 'Complete HR digital transformation for a Fortune 500 company',
    category: 'consulting',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    tag: 'Consulting',
  },
  {
    id: 2,
    title: 'Healthcare Management System',
    description: 'Modern healthcare platform serving 50+ clinics nationwide',
    category: 'healthcare',
    image: 'https://images.unsplash.com/photo-1516549655669-dfbf10d0c9b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    tag: 'Health Care',
  },
  {
    id: 3,
    title: 'Digital Marketing Strategy',
    description: 'Comprehensive digital marketing strategy increasing ROI by 180%',
    category: 'marketing',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    tag: 'Marketing',
  },
  {
    id: 4,
    title: 'Management Consulting',
    description: 'Operational efficiency improvement for manufacturing sector',
    category: 'management',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    tag: 'Management',
  },
  {
    id: 5,
    title: 'Health Care Consultancy',
    description: 'Strategic healthcare consultancy improving patient outcomes',
    category: 'healthcare',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    tag: 'Health Care',
  },
  {
    id: 6,
    title: 'Management Consulting Platform',
    description: 'AI-powered consulting platform for enterprise clients',
    category: 'consulting',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    tag: 'Consulting',
  },
];

const CreativeShowcase = () => {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const cardRef = useRef(null); // first card measurement
  const autoRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [cardGap, setCardGap] = useState(32);

  const total = portfolioItems.length;
  const maxIndex = Math.max(0, total - slidesToShow);

  // Responsive slidesToShow calculation using ResizeObserver for accurate container width
  useEffect(() => {
    const calculate = () => {
      const width = window.innerWidth;
      if (width >= 1200) setSlidesToShow(3);
      else if (width >= 768) setSlidesToShow(2);
      else setSlidesToShow(1);
    };
    calculate();

    const ro = new ResizeObserver(() => {
      calculate();
      // ensure index remains valid after layout change
      setCurrentIndex(prev => Math.min(prev, Math.max(0, total - Math.max(1, slidesToShow))));
    });

    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', calculate);

    return () => {
      window.removeEventListener('resize', calculate);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  // Make sure currentIndex doesn't exceed new max when slidesToShow changes
  useEffect(() => {
    setCurrentIndex(prev => Math.min(prev, Math.max(0, total - slidesToShow)));
  }, [slidesToShow, total]);

  // Autoplay
  useEffect(() => {
    if (!isPlaying) return;
    autoRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 2000);

    return () => {
      clearInterval(autoRef.current);
    };
  }, [isPlaying, maxIndex]);

  // Compute track transform using measured card width
  const computeTransform = () => {
    if (!trackRef.current) return 'translateX(0px)';
    const track = trackRef.current;
    const firstCard = track.querySelector('.cs-card');
    if (!firstCard) return 'translateX(0px)';
    const cardWidth = firstCard.offsetWidth;
    const gap = cardGap; // matches CSS gap ~32px default
    return `translateX(-${(cardWidth + gap) * currentIndex}px)`;
  };

  // Keep cardGap in sync with CSS (if you change CSS gap, adjust here)
  useEffect(() => {
    // if you want to compute gap dynamically, you can inspect computedStyle of the track
    const track = trackRef.current;
    if (!track) return;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap || style.columnGap || 32);
    setCardGap(isNaN(gap) ? 32 : gap);
  }, []);

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStartX == null || touchEndX == null) {
      setTouchStartX(null);
      setTouchEndX(null);
      return;
    }
    const diff = touchStartX - touchEndX;
    const threshold = 50;
    if (diff > threshold) {
      // left swipe
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    } else if (diff < -threshold) {
      // right swipe
      setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const goTo = (index) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  };

  const handleMouseEnter = () => {
    setIsPlaying(false);
    clearInterval(autoRef.current);
  };
  const handleMouseLeave = () => {
    setIsPlaying(true);
  };

  return (
    <section
      className="cs-section"
      aria-label="Creative Portfolio Showcase"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="cs-inner">
        <header className="cs-header">
          <div className="cs-head-left">
            <div className="cs-subtle">
              <span className="cs-subtle-icon">✦</span> VISUAL EXCELLENCE <span className="cs-subtle-icon">✦</span>
            </div>
            <h2 className="cs-title">Our Creative Showcase</h2>
            <p className="cs-subtitle">
              A selection of strategic projects — design-forward, data-driven, and built to scale. Click any card to view case studies.
            </p>
          </div>

          <div className="cs-head-right">
            <button className="cs-cta" aria-label="View all portfolio">
              View All Portfolio
              <span className="cs-cta-arrow" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </header>

        <div className="cs-carousel-container">
          <div
            className="cs-carousel-wrapper"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="cs-carousel-track"
              ref={trackRef}
              style={{ transform: computeTransform() }}
            >
              {portfolioItems.map((item, i) => (
                <article
                  key={item.id}
                  className="cs-card"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${total} — ${item.title}`}
                  ref={i === 0 ? cardRef : null}
                >
                  <div className="cs-card-image">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <div className="cs-card-overlay">
                      <span className="cs-card-tag light">{item.tag}</span>

                      <div className="cs-card-hover-content">
                        <h4 className="cs-card-hover-title">{item.title}</h4>
                        <a href="#case" className="cs-card-hover-button" aria-label={`View case study: ${item.title}`}>
                          View Case Study
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="cs-card-content">
                    <span className="cs-card-tag">{item.tag}</span>
                    <h3 className="creativeshowcase-title">{item.title}</h3>
                    <p className="cs-card-description">{item.description}</p>
                    <a href="#learn" className="cs-card-link">
                      Learn More
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Navigation dots only (no left/right arrows) */}
          <div className="cs-carousel-controls">
            <div className="cs-dots" role="tablist" aria-label="Carousel navigation">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  className={`cs-dot ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-pressed={i === currentIndex}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CreativeShowcase;
