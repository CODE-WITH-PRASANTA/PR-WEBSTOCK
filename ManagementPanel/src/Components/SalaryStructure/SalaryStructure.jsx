import React, { useState } from 'react';
import './SalaryStructure.css';

// Mock data matching the UI layout
const initialData = [
  { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1', basic: 50000, hra: 25000, conveyance: 2000, medical: 1500, pf: 6000, gross: 82500, ctc: 990000 },
  { id: 2, name: 'Sarah Smith', avatar: 'https://i.pravatar.cc/150?img=5', basic: 60000, hra: 30000, conveyance: 2000, medical: 1500, pf: 7200, gross: 101300, ctc: 1215600 },
  { id: 3, name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=3', basic: 40000, hra: 20000, conveyance: 2000, medical: 1500, pf: 4800, gross: 63700, ctc: 764400 },
  { id: 4, name: 'Emily Davis', avatar: 'https://i.pravatar.cc/150?img=9', basic: 70000, hra: 35000, conveyance: 2000, medical: 1500, pf: 8400, gross: 120100, ctc: 1441200 },
  { id: 5, name: 'David Wilson', avatar: 'https://i.pravatar.cc/150?img=8', basic: 45000, hra: 22500, conveyance: 2000, medical: 1500, pf: 5400, gross: 73600, ctc: 883200 },
  { id: 6, name: 'Jessica Brown', avatar: 'https://i.pravatar.cc/150?img=10', basic: 55000, hra: 27500, conveyance: 2000, medical: 1500, pf: 6600, gross: 91400, ctc: 1096800 },
  { id: 7, name: 'Daniel Taylor', avatar: 'https://i.pravatar.cc/150?img=11', basic: 48000, hra: 24000, conveyance: 2000, medical: 1500, pf: 5760, gross: 78740, ctc: 944800 },
  { id: 8, name: 'Laura Miller', avatar: 'https://i.pravatar.cc/150?img=12', basic: 52000, hra: 26000, conveyance: 2000, medical: 1500, pf: 6240, gross: 86260, ctc: 1035120 },
  { id: 9, name: 'Kevin Anderson', avatar: 'https://i.pravatar.cc/150?img=13', basic: 65000, hra: 32500, conveyance: 2000, medical: 1500, pf: 7800, gross: 111200, ctc: 1334400 },
  { id: 10, name: 'Emma Thomas', avatar: 'https://i.pravatar.cc/150?img=16', basic: 42000, hra: 21000, conveyance: 2000, medical: 1500, pf: 5040, gross: 67460, ctc: 809520 },
  { id: 11, name: 'James White', avatar: 'https://i.pravatar.cc/150?img=14', basic: 46000, hra: 23000, conveyance: 2000, medical: 1500, pf: 5520, gross: 72480, ctc: 869760 },
  { id: 12, name: 'Olivia Harris', avatar: 'https://i.pravatar.cc/150?img=19', basic: 58000, hra: 29000, conveyance: 2000, medical: 1500, pf: 6960, gross: 90460, ctc: 1085520 },
];

const SalaryStructure = () => {
  // Operational Data State
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Menu visibility triggers
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  // Modal Dynamic Form Inputs State
  const [formData, setFormData] = useState({
    name: '', basic: 0, hra: 0, conveyance: 0, medical: 0, special: 0, pf: 0, gross: 0, ctc: 0
  });

  // Table Column Visibility State 
  const [columns, setColumns] = useState({
    checkbox: true, id: false, name: true, basic: true, hra: true, conveyance: true, medical: true, pf: true, gross: true, ctc: true, actions: true
  });

  // Checkbox row tracking logic
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

  // Live filter computation
  const filteredData = data.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination processing
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const currentItemIds = currentItems.map(item => item.id);

  // Download logic (Standard CSV conversion)
  const handleDownloadCSV = () => {
    const headers = ['Employee Name', 'Basic Salary', 'HRA', 'Conveyance', 'Medical', 'PF', 'Gross Salary', 'CTC\n'];
    const rows = data.map(emp => [emp.name, emp.basic, emp.hra, emp.conveyance, emp.medical, emp.pf, emp.gross, emp.ctc]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "salary_structure.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Inline Delete Trigger
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setData(data.filter(emp => emp.id !== id));
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  // Refresh Icon trigger function for Bulk Checked Delete
  const handleRefreshDelete = () => {
    if (selectedRows.length === 0) {
      alert("Please check rows using checkboxes first to delete records via refresh action.");
      return;
    }
    if (window.confirm(`Are you sure you want to bulk-delete the ${selectedRows.length} selected records?`)) {
      setData(data.filter(emp => !selectedRows.includes(emp.id)));
      setSelectedRows([]);
    }
  };

  // Open creation or edit form structures
  const openFormModal = (employee = null) => {
    if (employee) {
      setEditEmployee(employee);
      setFormData({
        name: employee.name, basic: employee.basic, hra: employee.hra, conveyance: employee.conveyance,
        medical: employee.medical, special: employee.special || 0, pf: employee.pf, gross: employee.gross, ctc: employee.ctc
      });
    } else {
      setEditEmployee(null);
      setFormData({ name: '', basic: 0, hra: 0, conveyance: 0, medical: 0, special: 0, pf: 0, gross: 0, ctc: 0 });
    }
    setIsModalOpen(true);
  };

  // Live data formulation triggers within form fields
  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    const val = name === 'name' ? value : Number(value);

    setFormData(prev => {
      const updated = { ...prev, [name]: val };
      if (name !== 'name') {
        const basic = updated.basic || 0;
        const hra = updated.hra || 0;
        const conveyance = updated.conveyance || 0;
        const medical = updated.medical || 0;
        const special = updated.special || 0;
        const pf = updated.pf || 0;

        updated.gross = basic + hra + conveyance + medical + special;
        updated.ctc = (updated.gross + pf) * 12;
      }
      return updated;
    });
  };

  // Form submission intercept logic
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editEmployee) {
      setData(data.map(emp => emp.id === editEmployee.id ? { ...emp, ...formData } : emp));
    } else {
      const newEmployee = { id: Date.now(), avatar: 'https://i.pravatar.cc/150?img=68', ...formData };
      setData([newEmployee, ...data]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="salary-container">
      {/* Breadcrumb Header Row */}
      <div className="salary-breadcrumb-wrapper">
        <h2 className="salary-title">Salary Structure</h2>
        <div className="salary-breadcrumb">
          <span>🏠</span> <span className="breadcrumb-separator">›</span>
          <span>Payroll</span> <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-active">Salary Structure</span>
        </div>
      </div>

      {/* Primary Container Block */}
      <div className="salary-card">
        {/* Table Toolbar Action Layer */}
        <div className="salary-toolbar">
          <div className="salary-search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" placeholder="Search" value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          
          <div className="salary-action-buttons">
            {/* Show/Hide 3-Dots Dropdown Trigger */}
            <div className="dropdown-wrapper">
              <button className="icon-btn" onClick={() => setShowColumnDropdown(!showColumnDropdown)} title="Show/Hide Columns">
                🎛️
              </button>
              {showColumnDropdown && (
                <div className="column-dropdown">
                  <div className="dropdown-title">Show/Hide Column</div>
                  <hr />
                  {Object.keys(columns).map((key) => (
                    <label key={key} className="dropdown-item">
                      <input 
                        type="checkbox" checked={columns[key]} 
                        onChange={() => setColumns({ ...columns, [key]: !columns[key] })}
                      />
                      <span className="capitalize">{key === 'name' ? 'Employee Name' : key.toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Creation Trigger Plus button */}
            <button className="icon-btn btn-add" onClick={() => openFormModal(null)} title="Add Salary Structure">➕</button>
            {/* Refresh Bulk Deletion Mechanism Trigger */}
            <button className="icon-btn btn-refresh" onClick={handleRefreshDelete} title="Bulk Delete Checked Items">🔄</button>
            {/* CSV Data Downloader Action Trigger */}
            <button className="icon-btn btn-download" onClick={handleDownloadCSV} title="Download CSV File">📥</button>
          </div>
        </div>

        {/* Data View Section Grid Table */}
        <div className="table-responsive-container">
          <table className="salary-table">
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
                {columns.basic && <th>Basic Salary</th>}
                {columns.hra && <th>HRA</th>}
                {columns.conveyance && <th>Conveyance</th>}
                {columns.medical && <th>Medical</th>}
                {columns.pf && <th>PF</th>}
                {columns.gross && <th>Gross Salary</th>}
                {columns.ctc && <th>CTC</th>}
                {columns.actions && <th className="text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((emp) => (
                  <tr key={emp.id} className={selectedRows.includes(emp.id) ? 'selected-row' : ''}>
                    {columns.checkbox && (
                      <td>
                        <input type="checkbox" checked={selectedRows.includes(emp.id)} onChange={() => handleSelectRow(emp.id)} />
                      </td>
                    )}
                    {columns.id && <td>{emp.id}</td>}
                    {columns.name && (
                      <td>
                        <div className="employee-profile-cell">
                          <img src={emp.avatar} alt={emp.name} className="employee-avatar" />
                          <span className="employee-name">{emp.name}</span>
                        </div>
                      </td>
                    )}
                    {columns.basic && <td>{emp.basic}</td>}
                    {columns.hra && <td>{emp.hra}</td>}
                    {columns.conveyance && <td>{emp.conveyance}</td>}
                    {columns.medical && <td>{emp.medical}</td>}
                    {columns.pf && <td>{emp.pf}</td>}
                    {columns.gross && <td>{emp.gross}</td>}
                    {columns.ctc && <td>{emp.ctc}</td>}
                    {columns.actions && (
                      <td className="text-center actions-cell">
                        <button className="action-btn-edit" onClick={() => openFormModal(emp)}>📝</button>
                        <button className="action-btn-delete" onClick={() => handleDelete(emp.id)}>🗑️</button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center no-data">No matching entries recorded</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Area Pagination Control Block */}
        <div className="salary-pagination-footer">
          <div className="pagination-per-page">
            <span>Items per page:</span>
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
          
          <div className="pagination-info-controls">
            <span className="pagination-counter">
              {totalItems === 0 ? 0 : indexOfFirstItem + 1} – {Math.min(indexOfLastItem, totalItems)} of {totalItems}
            </span>
            <div className="pagination-nav-arrows">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="nav-arrow-btn">‹</button>
              <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)} className="nav-arrow-btn">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Dialog Modal Overlay View */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content-card">
            <div className="modal-header-bar">
              <div className="modal-header-profile">
                <span className="modal-profile-avatar">👩‍💼</span>
                <h3 className="modal-title">{editEmployee ? 'Edit Salary Structure' : 'New Salary Structure'}</h3>
              </div>
              <button className="modal-close-cross" onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleFormSubmit} className="modal-form-body">
              <div className="form-row full-width">
                <div className="input-group-field">
                  <label>Employee Name*</label>
                  <div className="input-with-icon">
                    <input type="text" name="name" value={formData.name} onChange={handleFormInputChange} required />
                    <span className="input-inline-icon">👦🏽</span>
                  </div>
                </div>
              </div>

              <div className="form-row split-two">
                <div className="input-group-field">
                  <label>Basic Salary*</label>
                  <div className="input-with-icon">
                    <input type="number" name="basic" value={formData.basic} onChange={handleFormInputChange} />
                    <span className="input-inline-icon">$</span>
                  </div>
                </div>
                <div className="input-group-field">
                  <label>HRA*</label>
                  <div className="input-with-icon">
                    <input type="number" name="hra" value={formData.hra} onChange={handleFormInputChange} />
                    <span className="input-inline-icon">🏠</span>
                  </div>
                </div>
              </div>

              <div className="form-row split-two">
                <div className="input-group-field">
                  <label>Conveyance*</label>
                  <div className="input-with-icon">
                    <input type="number" name="conveyance" value={formData.conveyance} onChange={handleFormInputChange} />
                    <span className="input-inline-icon">🚗</span>
                  </div>
                </div>
                <div className="input-group-field">
                  <label>Medical Allowance*</label>
                  <div className="input-with-icon">
                    <input type="number" name="medical" value={formData.medical} onChange={handleFormInputChange} />
                    <span className="input-inline-icon">➕</span>
                  </div>
                </div>
              </div>

              <div className="form-row split-two">
                <div className="input-group-field">
                  <label>Special Allowance*</label>
                  <div className="input-with-icon">
                    <input type="number" name="special" value={formData.special} onChange={handleFormInputChange} />
                    <span className="input-inline-icon">⭐</span>
                  </div>
                </div>
                <div className="input-group-field">
                  <label>Provident Fund*</label>
                  <div className="input-with-icon">
                    <input type="number" name="pf" value={formData.pf} onChange={handleFormInputChange} />
                    <span className="input-inline-icon">🏛️</span>
                  </div>
                </div>
              </div>

              <div className="form-row split-two">
                <div className="input-group-field explicit-disabled">
                  <label>Gross Salary</label>
                  <div className="input-with-icon">
                    <input type="number" name="gross" value={formData.gross} readOnly />
                    <span className="input-inline-icon">💲</span>
                  </div>
                </div>
                <div className="input-group-field explicit-disabled">
                  <label>CTC</label>
                  <div className="input-with-icon">
                    <input type="number" name="ctc" value={formData.ctc} readOnly />
                    <span className="input-inline-icon">💵</span>
                  </div>
                </div>
              </div>

              <div className="modal-footer-actions">
                <button type="submit" className="btn-action-save">Save</button>
                <button type="button" className="btn-action-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryStructure;