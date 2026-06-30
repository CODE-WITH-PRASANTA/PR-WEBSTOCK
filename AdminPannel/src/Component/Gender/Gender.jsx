import React from "react";
import "./Gender.css";

import {
  FiUsers,
  FiUser,
} from "react-icons/fi";

import { FaMale, FaFemale } from "react-icons/fa";
import { BsGenderAmbiguous } from "react-icons/bs";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const genderData = [
  {
    name: "Male",
    value: 320,
    percentage: "53.3%",
    color: "#437CE5",
    icon: <FaMale />,
  },
  {
    name: "Female",
    value: 270,
    percentage: "45%",
    color: "#EF3D2F",
    icon: <FaFemale />,
  },
  {
    name: "Other",
    value: 10,
    percentage: "1.7%",
    color: "#FDB515",
    icon: <BsGenderAmbiguous />,
  },
];

const departmentData = [
  {
    department: "Engineering",
    male: 120,
    female: 45,
    other: 3,
    total: 168,
  },
  {
    department: "Sales",
    male: 55,
    female: 65,
    other: 2,
    total: 122,
  },
  {
    department: "Marketing",
    male: 30,
    female: 50,
    other: 1,
    total: 81,
  },
  {
    department: "HR",
    male: 15,
    female: 35,
    other: 0,
    total: 50,
  },
  {
    department: "Finance",
    male: 40,
    female: 30,
    other: 1,
    total: 71,
  },
];

const Gender = () => {
  return (
    <section className="Gender">
      <div className="Gender__card">
        {/* Header */}

        <div className="Gender__header">
          <h2>Gender Diversity</h2>
        </div>

        {/* Top Section */}

        <div className="Gender__top">

          {/* Left */}

          <div className="Gender__chartArea">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={genderData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={115}
                  innerRadius={0}
                  stroke="#fff"
                  strokeWidth={2}
                  label={({ percent }) =>
                    `${(percent * 100).toFixed(1)}%`
                  }
                >
                  {genderData.map((item, index) => (
                    <Cell
                      key={index}
                      fill={item.color}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="Gender__legend">
              {genderData.map((item) => (
                <div
                  className="Gender__legendItem"
                  key={item.name}
                >
                  <span
                    style={{
                      background: item.color,
                    }}
                  ></span>

                  {item.name}
                </div>
              ))}
            </div>
          </div>

          {/* Right */}

          <div className="Gender__info">

            <div className="Gender__infoHeader">
              <h3>Gender Distribution</h3>

              <div className="Gender__employees">
                <FiUsers />
                <span>600 Employees</span>
              </div>
            </div>

            <div className="Gender__stats">

              {genderData.map((item) => (
                <div
                  className="Gender__stat"
                  key={item.name}
                >
                  <div
                    className="Gender__statIcon"
                    style={{
                      background:
                        item.name === "Male"
                          ? "#E8F0FF"
                          : item.name === "Female"
                          ? "#FFE8E8"
                          : "#FFF5DA",
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </div>

                  <div>
                    <span>{item.name}</span>

                    <h4>
                      {item.value} ({item.percentage})
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="Gender__divider"></div>

            <div className="Gender__summary">

              <div className="Gender__summaryCard">
                <span>Gender Ratio (M:F)</span>
                <h2>32:27</h2>
              </div>

              <div className="Gender__summaryCard">
                <span>Diversity Score</span>
                <h2 className="Gender__score">
                  84/100
                </h2>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom */}

        <div className="Gender__bottom">

          <h3 className="Gender__tableTitle">
            Department Gender Distribution
          </h3>

          <div className="Gender__tableWrapper">
            <table className="Gender__table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Male</th>
                  <th>Female</th>
                  <th>Other</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {departmentData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.department}</td>

                    <td>
                      <div className="Gender__progressItem">
                        <span>{item.male}</span>

                        <div className="Gender__progress">
                          <div
                            className="Gender__progressFill Gender__progressFill--male"
                            style={{
                              width: `${Math.min(
                                item.male,
                                120
                              ) / 1.2}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="Gender__progressItem">
                        <span>{item.female}</span>

                        <div className="Gender__progress">
                          <div
                            className="Gender__progressFill Gender__progressFill--female"
                            style={{
                              width: `${Math.min(
                                item.female,
                                120
                              ) / 1.2}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="Gender__progressItem">
                        <span>{item.other}</span>

                        <div className="Gender__progress">
                          <div
                            className="Gender__progressFill Gender__progressFill--other"
                            style={{
                              width: `${item.other * 15}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}

          <div className="Gender__mobileList">
            {departmentData.map((item) => (
              <div
                className="Gender__mobileCard"
                key={item.department}
              >
                <h4>{item.department}</h4>

                <div className="Gender__mobileRow">
                  <span>Male</span>
                  <strong>{item.male}</strong>
                </div>

                <div className="Gender__mobileRow">
                  <span>Female</span>
                  <strong>{item.female}</strong>
                </div>

                <div className="Gender__mobileRow">
                  <span>Other</span>
                  <strong>{item.other}</strong>
                </div>

                <div className="Gender__mobileRow">
                  <span>Total</span>
                  <strong>{item.total}</strong>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Gender;