import React from "react";
import "./Model.css";
import { FaMoneyBillWave, FaBullhorn, FaChartLine } from "react-icons/fa";

export default function Models() {
  return (
    <div className="service-wrapper">
      <h1 className="main-title">
        Digital Marketing Service Models For Every Business
      </h1>

      <div className="service-grid">

        {/* Full-Service Growth Partner */}
        <div className="service-box">
          <div className="service-icon red">
            <FaMoneyBillWave />
          </div>

          <h2>Full-Service Growth Partner</h2>

          <p>
            PR WEBSTOCK provides complete digital marketing solutions for
            businesses in Bhubaneswar and across Odisha. We manage everything
            from strategy and execution to optimization, helping brands increase
            visibility, generate leads, and achieve long-term business growth.
          </p>

          <ul>
            <li>Dedicated digital marketing specialists</li>
            <li>SEO, Google Ads, Social Media & Content Marketing</li>
            <li>Monthly performance reporting and optimization</li>
            <li>Scalable solutions designed for business growth</li>
          </ul>
        </div>

        {/* Project-Based Campaigns */}
        <div className="service-box middle-box">
          <div className="service-icon pink">
            <FaBullhorn />
          </div>

          <h2>Project-Based Campaigns</h2>

          <p>
            Ideal for businesses launching a new product, service, or seasonal
            campaign. Our project-based digital marketing services focus on
            delivering measurable results within a defined scope and timeline.
          </p>

          <ul>
            <li>Clearly defined campaign objectives</li>
            <li>Focused execution with measurable outcomes</li>
            <li>Perfect for product launches and promotions</li>
            <li>Flexible engagement tailored to your goals</li>
          </ul>
        </div>

        {/* Strategy & Consultation */}
        <div className="service-box">
          <div className="service-icon orange">
            <FaChartLine />
          </div>

          <h2>Digital Marketing Consultation</h2>

          <p>
            For businesses with in-house teams, PR WEBSTOCK offers expert
            digital marketing consultation, audits, and growth strategies to
            improve performance and maximize marketing investments.
          </p>

          <ul>
            <li>Digital marketing audits and competitor analysis</li>
            <li>Custom growth strategies and action plans</li>
            <li>Channel recommendations and budget planning</li>
            <li>Performance tracking and optimization guidance</li>
          </ul>
        </div>

      </div>
    </div>
  );
}