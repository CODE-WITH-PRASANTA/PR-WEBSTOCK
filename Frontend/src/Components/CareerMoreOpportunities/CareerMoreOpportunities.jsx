import React from "react";
import "./CareerMoreOpportunities.css";

import { FiUser, FiUsers, FiCheckCircle, FiArrowRight } from "react-icons/fi";

const features = [
  {
    id: 1,
    icon: <FiUser />,
    title: "Free Coaching",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus.",
  },
  {
    id: 2,
    icon: <FiUsers />,
    title: "Comprehensive Ratings",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus.",
  },
  {
    id: 3,
    icon: <FiCheckCircle />,
    title: "By Real Employees",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus.",
  },
];

const CareerMoreOpportunities = () => {
  return (
    <section className="careermoreopportunities-section">
      <div className="careermoreopportunities-container">
        {/* Left side */}
        <div className="careermoreopportunities-left">
          <h2 className="careermoreopportunities-title">
            More Opportunities
            <br />
            For Everyone
          </h2>

          <p className="careermoreopportunities-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>

          <button className="careermoreopportunities-btn">
            <span className="careermoreopportunities-btn-icon">
              <FiArrowRight />
            </span>
            <span>Learn More</span>
          </button>
        </div>

        {/* Right side */}
        <div className="careermoreopportunities-right">
          {features.map((item) => (
            <div key={item.id} className="careermoreopportunities-feature">
              <div className="careermoreopportunities-feature-iconwrap">
                <span className="careermoreopportunities-feature-icon">{item.icon}</span>
              </div>

              <div className="careermoreopportunities-feature-content">
                <h3 className="careermoreopportunities-feature-title">{item.title}</h3>
                <p className="careermoreopportunities-feature-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerMoreOpportunities;
