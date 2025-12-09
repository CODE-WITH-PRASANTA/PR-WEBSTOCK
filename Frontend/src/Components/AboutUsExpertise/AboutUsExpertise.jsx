import React from "react";
import { LuFileCheck2, LuHandHeart, LuCalendarClock } from "react-icons/lu";
import "./AboutUsExpertise.css";

const AboutUsExpertise = () => {
  return (
    <section className="about-us-expertise">
      <div className="about-us-expertise-inner">

        {/* LEFT SECTION */}
        <div className="about-us-expertise-left">
          <div className="about-us-expertise-badge">
            ✶ PR WEBSTOCK • CODE-DRIVEN EXCELLENCE ✶
          </div>

          <h1 className="about-us-expertise-title">
            Crafting High-Quality Software  
            <br />
            Through Clean Code & Modern Tech.
          </h1>

          <p className="about-us-expertise-description">
            At PR WEBSTOCK, we build fully coded, scalable, and performance-driven 
            digital solutions using modern technologies like <strong>React, Node.js, 
            PHP, React Native, MongoDB, MySQL</strong> and more. Our approach is 
            engineering-focused — no shortcuts, no templates, only clean and robust code 
            designed for long-term performance.
          </p>

          <p className="about-us-expertise-description">
            From startups to enterprises, we help brands build secure web platforms, 
            mobile apps, CRM systems, automation tools, and custom business solutions 
            tailored to their growth. Our development style is simple:  
            <strong>pure coding, transparent workflow, and future-ready architecture.</strong>
          </p>
        </div>

        {/* RIGHT SECTION */}
        <aside className="about-us-expertise-stats">

          {/* STAT 1 */}
          <div className="about-us-expertise-stat">
            <div className="about-us-expertise-stat-icon-wrap">
              <LuFileCheck2 className="about-us-expertise-icon" />
            </div>
            <div className="about-us-expertise-stat-body">
              <div className="about-us-expertise-stat-number">150+</div>
              <div className="about-us-expertise-stat-label">
                Custom Coded Projects <br />
                <span className="muted">Delivered Successfully</span>
              </div>
            </div>
          </div>

          {/* STAT 2 */}
          <div className="about-us-expertise-stat">
            <div className="about-us-expertise-stat-icon-wrap">
              <LuHandHeart className="about-us-expertise-icon" />
            </div>
            <div className="about-us-expertise-stat-body">
              <div className="about-us-expertise-stat-number">
                95 <span className="percent">%</span>
              </div>
              <div className="about-us-expertise-stat-label">
                Client Satisfaction Rate
              </div>
            </div>
          </div>

          {/* STAT 3 */}
          <div className="about-us-expertise-stat">
            <div className="about-us-expertise-stat-icon-wrap">
              <LuCalendarClock className="about-us-expertise-icon" />
            </div>
            <div className="about-us-expertise-stat-body">
              <div className="about-us-expertise-stat-number">
                3 <span className="small">Mins</span>
              </div>
              <div className="about-us-expertise-stat-label">
                Average Support Response
              </div>
            </div>
          </div>

        </aside>
      </div>
    </section>
  );
};

export default AboutUsExpertise;
