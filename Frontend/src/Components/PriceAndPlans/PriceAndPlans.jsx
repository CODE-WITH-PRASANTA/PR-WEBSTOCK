import React, { useState } from "react";
import "./PriceAndPlans.css";

const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    yearlyPrice: 19999,
    features: [
      "Custom static website with 5–10 pages tailored to your business.",
      "Responsive design for mobile, tablet, and desktop devices.",
      "Free VPS hosting and domain registration for 1 year.",
      "Integration of all required business APIs (forms, maps, etc.).",
      "Payment gateway setup via PhonePe Partner Program.",
      "24/7 support for updates, minor changes and technical issues."
    ]
  },

  {
    id: "standard",
    name: "Standard Plan",
    yearlyPrice: 34999,
    badge: "30% OFF",
    features: [
      "Everything included in the Basic Plan (website + hosting + support).",
      "Custom 5–10 page responsive website tailored to your brand.",
      "Full API and PhonePe payment gateway integrations.",
      "Social media account setup & branding (Facebook, Instagram).",
      "Up to 6 months of social media posting & website content updates.",
      "Monthly performance reports and strategy calls for improvements."
    ]
  },

  {
    id: "premium",
    name: "Premium Plan",
    yearlyPrice: 54999,
    features: [
      "Custom business website with advanced features and dynamic sections.",
      "Android & iOS mobile app development for your business.",
      "Secure API integrations and PhonePe payment gateway setup.",
      "Advanced analytics, lead tracking and basic CRM integration.",
      "6 months of social media management and digital marketing service.",
      "Priority 24/7 support with a dedicated account manager."
    ]
  }
];

const getMonthlyEMI = (y) => Math.round(y / 12);
const getYearlyDiscountPrice = (y) => Math.round(y * 0.8);
const getYearlyDiscountEMI = (y) => Math.round(getYearlyDiscountPrice(y) / 12);

const getAdvanceMonthly = (y) => {
  const upfront = Math.round(y * 0.3);
  const remaining = y - upfront;
  const emi = Math.round(remaining / 12);
  return { upfront, emi };
};

const PriceAndPlans = () => {
  const [billing, setBilling] = useState("monthly");

  return (
    <section className="pp-section">

      {/* BILLING TOGGLE */}
      <div className="pp-toggle-wrapper">
        <div className="pp-toggle-pill">

          <button
            className={`pp-toggle-btn ${billing === "monthly" ? "pp-toggle-btn-active" : ""}`}
            onClick={() => setBilling("monthly")}
          >
            Monthly EMI
          </button>

          <button
            className={`pp-toggle-btn ${billing === "yearly" ? "pp-toggle-btn-active" : ""}`}
            onClick={() => setBilling("yearly")}
          >
            Yearly (20% OFF)
          </button>

          <button
            className={`pp-toggle-btn ${billing === "advance" ? "pp-toggle-btn-active" : ""}`}
            onClick={() => setBilling("advance")}
          >
            Monthly (30% Advance)
          </button>

        </div>
      </div>

      {/* PLAN CARDS */}
      <div className="pp-grid">
        {plans.map((plan, index) => {
          const monthly = getMonthlyEMI(plan.yearlyPrice);
          const yearlyDiscount = getYearlyDiscountPrice(plan.yearlyPrice);
          const yearlyEMI = getYearlyDiscountEMI(plan.yearlyPrice);
          const advance = getAdvanceMonthly(plan.yearlyPrice);

          return (
            <article
              key={plan.id}
              className={`pp-card ${index === 1 ? "pp-featured-card" : ""}`}
            >

              {plan.badge && (
                <div className="pp-ribbon">
                  <span>{plan.badge}</span>
                </div>
              )}

              <div className="pp-card-header">
                <h3>{plan.name}</h3>

                {/* PRICE DISPLAY */}
                {billing === "monthly" && (
                  <>
                    <span className="pp-price">
                      ₹{monthly.toLocaleString("en-IN")}
                    </span>
                    <span className="pp-price-text">per month (12 EMI)</span>
                    <p className="pp-yearly-label">
                      Total Yearly: ₹{plan.yearlyPrice.toLocaleString("en-IN")}
                    </p>
                  </>
                )}

                {billing === "yearly" && (
                  <>
                    <span className="pp-price">
                      ₹{yearlyEMI.toLocaleString("en-IN")}
                    </span>
                    <span className="pp-price-text">per month after discount</span>
                    <p className="pp-yearly-label">
                      Pay One-Time: <b>₹{yearlyDiscount.toLocaleString("en-IN")}</b> (20% OFF)
                    </p>
                  </>
                )}

                {billing === "advance" && (
                  <>
                    <span className="pp-price">
                      ₹{advance.emi.toLocaleString("en-IN")}
                    </span>
                    <span className="pp-price-text">per month after 30% upfront</span>
                    <p className="pp-yearly-label">
                      Advance: <b>₹{advance.upfront.toLocaleString("en-IN")}</b> |
                      EMI: ₹{advance.emi.toLocaleString("en-IN")} x 12
                    </p>
                  </>
                )}
              </div>

              {/* FEATURES LIST */}
              <ul className="pp-features">
                {plan.features.map((text, i) => (
                  <li key={i} className="pp-feature-item">
                    <span className="pp-feature-icon yes">✓</span>
                    {text}
                  </li>
                ))}
              </ul>

              <div className="pp-card-footer">
                <button
                  className={`pp-cta-btn ${index === 1 ? "pp-cta-primary" : ""}`}
                >
                  Pick This Package
                </button>
              </div>

            </article>
          );
        })}
      </div>
    </section>
  );
};

export default PriceAndPlans;
