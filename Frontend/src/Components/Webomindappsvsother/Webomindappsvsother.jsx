import React from "react";
import "./Webomindappsvsother.css";

const rows = [
  {
    feature: "Custom Web Design",
    webText: "Brand-focused, fully custom web design built from scratch using clean code.",
    webIcon: "check",
    otherText: "Often depend on ready-made templates with limited flexibility.",
    otherIcon: "cross",
  },
  {
    feature: "User Experience (UX) Optimization",
    webText: "UX strategy planned from day one to improve engagement and conversions.",
    webIcon: "check",
    otherText: "Basic layouts with minimal user experience consideration.",
    otherIcon: "cross",
  },
  {
    feature: "SEO-Friendly Design",
    webText: "Websites developed with on-page SEO best practices and clean structure.",
    webIcon: "check",
    otherText: "Limited or no SEO-focused development.",
    otherIcon: "cross",
  },
  {
    feature: "Core Web Vitals Optimization",
    webText: "Fast-loading websites optimized for Google Core Web Vitals.",
    webIcon: "check",
    otherText: "Performance optimization often ignored.",
    otherIcon: "cross",
  },
  {
    feature: "Technology Stack",
    webText: "Modern MERN Stack (full code-based), HTML5, CSS3, JavaScript.",
    webIcon: "check",
    otherText: "Outdated or restrictive technologies.",
    otherIcon: "cross",
  },
  {
    feature: "CMS Integration",
    webText: "Custom CMS, WordPress, or headless solutions as per business needs.",
    webIcon: "check",
    otherText: "Restricted CMS options with limited customization.",
    otherIcon: "warn",
  },
  {
    feature: "Hosting & Infrastructure",
    webText: "High-performance Cloud / VPS hosting with scalability and security.",
    webIcon: "check",
    otherText: "Shared or low-performance hosting environments.",
    otherIcon: "cross",
  },
  {
    feature: "Media & Image Optimization",
    webText: "Integrated Cloudinary for optimized image storage and faster loading.",
    webIcon: "check",
    otherText: "Basic image handling without performance optimization.",
    otherIcon: "warn",
  },
  {
    feature: "Payment Gateway Integration",
    webText: "Secure integration with PhonePe payment gateway (official partner).",
    webIcon: "check",
    otherText: "Limited or third-party payment options.",
    otherIcon: "warn",
  },
  {
    feature: "API Integrations",
    webText: "Complete API solutions including WhatsApp, call, email, and third-party APIs.",
    webIcon: "check",
    otherText: "Minimal or no API customization.",
    otherIcon: "warn",
  },
];

const Webomindappsvsother = () => {
  return (
    <section className="Webomindappsvsother-section">
      <div className="Webomindappsvsother-container">
        <h2 className="Webomindappsvsother-title">
         PR WEBSTOCK vs Other Web Design Companies in Bhubaneswar
        </h2>

        <div className="Webomindappsvsother-table">
          {/* Header row */}
          <div className="Webomindappsvsother-row Webomindappsvsother-row--header">
            <div className="Webomindappsvsother-headerCell Webomindappsvsother-headerCell--feature">
              Feature
            </div>
            <div className="Webomindappsvsother-headerCell Webomindappsvsother-headerCell--web">
              {/* replace with actual logo image if you want */}
              <span className="Webomindappsvsother-logoText">PR WEBSTOCK</span>
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
