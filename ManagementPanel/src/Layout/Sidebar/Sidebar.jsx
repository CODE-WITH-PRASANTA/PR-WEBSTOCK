import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import logo from '../../assets/prwebstock_logo.png'

import {
  FiGrid,
  FiBriefcase,
  FiUsers,
  FiCalendar,
  FiClock,
  FiSun,
  FiUser,
  FiDollarSign,
  FiFileText,
  FiAward,
  FiTrendingUp,
  FiLayers,
  FiBookOpen,
  FiCheckSquare,
  FiMessageSquare,
  FiMail,
  FiShield,
  FiPieChart,
  FiSettings,
  FiCornerDownRight,
  FiChevronDown,
  FiChevronRight,
  FiX,
  FiLogOut,
  FiMap,
  FiLock,
  FiMenu
} from "react-icons/fi";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  
  // State management for all new sidebar dropdown menus
  const [dropdowns, setDropdowns] = useState({
    projects: false,
    managements: false,
    leaveManagement: false,
    attendance: false,
    holidays: false,
    clients: false,
    payroll: false,
    documents: false,
    jobs: false,
    candidates: false,
    departments: false,
    training: false,
    performance: false,
    communication: false,
    accounts: false,
    reports: false,
    administration: false,
    email: false,
    ui: false,
    forms: false,
    tables: false,
    charts: false,
    icons: false,
    authentication: false,
    extraPages: false,
    maps: false,
    multilevel: false,
  });

  useEffect(() => {
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

  const handleLogout = () => {
    console.log("User logged out");
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
            <img
              src={logo}
              alt="PR WEBSTOCKLogo"
            />
          </div>

          {isMobile && (
            <button
              className="sidebarClose"
              onClick={() => setCollapsed(true)}
            >
              <FiX />
            </button>
          )}
        </div>

        {/* User Profile Section */}
        {!collapsed && (
          <div className="profile">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="profile"
            />
            <h3>Ashton Cox</h3>
            <p>management</p>
          </div>
        )}

        {/* Primary Nav Menu Block */}
        <div className="menu">
          
          {/* Main Dashboard Link */}
          <NavLink
            to="/management/dashboard"
            className={({ isActive }) => `menuItem ${isActive ? "active" : ""}`}
          >
            <div className="menuLeft">
              <FiGrid />
              {!collapsed && <span>Dashboard</span>}
            </div>
          </NavLink>

          {/* PROJECTS DROPDOWN */}
          <div
            className={`menuItem ${!collapsed && dropdowns.projects ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("projects")}
          >
            <div className="menuLeft">
              <FiBriefcase />
              {!collapsed && <span>Projects</span>}
            </div>
            {!collapsed && (dropdowns.projects ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.projects ? "show" : ""}`}>
              <NavLink to="/management/allproject" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>All Projects</NavLink>
              <NavLink to="/management/projects/add" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Add Project</NavLink>
              <NavLink to="/management/projects/edit" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Edit Project</NavLink>
              <NavLink to="/management/projects/estimates" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Estimates</NavLink>
              <NavLink to="/management/projects/details" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Project Details</NavLink>
              <NavLink to="/management/projects/tasks" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Project Tasks</NavLink>
              <NavLink to="/management/projects/members" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Project Members</NavLink>
              <NavLink to="/management/projects/files" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Project Files</NavLink>
              <NavLink to="/management/projects/budget" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Project Budget</NavLink>
              <NavLink to="/management/projects/risks" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Project Risks & Issues</NavLink>
            </div>
          )}

          {/* managementS DROPDOWN */}
          <div
            className={`menuItem ${!collapsed && dropdowns.managements ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("managements")}
          >
            <div className="menuLeft">
              <FiUsers />
              {!collapsed && <span>managements</span>}
            </div>
            {!collapsed && (dropdowns.managements ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.managements ? "show" : ""}`}>
              <NavLink to="/management/all" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>All managements</NavLink>
              <NavLink to="/management/add" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Add management</NavLink>
              <NavLink to="/management/edit" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Edit management</NavLink>
              <NavLink to="/management/shift" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Management Shift</NavLink>
              <NavLink to="/management/profile" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Management Profile</NavLink>
              <NavLink to="/management/documents" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Management Documents</NavLink>
              <NavLink to="/management/assets" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Management Assets</NavLink>
              <NavLink to="/management/performance" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Management Performance</NavLink>
              <NavLink to="/management/exit" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Management Exit / Offboarding</NavLink>
            </div>
          )}

          {/* LEAVE MANAGEMENT DROPDOWN */}
          <div
            className={`menuItem ${!collapsed && dropdowns.leaveManagement ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("leaveManagement")}
          >
            <div className="menuLeft">
              <FiCalendar />
              {!collapsed && <span>Leave Management</span>}
            </div>
            {!collapsed && (dropdowns.leaveManagement ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.leaveManagement ? "show" : ""}`}>
              <NavLink
    to="/management/requests"
    className={({ isActive }) =>
      `submenuItem ${isActive ? "activeSubmenu" : ""}`
    }
