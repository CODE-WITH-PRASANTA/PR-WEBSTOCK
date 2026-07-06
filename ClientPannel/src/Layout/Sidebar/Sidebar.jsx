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
  FaChevronRight,
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
  FaCalendarAlt,
  FaFolderOpen,
  FaProjectDiagram,
  FaTasks,
  FaFileAlt,
  FaCog,
  FaComments,
  FaTicketAlt,
  FaFileInvoiceDollar,
  FaFileContract,
  FaMoneyCheckAlt,
  FaHistory,
  FaFileSignature
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [showLogoMenu, setShowLogoMenu] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Dropdown States
  const [projectOpen, setProjectOpen] = useState(true);
  const [supportOpen, setSupportOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [documentOpen, setDocumentOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    sessionStorage.clear();
    navigate("/", { replace: true });
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

      <aside className={`sidebar ${mobileOpen ? "mobileOpen" : ""}`}>

        {/* ================= LOGO ================= */}

        <div className="sidebarLogoSection">

          <div
            className="sidebarLogoWrapper"
            onClick={() => setShowLogoMenu(!showLogoMenu)}
          >
            <div className="sidebarLogoLeft">
              <img
                src={logo}
                alt="logo"
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

        {/* ================= MENU ================= */}

        <div className="sidebarMenu">

          {/* Dashboard */}

          <NavLink
            to="/client/dashboard"
            className={({ isActive }) =>
              isActive
                ? "sidebarLink active"
                : "sidebarLink"
            }
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          {/* ================= Projects ================= */}

          <div className="sidebarDropdown">

            <button
              className="sidebarDropdownBtn"
              onClick={() =>
                setProjectOpen(!projectOpen)
              }
            >
              <div className="sidebarDropdownLeft">
                <FaFolderOpen />
                <span>Projects</span>
              </div>

              {projectOpen ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              )}
            </button>

            {projectOpen && (

              <div className="sidebarSubMenu">

                <NavLink
                  to="/client/projects"
                  className="sidebarSubLink"
                >
                  My Projects
                </NavLink>

                <NavLink
                  to="/client/project-details"
                  className="sidebarSubLink"
                >
                  Project Details
                </NavLink>

                <NavLink
                  to="/client/project-timeline"
                  className="sidebarSubLink"
                >
                  Project Timeline
                </NavLink>

                <NavLink
                  to="/client/project-tasks"
                  className="sidebarSubLink"
                >
                  <FaTasks />
                  Project Tasks
                </NavLink>

                <NavLink
                  to="/client/project-files"
                  className="sidebarSubLink"
                >
                  <FaFileAlt />
                  Project Files
                </NavLink>

              </div>

            )}

          </div>
                    {/* ================= Supports ================= */}

          <div className="sidebarDropdown">

            <button
              className="sidebarDropdownBtn"
              onClick={() => setSupportOpen(!supportOpen)}
            >
              <div className="sidebarDropdownLeft">
                <FaTicketAlt />
                <span>Supports</span>
              </div>

              {supportOpen ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              )}
            </button>

            {supportOpen && (
              <div className="sidebarSubMenu">

                <NavLink
                  to="/client/tickets"
                  className="sidebarSubLink"
                >
                  Tickets
                </NavLink>

                <NavLink
                  to="/client/ticket-details"
                  className="sidebarSubLink"
                >
                  Ticket Details
                </NavLink>

                <NavLink
                  to="/client/create-ticket"
                  className="sidebarSubLink"
                >
                  Create Ticket
                </NavLink>

                <NavLink
                  to="/client/ticket-history"
                  className="sidebarSubLink"
                >
                  <FaHistory />
                  Ticket History
                </NavLink>

                <NavLink
                  to="/client/sla-status"
                  className="sidebarSubLink"
                >
                  SLA Status
                </NavLink>

              </div>
            )}

          </div>

          {/* ================= Billing ================= */}

          <div className="sidebarDropdown">

            <button
              className="sidebarDropdownBtn"
              onClick={() => setBillingOpen(!billingOpen)}
            >
              <div className="sidebarDropdownLeft">
                <FaFileInvoiceDollar />
                <span>Billing</span>
              </div>

              {billingOpen ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              )}
            </button>

            {billingOpen && (
              <div className="sidebarSubMenu">

                <NavLink
                  to="/client/invoices"
                  className="sidebarSubLink"
                >
                  Invoices
                </NavLink>

                <NavLink
                  to="/client/invoice-details"
                  className="sidebarSubLink"
                >
                  Invoice Details
                </NavLink>

                <NavLink
                  to="/client/payments"
                  className="sidebarSubLink"
                >
                  <FaMoneyCheckAlt />
                  Payments
                </NavLink>

                <NavLink
                  to="/client/payment-history"
                  className="sidebarSubLink"
                >
                  <FaHistory />
                  Payment History
                </NavLink>

                <NavLink
                  to="/client/payment-methods"
                  className="sidebarSubLink"
                >
                  Payment Methods
                </NavLink>

              </div>
            )}

          </div>

          {/* ================= Documents ================= */}

          <div className="sidebarDropdown">

            <button
              className="sidebarDropdownBtn"
              onClick={() => setDocumentOpen(!documentOpen)}
            >
              <div className="sidebarDropdownLeft">
                <FaFileContract />
                <span>Documents</span>
              </div>

              {documentOpen ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              )}
            </button>

            {documentOpen && (
              <div className="sidebarSubMenu">

                <NavLink
                  to="/client/contracts"
                  className="sidebarSubLink"
                >
                  Contracts
                </NavLink>

                <NavLink
                  to="/client/ndas"
                  className="sidebarSubLink"
                >
                  <FaFileSignature />
                  NDAs
                </NavLink>

                <NavLink
                  to="/client/project-documents"
                  className="sidebarSubLink"
                >
                  <FaProjectDiagram />
                  Project Documents
                </NavLink>

              </div>
            )}

          </div>

          {/* ================= Chat ================= */}

          <NavLink
            to="/client/chat"
            className={({ isActive }) =>
              isActive
                ? "sidebarLink active"
                : "sidebarLink"
            }
          >
            <FaComments />
            <span>Chat</span>
          </NavLink>

          {/* ================= Settings ================= */}

          <NavLink
            to="/client/settings"
            className={({ isActive }) =>
              isActive
                ? "sidebarLink active"
                : "sidebarLink"
            }
          >
            <FaCog />
            <span>Settings</span>
          </NavLink>
                  </div>

        {/* ================= FOOTER ================= */}

        <div className="sidebarBottom">

          <div
            className="profileCard"
            onClick={() => setShowProfile(!showProfile)}
          >
            <img
              src="https://i.pravatar.cc/150?img=12"
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
                  src="https://i.pravatar.cc/150?img=12"
                  alt="Profile"
                />

                <div>
                  <h4>Demo User</h4>
                  <p>demo@prwebstock.com</p>
                </div>

              </div>

              <NavLink to="/client/profile">
                <FaUser />
                <span>My Profile</span>
              </NavLink>

              <NavLink to="/client/account">
                <FaShieldAlt />
                <span>Account Settings</span>
              </NavLink>

              <NavLink to="/client/notifications">
                <FaBell />
                <span>Notifications</span>
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

      {/* ================= CHAT DRAWER ================= */}

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
            👋 Hello, welcome to PR WEBSTOCK.
          </div>

          <div className="messageRight">
            How can we help you today?
          </div>

          <div className="messageLeft">
            Your project updates are available.
          </div>

          <div className="messageRight">
            You have 3 unread notifications.
          </div>

        </div>

        <div className="chatDrawerFooter">

          <input
            type="text"
            placeholder="Type your message..."
          />

          <button>
            Send
          </button>

        </div>

      </div>

    </>
  );
};

export default Sidebar;