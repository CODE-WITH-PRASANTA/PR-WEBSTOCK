import React, { useEffect, useRef } from 'react';
import './Creativewebdesign.css';
import innerimage from '../../assets/intro-banner.webp';

const Creativewebdesign = () => {
  const markerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (markerRef.current) observer.observe(markerRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="Creativewebdesign-root Creativewebdesign-section">
      <div className="Creativewebdesign-inner">

        {/* Left decorative column */}
        <div className="Creativewebdesign-left">
          <div
            className="Creativewebdesign-marker"
            aria-hidden="true"
            ref={markerRef}
          >
            {/* SVG Decorative Element */}
            <svg
              className="Creativewebdesign-svg"
              width="180"
              height="180"
              viewBox="0 0 180 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Decorative circular design element"
            >
              <defs>
                <radialGradient id="g1" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                  <stop offset="60%" stopColor="rgba(255,255,255,0.08)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                </radialGradient>

                <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.18" />
                </linearGradient>

                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Outer glow */}
              <circle cx="90" cy="90" r="74" fill="url(#g2)" fillOpacity="0.08" />

              {/* Main circle */}
              <circle
                cx="90"
                cy="90"
                r="68"
                stroke="rgba(31, 31, 31, 0.18)"
                strokeWidth="2"
                fill="url(#g1)"
              />

              {/* Inner decorative rings */}
              <circle cx="90" cy="90" r="52" stroke="rgba(37,99,235,0.22)" strokeWidth="1" fill="none" />
              <circle cx="90" cy="90" r="36" stroke="rgba(37,99,235,0.12)" strokeWidth="0.6" fill="none" />

              {/* Center glowing dot */}
              <circle cx="90" cy="90" r="5" fill="#2563eb" filter="url(#glow)" />
            </svg>
          </div>
        </div>

        {/* Right Content Column */}
        <div className="Creativewebdesign-right">
          <h2 id="creative-heading" className="Creativewebdesign-title">
            Your search for creative web design ends at Webomindapps, 
            the best website designing company in Bangalore
          </h2>

          <div className="Creativewebdesign-media">
            <img
              src={innerimage}
              alt="Team discussing web design at Webomindapps office"
              className="Creativewebdesign-image"
              ref={imageRef}
              loading="lazy"
              decoding="async"
            />

            <article
              className="Creativewebdesign-card"
              aria-labelledby="card-heading"
              role="complementary"
            >
              <h3 id="card-heading" className="Creativewebdesign-card-title">
                Webomindapps — Creative web design company in Bangalore
              </h3>

              <p className="Creativewebdesign-card-text">
                Webomindapps is a top web design company in Bangalore, dedicated to providing a
                wide range of professional web designing services. Our expertise lies in creating
                websites that are optimized and run flawlessly across all devices and screen sizes.
                We are a team of like-minded enthusiasts who strive to provide our clients with
                secure and fast websites by combining dynamic looks with exceptional performance.
              </p>
            </article>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Creativewebdesign;
