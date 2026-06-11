import React from "react";
import "./AwardsSection.css"; 

const industries = [
  { name: "Healthcare & Hospitals", desc: "Custom software, booking systems, and patient management.", icon: "🏥" },
  { name: "Schools & Education", desc: "ERP, LMS platforms, websites, and student portals.", icon: "🎓" },
  { name: "Real Estate", desc: "Property listing platforms, CRM, and lead automation.", icon: "🏡" },
  { name: "E-Commerce", desc: "Fully functional online stores with payment gateway integration.", icon: "🛒" },
  { name: "Travel & Flight Booking", desc: "Visa platforms, flight search systems, and booking engines.", icon: "✈️" },
  { name: "NGO & Social Organizations", desc: "Donation portals, cause-driven websites, and CRM solutions.", icon: "🤝" },
  { name: "Brand & Corporate Websites", desc: "High-performance, modern, fast-loading business websites.", icon: "💼" },
  { name: "Custom Software & CRM", desc: "Tailored business solutions built for automation and scale.", icon: "⚙️" }
];

const AwardsSection = () => {
  return (
    <section className="awards-wrap">
      <div className="awards-inner">

        {/* LEFT SIDE CONTENT */}
        <aside className="awards-left">
          <div className="badge">
            <span className="badge-dot" />
            <span className="badge-text">INDUSTRIES WE SERVE</span>
          </div>

          <h1 className="awardsec-headline">
            Powering Digital Growth Across<br />
            <span className="muted">Multiple Industries</span>
          </h1>

          <p className="industry-info">
            PR WEBSTOCK delivers scalable digital solutions for businesses across 
            healthcare, education, travel, real estate, online commerce, NGOs, 
            corporate brands, and custom enterprise automation.
          </p>

          <a className="about-link" href="/services/web-development">
            Explore Our Services <span className="chev">↗</span>
          </a>
        </aside>

        {/* RIGHT SIDE GRID */}
        <main className="industries-grid" aria-label="Industries List">
          {industries.map((item, idx) => (
            <div key={idx} className="industry-card">
              <div className="industry-icon">{item.icon}</div>
              <h3 className="industry-title">{item.name}</h3>
              <p className="industry-desc">{item.desc}</p>
            </div>
          ))}
        </main>

      </div>
    </section>
  );
};

export default AwardsSection;
