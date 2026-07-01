import React from "react";
import "./Summary.css";

import {
  FiSearch,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
} from "react-icons/fi";

/* ===========================
   TOP SUMMARY CARDS
=========================== */

const summaryCards = [
  {
    title: "Total",
    value: "11",
    className: "Summary-total",
  },
  {
    title: "Pending",
    value: "4",
    className: "Summary-pending",
  },
  {
    title: "Approved",
    value: "5",
    className: "Summary-approved",
  },
  {
    title: "Rejected",
    value: "2",
    className: "Summary-rejected",
  },
];

/* ===========================
   EMPLOYEE DATA
=========================== */

const employeeData = [
  {
    name: "John Smith",
    department: "Engineering",
    avatar: "https://i.pravatar.cc/80?img=12",
    leaveType: "Annual Leave",
    duration: "Jul 15 - Jul 20",
    note: "Family vacation",
    days: 6,
    status: "Approved",
  },
  {
    name: "Emily Johnson",
    department: "Marketing",
    avatar: "https://i.pravatar.cc/80?img=23",
    leaveType: "Sick Leave",
    duration: "Jul 10 - Jul 12",
    note: "Medical appointment",
    days: 3,
    status: "Approved",
  },
  {
    name: "Michael Brown",
    department: "Sales",
    avatar: "https://i.pravatar.cc/80?img=15",
    leaveType: "Personal Leave",
    duration: "Jul 25 - Jul 25",
    note: "Personal matters",
    days: 1,
    status: "Pending",
  },
  {
    name: "Jessica Williams",
    department: "HR",
    avatar: "https://i.pravatar.cc/80?img=29",
    leaveType: "Maternity Leave",
    duration: "Aug 1 - Oct 30",
    note: "Maternity leave",
    days: 90,
    status: "Approved",
  },
  {
    name: "David Miller",
    department: "Finance",
    avatar: "https://i.pravatar.cc/80?img=31",
    leaveType: "Annual Leave",
    duration: "Jul 18 - Jul 22",
    note: "Family event",
    days: 5,
    status: "Rejected",
  },
  {
    name: "Sarah Davis",
    department: "Engineering",
    avatar: "https://i.pravatar.cc/80?img=44",
    leaveType: "Sick Leave",
    duration: "Jul 13 - Jul 14",
    note: "Not feeling well",
    days: 2,
    status: "Pending",
  },
  {
    name: "Robert Wilson",
    department: "Customer Support",
    avatar: "https://i.pravatar.cc/80?img=18",
    leaveType: "Annual Leave",
    duration: "Sep 5 - Sep 15",
    note: "Vacation",
    days: 11,
    status: "Pending",
  },
  {
    name: "Sophia Turner",
    department: "Operations",
    avatar: "https://i.pravatar.cc/80?img=36",
    leaveType: "Annual Leave",
    duration: "Oct 2 - Oct 6",
    note: "Traveling abroad",
    days: 5,
    status: "Approved",
  },
];

/* ===========================
   COUNTRY DATA
=========================== */

const countryData = [
  {
    country: "India",
    value: 23,
    change: "+32%",
    color: "#18b9d9",
  },
  {
    country: "USA",
    value: 32,
    change: "+12%",
    color: "#2F80ED",
  },
  {
    country: "Srilanka",
    value: 12,
    change: "-12%",
    color: "#FF9800",
  },
  {
    country: "Australia",
    value: 32,
    change: "+3%",
    color: "#4CAF50",
  },
];

/* ===========================
   EARNING DATA
=========================== */

const earningData = [
  {
    source: "envato.com",
    percent: 17,
    color: "#4CAF50",
  },
  {
    source: "google.com",
    percent: 27,
    color: "#F44336",
  },
  {
    source: "yahoo.com",
    percent: 25,
    color: "#3F51B5",
  },
  {
    source: "store",
    percent: 18,
    color: "#FF9800",
  },
  {
    source: "Others",
    percent: 13,
    color: "#212121",
  },
];

const Summary = () => {
  return (
    <section className="Summary">
      <div className="Summary-wrapper">
        {/* ================= LEFT SIDE ================= */}

        <div className="Summary-left">
          <div className="Summary-card">
            <div className="Summary-header">
              <h2>Leave Requests Summary</h2>
            </div>

            {/* Summary Cards */}

            <div className="Summary-stats">
              {summaryCards.map((item, index) => (
                <div
                  key={index}
                  className={`Summary-statCard ${item.className}`}
                >
                  <h3>{item.value}</h3>
                  <p>{item.title}</p>
                </div>
              ))}
            </div>

            {/* Search */}

            <div className="Summary-search">
              <FiSearch />

              <input
                type="text"
                placeholder="Filter requests"
              />
            </div>
                        {/* ================= TABLE ================= */}

            <div className="Summary-tableWrapper">
              <table className="Summary-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Leave Type</th>
                    <th>Duration</th>
                    <th>Days</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {employeeData.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="Summary-employee">
                          <img
                            src={item.avatar}
                            alt={item.name}
                            className="Summary-avatar"
                          />

                          <div>
                            <h4>{item.name}</h4>
                            <span>{item.department}</span>
                          </div>
                        </div>
                      </td>

                      <td>{item.leaveType}</td>

                      <td>
                        <div className="Summary-duration">
                          <strong>{item.duration}</strong>
                          <span>{item.note}</span>
                        </div>
                      </td>

                      <td>{item.days}</td>

                      <td>
                        <span
                          className={`Summary-status ${item.status.toLowerCase()}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>
                        <div className="Summary-actions">
                          <FiEye />

                          <FiEdit2 />

                          {(item.status === "Pending" ||
                            item.status === "Rejected") && (
                            <FiTrash2 className="Summary-delete" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= PAGINATION ================= */}

            <div className="Summary-pagination">
              <div className="Summary-pageSize">
                <span>Items per page:</span>

                <button>
                  10 <FiChevronDown />
                </button>
              </div>

              <div className="Summary-pageInfo">
                1 – 10 of 11
              </div>

              <div className="Summary-pageButtons">
                <button>
                  <FiChevronLeft />
                </button>

                <button>
                  <FiChevronRight />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="Summary-right">

          {/* Country Wise Clients */}

          <div className="Summary-countryCard">

            <h2>Country Wise Clients</h2>

            <div className="Summary-donutWrapper">

              <div className="Summary-donut"></div>

            </div>

            <div className="Summary-countryList">

              {countryData.map((item, index) => (
                <div
                  className="Summary-countryItem"
                  key={index}
                >
                  <div className="Summary-countryName">
                    <span
                      className="Summary-dot"
                      style={{
                        background: item.color,
                      }}
                    ></span>

                    {item.country}
                  </div>

                  <span>{item.value}</span>

                  <small>{item.change}</small>
                </div>
              ))}

            </div>

          </div>

          {/* Earning Source */}

          <div className="Summary-earningCard">

            <h2>Earning Source</h2>

            <h1>$90,808</h1>

            {earningData.map((item, index) => (
              <div
                className="Summary-earningItem"
                key={index}
              >
                <div className="Summary-earningTop">
                  <span>{item.source}</span>

                  <span
                    className="Summary-percent"
                    style={{
                      background: item.color,
                    }}
                  >
                    {item.percent}%
                  </span>
                </div>

                <div className="Summary-progress">
                  <div
                    className="Summary-progressFill"
                    style={{
                      width: `${item.percent}%`,
                      background: item.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default Summary;