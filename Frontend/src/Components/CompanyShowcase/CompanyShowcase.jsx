import React from "react";
import { FaStar } from "react-icons/fa";
import "./CompanyShowcase.css";

import teamImg from "../../assets/why-choose.webp";

const CompanyShowcase = () => {
  return (
    <section className="company-section">
      {/* Top heading */}
      <div className="company-hero">
        <div className="company-badge">
          <FaStar className="company-badge-star" />
          <span>DISCOVER THE ADVANTAGE</span>
          <FaStar className="company-badge-star" />
        </div>

        <h1 className="company-title">
          We are a{" "}
          <span className="company-title-strong">
            Software Development & Digital Growth Company
          </span>
          <br />
          building{" "}
          <span className="company-title-highlight">
            high-performance website, apps & digital marketing solutions.
          </span>
        </h1>

        <p className="company-subtext">
          PR WEBSTOCK is a dedicated software development company focused on
          building result-driven digital products for businesses of all sizes.
          We don&apos;t just make websites — we create complete online systems,
          including business websites, web applications, mobile applications,
          and marketing funnels that help brands attract, engage, and convert
          the right audience. From single website packages to full web + app +
          marketing bundles, we provide flexible solutions tailored to your
          business goals and growth stage.
        </p>
      </div>

      {/* Main content block */}
      <div className="company-main">
        <div className="company-left">
          <div className="company-image-wrap">
            <img src={teamImg} alt="PR WEBSTOCK team" className="company-image" />
          </div>
        </div>

        <div className="company-right">
          <p className="company-right-text">
            At PR WEBSTOCK, every project is built fully code-based using modern
            technologies like React.js, Angular, Next.js, Node.js, Express.js,
            PHP, Laravel, MongoDB, MySQL, React Native and more — no random
            templates, no shortcuts. Our team plans, designs, and develops each
            solution to be fast, secure, and scalable.
            <br />
            <br />
            Along with development, we support businesses with{" "}
            <strong>digital marketing, SEO, Google Ads, social media ads</strong>{" "}
            and <strong>lead generation campaigns</strong> so that your website
            or app actually brings customers, not just traffic. Whether you need
            only a website, only an application, or a complete package combining
            software development with marketing and automation, PR WEBSTOCK
            helps you build a strong, measurable digital presence that grows
            with your business.
          </p>

          <div className="company-stats-grid">
            <div className="company-stat">
              <div className="company-stat-number">30</div>
              <div className="company-stat-label">Projects Completed</div>
            </div>

            <div className="company-stat">
              <div className="company-stat-number">1K</div>
              <div className="company-stat-label">Happy & Engaged Users</div>
            </div>

            <div className="company-stat">
              <div className="company-stat-number">3</div>
              <div className="company-stat-label">Years of Combined Experience</div>
            </div>

            <div className="company-stat">
              <div className="company-stat-number">10</div>
              <div className="company-stat-label">Successful Brand Collaborations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyShowcase;
