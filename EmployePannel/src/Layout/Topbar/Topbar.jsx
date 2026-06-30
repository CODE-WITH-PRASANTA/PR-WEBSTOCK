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

    return () =>
      document.removeEventListener("mousedown", handleOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      icon: "mail",
      title: "Please check your mail",
      time: "14 mins ago",
      action: "View",
      color: "#31b24c",
    },
    {
      id: 2,
      avatar:
        "https://randomuser.me/api/portraits/women/44.jpg",
      title: "New Patient Added..",
      time: "22 mins ago",
    },
    {
      id: 3,
      icon: "calendar",
      title: "Your leave is approved!!",
      time: "3 hours ago",
      color: "#ff9800",
    },
    {
      id: 4,
      avatar:
        "https://randomuser.me/api/portraits/men/52.jpg",
      title: "Lets break for lunch...",
      time: "5 hours ago",
      action: "Reply",
    },
    {
      id: 5,
      icon: "file",
      title: "Patient report generated",
      time: "14 mins ago",
      color: "#39b54a",
    },
  ];

  const renderIcon = (type, color) => {
    switch (type) {
      case "mail":
        return <FiMail color={color} />;

      case "calendar":
        return (
          <svg
            width="24"
            height="24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="16"
              rx="2"
            />
            <line x1="16" y1="3" x2="16" y2="7" />
            <line x1="8" y1="3" x2="8" y2="7" />
            <line x1="3" y1="11" x2="21" y2="11" />
          </svg>
        );

      case "file":
        return <FiFileText color={color} />;

      default:
        return null;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <header className="Topbar">

      {/* LEFT */}

      <div className="Topbar-left">

        <button
          className="Topbar-toggle"
          onClick={() =>
            setSidebarCollapsed(!sidebarCollapsed)
          }
        >
          <FiMenu />
        </button>

      </div>

      {/* RIGHT */}

      <div className="Topbar-right">

       

        {/* Notification */}

        <div
          className="Topbar-notificationWrapper"
          ref={notificationRef}
        >
          <button
            className="Topbar-iconButton"
            onClick={() =>
              setNotificationOpen(!notificationOpen)
            }
          >
            <FiBell />

            <span className="Topbar-badge">
              3
            </span>
          </button>

          {notificationOpen && (
            <div className="Topbar-notificationDropdown">

              <div className="Topbar-notificationHeader">

                <h3>Notifications</h3>

               

              </div>

              <div className="Topbar-notificationBody">

                {notifications.map((item) => (
                  <div
                    className="Topbar-notificationItem"
                    key={item.id}
                  >
                    <div className="Topbar-notificationIcon">

                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt=""
                        />
                      ) : (
                        renderIcon(
                          item.icon,
                          item.color
                        )
                      )}

                    </div>

                    <div className="Topbar-notificationContent">

                      <h4>{item.title}</h4>

                      <div className="Topbar-notificationTime">

                        <FiClock />

                        <span>{item.time}</span>

                      </div>

                      {item.action && (
                        <button>
                          {item.action}
                        </button>
                      )}

                    </div>

                  </div>
                ))}

              </div>

              <div className="Topbar-notificationFooter">

                <a href="/">
                  Read All Notifications
                </a>

              </div>

            </div>
          )}
        </div>

        {/* Profile */}

        <div
          className="Topbar-profileWrapper"
          ref={profileRef}
        >
          <button
            className="Topbar-profileButton"
            onClick={() =>
              setProfileOpen(!profileOpen)
            }
          >
            <span className="Topbar-userName">
              Ella Jones
            </span>

            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt=""
            />
          </button>

          {profileOpen && (
            <div className="Topbar-profileDropdown">

              <a href="/">
                <FiUser />
                <span>Account</span>
              </a>

              <a href="/">
                <FiMail />
                <span>Inbox</span>
              </a>

              <a href="/">
                <FiSettings />
                <span>Settings</span>
              </a>

              <a href="/">
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