import React from 'react';
import './Oursolutions.css';

/* Premium Gradient Icons */
const IconWeb = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden focusable="false">
    <defs>
      <linearGradient id="grad-web" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
    </defs>
    <rect x="2" y="4" width="20" height="14" rx="2" fill="url(#grad-web)" fillOpacity="0.1" stroke="url(#grad-web)" strokeWidth="1.6"/>
    <path d="M6 8h12M6 12h12" fill="none" stroke="url(#grad-web)" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IconConsult = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden focusable="false">
    <defs>
      <linearGradient id="grad-consult" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <path d="M6 8v6" fill="none" stroke="url(#grad-consult)" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M18 8v6" fill="none" stroke="url(#grad-consult)" strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="12" cy="11" r="3.2" fill="url(#grad-consult)" fillOpacity="0.1" stroke="url(#grad-consult)" strokeWidth="1.6"/>
  </svg>
);

const IconShield = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden focusable="false">
    <defs>
      <linearGradient id="grad-shield" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <path d="M12 3l7 3v5c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V6l7-3z" fill="url(#grad-shield)" fillOpacity="0.1" stroke="url(#grad-shield)" strokeWidth="1.6" strokeLinejoin="round"/>
  </svg>
);

const IconCloud = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden focusable="false">
    <defs>
      <linearGradient id="grad-cloud" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>
    <path d="M20 17.5A4.5 4.5 0 0 0 15.5 13h-1A4 4 0 1 0 6 16.5" fill="none" stroke="url(#grad-cloud)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 17.5A4.5 4.5 0 0 0 15.5 13h-1A4 4 0 1 0 6 16.5" fill="url(#grad-cloud)" fillOpacity="0.1" stroke="none"/>
  </svg>
);

const IconAnalytics = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden focusable="false">
    <defs>
      <linearGradient id="grad-analytics" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    <path d="M4 19h16M7 15v-6M12 15v-3M17 15V9" fill="none" stroke="url(#grad-analytics)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconSupport = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden focusable="false">
    <defs>
      <linearGradient id="grad-support" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
    </defs>
    <path d="M12 2a7 7 0 0 0-7 7v3a7 7 0 0 0 7 7 7 7 0 0 0 7-7V9a7 7 0 0 0-7-7z" fill="url(#grad-support)" fillOpacity="0.1" stroke="url(#grad-support)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 9h6" fill="none" stroke="url(#grad-support)" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const cards = [
  { 
    icon: <IconWeb />, 
    title: 'Web & App Development', 
    desc: 'Revolutionize your digital presence with our Web & App Development services—innovative solutions, user-centric experiences.',
    gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)'
  },
  { 
    icon: <IconConsult />, 
    title: 'Consulting Services', 
    desc: 'Strategic guidance for success: Elevate your business with our expert Consulting Services, tailored for growth and innovation.',
    gradient: 'linear-gradient(135deg, #10b981, #059669)'
  },
  { 
    icon: <IconShield />, 
    title: 'Cyber Security', 
    desc: 'Guard your digital fortress with our Cyber Security solutions—ensuring robust protection against evolving threats.',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
  },
  { 
    icon: <IconCloud />, 
    title: 'Cloud & DevOps', 
    desc: 'Reliable cloud architecture and DevOps automation to scale faster, reduce downtime, and ship features more often.',
    gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
  },
  { 
    icon: <IconAnalytics />, 
    title: 'Data & Analytics', 
    desc: 'Turn data into decisions with analytics, dashboards, and machine learning to drive measurable business outcomes.',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
  },
  { 
    icon: <IconSupport />, 
    title: 'Managed IT & Support', 
    desc: '24/7 managed IT and customer support to keep operations running, systems secure, and customers satisfied.',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)'
  }
];

const Oursolutions = () => {
  const getDelay = (index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    
    // Row-by-row stagger with slight diagonal flow
    // First row: 0, 100ms, 200ms
    // Second row: 150ms, 250ms, 350ms
    return (row * 150) + (col * 100);
  };

  return (
    <section className="os-section" aria-labelledby="os-heading">
      <div className="os-inner">
        <div className="os-header">
          <div className="os-head-left">
            <div className="os-badge">
              <span className="os-badge-icon">✦</span> EXPERTISE YOU CAN TRUST <span className="os-badge-icon">✦</span>
            </div>
            <h2 id="os-heading" className="os-title">Explore Our Solutions</h2>
            <p className="os-subtitle">
              Comprehensive digital solutions designed to elevate your business, 
              enhance security, and drive growth through cutting-edge technology.
            </p>
          </div>

          <div className="os-head-right">
            <button className="os-explore-btn">
              Explore All Services
              <span className="os-explore-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div className="os-grid" role="list" aria-label="Solutions list">
          {cards.map((c, i) => {
            const delay = getDelay(i);
            
            return (
              <article
                className="os-card"
                key={i}
                role="listitem"
                tabIndex={0}
                style={{ 
                  '--delay': `${delay}ms`,
                  '--card-gradient': c.gradient 
                }}
                aria-label={c.title}
              >
                <div className="os-card-glow" />
                <div className="os-card-shine" />
                
                <div className="os-card-top">
                  <div className="os-card-icon-wrapper">
                    <div className="os-card-icon-bg" style={{ background: c.gradient }} />
                    <div className="os-card-icon" aria-hidden>{c.icon}</div>
                  </div>
                  <h3 className="os-card-title">{c.title}</h3>
                </div>

                <p className="os-card-desc">{c.desc}</p>

                <div className="os-divider-wrapper">
                  <div className="os-divider" />
                  <div className="os-divider-glow" style={{ background: c.gradient }} />
                </div>

                <a className="os-card-link" href="#explore" aria-label={`Explore more about ${c.title}`}>
                  <span className="os-card-link-text">EXPLORE MORE</span>
                  <span className="os-card-link-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <div className="os-card-link-hover" style={{ background: c.gradient }} />
                </a>
              </article>
            );
          })}
        </div>
        
       
      </div>
    </section>
  );
};

export default Oursolutions;