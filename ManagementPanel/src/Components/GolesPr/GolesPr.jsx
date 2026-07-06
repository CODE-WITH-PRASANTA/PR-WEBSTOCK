import React, { useState } from 'react';
import { 
  Plus, RotateCw, Download, SlidersHorizontal, Search, 
  Trash2, Edit3, Calendar, User, Flag, AlignLeft, TrendingUp,
  ChevronDown, ChevronLeft, ChevronRight, X, Minus, MapPin
} from 'lucide-react';
import './GolesPr.css';

// --- INITIAL DATA SEED ---
const initialGoals = [
  { id: 1, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop", name: "John Doe", type: "Performance", subject: "Increase sales by 15%", targetDate: "2026-12-31", completion: 60, status: "Active", priority: "High" },
  { id: 2, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop", name: "Sarah Smith", type: "Development", subject: "Learn Angular advanced concepts", targetDate: "2026-06-30", completion: 40, status: "In Progress", priority: "Medium" },
  { id: 3, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop", name: "Michael Brown", type: "Performance", subject: "Complete project milestone X", targetDate: "2026-03-15", completion: 100, status: "Completed", priority: "High" },
  { id: 4, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop", name: "Emily Davis", type: "Project", subject: "Reduce bug count below 5%", targetDate: "2026-09-20", completion: 15, status: "Active", priority: "Low" },
  { id: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop", name: "Robert Wilson", type: "Development", subject: "Master Node.js backend streams", targetDate: "2026-11-10", completion: 55, status: "In Progress", priority: "Medium" },
  { id: 6, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop", name: "Jennifer Lee", type: "Marketing", subject: "Launch new social campaign", targetDate: "2026-05-20", completion: 80, status: "Active", priority: "High" },
  { id: 7, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop", name: "David Miller", type: "Sales", subject: "Close 10 new enterprise accounts", targetDate: "2026-12-15", completion: 30, status: "Active", priority: "High" },
  { id: 8, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop", name: "Lisa Wang", type: "Finance", subject: "Automate monthly reconciliations", targetDate: "2026-08-30", completion: 45, status: "In Progress", priority: "Medium" },
  { id: 9, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop", name: "Kevin Jones", type: "HR", subject: "Implement new referral policy", targetDate: "2026-07-15", completion: 70, status: "Active", priority: "Medium" },
  { id: 10, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop", name: "Amy Chen", type: "Operations", subject: "Optimize supply chain routing", targetDate: "2026-10-25", completion: 50, status: "In Progress", priority: "High" },
  { id: 11, avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=100&auto=format&fit=crop", name: "Marcus Vance", type: "Strategy", subject: "Formulate Q3 scaling parameters", targetDate: "2026-09-01", completion: 10, status: "Active", priority: "High" },
  { id: 12, avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=100&auto=format&fit=crop", name: "Rachel Green", type: "Design", subject: "Deploy core atomic UI framework", targetDate: "2026-08-14", completion: 95, status: "In Progress", priority: "Low" }
];

const GolesPr = () => {
  // --- CORE STATE DRIVERS ---
  const [goalsList, setGoalsList] = useState(initialGoals);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --- UI DRIVER TOGGLES ---
  const [showColFilter, setShowColFilter] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, mode: 'create', selectedRecord: null });
  
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true, id: false, employeeName: true, goalType: true, subject: true, targetDate: true, completion: true, status: true, priority: true, actions: true
  });

  // --- COMPONENT FORM MATRIX BINDINGS ---
  const [formData, setFormData] = useState({ name: '', type: '', subject: '', targetDate: '', completion: 0, status: 'Active', priority: 'Medium' });

  // --- OPERATIONAL ACTIONS HANDLERS ---
  const executeResetRefresh = () => {
    setGoalsList(initialGoals);
    setSearchQuery("");
    setSelectedRowIds([]);
    setCurrentPage(1);
  };

  const executeDataDownload = () => {
    const stringifiedData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(goalsList, null, 2));
    const transparentAnchor = document.createElement('a');
    transparentAnchor.setAttribute("href", stringifiedData);
    transparentAnchor.setAttribute("download", "goals_report_matrix.json");
    document.body.appendChild(transparentAnchor);
    transparentAnchor.click();
    transparentAnchor.remove();
  };

  const handleSingleDeletion = (id, event) => {
    if (event) event.stopPropagation();
    if (confirm("Permanently purge this target goal tracking profile item row data?")) {
      setGoalsList(goalsList.filter(item => item.id !== id));
      setSelectedRowIds(selectedRowIds.filter(selectedId => selectedId !== id));
    }
  };

  const handleBulkDeletionChain = () => {
    if (confirm(`Purge all ${selectedRowIds.length} marked target milestone arrays simultaneously?`)) {
      setGoalsList(goalsList.filter(item => !selectedRowIds.includes(item.id)));
      setSelectedRowIds([]);
    }
  };

  const toggleSelectAllPageEntries = (e) => {
    const pageScopeIds = activePageDataset.map(item => item.id);
    if (e.target.checked) {
      setSelectedRowIds([...new Set([...selectedRowIds, ...pageScopeIds])]);
    } else {
      setSelectedRowIds(selectedRowIds.filter(id => !pageScopeIds.includes(id)));
    }
  };

  const toggleRowSelectionChoice = (id, event) => {
    event.stopPropagation();
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter(item => item !== id));
    } else {
      setSelectedRowIds([...selectedRowIds, id]);
    }
  };

  // --- MODAL ENGINE POPUP STRAPS ---
  const initCreationPopupForm = () => {
    setFormData({ name: '', type: '', subject: '', targetDate: '', completion: 0, status: 'Active', priority: 'Medium' });
    setModalState({ isOpen: true, mode: 'create', selectedRecord: null });
  };

  const initEditingPopupForm = (item) => {
    setFormData(item);
    setModalState({ isOpen: true, mode: 'edit', selectedRecord: item });
  };

  const saveModalFormPipeline = (e) => {
    e.preventDefault();
    if (modalState.mode === 'create') {
      const compiledNewNode = {
        id: Date.now(),
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
        ...formData
      };
      setGoalsList([compiledNewNode, ...goalsList]);
    } else {
      setGoalsList(goalsList.map(node => node.id === modalState.selectedRecord.id ? { ...node, ...formData } : node));
    }
    setModalState({ isOpen: false, mode: 'create', selectedRecord: null });
  };

  // --- DATA TRANSFORMATION PROCESSING PIPELINE ---
  const filteredDataset = goalsList.filter(row => 
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const finalIndexLimit = currentPage * itemsPerPage;
  const initialIndexLimit = finalIndexLimit - itemsPerPage;
  const activePageDataset = filteredDataset.slice(initialIndexLimit, finalIndexLimit);
  const totalPagesCount = Math.ceil(filteredDataset.length / itemsPerPage);

  return (
    <div className="goals-view-workspace-context">
      
      {/* --- SITE CRUMB TRAIL NAVIGATION --- */}
      <div className="goals-navigation-breadcrumb-row">
        <h1 className="main-viewport-header-title">Goals</h1>
        <div className="navigation-path-indicator-chain">
          <span>🏠</span>
          <span className="chain-delimiter">&gt;</span>
          <span>Performance</span>
          <span className="chain-delimiter">&gt;</span>
          <span className="active-destination">Goals</span>
        </div>
      </div>

      {/* --- DASHBOARD TOOLBAR UTILITIES CONTROL BAR --- */}
      <div className="goals-control-actions-panel">
        <div className="search-composite-control-hull">
          <span className="search-context-badge">Goals List</span>
          <Search className="search-magnifier-glyph" />
          <input 
            type="text" 
            placeholder="Search matching milestones..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="utility-functional-button-cluster">
          {/* Contextual dynamic delete block option showing near action buttons when checked */}
          {selectedRowIds.length > 0 && (
            <button onClick={handleBulkDeletionChain} className="bulk-extinction-context-trigger">
              <Trash2 className="icon-vector" />
              <span>Delete Checked ({selectedRowIds.length})</span>
            </button>
          )}

          <div className="popover-dropdown-anchor-shell">
            <button 
              onClick={() => setShowColFilter(!showColFilter)}
              className={`utility-icon-btn ${showColFilter ? 'active-state-on' : ''}`}
              title="Show/Hide Columns"
            >
              <SlidersHorizontal className="icon-vector" />
            </button>
            
            {showColFilter && (
              <div className="columns-visibility-manager-popover">
                <div className="popover-title-label">Show/Hide Column</div>
                <div className="popover-scrollable-body-scroller unique-scrollbar-layer">
                  {Object.keys(visibleColumns).map((columnKey) => (
                    <label key={columnKey} className="popover-interactive-checkbox-line">
                      <input 
                        type="checkbox" 
                        checked={visibleColumns[columnKey]} 
                        onChange={() => setVisibleColumns({...visibleColumns, [columnKey]: !visibleColumns[columnKey]})}
                      />
                      <span className="checkbox-text-transform-label">{columnKey.replace(/([A-Z])/g, ' $1')}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button onClick={initCreationPopupForm} className="utility-icon-btn additive-theme-btn" title="Create New Goal Profile">
            <Plus className="icon-vector" />
          </button>
          <button onClick={executeResetRefresh} className="utility-icon-btn" title="Refresh Live State">
            <RotateCw className="icon-vector" />
          </button>
          <button onClick={executeDataDownload} className="utility-icon-btn download-theme-btn" title="Download System Schema JSON">
            <Download className="icon-vector" />
          </button>
        </div>
      </div>

      {/* --- DATA WORK-GRID MATRIX TABLE --- */}
      <div className="goals-table-overflow-viewport-canvas unique-scrollbar-layer">
        <table className="goals-structured-data-table">
          <thead>
            <tr>
              {visibleColumns.checkbox && (
                <th className="column-width-checkbox">
                  <input 
                    type="checkbox" 
                    onChange={toggleSelectAllPageEntries} 
                    checked={activePageDataset.length > 0 && activePageDataset.every(item => selectedRowIds.includes(item.id))}
                  />
                </th>
              )}
              {visibleColumns.id && <th className="column-width-id">ID</th>}
              {visibleColumns.employeeName && <th>Employee Name</th>}
              {visibleColumns.goalType && <th>Goal Type</th>}
              {visibleColumns.subject && <th className="column-width-subject">Subject</th>}
              {visibleColumns.targetDate && <th>Target Date</th>}
              {visibleColumns.completion && <th className="column-width-progress">Completion</th>}
              {visibleColumns.status && <th>Status</th>}
              {visibleColumns.priority && <th>Priority</th>}
              {visibleColumns.actions && <th className="column-width-actions">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {activePageDataset.length > 0 ? (
              activePageDataset.map((row) => (
                <tr 
                  key={row.id} 
                  onClick={() => initEditingPopupForm(row)}
                  className="interactive-table-row-hover-link"
                >
                  {visibleColumns.checkbox && (
                    <td className="column-width-checkbox" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedRowIds.includes(row.id)} 
                        onChange={(e) => toggleRowSelectionChoice(row.id, e)}
                      />
                    </td>
                  )}
                  {visibleColumns.id && <td className="cell-id-style">{row.id}</td>}
                  {visibleColumns.employeeName && (
                    <td>
                      <div className="employee-profile-cell-layout">
                        <img src={row.avatar} alt={row.name} className="employee-avatar-circle" />
                        <span className="employee-string-name">{row.name}</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.goalType && <td className="subtext-dimmed-gray">{row.type}</td>}
                  {visibleColumns.subject && (
                    <td className="column-width-subject">
                      <div className="truncated-text-wrapper" title={row.subject}>
                        {row.subject}
                      </div>
                    </td>
                  )}
                  {visibleColumns.targetDate && (
                    <td>
                      <div className="calendar-date-inline-flex">
                        <Calendar className="mini-calendar-icon" />
                        <span>{row.targetDate.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1')}</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.completion && (
                    <td className="column-width-progress">
                      <div className="linear-progress-bar-component-shell">
                        <div className="progress-bar-track-background">
                          <div className="progress-bar-filled-accent-strip" style={{ width: `${row.completion}%` }}></div>
                        </div>
                        <span className="progress-percentage-numeric-readout">{row.completion}%</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td>
                      <span className={`status-pill-token class-${row.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {row.status}
                      </span>
                    </td>
                  )}
                  {visibleColumns.priority && (
                    <td>
                      <div className="priority-cell-level-indicator">
                        {row.priority === 'High' ? <TrendingUp className="priority-arrow high-red" /> : row.priority === 'Low' ? <ChevronDown className="priority-arrow low-green" /> : <Minus className="priority-arrow medium-orange" />}
                        <span>{row.priority}</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="column-width-actions" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-row-actions-group">
                        <button onClick={() => initEditingPopupForm(row)} className="row-action-trigger-btn blue-edit" title="Modify Target Record">
                          <Edit3 className="action-glyph-vector" />
                        </button>
                        <button onClick={(e) => handleSingleDeletion(row.id, e)} className="row-action-trigger-btn red-delete" title="Purge Record Row">
                          <Trash2 className="action-glyph-vector" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="table-empty-dataset-fallback">
                  No active tracking goals found matching query filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- PAGINATION CONTROLLER FOOTER --- */}
      <div className="goals-pagination-footer-panel">
        <div className="items-per-page-selector-component">
          <span className="selector-label-text">Items per page:</span>
          <div className="custom-select-box-wrapper">
            <select 
              value={itemsPerPage} 
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <ChevronDown className="select-dropdown-chevron-marker" />
          </div>
        </div>

        <div className="pagination-numeric-stepper-cluster">
          <span className="stepper-bounds-readout-string">
            {initialIndexLimit + 1} – {Math.min(finalIndexLimit, filteredDataset.length)} of {filteredDataset.length}
          </span>
          <div className="stepper-action-arrows-flex">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="stepper-nav-btn-box"
            >
              <ChevronLeft className="arrow-glyph" />
            </button>
            <button 
              disabled={currentPage === totalPagesCount || totalPagesCount === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="stepper-nav-btn-box"
            >
              <ChevronRight className="arrow-glyph" />
            </button>
          </div>
        </div>
      </div>

      {/* --- ANIMATED DIALOG OVERLAY POPUP LAYER SYSTEM --- */}
      {modalState.isOpen && (
        <div className="modal-backdrop-blur-curtain">
          <div className="modal-dialog-window-box">
            
            <div className="modal-header-color-banner">
              <div className="header-composite-avatar-title-block">
                {modalState.mode === 'edit' && modalState.selectedRecord?.avatar && (
                  <img src={modalState.selectedRecord.avatar} alt="User" className="modal-header-context-avatar" />
                )}
                <h2>
                  {modalState.mode === 'create' ? 'New Goal' : modalState.selectedRecord?.name || 'Edit Goal'}
                </h2>
              </div>
              <button className="modal-header-close-dismiss-cross" onClick={() => setModalState({ isOpen: false, mode: 'create', selectedRecord: null })}>
                <X className="dismiss-cross-vector" />
              </button>
            </div>

            <form onSubmit={saveModalFormPipeline} className="modal-interactive-form-grid-body">
              <div className="form-structural-layout-css-grid">
                
                <div className="input-field-floating-group-hull">
                  <div className="fieldset-input-wrapper-container">
                    <span className="input-top-floating-legend-label">Employee Name *</span>
                    <div className="input-icon-composite-field-carrier">
                      <input 
                        type="text" 
                        required
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter employee full name..."
                      />
                      <User className="field-boundary-icon-decoration" />
                    </div>
                  </div>
                </div>

                <div className="input-field-floating-group-hull">
                  <div className="fieldset-input-wrapper-container">
                    <span className="input-top-floating-legend-label">Goal Type *</span>
                    <div className="input-icon-composite-field-carrier">
                      <input 
                        type="text" 
                        required
                        value={formData.type} 
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        placeholder="e.g. Performance, Development"
                      />
                      <Flag className="field-boundary-icon-decoration" />
                    </div>
                  </div>
                </div>

                <div className="input-field-floating-group-hull grid-span-all-columns">
                  <div className="fieldset-input-wrapper-container">
                    <span className="input-top-floating-legend-label">Subject *</span>
                    <div className="input-icon-composite-field-carrier">
                      <input 
                        type="text" 
                        required
                        value={formData.subject} 
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        placeholder="Enter strategic metric target details description..."
                      />
                      <AlignLeft className="field-boundary-icon-decoration" />
                    </div>
                  </div>
                </div>

                <div className="input-field-floating-group-hull">
                  <div className="fieldset-input-wrapper-container">
                    <span className="input-top-floating-legend-label">Target Date *</span>
                    <div className="input-icon-composite-field-carrier specialized-date-input-hull">
                      <input 
                        type="date" 
                        required
                        value={formData.targetDate} 
                        onChange={(e) => setFormData({...formData, targetDate: e.target.value})}
                      />
                      <Calendar className="field-boundary-icon-decoration" />
                    </div>
                  </div>
                </div>

                <div className="input-field-floating-group-hull">
                  <div className="fieldset-input-wrapper-container">
                    <span className="input-top-floating-legend-label">Completion (%) *</span>
                    <div className="input-icon-composite-field-carrier">
                      <input 
                        type="number" 
                        required
                        min="0"
                        max="100"
                        value={formData.completion} 
                        onChange={(e) => setFormData({...formData, completion: Number(e.target.value)})}
                        placeholder="0"
                      />
                      <TrendingUp className="field-boundary-icon-decoration" />
                    </div>
                  </div>
                </div>

                <div className="input-field-floating-group-hull">
                  <div className="fieldset-input-wrapper-container">
                    <span className="input-top-floating-legend-label">Status *</span>
                    <div className="input-icon-composite-field-carrier unique-select-element-carrier">
                      <select 
                        value={formData.status} 
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                      >
                        <option value="Active">Active</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <ChevronDown className="field-boundary-icon-decoration pointer-events-ignore" />
                    </div>
                  </div>
                </div>

                <div className="input-field-floating-group-hull grid-span-all-columns">
                  <div className="fieldset-input-wrapper-container">
                    <span className="input-top-floating-legend-label">Priority *</span>
                    <div className="input-icon-composite-field-carrier unique-select-element-carrier">
                      <select 
                        value={formData.priority} 
                        onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                      <ChevronDown className="field-boundary-icon-decoration pointer-events-ignore" />
                    </div>
                  </div>
                </div>

              </div>

              <div className="modal-footer-action-row-buttons">
                <button type="submit" className="form-submit-action-btn blue-save-trigger">
                  Save
                </button>
                <button 
                  type="button" 
                  onClick={() => setModalState({ isOpen: false, mode: 'create', selectedRecord: null })}
                  className="form-submit-action-btn red-cancel-trigger"
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default GolesPr;