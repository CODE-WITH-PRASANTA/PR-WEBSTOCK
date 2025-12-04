import React from "react";
import "./Homeabout.css";

const IconProjects = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden>
    <defs>
      <linearGradient id="grad-projects" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 6h-2v6l4 2" fill="none" stroke="url(#grad-projects)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="9" fill="none" stroke="url(#grad-projects)" strokeWidth="2" opacity="0.2" />
  </svg>
);

const IconSmile = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden>
    <defs>
      <linearGradient id="grad-smile" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM7.5 10.5h.01M16.5 10.5h.01M8.5 15a4 4 0 0 0 7 0" fill="none" stroke="url(#grad-smile)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 12a9 9 0 0 1 0 0" fill="none" stroke="url(#grad-smile)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden>
    <defs>
      <linearGradient id="grad-clock" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <path d="M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0zM12 7v6l4 2" fill="none" stroke="url(#grad-clock)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="9" fill="none" stroke="url(#grad-clock)" strokeWidth="2" opacity="0.2" />
  </svg>
);

// New icons for expertise section
const IconInnovation = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
    <defs>
      <linearGradient id="grad-innovation" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
    </defs>
    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" fill="url(#grad-innovation)" />
  </svg>
);

const IconTransparency = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
    <defs>
      <linearGradient id="grad-transparency" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <path d="M12 7.5h2.25m-2.25 3h2.25m-6.75 3h6.75m-6.75 3h6.75m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" fill="none" stroke="url(#grad-transparency)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconClient = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
    <defs>
      <linearGradient id="grad-client" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.707 3.96a9.084 9.084 0 01-1.414 0m-5.518-2.58a9.086 9.086 0 011.832-2.943m3.743 2.943a9.095 9.095 0 01-3.743 1.23m-3.743-1.23a9.09 9.09 0 013.743-1.23m0 0a9.09 9.09 0 013.743 1.23m-7.486 0a9.09 9.09 0 01-3.743-1.23m12.243 4.026a9.095 9.095 0 01-3.743 1.23m-9-1.23a9.094 9.094 0 013.743-1.23m0 0a9.094 9.094 0 013.743 1.23" fill="none" stroke="url(#grad-client)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCost = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
    <defs>
      <linearGradient id="grad-cost" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
    </defs>
    <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" fill="none" stroke="url(#grad-cost)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Homeabout() {
  const expertisePoints = [
    {
      icon: <IconInnovation />,
      title: "Expertise and Innovation",
      description: "We pride ourselves staying at the front of innovation, constantly pushing boundaries a redefining what's possible."
    },
    {
      icon: <IconTransparency />,
      title: "Transparent Process",
      description: "Our transparent process is designed to demystify the journey from concept to delivery."
    },
    {
      icon: <IconClient />,
      title: "Client-Centric Approach",
      description: "Our dedicated team takes the time to listen, & collaborate, ensuring that every interaction a step towards your success."
    },
    {
      icon: <IconCost />,
      title: "Cost-Effective",
      description: "Our commitment to providing cost-effective solutions is ingrained in our mission."
    }
  ];

  return (
    <div className="homeabout-container">
      {/* TOP SECTION - Original Design */}
      <section className="ha-section">
        <div className="ha-inner">
          <div className="ha-left">
            <span className="ha-badge">
              <span className="ha-badge-icon">✦</span> EXPERTISE YOU CAN TRUST <span className="ha-badge-icon">✦</span>
            </span>

            <h1 className="ha-title">
              We are a Startup agency working
              with young talents on delivering
              unique ideas and creative work.
            </h1>

            <p className="ha-lead">
              Where innovation meets passion in a journey that started with a
              simple idea and a shared dream. Founded in recent year we embarked
              on a mission to bring the new innovation and introduce the
              technology. From humble beginnings to our current aspirations,
              every step has been fueled by a relentless commitment.
            </p>

            <button className="ha-cta">
              <span>Our Story</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <aside className="ha-right">
            <div className="ha-stat ha-stat-premium">
              <div className="ha-icon-wrapper">
                <div className="ha-icon-bg"></div>
                <div className="ha-icon"><IconProjects /></div>
              </div>
              <div className="ha-stat-body">
                <div className="ha-stat-number">150<span className="ha-stat-plus">+</span></div>
                <div className="ha-stat-sub">Projects Completed</div>
                <div className="ha-stat-desc">Across 15+ industries</div>
              </div>
            </div>

            <div className="ha-stat ha-stat-premium">
              <div className="ha-icon-wrapper">
                <div className="ha-icon-bg"></div>
                <div className="ha-icon"><IconSmile /></div>
              </div>
              <div className="ha-stat-body">
                <div className="ha-stat-number">98<span className="ha-percent">%</span></div>
                <div className="ha-stat-sub">Client Satisfaction</div>
                <div className="ha-stat-desc">Based on 200+ reviews</div>
              </div>
            </div>

            <div className="ha-stat ha-stat-premium">
              <div className="ha-icon-wrapper">
                <div className="ha-icon-bg"></div>
                <div className="ha-icon"><IconClock /></div>
              </div>
              <div className="ha-stat-body">
                <div className="ha-stat-number">3<span className="ha-unit">mins</span></div>
                <div className="ha-stat-sub">Average Response Time</div>
                <div className="ha-stat-desc">24/7 support</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* BOTTOM SECTION - Expertise Grid */}
      <section className="expertise-section">
        <div className="expertise-container">
          

          <div className="expertise-grid">
            {expertisePoints.map((point, index) => (
              <div className="expertise-card" key={index}>
                <div className="expertise-card-icon">
                  <div className="expertise-icon-bg"></div>
                  {point.icon}
                </div>
                <div className="expertise-card-content">
                  <h3 className="expertise-card-title">{point.title}</h3>
                  <p className="expertise-card-desc">{point.description}</p>
                </div>
                <div className="expertise-card-number">0{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}