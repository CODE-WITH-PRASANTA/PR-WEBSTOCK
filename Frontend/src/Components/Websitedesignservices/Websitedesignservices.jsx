import React, { useEffect, useRef, useState } from 'react';
import './Websitedesignservices.css';

const services = [
  {
    icon: 'https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/palette.svg',
    title: 'Custom Web Design',
    description: 'Build a strong online presence with PR WEBSTOCK, your trusted partner for web design in Bhubaneswar. We create custom, coding-based websites that reflect your brand and support real business growth.',
    bullets: [
      'Custom web design tailored to your business goals',
      'Clean coding for faster performance and better security',
      'SEO-ready structure for improved visibility',
      'Scalable website solutions that grow with your business',
    ],
    color: '#4F46E5',
    gradient: 'linear-gradient(135deg, #4F46E5 0%, #7E22CE 100%)',
    delay: 0
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/brand-wordpress.svg',
    title: 'WordPress Design',
    description: 'At PR WEBSTOCK, we deliver powerful WordPress websites with full customization and performance-focused development. From simple business sites to advanced platforms, we provide reliable solutions built for results.',
    bullets: [
      'Custom WordPress themes and functionality',
      'Mobile-responsive and modern layouts',
      'SEO-friendly architecture with fast loading',
      'Expert development team in Bhubaneswar',
    ],
    color: '#21759B',
    gradient: 'linear-gradient(135deg, #21759B 0%, #1A5F7A 100%)',
    delay: 50
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/layout.svg',
    title: 'Web UI / UX Design',
    description: 'PR WEBSTOCK designs clean, user-friendly interfaces that guide visitors toward action. Our UI/UX services in Bhubaneswar focus on smooth navigation, engaging visuals, and conversion-driven experiences.',
    bullets: [
      'User-focused design approach',
      'Clean and professional interfaces',
      'Easy navigation and engaging visuals',
      'Conversion-driven layouts',
    ],
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    delay: 100
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/device-desktop.svg',
    title: 'CMS Web Design',
    description: 'Manage your website with ease using PR WEBSTOCK’s CMS web design services in Bhubaneswar. We build coding-based content management systems that make updates simple while keeping performance, security, and SEO at the core.',
    bullets: [
      'Easy-to-use admin dashboards',
      'SEO-ready content structure',
      'Simple website management',
      'Scalable and maintainable solutions',
    ],
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    delay: 150
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/target.svg',
    title: 'Landing Page Design',
    description: 'Boost your marketing results with high-converting landing pages by PrWEBSTOCK. We design fast, responsive pages that capture attention and turn visitors into leads.',
    bullets: [
      'Conversion-focused landing pages',
      'Mobile-responsive layouts',
      'Performance optimization for faster loading',
      'Marketing tool integration',
    ],
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
    delay: 200
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/refresh.svg',
    title: 'Redesign Website',
    description: 'Give your outdated website a fresh, modern look with PR WEBSTOCK’s website redesign services in Bhubaneswar. We upgrade design, performance, and usability using clean coding and modern standards.',
    bullets: [
      'Complete website modernization',
      'Improved user experience',
      'Faster loading speed',
      'Brand refresh and alignment',
    ],
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    delay: 250
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/apps.svg',
    title: 'Web App Design',
    description: 'Build powerful web applications with PR WEBSTOCK, your trusted web design company in Bhubaneswar. We create coding-based web apps that improve user experience, streamline operations, and support business growth.',
    bullets: [
      'Complete web app modernization',
      'Improved user experience',
      'API integration and dashboards',
      'Focus on performance and accessibility',
    ],
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    delay: 300
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/bolt.svg',
    title: 'AMP Web Design',
    description: 'Deliver lightning-fast mobile experiences with PrWEBSTOCK’s AMP web design services in Bhubaneswar. We build Accelerated Mobile Pages that load instantly and help improve mobile SEO and conversions.',
    bullets: [
      'Accelerated Mobile Pages (AMP) setup',
      'Lightweight branded layouts',
      'SEO-optimized for mobile performance',
      'Higher mobile engagement and conversions',
    ],
    color: '#F97316',
    gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    delay: 350
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/shopping-cart.svg',
    title: 'E-commerce Website Design',
    description: 'Grow your online store with PR WEBSTOCK’s e-commerce website design in Bhubaneswar. We develop secure, coding-based online shops that make selling simple and customer journeys smooth.',
    bullets: [
      'Conversion-optimized product pages',
      'Secure checkout experiences',
      'Payment gateway integration',
      'Sales analytics and reporting',
    ],
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
    delay: 400
  },
];

export default function Websitedesignservices() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="wds" ref={sectionRef} aria-label="Website design services">
      <div className="wds__container">
        {/* Decorative background elements */}
        <div className="wds__bg-pattern"></div>
        <div className="wds__bg-glow"></div>

        <div className="wds__header">
          

          <h2 className="wds__heading">
            <span className="wds__heading-line">Website Design Services</span>
            <span className="wds__heading-line wds__heading-accent">by PR WEBSTOCK in Bhubaneswar</span>
          </h2>

          <p className="wds__subtitle">
            Transform your digital presence with our comprehensive suite of professional web design services.Upgrade your online presence with PR WEBSTOCK — your trusted partner for professional web design in Bhubaneswar. We offer complete, coding-based website solutions designed to help businesses grow, connect with customers, and build credibility online.
           
          </p>

          <div className="wds__header-decoration">
            <div className="wds__decoration-line"></div>
            <div className="wds__decoration-dot"></div>
            <div className="wds__decoration-line"></div>
          </div>
        </div>

        <div className="wds__grid">
          {services.map((service, idx) => (
            <article
              className={`wds__card ${hoveredCard === idx ? 'wds__card--hovered' : ''}`}
              key={idx}
              ref={el => cardsRef.current[idx] = el}
              style={{ '--delay': `${service.delay}ms`, '--card-color': service.color, '--card-gradient': service.gradient }}
              aria-labelledby={`service-${idx}`}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card background layers */}
              <div className="wds__card-bg" style={{ background: service.gradient }}></div>
              <div className="wds__card-bg-shine"></div>
              
              {/* Card corner decorations */}
              <div className="wds__card-corner wds__card-corner--tl"></div>
              <div className="wds__card-corner wds__card-corner--tr"></div>
              <div className="wds__card-corner wds__card-corner--bl"></div>
              <div className="wds__card-corner wds__card-corner--br"></div>

              <div className="wds__card-content">
                <div className="wds__card-icon-wrapper" style={{ background: service.gradient }}>
                  <div className="wds__card-icon-bg"></div>
                  <img
                    src={service.icon}
                    alt=""
                    className="wds__card-icon"
                    aria-hidden="true"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="3" width="18" height="18" rx="3" stroke="white" stroke-width="2"/>
                          <path d="M8 8H16M8 12H16M8 16H12" stroke="white" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                      `;
                    }}
                  />
                  <div className="wds__card-icon-glow"></div>
                </div>

                <div className="wds__card-header">
                  <h3 id={`service-${idx}`} className="wds__card-title">
                    {service.title}
                  </h3>
                  <p className="wds__card-description">
                    {service.description}
                  </p>
                </div>

                <ul className="wds__card-bullets">
                  {service.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="wds__card-bullet">
                      <span className="wds__bullet-marker">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span className="wds__bullet-text">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="wds__card-glow" style={{ background: service.gradient }}></div>
            </article>
          ))}
        </div>

        
      </div>
    </section>
  );
}