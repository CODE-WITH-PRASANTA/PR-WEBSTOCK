import React, { useState } from "react";
import "./EmployeeAttendance.css";

import {
  FiHome,
  FiCalendar,
  FiClock,
  FiLogIn,
  FiLogOut,
  FiCoffee,
  FiGrid,
  FiTrendingUp,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const attendanceData = [
  {
    date: "10-02-2018",
    checkIn: "10:28",
    checkOut: "19:32",
    hours: "08:04",
    shift: "Shift 1",
    status: "Present",
  },
  {
    date: "11-02-2018",
    checkIn: "10:32",
    checkOut: "19:32",
    hours: "08:00",
    shift: "Shift 1",
    status: "Present",
  },
  {
    date: "12-02-2018",
    checkIn: "-",
    checkOut: "-",
    hours: "-",
    shift: "Shift 1",
    status: "Leave",
  },
  {
    date: "13-02-2018",
    checkIn: "10:35",
    checkOut: "19:31",
    hours: "07:56",
    shift: "Shift 1",
    status: "Present",
  },
  {
    date: "14-02-2018",
    checkIn: "10:25",
    checkOut: "19:29",
    hours: "08:04",
    shift: "Shift 1",
    status: "Present",
  },
  {
    date: "15-02-2018",
    checkIn: "-",
    checkOut: "-",
    hours: "-",
    shift: "Shift 1",
    status: "Weekend",
  },
  {
    date: "16-02-2018",
    checkIn: "-",
    checkOut: "-",
    hours: "-",
    shift: "Shift 1",
    status: "Weekend",
  },
  {
    date: "17-02-2018",
    checkIn: "10:28",
    checkOut: "19:35",
    hours: "08:07",
    shift: "Shift 1",
    status: "Present",
  },
];

const chartData = [
  { name: "Present", value: 79, color: "#7E57C2" },
  { name: "On Duty", value: 4, color: "#42A5F5" },
  { name: "Paid Leave", value: 9, color: "#4CAF50" },
  { name: "Absent", value: 2, color: "#FF9800" },
  { name: "Holiday", value: 6, color: "#EF5350" },
];

const statusOverview = [
  {
    title: "Present",
    percent: "79%",
    total: 42,
    color: "#7E57C2",
  },
  {
    title: "On Duty",
    percent: "3.8%",
    total: 2,
    color: "#42A5F5",
  },
  {
    title: "Paid Leave",
    percent: "9.4%",
    total: 5,
    color: "#66BB6A",
  },
  {
    title: "Absent",
    percent: "1.9%",
    total: 1,
    color: "#FFB74D",
  },
  {
    title: "Holiday",
    percent: "5.7%",
    total: 3,
    color: "#F48FB1",
  },
  {
    title: "Weekend",
    percent: "0%",
    total: 0,
    color: "#81D4FA",
  },
];

const EmployeeAttendance = () => {
  const [activeTab, setActiveTab] = useState("attendance");

  return (
    <div className="employeeAttendance">

      {/* Breadcrumb */}

      <div className="employeeAttendance_breadcrumb">

        <h2>Employee Attendance</h2>

        <div className="employeeAttendance_path">

          <FiHome />

          <span>Attendance</span>

          <span>/</span>

          <span>Employee Attendance</span>

        </div>

      </div>

      {/* Profile */}

      <div className="employeeAttendance_profile">

        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt=""
        />

        <div className="employeeAttendance_profileInfo">

          <h2>Maria Smith</h2>

          <h5>Software Developer</h5>

          <div className="employeeAttendance_profileMeta">

            <span>
              <FiGrid /> ID : IM062587UT
            </span>

            <span>
              <FiGrid /> Dept : Account
            </span>

            <span>
              <FiCalendar /> Joined : 12 January 2015
            </span>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="employeeAttendance_cards">

        <div className="employeeAttendance_card">

          <div>

            <small>Avg Working Hours</small>

            <h2>08:00</h2>

          </div>

          <FiClock className="blue" />

        </div>

        <div className="employeeAttendance_card">

          <div>

            <small>Avg In Time</small>

            <h2>10:30 AM</h2>

          </div>

          <FiLogIn className="green" />

        </div>

        <div className="employeeAttendance_card">

          <div>

            <small>Avg Out Time</small>

            <h2>07:30 PM</h2>

          </div>

          <FiLogOut className="orange" />

        </div>

        <div className="employeeAttendance_card">

          <div>

            <small>Avg Break Time</small>

            <h2>01:00</h2>

          </div>

          <FiCoffee className="purple" />

        </div>

      </div>

      {/* Tabs */}

      <div className="employeeAttendance_tabs">

        <button
          className={activeTab === "attendance" ? "active" : ""}
          onClick={() => setActiveTab("attendance")}
        >
          <FiGrid />
          Attendance Log
        </button>

        <button
          className={activeTab === "analytics" ? "active" : ""}
          onClick={() => setActiveTab("analytics")}
        >
          <FiTrendingUp />
          Analytics
        </button>

      </div>

      {/* Attendance Table */}

      {activeTab === "attendance" && (

        <div className="employeeAttendance_tableCard">

          <table>

            <thead>

              <tr>

                <th>Date</th>

                <th>Check In</th>

                <th>Check Out</th>

                <th>Working Hours</th>

                <th>Shift</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {attendanceData.map((item, index) => (

                <tr key={index}>

                  <td>{item.date}</td>

                  <td>{item.checkIn}</td>

                  <td>{item.checkOut}</td>

                  <td>{item.hours}</td>

                  <td>{item.shift}</td>

                  <td>

                    <span className={`status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>

                  </td>

                  <td className="employeeAttendance_action">

                    <FiEdit2 />

                    <FiTrash2 />

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

      {/* Analytics */}

      {activeTab === "analytics" && (

        <div className="employeeAttendance_analytics">

          <div className="employeeAttendance_chart">

            <h3>Attendance Distribution</h3>

            <ResponsiveContainer width="100%" height={420}>

              <PieChart>

                <Pie
  data={chartData}
  dataKey="value"
  cx="50%"
  cy="50%"
  innerRadius={70}
  outerRadius={120}
  paddingAngle={4}
  cornerRadius={8}
  labelLine={false}
  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
>
  {chartData.map((entry, index) => (
    <Cell
      key={index}
      fill={entry.color}
      stroke="#ffffff"
      strokeWidth={3}
    />
  ))}
</Pie>

<Tooltip />

<Legend
  verticalAlign="bottom"
  height={40}
  iconType="circle"
/>

              </PieChart>

            </ResponsiveContainer>

          </div>

          <div className="employeeAttendance_statusCard">

            <h3>Status Overview</h3>

            <div className="employeeAttendance_statusGrid">

              {statusOverview.map((item, index) => (

                <div
                  key={index}
                  className="employeeAttendance_statusBox"
                >

                  <div
                    className="employeeAttendance_circle"
                    style={{
                      borderColor: item.color,
                    }}
                  >

                    <strong>{item.percent}</strong>

                  </div>

                  <h4>{item.title}</h4>

                  <p>Total : {item.total}</p>

                </div>

              ))}

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default EmployeeAttendance;