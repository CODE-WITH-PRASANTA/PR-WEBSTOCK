import React, { useState, useEffect, useRef } from "react";
import "./Myproject.css";
import { 
  FiSearch, FiFilter, FiRefreshCw, FiDownload, 
  FiCalendar, FiChevronDown, FiX 
} from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import API, { SERVER_URL } from "../../api/axios";

const Myproject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [columns, setColumns] = useState({
    sNo: true,
    id: true,
    projectTitle: true,
    clientName: true,
    department: true,
    startDate: true,
    endDate: true,
    noOfMembers: true,
    priority: true,
    status: true,
  });

  const dropdownRef = useRef(null);

  // Helper function to format ISO Date to local date string (DD/MM/YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
  };

  // Fetch projects from backend
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get("/addprojects");
      if (response.data && response.data.success) {
        setProjects(response.data.data);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err.response?.data?.message || "Failed to fetch projects from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  const toggleColumn = (colName) => {
    setColumns((prev) => ({ ...prev, [colName]: !prev[colName] }));
  };

  // REFRESH ACTION
  const handleRefresh = (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    setSearchTerm("");
    setCurrentPage(1);
    setColumns({
      sNo: true,
      id: true,
      projectTitle: true,
      clientName: true,
      department: true,
      startDate: true,
      endDate: true,
      noOfMembers: true,
      priority: true,
      status: true,
    });
    setDropdownOpen(false);
    fetchProjects();
  };

  // DOWNLOAD CSV ACTION
  const handleDownloadCSV = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (projects.length === 0) return;

    const headers = [
      "S.No", "Project ID", "Project Title", "Client Name", "Department", 
      "Project Type", "Priority", "Status", "Start Date", "End Date", 
      "Project Manager", "Team Members"
    ];
    
    const csvRows = [headers.join(",")];

    projects.forEach((p, idx) => {
      const values = [
        idx + 1,
        `"${p.projectId || ""}"`,
        `"${(p.projectTitle || "").replace(/"/g, '""')}"`,
        `"${(p.client || "").replace(/"/g, '""')}"`,
        `"${p.department || ""}"`,
        `"${p.projectType || ""}"`,
        `"${p.projectPriority || ""}"`,
        `"${p.workStatus || ""}"`,
        `"${formatDate(p.startDate)}"`,
        `"${formatDate(p.endDate)}"`,
        `"${(p.projectManager || "").replace(/"/g, '""')}"`,
        `"${Array.isArray(p.team) ? p.team.join("; ") : ""}"`
      ];
      csvRows.push(values.join(","));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "projects_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter projects by Search Term
  const filteredProjects = projects.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      (p.projectTitle && p.projectTitle.toLowerCase().includes(term)) ||
      (p.client && p.client.toLowerCase().includes(term)) ||
      (p.projectId && p.projectId.toLowerCase().includes(term)) ||
      (p.department && p.department.toLowerCase().includes(term)) ||
      (p.projectType && p.projectType.toLowerCase().includes(term))
    );
  });

  // PAGINATION CALCULATIONS
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = filteredProjects.length;

  return (
    <div className="Myproject-container">
      
      {/* ================= HEADER PANEL ================= */}
      <div className="Myproject-header">
        <div className="Myproject-header-left">
          <h2 className="Myproject-title">My Projects</h2>
          <div className="Myproject-search-box">
            <FiSearch className="Myproject-search-icon" />
            <input 
              type="text" 
              className="Myproject-search-input"
              placeholder="Search by ID, Title, Client, Dept..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="Myproject-header-right" ref={dropdownRef}>
          <button 
            className="Myproject-action-btn" 
            onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
            title="Filter Columns"
          >
            <FiFilter />
          </button>
          
          <button 
            className="Myproject-action-btn" 
            onClick={handleRefresh} 
            title="Reset & Refresh"
          >
            <FiRefreshCw />
          </button>
          
          <button 
            className="Myproject-action-btn" 
            onClick={handleDownloadCSV} 
            title="Download CSV Report"
          >
            <FiDownload />
          </button>

          {/* Column Selector Popup */}
          {dropdownOpen && (
            <div className="Myproject-column-popup" onClick={(e) => e.stopPropagation()}>
              <div className="Myproject-popup-title">Show / Hide Columns</div>
              <div className="Myproject-popup-list">
                {Object.keys(columns).map((key) => (
                  <label key={key} className="Myproject-popup-item">
                    <input 
                      type="checkbox" 
                      className="Myproject-checkbox"
                      checked={columns[key]} 
                      onChange={() => toggleColumn(key)}
                    />
                    <span className="Myproject-checkbox-label">
                      {key === "sNo" ? "S.No" :
                       key === "id" ? "Project ID" :
                       key === "projectTitle" ? "Project Title" :
                       key === "clientName" ? "Client Name" :
                       key === "department" ? "Department" :
                       key === "startDate" ? "Start Date" :
                       key === "endDate" ? "End Date" :
                       key === "noOfMembers" ? "Team Members" :
                       key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= DATA GRID TABLE ================= */}
      <div className="Myproject-table-wrapper">
        {loading ? (
          <div className="Myproject-state-msg Myproject-loading-msg">
            <div className="Myproject-spinner"></div>
            <span>Loading projects...</span>
          </div>
        ) : error ? (
          <div className="Myproject-state-msg Myproject-error-msg">
            {error}
          </div>
        ) : currentItems.length === 0 ? (
          <div className="Myproject-state-msg Myproject-empty-msg">
            No projects found matching your criteria.
          </div>
        ) : (
          <table className="Myproject-table">
            <thead>
              <tr>
                {columns.sNo && <th>S.No</th>}
                {columns.id && <th>ID</th>}
                {columns.projectTitle && <th>Project Title</th>}
                {columns.clientName && <th>Client Name</th>}
                {columns.department && <th>Department</th>}
                {columns.startDate && <th>Start Date <span className="Myproject-sort-arrow">↑</span></th>}
                {columns.endDate && <th>End Date</th>}
                {columns.noOfMembers && <th>Team</th>}
                {columns.priority && <th>Priority</th>}
                {columns.status && <th>Status</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr 
                  key={item._id || item.projectId} 
                  className="Myproject-row" 
                  onClick={() => setSelectedProject(item)}
                >
                  {columns.sNo && <td className="Myproject-cell-sno">{indexOfFirstItem + index + 1}</td>}
                  {columns.id && <td className="Myproject-cell-id">{item.projectId}</td>}
                  {columns.projectTitle && <td className="Myproject-cell-title">{item.projectTitle}</td>}
                  {columns.clientName && <td>{item.client}</td>}
                  {columns.department && <td>{item.department || "N/A"}</td>}
                  
                  {columns.startDate && (
                    <td>
                      <div className="Myproject-date-cell">
                        <FiCalendar className="Myproject-date-icon"/> 
                        <span>{formatDate(item.startDate)}</span>
                      </div>
                    </td>
                  )}
                  
                  {columns.endDate && (
                    <td>
                      <div className="Myproject-date-cell">
                        <FiCalendar className="Myproject-date-icon"/> 
                        <span>{formatDate(item.endDate)}</span>
                      </div>
                    </td>
                  )}

                  {columns.noOfMembers && (
                    <td>
                      <div className="Myproject-avatar-group">
                        {Array.isArray(item.team) && item.team.length > 0 ? (
                          item.team.slice(0, 3).map((member, idx) => (
                            <span 
                              key={idx} 
                              className="Myproject-avatar-badge" 
                              title={member}
                            >
                              {member.charAt(0).toUpperCase()}
                            </span>
                          ))
                        ) : (
                          <span className="Myproject-no-team">No team</span>
                        )}
                        {Array.isArray(item.team) && item.team.length > 3 && (
                          <span className="Myproject-avatar-more">+{item.team.length - 3}</span>
                        )}
                      </div>
                    </td>
                  )}

                  {columns.priority && (
                    <td>
                      <span className={`Myproject-badge Myproject-prio-${(item.projectPriority || "low").toLowerCase()}`}>
                        {item.projectPriority}
                      </span>
                    </td>
                  )}

                  {columns.status && (
                    <td>
                      <span className={`Myproject-badge Myproject-status-${(item.workStatus || "pending").toLowerCase().replace(/\s+/g, '-')}`}>
                        {item.workStatus}
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= PAGINATION PANEL ================= */}
      <div className="Myproject-pagination-container" onClick={(e) => e.stopPropagation()}>
        <div className="Myproject-pagination-controls">
          <span className="Myproject-pagination-label">Items per page:</span>
          <div className="Myproject-select-wrapper">
            <select 
              className="Myproject-pagination-select"
              value={itemsPerPage} 
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <FiChevronDown className="Myproject-select-arrow" />
          </div>
          <span className="Myproject-pagination-info">
            {totalItems === 0 ? 0 : indexOfFirstItem + 1} – {Math.min(indexOfLastItem, totalItems)} of {totalItems}
          </span>
          <div className="Myproject-pagination-buttons">
            <button 
              className="Myproject-page-btn"
              disabled={currentPage === 1} 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentPage(prev => Math.max(prev - 1, 1)); }}
              title="Previous Page"
            >
              <MdKeyboardArrowLeft />
            </button>
            
            <button 
              className="Myproject-page-btn"
              disabled={indexOfLastItem >= totalItems} 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentPage(prev => prev + 1); }}
              title="Next Page"
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* ================= PROJECT DETAILS MODAL ================= */}
      {selectedProject && (
        <div className="Myproject-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="Myproject-modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div className="Myproject-modal-header">
              <div className="Myproject-modal-title-group">
                <h3>{selectedProject.projectTitle}</h3>
                <span className="Myproject-modal-subtitle">ID: {selectedProject.projectId}</span>
              </div>
              <button className="Myproject-modal-close-btn" onClick={() => setSelectedProject(null)}>
                <FiX />
              </button>
            </div>
            
            <div className="Myproject-modal-body">
              {/* Cover Image */}
              {selectedProject.projectImage && selectedProject.projectImage.path && (
                <div className="Myproject-modal-image-wrapper">
                  <img 
                    src={`${SERVER_URL}/${selectedProject.projectImage.path.replace(/\\/g, '/')}`} 
                    alt="Project Cover" 
                    className="Myproject-modal-image"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>
              )}

              <div className="Myproject-modal-grid">
                <div className="Myproject-modal-row">
                  <span className="Myproject-modal-label">Client Name</span>
                  <span className="Myproject-modal-value">{selectedProject.client || "N/A"}</span>
                </div>

                <div className="Myproject-modal-row">
                  <span className="Myproject-modal-label">Department</span>
                  <span className="Myproject-modal-value">{selectedProject.department || "N/A"}</span>
                </div>

                <div className="Myproject-modal-row">
                  <span className="Myproject-modal-label">Project Type</span>
                  <span className="Myproject-modal-value">{selectedProject.projectType || "N/A"}</span>
                </div>

                <div className="Myproject-modal-row">
                  <span className="Myproject-modal-label">Project Manager</span>
                  <span className="Myproject-modal-value">{selectedProject.projectManager || "N/A"}</span>
                </div>

                <div className="Myproject-modal-row">
                  <span className="Myproject-modal-label">Start Date</span>
                  <div className="Myproject-modal-value">
                    <div className="Myproject-date-cell"><FiCalendar className="Myproject-date-icon"/> {formatDate(selectedProject.startDate)}</div>
                  </div>
                </div>

                <div className="Myproject-modal-row">
                  <span className="Myproject-modal-label">End Date</span>
                  <div className="Myproject-modal-value">
                    <div className="Myproject-date-cell"><FiCalendar className="Myproject-date-icon"/> {formatDate(selectedProject.endDate)}</div>
                  </div>
                </div>

                <div className="Myproject-modal-row">
                  <span className="Myproject-modal-label">Team Members</span>
                  <span className="Myproject-modal-value">
                    {Array.isArray(selectedProject.team) && selectedProject.team.length > 0 
                      ? selectedProject.team.join(", ") 
                      : "No team members assigned"}
                  </span>
                </div>

                <div className="Myproject-modal-row">
                  <span className="Myproject-modal-label">Priority</span>
                  <div className="Myproject-modal-value">
                    <span className={`Myproject-badge Myproject-prio-${(selectedProject.projectPriority || "low").toLowerCase()}`}>
                      {selectedProject.projectPriority || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="Myproject-modal-row">
                  <span className="Myproject-modal-label">Status</span>
                  <div className="Myproject-modal-value">
                    <span className={`Myproject-badge Myproject-status-${(selectedProject.workStatus || "pending").toLowerCase().replace(/\s+/g, '-')}`}>
                      {selectedProject.workStatus || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="Myproject-modal-row Myproject-modal-row-full">
                  <span className="Myproject-modal-label">Short Description</span>
                  <p className="Myproject-modal-description">{selectedProject.projectDescription || "No description provided."}</p>
                </div>

                {selectedProject.richDescription && (
                  <div className="Myproject-modal-row Myproject-modal-row-full">
                    <span className="Myproject-modal-label">Detailed Info</span>
                    <p className="Myproject-modal-description">{selectedProject.richDescription}</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Myproject;