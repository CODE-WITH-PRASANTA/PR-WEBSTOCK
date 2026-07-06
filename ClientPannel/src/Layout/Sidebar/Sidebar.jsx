import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../../assets/PR WEBS6TOCK WHITE PNG.png";

import {
  FaTachometerAlt,
  FaUser,
  FaUsers,
  FaShieldAlt,
  FaChevronDown,
  FaBell,
  FaSignOutAlt,
  FaCommentDots,
  FaNetworkWired,
  FaPlus,
  FaSearch,
  FaTimes,
  FaUserTie,
  FaClipboardList,
  FaBookOpen,
  FaStar,
  FaUserShield,
} from "react-icons/fa";

import { FaCalendarAlt } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [showLogoMenu, setShowLogoMenu] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Logout Function
 const handleLogout = () => {
  // Remove authentication
  localStorage.removeItem("adminAuth");

  // Clear any other storage
  sessionStorage.clear();

  // Go to login page
  navigate("/", { replace: true });

  // Force React to reload and re-check ProtectedRoute
  window.location.reload();
};
  return (
    <>
      <button
        className="mobileMenuBtn"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>

      <aside
        className={`sidebar ${
          mobileOpen ? "mobileOpen" : ""
        }`}
      >
        {/* LOGO SECTION */}

        <div className="sidebarLogoSection">
          <div
            className="sidebarLogoWrapper"
            onClick={() =>
              setShowLogoMenu(!showLogoMenu)
            }
          >
            <div className="sidebarLogoLeft">
              <img
                src={logo}
                alt="Logo"
                className="sidebarLogo"
              />

              <span>PR WEBSTOCK</span>
            </div>

            <FaChevronDown />
          </div>

          {showLogoMenu && (
            <div className="logoPopupCard">
              <NavLink to="/admin/profile">
                <FaUser />
                Profile Center
              </NavLink>

              <NavLink to="/admin/authentication">
                <FaShieldAlt />
                Authentication & Security
              </NavLink>

              <NavLink to="/admin/network">
                <FaNetworkWired />
                Editorial Network
              </NavLink>

              <NavLink to="/admin/user-management">
                <FaUserShield />
                User Management
              </NavLink>

              <button
                className="popupLogoutBtn"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                Sign Out
              </button>
            </div>
          )}

          <div className="sidebarActions">
            <button className="addNewBtn">
              <FaPlus />
              Add New
            </button>

            <button className="searchBtn">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* MENU */}

        <div className="sidebarMenu">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive
                ? "sidebarLink active"
                : "sidebarLink"
            }
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/blog-post"
            className={({ isActive }) =>
              isActive
                ? "sidebarLink active"
                : "sidebarLink"
            }
          >
            <FaPlus />
            <span>Blog Post</span>
          </NavLink>

          <NavLink
            to="/admin/blog-management"
            className={({ isActive }) =>
              isActive
                ? "sidebarLink active"
                : "sidebarLink"
            }
          >
            <FaBookOpen />
            <span>Blog Management</span>
          </NavLink>

          <NavLink
            to="/admin/lead-management"
            className={({ isActive }) =>
              isActive
                ? "sidebarLink active"
                : "sidebarLink"
            }
          >
            <FaClipboardList />
            <span>Lead Management</span>
          </NavLink>

          <NavLink
            to="/admin/career-management"
            className={({ isActive }) =>
              isActive
                ? "sidebarLink active"
                : "sidebarLink"
            }
          >
            <FaUserTie />
            <span>Career Management</span>
          </NavLink>

          <NavLink
            to="/admin/project-management"
            className={({ isActive }) =>
              isActive
                ? "sidebarLink active"
                : "sidebarLink"
            }
          >
            <FaNetworkWired />
            <span>Project Management</span>
          </NavLink>

          <NavLink
            to="/admin/testimonial-management"
            className={({ isActive }) =>
              isActive
                ? "sidebarLink active"
                : "sidebarLink"
            }
          >
            <FaStar />
            <span>Testimonial Management</span>
          </NavLink>

          <NavLink
            to="/admin/gallery-management"
            className={({ isActive }) =>
              isActive
                ? "sidebarLink active"
                : "sidebarLink"
            }
          >
            <FaUsers />
            <span>Gallery Management</span>
          </NavLink>

          <NavLink
            to="/admin/team-member"
            className={({ isActive }) =>
              isActive
                ? "sidebarLink active"
                : "sidebarLink"
            }
          >
            <FaUser />
            <span>Team Member</span>
          </NavLink>

          <NavLink
            to="/admin/calendar-management"
            className={({ isActive }) =>
              isActive
                ? "sidebarLink active"
                : "sidebarLink"
            }
          >
            <FaCalendarAlt />
            <span>Calendar Management</span>
          </NavLink>

            <NavLink
            to="/admin/industry-management"
            className={({ isActive }) =>
              isActive
                ? "sidebarLink active"
                : "sidebarLink"
            }
          >
            <FaClipboardList />
            <span>industry work management</span>
          </NavLink>

        </div>
      

        {/* FOOTER */}

        <div className="sidebarBottom">
          <div
            className="profileCard"
            onClick={() =>
              setShowProfile(!showProfile)
            }
          >
            <img
              src="https://i.pravatar.cc/150"
              alt="Profile"
            />
          </div>

          <div className="bottomActions">
            <button
              className="bottomIcon"
              onClick={() => setShowChat(true)}
            >
              <FaCommentDots />
            </button>

            <button className="bottomIcon">
              <FaBell />
            </button>
          </div>

          {showProfile && (
            <div className="profilePopupCard">
              <div className="profileHeader">
                <img
                  src="https://i.pravatar.cc/150"
                  alt=""
                />

                <div>
                  <h4>Demo User</h4>
                  <p>demo@email.com</p>
                </div>
              </div>

              <NavLink to="/profile">
                Public Profile
              </NavLink>

              <NavLink to="/my-profile">
                My Profile
              </NavLink>

              <NavLink to="/account">
                My Account
              </NavLink>

              <button
                className="logoutBtn"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* CHAT DRAWER */}

      <div
        className={`chatDrawer ${
          showChat ? "chatDrawerOpen" : ""
        }`}
      >
        <div className="chatDrawerHeader">
          <h3>Messages</h3>

          <button
            onClick={() => setShowChat(false)}
          >
            <FaTimes />
          </button>
        </div>

        <div className="chatDrawerBody">
          <div className="messageLeft">
            Hello 👋
          </div>

          <div className="messageRight">
            Welcome Back 🚀
          </div>

          <div className="messageLeft">
            New notifications available.
          </div>

          <div className="messageRight">
            Everything is working perfectly.
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;