import React, { useState, useEffect, useRef } from "react";
import "./MyProject.css";
import { 
  FiSearch, FiFilter, FiRefreshCw, FiDownload, 
  FiCalendar, FiChevronDown, FiX 
} from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const initialProjects = [
  { id: "258", title: "Android App Development", client: "Cara Stevens", startDate: "05/10/2021", endDate: "07/25/2021", deadline: "08/25/2021", priority: "High", progress: 7, status: "Active", details: "Build an android application for e-commerce platform with seamless payment integration.", members: ["https://randomuser.me/api/portraits/men/1.jpg", "https://randomuser.me/api/portraits/women/2.jpg", "https://randomuser.me/api/portraits/men/3.jpg"] },
  { id: "578", title: "PHP website", client: "Sarah Smith", startDate: "02/22/2021", endDate: "04/12/2021", deadline: "05/10/2021", priority: "Low", progress: 6, status: "Completed", details: "God creature is sixth was abundantly and sea gathered", members: ["https://randomuser.me/api/portraits/women/5.jpg", "https://randomuser.me/api/portraits/men/6.jpg", "https://randomuser.me/api/portraits/women/7.jpg"] },
  { id: "267", title: "Logo Design", client: "John Deo", startDate: "01/05/2021", endDate: "03/15/2021", deadline: "04/24/2021", priority: "High", progress: 8, status: "Active", details: "Corporate rebranding logo and brand identity kit guidelines.", members: ["https://randomuser.me/api/portraits/women/8.jpg", "https://randomuser.me/api/portraits/men/9.jpg", "https://randomuser.me/api/portraits/women/10.jpg"] },
  { id: "114", title: "Chat iOS app", client: "Pooja Sharma", startDate: "05/17/2021", endDate: "08/11/2021", deadline: "09/13/2021", priority: "Medium", progress: 4, status: "Active", details: "Real-time messaging iOS application using WebSockets.", members: ["https://randomuser.me/api/portraits/women/11.jpg", "https://randomuser.me/api/portraits/men/12.jpg"] },
  { id: "109", title: "Nursery App", client: "Ashton Cox", startDate: "04/19/2021", endDate: "06/28/2021", deadline: "06/30/2021", priority: "High", progress: 6, status: "Completed", details: "Plant tracking and growth monitoring ecosystem app.", members: ["https://randomuser.me/api/portraits/women/13.jpg"] },
  { id: "367", title: "Html static website", client: "Sarah Smith", startDate: "05/10/2021", endDate: "06/17/2021", deadline: "06/24/2021", priority: "Medium", progress: 5, status: "Completed", details: "Responsive landing pages for a SaaS product marketing campaign.", members: ["https://randomuser.me/api/portraits/women/14.jpg", "https://randomuser.me/api/portraits/men/15.jpg"] },
  { id: "865", title: "Accounting Software", client: "Pooja Sharma", startDate: "05/19/2021", endDate: "06/20/2021", deadline: "07/01/2021", priority: "Low", progress: 2, status: "Active", details: "GST billing and automated ledger management module.", members: ["https://randomuser.me/api/portraits/women/16.jpg", "https://randomuser.me/api/portraits/men/17.jpg", "https://randomuser.me/api/portraits/women/18.jpg"] }
];

