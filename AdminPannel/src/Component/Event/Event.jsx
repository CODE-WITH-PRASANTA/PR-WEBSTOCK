import React from "react";
import "./Event.css";

import {
  FiGift,
  FiBell,
  FiCalendar,
  FiAward,
  FiTrendingUp,
  FiStar,
  FiBookOpen,
} from "react-icons/fi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const performanceData = [
  { month: "May", emp1: 170, emp2: 260, emp3: 80 },
  { month: "Jun", emp1: 105, emp2: 100, emp3: 190 },
  { month: "Jul", emp1: 210, emp2: 180, emp3: 120 },
];

const performers = [
  {
    id: 1,
    name: "Emma Thompson",
    subject: "Mathematics",
    growth: "+5%",
    score: "98%",
    rank: 1,
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: 2,
    name: "James Wilson",
    subject: "Science",
    growth: "+3%",
    score: "96%",
    rank: 2,
    avatar: "https://i.pravatar.cc/100?img=12",
  },
];

const birthdays = [
  {
    date: "Jun 29",
    badge: "Today",
    badgeType: "today",
    name: "John Smith",
    dept: "Engineering",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    date: "Jul 4",
    badge: "5 days",
    badgeType: "normal",
    name: "Michael Brown",
    dept: "Sales",
    avatar: "https://i.pravatar.cc/100?img=44",
  },
  {
    date: "Jul 7",
    badge: "8 days",
    badgeType: "normal",
    name: "David Miller",
    dept: "Finance",
    avatar: "https://i.pravatar.cc/100?img=18",
  },
  {
    date: "Jul 11",
    badge: "12 days",
    badgeType: "normal",
    name: "Robert Wilson",
    dept: "Customer Support",
    avatar: "https://i.pravatar.cc/100?img=14",
  },
  {
    date: "Jul 1",
    badge: "2 days",
    badgeType: "today",
    name: "Laura Martinez",
    dept: "Legal",
    avatar: "https://i.pravatar.cc/100?img=48",
  },
];

const Event = () => {
  return (
    <section className="Event">
      {/* LEFT SIDE */}

      <div className="Event__left">
        {/* PERFORMANCE */}

        <div className="Event__performanceCard">
          <div className="Event__header">
            <h2>Employee Performance</h2>
          </div>

          <div className="Event__chartWrapper">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={performanceData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="emp1"
                  stroke="#A8A8A8"
                  strokeWidth={5}
                  dot={{ r: 5 }}
                  name="Employee 1"
                />

                <Line
                  type="monotone"
                  dataKey="emp2"
                  stroke="#9163A9"
                  strokeWidth={5}
                  dot={{ r: 5 }}
                  name="Employee 2"
                />

                <Line
                  type="monotone"
                  dataKey="emp3"
                  stroke="#59B9B0"
                  strokeWidth={5}
                  dot={{ r: 5 }}
                  name="Employee 3"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP PERFORMER */}

        <div className="Event__performerCard">
          <div className="Event__header">
            <h2>Top Performing Employee</h2>

            <button>View All</button>
          </div>

          <div className="Event__performerList">
            {performers.map((item) => (
              <div className="Event__performer" key={item.id}>
                <div className="Event__rank Event__rank--green">
                  {item.rank}
                </div>

                <img src={item.avatar} alt={item.name} />

                <div className="Event__performerInfo">
                  <h3>{item.name}</h3>

                  <div className="Event__tags">
                    <span className="Event__subject">
                      <FiBookOpen />
                      {item.subject}
                    </span>

                    <span className="Event__growth">
                      <FiTrendingUp />
                      {item.growth}
                    </span>
                  </div>

                  <div className="Event__icons">
                    <div>
                      <FiStar />
                    </div>

                    <div>
                      <FiTrendingUp />
                    </div>

                    <div>
                      <FiAward />
                    </div>
                  </div>
                </div>

                <div className="Event__score">{item.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="Event__right">
        <div className="Event__eventCard">
          <div className="Event__header">
            <h2>Upcoming Events</h2>
          </div>

          {/* TODAY */}

          <div className="Event__today">
            <div className="Event__todayHeader">
              <FiGift />
              Today's Events
            </div>

            <div className="Event__todayBody">
              <div className="Event__todayIcon">
                <FiGift />
              </div>

              <div>
                <h3>John Smith</h3>
                <span>Birthday</span>
              </div>
            </div>
          </div>

          {/* TABS */}

          <div className="Event__tabs">
            <button className="Event__tab Event__tab--active">
              <FiGift />
              Birthdays
            </button>

            <button className="Event__tab">
              <FiAward />
              Anniversaries
            </button>
          </div>

          {/* LIST */}

          <div className="Event__birthdayList">
            {birthdays.map((item, index) => (
              <div className="Event__birthdayItem" key={index}>
                <div className="Event__dateBox">
                  <strong>{item.date}</strong>

                  <span
                    className={`Event__badge ${
                      item.badgeType === "today"
                        ? "Event__badge--today"
                        : ""
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                <img src={item.avatar} alt="" />

                <div className="Event__employee">
                  <h4>{item.name}</h4>
                  <span>{item.dept}</span>
                </div>

                <div className="Event__actions">
                  <FiCalendar />
                  <FiBell />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Event;