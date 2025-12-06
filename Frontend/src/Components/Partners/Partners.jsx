import React, { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { GiDiamondTrophy } from "react-icons/gi";
import "./Partners.css";

const TECHNOLOGIES = [
  { id: 1, category: "Frontend", title: "Modern UI Development", logo: "React.js" },
  { id: 2, category: "Frontend", title: "Enterprise-grade Web Apps", logo: "Angular.js" },
  { id: 3, category: "Frontend", title: "Web Structure & Styling", logo: "HTML5" },
  { id: 4, category: "Frontend", title: "Advanced Styling", logo: "CSS3" },
  { id: 5, category: "Styling", title: "Utility-first CSS Framework", logo: "Tailwind CSS" },
  { id: 6, category: "Frontend", title: "Strongly Typed JavaScript", logo: "TypeScript" },
  { id: 7, category: "Backend", title: "API & Server Development", logo: "Node.js" },
  { id: 8, category: "Backend", title: "Web Backend Framework", logo: "PHP" },
  { id: 9, category: "Mobile", title: "Cross-platform Mobile Apps", logo: "React Native" },
  { id: 10, category: "Database", title: "NoSQL Database", logo: "MongoDB" },
  { id: 11, category: "Database", title: "Relational Database", logo: "MySQL" }
];

const ITEMS_PER_PAGE = 4; // SHOW 4 CARDS PER PAGE

const TechCard = ({ tech }) => (
  <article className="partner-card" tabIndex={0}>
    <div className="partner-card-meta">
      <span className="partner-card-category">{tech.category}</span>
    </div>

    <div className="partner-card-content">
      <strong className="partner-card-logo-text">{tech.logo}</strong>
      <div className="partner-card-agency">{tech.title}</div>
    </div>

    <div className="partner-card-corner-icon-wrapper">
      <GiDiamondTrophy className="partner-card-corner-icon" />
    </div>
  </article>
);

const Technologies = () => {
  const [page, setPage] = useState(1);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const visibleItems = TECHNOLOGIES.slice(start, start + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(TECHNOLOGIES.length / ITEMS_PER_PAGE);

  return (
    <section className="partners">
      <header className="partners-header">
        <div className="partners-titles">
          <h1 className="partners-heading">Technologies We Use</h1>
          <h2 className="partners-sub">Modern. Scalable. Reliable.</h2>
        </div>

        <button type="button" className="partners-cta">
          <span>We work with 10+ modern technologies</span>
          <FiExternalLink className="partners-cta-icon" />
        </button>
      </header>

      <div className="partners-grid">
        {visibleItems.map((tech) => (
          <TechCard key={tech.id} tech={tech} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`page-btn ${page === idx + 1 ? "active" : ""}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Technologies;
