import React, { useState, useEffect } from 'react';
import './MyDocuments.css';

const INITIAL_DATA = [
  { id: 1, name: 'Passport_Copy.pdf', category: 'Personal ID', type: 'PDF', size: '1.2 MB', date: '10/15/2024', status: 'Approved' },
  { id: 2, name: 'Degree_Certificate.jpg', category: 'Education', type: 'JPG', size: '2.5 MB', date: '10/16/2024', status: 'Approved' },
  { id: 3, name: 'Offer_Letter.pdf', category: 'Employment', type: 'PDF', size: '800 KB', date: '10/10/2024', status: 'Approved' },
  { id: 4, name: 'Address_Proof.pdf', category: 'Personal ID', type: 'PDF', size: '1.5 MB', date: '12/01/2024', status: 'Pending' },
];

const MyDocuments = () => {
  const [documents, setDocuments] = useState(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 

  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  
  // Smooth Modal Animation States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);

  const [columns, setColumns] = useState({
    checkbox: true,
    fileName: true,
    category: true,
    type: true,
    size: true,
    date: true,
    download: true,
    status: true,
    actions: true
  });

  const [formState, setFormState] = useState({
    name: '',
    category: 'Personal ID',
    description: '',
    size: '1.0 MB',
    type: 'PDF'
  });

  // Automatically trigger slide/fade transition entries when mounting
  useEffect(() => {
    if (isModalOpen) {
      setIsAnimating(true);
    }
  }, [isModalOpen]);

  // Triggers smooth closing transitions before unmounting from DOM
  const closeModalSmoothly = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 250); // Matches the 0.25s animation transition speed in the CSS rules
  };

  const handleColumnToggle = (colKey) => {
    setColumns(prev => ({ ...prev, [colKey]: !prev[colKey] }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    }
  };

  const openCreateModal = () => {
    setEditingDoc(null);
    setFormState({ name: '', category: 'Personal ID', description: '', size: '1.2 MB', type: 'PDF' });
    setIsModalOpen(true);
  };

  const openEditModal = (doc) => {
    setEditingDoc(doc);
    setFormState({
      name: doc.name,
      category: doc.category,
      description: doc.description || '',
      size: doc.size,
      type: doc.type
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name.trim()) return alert("Document Name is required!");

    if (editingDoc) {
      setDocuments(prev => prev.map(item => 
        item.id === editingDoc.id ? { ...item, ...formState } : item
      ));
    } else {
      const newDoc = {
        id: Date.now(),
        name: formState.name,
        category: formState.category,
        type: formState.type,
        size: formState.size,
        date: new Date().toLocaleDateString('en-US'),
        status: 'Pending'
      };
      setDocuments(prev => [newDoc, ...prev]);
    }
    closeModalSmoothly();
  };

  const handleDownloadRow = (doc) => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(doc, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `${doc.name.split('.')[0]}_metadata.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleGlobalDownload = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(filteredDocs, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "My_Official_Documents_Export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleRefreshData = () => {
    setSearchQuery('');
    setCurrentPage(1);
    setDocuments(INITIAL_DATA);
    alert("Document feeds refreshed successfully!");
  };

  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredDocs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedDocs = filteredDocs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container">
      <div className="title">
        <span className="mainPageTitle">My Documents</span>
        <span className="breadcrumb">
          <svg className="homeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          &nbsp;&gt; Documents &gt; My Documents
        </span>
      </div>

      <div className="card">
        <div className="actionBar">
          <div className="sectionHeader">My Official Documents</div>
          
          <div className="controlsRight">
            <div className="searchWrapper">
              <span className="searchIcon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
              <input 
                type="text" 
                placeholder="Search" 
                className="searchInput"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>

            <button className="iconBtn accentIconBtn" onClick={() => setShowColumnDropdown(!showColumnDropdown)} title="Filter Columns">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="7" y1="12" x2="17" y2="12"></line>
                <line x1="10" y1="18" x2="14" y2="18"></line>
              </svg>
            </button>

            {showColumnDropdown && (
              <div className="dropdownMenu">
                <div className="dropdownTitle">Show/Hide Column</div>
                {Object.keys(columns).map((colKey) => (
                  <label key={colKey} className="dropdownItem">
                    <input 
                      type="checkbox" 
                      checked={columns[colKey]} 
                      onChange={() => handleColumnToggle(colKey)}
                    />
                    <span>{colKey.charAt(0).toUpperCase() + colKey.slice(1)}</span>
                  </label>
                ))}
              </div>
            )}

            <button className="iconBtn plusBtn" onClick={openCreateModal} title="Add New Document">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            
            <button className="iconBtn" onClick={handleRefreshData} title="Refresh Table">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
            </button>
            
            <button className="iconBtn" onClick={handleGlobalDownload} title="Download All Data">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
          </div>
        </div>

        <div className="tableResponsive">
          <table className="table">
            <thead>
              <tr>
                {columns.checkbox && <th className="checkboxCell"><input type="checkbox" className="customCheckbox" /></th>}
                {columns.fileName && <th>File Name</th>}
                {columns.category && <th>Category</th>}
                {columns.type && <th>Type</th>}
                {columns.size && <th>Size</th>}
                {columns.date && <th>Date</th>}
                {columns.download && <th>Download</th>}
                {columns.status && <th>Status</th>}
                {columns.actions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {displayedDocs.map((doc) => (
                <tr key={doc.id}>
                  {columns.checkbox && <td><input type="checkbox" className="customCheckbox" /></td>}
                  {columns.fileName && <td className="fileNameCell">{doc.name}</td>}
                  {columns.category && <td>{doc.category}</td>}
                  {columns.type && <td>{doc.type}</td>}
                  {columns.size && <td>{doc.size}</td>}
                  {columns.date && (
                    <td className="dateCell">
                      <svg className="tableCalIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      {doc.date}
                    </td>
                  )}
                  {columns.download && (
                    <td>
                      <button className="tableActionIconBtn downloadRowBtn" onClick={() => handleDownloadRow(doc)} title="Download File">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      </button>
                    </td>
                  )}
                  {columns.status && (
                    <td>
                      <span className={`badge ${doc.status === 'Approved' ? 'approved' : 'pending'}`}>
                        {doc.status}
                      </span>
                    </td>
                  )}
                  {columns.actions && (
                    <td>
                      <div className="actionGroup">
                        <button className="editLink" onClick={() => openEditModal(doc)} title="Edit Document">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path></svg>
                        </button>
                        <button className="deleteLink" onClick={() => handleDelete(doc.id)} title="Delete Document">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {displayedDocs.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', color: '#94a3b8' }}>No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="footer">
          <div className="pageSizeSelector">
            <span>Items per page:</span>
            <select 
              className="select" 
              value={itemsPerPage} 
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            >
              <option value={4}>4</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="paginationInfo">
            {totalItems > 0 ? `${startIndex + 1} – ${Math.min(startIndex + itemsPerPage, totalItems)}` : '0'} of {totalItems}
          </div>

          <div className="paginationArrows">
            <button 
              className="arrowBtn" 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button 
              className="arrowBtn" 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={`modalOverlay ${isAnimating ? 'active' : ''}`} onClick={closeModalSmoothly}>
          <div className={`modalContent ${isAnimating ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <span>{editingDoc ? 'Edit Document' : 'Upload New Document'}</span>
              <button className="closeModalBtn" onClick={closeModalSmoothly}>×</button>
            </div>
            
            <form onSubmit={handleFormSubmit}>
              <div className="modalBody">
                <div className="formGroup">
                  <input 
                    type="text" 
                    placeholder="Document Name*" 
                    className="inputField" 
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="formGroup">
                  <select 
                    className="selectField"
                    value={formState.category}
                    onChange={(e) => setFormState(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="Personal ID">Personal ID</option>
                    <option value="Education">Education</option>
                    <option value="Employment">Employment</option>
                  </select>
                </div>

                <div className="formGroup">
                  <textarea 
                    placeholder="Description" 
                    className="textareaField"
                    value={formState.description}
                    onChange={(e) => setFormState(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="dragDropZone">
                  <div className="uploadIcon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  </div>
                  <div>Drag & Drop file here or <span className="browseLink">Browse</span></div>
                </div>

                <div className="formRowInline">
                  <div className="formGroup">
                    <input 
                      type="text" 
                      placeholder="File Size" 
                      className="inputField" 
                      value={formState.size}
                      onChange={(e) => setFormState(prev => ({ ...prev, size: e.target.value }))}
                    />
                  </div>
                  <div className="formGroup">
                    <input 
                      type="text" 
                      placeholder="File Type" 
                      className="inputField" 
                      value={formState.type}
                      onChange={(e) => setFormState(prev => ({ ...prev, type: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="modalFooter">
                <button type="button" className="cancelBtn" onClick={closeModalSmoothly}>
                  Cancel
                </button>
                <button type="submit" className="submitBtn">
                  {editingDoc ? 'Save Changes' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDocuments;