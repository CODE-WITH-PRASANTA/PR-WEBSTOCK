import React, { useState } from "react";
import "./PriceAndPlans.css";

const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    monthly: 80,
    features: [
      "Website Audit Identif opportunities optimization.",
      "Social Media Management Establish a presence on key platforms.",
      "Basic SEO Optimization Improve search engine visibility.",
      "Monthly Analytics Report Track and measure your online performance.",
      "Third-Party API Setup (All Google Map API).",
      "Bi-Monthly Analytics Review Actionable insights.",
    ],
    included: [true, true, true, true, false, false],
  },

  {
    id: "standard",
    name: "Standard Plan",
    monthly: 120,
    badge: "30% OFF", // Ribbon shown on middle card
    features: [
      "Website Audit Identif opportunities optimization.",
      "Social Media Management Establish a presence on key platforms.",
      "Basic SEO Optimization Improve search engine visibility.",
      "Monthly Analytics Report Track and measure your online performance.",
      "Third-Party API Setup (All Google Map API).",
      "Bi-Monthly Analytics Review Actionable insights.",
    ],
    included: [true, true, true, true, true, false],
  },

  {
    id: "premium",
    name: "Premium Plan",
    monthly: 180,
    features: [
      "Website Audit Identif opportunities optimization.",
      "Social Media Management Establish a presence on key platforms.",
      "Basic SEO Optimization Improve search engine visibility.",
      "Monthly Analytics Report Track and measure your online performance.",
      "Third-Party API Setup (All Google Map API).",
      "Bi-Monthly Analytics Review Actionable insights.",
    ],
    included: [true, true, true, true, true, true],
  },
];

const PriceAndPlans = () => {
  const [billing, setBilling] = useState("monthly");

  // 20% OFF yearly
  const getDisplayPrice = (monthly) =>
    billing === "monthly" ? monthly : Math.round(monthly * 0.8);

  return (
    <section className="pp-section">
      {/* BILLING TOGGLE */}
      <div className="pp-toggle-wrapper">
        <div className="pp-toggle-pill">

          {/* Monthly Button */}
          <button
            className={`pp-toggle-btn ${
              billing === "monthly" ? "pp-toggle-btn-active" : ""
            }`}
            onClick={() => setBilling("monthly")}
          >
            Billed Monthly
          </button>

          {/* Yearly Button (With 20% OFF Ribbon) */}
          <button
            className={`pp-toggle-btn ${
              billing === "yearly" ? "pp-toggle-btn-active" : ""
            } yearly-btn`}
            onClick={() => setBilling("yearly")}
          >
            Billed Yearly
            {billing === "yearly" && (
              <span className="pp-yearly-discount">20% OFF</span>
            )}
          </button>
        </div>
      </div>

      {/*  PLAN CARDS  */}
      <div className="pp-grid">
        {plans.map((plan, index) => {
          const price = getDisplayPrice(plan.monthly);

          return (
            <article
              key={plan.id}
              className={`pp-card ${index === 1 ? "pp-featured-card" : ""}`}
            >
              {/* 30% OFF badge only for Standard Plan */}
              {index === 1 && (
                <div className="pp-ribbon">
                  <span>30% OFF</span>
                </div>
              )}

              <div className="pp-card-header">
                <h3>{plan.name}</h3>

                <div className="pp-price-row">
                  <span className="pp-price">${price}</span>
                  <span className="pp-price-text">
                    /Monthly Investment
                    {billing === "yearly" && (
                      <span className="pp-yearly-note"> (billed yearly)</span>
                    )}
                  </span>
                </div>
              </div>

              <ul className="pp-features">
                {plan.features.map((text, i) => (
                  <li key={i} className="pp-feature-item">
                    <span
                      className={`pp-feature-icon ${
                        plan.included[i] ? "yes" : "no"
                      }`}
                    >
                      {plan.included[i] ? "✓" : "✕"}
                    </span>
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
