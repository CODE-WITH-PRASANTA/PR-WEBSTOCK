import React from "react";
import "./TotalRevenue.css";

import {
  FiTrendingDown,
  FiArrowDown,
  FiBarChart2,
  FiClipboard,
} from "react-icons/fi";

const attritionData = [
  {
    department: "Engineering",
    value: 8.2,
  },
  {
    department: "Sales",
    value: 12.5,
  },
  {
    department: "Marketing",
    value: 7.8,
  },
  {
    department: "HR",
    value: 5.3,
  },
  {
    department: "Finance",
    value: 6.7,
  },
  {
    department: "Operations",
    value: 9.4,
  },
];

const projectData = [
  {
    project: "Project A",
    progress: 30,
    duration: "2 Months",
  },
  {
    project: "Project B",
    progress: 55,
    duration: "3 Months",
  },
  {
    project: "Project C",
    progress: 67,
    duration: "1 Month",
  },
  {
    project: "Project D",
    progress: 70,
    duration: "2 Months",
  },
  {
    project: "Project E",
    progress: 24,
    duration: "3 Months",
  },
  {
    project: "Project F",
    progress: 77,
    duration: "4 Months",
  },
];

const TotalRevenue = () => {
  return (
    <section className="TotalRevenue">
      <div className="TotalRevenue-wrapper">
        {/* ================= LEFT CARD ================= */}

        <div className="TotalRevenue-left">

          <div className="TotalRevenue-header">
            <h2>Employee Attrition Rate</h2>
          </div>

          {/* Top Cards */}

          <div className="TotalRevenue-summary">

            <div className="TotalRevenue-overall">

              <FiTrendingDown className="TotalRevenue-mainIcon" />

              <h1>8.5%</h1>

              <p>Overall Attrition Rate</p>

            </div>

            <div className="TotalRevenue-infoCard">

              <div className="TotalRevenue-infoIcon">
                <FiBarChart2 />
              </div>

              <h3>Industry Average:</h3>

              <div className="TotalRevenue-infoValue">
                <span>10.2%</span>

                <FiArrowDown />

                <small>1.7%</small>
              </div>

            </div>

            <div className="TotalRevenue-infoCard">

              <div className="TotalRevenue-infoIcon">
                <FiClipboard />
              </div>

              <h3>Previous Year:</h3>

              <div className="TotalRevenue-infoValue">
                <span>9.7%</span>

                <FiArrowDown />

                <small>1.2%</small>
              </div>

            </div>

          </div>

          {/* Graph */}

          <div className="TotalRevenue-chart">

            <div className="TotalRevenue-grid">

              {[15, 10, 5, 0].map((line) => (
                <div
                  key={line}
                  className="TotalRevenue-gridLine"
                >
                  <span>{line}%</span>
                </div>
              ))}

            </div>

            <div className="TotalRevenue-bars">

              {attritionData.map((item, index) => (

                <div
                  className="TotalRevenue-barItem"
                  key={index}
                >
                  <span className="TotalRevenue-barValue">
                    {item.value}%
                  </span>

                  <div
                    className="TotalRevenue-bar"
                    style={{
                      height: `${item.value * 26}px`,
                    }}
                  ></div>

                  <p>{item.department}</p>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* ================= RIGHT CARD ================= */}

        <div className="TotalRevenue-right">

          <div className="TotalRevenue-projectHeader">
            <h2>Project Status</h2>
          </div>

          <div className="TotalRevenue-table">

            <div className="TotalRevenue-tableHead">

              <span>Projects</span>

              <span>Progress</span>

              <span>Duration</span>

            </div>

            {projectData.map((item, index) => (

              <div
                className="TotalRevenue-tableRow"
                key={index}
              >
                <span>{item.project}</span>

                <div className="TotalRevenue-progressArea">

                  <strong>{item.progress}%</strong>

                  <div className="TotalRevenue-progress">

                    <div
                      className="TotalRevenue-progressFill"
                      style={{
                        width: `${item.progress}%`,
                      }}
                    ></div>

                  </div>

                </div>

                <span>{item.duration}</span>

              </div>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default TotalRevenue;