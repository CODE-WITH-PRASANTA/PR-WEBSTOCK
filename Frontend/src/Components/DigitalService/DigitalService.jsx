import React from "react";
import "./DigitalService.css";

export default function ServicesPage() {
  return (
    <div className="uix-page-container">

      {/* HERO TITLE */}
      <section className="uix-services-wrapper">
        <h1 className="uix-page-title">
          <span className="uix-highlight">Digital</span> marketing services we offer
        </h1>

        {/* SERVICES GRID */}
        <div className="uix-services-grid">
          {/* CARD 1 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">📈</div>
            <h3 className="uix-service-title">Search Engine Optimization (SEO)</h3>
            <p className="uix-service-desc">
              Improve your website visibility with powerful SEO strategies designed
              to increase traffic and online reputation.
            </p>
            <div className="uix-color-bar" style={{ background: "#004d61" }}></div>
          </div>

          {/* CARD 2 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">💰</div>
            <h3 className="uix-service-title">Pay Per Click (PPC)</h3>
            <p className="uix-service-desc">
              Target your ideal customers instantly with optimized ad campaigns
              that deliver measurable ROI.
            </p>
            <div className="uix-color-bar" style={{ background: "#ff4d4d" }}></div>
          </div>

          {/* CARD 3 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">📱</div>
            <h3 className="uix-service-title">Social Media Marketing</h3>
            <p className="uix-service-desc">
              Engage users through compelling content and effective multi-platform
              marketing strategies.
            </p>
            <div className="uix-color-bar" style={{ background: "#ff6f91" }}></div>
          </div>

          {/* CARD 4 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">🎨</div>
            <h3 className="uix-service-title">Graphic Designing</h3>
            <p className="uix-service-desc">
              Professional visuals and creative designs that strengthen your brand identity.
            </p>
            <div className="uix-color-bar" style={{ background: "#6a5acd" }}></div>
          </div>

          {/* CARD 5 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">✍️</div>
            <h3 className="uix-service-title">Content Marketing</h3>
            <p className="uix-service-desc">
              Build trust and influence with well-researched, engaging, and SEO-friendly content.
            </p>
            <div className="uix-color-bar" style={{ background: "#008080" }}></div>
          </div>

          {/* CARD 6 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">📤</div>
            <h3 className="uix-service-title">Email Marketing</h3>
            <p className="uix-service-desc">
              Reach your users directly with personalized, automated email campaigns that convert.
            </p>
            <div className="uix-color-bar" style={{ background: "#ffbf00" }}></div>
          </div>

          {/* CARD 7 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">🛒</div>
            <h3 className="uix-service-title">E-commerce Marketing</h3>
            <p className="uix-service-desc">
              Boost online sales through optimized store funnels and advanced customer-targeting strategies.
            </p>
            <div className="uix-color-bar" style={{ background: "#0099cc" }}></div>
          </div>

          {/* CARD 8 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">🌐</div>
            <h3 className="uix-service-title">Website Development</h3>
            <p className="uix-service-desc">
              Get high-performance websites tailored for branding, marketing, and conversions.
            </p>
            <div className="uix-color-bar" style={{ background: "#32cd32" }}></div>
          </div>

          {/* CARD 9 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">🎬</div>
            <h3 className="uix-service-title">Video Marketing</h3>
            <p className="uix-service-desc">
              Engage your audience with professional promotional videos, ads, and animations.
            </p>
            <div className="uix-color-bar" style={{ background: "#ff4500" }}></div>
          </div>
        </div>
      </section>

      
    </div>
  );
}
