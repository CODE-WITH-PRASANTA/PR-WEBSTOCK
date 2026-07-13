import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../../assets/PR WEBS6TOCK WHITE PNG.png";

import {
  FaTachometerAlt,
  FaUser,
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
  FaFolderOpen,
  FaTasks,
  FaFileAlt,
  FaCog,
  FaComments,
  FaTicketAlt,
  FaFileInvoiceDollar,
  FaFileContract,
  FaMoneyCheckAlt,
  FaHistory,
  FaProjectDiagram,
  FaFileSignature,
  FaUserShield,
  FaBars,
  FaSun,
  FaMoon,
  FaAngleDoubleLeft,
  FaAngleDoubleRight
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  // Core Layout States
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Popup & Dropdown States
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoMenu, setShowLogoMenu] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [projectOpen, setProjectOpen] = useState(true);
  const [supportOpen, setSupportOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [documentOpen, setDocumentOpen] = useState(false);

  // Synchronize Light/Dark class to document body
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsLightTheme(true);
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, []);

  const toggleTheme = () => {
    if (isLightTheme) {
      document.body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
      setIsLightTheme(false);
    } else {
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
      setIsLightTheme(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    sessionStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <>
      {/* Mobile Hamburger Menu Toggle */}
      <button
        className="mobileMenuBtn"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <FaBars />
      </button>

      <aside 
        className={`sidebar ${mobileOpen ? "mobileOpen" : ""} ${isCollapsed ? "collapsed" : ""}`}
      >
        {/* ================= LOGO SECTION ================= */}
        <div className="sidebarLogoSection">
          <div
            className="sidebarLogoWrapper"
            onClick={() => !isCollapsed && setShowLogoMenu(!showLogoMenu)}
          >
            <div className="sidebarLogoLeft">
              <img src={logo} alt="logo" className="sidebarLogo" />
              {!isCollapsed && <span>PR WEBSTOCK</span>}
            </div>
            {!isCollapsed && <FaChevronDown className="logoChevron" />}
          </div>

          {showLogoMenu && !isCollapsed && (
            <div className="logoPopupCard">
              <NavLink to="/admin/profile"><FaUser /> Profile Center</NavLink>
              <NavLink to="/admin/authentication"><FaShieldAlt /> Security</NavLink>
              <NavLink to="/admin/network"><FaNetworkWired /> Editorial Network</NavLink>
              <NavLink to="/admin/user-management"><FaUserShield /> Management</NavLink>
              <button className="popupLogoutBtn" onClick={handleLogout}>
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="sidebarActions">
            <button className="addNewBtn" title="Add New">
              <FaPlus />
              {!isCollapsed && <span>Add New</span>}
            </button>
            <button className="searchBtn" title="Search">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* ================= DESKTOP EXPAND / COLLAPSE SWITCH ================= */}
        <button 
          className="desktopToggleBtn" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </button>

        {/* ================= NAVIGATION MENU ================= */}
        <div className="sidebarMenu">
          {/* Dashboard */}
          <NavLink
            to="/client/dashboard"
            className={({ isActive }) => `sidebarLink ${isActive ? "active" : ""}`}
            title="Dashboard"
          >
            <FaTachometerAlt />
            {!isCollapsed && <span>Dashboard</span>}
          </NavLink>

          {/* Projects Dropdown */}
          <div className="sidebarDropdown">
            <button
              className="sidebarDropdownBtn"
              onClick={() => !isCollapsed && setProjectOpen(!projectOpen)}
              title="Projects"
            >
              <div className="sidebarDropdownLeft">
                <FaFolderOpen />
                {!isCollapsed && <span>Projects</span>}
              </div>
              {!isCollapsed && (projectOpen ? <FaChevronDown /> : <FaChevronRight />)}
            </button>

            {projectOpen && !isCollapsed && (
              <div className="sidebarSubMenu">
                <NavLink to="/client/projects" className="sidebarSubLink">My Projects</NavLink>
                <NavLink to="/client/project-details" className="sidebarSubLink">Project Details</NavLink>
                <NavLink to="/client/project-timeline" className="sidebarSubLink">Timeline</NavLink>
                <NavLink to="/client/project-tasks" className="sidebarSubLink"><FaTasks /> Tasks</NavLink>
                <NavLink to="/client/project-files" className="sidebarSubLink"><FaFileAlt /> Files</NavLink>
              </div>
            )}
          </div>

          {/* Supports Dropdown */}
          <div className="sidebarDropdown">
            <button
              className="sidebarDropdownBtn"
              onClick={() => !isCollapsed && setSupportOpen(!supportOpen)}
              title="Supports"
            >
              <div className="sidebarDropdownLeft">
                <FaTicketAlt />
                {!isCollapsed && <span>Supports</span>}
              </div>
              {!isCollapsed && (supportOpen ? <FaChevronDown /> : <FaChevronRight />)}
            </button>

            {supportOpen && !isCollapsed && (
              <div className="sidebarSubMenu">
                <NavLink to="/client/tickets" className="sidebarSubLink">Tickets</NavLink>
                <NavLink to="/client/ticket-details" className="sidebarSubLink">Details</NavLink>
                <NavLink to="/client/create-ticket" className="sidebarSubLink">Create Ticket</NavLink>
                <NavLink to="/client/ticket-history" className="sidebarSubLink"><FaHistory /> History</NavLink>
              </div>
            )}
          </div>

          {/* Billing Dropdown */}
          <div className="sidebarDropdown">
            <button
              className="sidebarDropdownBtn"
              onClick={() => !isCollapsed && setBillingOpen(!billingOpen)}
              title="Billing"
            >
              <div className="sidebarDropdownLeft">
                <FaFileInvoiceDollar />
                {!isCollapsed && <span>Billing</span>}
              </div>
              {!isCollapsed && (billingOpen ? <FaChevronDown /> : <FaChevronRight />)}
            </button>

            {billingOpen && !isCollapsed && (
              <div className="sidebarSubMenu">
                <NavLink to="/client/invoices" className="sidebarSubLink">Invoices</NavLink>
                <NavLink to="/client/invoice-details" className="sidebarSubLink"> Invoice Details</NavLink>
                <NavLink to="/client/payments" className="sidebarSubLink"> Payments</NavLink>
                <NavLink to="/client/payment-history" className="sidebarSubLink"> Payment History</NavLink>
                <NavLink to="/client/payment-method" className="sidebarSubLink"> Payment Method</NavLink>
          
              </div>
            )}
          </div>

          {/* Documents Dropdown */}
          <div className="sidebarDropdown">
            <button
              className="sidebarDropdownBtn"
              onClick={() => !isCollapsed && setDocumentOpen(!documentOpen)}
              title="Documents"
            >
              <div className="sidebarDropdownLeft">
                <FaFileContract />
                {!isCollapsed && <span>Documents</span>}
              </div>
              {!isCollapsed && (documentOpen ? <FaChevronDown /> : <FaChevronRight />)}
            </button>

            {documentOpen && !isCollapsed && (
              <div className="sidebarSubMenu">
                <NavLink to="/client/contracts" className="sidebarSubLink">Contracts</NavLink>
                <NavLink to="/client/ndas" className="sidebarSubLink"><FaFileSignature /> NDAs</NavLink>
              </div>
            )}
          </div>

          {/* Chat Link */}
          <NavLink
            to="/client/chat"
            className={({ isActive }) => `sidebarLink ${isActive ? "active" : ""}`}
            title="Chat"
          >
            <FaComments />
            {!isCollapsed && <span>Chat</span>}
          </NavLink>

          {/* Settings Link */}
          <NavLink
            to="/client/settings"
            className={({ isActive }) => `sidebarLink ${isActive ? "active" : ""}`}
            title="Settings"
          >
            <FaCog />
            {!isCollapsed && <span>Settings</span>}
          </NavLink>
        </div>

        {/* ================= FOOTER SECTION ================= */}
        <div className="sidebarBottom">
          <div
            className="profileCard"
            onClick={() => !isCollapsed && setShowProfile(!showProfile)}
          >
            <img src="https://i.pravatar.cc/150?img=12" alt="Profile" />
          </div>

          <div className="bottomActions">
            {/* Theme Toggle Button */}
            <button className="bottomIcon themeToggleBtn" onClick={toggleTheme} title="Change Theme">
              {isLightTheme ? <FaMoon /> : <FaSun />}
            </button>
            <button className="bottomIcon" onClick={() => setShowChat(true)} title="Messages">
              <FaCommentDots />
            </button>
          </div>

          {showProfile && !isCollapsed && (
            <div className="profilePopupCard">
              <div className="profileHeader">
                <img src="https://i.pravatar.cc/150?img=12" alt="Profile" />
                <div>
                  <h4>Demo User</h4>
                  <p>demo@prwebstock.com</p>
                </div>
              </div>
              <NavLink to="/client/profile"><FaUser /> <span>My Profile</span></NavLink>
              <button className="logoutBtn" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ================= CHAT DRAWER ================= */}
      <div className={`chatDrawer ${showChat ? "chatDrawerOpen" : ""}`}>
        <div className="chatDrawerHeader">
          <h3>Messages</h3>
          <button onClick={() => setShowChat(false)}><FaTimes /></button>
        </div>
        <div className="chatDrawerBody">
          <div className="messageLeft">👋 Hello, welcome to PR WEBSTOCK.</div>
        </div>
        <div className="chatDrawerFooter">
          <input type="text" placeholder="Type your message..." />
          <button>Send</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;