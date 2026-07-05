import React, { useState } from 'react';
import { 
  Plus, RotateCw, Download, SlidersHorizontal, Search, 
  Trash2, Edit3, Calendar, Users, MessageSquare, ChevronDown, 
  ChevronLeft, ChevronRight, X, Info, CheckCircle2, AlertTriangle, XCircle,
  TrendingUp, TrendingDown, Minus
} from 'lucide-react';
import './Notifications.css';

// --- INITIAL DATA SEED FROM REFERENCE IMAGE ---
const initialNotifications = [
  { id: 1, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop", message: "System maintenance scheduled for tonight.", type: "Info", recipient: "All Staff", sentDate: "2026-01-20", status: "Sent", priority: "High" },
  { id: 2, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop", message: "Payroll processing for Q1 is completed successfully.", type: "Success", recipient: "Finance Team", sentDate: "2026-01-18", status: "Sent", priority: "Medium" },
  { id: 3, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop", message: "Server storage has reached 85% capacity threshold.", type: "Warning", recipient: "IT Admin", sentDate: "2026-01-19", status: "Pending", priority: "High" },
  { id: 4, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop", message: "Failed login attempts detected from unrecognized IP.", type: "Error", recipient: "Security", sentDate: "2026-01-20", status: "Failed", priority: "Medium" },
  { id: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop", message: "New course available: Cybersecurity awareness training.", type: "Info", recipient: "All Employees", sentDate: "2026-01-15", status: "Sent", priority: "Low" },
  { id: 6, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop", message: "Quarterly report submissions are due next Friday.", type: "Success", recipient: "Management", sentDate: "2026-01-12", status: "Sent", priority: "Medium" },
  { id: 7, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop", message: "Holiday calendar updates have been posted.", type: "Info", recipient: "All Staff", sentDate: "2026-01-05", status: "Sent", priority: "Low" },
  { id: 8, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop", message: "Annual compliance refresher training window opens.", type: "Warning", recipient: "All Staff", sentDate: "2026-01-20", status: "Sent", priority: "High" },
  { id: 9, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop", message: "New server deployment scheduled for staging sandbox.", type: "Success", recipient: "IT DevOps", sentDate: "2026-01-21", status: "Sent", priority: "Medium" },
  { id: 10, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop", message: "Database backup job 404 target execution exception.", type: "Error", recipient: "Database Admins", sentDate: "2026-01-22", status: "Failed", priority: "High" },
  { id: 11, avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=100&auto=format&fit=crop", message: "Policy handbook version updates finalized.", type: "Info", recipient: "HR Team", sentDate: "2026-01-25", status: "Pending", priority: "Low" },
  { id: 12, avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=100&auto=format&fit=crop", message: "API Gateway rate limit capacity alerts triggered.", type: "Warning", recipient: "Infrastructure", sentDate: "2026-01-26", status: "Sent", priority: "High" }
];

const Notifications = () => {
  // Core Functional Data Handling States
  const [data, setData] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Popup & Dynamic Component UI Menus States
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [modalCtx, setModalCtx] = useState({ isOpen: false, type: 'create', activeData: null });
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true, id: false, message: true, type: true, recipient: true, sentDate: true, status: true, priority: true, actions: true
  });

  // Modal Form Target Reference Binding State
  const [formData, setFormData] = useState({ message: '', type: 'Info', recipient: 'All Staff', sentDate: '', status: 'Pending', priority: 'Medium' });

  // --- CONTROLLER HANDLERS ---
  const handleRefresh = () => {
    setData(initialNotifications);
    setSearchQuery("");
    setSelectedIds([]);
    setCurrentPage(1);
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "notifications_export.json");
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  };

  const handleDeleteRow = (id) => {
    if (confirm("Are you sure you want to delete this notification record?")) {
      setData(data.filter(item => item.id !== id));
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete all ${selectedIds.length} checked system notification parameters?`)) {
      setData(data.filter(item => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    }
  };

  const handleSelectAll = (e) => {
    const pageIds = currentItems.map(item => item.id);
    if (e.target.checked) {
      setSelectedIds([...new Set([...selectedIds, ...pageIds])]);
    } else {
      setSelectedIds(selectedIds.filter(id => !pageIds.includes(id)));
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // --- MODAL WINCH CONTEXT TOGGLES ---
  const triggerCreatePopup = () => {
    setFormData({ message: '', type: 'Info', recipient: 'All Staff', sentDate: '', status: 'Pending', priority: 'Medium' });
    setModalCtx({ isOpen: true, type: 'create', activeData: null });
  };

  const triggerEditPopup = (item, e) => {
    if (e) e.stopPropagation();
    setFormData(item);
    setModalCtx({ isOpen: true, type: 'edit', activeData: item });
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (modalCtx.type === 'create') {
      const generatedNode = {
        id: Date.now(),
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
        ...formData
      };
      setData([generatedNode, ...data]);
    } else if (modalCtx.type === 'edit') {
      setData(data.map(node => node.id === modalCtx.activeData.id ? { ...node, ...formData } : node));
    }
    setModalCtx({ isOpen: false, type: 'create', activeData: null });
  };

  // --- DATA FLOW PIPELINES ---
  const filteredData = data.filter(item => 
    item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const idxLast = currentPage * itemsPerPage;
  const idxFirst = idxLast - itemsPerPage;
  const currentItems = filteredData.slice(idxFirst, idxLast);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Decorative helper for rendering inline status indicators matching reference
  const renderPriorityIcon = (priority) => {
    if (priority === 'High') return <TrendingUp className="priority-icon high" />;
    if (priority === 'Low') return <TrendingDown className="priority-icon low" />;
    return <Minus className="priority-icon medium" />;
  };

  return (
    <div className="notifications-component-wrapper">
      
      {/* --- SITE CRUMB TRAIL NAVIGATION --- */}
      <div className="notifications-breadcrumb-zone">
        <h1 className="breadcrumb-title">Notifications</h1>
        <div className="breadcrumb-path">
          <span>🏠</span>
          <span className="separator">&gt;</span>
          <span>Communication</span>
          <span className="separator">&gt;</span>
          <span className="current-node">Notifications</span>
        </div>
      </div>

      {/* --- DASHBOARD TOOLBAR UTILITIES CONTROL BAR --- */}
      <div className="notifications-action-bar">
        <div className="search-input-composite-box">
          <span className="badge-prefix">Notifications</span>
          <Search className="search-lens-icon" />
          <input 
            type="text" 
            placeholder="Search notifications..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="toolbar-action-buttons-group">
          {/* Dynamic contextual delete anchor showing when checked */}
          {selectedIds.length > 0 && (
            <button onClick={handleBulkDelete} className="contextual-bulk-delete-btn animate-fade-in">
              <Trash2 className="btn-icon" />
              <span className="btn-text">Delete Selected ({selectedIds.length})</span>
            </button>
          )}

          <div className="popover-anchor-container">
            <button 
              onClick={() => setShowColumnDropdown(!showColumnDropdown)}
              className={`toolbar-btn ${showColumnDropdown ? 'active' : ''}`}
              title="Show/Hide Columns"
            >
              <SlidersHorizontal className="btn-icon" />
            </button>
            
            {showColumnDropdown && (
              <div className="column-visibility-dropdown">
                <div className="dropdown-header-label">Show/Hide Column</div>
                <div className="dropdown-scroll-body custom-scrollbar">
                  {Object.keys(visibleColumns).map((col) => (
                    <label key={col} className="dropdown-checkbox-row">
                      <input 
                        type="checkbox" 
                        checked={visibleColumns[col]} 
                        onChange={() => setVisibleColumns({...visibleColumns, [col]: !visibleColumns[col]})}
                      />
                      <span className="checkbox-text-label">{col}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button onClick={triggerCreatePopup} className="toolbar-btn btn-success" title="Add New Notification">
            <Plus className="btn-icon" />
          </button>
          <button onClick={handleRefresh} className="toolbar-btn" title="Refresh Feed">
            <RotateCw className="btn-icon" />
          </button>
          <button onClick={handleDownload} className="toolbar-btn btn-download" title="Download Data Schema">
            <Download className="btn-icon" />
          </button>
        </div>
      </div>

      {/* --- DATA RESPONSIVE WORK-GRID MATRIX TABLE --- */}
      <div className="notifications-table-scroll-container custom-scrollbar">
        <table className="notifications-core-table">
          <thead>
            <tr>
              {visibleColumns.checkbox && (
                <th className="th-checkbox">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll} 
                    checked={currentItems.length > 0 && currentItems.every(item => selectedIds.includes(item.id))}
                  />
                </th>
              )}
              {visibleColumns.id && <th className="th-id">ID</th>}
              {visibleColumns.message && <th className="th-message">Message</th>}
              {visibleColumns.type && <th className="th-type">Type</th>}
              {visibleColumns.recipient && <th className="th-recipient">Recipient</th>}
              {visibleColumns.sentDate && <th className="th-date">Sent Date</th>}
              {visibleColumns.status && <th className="th-status">Status</th>}
              {visibleColumns.priority && <th className="th-priority">Priority</th>}
              {visibleColumns.actions && <th className="th-actions">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => triggerEditPopup(item)}
                  className="table-data-row-interactive"
                >
                  {visibleColumns.checkbox && (
                    <td className="td-checkbox" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(item.id)} 
                        onChange={() => handleSelectRow(item.id)}
                      />
                    </td>
                  )}
                  {visibleColumns.id && <td className="td-id">{item.id}</td>}
                  {visibleColumns.message && (
                    <td className="td-message">
                      <div className="message-composite-cell">
                        <img src={item.avatar} alt="User Avatar" className="cell-avatar-frame" />
                        <span className="cell-message-text-truncate">{item.message}</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.type && <td className="td-type text-dimmed">{item.type}</td>}
                  {visibleColumns.recipient && <td className="td-recipient">{item.recipient}</td>}
                  {visibleColumns.sentDate && (
                    <td className="td-date">
                      <div className="inline-icon-label-wrapper">
                        <Calendar className="inline-calendar-icon" />
                        <span>{item.sentDate.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1')}</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td className="td-status">
                      <span className={`status-pill-badge badge-${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                  )}
                  {visibleColumns.priority && (
                    <td className="td-priority">
                      <div className="inline-icon-label-wrapper">
                        {renderPriorityIcon(item.priority)}
                        <span>{item.priority}</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="td-actions" onClick={(e) => e.stopPropagation()}>
                      <div className="action-cell-buttons-flex">
                        <button onClick={(e) => triggerEditPopup(item, e)} className="action-inline-btn edit-trigger" title="Edit Parameter">
                          <Edit3 className="action-row-icon" />
                        </button>
                        <button onClick={() => handleDeleteRow(item.id)} className="action-inline-btn delete-trigger" title="Delete Entry">
                          <Trash2 className="action-row-icon" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="table-empty-fallback-state">
                  No notifications matched the criteria requested.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- PAGINATION SYSTEM NAVIGATION CONTROL BAR --- */}
      <div className="notifications-pagination-navigator">
        <div className="rows-per-page-selector-shell">
          <span className="selector-caption">Items per page:</span>
          <div className="native-select-wrapper">
            <select 
              value={itemsPerPage} 
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <ChevronDown className="select-dropdown-arrow-icon" />
          </div>
        </div>

        <div className="pagination-numeric-indexer-flow">
          <span className="indexer-bounds-display">
            {idxFirst + 1} – {Math.min(idxLast, filteredData.length)} of {filteredData.length}
          </span>
          <div className="indexer-navigation-buttons">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="navigator-step-btn"
            >
              <ChevronLeft className="step-arrow-icon" />
            </button>
            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="navigator-step-btn"
            >
              <ChevronRight className="step-arrow-icon" />
            </button>
          </div>
        </div>
      </div>

      {/* --- ANIMATED DIALOG LAYER SYSTEM (POPUPS) --- */}
      {modalCtx.isOpen && (
        <div className="dialog-backdrop-blur-overlay">
          <div className="dialog-window-container">
            
            <div className="dialog-header-banner">
              <div className="header-identity-composite">
                {modalCtx.type === 'edit' && modalCtx.activeData?.avatar && (
                  <img src={modalCtx.activeData.avatar} alt="User Avatar" className="header-identity-avatar" />
                )}
                <h2>
                  {modalCtx.type === 'create' ? 'New Notification' : 'Edit Notification'}
                </h2>
              </div>
              <button className="dialog-dismiss-cross-btn" onClick={() => setModalCtx({ isOpen: false, type: 'create', activeData: null })}>
                <X className="cross-icon" />
              </button>
            </div>

            <form onSubmit={handleFormSubmission} className="dialog-interactive-form">
              <div className="form-fields-structural-grid">
                
                <div className="form-field-wrapper field-span-full">
                  <div className="fieldset-floating-border-container">
                    <span className="legend-label-fallback">Message *</span>
                    <div className="input-with-end-icon-box">
                      <textarea 
                        required
                        rows="3"
                        value={formData.message} 
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Enter system announcement notification payload body details..."
                      />
                      <MessageSquare className="field-end-block-icon text-muted-decor" />
                    </div>
                  </div>
                </div>

                <div className="form-field-wrapper">
                  <div className="fieldset-floating-border-container">
                    <span className="legend-label-fallback">Type *</span>
                    <div className="input-with-end-icon-box relative-select-box">
                      <select 
                        value={formData.type} 
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                      >
                        <option value="Info">Info</option>
                        <option value="Success">Success</option>
                        <option value="Warning">Warning</option>
                        <option value="Error">Error</option>
                      </select>
                      <ChevronDown className="field-end-block-icon spacing-pointer-override" />
                    </div>
                  </div>
                </div>

                <div className="form-field-wrapper">
                  <div className="fieldset-floating-border-container">
                    <span className="legend-label-fallback">Recipient Group *</span>
                    <div className="input-with-end-icon-box">
                      <input 
                        type="text" 
                        required
                        value={formData.recipient} 
                        onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                        placeholder="e.g. All Staff"
                      />
                      <Users className="field-end-block-icon text-muted-decor" />
                    </div>
                  </div>
                </div>

                <div className="form-field-wrapper">
                  <div className="fieldset-floating-border-container">
                    <span className="legend-label-fallback">Sent Date *</span>
                    <div className="input-with-end-icon-box native-date-picker-carrier">
                      <input 
                        type="date" 
                        required
                        value={formData.sentDate} 
                        onChange={(e) => setFormData({...formData, sentDate: e.target.value})}
                      />
                      <Calendar className="field-end-block-icon text-muted-decor" />
                    </div>
                  </div>
                </div>

                <div className="form-field-wrapper">
                  <div className="fieldset-floating-border-container">
                    <span className="legend-label-fallback">Status *</span>
                    <div className="input-with-end-icon-box relative-select-box">
                      <select 
                        value={formData.status} 
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                      >
                        <option value="Sent">Sent</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                      </select>
                      <ChevronDown className="field-end-block-icon spacing-pointer-override" />
                    </div>
                  </div>
                </div>

                <div className="form-field-wrapper field-span-full">
                  <div className="fieldset-floating-border-container">
                    <span className="legend-label-fallback">Priority *</span>
                    <div className="input-with-end-icon-box relative-select-box">
                      <select 
                        value={formData.priority} 
                        onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                      <ChevronDown className="field-end-block-icon spacing-pointer-override" />
                    </div>
                  </div>
                </div>

              </div>

              <div className="dialog-action-footer-buttons">
                <button type="submit" className="form-action-btn submit-save-trigger">
                  Save
                </button>
                <button 
                  type="button" 
                  onClick={() => setModalCtx({ isOpen: false, type: 'create', activeData: null })}
                  className="form-action-btn dismiss-cancel-trigger"
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

export default Notifications;