import React, { useState, useEffect, useRef } from 'react';
import './TrainingList.css';

// Mock Data representing the training items
const initialTrainings = [
  { id: 1, type: "Leadership Development", trainer: "John Doe", employees: 4, duration: "8 hours", cost: "$500", status: "Completed", date: "2024-10-10", certification: "Yes", audience: "Senior Managers", completionDate: "2024-10-11", contact: "johndoe@example.com", dept: "HR", prerequisites: "Basic Leadership Skills", desc: "An intensive leadership program to enhance management skills." },
  { id: 2, type: "Advanced Data Analytics", trainer: "Sara White", employees: 3, duration: "6 hours", cost: "$400", status: "Scheduled", date: "2026-11-01", certification: "No", audience: "Data Analysts", completionDate: "2026-11-01", contact: "saraw@example.com", dept: "Analytics", prerequisites: "Python Basics", desc: "Deep dive into statistical models and machine learning fundamentals." },
  { id: 3, type: "Sales Training", trainer: "Evan Clark", employees: 2, duration: "4 hours", cost: "$300", status: "Completed", date: "2025-09-25", certification: "Yes", audience: "Sales Reps", completionDate: "2025-09-25", contact: "evan@example.com", dept: "Sales", prerequisites: "None", desc: "Mastering the art of closing high-value deals." },
  { id: 4, type: "Cybersecurity Basics", trainer: "Alice Green", employees: 5, duration: "5 hours", cost: "$250", status: "In Progress", date: "2026-11-05", certification: "Yes", audience: "All Employees", completionDate: "2026-11-06", contact: "alice@example.com", dept: "IT Security", prerequisites: "None", desc: "Phishing awareness and basic digital defense practices." },
  { id: 5, type: "Time Management", trainer: "Brian Foster", employees: 4, duration: "3 hours", cost: "$150", status: "Completed", date: "2026-08-20", certification: "No", audience: "Managers", completionDate: "2026-08-20", contact: "brian@example.com", dept: "Operations", prerequisites: "None", desc: "How to structure schedules and optimize delegation workflows." }
];

const TrainingList = () => {
  // State Management
  const [trainings, setTrainings] = useState(initialTrainings);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Dropdown & Modal Toggles
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);

  // Column Visibility State
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true,
    trainingId: false,
    trainingType: true,
    trainer: true,
    employees: true,
    timeDuration: true,
    cost: true,
    status: true,
    trainingDate: true,
    certification: true,
    targetAudience: true,
    completionDate: true,
    actions: true
  });

  // Form State for creating a training item
  const [newTraining, setNewTraining] = useState({
    type: '', trainer: '', employeeCount: '', duration: 0, date: '2026-07-04',
    status: 'Scheduled', audience: '', contact: '', completionDate: '2026-07-04',
    cost: '', certification: 'No', dept: '', prerequisites: '', desc: ''
  });

  const dropdownRef = useRef(null);

  // Close visibility dropdown on clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowColumnDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- Actions ---
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setTrainings(initialTrainings);
    setSelectedIds([]);
    setSearchTerm('');
  };

  const handleDownload = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(trainings, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "training_list.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === currentItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentItems.map(item => item.id));
    }
  };

  const handleDeleteRow = (id, e) => {
    e.stopPropagation();
    if(window.confirm("Are you sure you want to delete this training item?")) {
      setTrainings(prev => prev.filter(item => item.id !== id));
      setSelectedIds(prev => prev.filter(item => item !== id));
    }
  };

  const handleBulkDelete = () => {
    if(window.confirm(`Are you sure you want to delete ${selectedIds.length} items?`)) {
      setTrainings(prev => prev.filter(item => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    }
  };

  const handleOpenDetails = (training) => {
    setSelectedTraining(training);
    setShowDetailModal(true);
  };

  const handleCreateTraining = (e) => {
    e.preventDefault();
    const createdItem = {
      id: Date.now(),
      type: newTraining.type,
      trainer: newTraining.trainer,
      employees: parseInt(newTraining.employeeCount) || 1,
      duration: `${newTraining.duration} hours`,
      cost: newTraining.cost ? `$${newTraining.cost}` : '$0',
      status: newTraining.status,
      date: newTraining.date,
      certification: newTraining.certification,
      audience: newTraining.audience,
      completionDate: newTraining.completionDate,
      contact: newTraining.contact,
      dept: newTraining.dept,
      prerequisites: newTraining.prerequisites,
      desc: newTraining.desc
    };
    setTrainings([createdItem, ...trainings]);
    setShowAddModal(false);
    // Reset fields
    setNewTraining({
      type: '', trainer: '', employeeCount: '', duration: 0, date: '2026-07-04',
      status: 'Scheduled', audience: '', contact: '', completionDate: '2026-07-04',
      cost: '', certification: 'No', dept: '', prerequisites: '', desc: ''
    });
  };

  // --- Filtering & Pagination Calculations ---
  const filteredTrainings = trainings.filter(item => 
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.trainer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredTrainings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTrainings.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="tl-dashboard-container">
      {/* Top Breadcrumb Navigation */}
      <div className="tl-breadcrumb">
        <span>🏠 &gt; Communication &gt; <strong>Training List</strong></span>
      </div>

      {/* Main Feature Panel */}
      <div className="tl-panel">
        <div className="tl-panel-header">
          <div className="tl-header-left">
            <span className="tl-title">Training List</span>
            <div className="tl-search-container">
              <span className="tl-search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm} 
                onChange={handleSearch} 
                className="tl-search-input"
              />
            </div>
          </div>

          <div className="tl-header-right">
            {/* Show bulk action delete item if row checkboxes are triggered */}
            {selectedIds.length > 0 && (
              <button className="tl-action-btn tl-bulk-delete-btn" onClick={handleBulkDelete} title="Delete Selected">
                🗑️ Delete Selected ({selectedIds.length})
              </button>
            )}
            <div className="tl-dropdown-wrapper" ref={dropdownRef}>
              <button className="tl-action-btn" onClick={() => setShowColumnDropdown(!showColumnDropdown)} title="Show/Hide Columns">
                🎛️
              </button>
              {showColumnDropdown && (
                <div className="tl-column-dropdown">
                  <div className="tl-dropdown-title">Show/Hide Column</div>
                  {Object.keys(visibleColumns).map((col) => (
                    <label key={col} className="tl-dropdown-item">
                      <input 
                        type="checkbox" 
                        checked={visibleColumns[col]} 
                        onChange={() => setVisibleColumns(prev => ({...prev, [col]: !prev[col]}))}
                      />
                      <span>{col.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <button className="tl-action-btn tl-add-btn" onClick={() => setShowAddModal(true)} title="Add Training">➕</button>
            <button className="tl-action-btn" onClick={handleRefresh} title="Refresh Table">🔄</button>
            <button className="tl-action-btn" onClick={handleDownload} title="Export Data">📥</button>
          </div>
        </div>

        {/* Data Grid Table View */}
        <div className="tl-table-wrapper">
          <table className="tl-table">
            <thead>
              <tr>
                {visibleColumns.checkbox && (
                  <th width="40">
                    <input 
                      type="checkbox" 
                      checked={currentItems.length > 0 && selectedIds.length === currentItems.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                )}
                {visibleColumns.trainingId && <th>Training ID</th>}
                {visibleColumns.trainingType && <th>Training Type</th>}
                {visibleColumns.trainer && <th>Trainer</th>}
                {visibleColumns.employees && <th>Employees</th>}
                {visibleColumns.timeDuration && <th>Time Duration</th>}
                {visibleColumns.cost && <th>Cost</th>}
                {visibleColumns.status && <th>Status</th>}
                {visibleColumns.trainingDate && <th>Training Date</th>}
                {visibleColumns.certification && <th>Certification</th>}
                {visibleColumns.targetAudience && <th>Target Audience</th>}
                {visibleColumns.completionDate && <th>Completion Date</th>}
                {visibleColumns.actions && <th className="tl-text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="14" className="tl-no-data">No training entries available.</td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id} onClick={() => handleOpenDetails(item)} className="tl-clickable-row">
                    {visibleColumns.checkbox && (
                      <td onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(item.id)}
                          onChange={() => handleSelectRow(item.id)}
                        />
                      </td>
                    )}
                    {visibleColumns.trainingId && <td>{item.id}</td>}
                    <td className="tl-bold-text">{item.type}</td>
                    <td>{item.trainer}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="tl-avatar-group">
                        <div className="tl-avatar">👤</div>
                        <div className="tl-avatar text-avatar">+{item.employees}</div>
                      </div>
                    </td>
                    <td>{item.duration}</td>
                    <td>{item.cost}</td>
                    <td>
                      <span className={`tl-badge ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>📅 {item.date}</td>
                    <td>{item.certification}</td>
                    <td>{item.audience}</td>
                    <td>📅 {item.completionDate}</td>
                    {visibleColumns.actions && (
                      <td className="tl-text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="tl-row-actions">
                          <button className="tl-row-btn edit-icon" onClick={() => handleOpenDetails(item)}>📝</button>
                          <button className="tl-row-btn delete-icon" onClick={(e) => handleDeleteRow(item.id, e)}>🗑️</button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Footer */}
        <div className="tl-pagination-footer">
          <div className="tl-per-page">
            <span>Items per page:</span>
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div className="tl-page-info">
            <span>{totalItems === 0 ? 0 : indexOfFirstItem + 1} – {Math.min(indexOfLastItem, totalItems)} of {totalItems}</span>
            <div className="tl-page-nav">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>❮</button>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0}>❯</button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: ADD NEW TRAINING RECORD FORM */}
      {showAddModal && (
        <div className="tl-modal-overlay">
          <div className="tl-modal-box">
            <div className="tl-modal-header">
              <h2>New Training</h2>
              <button className="tl-close-x" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateTraining} className="tl-modal-form-content custom-scrollbar">
              <div className="tl-form-grid">
                <div className="tl-input-group">
                  <label>Training Type*</label>
                  <input type="text" required value={newTraining.type} onChange={(e)=>setNewTraining({...newTraining, type: e.target.value})} />
                </div>
                <div className="tl-input-group">
                  <label>Trainer*</label>
                  <input type="text" required value={newTraining.trainer} onChange={(e)=>setNewTraining({...newTraining, trainer: e.target.value})} />
                </div>
                <div className="tl-input-group">
                  <label>Employee Count*</label>
                  <input type="number" required value={newTraining.employeeCount} onChange={(e)=>setNewTraining({...newTraining, employeeCount: e.target.value})} />
                </div>
                <div className="tl-input-group">
                  <label>Duration (Hours)</label>
                  <input type="number" value={newTraining.duration} onChange={(e)=>setNewTraining({...newTraining, duration: e.target.value})} />
                </div>
                <div className="tl-input-group">
                  <label>Training Date*</label>
                  <input type="date" required value={newTraining.date} onChange={(e)=>setNewTraining({...newTraining, date: e.target.value})} />
                </div>
                <div className="tl-input-group">
                  <label>Status*</label>
                  <select value={newTraining.status} onChange={(e)=>setNewTraining({...newTraining, status: e.target.value})}>
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="tl-input-group">
                  <label>Target Audience*</label>
                  <input type="text" required value={newTraining.audience} onChange={(e)=>setNewTraining({...newTraining, audience: e.target.value})} />
                </div>
                <div className="tl-input-group">
                  <label>Trainer Contact</label>
                  <input type="email" value={newTraining.contact} onChange={(e)=>setNewTraining({...newTraining, contact: e.target.value})} />
                </div>
                <div className="tl-input-group">
                  <label>Completion Date</label>
                  <input type="date" value={newTraining.completionDate} onChange={(e)=>setNewTraining({...newTraining, completionDate: e.target.value})} />
                </div>
                <div className="tl-input-group">
                  <label>Cost</label>
                  <input type="text" placeholder="e.g. 500" value={newTraining.cost} onChange={(e)=>setNewTraining({...newTraining, cost: e.target.value})} />
                </div>
                <div className="tl-input-group">
                  <label>Certification</label>
                  <select value={newTraining.certification} onChange={(e)=>setNewTraining({...newTraining, certification: e.target.value})}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="tl-input-group">
                  <label>Department*</label>
                  <input type="text" required value={newTraining.dept} onChange={(e)=>setNewTraining({...newTraining, dept: e.target.value})} />
                </div>
              </div>
              <div className="tl-form-full-row">
                <div className="tl-input-group">
                  <label>Prerequisites</label>
                  <textarea rows="2" value={newTraining.prerequisites} onChange={(e)=>setNewTraining({...newTraining, prerequisites: e.target.value})}></textarea>
                </div>
              </div>
              <div className="tl-form-full-row">
                <div className="tl-input-group">
                  <label>Description</label>
                  <textarea rows="3" value={newTraining.desc} onChange={(e)=>setNewTraining({...newTraining, desc: e.target.value})}></textarea>
                </div>
              </div>
              <div className="tl-modal-actions">
                <button type="submit" className="tl-btn-save">Save</button>
                <button type="button" className="tl-btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: DETAIL VIEW / EDIT ENTRY RECORD */}
      {showDetailModal && selectedTraining && (
        <div className="tl-modal-overlay">
          <div className="tl-modal-box">
            <div className="tl-modal-header">
              <h2>{selectedTraining.type}</h2>
              <button className="tl-close-x" onClick={() => setShowDetailModal(false)}>✕</button>
            </div>
            <div className="tl-modal-form-content custom-scrollbar">
              <div className="tl-form-grid">
                <div className="tl-input-group read-only">
                  <label>Training Type</label>
                  <input type="text" value={selectedTraining.type} readOnly />
                </div>
                <div className="tl-input-group read-only">
                  <label>Trainer</label>
                  <input type="text" value={selectedTraining.trainer} readOnly />
                </div>
                <div className="tl-input-group read-only">
                  <label>Duration</label>
                  <input type="text" value={selectedTraining.duration} readOnly />
                </div>
                <div className="tl-input-group read-only">
                  <label>Status</label>
                  <input type="text" value={selectedTraining.status} readOnly />
                </div>
                <div className="tl-input-group read-only">
                  <label>Training Date</label>
                  <input type="text" value={selectedTraining.date} readOnly />
                </div>
                <div className="tl-input-group read-only">
                  <label>Target Audience</label>
                  <input type="text" value={selectedTraining.audience} readOnly />
                </div>
                <div className="tl-input-group read-only">
                  <label>Trainer Contact</label>
                  <input type="text" value={selectedTraining.contact || 'N/A'} readOnly />
                </div>
                <div className="tl-input-group read-only">
                  <label>Completion Date</label>
                  <input type="text" value={selectedTraining.completionDate} readOnly />
                </div>
                <div className="tl-input-group read-only">
                  <label>Cost</label>
                  <input type="text" value={selectedTraining.cost} readOnly />
                </div>
                <div className="tl-input-group read-only">
                  <label>Certification</label>
                  <input type="text" value={selectedTraining.certification} readOnly />
                </div>
                <div className="tl-input-group read-only">
                  <label>Department</label>
                  <input type="text" value={selectedTraining.dept || 'N/A'} readOnly />
                </div>
              </div>
              <div className="tl-form-full-row">
                <div className="tl-input-group read-only">
                  <label>Prerequisites</label>
                  <textarea rows="2" value={selectedTraining.prerequisites || 'None'} readOnly></textarea>
                </div>
              </div>
              <div className="tl-form-full-row">
                <div className="tl-input-group read-only">
                  <label>Description</label>
                  <textarea rows="3" value={selectedTraining.desc || 'No description provided.'} readOnly></textarea>
                </div>
              </div>
              <div className="tl-modal-actions">
                <button type="button" className="tl-btn-save" onClick={() => setShowDetailModal(false)}>OK</button>
                <button type="button" className="tl-btn-cancel" onClick={() => setShowDetailModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingList;