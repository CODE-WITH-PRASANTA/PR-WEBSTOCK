import React, { useState } from 'react';
import './TrainingFeedback.css';

const TrainingFeedback = () => {
  // प्रारंभिक फीडबैक डेटा जो 'image_b617f9.png' से सटीक रूप से मेल खाता है
  const initialRecords = [
    { id: 1, name: 'John Doe', course: 'Angular Advanced', date: '2023-01-20', rating: 5, comments: 'Excellent training, very info...', suggestions: 'More hands-on exercises.', avatar: 'https://i.pravatar.cc/150?img=32' },
    { id: 2, name: 'Sarah Smith', course: 'Leadership Skills', date: '2023-02-12', rating: 4, comments: 'Good content, but a bit rus...', suggestions: 'Extend the duration by one ...', avatar: 'https://i.pravatar.cc/150?img=47' },
    { id: 3, name: 'Michael Brown', course: 'Project Management', date: '2023-03-10', rating: 3, comments: 'Average training, expected ...', suggestions: 'Include more case studies.', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 4, name: 'Emily Davis', course: 'Communication Mastery', date: '2023-04-03', rating: 5, comments: 'Transformative experience.', suggestions: 'No suggestions, it was per...', avatar: 'https://i.pravatar.cc/150?img=26' },
    { id: 5, name: 'David Wilson', course: 'Data Science Basics', date: '2023-05-20', rating: 4, comments: 'Great introduction to the fi...', suggestions: 'Provide more reading mate...', avatar: 'https://i.pravatar.cc/150?img=61' },
    { id: 6, name: 'Jessica Taylor', course: 'Agile Methodologies', date: '2023-06-12', rating: 5, comments: 'Clear and concise explanat...', suggestions: 'Conduct a follow-up sessio...', avatar: 'https://i.pravatar.cc/150?img=41' },
    { id: 7, name: 'Daniel Anderson', course: 'Financial Analysis', date: '2023-07-08', rating: 4, comments: 'Useful techniques for daily...', suggestions: 'Use real-world financial da...', avatar: 'https://i.pravatar.cc/150?img=59' },
    { id: 8, name: 'Laura Thomas', course: 'Emotional Intelligence', date: '2023-08-02', rating: 5, comments: 'Very engaging trainer.', suggestions: 'More group activities.', avatar: 'https://i.pravatar.cc/150?img=34' },
    { id: 9, name: 'Kevin Martinez', course: 'React Native Workshop', date: '2023-09-18', rating: 3, comments: 'Tools setup took too long.', suggestions: 'Pre-configure environments.', avatar: 'https://i.pravatar.cc/150?img=68' },
    { id: 10, name: 'Sophia White', course: 'Customer Service Excellen...', date: '2023-10-12', rating: 4, comments: 'Good refresh of basics.', suggestions: 'Focus more on handling an...', avatar: 'https://i.pravatar.cc/150?img=49' },
    { id: 11, name: 'Alex Clark', course: 'DevOps Fundamental', date: '2023-11-05', rating: 5, comments: 'Very detailed and practical.', suggestions: 'Provide sandbox access.', avatar: 'https://i.pravatar.cc/150?img=51' },
    { id: 12, name: 'Emma Watson', course: 'UI/UX Fundamentals', date: '2023-12-01', rating: 4, comments: 'Creative session, liked it.', suggestions: 'Share design wireframes.', avatar: 'https://i.pravatar.cc/150?img=43' }
  ];

  const [dataList, setDataList] = useState(initialRecords);
  const [searchQuery, setSearchQuery] = useState('');
  
  // डायनेमिक पेजिनेशन स्टेट्स (5, 10, 15 आइटम चयन विकल्प)
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // कॉलम शो/हाइड विजिबिलिटी लिस्ट (image_b6181b.png)
  const [colMenuOpen, setColMenuOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true, id: false, employeeName: true, trainingCourse: true, date: true, rating: true, comments: true, suggestions: true, actions: true
  });

  // मोडल एक्शन्स स्टेट्स
  const [activeModal, setActiveModal] = useState(null); // 'add', 'edit', 'delete'
  const [selectedRow, setSelectedRow] = useState(null);

  // फॉर्म इनपुट स्टेट्स (कैलेंडर और टेक्स्ट-एरिया इनपुट सपोर्ट)
  const [formInputs, setFormInputs] = useState({
    name: '', course: '', date: '', rating: '5', comments: '', suggestions: ''
  });

  // लाइव खोज फ़िल्टरिंग
  const recordsFiltered = dataList.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // पेजिनेशन गणितीय गणनाएँ
  const totalItemsCount = recordsFiltered.length;
  const maxPages = Math.ceil(totalItemsCount / itemsPerPage);
  const endIdx = currentPage * itemsPerPage;
  const startIdx = endIdx - itemsPerPage;
  const pageItems = recordsFiltered.slice(startIdx, endIdx);

  const toggleColumn = (columnKey) => {
    setVisibleColumns(prev => ({ ...prev, [columnKey]: !prev[columnKey] }));
  };

  // १. रिफ्रेश क्रिया (डेटा को उसकी मूल स्थिति में रिसेट करना)
  const triggerRefresh = () => {
    setDataList(initialRecords);
    setSearchQuery('');
    setCurrentPage(1);
    alert('फीडबैक डेटा सफलतापूर्वक रीलोड हो गया है!');
  };

  // २. डाउनलोड क्रिया (JSON के रूप में लोकल फाइल एक्सपोर्ट)
  const triggerDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataList, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "training_feedback_report.json");
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  };

  // मोडल एक्टिवेशन हैंडलर्स
  const openAddModal = () => {
    setFormInputs({ name: '', course: '', date: '', rating: '5', comments: '', suggestions: '' });
    setActiveModal('add');
  };

  const openEditModal = (record) => {
    setSelectedRow(record);
    setFormInputs({
      name: record.name, course: record.course, date: record.date, rating: record.rating.toString(), comments: record.comments, suggestions: record.suggestions
    });
    setActiveModal('edit');
  };

  const openDeleteModal = (record) => {
    setSelectedRow(record);
    setActiveModal('delete');
  };

  // डेटा जोड़ना / एडिट अपडेट करना (Save Process)
  const executeSave = () => {
    if (!formInputs.name || !formInputs.course || !formInputs.date) {
      alert('कृपया आवश्यक फ़ील्ड्स (Employee Name, Course, Date) जरूर भरें!');
      return;
    }

    if (activeModal === 'add') {
      const addedRow = {
        id: Date.now(),
        ...formInputs,
        rating: parseInt(formInputs.rating) || 5,
        avatar: 'https://i.pravatar.cc/150?img=62'
      };
      setDataList([addedRow, ...dataList]);
    } else if (activeModal === 'edit') {
      setDataList(dataList.map(item =>
        item.id === selectedRow.id ? { ...item, ...formInputs, rating: parseInt(formInputs.rating) || 5 } : item
      ));
    }
    setActiveModal(null);
  };

  // रिकॉर्ड हटाने की कन्फर्मेशन एक्शन
  const executeDelete = () => {
    setDataList(dataList.filter(item => item.id !== selectedRow.id));
    setActiveModal(null);
  };

  return (
    <div className="tf-container">
      {/* शीर्ष ब्रेडक्रंब हेडर */}
      <header className="tf-header">
        <h1 className="tf-title">Training Feedback</h1>
        <div className="tf-breadcrumb">
          <span>🏠 Training &gt; </span>
          <span className="tf-breadcrumb-active">Training Feedback</span>
        </div>
      </header>

      {/* मुख्य तालिका कंटेंट बॉक्स */}
      <div className="tf-card">
        <div className="tf-action-bar">
          <div className="tf-search-box">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search"
              className="tf-search-input"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="tf-action-btns">
            {/* शो/हाइड कॉलम बटन (इमेज 2) */}
            <button className="tf-icon-btn tf-btn-col" onClick={() => setColMenuOpen(!colMenuOpen)} title="Show/Hide Columns">
              🎛️
            </button>
            {/* नया रिकॉर्ड जोड़ने का बटन (इमेज 3) */}
            <button className="tf-icon-btn tf-btn-add" onClick={openAddModal} title="Add New Feedback">
              ➕
            </button>
            {/* रिफ्रेश बटन */}
            <button className="tf-icon-btn tf-btn-ref" onClick={triggerRefresh} title="Refresh Table">
              🔄
            </button>
            {/* डाउनलोड बटन */}
            <button className="tf-icon-btn tf-btn-dl" onClick={triggerDownload} title="Download Report">
              📥
            </button>

            {/* कॉलम शो/हाइड ड्रॉपडाउन बॉक्स (image_b6181b.png) */}
            {colMenuOpen && (
              <div className="tf-col-dropdown">
                <div className="tf-drop-header">Show/Hide Column</div>
                {Object.keys(visibleColumns).map((key) => (
                  <div key={key} className="tf-drop-item" onClick={() => toggleColumn(key)}>
                    <input type="checkbox" checked={visibleColumns[key]} readOnly />
                    <label style={{ textTransform: 'capitalize', cursor: 'pointer', marginLeft: '8px' }}>
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* तालिका संरचना */}
        <div className="tf-table-wrapper">
          <table className="tf-table">
            <thead>
              <tr>
                {visibleColumns.checkbox && <th><input type="checkbox" /></th>}
                {visibleColumns.id && <th>ID</th>}
                {visibleColumns.employeeName && <th>Employee Name</th>}
                {visibleColumns.trainingCourse && <th>Training Course</th>}
                {visibleColumns.date && <th>Date</th>}
                {visibleColumns.rating && <th>Rating</th>}
                {visibleColumns.comments && <th>Comments</th>}
                {visibleColumns.suggestions && <th>Suggestions</th>}
                {visibleColumns.actions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {pageItems.map((row) => (
                <tr key={row.id}>
                  {visibleColumns.checkbox && <td><input type="checkbox" /></td>}
                  {visibleColumns.id && <td>{row.id}</td>}
                  {visibleColumns.employeeName && (
                    <td className="tf-emp-cell">
                      <img src={row.avatar} alt={row.name} className="tf-avatar" />
                      {row.name}
                    </td>
                  )}
                  {visibleColumns.trainingCourse && <td>{row.course}</td>}
                  {visibleColumns.date && <td>📅 {row.date}</td>}
                  {visibleColumns.rating && <td>{row.rating}</td>}
                  {visibleColumns.comments && <td title={row.comments}>{row.comments}</td>}
                  {visibleColumns.suggestions && <td title={row.suggestions}>{row.suggestions}</td>}
                  {visibleColumns.actions && (
                    <td>
                      <div className="tf-row-actions">
                        <button className="tf-edit-icon" onClick={() => openEditModal(row)} title="Edit Feedback">📝</button>
                        <button className="tf-del-icon" onClick={() => openDeleteModal(row)} title="Remove Row">🗑️</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* पेजिनेशन सिस्टम बार */}
        <div className="tf-pagination">
          <div>
            <span>Items per page: </span>
            <select
              className="tf-page-select"
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          <div>
            {startIdx + 1} – {Math.min(endIdx, totalItemsCount)} of {totalItemsCount}
          </div>
          <div className="tf-nav-arrows">
            <button className="tf-arrow" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
              &lt;
            </button>
            <button className="tf-arrow" onClick={() => setCurrentPage(p => Math.min(p + 1, maxPages))} disabled={currentPage === maxPages}>
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* सभी एनिमेटेड और स्मूथ मोडल्स (पॉपअप्स) */}
      {activeModal && (
        <div className="tf-overlay">
          {/* एड और एडिट फीडबैक फ़ॉर्म मोडल (image_b669b6.png) */}
          {(activeModal === 'add' || activeModal === 'edit') && (
            <div className="tf-modal-form">
              <div className="tf-modal-head">
                <div className="tf-modal-head-left">
                  <span style={{ fontSize: '20px' }}>👤</span>
                  <span className="tf-modal-title">
                    {activeModal === 'add' ? 'New Feedback' : 'Edit Feedback'}
                  </span>
                </div>
                <button className="tf-modal-close" onClick={() => setActiveModal(null)}>×</button>
              </div>
              <div className="tf-modal-body">
                <div className="tf-form-grid">
                  <div className="tf-input-group">
                    <div className="tf-field">
                      <label>Employee Name*</label>
                      <input type="text" value={formInputs.name} onChange={(e) => setFormInputs({ ...formInputs, name: e.target.value })} placeholder="Employee Name" />
                    </div>
                    <span>👦</span>
                  </div>
                  <div className="tf-input-group">
                    <div className="tf-field">
                      <label>Training Course*</label>
                      <input type="text" value={formInputs.course} onChange={(e) => setFormInputs({ ...formInputs, course: e.target.value })} placeholder="Training Course" />
                    </div>
                    <span>🎓</span>
                  </div>
                  
                  {/* तारीख अनुभाग के लिए स्मूथ नेटिव कैलेंडर */}
                  <div className="tf-input-group">
                    <div className="tf-field">
                      <label>Date*</label>
                      <input type="date" value={formInputs.date} onChange={(e) => setFormInputs({ ...formInputs, date: e.target.value })} />
                    </div>
                  </div>

                  {/* रेटिंग ड्रॉपडाउन (1-5) */}
                  <div className="tf-input-group">
                    <div className="tf-field">
                      <label>Rating (1-5)*</label>
                      <select value={formInputs.rating} onChange={(e) => setFormInputs({ ...formInputs, rating: e.target.value })}>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                      </select>
                    </div>
                    <span>★</span>
                  </div>

                  {/* कमेंट्स टेक्स्टएरिया बॉक्स */}
                  <div className="tf-input-group tf-input-full">
                    <div className="tf-field">
                      <label>Comments</label>
                      <textarea value={formInputs.comments} onChange={(e) => setFormInputs({ ...formInputs, comments: e.target.value })} placeholder="Enter comments here..." rows={2} />
                    </div>
                  </div>

                  {/* सजेशन्स टेक्स्टएरिया बॉक्स */}
                  <div className="tf-input-group tf-input-full">
                    <div className="tf-field">
                      <label>Suggestions</label>
                      <textarea value={formInputs.suggestions} onChange={(e) => setFormInputs({ ...formInputs, suggestions: e.target.value })} placeholder="Enter suggestions here..." rows={2} />
                    </div>
                  </div>
                </div>

                <div className="tf-modal-footer">
                  <button className={`tf-btn tf-btn-save ${formInputs.name && formInputs.course ? 'active' : ''}`} onClick={executeSave}>
                    Save
                  </button>
                  <button className="tf-btn tf-btn-cancel" onClick={() => setActiveModal(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* रिकॉर्ड हटाने का कन्फर्मेशन मोडल (image_b669db.png) */}
          {activeModal === 'delete' && (
            <div className="tf-modal-del">
              <h3 className="tf-del-title">Are you sure?</h3>
              <p className="tf-del-text"><strong>Employee Name:</strong> {selectedRow?.name}</p>
              <p className="tf-del-text"><strong>Training Course:</strong> {selectedRow?.course}</p>
              <div className="tf-del-footer">
                <button className="tf-btn-del-ok" onClick={executeDelete}>Delete</button>
                <button className="tf-btn-del-no" onClick={() => setActiveModal(null)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrainingFeedback;