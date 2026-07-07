import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logo from '../../assets/prwebstock_logo.png';
import API from "../../api/axios"; 
import Swal from "sweetalert2";

import {
  FiGrid,
  FiClock,
  FiCalendar,
  FiUsers,
  FiChevronDown,
  FiChevronRight,
  FiX,
  FiBriefcase,
  FiSettings,
  FiMail,
  FiLogOut,
  FiUserPlus,
  FiCheckSquare,
  FiMessageSquare,
  FiDollarSign,
  FiFileText
} from "react-icons/fi";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [liveLastLogin, setLiveLastLogin] = useState(null);
  
  // State management for all sidebar dropdown items
  const [dropdowns, setDropdowns] = useState({
    attendance: false,
    leaves: false,
    team: false,
    payroll: false,
    documents: false,
    settings: false,
    email: false,
  });

  // Safe extraction of values from localStorage using State
  const [storedUser, setStoredUser] = useState(
    () => JSON.parse(localStorage.getItem("employeeData")) || {}
  );

  const currentUserName = storedUser.name || "Employee Profile";
  const currentUserRole = storedUser.role || "Staff Member";
  
  // Dynamically extract the origin from API config to eliminate hardcoded ports
  const apiBaseUrl = API.defaults.baseURL ? new URL(API.defaults.baseURL).origin : "";
  
  // Handle fallback dynamic image asset pathing
  const currentUserAvatar = storedUser.profileImage 
    ? `${apiBaseUrl}${storedUser.profileImage}` 
    : "https://randomuser.me/api/portraits/men/32.jpg";

  // Dynamic formatting logic for the fetched timestamp
  const formatLastLogin = () => {
    const timestamp = liveLastLogin || storedUser.lastLoginTime;
    if (!timestamp) return "First login session";
    
    const dateObj = new Date(timestamp);
    return dateObj.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    // Single consolidated function to fetch profile data and sync layout states
    const fetchProfileData = async () => {
      try {
        const { data } = await API.get("/auth/employee/profile");
        if (data && data.success) {
          // Sync with LocalStorage
          localStorage.setItem("employeeData", JSON.stringify(data.employee));
          // Update local state to immediately trigger visual UI updates
          setStoredUser(data.employee);
          setLiveLastLogin(data.lastLoginTime || data.employee.lastLoginTime);
        }
      } catch (err) {
        console.error("Failed to fetch fresh user profile information from server:", err.message);
      }
    };

    fetchProfileData();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (menu) => {
    if (!collapsed) {
      setDropdowns((prev) => ({
        ...prev,
        [menu]: !prev[menu],
      }));
    }
  };

  // Connect cleanly to your backend logout history processor logic 
  const handleLogout = async () => {
    try {
      // Fires the API endpoint update logic to record the logout time stamp
      await API.post("/auth/employee/logout"); 
    } catch (err) {
      console.error("Backend session logout tracking failed:", err.message);
    } finally {
      // Always flush tokens and redirect the UI regardless of server response
      localStorage.removeItem("employeeToken");
      localStorage.removeItem("employeeData");
      
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have logged out successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/login");
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobile && !collapsed && (
        <div className="sidebarOverlay" onClick={() => setCollapsed(true)} />
      )}

      <aside
        className={`sidebar ${
          isMobile ? (!collapsed ? "open" : "") : collapsed ? "collapsed" : ""
        }`}
      >
        <div className="logo">
          <div className="logoBrand">
            <img src={logo} alt="PR WEBSTOCK Logo" />
          </div>

          {isMobile && (
            <button className="sidebarClose" onClick={() => setCollapsed(true)}>
              <FiX />
            </button>
          )}
        </div>

        {/* Dynamic Authenticated User Profile Section */}
        {!collapsed && (
          <div className="profile">
            <img src={currentUserAvatar} alt="Profile" />
            <h3>{currentUserName}</h3>
            <p>{currentUserRole}</p>
            <span className="last-login-time-display" style={{ fontSize: "11px", color: "#8aa", display: "block", marginTop: "4px" }}>
              Last Login: {formatLastLogin()}
            </span>
          </div>
        )}

        {/* Primary Nav Menu Block */}
        <div className="menu">
          
          {/* Main Dashboard Link */}
          <NavLink
            to="/employee/dashboard"
            className={({ isActive }) => `menuItem ${isActive ? "active" : ""}`}
          >
            <div className="menuLeft">
              <FiGrid />
              {!collapsed && <span>Dashboard</span>}
            </div>
          </NavLink>

          {/* ATTENDANCE DROPDOWN CONTAINER */}
          <div
            className={`menuItem ${!collapsed && dropdowns.attendance ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("attendance")}
          >
            <div className="menuLeft">
              <FiClock />
              {!collapsed && <span>Attendance</span>}
            </div>
            {!collapsed && (dropdowns.attendance ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.attendance ? "show" : ""}`}>
              <NavLink to="/employee/today-attendance" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Today's Attendance</NavLink>
              <NavLink to="/employee/monthly-attendance" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Monthly Attendance</NavLink>
              <NavLink to="/employee/attendance-history" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Attendance History</NavLink>
              <NavLink to="/employee/attendance-overtime" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Overtime Requests</NavLink>
              <NavLink to="/employee/shift-schedule" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Shift Schedule</NavLink>
            </div>
          )}

          {/* LEAVES DROPDOWN CONTAINER */}
          <div
            className={`menuItem ${!collapsed && dropdowns.leaves ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("leaves")}
          >
            <div className="menuLeft">
              <FiCalendar />
              {!collapsed && <span>Leaves</span>}
            </div>
            {!collapsed && (dropdowns.leaves ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.leaves ? "show" : ""}`}>
              <NavLink to="/employee/apply-leave" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Apply Leave</NavLink>
              <NavLink to="/employee/leave-requests" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Leave Requests</NavLink>
              <NavLink to="/employee/leave-balance" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Leave Balance</NavLink>
            </div>
          )}

          {/* MY TEAM DROPDOWN CONTAINER */}
          <div
            className={`menuItem ${!collapsed && dropdowns.team ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("team")}
          >
            <div className="menuLeft">
              <FiUsers />
              {!collapsed && <span>My Team</span>}
            </div>
            {!collapsed && (dropdowns.team ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.team ? "show" : ""}`}>
              <NavLink to="/employee/team-members" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Team Members</NavLink>
              <NavLink to="/employee/team-attendance" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Team Attendance</NavLink>
              <NavLink to="/employee/team-leaves" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Team Leaves</NavLink>
              <NavLink to="/employee/team-performance" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Team Performance</NavLink>
            </div>
          )}

          {/* MY PROJECTS ROW */}
          <NavLink
            to="/employee/my-projects"
            className={({ isActive }) => `menuItem ${isActive ? "active" : ""}`}
          >
            <div className="menuLeft">
              <FiBriefcase />
              {!collapsed && <span>My Projects</span>}
            </div>
          </NavLink>

          {/* MY TASKS LINK */}
          <NavLink
            to="/employee/my-tasks"
            className={({ isActive }) => `menuItem ${isActive ? "active" : ""}`}
          >
            <div className="menuLeft">
              <FiCheckSquare />
              {!collapsed && <span>My Tasks</span>}
            </div>
          </NavLink>

          {/* CHAT LINK */}
          <NavLink
            to="/employee/chat"
            className={({ isActive }) => `menuItem ${isActive ? "active" : ""}`}
          >
            <div className="menuLeft">
              <FiMessageSquare />
              {!collapsed && <span>Chat</span>}
            </div>
          </NavLink>

          {/* PAYROLL DROPDOWN CONTAINER */}
          <div
            className={`menuItem ${!collapsed && dropdowns.payroll ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("payroll")}
          >
            <div className="menuLeft">
              <FiDollarSign />
              {!collapsed && <span>Payroll</span>}
            </div>
            {!collapsed && (dropdowns.payroll ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.payroll ? "show" : ""}`}>
              <NavLink to="/employee/payslips" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Payslips</NavLink>
              <NavLink to="/employee/reimbursements" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Reimbursements</NavLink>
            </div>
          )}

          {/* DOCUMENTS DROPDOWN CONTAINER */}
          <div
            className={`menuItem ${!collapsed && dropdowns.documents ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("documents")}
          >
            <div className="menuLeft">
              <FiFileText />
              {!collapsed && <span>Documents</span>}
            </div>
            {!collapsed && (dropdowns.documents ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.documents ? "show" : ""}`}>
              <NavLink to="/employee/my-documents" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>My Documents</NavLink>
              <NavLink to="/employee/upload-documents" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Upload Documents</NavLink>
              <NavLink to="/employee/company-policies" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Company Policies</NavLink>
            </div>
          )}

          {/* SETTINGS DROPDOWN CONTAINER */}
          <div
            className={`menuItem ${!collapsed && dropdowns.settings ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("settings")}
          >
            <div className="menuLeft">
              <FiSettings />
              {!collapsed && <span>Settings</span>}
            </div>
            {!collapsed && (dropdowns.settings ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.settings ? "show" : ""}`}>
              <NavLink to="/employee/profile-settings" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Profile Settings</NavLink>
              <NavLink to="/employee/password-security" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Password & Security</NavLink>
            </div>
          )}

          {/* EMAIL DROPDOWN CONTAINER */}
          <div
            className={`menuItem ${!collapsed && dropdowns.email ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("email")}
          >
            <div className="menuLeft">
              <FiMail />
              {!collapsed && <span>Email</span>}
            </div>
            {!collapsed && (dropdowns.email ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.email ? "show" : ""}`}>
              <NavLink to="/employee/email-inbox" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Inbox</NavLink>
              <NavLink to="/employee/email-compose" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Compose</NavLink>
              <NavLink to="/employee/email-read" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Read Email</NavLink>
            </div>
          )}

          {/* APPLICATION SUB-CATEGORY */}
          {!collapsed && <div className="menuSectionHeader">APPS</div>}
          
          <NavLink
            to="/employee/calendar"
            className={({ isActive }) => `menuItem ${isActive ? "active" : ""}`}
          >
            <div className="menuLeft">
              <FiCalendar />
              {!collapsed && <span>Calendar</span>}
            </div>
            {!collapsed && <span className="badgeNew">New</span>}
          </NavLink>

          <NavLink
            to="/employee/contacts"
            className={({ isActive }) => `menuItem ${isActive ? "active" : ""}`}
          >
            <div className="menuLeft">
              <FiUserPlus />
              {!collapsed && <span>Contacts</span>}
            </div>
          </NavLink>

        </div>

        {/* Pinned Logout Area */}
        <div className="sidebarFooter">
          <div className="logoutButton" onClick={handleLogout} style={{ cursor: "pointer" }}>
            <FiLogOut />
            {!collapsed && <span>Logout</span>}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;