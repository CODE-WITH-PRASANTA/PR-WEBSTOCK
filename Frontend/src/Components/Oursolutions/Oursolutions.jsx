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
    title: 'Website Development', 
    desc: 'We create fully custom, SEO-optimized, mobile-responsive websites tailored to your brand. PR WEBSTOCK builds high-performance websites that enhance credibility, improve conversions, and support long-term business growth. Trusted by 80+ clients across industries.',
    gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
    link: '/services/web-development'
  },

  { 
    icon: <IconCloud />, 
    title: 'Application Development', 
    desc: 'We develop reliable and scalable mobile & web applications with clean UI/UX, secure backend architecture, and smooth performance. Our apps are designed for startups, enterprises, and businesses looking to digitize operations with modern technology.',
    gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    link: '/services/app-development'
  },

  { 
    icon: <IconAnalytics />, 
    title: 'SEO & Digital Marketing', 
    desc: 'Rank higher, grow faster. Our SEO and digital marketing solutions help businesses increase visibility, generate organic leads, and build a strong online brand. Includes keyword strategy, Google ranking optimization, paid ads, and content marketing.',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    link: '/services/seo'
  },

  { 
    icon: <IconConsult />, 
    title: 'Social Media Management', 
    desc: 'We manage your social media professionally with content planning, brand strategy, reels, paid ads, and weekly reports. Build trust, grow engagement, and convert followers into real customers with PR WEBSTOCK’s expert SMM services.',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    link: '/services/digital-marketing'
  },

  { 
    icon: <IconShield />, 
    title: 'Payment Gateway (PhonePe Partner)', 
    desc: 'PR WEBSTOCK is an official PhonePe Payment Gateway Partner. We provide fast onboarding, integration, merchant approval, settlement setup, and API documentation support for businesses. Ideal for eCommerce, apps, service platforms, and startups.',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    link: '/services/payment-gateway'
  },

  { 
    icon: <IconSupport />, 
    title: '24/7 IT Support & Maintenance', 
    desc: 'Round-the-clock monitoring, bug fixing, uptime management, cloud support, and security maintenance. We ensure your website, application, CRM, or portal stays fast, secure, and running smoothly every day — with an average 3-minute response time.',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    link: '/services/support'
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
              Discover premium IT services crafted by PR WEBSTOCK — a trusted software company delivering 
              Website Development, Application Development, SEO, Digital Marketing, Social Media Management, 
              and PhonePe Payment Gateway onboarding. We help businesses grow with secure, scalable and 
              high-performance digital solutions.
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

               <a className="os-card-link" href={c.link} aria-label={`Learn more about ${c.title}`}>
                  <span className="os-card-link-text">LEARN MORE</span>
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