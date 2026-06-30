import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import {
  FiGrid,
  FiClock,
  FiCalendar,
  FiUsers,
  FiChevronDown,
  FiChevronRight,
  FiX,
} from "react-icons/fi";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [attendanceOpen, setAttendanceOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Overlay (Mobile) */}

      {isMobile && !collapsed && (
        <div
          className="sidebarOverlay"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside
        className={`sidebar ${
          isMobile
            ? !collapsed
              ? "open"
              : ""
            : collapsed
            ? "collapsed"
            : ""
        }`}
      >
        {/* Mobile Close */}

        {isMobile && (
          <button
            className="sidebarClose"
            onClick={() => setCollapsed(true)}
          >
            <FiX />
          </button>
        )}

        {/* Logo */}

        <div className="logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
            alt="logo"
          />

          {!collapsed && <h2>Kuber</h2>}
        </div>

        {/* Profile */}

        {!collapsed && (
          <div className="profile">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="profile"
            />

            <h3>Ashton Cox</h3>

            <p>Employee</p>
          </div>
        )}

        {/* Menu */}

        <div className="menu">

          {/* Dashboard */}

          <NavLink
  to="/employee/dashboard"
  className={({ isActive }) =>
    `menuItem ${isActive ? "active" : ""}`
  }
>
  <div className="menuLeft">
    <FiGrid />
    {!collapsed && <span>Dashboard</span>}
  </div>
</NavLink>
          {/* Attendance */}

         <div
  className="menuItem"
  onClick={() => {
    if (!collapsed) {
      setAttendanceOpen(!attendanceOpen);
    }
  }}
>
  <div className="menuLeft">
    <FiClock />
    {!collapsed && <span>Attendance</span>}
  </div>

  {!collapsed &&
    (attendanceOpen ? (
      <FiChevronDown />
    ) : (
      <FiChevronRight />
    ))}
</div>

          {!collapsed && (
            <div
              className={`submenu ${
                attendanceOpen ? "show" : ""
              }`}
            >
              <NavLink
  to="/employee/today-attendance"
  className={({ isActive }) =>
    `submenuItem ${isActive ? "activeSubmenu" : ""}`
  }
>
  Today's Attendance
</NavLink>

              <NavLink
  to="/employee/monthly-attendance"
  className={({ isActive }) =>
    `submenuItem ${isActive ? "activeSubmenu" : ""}`
  }
>
  Monthly Attendance
</NavLink>

              <NavLink
  to="/employee/attendance-history"
  className={({ isActive }) =>
    `submenuItem ${isActive ? "activeSubmenu" : ""}`
  }
>
  Attendance History
</NavLink>

              <NavLink
  to="/employee/overtime"
  className={({ isActive }) =>
    `submenuItem ${isActive ? "activeSubmenu" : ""}`
  }
>
  Overtime Requests
</NavLink>
              
            </div>
          )}

          {/* Leaves */}

          <div className="menuItem">

            <div className="menuLeft">
              <FiCalendar />

              {!collapsed && <span>Leaves</span>}
            </div>

            {!collapsed && <FiChevronRight />}
          </div>

          {/* My Team */}

          <div className="menuItem">

            <div className="menuLeft">
              <FiUsers />

              {!collapsed && <span>My Team</span>}
            </div>

            {!collapsed && <FiChevronRight />}
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;