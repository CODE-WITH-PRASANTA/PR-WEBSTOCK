import React from "react";
import "./Webomindappsvsother.css";

const rows = [
  {
    feature: "Custom Web Design",
    webText: "Custom-crafted, brand-focused designs",
    webIcon: "check",
    otherText: "Often rely on pre-made templates",
    otherIcon: "cross",
  },
  {
    feature: "User Experience (UX) Optimization",
    webText: "UI/UX strategy integrated",
    webIcon: "check",
    otherText: "Basic layout focus only",
    otherIcon: "cross",
  },
  {
    feature: "SEO-Friendly Design",
    webText: "Built with SEO best practices",
    webIcon: "check",
    otherText: "Limited or no on-page SEO",
    otherIcon: "cross",
  },
  {
    feature: "Core Web Vitals Optimization",
    webText: "Fast loading, meets Google standards",
    webIcon: "check",
    otherText: "Often overlooked",
    otherIcon: "cross",
  },
  {
    feature: "Technology Stack",
    webText: "Uses latest frameworks (HTML5, CSS3, JS)",
    webIcon: "check",
    otherText: "Limited to outdated technologies",
    otherIcon: "cross",
  },
  {
    feature: "CMS Integration",
    webText: "WordPress, Webflow, Custom CMS options",
    webIcon: "check",
    otherText: "Restricted CMS offerings",
    otherIcon: "warn",
  },
  {
    feature: "Support & Maintenance",
    webText: "Ongoing support post-launch",
    webIcon: "check",
    otherText: "Often lacks post-delivery support",
    otherIcon: "cross",
  },
  {
    feature: "Transparency & Timelines",
    webText: "Fixed delivery milestones",
    webIcon: "check",
    otherText: "Unclear timelines",
    otherIcon: "warn",
  },
  {
    feature: "Pricing",
    webText: "Competitive & value-driven",
    webIcon: "check",
    otherText: "May lack transparency in pricing",
    otherIcon: "warn",
  },
];

const Webomindappsvsother = () => {
  return (
    <section className="Webomindappsvsother-section">
      <div className="Webomindappsvsother-container">
        <h2 className="Webomindappsvsother-title">
          Webomindapps vs Other Web Design Companies in Bangalore
        </h2>

        <div className="Webomindappsvsother-table">
          {/* Header row */}
          <div className="Webomindappsvsother-row Webomindappsvsother-row--header">
            <div className="Webomindappsvsother-headerCell Webomindappsvsother-headerCell--feature">
              Feature
            </div>
            <div className="Webomindappsvsother-headerCell Webomindappsvsother-headerCell--web">
              {/* replace with actual logo image if you want */}
              <span className="Webomindappsvsother-logoText">WEBOMINDAPPS</span>
            </div>
            <div className="Webomindappsvsother-headerCell Webomindappsvsother-headerCell--other">
              Other Web Design Companies
            </div>
          </div>

          {/* Data rows */}
          {rows.map((row, index) => (
            <div
              key={row.feature}
              className={`Webomindappsvsother-row ${
                index === rows.length - 1
                  ? "Webomindappsvsother-row--last"
                  : ""
              }`}
            >
              <div className="Webomindappsvsother-featureCell">
                {row.feature}
              </div>

              <div className="Webomindappsvsother-cell Webomindappsvsother-cell--web">
                <span
                  className={`Webomindappsvsother-icon Webomindappsvsother-icon--${row.webIcon}`}
                >
                  {row.webIcon === "check" && "✓"}
                </span>
                <span className="Webomindappsvsother-cellText">
                  {row.webText}
                </span>
              </div>

              <div className="Webomindappsvsother-cell Webomindappsvsother-cell--other">
                <span
                  className={`Webomindappsvsother-icon Webomindappsvsother-icon--${row.otherIcon}`}
                >
                  {row.otherIcon === "cross" && "✕"}
                  {row.otherIcon === "warn" && "!"}
                </span>
                <span className="Webomindappsvsother-cellText">
                  {row.otherText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Webomindappsvsother;
