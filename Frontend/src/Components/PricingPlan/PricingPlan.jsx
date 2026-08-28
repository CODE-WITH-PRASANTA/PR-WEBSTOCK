import React, { useState } from 'react';
import './PricingPlan.css';

// Asset imports
import pricingBookImg from '../../assets/pricing-book.png';
import cornerShapeImg from '../../assets/pricing-plan1.png';

const PRICING_PLANS = [
  {
    id: 'silver',
    title: 'SILVER PLAN',
    theme: 'beige',
    monthlyPrice: 149,
    yearlyPrice: 179,
    features: [
      'Pricing at a Glance',
      'Course & Fee Overview',
      'Transparent Pricing Hidden Fees',
      'Best Plan for Your Learning',
      'Simple & Clear Pricing',
    ],
  },
  {
    id: 'gold',
    title: 'GOLD PLAN',
    theme: 'teal',
    monthlyPrice: 159,
    yearlyPrice: 189,
    features: [
      'Pricing at a Glance',
      'Course & Fee Overview',
      'Transparent Pricing Hidden Fees',
      'Best Plan for Your Learning',
      'Simple & Clear Pricing',
    ],
  },
  {
    id: 'diamond',
    title: 'DIAMOND PLAN',
    theme: 'mint',
    monthlyPrice: 169,
    yearlyPrice: 199,
    features: [
      'Pricing at a Glance',
      'Course & Fee Overview',
      'Transparent Pricing Hidden Fees',
      'Best Plan for Your Learning',
      'Simple & Clear Pricing',
    ],
  },
];

const PricingPlan = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="PricingPlan-section">
      {/* Top-Right Decorative Background Shape */}
      <div className="PricingPlan-corner-fixed-wrapper">
        <img
          src={cornerShapeImg}
          alt="Decorative corner shape"
          className="PricingPlan-corner-fixed-img"
        />
      </div>

      <div className="PricingPlan-inner-container">
        {/* Header with Floating 3D Book */}
        <div className="PricingPlan-header">
          <div className="PricingPlan-book-floating-wrapper">
            <img
              src={pricingBookImg}
              alt="Floating Course Books"
              className="PricingPlan-book-img"
            />
          </div>

          <div className="PricingPlan-heading-content">
            <div className="PricingPlan-badge">
              <span className="PricingPlan-badge-square"></span>
              <span className="PricingPlan-badge-text">PRICING PLAN</span>
            </div>
            <h2 className="PricingPlan-title">
              Comprehensive Course Guide and <br className="PricingPlan-title-br" />
              Best Fee Schedule
            </h2>
          </div>
        </div>

        {/* Monthly / Yearly Toggle Switch */}
        <div className="PricingPlan-toggle-wrapper">
          <span
            className={`PricingPlan-toggle-label ${
              !isYearly ? 'PricingPlan-toggle-label--active' : ''
            }`}
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </span>

          <button
            type="button"
            className={`PricingPlan-toggle-switch ${
              isYearly ? 'PricingPlan-toggle-switch--yearly' : ''
            }`}
            onClick={() => setIsYearly(!isYearly)}
            aria-label="Toggle Monthly and Yearly Billing"
          >
            <span className="PricingPlan-toggle-circle"></span>
          </button>

          <span
            className={`PricingPlan-toggle-label ${
              isYearly ? 'PricingPlan-toggle-label--active' : ''
            }`}
            onClick={() => setIsYearly(true)}
          >
            Yealry
          </span>
        </div>

        {/* 3 Pricing Cards */}
        <div className="PricingPlan-cards-grid">
          {PRICING_PLANS.map((plan) => {
            const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const periodText = isYearly ? '/yearly' : '/Monthly';

            return (
              <div key={plan.id} className="PricingPlan-card">
                {/* Header Banner */}
                <div
                  className={`PricingPlan-card-top-box PricingPlan-card-top-box--${plan.theme}`}
                >
                  <span className="PricingPlan-card-plan-name">{plan.title}</span>
                  <div
                    className={`PricingPlan-card-price-row ${
                      isYearly
                        ? 'PricingPlan-card-price-row--yearly'
                        : 'PricingPlan-card-price-row--monthly'
                    }`}
                  >
                    <span className="PricingPlan-price-currency">$</span>
                    <span className="PricingPlan-price-amount">{currentPrice}</span>
                    <span className="PricingPlan-price-period">{periodText}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="PricingPlan-features-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="PricingPlan-feature-item">
                      <span className="PricingPlan-feature-check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span className="PricingPlan-feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Center-out Expand Button */}
                <div className="PricingPlan-btn-wrapper">
                  <button type="button" className="PricingPlan-action-btn">
                    <span className="PricingPlan-btn-text">Choose Plan</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingPlan;