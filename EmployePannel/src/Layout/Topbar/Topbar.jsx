import React, { useState, useRef, useEffect } from "react";
import "./Topbar.css";

import {
  FiMenu,
  FiBell,
  FiUser,
  FiSettings,
  FiMail,
  FiLogOut,
  FiClock,
  FiFileText,
  FiChevronDown,
} from "react-icons/fi";

const Topbar = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setNotificationOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      icon: "mail",
      title: "Please check your mail",
      time: "14 mins ago",
      action: "View",
      color: "#4f46e5",
    },
    {
      id: 2,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      title: "New Patient Added..",
      time: "22 mins ago",
    },
    {
      id: 3,
      icon: "calendar",
      title: "Your leave is approved!!",
      time: "3 hours ago",
      color: "#f59e0b",
    },
    {
      id: 4,
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      title: "Let's break for lunch...",
      time: "5 hours ago",
      action: "Reply",
    },
    {
      id: 5,
      icon: "file",
      title: "Patient report generated",
      time: "14 mins ago",
      color: "#10b981",
    },
  ];

  const renderIcon = (type, color) => {
    switch (type) {
      case "mail":
        return <FiMail style={{ color }} />;
      case "calendar":
        return (
          <svg
            width="20"
            height="20"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <line x1="16" y1="3" x2="16" y2="7" />
            <line x1="8" y1="3" x2="8" y2="7" />
            <line x1="3" y1="11" x2="21" y2="11" />
          </svg>
        );
      case "file":
        return <FiFileText style={{ color }} />;
      default:
        return null;
    }
  };

  return (
    <header className={`Topbar ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      {/* LEFT SECTION */}
      <div className="Topbar-left">
        <button
          className="Topbar-toggle"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-label="Toggle Sidebar"
        >
          <FiMenu />
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div className="Topbar-right">
        
        {/* Notification Bell Dropdown */}
        <div className="Topbar-notificationWrapper" ref={notificationRef}>
          <button
            className={`Topbar-iconButton ${notificationOpen ? "active-btn" : ""}`}
            onClick={() => setNotificationOpen(!notificationOpen)}
          >
            <FiBell />
            <span className="Topbar-badge">3</span>
          </button>

          {notificationOpen && (
            <div className="Topbar-notificationDropdown">
              <div className="Topbar-notificationHeader">
                <h3>Notifications</h3>
                <button className="mark-button">Mark all read</button>
              </div>

              <div className="Topbar-notificationBody">
                {notifications.map((item) => (
                  <div className="Topbar-notificationItem" key={item.id}>
                    <div className="Topbar-notificationIcon">
                      {item.avatar ? (
                        <img src={item.avatar} alt="User Avatar" />
                      ) : (
                        <div className="svg-icon-container">
                          {renderIcon(item.icon, item.color)}
                        </div>
                      )}
                    </div>

                    <div className="Topbar-notificationContent">
                      <h4>{item.title}</h4>
                      <div className="Topbar-notificationTime">
                        <FiClock />
                        <span>{item.time}</span>
                      </div>
                      {item.action && (
                        <button className="Topbar-actionBtn">{item.action}</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="Topbar-notificationFooter">
                <a href="/">See All Notifications</a>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="Topbar-profileWrapper" ref={profileRef}>
          <button
            className={`Topbar-profileButton ${profileOpen ? "active-profile" : ""}`}
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="User Avatar"
            />
            <div className="Topbar-userMeta">
              <span className="Topbar-userName">Ella Jones</span>
              <span className="Topbar-userRole">Administrator</span>
            </div>
            <FiChevronDown className="Topbar-chevron" />
          </button>

          {profileOpen && (
            <div className="Topbar-profileDropdown">
              <div className="Dropdown-userHeader">
                <h4>Ella Jones</h4>
                <p>ella.jones@company.com</p>
              </div>
              <div className="Dropdown-divider"></div>
              <a href="/">
                <FiUser />
                <span>My Profile</span>
              </a>
              <a href="/">
                <FiMail />
                <span>Inbox</span>
              </a>
              <a href="/">
                <FiSettings />
                <span>Settings</span>
              </a>
              <div className="Dropdown-divider"></div>
              <a href="/" className="logout-link">
                <FiLogOut />
                <span>Logout</span>
              </a>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Topbar;