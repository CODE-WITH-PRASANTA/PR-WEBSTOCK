import React, { useState, useMemo } from 'react';

// शुरुआती डमी डेटा (image_b4af3c.png के आधार पर)
const INITIAL_DATA = [
  { id: 1, trainingType: 'Leadership Development', category: 'Soft Skills', duration: '5 days', deliveryMethod: 'In-person', targetAudience: 'Managers', status: 'Active', isMandatory: 'No', cost: '500', certification: 'Yes', description: 'Management training' },
  { id: 2, trainingType: 'Technical Skills Training', category: 'Technical', duration: '3 days', deliveryMethod: 'Online', targetAudience: 'IT Department', status: 'Active', isMandatory: 'Yes', cost: '300', certification: 'No', description: 'Tech training' },
  { id: 3, trainingType: 'Onboarding', category: 'Compliance', duration: '2 days', deliveryMethod: 'In-person', targetAudience: 'New Employees', status: 'Active', isMandatory: 'Yes', cost: '0', certification: 'No', description: 'HR onboarding' },
  { id: 4, trainingType: 'Sales Training', category: 'Sales', duration: '4 days', deliveryMethod: 'In-person', targetAudience: 'Sales Team', status: 'Active', isMandatory: 'No', cost: '450', certification: 'Yes', description: 'Sales pitch training' },
  { id: 5, trainingType: 'Communication Skills', category: 'Soft Skills', duration: '3 days', deliveryMethod: 'Hybrid', targetAudience: 'All Employees', status: 'Active', isMandatory: 'No', cost: '200', certification: 'No', description: 'Effective speaking' },
  { id: 6, trainingType: 'Conflict Management', category: 'Soft Skills', duration: '1 day', deliveryMethod: 'In-person', targetAudience: 'All Employees', status: 'Inactive', isMandatory: 'No', cost: '150', certification: 'No', description: 'Resolving disputes' },
  { id: 7, trainingType: 'Project Management', category: 'Management', duration: '5 days', deliveryMethod: 'Online', targetAudience: 'Project Managers', status: 'Active', isMandatory: 'No', cost: '350', certification: 'Yes', description: 'Agile methodologies' },
  { id: 8, trainingType: 'Customer Service Excellence', category: 'Customer Service', duration: '2 days', deliveryMethod: 'In-person', targetAudience: 'Customer Support', status: 'Active', isMandatory: 'No', cost: '400', certification: 'Yes', description: 'Client interaction' },
  { id: 9, trainingType: 'Time Management', category: 'Soft Skills', duration: '1 day', deliveryMethod: 'Hybrid', targetAudience: 'All Employees', status: 'Active', isMandatory: 'No', cost: '200', certification: 'No', description: 'Efficiency skills' },
  { id: 10, trainingType: 'Data Security Training', category: 'Compliance', duration: '2 days', deliveryMethod: 'Online', targetAudience: 'IT and Security', status: 'Active', isMandatory: 'Yes', cost: '0', certification: 'Yes', description: 'Cybersecurity basics' },
];

const TrainingType = () => {
  // स्टेट्स मैनेजमेंट
  const [data, setData] = useState(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [showHideOpen, setShowHideOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' या 'edit'
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // कॉलम दिखाने/छुपाने की स्टेट (image_b4af63.png के आधार पर)
  const [columns, setColumns] = useState({
    checkbox: true,
    trainingTypeId: false,
    trainingType: true,
    category: true,
    duration: true,
    deliveryMethod: true,
    targetAudience: true,
    status: true,
    isMandatory: true,
    cost: true,
    certification: true,
    actions: true
  });

  // फॉर्म डेटा की स्टेट
  const [formData, setFormData] = useState({
    id: '',
    trainingType: '',
    category: 'Soft Skills',
    duration: 'Not Specified',
    deliveryMethod: 'Online',
    targetAudience: 'All',
    status: 'Active',
    isMandatory: 'No',
    cost: '0',
    certification: 'No',
    description: ''
  });

  // पेजिनेशन स्टेट
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // सर्च फ़िल्टर
  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.trainingType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  // पेजिनेटेड डेटा गणना
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

  // हैंडलर फ़ंक्शंस
  const handleRefresh = () => {
    setSearchQuery('');
    setData(INITIAL_DATA);
    setCurrentPage(1);
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "training_types.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const openAddForm = () => {
    setFormMode('add');
    setFormData({
      id: Math.floor(100 + Math.random() * 900), // रैंडम ID जेनरेशन
      trainingType: '',
      category: 'Soft Skills',
      duration: 'Not Specified',
      deliveryMethod: 'Online',
      targetAudience: 'All',
      status: 'Active',
      isMandatory: 'No',
      cost: '0',
      certification: 'No',
      description: ''
    });
    setFormOpen(true);
  };

  const openEditForm = (item) => {
    setFormMode('edit');
    setFormData({ ...item });
    setFormOpen(true);
  };

  const handleFormSave = (e) => {
    e.preventDefault();
    if (formMode === 'add') {
      setData([formData, ...data]);
    } else {
      setData(data.map(item => item.id === formData.id ? formData : item));
    }
    setFormOpen(false);
  };

  const openDeleteModal = (item) => {
    setSelectedRecord(item);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setData(data.filter(item => item.id !== selectedRecord.id));
    setDeleteModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <div style={styles.container}>
      {/* ऊपरी ब्रेडक्रंब हेडर */}
      <div style={styles.breadcrumbHeader}>
        <h2 style={styles.mainTitle}>Training Types</h2>
        <div style={styles.breadcrumbLinks}>
          <span style={{ fontSize: '14px' }}>🏠 &gt; Training &gt; <strong style={{ color: '#555' }}>Training Types</strong></span>
        </div>
      </div>

      {/* मुख्य सफ़ेद कार्ड कंटेनर (image_b4af3c.png के समान) */}
      <div style={styles.card}>
        {/* टूलबार एरिया */}
        <div style={styles.toolbar}>
          <div style={styles.leftToolbar}>
            <span style={styles.toolbarTitle}>Training Types</span>
            <div style={styles.searchWrapper}>
              <span style={styles.searchIcon}>🔍</span>
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                style={styles.searchInput}
              />
            </div>
          </div>

          <div style={styles.rightToolbar}>
            {/* शो/हाइड कॉलम बटन */}
            <button 
              title="Show/Hide Column" 
              onClick={() => setShowHideOpen(!showHideOpen)} 
              style={{ ...styles.iconButton, color: '#3f51b5' }}
            >
              📊
            </button>
            {/* नया ट्रेनिंग टाइप जोड़ें */}
            <button title="Add" onClick={openAddForm} style={{ ...styles.iconButton, color: '#4caf50' }}>➕</button>
            {/* रीफ्रेश */}
            <button title="Refresh" onClick={handleRefresh} style={{ ...styles.iconButton, color: '#555' }}>🔄</button>
            {/* डाउनलोड */}
            <button title="Download Data" onClick={handleDownload} style={{ ...styles.iconButton, color: '#2196f3' }}>📥</button>

            {/* शो/हाइड ड्रॉपडाउन पॉपअप (image_b4af63.png) */}
            {showHideOpen && (
              <div style={styles.showHideDropdown}>
                <div style={styles.dropdownHeader}>Show/Hide Column</div>
                <hr style={{ borderColor: '#eee', margin: '5px 0' }} />
                <div style={styles.dropdownList}>
                  {Object.keys(columns).map((col) => (
                    <label key={col} style={styles.checkboxLabel}>
                      <input 
                        type="checkbox" 
                        checked={columns[col]} 
                        onChange={() => setColumns({ ...columns, [col]: !columns[col] })}
                        style={{ marginRight: '10px' }}
                      />
                      {col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1')}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* डेटा टेबल */}
        <div style={styles.tableResponsive}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.theadRow}>
                {columns.checkbox && <th style={styles.th}><input type="checkbox" /></th>}
                {columns.trainingTypeId && <th style={styles.th}>Training Type ID</th>}
                {columns.trainingType && <th style={styles.th}>Training Type</th>}
                {columns.category && <th style={styles.th}>Category</th>}
                {columns.duration && <th style={styles.th}>Duration</th>}
                {columns.deliveryMethod && <th style={styles.th}>Delivery Method</th>}
                {columns.targetAudience && <th style={styles.th}>Target Audience</th>}
                {columns.status && <th style={styles.th}>Status</th>}
                {columns.isMandatory && <th style={styles.th}>Is Mandatory</th>}
                {columns.cost && <th style={styles.th}>Cost</th>}
                {columns.certification && <th style={styles.th}>Certification</th>}
                {columns.actions && <th style={styles.th}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="12" style={{ ...styles.td, textAlign: 'center', padding: '30px', color: '#888' }}>
                    No records found.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr key={item.id} style={{ ...styles.tbodyRow, backgroundColor: index % 2 === 0 ? '#ffffff' : '#fcfcfc' }}>
                    {columns.checkbox && <td style={styles.td}><input type="checkbox" /></td>}
                    {columns.trainingTypeId && <td style={styles.td}>{item.id}</td>}
                    {columns.trainingType && <td style={{ ...styles.td, fontWeight: '500', color: '#333' }}>{item.trainingType}</td>}
                    {columns.category && <td style={styles.td}>{item.category}</td>}
                    {columns.duration && <td style={styles.td}>{item.duration}</td>}
                    {columns.deliveryMethod && <td style={styles.td}>{item.deliveryMethod}</td>}
                    {columns.targetAudience && <td style={styles.td}>{item.targetAudience}</td>}
                    {columns.status && (
                      <td style={styles.td}>
                        <span style={{
                          ...styles.badge,
                          backgroundColor: item.status === 'Active' ? '#e8f5e9' : '#ffebee',
                          color: item.status === 'Active' ? '#2e7d32' : '#c62828'
                        }}>
                          {item.status}
                        </span>
                      </td>
                    )}
                    {columns.isMandatory && <td style={styles.td}>{item.isMandatory}</td>}
                    {columns.cost && <td style={styles.td}>{item.cost}</td>}
                    {columns.certification && <td style={styles.td}>{item.certification}</td>}
                    {columns.actions && (
                      <td style={styles.td}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => openEditForm(item)} style={styles.actionBtnEdit} title="Edit">📝</button>
                          <button onClick={() => openDeleteModal(item)} style={styles.actionBtnDelete} title="Delete">🗑️</button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* फ़ुटर पेजिनेशन बार (image_b4af3c.png के अनुसार) */}
        <div style={styles.paginationContainer}>
          <div style={styles.paginationLeft}>
            <span>Items per page:</span>
            <select 
              value={itemsPerPage} 
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              style={styles.pageSelect}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div style={styles.paginationRight}>
            <span style={{ marginRight: '15px' }}>
              {filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–
              {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length}
            </span>
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(currentPage - 1)} 
              style={styles.arrowButton}
            >
              &lt;
            </button>
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(currentPage + 1)} 
              style={styles.arrowButton}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* 3. स्मूथ स्लाइड-इन फॉर्म (जोड़ने या सुधारने के लिए - image_b4b262.png) */}
      <div style={{ ...styles.formSlider, transform: formOpen ? 'translateX(0)' : 'translateX(100%)' }}>
        <div style={styles.formHeader}>
          <h3>{formMode === 'add' ? 'New Training Type' : 'Edit Training Type'}</h3>
          <button onClick={() => setFormOpen(false)} style={styles.closeFormBtn}>✕</button>
        </div>

        <form onSubmit={handleFormSave} style={styles.formBody}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.fieldLabel}>Training Type ID</label>
              <input type="text" value={formData.id} disabled style={styles.formInputDisabled} />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.fieldLabel}>Training Type Name*</label>
              <input 
                type="text" 
                required 
                value={formData.trainingType} 
                onChange={(e) => setFormData({ ...formData, trainingType: e.target.value })} 
                style={styles.formInput} 
              />
            </div>

            {/* कैटेगरी ड्रॉपडाउन */}
            <div style={styles.formGroup}>
              <label style={styles.fieldLabel}>Category*</label>
              <select 
                value={formData.category} 
                onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                style={styles.formSelect}
              >
                <option value="Soft Skills">Soft Skills</option>
                <option value="Technical">Technical</option>
                <option value="Compliance">Compliance</option>
                <option value="Sales">Sales</option>
                <option value="Management">Management</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Project Management">Project Management</option>
                <option value="Team">Team</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.fieldLabel}>Duration*</label>
              <input 
                type="text" 
                value={formData.duration} 
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })} 
                style={styles.formInput} 
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.fieldLabel}>Delivery Method*</label>
              <select 
                value={formData.deliveryMethod} 
                onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })} 
                style={styles.formSelect}
              >
                <option value="Online">Online</option>
                <option value="In-person">In-person</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.fieldLabel}>Target Audience</label>
              <input 
                type="text" 
                value={formData.targetAudience} 
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })} 
                style={styles.formInput} 
              />
            </div>

            {/* स्टेटस ड्रॉपडाउन */}
            <div style={styles.formGroup}>
              <label style={styles.fieldLabel}>Status*</label>
              <select 
                value={formData.status} 
                onChange={(e) => setFormData({ ...formData, status: e.target.value })} 
                style={styles.formSelect}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* मैंडेटरी ड्रॉपडाउन */}
            <div style={styles.formGroup}>
              <label style={styles.fieldLabel}>Is Mandatory*</label>
              <select 
                value={formData.isMandatory} 
                onChange={(e) => setFormData({ ...formData, isMandatory: e.target.value })} 
                style={styles.formSelect}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.fieldLabel}>Cost (in USD)*</label>
              <input 
                type="number" 
                value={formData.cost} 
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })} 
                style={styles.formInput} 
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.fieldLabel}>Certification</label>
              <input 
                type="text" 
                value={formData.certification} 
                onChange={(e) => setFormData({ ...formData, certification: e.target.value })} 
                style={styles.formInput} 
              />
            </div>
          </div>

          <div style={{ ...styles.formGroup, marginTop: '15px' }}>
            <label style={styles.fieldLabel}>Description</label>
            <textarea 
              rows="3" 
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
              style={styles.formTextarea}
            />
          </div>

          <div style={styles.formActionArea}>
            <button type="submit" style={styles.saveBtn}>Save</button>
            <button type="button" onClick={() => setFormOpen(false)} style={styles.cancelBtn}>Cancel</button>
          </div>
        </form>
      </div>

      {/* 4. डिलीट कन्फर्मेशन डायलॉग (image_b4b2a6.png) */}
      {deleteModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h3 style={styles.modalTitle}>Are you sure?</h3>
            {selectedRecord && (
              <div style={styles.modalDetails}>
                <p><strong>TrainingType ID:</strong> {selectedRecord.id}</p>
                <p><strong>Training Type Name:</strong> {selectedRecord.trainingType}</p>
                <p><strong>Category:</strong> {selectedRecord.category}</p>
              </div>
            )}
            <div style={styles.modalButtons}>
              <button onClick={handleDeleteConfirm} style={styles.modalDeleteBtn}>Delete</button>
              <button onClick={() => setDeleteModalOpen(false)} style={styles.modalCancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// हुबहू डिज़ाइन मैच करने के लिए सटीक CSS स्टाइल ऑब्जेक्ट्स
const styles = {
  container: {
    fontFamily: 'Roboto, "Segoe UI", sans-serif',
    backgroundColor: '#eef2f7',
    minHeight: '100vh',
    padding: '20px',
    boxSizing: 'border-box',
    position: 'relative',
    overflowX: 'hidden'
  },
  breadcrumbHeader: {
    display: 'flex',
    justifyContent: 'between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '15px',
    justifyContent: 'space-between'
  },
  mainTitle: {
    margin: 0,
    fontSize: '22px',
    color: '#333',
    fontWeight: '600'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    padding: '15px',
    boxSizing: 'border-box'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e8edf7',
    padding: '10px 15px',
    borderRadius: '8px 8px 0 0',
    flexWrap: 'wrap',
    gap: '10px',
    position: 'relative'
  },
  leftToolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  },
  toolbarTitle: {
    fontWeight: '600',
    color: '#4f5d75',
    fontSize: '16px'
  },
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    left: '10px',
    color: '#888',
    pointerEvents: 'none'
  },
  searchInput: {
    padding: '8px 12px 8px 32px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    width: '200px',
    fontSize: '14px'
  },
  rightToolbar: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    position: 'relative'
  },
  iconButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '4px',
    transition: 'background 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  showHideDropdown: {
    position: 'absolute',
    top: '35px',
    right: '0',
    backgroundColor: '#f3f3f5',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    width: '220px',
    zIndex: 100,
    padding: '10px',
    boxSizing: 'border-box'
  },
  dropdownHeader: {
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
    paddingBottom: '5px',
    fontSize: '14px'
  },
  dropdownList: {
    maxHeight: '200px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    color: '#555',
    cursor: 'pointer',
    padding: '4px 0'
  },
  tableResponsive: {
    overflowX: 'auto',
    width: '100%'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '14px'
  },
  theadRow: {
    borderBottom: '2px solid #eaeaea',
    backgroundColor: '#ffffff'
  },
  th: {
    padding: '12px 10px',
    fontWeight: '600',
    color: '#444',
    whiteSpace: 'nowrap'
  },
  tbodyRow: {
    borderBottom: '1px solid #f0f0f0',
    transition: 'background 0.1s'
  },
  td: {
    padding: '12px 10px',
    color: '#555',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle'
  },
  badge: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-block'
  },
  actionBtnEdit: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#3f51b5'
  },
  actionBtnDelete: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#e53935'
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 10px 5px 10px',
    flexWrap: 'wrap',
    gap: '10px',
    fontSize: '14px',
    color: '#555'
  },
  paginationLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  pageSelect: {
    padding: '4px 8px',
    borderRadius: '4px',
    borderColor: '#ccc',
    outline: 'none'
  },
  paginationRight: {
    display: 'flex',
    alignItems: 'center'
  },
  arrowButton: {
    border: 'none',
    background: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#666'
  },

  // स्लाइडर फॉर्म स्टाइल
  formSlider: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '100%',
    maxWidth: '750px',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    boxShadow: '-4px 0 15px rgba(0,0,0,0.1)',
    zIndex: 200,
    transition: 'transform 0.4s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  formHeader: {
    backgroundColor: '#6172f3',
    color: '#ffffff',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeFormBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '20px',
    cursor: 'pointer'
  },
  formBody: {
    padding: '20px',
    overflowY: 'auto',
    flex: 1
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '15px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  fieldLabel: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#666'
  },
  formInput: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '14px'
  },
  formInputDisabled: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: '#eee',
    color: '#777',
    fontSize: '14px'
  },
  formSelect: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    outline: 'none',
    fontSize: '14px'
  },
  formTextarea: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '14px',
    resize: 'vertical'
  },
  formActionArea: {
    marginTop: '30px',
    display: 'flex',
    gap: '12px'
  },
  saveBtn: {
    backgroundColor: '#e0e0e0',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: '600',
    color: '#555'
  },
  cancelBtn: {
    backgroundColor: '#b71c1c',
    color: '#fff',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: '600'
  },

  // डिलीट पॉपअप मॉडल स्टाइल
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 300
  },
  modalBox: {
    backgroundColor: '#f8f9fa',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
    width: '90%',
    maxWidth: '400px'
  },
  modalTitle: {
    margin: '0 0 15px 0',
    fontSize: '24px',
    fontWeight: '500',
    color: '#222'
  },
  modalDetails: {
    fontSize: '14px',
    color: '#444',
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px'
  },
  modalDeleteBtn: {
    backgroundColor: '#b71c1c',
    color: '#fff',
    border: 'none',
    padding: '10px 22px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  modalCancelBtn: {
    backgroundColor: '#0d6efd',
    color: '#fff',
    border: 'none',
    padding: '10px 22px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: '600'
  }
};

export default TrainingType;