import React from "react";
import "./CostPerUnit.css";

import {
  FiBriefcase,
  FiUsers,
  FiGlobe,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";

const cardData = [
  {
    title: "New Projects",
    value: "102",
    growth: "10% Since last month",
    icon: <FiBriefcase />,
    cardClass: "green",
    progress: "40%",
    progressClass: "yellowProgress",
  },
  {
    title: "New Customers",
    value: "154",
    growth: "4% Since last month",
    icon: <FiUsers />,
    cardClass: "blue",
    progress: "42%",
    progressClass: "blueProgress",
  },
  {
    title: "Inquiry",
    value: "524",
    growth: "23% Since last month",
    icon: <FiGlobe />,
    cardClass: "purple",
    progress: "35%",
    progressClass: "greenProgress",
  },
  {
    title: "Earning",
    value: "$2,453",
    growth: "-6% Since last month",
    icon: <FiDollarSign />,
    cardClass: "orange",
    progress: "42%",
    progressClass: "blueProgress",
  },
];

const CostPerUnit = () => {
  return (
    <section className="CostPerUnit">
      <div className="CostPerUnit-container">
        {cardData.map((item, index) => (
          <div
            key={index}
            className={`CostPerUnit-card ${item.cardClass}`}
          >
            {/* Background Icon */}
            <div className="CostPerUnit-bgIcon">
              {item.icon}
            </div>

            {/* Content */}
            <div className="CostPerUnit-content">
              <h4 className="CostPerUnit-title">
                {item.title}
              </h4>

              <h2 className="CostPerUnit-value">
                {item.value}
              </h2>

              {/* Progress Bar */}
              <div className="CostPerUnit-progress">
                <div
                  className={`CostPerUnit-progressFill ${item.progressClass}`}
                  style={{ width: item.progress }}
                ></div>
              </div>

              {/* Footer */}
              <div className="CostPerUnit-bottom">
                <FiTrendingUp className="CostPerUnit-trendIcon" />

                <span>{item.growth}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CostPerUnit;