const Myproject = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [columns, setColumns] = useState({
    id: true,
    projectTitle: true,
    clientName: true,
    startDate: true,
    endDate: true,
    deadline: true,
    noOfMembers: true,
    priority: true,
    progress: true,
    status: true,
  });

  const dropdownRef = useRef(null);

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
    setColumns(prev => ({ ...prev, [colName]: !prev[colName] }));
  };

  // 1. REFRESH ACTION
  const handleRefresh = (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    setSearchTerm("");
    setCurrentPage(1);
    setColumns({
      id: true,
      projectTitle: true,
      clientName: true,
      startDate: true,
      endDate: true,
      deadline: true,
      noOfMembers: true,
      priority: true,
      progress: true,
      status: true,
    });
    setDropdownOpen(false);
  };

  // 2. DOWNLOAD CSV ACTION
  const handleDownloadCSV = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const headers = ["ID", "Project Title", "Client Name", "Start Date", "End Date", "Deadline", "Priority", "Progress", "Status"];
    const csvRows = [headers.join(",")];

    initialProjects.forEach(p => {
      const values = [
        p.id,
        `"${p.title.replace(/"/g, '""')}"`,
        `"${p.client.replace(/"/g, '""')}"`,
        p.startDate,
        p.endDate,
        p.deadline,
        p.priority,
        p.progress,
        p.status
      ];
      csvRows.push(values.join(","));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_projects_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredProjects = initialProjects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.id.includes(searchTerm)
  );

  // 3. PAGINATION CALCULATION
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = filteredProjects.length;

  return (
    
    <div className="kuber-projects-page">
      
      {/* ================= HEADER BAR ================= */}
      <div className="kuber-panel-header">
        <div className="header-left-group">
          <span className="panel-title-text">My Projects</span>
          <div className="kuber-search-box">
            <FiSearch className="kuber-search-icon" />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="header-right-group" ref={dropdownRef}>
          <button className="action-icon-trigger" onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}>
            <FiFilter />
          </button>
          
          {/* Working Refresh Button */}
          <button className="action-icon-trigger" onClick={handleRefresh} title="Reset & Refresh">
            <FiRefreshCw />
          </button>
          
          {/* Working Download Button */}
          <button className="action-icon-trigger" onClick={handleDownloadCSV} title="Download CSV Report">
            <FiDownload />
          </button>

          {/* Column Selector Menu */}
          {dropdownOpen && (
            <div className="column-config-popup" onClick={(e) => e.stopPropagation()}>
              <div className="popup-header-title">Show/Hide Column</div>
              <div className="popup-list-wrapper">
                {Object.keys(columns).map((key) => (
                  <label key={key} className="popup-checkbox-row">
                    <input 
                      type="checkbox" 
                      checked={columns[key]} 
                      onChange={() => toggleColumn(key)}
                    />
                    <span className="checkbox-visual-box"></span>
                    <span className="checkbox-text-label">
                      {key === "id" ? "ID" :
                       key === "projectTitle" ? "Project Title" :
                       key === "clientName" ? "Client Name" :
                       key === "startDate" ? "Start Date" :
                       key === "endDate" ? "End Date" :
                       key === "deadline" ? "Deadline" :
                       key === "noOfMembers" ? "No of Members" :
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
      <div className="kuber-table-scroll-container">
        <table className="kuber-data-table">
          <thead>
            <tr>
              {columns.id && <th>ID</th>}
              {columns.projectTitle && <th>Project Title</th>}
              {columns.clientName && <th>Client Name</th>}
              {columns.startDate && <th>Start Date <span className="arrow-indicator">↑</span></th>}
              {columns.endDate && <th>End Date</th>}
              {columns.deadline && <th>Deadline</th>}
              {columns.noOfMembers && <th>No of Members</th>}
              {columns.priority && <th>Priority</th>}
              {columns.progress && <th>Progress</th>}
              {columns.status && <th>Status</th>}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="interactive-row" onClick={() => setSelectedProject(item)}>
                {columns.id && <td>{item.id}</td>}
                {columns.projectTitle && <td className="title-truncate-link">{item.title}</td>}
                {columns.clientName && <td>{item.client}</td>}
                {columns.startDate && (
                  <td>
                    <div className="table-date-cell"><FiCalendar className="cal-amber"/> {item.startDate}</div>
                  </td>
                )}
                {columns.endDate && (
                  <td>
                    <div className="table-date-cell"><FiCalendar className="cal-amber"/> {item.endDate}</div>
                  </td>
                )}
                {columns.deadline && (
                  <td>
                    <div className="table-date-cell"><FiCalendar className="cal-amber"/> {item.deadline}</div>
                  </td>
                )}
                {columns.noOfMembers && (
                  <td>
                    <div className="stacked-avatar-row">
                      {item.members.map((avatar, index) => (
                        <img key={index} src={avatar} alt="user" />
                      ))}
                      {item.id === "258" && <span className="more-count-badge">+1</span>}
                    </div>
                  </td>
                )}
                {columns.priority && (
                  <td>
                    <span className={`pill-badge prio-${item.priority.toLowerCase()}`}>
                      {item.priority}
                    </span>
                  </td>
                )}
                {columns.progress && (
                  <td>
                    <div className="progress-flex-align">
                      <div className="track-bar-outer">
                        <div className="track-bar-inner" style={{ width: `${item.progress * 10}%` }}></div>
                      </div>
                      <span className="digit-metric">{item.progress}</span>
                    </div>
                  </td>
                )}
                {columns.status && (
                  <td>
                    <span className={`pill-badge status-${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION PANEL ================= */}
      <div className="kuber-pagination-bar" onClick={(e) => e.stopPropagation()}>
        <div className="pagination-controls-flex">
          <span className="label-dim">Items per page:</span>
          <div className="dropdown-select-wrapper">
            <select 
              value={itemsPerPage} 
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <FiChevronDown className="dropdown-arrow-icon" />
          </div>
          <span className="record-range-text">
            {totalItems === 0 ? 0 : indexOfFirstItem + 1} – {Math.min(indexOfLastItem, totalItems)} of {totalItems}
          </span>
          <div className="page-arrow-buttons">
            
            {/* Working Previous Page Button */}
            <button 
              disabled={currentPage === 1} 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentPage(prev => Math.max(prev - 1, 1)); }}
              title="Previous Page"
            >
              <MdKeyboardArrowLeft />
            </button>
            
            {/* Working Next Page Button */}
            <button 
              disabled={indexOfLastItem >= totalItems} 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentPage(prev => prev + 1); }}
              title="Next Page"
            >
              <MdKeyboardArrowRight />
            </button>

          </div>
        </div>
      </div>

      {/* ================= PROFILE VIEW MODAL ================= */}
      {selectedProject && (
        <div className="kuber-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="kuber-content-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-banner-top">
              <h4>{selectedProject.title}</h4>
              <button className="close-trigger-btn" onClick={() => setSelectedProject(null)}>
                <FiX />
              </button>
            </div>
            
            <div className="modal-data-rows-container">
              <div className="modal-info-row">
                <div className="field-label-column">Client Name:</div>
                <div className="field-value-column text-dark-regular">{selectedProject.client}</div>
              </div>

              <div className="modal-info-row">
                <div className="field-label-column">Project Start Date:</div>
                <div className="field-value-column">
                  <div className="modal-calendar-flex"><FiCalendar/> {selectedProject.startDate}</div>
                </div>
              </div>

              <div className="modal-info-row">
                <div className="field-label-column">Project End Date:</div>
                <div className="field-value-column">
                  <div className="modal-calendar-flex"><FiCalendar/> {selectedProject.endDate}</div>
                </div>
              </div>

              <div className="modal-info-row">
                <div className="field-label-column">Project DeadLine:</div>
                <div className="field-value-column">
                  <div className="modal-calendar-flex"><FiCalendar/> {selectedProject.deadline}</div>
                </div>
              </div>

              <div className="modal-info-row">
                <div className="field-label-column">Team:</div>
                <div className="field-value-column">
                  <div className="stacked-avatar-row static-modal-avatars">
                    {selectedProject.members.map((avatar, idx) => (
                      <img key={idx} src={avatar} alt="team-user" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-info-row">
                <div className="field-label-column">Priority:</div>
                <div className="field-value-column">
                  <span className={`pill-badge prio-${selectedProject.priority.toLowerCase()}`}>
                    {selectedProject.priority}
                  </span>
                </div>
              </div>

              <div className="modal-info-row">
                <div className="field-label-column">Progress:</div>
                <div className="field-value-column">
                  <div className="track-bar-outer modal-bar-width">
                    <div className="track-bar-inner" style={{ width: `${selectedProject.progress * 10}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="modal-info-row">
                <div className="field-label-column">Status:</div>
                <div className="field-value-column">
                  <span className={`rect-badge-status status-${selectedProject.status.toLowerCase()}`}>
                    {selectedProject.status}
                  </span>
                </div>
              </div>

              <div className="modal-info-row align-items-top">
                <div className="field-label-column">Project Details:</div>
                <div className="field-value-column detail-paragraph-text">{selectedProject.details}</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Myproject;