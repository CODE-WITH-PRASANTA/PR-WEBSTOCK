import React from "react";
import "./DigitalService.css";

export default function DigitalService() {
  return (
    <div className="uix-page-container">
      {/* HERO TITLE */}
      <section className="uix-services-wrapper">
        <h1 className="uix-page-title">
          <span className="uix-highlight">Digital</span> Marketing Services In
          Bhubaneswar
        </h1>

        {/* SERVICES GRID */}
        <div className="uix-services-grid">
          {/* CARD 1 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">📈</div>
            <h3 className="uix-service-title">SEO Services</h3>
            <p className="uix-service-desc">
              Improve your search engine rankings and attract more organic
              traffic with result-driven SEO services from PR WEBSTOCK in
              Bhubaneswar.
            </p>
            <div
              className="uix-color-bar"
              style={{ background: "#004d61" }}
            ></div>
          </div>

          {/* CARD 2 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">💰</div>
            <h3 className="uix-service-title">Google Ads & PPC</h3>
            <p className="uix-service-desc">
              Reach potential customers instantly through targeted Google Ads
              and PPC campaigns designed to maximize leads and return on
              investment.
            </p>
            <div
              className="uix-color-bar"
              style={{ background: "#ff4d4d" }}
            ></div>
          </div>

          {/* CARD 3 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">📱</div>
            <h3 className="uix-service-title">Social Media Marketing</h3>
            <p className="uix-service-desc">
              Grow your online presence and connect with your audience through
              strategic social media marketing across leading platforms.
            </p>
            <div
              className="uix-color-bar"
              style={{ background: "#ff6f91" }}
            ></div>
          </div>

          {/* CARD 4 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">🎨</div>
            <h3 className="uix-service-title">Graphic Design Services</h3>
            <p className="uix-service-desc">
              Strengthen your brand identity with creative graphic design
              solutions for digital marketing, branding, and promotional
              campaigns.
            </p>
            <div
              className="uix-color-bar"
              style={{ background: "#6a5acd" }}
            ></div>
          </div>

          {/* CARD 5 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">✍️</div>
            <h3 className="uix-service-title">Content Marketing</h3>
            <p className="uix-service-desc">
              Build trust and improve visibility with SEO-friendly content that
              engages audiences and supports long-term business growth.
            </p>
            <div
              className="uix-color-bar"
              style={{ background: "#008080" }}
            ></div>
          </div>

          {/* CARD 6 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">📤</div>
            <h3 className="uix-service-title">Email Marketing</h3>
            <p className="uix-service-desc">
              Increase customer engagement and conversions through personalized
              email campaigns, newsletters, and marketing automation.
            </p>
            <div
              className="uix-color-bar"
              style={{ background: "#ffbf00" }}
            ></div>
          </div>

          {/* CARD 7 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">🛒</div>
            <h3 className="uix-service-title">E-Commerce Marketing</h3>
            <p className="uix-service-desc">
              Drive more sales with targeted e-commerce marketing strategies,
              conversion optimization, and customer acquisition campaigns.
            </p>
            <div
              className="uix-color-bar"
              style={{ background: "#0099cc" }}
            ></div>
          </div>

          {/* CARD 8 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">🌐</div>
            <h3 className="uix-service-title">Website Development</h3>
            <p className="uix-service-desc">
              Build responsive, fast, and SEO-friendly websites designed to
              improve user experience and generate business growth.
            </p>
            <div
              className="uix-color-bar"
              style={{ background: "#32cd32" }}
            ></div>
          </div>

          {/* CARD 9 */}
          <div className="uix-service-card">
            <div className="uix-service-icon">🎬</div>
            <h3 className="uix-service-title">Video Marketing</h3>
            <p className="uix-service-desc">
              Capture attention and increase engagement through professional
              video marketing solutions tailored for digital platforms and
              social media channels.
            </p>
            <div
              className="uix-color-bar"
              style={{ background: "#ff4500" }}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
}