>
    All Leave Requests
</NavLink>
              <NavLink to="/management/balance" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Leave Balance</NavLink>
              <NavLink to="/management/leaves/types" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Leave Types</NavLink>
              <NavLink to="/management/leaves/settings" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Leave Settings</NavLink>
            </div>
          )}

          {/* ATTENDANCE DROPDOWN */}
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
              <NavLink to="/management/today" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Today's Attendance</NavLink>
              <NavLink to="/management/management" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>management Attendance</NavLink>
              <NavLink to="/management/sheet" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Attendance Sheet</NavLink>
              <NavLink to="/management/timesheets" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Timesheets</NavLink>
              <NavLink to="/management/overtime" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Overtime Requests</NavLink>
              <NavLink to="/management/shift-planning" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Shift Planning</NavLink>
              <NavLink to="/management/remote" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Remote / WFH Requests</NavLink>
            </div>
          )}

          {/* HOLIDAYS DROPDOWN */}
          <div
            className={`menuItem ${!collapsed && dropdowns.holidays ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("holidays")}
          >
            <div className="menuLeft">
              <FiSun />
              {!collapsed && <span>Holidays</span>}
            </div>
            {!collapsed && (dropdowns.holidays ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.holidays ? "show" : ""}`}>
              <NavLink to="/management/holidays/all" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>All Holidays</NavLink>
              <NavLink to="/management/holidays/add" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Add Holiday</NavLink>
              <NavLink to="/management/holidays/edit" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Edit Holiday</NavLink>
            </div>
          )}

          {/* CLIENTS DROPDOWN */}
          <div
            className={`menuItem ${!collapsed && dropdowns.clients ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("clients")}
          >
            <div className="menuLeft">
              <FiUser />
              {!collapsed && <span>Clients</span>}
            </div>
            {!collapsed && (dropdowns.clients ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.clients ? "show" : ""}`}>
              <NavLink to="/management/clients/all" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>All Clients</NavLink>
              <NavLink to="/management/clients/add" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Add Client</NavLink>
              <NavLink to="/management/clients/edit" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Edit Client</NavLink>
              <NavLink to="/management/clients/profile" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Client Profile</NavLink>
              <NavLink to="/management/clients/contacts" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Client Contacts</NavLink>
              <NavLink to="/management/clients/projects" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Client Projects</NavLink>
              <NavLink to="/management/clients/invoices" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Client Invoices</NavLink>
              <NavLink to="/management/clients/payments" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Client Payments</NavLink>
            </div>
          )}

          {/* PAYROLL DROPDOWN */}
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
              <NavLink to="/management/payroll/salary" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>management Salary</NavLink>
              <NavLink to="/management/payroll/payslip" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Payslip</NavLink>
              <NavLink to="/management/payroll/structure" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Salary Structure</NavLink>
              <NavLink to="/management/payroll/processing" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Payroll Processing</NavLink>
              <NavLink to="/management/payroll/history" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Payroll History</NavLink>
              <NavLink to="/management/payroll/bonuses" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Bonuses & Incentives</NavLink>
              <NavLink to="/management/payroll/deductions" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Deductions</NavLink>
              <NavLink to="/management/payroll/compliance" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Statutory Compliance</NavLink>
            </div>
          )}

          {/* DOCUMENTS DROPDOWN */}
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
              <NavLink to="/management/company" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Company Documents</NavLink>
              <NavLink to="/management/management-doc" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>management Documents</NavLink>
              <NavLink to="/management/policies" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>HR Policies</NavLink>
              <NavLink to="/management/templates" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Document Templates</NavLink>
              <NavLink to="/management/signatures" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>E-Signatures</NavLink>
            </div>
          )}

          {/* LEADERS LINK */}
          <NavLink
            to="/management/leaders"
            className={({ isActive }) => `menuItem ${isActive ? "active" : ""}`}
          >
            <div className="menuLeft">
              <FiAward />
              {!collapsed && <span>Leaders</span>}
            </div>
          </NavLink>

          {/* JOBS DROPDOWN */}
          <div
            className={`menuItem ${!collapsed && dropdowns.jobs ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("jobs")}
          >
            <div className="menuLeft">
              <FiBriefcase />
              {!collapsed && <span>Jobs</span>}
            </div>
            {!collapsed && (dropdowns.jobs ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.jobs ? "show" : ""}`}>
              <NavLink to="/jobs/list" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Jobs List</NavLink>
              <NavLink to="/jobs/add" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Add Job</NavLink>
              <NavLink to="/jobs/details" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Job Details</NavLink>
              <NavLink to="/jobs/candidate-profile" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Candidate Profile</NavLink>
              <NavLink to="/jobs/interview" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Interview Schedule</NavLink>
              <NavLink to="/jobs/offers" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Offer Letters</NavLink>
              <NavLink to="/jobs/pipeline" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Hiring Pipeline</NavLink>
              <NavLink to="/jobs/resumes" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Resumes</NavLink>
            </div>
          )}

          {/* CANDIDATES DROPDOWN */}
          <div
            className={`menuItem ${!collapsed && dropdowns.candidates ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("candidates")}
          >
            <div className="menuLeft">
              <FiUsers />
              {!collapsed && <span>Candidates</span>}
            </div>
            {!collapsed && (dropdowns.candidates ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.candidates ? "show" : ""}`}>
              <NavLink to="/candidates/shortlist" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Shortlist Candidates</NavLink>
            </div>
          )}

          {/* DEPARTMENTS DROPDOWN */}
          <div
            className={`menuItem ${!collapsed && dropdowns.departments ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("departments")}
          >
            <div className="menuLeft">
              <FiLayers />
              {!collapsed && <span>Departments</span>}
            </div>
            {!collapsed && (dropdowns.departments ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.departments ? "show" : ""}`}>
              <NavLink to="/departments/all" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>All Departments</NavLink>
              <NavLink to="/departments/add" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Add Department</NavLink>
              <NavLink to="/departments/edit" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Edit Department</NavLink>
              <NavLink to="/departments/heads" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Department Heads</NavLink>
              <NavLink to="/departments/budget" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Department Budget</NavLink>
              <NavLink to="/departments/performance" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Department Performance</NavLink>
            </div>
          )}

          {/* TRAINING DROPDOWN */}
          <div
            className={`menuItem ${!collapsed && dropdowns.training ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("training")}
          >
            <div className="menuLeft">
              <FiBookOpen />
              {!collapsed && <span>Training</span>}
            </div>
            {!collapsed && (dropdowns.training ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.training ? "show" : ""}`}>
              <NavLink to="/management/list" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Training List</NavLink>
              <NavLink to="/management/trainers" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Trainers</NavLink>
              <NavLink to="/training/type" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Training Type</NavLink>
              <NavLink to="/training/attendance" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Training Attendance</NavLink>
              <NavLink to="/training/feedback" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Training Feedback</NavLink>
            </div>
          )}

          {/* PERFORMANCE DROPDOWN */}
          <div
            className={`menuItem ${!collapsed && dropdowns.performance ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("performance")}
          >
            <div className="menuLeft">
              <FiTrendingUp />
              {!collapsed && <span>Performance</span>}
            </div>
            {!collapsed && (dropdowns.performance ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.performance ? "show" : ""}`}>
              <NavLink to="/management/goals" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Goals</NavLink>
              <NavLink to="/performance/appraisals" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Appraisals</NavLink>
              <NavLink to="/performance/reviews" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Performance Reviews</NavLink>
              <NavLink to="/performance/feedback" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Feedback</NavLink>
            </div>
          )}

          {/* COMMUNICATION DROPDOWN */}
          <div
            className={`menuItem ${!collapsed && dropdowns.communication ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("communication")}
          >
            <div className="menuLeft">
              <FiMessageSquare />
              {!collapsed && <span>Communication</span>}
            </div>
            {!collapsed && (dropdowns.communication ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.communication ? "show" : ""}`}>
              <NavLink to="/management/announcements" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Announcements</NavLink>
              <NavLink to="/management/notifications" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Notifications</NavLink>
             
            </div>
          )}

          {/* ACCOUNTS DROPDOWN */}
          <div
            className={`menuItem ${!collapsed && dropdowns.accounts ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("accounts")}
          >
            <div className="menuLeft">
              <FiDollarSign />
              {!collapsed && <span>Accounts</span>}
            </div>
            {!collapsed && (dropdowns.accounts ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.accounts ? "show" : ""}`}>
              <NavLink to="/management/accounts/payments" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Client Payments</NavLink>
              <NavLink to="/management/accounts/add-payment" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Add Payment</NavLink>
              <NavLink to="/management/accounts/invoice" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Invoice</NavLink>
              <NavLink to="/management/accounts/invoice-details" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Invoice Details</NavLink>
              <NavLink to="/management/accounts/expenses" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Expenses</NavLink>
              <NavLink to="/management/accounts/expense-approvals" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Expense Approvals</NavLink>
              <NavLink to="/management/accounts/reimbursements" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Reimbursements</NavLink>
              <NavLink to="/management/accounts/summary" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Financial Summary</NavLink>
              <NavLink to="/management/accounts/tax-reports" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Tax Reports</NavLink>
            </div>
          )}

          {/* REPORTS DROPDOWN */}
          <div
            className={`menuItem ${!collapsed && dropdowns.reports ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("reports")}
          >
            <div className="menuLeft">
              <FiPieChart />
              {!collapsed && <span>Reports</span>}
            </div>
            {!collapsed && (dropdowns.reports ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.reports ? "show" : ""}`}>
              <NavLink to="/management/leave" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Leave Report</NavLink>
              <NavLink to="/management/expense" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Expense Report</NavLink>
            </div>
          )}

          {/* ADMINISTRATION DROPDOWN */}
          <div
            className={`menuItem ${!collapsed && dropdowns.administration ? "dropdownOpen" : ""}`}
            onClick={() => toggleDropdown("administration")}
          >
            <div className="menuLeft">
              <FiShield />
              {!collapsed && <span>Administration</span>}
            </div>
            {!collapsed && (dropdowns.administration ? <FiChevronDown /> : <FiChevronRight />)}
          </div>
          {!collapsed && (
            <div className={`submenu ${dropdowns.administration ? "show" : ""}`}>
              <NavLink to="/admin/users" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>User Management</NavLink>
              <NavLink to="/admin/permissions" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Roles & Permissions</NavLink>
              <NavLink to="/admin/workflows" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Approval Workflows</NavLink>
              <NavLink to="/admin/branches" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Branches & Locations</NavLink>
              <NavLink to="/admin/org-settings" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Organization Settings</NavLink>
              <NavLink to="/admin/audit-logs" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Audit Logs</NavLink>
              <NavLink to="/admin/system-settings" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>System Settings</NavLink>
            </div>
          )}

          {/* ==================== APPS SECTION ==================== */}
          {!collapsed && <div className="menuSectionHeader">APPS</div>}
          
          <NavLink
            to="/management/shortlist"
            className={({ isActive }) => `menuItem ${isActive ? "active" : ""}`}
          >
            <div className="menuLeft">
              <FiCalendar />
              {!collapsed && <span>Calendar</span>}
            </div>
            {!collapsed && <span className="badgeNew">New</span>}
          </NavLink>

          <NavLink
            to="/management/apps/task"
            className={({ isActive }) => `menuItem ${isActive ? "active" : ""}`}
          >
            <div className="menuLeft">
              <FiCheckSquare />
              {!collapsed && <span>Task</span>}
            </div>
          </NavLink>

          <NavLink
            to="/apps/contacts"
            className={({ isActive }) => `menuItem ${isActive ? "active" : ""}`}
          >
            <div className="menuLeft">
              <FiUsers />
              {!collapsed && <span>Contacts</span>}
            </div>
          </NavLink>

          {/* EMAIL DROPDOWN LINK INSIDE APPS */}
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
              <NavLink to="/apps/email/inbox" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Inbox</NavLink>
              <NavLink to="/apps/email/compose" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Compose</NavLink>
              <NavLink to="/apps/email/read" className={({ isActive }) => `submenuItem ${isActive ? "activeSubmenu" : ""}`}>Read Email</NavLink>
            </div>
          )}

         

          <NavLink
            to="/apps/chat"
            className={({ isActive }) => `menuItem ${isActive ? "active" : ""}`}
          >
            <div className="menuLeft">
              <FiMessageSquare />
              {!collapsed && <span>Chat</span>}
            </div>
          </NavLink>
          <NavLink
            to="/apps/support"
            className={({ isActive }) => `menuItem ${isActive ? "active" : ""}`}
          >
            <div className="menuLeft">
              <FiSettings />
              {!collapsed && <span>Support</span>}
            </div>
          </NavLink>

        
        </div>

        {/* Pinned Logout Area */}
        <div className="sidebarFooter">
          <div className="logoutButton" onClick={handleLogout}>
            <FiLogOut />
            {!collapsed && <span>Logout</span>}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;