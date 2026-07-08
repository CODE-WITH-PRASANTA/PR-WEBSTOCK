import React, { useState } from 'react';
import { 
  Plus, RotateCw, Download, SlidersHorizontal, 
  Edit3, Trash2, Calendar, User, FileText, 
  X, ChevronLeft, ChevronRight 
} from 'lucide-react';
import './Tickets.css'; // Import the custom styling below

const INITIAL_DATA = [
  { id: 1, ticketId: "TI1254", createdBy: "Cara Stevens", subject: "Image not Pro...", status: "Closed", assignedTo: "John Deo", date: "02/25/2020", details: "Lorem Ipsum i..." },
  { id: 2, ticketId: "TI4587", createdBy: "Tim Hank", subject: "Image not Pro...", status: "Closed", assignedTo: "Jens Brincker", date: "02/25/2020", details: "Lorem Ipsum i..." },
  { id: 3, ticketId: "TI025", createdBy: "Tim Hank", subject: "Image not Pro...", status: "Open", assignedTo: "Airi Satou", date: "02/25/2020", details: "Lorem Ipsum i..." },
  { id: 4, ticketId: "TI184", createdBy: "Cara Stevens", subject: "Image not Pro...", status: "Closed", assignedTo: "Angelica Ramos", date: "02/25/2020", details: "Lorem Ipsum i..." },
  { id: 5, ticketId: "TI587", createdBy: "Airi Satou", subject: "Image not Pro...", status: "Open", assignedTo: "John Deo", date: "02/25/2020", details: "Lorem Ipsum i..." },
  { id: 6, ticketId: "TI1007", createdBy: "John Doe", subject: "Image not Pro...", status: "Closed", assignedTo: "Cara Stevens", date: "02/25/2020", details: "Lorem Ipsum i..." },
  { id: 7, ticketId: "TI1357", createdBy: "Angelica Ramos", subject: "Image not Pro...", status: "Open", assignedTo: "Airi Satou", date: "02/25/2020", details: "Lorem Ipsum i..." },
  { id: 8, ticketId: "TI725", createdBy: "Jens Brincker", subject: "Image not Pro...", status: "Open", assignedTo: "Angelica Ramos", date: "02/25/2020", details: "Lorem Ipsum i..." },
  { id: 9, ticketId: "TI378", createdBy: "Cara Stevens", subject: "Image not Pro...", status: "Closed", assignedTo: "Cara Stevens", date: "02/25/2020", details: "Lorem Ipsum i..." },
  { id: 10, ticketId: "TI187", createdBy: "John Doe", subject: "Image not Pro...", status: "Closed", assignedTo: "John Deo", date: "02/25/2020", details: "Lorem Ipsum i..." },
  { id: 11, ticketId: "TI9981", createdBy: "John Doe", subject: "Image not Pro...", status: "Open", assignedTo: "Airi Satou", date: "07/06/2026", details: "Lorem Ipsum i..." }
];

const Tickets = () => {
  // State Management
  const [tickets, setTickets] = useState(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  
  const [formData, setFormData] = useState({
    createdBy: '', subject: '', status: 'Open', assignedTo: '', date: '2026-07-06', details: ''
  });

  // Table Columns Setup
  const [columns, setColumns] = useState({
    checkbox: true, ticketId: true, createdBy: true, subject: true, status: true, assignedTo: true, date: true, details: true, actions: true
  });

  // Pagination Controls
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Search Engine Filter
  const filteredTickets = tickets.filter(ticket => 
    ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.createdBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Computations
  const totalItems = filteredTickets.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredTickets.slice(firstIndex, lastIndex);

  // Checkbox Event Hooks
  const handleSelectAll = (e) => {
    setSelectedRows(e.target.checked ? currentItems.map(item => item.id) : []);
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id]);
  };

  // Feature Mechanics
  const handleRefresh = () => {
    setTickets(INITIAL_DATA);
    setSelectedRows([]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleDownload = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(tickets, null, 2))}`;
    const element = document.createElement('a');
    element.setAttribute("href", jsonString);
    element.setAttribute("download", "tickets_export.json");
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this ticket permanently?")) {
      setTickets(tickets.filter(t => t.id !== id));
      setSelectedRows(selectedRows.filter(rId => rId !== id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedRows.length} items?`)) {
      setTickets(tickets.filter(t => !selectedRows.includes(t.id)));
      setSelectedRows([]);
    }
  };

  const openAddModal = () => {
    setEditingTicket(null);
    setFormData({ createdBy: '', subject: 'Image not Pro...', status: 'Open', assignedTo: '', date: '2026-07-06', details: 'Lorem Ipsum i...' });
    setIsModalOpen(true);
  };

  const openEditModal = (ticket) => {
    setEditingTicket(ticket);
    setFormData(ticket);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingTicket) {
      setTickets(tickets.map(t => t.id === editingTicket.id ? { ...formData } : t));
    } else {
      const newTicket = {
        ...formData,
        id: Date.now(),
        ticketId: `TI${Math.floor(1000 + Math.random() * 9000)}`
      };
      setTickets([newTicket, ...tickets]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="ticket-dashboard">
      {/* Top Navbar Section */}
      <div className="ticket-dashboard__header">
        <h1 className="ticket-dashboard__title">Tickets</h1>
        <div className="ticket-dashboard__breadcrumbs">
          <span className="crumb">Home</span> &gt; <span className="crumb">Client</span> &gt; <span className="crumb active">Tickets</span>
        </div>
      </div>

      {/* Main Panel Box */}
      <div className="ticket-panel">
        {/* Table Management Bar */}
        <div className="ticket-panel__bar">
          <div className="ticket-panel__bar-left">
            <span className="ticket-panel__tab-active">Tickets</span>
            <div className="ticket-panel__search-wrapper">
              <input 
                type="text" 
                placeholder="Search" 
                className="ticket-panel__search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="ticket-panel__bar-right">
            {selectedRows.length > 0 && (
              <button onClick={handleBulkDelete} className="action-btn action-btn--bulk-delete">
                <Trash2 size={15} /> <span>Delete Selected</span>
              </button>
            )}

            <button onClick={() => setShowColumnDropdown(!showColumnDropdown)} className="action-btn" title="Toggle Columns">
              <SlidersHorizontal size={16} />
            </button>

            {/* Column Options Overlay Popover */}
            {showColumnDropdown && (
              <div className="column-dropdown">
                <div className="column-dropdown__title">Show/Hide Column</div>
                <div className="column-dropdown__list">
                  {Object.keys(columns).map((col) => (
                    <label key={col} className="column-dropdown__item">
                      <input 
                        type="checkbox" 
                        checked={columns[col]} 
                        onChange={(e) => setColumns({...columns, [col]: e.target.checked})}
                      />
                      <span className="column-dropdown__label-text">{col}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button onClick={openAddModal} className="action-btn action-btn--add" title="Add Ticket"><Plus size={18} /></button>
            <button onClick={handleRefresh} className="action-btn" title="Refresh Panel"><RotateCw size={16} /></button>
            <button onClick={handleDownload} className="action-btn action-btn--download" title="Export File"><Download size={16} /></button>
          </div>
        </div>

        {/* Scalable Viewport Table Grid */}
        <div className="ticket-table-container">
          <table className="ticket-table">
            <thead>
              <tr className="ticket-table__header-row">
                {columns.checkbox && (
                  <th className="ticket-table__cell ticket-table__cell--checkbox">
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll}
                      checked={currentItems.length > 0 && selectedRows.length === currentItems.length}
                    />
                  </th>
                )}
                {columns.ticketId && <th className="ticket-table__cell">Ticket ID</th>}
                {columns.createdBy && <th className="ticket-table__cell">Created By</th>}
                {columns.subject && <th className="ticket-table__cell">Subject</th>}
                {columns.status && <th className="ticket-table__cell">Status</th>}
                {columns.assignedTo && <th className="ticket-table__cell">Assigned To</th>}
                {columns.date && <th className="ticket-table__cell">Date</th>}
                {columns.details && <th className="ticket-table__cell">Details</th>}
                {columns.actions && <th className="ticket-table__cell ticket-table__cell--actions">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="9" className="ticket-table__empty-state">No listings discovered match the filter.</td>
                </tr>
              ) : (
                currentItems.map((ticket) => (
                  <tr key={ticket.id} className="ticket-table__row">
                    {columns.checkbox && (
                      <td className="ticket-table__cell">
                        <input 
                          type="checkbox" 
                          checked={selectedRows.includes(ticket.id)}
                          onChange={() => handleSelectRow(ticket.id)}
                        />
                      </td>
                    )}
                    {columns.ticketId && <td className="ticket-table__cell ticket-table__cell--id">{ticket.ticketId}</td>}
                    {columns.createdBy && <td className="ticket-table__cell">{ticket.createdBy}</td>}
                    {columns.subject && <td className="ticket-table__cell ticket-table__cell--truncate">{ticket.subject}</td>}
                    {columns.status && (
                      <td className="ticket-table__cell">
                        <span className={`status-pill status-pill--${ticket.status.toLowerCase()}`}>
                          {ticket.status}
                        </span>
                      </td>
                    )}
                    {columns.assignedTo && <td className="ticket-table__cell">{ticket.assignedTo}</td>}
                    {columns.date && (
                      <td className="ticket-table__cell ticket-table__cell--date">
                        <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle', color: '#b9a187' }} />
                        {ticket.date}
                      </td>
                    )}
                    {columns.details && <td className="ticket-table__cell ticket-table__cell--truncate text-muted">{ticket.details}</td>}
                    {columns.actions && (
                      <td className="ticket-table__cell ticket-table__cell--actions">
                        <div className="action-row-buttons">
                          <button onClick={() => openEditModal(ticket)} className="row-action-btn row-action-btn--edit"><Edit3 size={15} /></button>
                          <button onClick={() => handleDelete(ticket.id)} className="row-action-btn row-action-btn--delete"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Index Bottom Navigation */}
        <div className="pagination-footer">
          <div className="pagination-footer__per-page">
            <span>Items per page:</span>
            <select 
              value={itemsPerPage} 
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="pagination-footer__select"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>

          <div className="pagination-footer__nav">
            <span>
              {totalItems === 0 ? 0 : firstIndex + 1} – {Math.min(lastIndex, totalItems)} of {totalItems}
            </span>
            <div className="pagination-footer__arrows">
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="pager-arrow-btn">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className="pager-arrow-btn">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Overlay Smooth Dialog Layout */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-window">
            <div className="modal-window__header">
              <span className="modal-window__title">{editingTicket ? 'Edit Ticket' : 'New Ticket'}</span>
              <button onClick={() => setIsModalOpen(false)} className="modal-window__close-btn"><X size={18} /></button>
            </div>

            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="modal-form__grid">
                
                <div className="modal-form__group">
                  <label className="modal-form__label">Created By*</label>
                  <div className="modal-form__input-container">
                    <input type="text" required value={formData.createdBy} onChange={(e) => setFormData({...formData, createdBy: e.target.value})} className="modal-form__input" />
                    <User size={16} className="modal-form__icon" />
                  </div>
                </div>

                <div className="modal-form__group">
                  <label className="modal-form__label">Subject*</label>
                  <div className="modal-form__input-container">
                    <input type="text" required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="modal-form__input" />
                    <FileText size={16} className="modal-form__icon" />
                  </div>
                </div>

                <div className="modal-form__group">
                  <label className="modal-form__label">Status*</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="modal-form__select">
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="modal-form__group">
                  <label className="modal-form__label">Assign To*</label>
                  <div className="modal-form__input-container">
                    <input type="text" required value={formData.assignedTo} onChange={(e) => setFormData({...formData, assignedTo: e.target.value})} className="modal-form__input" />
                    <User size={16} className="modal-form__icon" />
                  </div>
                </div>

                <div className="modal-form__group">
                  <label className="modal-form__label">Date*</label>
                  <div className="modal-form__input-container">
                    <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="modal-form__input" />
                    <Calendar size={16} className="modal-form__icon" />
                  </div>
                </div>
              </div>

              <div className="modal-form__group text-area-group">
                <label className="modal-form__label">details</label>
                <textarea rows="4" value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} className="modal-form__textarea"></textarea>
              </div>

              <div className="modal-form__actions">
                <button 
                  type="submit" 
                  className={`modal-form__btn modal-form__btn--save ${(!formData.createdBy || !formData.subject) ? 'disabled' : ''}`}
                  disabled={!formData.createdBy || !formData.subject}
                >
                  Save
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="modal-form__btn modal-form__btn--cancel">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;