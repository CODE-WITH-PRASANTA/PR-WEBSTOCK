import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { GiDiamondTrophy } from "react-icons/gi";
import "./partners.css";

const PARTNERS = [
  { id: 1, category: "TECHNOLOGY", title: "Volo Digital Agency", logo: "VOLO" },
  { id: 2, category: "DESIGN", title: "zurMarke Studio", logo: "zurMarke" },
  { id: 3, category: "CONSULTING", title: "Pathpoint Consulting", logo: "PathPoint" },
  { id: 4, category: "TECHNOLOGY", title: "Digiart Agency", logo: "DIGIART" },
  { id: 5, category: "DESIGN", title: "ZurMarke Studio", logo: "CEPSA" },
  { id: 6, category: "CONSULTING", title: "Pathpoint Consulting", logo: "Maestro" },
  { id: 7, category: "TECHNOLOGY", title: "Genesis Agency", logo: "GENESIS" },
  { id: 8, category: "CONSULTING", title: "Heraflax", logo: "Heraflax" }
];

const PartnerCard = ({ partner }) => {
  return (
    <article className="partner-card" tabIndex={0}>
      <div className="partner-card-meta">
        <span className="partner-card-category">{partner.category}</span>
      </div>

      <div className="partner-card-content">
        <strong className="partner-card-logo-text">{partner.logo}</strong>
        <div className="partner-card-agency">{partner.title}</div>
      </div>

      <div className="partner-card-corner-icon-wrapper">
        <GiDiamondTrophy className="partner-card-corner-icon" />
      </div>
    </article>
  );
};

const Partners = () => {
  return (
    <section className="partners">
      <header className="partners-header">
        <div className="partners-titles">
          <h1 className="partners-heading">Our Partnerships</h1>
          <h2 className="partners-sub">Assurance.</h2>
        </div>

        <button type="button" className="partners-cta">
          <span>Almost 20+ Partner we have</span>
          <FiExternalLink className="partners-cta-icon" />
        </button>
      </header>

      <div className="partners-grid">
        {PARTNERS.map((p) => (
          <PartnerCard key={p.id} partner={p} />
        ))}
      </div>
    </section>
  );
};

export default Partners;
