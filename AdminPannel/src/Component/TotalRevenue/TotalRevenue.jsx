import React from "react";
import "./TotalRevenue.css";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { year: "2006", purple: 100, red: 80, gray: 45 },
  { year: "2007", purple: 130, red: 110, gray: 52 },
  { year: "2008", purple: 110, red: 90, gray: 68 },
  { year: "2009", purple: 140, red: 120, gray: 58 },
  { year: "2010", purple: 125, red: 109, gray: 32 },
  { year: "2011", purple: 190, red: 170, gray: 45 },
  { year: "2012", purple: 140, red: 120, gray: 58 },
  { year: "2013", purple: 100, red: 80, gray: 68 },
  { year: "2014", purple: 130, red: 110, gray: 77 },
  { year: "2015", purple: 110, red: 90, gray: 62 },
  { year: "2016", purple: 140, red: 120, gray: 55 },
  { year: "2017", purple: 125, red: 109, gray: 45 },
  { year: "2018", purple: 190, red: 170, gray: 32 },
  { year: "2019", purple: 140, red: 120, gray: 45 },
  { year: "2020", purple: 140, red: 120, gray: 58 },
];

const teamData = [
  { name: "A", value: 18 },
  { name: "B", value: 14 },
  { name: "C", value: 28 },
  { name: "D", value: 12 },
  { name: "E", value: 20 },
];

const COLORS = [
  "#6D5EF5",
  "#5747DA",
  "#B2ADE3",
  "#938CD4",
  "#7C72DA",
];

const TotalRevenue = () => {
  return (
    <div className="TotalRevenue">
      {/* LEFT */}

      <div className="TotalRevenue_RevenueCard">
        <h2>Total Revenue</h2>

        <div className="TotalRevenue_LineChart">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={revenueData}>
              <XAxis
                dataKey="year"
                tick={{
                  fill: "#8f98aa",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#8f98aa",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="purple"
                stroke="#6D5EF5"
                strokeWidth={4}
                dot={{
                  fill: "#6D5EF5",
                  strokeWidth: 2,
                  r: 5,
                }}
              />

              <Line
                type="monotone"
                dataKey="red"
                stroke="#EF4E4E"
                strokeWidth={4}
                dot={{
                  fill: "#EF4E4E",
                  strokeWidth: 2,
                  r: 5,
                }}
              />

              <Line
                type="monotone"
                dataKey="gray"
                stroke="#D1D5DB"
                strokeWidth={4}
                dot={{
                  fill: "#D1D5DB",
                  strokeWidth: 2,
                  r: 5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RIGHT */}

      <div className="TotalRevenue_ActivityCard">
        <h2>Activity By Teams</h2>

        <div className="TotalRevenue_DonutWrapper">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={teamData}
                dataKey="value"
                innerRadius={110}
                outerRadius={160}
                paddingAngle={0}
              >
                {teamData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="TotalRevenue_CenterText">
            <h3>Team E</h3>
            <span>28</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalRevenue;