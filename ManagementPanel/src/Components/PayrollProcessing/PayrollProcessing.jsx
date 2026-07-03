import React, { useState } from 'react';
import './PayrollProcessing.css';

// Mock initial database matching image_db9fc4.png
const initialPayrollData = [
  { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1', payPeriod: 'October 2023', workDays: 31, lop: 0, netPayable: 82500, status: 'Completed' },
  { id: 2, name: 'Sarah Smith', avatar: 'https://i.pravatar.cc/150?img=5', payPeriod: 'October 2023', workDays: 30, lop: 1, netPayable: 98000, status: 'Pending' },
  { id: 3, name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=3', payPeriod: 'October 2023', workDays: 31, lop: 0, netPayable: 63700, status: 'Completed' },
  { id: 4, name: 'Emily Davis', avatar: 'https://i.pravatar.cc/150?img=9', payPeriod: 'October 2023', workDays: 28, lop: 3, netPayable: 110000, status: 'Processing' },
  { id: 5, name: 'David Wilson', avatar: 'https://i.pravatar.cc/150?img=8', payPeriod: 'October 2023', workDays: 31, lop: 0, netPayable: 73600, status: 'Completed' },
  { id: 6, name: 'Jessica Brown', avatar: 'https://i.pravatar.cc/150?img=10', payPeriod: 'October 2023', workDays: 31, lop: 0, netPayable: 91400, status: 'Pending' },
  { id: 7, name: 'Daniel Taylor', avatar: 'https://i.pravatar.cc/150?img=11', payPeriod: 'October 2023', workDays: 29, lop: 2, netPayable: 72000, status: 'Completed' },
  { id: 8, name: 'Laura Miller', avatar: 'https://i.pravatar.cc/150?img=12', payPeriod: 'October 2023', workDays: 31, lop: 0, netPayable: 86260, status: 'Completed' },
  { id: 9, name: 'Kevin Anderson', avatar: 'https://i.pravatar.cc/150?img=13', payPeriod: 'October 2023', workDays: 31, lop: 0, netPayable: 111200, status: 'Processing' },
  { id: 10, name: 'Emma Thomas', avatar: 'https://i.pravatar.cc/150?img=16', payPeriod: 'October 2023', workDays: 30, lop: 1, netPayable: 65000, status: 'Pending' },
  { id: 11, name: 'James White', avatar: 'https://i.pravatar.cc/150?img=14', payPeriod: 'October 2023', workDays: 30, lop: 0, netPayable: 75000, status: 'Completed' },
];

const PayrollProcessing = () => {
  // State variables
  const [data, setData] = useState(initialPayrollData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Toggles and Modals state
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '', payPeriod: '', workDays: 0, lop: 0, netPayable: 0, status: 'Pending'
  });

  // Table dynamic columns state (matching image_dba28b.png)
  const [columns, setColumns] = useState({
    checkbox: true,
    id: false,
    name: true,
    payPeriod: true,
    workDays: true,
    lop: true,
    netPayable: true,
    status: true,
    actions: true
  });

  // Row selection handler logic
  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = (visibleIds) => {
    const allSelected = visibleIds.every(id => selectedRows.includes(id));
    if (allSelected) {
      setSelectedRows(selectedRows.filter(id => !visibleIds.includes(id)));
    } else {
      setSelectedRows(Array.from(new Set([...selectedRows, ...visibleIds])));
    }
  };

  // Live text searching computation
  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculation slices
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const currentItemIds = currentItems.map(item => item.id);

  // CSV Data Downloader Action Trigger
  const handleDownloadCSV = () => {
    const headers = ['Employee Name', 'Pay Period', 'Work Days', 'LOP', 'Net Payable', 'Status\n'];
    const rows = data.map(item => [item.name, item.payPeriod, item.workDays, item.lop, item.netPayable, item.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "payroll_processing_records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Single Row Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this payroll record?")) {
      setData(data.filter(item => item.id !== id));
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  // Refresh Trigger Action for Bulk Selection Deletion
  const handleRefreshDelete = () => {
    if (selectedRows.length === 0) {
      alert("No rows are selected! Please select checkboxes first to use the dynamic deletion refresh task.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete the ${selectedRows.length} selected items?`)) {
      setData(data.filter(item => !selectedRows.includes(item.id)));
      setSelectedRows([]);
    }
  };

  // Modal setup toggle
  const openFormModal = (record = null) => {
    if (record) {
      setEditRecord(record);
      setFormData({
        name: record.name, payPeriod: record.payPeriod, workDays: record.workDays,
        lop: record.lop, netPayable: record.netPayable, status: record.status
      });
    } else {
      setEditRecord(null);
      setFormData({ name: '', payPeriod: 'October 2023', workDays: 0, lop: 0, netPayable: 0, status: 'Pending' });
    }
    setIsModalOpen(true);
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'payPeriod' || name === 'status' ? value : Number(value)
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editRecord) {
      setData(data.map(item => item.id === editRecord.id ? { ...item, ...formData } : item));
    } else {
      const newRecord = { id: Date.now(), avatar: 'https://i.pravatar.cc/150?img=68', ...formData };
      setData([newRecord, ...data]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="payroll-container">
      {/* Breadcrumb Section matching UI layout */}
      <div className="payroll-breadcrumb-wrapper">
        <h2 className="payroll-title">Payroll Processing</h2>
        <div className="payroll-breadcrumb">
          <span>🏠</span> <span className="breadcrumb-separator">›</span>
          <span>Payroll</span> <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-active">Payroll Processing</span>
        </div>
      </div>

      {/* Main Content Dashboard Layout Grid Wrapper */}
      <div className="payroll-card">
        {/* Main Header Action Toolbar */}
        <div className="payroll-toolbar">
          <div className="payroll-search-box">
            <span className="payroll-search-icon">🔍</span>
            <input 
              type="text" placeholder="Search" value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          
          <div className="payroll-action-buttons">
            {/* Show/Hide 3-Dots Filter Dropdown Configuration */}
            <div className="payroll-dropdown-wrapper">
              <button className="payroll-icon-btn" onClick={() => setShowColumnDropdown(!showColumnDropdown)} title="Show/Hide Columns">
                🎛️
              </button>
              {showColumnDropdown && (
                <div className="payroll-column-dropdown">
                  <div className="payroll-dropdown-title">Show/Hide Column</div>
                  <hr />
                  {Object.keys(columns).map((key) => (
                    <label key={key} className="payroll-dropdown-item">
                      <input 
                        type="checkbox" checked={columns[key]} 
                        onChange={() => setColumns({ ...columns, [key]: !columns[key] })}
                      />
                      <span className="payroll-capitalize">
                        {key === 'name' ? 'Employee Name' : key === 'payPeriod' ? 'Pay Period' : key === 'workDays' ? 'Work Days' : key === 'lop' ? 'LOP' : key === 'netPayable' ? 'Net Payable' : key}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Form instantiation triggers */}
            <button className="payroll-icon-btn payroll-btn-add" onClick={() => openFormModal(null)} title="Add Payroll Record">➕</button>
            <button className="payroll-icon-btn payroll-btn-refresh" onClick={handleRefreshDelete} title="Bulk Delete Selection">🔄</button>
            <button className="payroll-icon-btn payroll-btn-download" onClick={handleDownloadCSV} title="Download CSV Export">📥</button>
          </div>
        </div>

        {/* Scalable and Responsive Data Matrix Table Grid Area */}
        <div className="payroll-table-responsive">
          <table className="payroll-table">
            <thead>
              <tr>
                {columns.checkbox && (
                  <th width="40px">
                    <input 
                      type="checkbox"
                      checked={currentItemIds.length > 0 && currentItemIds.every(id => selectedRows.includes(id))}
                      onChange={() => handleSelectAll(currentItemIds)}
                    />
                  </th>
                )}
                {columns.id && <th>ID</th>}
                {columns.name && <th>Employee Name</th>}
                {columns.payPeriod && <th>Pay Period</th>}
                {columns.workDays && <th>Work Days</th>}
                {columns.lop && <th>LOP</th>}
                {columns.netPayable && <th>Net Payable</th>}
                {columns.status && <th>Status</th>}
                {columns.actions && <th className="payroll-text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item.id} className={selectedRows.includes(item.id) ? 'payroll-selected-row' : ''}>
                    {columns.checkbox && (
                      <td>
                        <input type="checkbox" checked={selectedRows.includes(item.id)} onChange={() => handleSelectRow(item.id)} />
                      </td>
                    )}
                    {columns.id && <td>{item.id}</td>}
                    {columns.name && (
                      <td>
                        <div className="payroll-profile-cell">
                          <img src={item.avatar} alt={item.name} className="payroll-avatar" />
                          <span className="payroll-emp-name">{item.name}</span>
                        </div>
                      </td>
                    )}
                    {columns.payPeriod && <td>{item.payPeriod}</td>}
                    {columns.workDays && <td>{item.workDays}</td>}
                    {columns.lop && <td>{item.lop}</td>}
                    {columns.netPayable && <td>{item.netPayable}</td>}
                    {columns.status && (
                      <td>
                        <span className={`payroll-status-badge badge-${item.status.toLowerCase()}`}>
                          {item.status}
                        </span>
                      </td>
                    )}
                    {columns.actions && (
                      <td className="payroll-text-center payroll-actions-cell">
                        <button className="payroll-action-edit" onClick={() => openFormModal(item)}>📝</button>
                        <button className="payroll-action-delete" onClick={() => handleDelete(item.id)}>🗑️</button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="payroll-text-center payroll-no-data">No payroll items found matching query</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="payroll-pagination-footer">
          <div className="payroll-per-page-container">
            <span>Items per page:</span>
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
          
          <div className="payroll-info-controls">
            <span className="payroll-counter">
              {totalItems === 0 ? 0 : indexOfFirstItem + 1} – {Math.min(indexOfLastItem, totalItems)} of {totalItems}
            </span>
            <div className="payroll-nav-arrows">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="payroll-arrow-btn">‹</button>
              <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)} className="payroll-arrow-btn">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* PopUp Window Form Modal Overlay Block */}
      {isModalOpen && (
        <div className="payroll-modal-overlay">
          <div className="payroll-modal-card">
            <div className="payroll-modal-header">
              <div className="payroll-modal-profile">
                <span className="payroll-modal-avatar-placeholder">👩‍💼</span>
                <h3 className="payroll-modal-title">{editRecord ? 'Edit Payroll Record' : 'New Payroll Record'}</h3>
              </div>
              <button className="payroll-modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleFormSubmit} className="payroll-modal-form">
              <div className="payroll-form-row payroll-split-two">
                <div className="payroll-input-group">
                  <label>Employee Name*</label>
                  <div className="payroll-input-wrapper">
                    <input type="text" name="name" value={formData.name} onChange={handleFormInputChange} required />
                    <span className="payroll-input-icon">👦🏽</span>
                  </div>
                </div>
                <div className="payroll-input-group">
                  <label>Pay Period*</label>
                  <div className="payroll-input-wrapper">
                    <input type="text" name="payPeriod" value={formData.payPeriod} onChange={handleFormInputChange} required />
                    <span className="payroll-input-icon">📅</span>
                  </div>
                </div>
              </div>

              <div className="payroll-form-row payroll-split-two">
                <div className="payroll-input-group">
                  <label>Work Days*</label>
                  <div className="payroll-input-wrapper">
                    <input type="number" name="workDays" value={formData.workDays} onChange={handleFormInputChange} />
                    <span className="payroll-input-icon">💼</span>
                  </div>
                </div>
                <div className="payroll-input-group">
                  <label>Loss of Pay Days*</label>
                  <div className="payroll-input-wrapper">
                    <input type="number" name="lop" value={formData.lop} onChange={handleFormInputChange} />
                    <span className="payroll-input-icon">➖</span>
                  </div>
                </div>
              </div>

              <div className="payroll-form-row payroll-split-two">
                <div className="payroll-input-group">
                  <label>Net Payable*</label>
                  <div className="payroll-input-wrapper">
                    <input type="number" name="netPayable" value={formData.netPayable} onChange={handleFormInputChange} />
                    <span className="payroll-input-icon">$</span>
                  </div>
                </div>
                <div className="payroll-input-group">
                  <label>Status*</label>
                  <div className="payroll-input-wrapper">
                    <select name="status" value={formData.status} onChange={handleFormInputChange} className="payroll-select-input">
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="payroll-modal-footer">
                <button type="submit" className="payroll-btn-save">Save</button>
                <button type="button" className="payroll-btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollProcessing;