import React, { useState } from "react";
import "./PriceAndPlans.css";

const plans = [
  {
    name: "Basic Plan",
    priceMonthly: 80,
    priceYearly: 800,
    features: [
      { text: "Website Audit Identify opportunities optimization.", included: true },
      {
        text: "Social Media Management Establish a presence on key platforms.",
        included: true
      },
      {
        text: "Basic SEO Optimization Improve search engine visibility.",
        included: true
      },
      {
        text: "Monthly Analytics Report Track and measure your online performance.",
        included: true
      },
      {
        text: "Third-Party API Setup (All Google Map API).",
        included: false
      },
      {
        text: "Bi-Monthly Analytics Review Actionable insights.",
        included: false
      }
    ]
  },
  {
    name: "Standard Plan",
    priceMonthly: 120,
    priceYearly: 1200,
    featured: true,
    badge: "30% Off",
    features: [
      { text: "Website Audit Identify opportunities optimization.", included: true },
      {
        text: "Social Media Management Establish a presence on key platforms.",
        included: true
      },
      {
        text: "Basic SEO Optimization Improve search engine visibility.",
        included: true
      },
      {
        text: "Monthly Analytics Report Track and measure your online performance.",
        included: true
      },
      {
        text: "Third-Party API Setup (All Google Map API).",
        included: true
      },
      {
        text: "Bi-Monthly Analytics Review Actionable insights.",
        included: false
      }
    ]
  },
  {
    name: "Premium Plan",
    priceMonthly: 180,
    priceYearly: 1800,
    features: [
      { text: "Website Audit Identify opportunities optimization.", included: true },
      {
        text: "Social Media Management Establish a presence on key platforms.",
        included: true
      },
      {
        text: "Basic SEO Optimization Improve search engine visibility.",
        included: true
      },
      {
        text: "Monthly Analytics Report Track and measure your online performance.",
        included: true
      },
      {
        text: "Third-Party API Setup (All Google Map API).",
        included: true
      },
      {
        text: "Bi-Monthly Analytics Review Actionable insights.",
        included: true
      }
    ]
  }
];

const PricingPlans = () => {
  const [billing, setBilling] = useState("monthly"); // 'monthly' | 'yearly'

  return (
    <section className="plans-wrapper">
      <div className="plans-inner">
        {/* Toggle pill */}
        <div className="billing-toggle">
          <button
            className={`billing-btn ${
              billing === "monthly" ? "billing-btn-active" : ""
            }`}
            onClick={() => setBilling("monthly")}
          >
            Billed Monthly
          </button>
          <button
            className={`billing-btn ${
              billing === "yearly" ? "billing-btn-active" : ""
            }`}
            onClick={() => setBilling("yearly")}
          >
            Billed Yearly
          </button>
        </div>

        {/* Cards */}
        <div className="plans-grid">
          {plans.map((plan) => {
            const price =
              billing === "monthly" ? plan.priceMonthly : plan.priceYearly;

            return (
              <article
                key={plan.name}
                className={`plan-card ${plan.featured ? "plan-card-featured" : ""}`}
              >
                {/* Badge for middle card */}
                {plan.badge && (
                  <div className="plan-badge">
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price-row">
                    <span className="plan-price">${price}</span>
                    <span className="plan-price-sub">
                      /{billing === "monthly" ? "Monthly" : "Yearly"} Investment
                    </span>
                  </div>
                </div>

                <ul className="plan-features">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="plan-feature">
                      <span
                        className={`feature-icon ${
                          feat.included ? "icon-yes" : "icon-no"
                        }`}
                      >
                        {feat.included ? "✓" : "✕"}
                      </span>
                      <span className="feature-text">{feat.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="plan-footer">
                  <button
                    className={`plan-cta ${
                      plan.featured ? "plan-cta-primary" : ""
                    }`}
                  >
                    Pick This Package
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
