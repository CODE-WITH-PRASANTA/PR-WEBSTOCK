import React from "react";
import "./AppDevelopmentServices.css";

const MobileAppServices = () => {
  return (
    <section className="mas-section">
      <h2 className="mas-title">Mobile application development services we offer</h2>

      <div className="mas-divider mas-divider-top" />

      {/* GRID */}
      <div className="mas-grid">

        {/* ---------- ROW 1 ---------- */}
        <div className="mas-card">
          <div className="mas-icon">
            <svg viewBox="0 0 48 48">
              <rect x="14" y="8" width="16" height="28" rx="2" ry="2" fill="none" strokeWidth="2" />
              <circle cx="22" cy="30" r="1.6" />
              <path d="M30 24l5 0" fill="none" strokeWidth="2" />
              <circle cx="36" cy="24" r="4" fill="none" strokeWidth="2" />
              <path d="M34 22l2 2-2 2" fill="none" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="mas-card-title">Hybrid app development</h3>
          <ul className="mas-list">
            <li>Hybrid apps provide a cost-effective solution with faster development cycles.</li>
            <li>Offer broad platform compatibility, reaching a wider audience.</li>
            <li>Reduced maintenance costs contribute to long-term affordability.</li>
            <li>Embrace the power of hybrid apps for a seamless and engaging user experience.</li>
          </ul>
        </div>

        <div className="mas-card">
          <div className="mas-icon">
            <svg viewBox="0 0 48 48">
              <rect x="10" y="8" width="12" height="28" rx="2" ry="2" fill="none" strokeWidth="2" />
              <rect x="26" y="8" width="12" height="16" rx="2" ry="2" fill="none" strokeWidth="2" />
              <path d="M29 13h6M29 17h6M29 21h3" fill="none" strokeWidth="2" />
              <circle cx="16" cy="30" r="1.6" />
            </svg>
          </div>
          <h3 className="mas-card-title">Native app development</h3>
          <ul className="mas-list">
            <li>Create high-performance native apps for a competitive edge.</li>
            <li>Native app development delivers a polished and intuitive user experience.</li>
            <li>Native applications align with platform design guidelines and offer superior performance.</li>
            <li>
              Access to the latest OS updates and features allows for innovation and staying ahead in the market.
            </li>
          </ul>
        </div>

        <div className="mas-card mas-card-last-col">
          <div className="mas-icon">
            <svg viewBox="0 0 48 48">
              <rect x="10" y="10" width="12" height="16" rx="2" ry="2" fill="none" strokeWidth="2" />
              <rect x="26" y="10" width="12" height="16" rx="2" ry="2" fill="none" strokeWidth="2" />
              <path d="M14 30h20" fill="none" strokeWidth="2" />
              <circle cx="24" cy="34" r="3" fill="none" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="mas-card-title">Cross platform app development</h3>
          <ul className="mas-list">
            <li>
              We leverage frameworks like React Native and{" "}
              <span className="mas-accent">Flutter</span> to create dynamic apps.
            </li>
            <li>Our cross-platform apps seamlessly perform on both Android and iOS devices.</li>
            <li>
              Cost-effectiveness and faster development cycles are key advantages of cross-platform app
              development.
            </li>
            <li>Wider audience reach is achieved by targeting multiple platforms.</li>
          </ul>
        </div>

        {/* middle horizontal divider */}
        <div className="mas-divider mas-divider-middle" />

        {/* ---------- ROW 2 ---------- */}
        <div className="mas-card mas-card-bottom">
          <div className="mas-icon">
            <svg viewBox="0 0 48 48">
              <rect x="16" y="8" width="16" height="28" rx="3" ry="3" fill="none" strokeWidth="2" />
              <circle cx="24" cy="17" r="5" fill="none" strokeWidth="2" />
              <path d="M22 16h1v2h2v1" fill="none" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="mas-card-title">Android app development</h3>
          <ul className="mas-list">
            <li>
              Unparalleled expertise in selecting the perfect technologies and tools for the Android platform.
            </li>
            <li>Optimal mobile app solutions for your business success.</li>
            <li>
              Understanding the significance of making the right technological choices for your Android mobile app.
            </li>
            <li>
              Prominent Android app development company in Bangalore with years of experience in crafting Android
              apps.
            </li>
          </ul>
        </div>

        <div className="mas-card mas-card-bottom">
          <div className="mas-icon">
            <svg viewBox="0 0 48 48">
              <rect x="16" y="8" width="16" height="28" rx="3" ry="3" fill="none" strokeWidth="2" />
              <path d="M20 15h8M20 19h8M20 23h5" fill="none" strokeWidth="2" />
              <circle cx="24" cy="30" r="1.6" />
            </svg>
          </div>
          <h3 className="mas-card-title">iOS app development</h3>
          <ul className="mas-list">
            <li>Expertise in selecting precise technologies and tools tailored to the iOS platform.</li>
            <li>Development of iOS apps for Apple devices, including iPhones, iPads, and more.</li>
            <li>Understanding the importance of informed technological decisions for your app.</li>
            <li>
              Deliver ideal solutions for iOS app development, ensuring a remarkable outcome.
            </li>
          </ul>
        </div>

        <div className="mas-card mas-card-last-col mas-card-bottom">
          <div className="mas-icon">
            <svg viewBox="0 0 48 48">
              <rect x="10" y="12" width="28" height="22" rx="2" ry="2" fill="none" strokeWidth="2" />
              <path d="M14 16h8v6h-8zM26 16h8M26 20h8M26 24h8" fill="none" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="mas-card-title">Windows app development</h3>
          <ul className="mas-list">
            <li>Extensive experience in mastering the intricacies of the Windows platform.</li>
            <li>Precision in choosing the right technologies and tools for Windows app development.</li>
            <li>
              Understanding the significance of selecting the optimal technology stack for your Windows app.
            </li>
            <li>Develop exceptional Windows app solutions tailored to your business needs.</li>
          </ul>
        </div>
      </div>

      <div className="mas-divider mas-divider-bottom" />
    </section>
  );
};

export default MobileAppServices;
