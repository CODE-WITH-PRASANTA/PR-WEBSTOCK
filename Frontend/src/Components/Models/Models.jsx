import React from "react";
import "./Model.css";
import { FaMoneyBillWave, FaBullhorn, FaChartLine } from "react-icons/fa";

export default function ServiceModels() {
  return (
    <div className="service-wrapper">
      <h1 className="main-title">Service Models You Can Choose From</h1>

      <div className="service-grid">

        {/* Full-Service Growth Partner */}
        <div className="service-box">
          <div className="service-icon red">
            <FaMoneyBillWave />
          </div>
          <h2>Full-Service Growth Partner</h2>
          <p>
            This is our most comprehensive engagement model, ideal for businesses
            seeking long-term digital growth. We manage everything from strategy
            and campaign execution to optimization and analytics.
          </p>

          <ul>
            <li>Dedicated team with multi-channel expertise</li>
            <li>End-to-end execution (SEO, Ads, Content, Design & more)</li>
            <li>Monthly performance reviews & ongoing optimization</li>
            <li>Scalable solutions to match your business growth</li>
          </ul>
        </div>

        {/* Project-Based Campaigns */}
        <div className="service-box middle-box">
          <div className="service-icon pink">
            <FaBullhorn />
          </div>
          <h2>Project-Based Campaigns</h2>
          <p>
            Ideal for brands that need help with specific campaigns, launches, or
            seasonal goals. We collaborate with you on clearly outlined projects
            with timelines and performance targets.
          </p>

          <ul>
            <li>Clear timelines and scope of work</li>
            <li>Fast execution with a focused results approach</li>
            <li>Ideal for new launches or specific objectives</li>
            <li>Flexible, goal-specific engagement</li>
          </ul>
        </div>

        {/* Strategy & Consultation */}
        <div className="service-box">
          <div className="service-icon orange">
            <FaChartLine />
          </div>
          <h2>Strategy and Consultation Only</h2>
          <p>
            This model is built for businesses with internal marketing teams who
            need expert direction. We provide audits, growth roadmaps, and
            campaign strategies to help you execute effectively.
          </p>

          <ul>
            <li>Marketing audits & competitive analysis</li>
            <li>Custom strategy documents & roadmaps</li>
            <li>Channel recommendations & budget planning</li>
            <li>Performance measurement framework</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
