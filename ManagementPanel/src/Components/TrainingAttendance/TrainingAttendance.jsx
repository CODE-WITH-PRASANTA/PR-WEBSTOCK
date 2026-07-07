import React, { useState } from 'react';
import './TrainingAttendance.css';

const TrainingAttendance = () => {
  // प्रारंभिक मॉक डेटा जो 'image_b58138.png' से हूबहू मेल खाता है
  const initialData = [
    { id: 1, name: 'John Doe', course: 'Angular Advanced', date: '01/15/2023', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present', efficiency: 95, avatar: 'https://i.pravatar.cc/150?img=32' },
    { id: 2, name: 'Sarah Smith', course: 'Leadership Skills', date: '02/10/2023', checkIn: '09:15 AM', checkOut: '05:15 PM', status: 'Present', efficiency: 88, avatar: 'https://i.pravatar.cc/150?img=47' },
    { id: 3, name: 'Michael Brown', course: 'Project Management', date: '03/05/2023', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Absent', efficiency: 0, avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 4, name: 'Emily Davis', course: 'Communication Master...', date: '04/01/2023', checkIn: '08:55 AM', checkOut: '04:55 PM', status: 'Present', efficiency: 92, avatar: 'https://i.pravatar.cc/150?img=26' },
    { id: 5, name: 'David Wilson', course: 'Data Science Basics', date: '05/15/2023', checkIn: '09:05 AM', checkOut: '05:05 PM', status: 'Present', efficiency: 90, avatar: 'https://i.pravatar.cc/150?img=61' },
    { id: 6, name: 'Jessica Taylor', course: 'Agile Methodologies', date: '06/10/2023', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Late', efficiency: 75, avatar: 'https://i.pravatar.cc/150?img=41' },
    { id: 7, name: 'Daniel Anderson', course: 'Financial Analysis', date: '07/05/2023', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present', efficiency: 96, avatar: 'https://i.pravatar.cc/150?img=59' },
    { id: 8, name: 'Laura Thomas', course: 'Emotional Intelligence', date: '08/01/2023', checkIn: '09:30 AM', checkOut: '05:30 PM', status: 'Present', efficiency: 85, avatar: 'https://i.pravatar.cc/150?img=34' },
    { id: 9, name: 'Kevin Martinez', course: 'React Native Workshop', date: '09/15/2023', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present', efficiency: 94, avatar: 'https://i.pravatar.cc/150?img=68' },
    { id: 10, name: 'Sophia White', course: 'Customer Service Exce...', date: '10/10/2023', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Absent', efficiency: 0, avatar: 'https://i.pravatar.cc/150?img=49' },
    { id: 11, name: 'Alex Harrison', course: 'Cloud Infrastructure', date: '11/12/2023', checkIn: '09:10 AM', checkOut: '05:10 PM', status: 'Present', efficiency: 89, avatar: 'https://i.pravatar.cc/150?img=60' },
    { id: 12, name: 'Brian Clark', course: 'DevOps Practices', date: '12/05/2023', checkIn: '08:50 AM', checkOut: '04:50 PM', status: 'Late', efficiency: 81, avatar: 'https://i.pravatar.cc/150?img=65' }
  ];

  const [attendanceData, setAttendanceData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');

  // पेजिनेशन स्टेट्स
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // शो/हाइड कॉलम विजिबिलिटी स्टेट्स (image_b5815c.png)
  const [showColMenu, setShowColMenu] = useState(false);
  const [columns, setColumns] = useState({
    checkbox: true,
    id: false,
    employeeName: true,
    trainingCourse: true,
    date: true,
    checkIn: true,
    checkOut: true,
    status: true,
    efficiency: true,
    actions: true
  });

  // मोडल स्टेट्स
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'delete'
  const [selectedRecord, setSelectedRecord] = useState(null);

  // फॉर्म डेटा स्टेट्स (image_b581b7.png)
  const [formData, setFormData] = useState({
    name: '', course: '', date: '', checkIn: '--:--', checkOut: '--:--', status: 'Present', efficiency: '0'
  });

  // खोज फ़िल्टर लॉजिक
  const filteredData = attendanceData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // पेजिनेशन मान
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // कॉलम टॉगल फंक्शन
  const toggleColumn = (colKey) => {
    setColumns(prev => ({ ...prev, [colKey]: !prev[colKey] }));
  };

  // रिफ्रेश बटन एक्शन
  const handleRefresh = () => {
    setAttendanceData(initialData);
    setSearchQuery('');
    setCurrentPage(1);
    alert('डेटा सफलतापूर्वक रिफ्रेश किया गया!');
  };

  // डाउनलोड बटन एक्शन
  const handleDownload = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(attendanceData, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'training_attendance.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // मोडल ओपन करने के फंक्शन्स
  const openAddModal = () => {
    setFormData({ name: '', course: '', date: '', checkIn: '09:00 AM', checkOut: '05:00 PM', status: 'Present', efficiency: '0' });
    setModalType('add');
  };

  const openEditModal = (record) => {
    setSelectedRecord(record);
    setFormData({
      name: record.name, course: record.course, date: record.date, checkIn: record.checkIn, checkOut: record.checkOut, status: record.status, efficiency: record.efficiency.toString()
    });
    setModalType('edit');
  };

  const openDeleteModal = (record) => {
    setSelectedRecord(record);
    setModalType('delete');
  };

  // फॉर्म सबमिट/सेव हैंडलर
  const handleSave = () => {
    if (!formData.name || !formData.course || !formData.date) {
      alert('कृपया आवश्यक फ़ील्ड भरें!');
      return;
    }

    if (modalType === 'add') {
      const newRow = {
        id: Date.now(),
        name: formData.name,
        course: formData.course,
        date: formData.date,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        status: formData.status,
        efficiency: parseInt(formData.efficiency) || 0,
        avatar: 'https://i.pravatar.cc/150?img=33'
      };
      setAttendanceData([newRow, ...attendanceData]);
    } else if (modalType === 'edit') {
      setAttendanceData(attendanceData.map(item =>
        item.id === selectedRecord.id ? { ...item, ...formData, efficiency: parseInt(formData.efficiency) || 0 } : item
      ));
    }
    setModalType(null);
  };

  // डिलीट कन्फर्मेशन हैंडलर
  const handleDeleteConfirm = () => {
    setAttendanceData(attendanceData.filter(item => item.id !== selectedRecord.id));
    setModalType(null);
  };

  return (
    <div className="ta-page-container">
      {/* हेडर सेक्शन */}
      <header className="ta-header">
        <h1 className="ta-header-title">Training Attendance</h1>
        <div className="ta-breadcrumb">
          <span>🏠 Training &gt; </span>
          <span className="ta-breadcrumb-active">Training Attendance</span>
        </div>
      </header>

      {/* मुख्य तालिका कार्ड */}
      <div className="ta-card">
        <div className="ta-action-bar">
          <div className="ta-search-wrapper">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search"
              className="ta-search-input"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="ta-top-buttons">
            {/* शो/हाइड कॉलम बटन (इमेज 2) */}
            <button className="ta-btn-icon ta-btn-filter" onClick={() => setShowColMenu(!showColMenu)} title="Show/Hide Column">
              🎛️
            </button>
            {/* ऐड बटन (इमेज 3) */}
            <button className="ta-btn-icon ta-btn-add" onClick={openAddModal} title="Add Attendance">
              ➕
            </button>
            {/* रिफ्रेश बटन */}
            <button className="ta-btn-icon ta-btn-refresh" onClick={handleRefresh} title="Refresh">
              🔄
            </button>
            {/* डाउनलोड बटन */}
            <button className="ta-btn-icon ta-btn-download" onClick={handleDownload} title="Download JSON">
              📥
            </button>

            {/* शो/हाइड पॉपओवर मेनू (image_b5815c.png) */}
            {showColMenu && (
              <div className="ta-col-popover">
                <div className="ta-popover-header">Show/Hide Column</div>
                {Object.keys(columns).map((key) => (
                  <div key={key} className="ta-popover-item" onClick={() => toggleColumn(key)}>
                    <input type="checkbox" checked={columns[key]} readOnly />
                    <label style={{ textTransform: 'capitalize', cursor: 'pointer' }}>
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* डेटा टेबल */}
        <div className="ta-table-responsive">
          <table className="ta-table">
            <thead>
              <tr>
                {columns.checkbox && <th><input type="checkbox" /></th>}
                {columns.id && <th>ID</th>}
                {columns.employeeName && <th>Employee Name</th>}
                {columns.trainingCourse && <th>Training Course</th>}
                {columns.date && <th>Date</th>}
                {columns.checkIn && <th>Check In</th>}
                {columns.checkOut && <th>Check Out</th>}
                {columns.status && <th>Status</th>}
                {columns.efficiency && <th>Efficiency (%) ↑</th>}
                {columns.actions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row) => (
                <tr key={row.id}>
                  {columns.checkbox && <td><input type="checkbox" /></td>}
                  {columns.id && <td>{row.id}</td>}
                  {columns.employeeName && (
                    <td className="ta-employee-cell">
                      <img src={row.avatar} alt={row.name} className="ta-avatar" />
                      {row.name}
                    </td>
                  )}
                  {columns.trainingCourse && <td>{row.course}</td>}
                  {columns.date && <td>📅 {row.date}</td>}
                  {columns.checkIn && <td>{row.checkIn}</td>}
                  {columns.checkOut && <td>{row.checkOut}</td>}
                  {columns.status && (
                    <td>
                      <span className={`ta-badge ${row.status.toLowerCase()}`}>
                        {row.status}
                      </span>
                    </td>
                  )}
                  {columns.efficiency && <td>{row.efficiency}</td>}
                  {columns.actions && (
                    <td>
                      <div className="ta-row-actions">
                        <button className="ta-btn-edit" onClick={() => openEditModal(row)} title="Edit">📝</button>
                        <button className="ta-btn-delete" onClick={() => openDeleteModal(row)} title="Remove">🗑️</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* डायनेमिक पेजिनेशन बार */}
        <div className="ta-pagination-bar">
          <div className="ta-page-select-wrapper">
            <span>Items per page:</span>
            <select
              className="ta-page-select"
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          <div>
            {indexOfFirstItem + 1} – {Math.min(indexOfLastItem, totalItems)} of {totalItems}
          </div>
          <div className="ta-nav-arrows">
            <button className="ta-arrow" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
              &lt;
            </button>
            <button className="ta-arrow" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* मोडल्स प्रबंधन अनुभाग */}
      {modalType && (
        <div className="ta-modal-overlay">
          {/* Add / Edit Form Modal (image_b581b7.png) */}
          {(modalType === 'add' || modalType === 'edit') && (
            <div className="ta-form-modal">
              <div className="ta-modal-header">
                <div className="ta-modal-header-left">
                  <span style={{ fontSize: '20px' }}>👤</span>
                  <span className="ta-modal-title">
                    {modalType === 'add' ? 'New Attendance' : 'Edit Attendance'}
                  </span>
                </div>
                <button className="ta-modal-close" onClick={() => setModalType(null)}>×</button>
              </div>
              <div className="ta-modal-body">
                <div className="ta-form-grid">
                  <div className="ta-input-group">
                    <div className="ta-field-inner">
                      <label>Employee Name*</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Employee Name" />
                    </div>
                    <span className="ta-field-icon">👦</span>
                  </div>
                  <div className="ta-input-group">
                    <div className="ta-field-inner">
                      <label>Training Course*</label>
                      <input type="text" value={formData.course} onChange={(e) => setFormData({ ...formData, course: e.target.value })} placeholder="Training Course" />
                    </div>
                    <span className="ta-field-icon">🎓</span>
                  </div>
                  <div className="ta-input-group">
                    <div className="ta-field-inner">
                      <label>Date*</label>
                      <input type="text" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} placeholder="MM/DD/YYYY" />
                    </div>
                    <span className="ta-field-icon">📅</span>
                  </div>
                  <div className="ta-input-group">
                    <div className="ta-field-inner">
                      <label>Status*</label>
                      <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                      </select>
                    </div>
                  </div>
                  <div className="ta-input-group">
                    <div className="ta-field-inner">
                      <label>Check In*</label>
                      <input type="text" value={formData.checkIn} onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })} />
                    </div>
                    <span className="ta-field-icon">🕒</span>
                  </div>
                  <div className="ta-input-group">
                    <div className="ta-field-inner">
                      <label>Check Out*</label>
                      <input type="text" value={formData.checkOut} onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })} />
                    </div>
                    <span className="ta-field-icon">🕒</span>
                  </div>
                  <div className="ta-input-group ta-input-group-full">
                    <div className="ta-field-inner">
                      <label>Efficiency (%)*</label>
                      <input type="number" value={formData.efficiency} onChange={(e) => setFormData({ ...formData, efficiency: e.target.value })} />
                    </div>
                    <span className="ta-field-icon">📈</span>
                  </div>
                </div>
                <div className="ta-modal-footer">
                  <button className={`ta-btn ta-btn-save ${formData.name && formData.course ? 'active' : ''}`} onClick={handleSave}>
                    Save
                  </button>
                  <button className="ta-btn ta-btn-cancel-red" onClick={() => setModalType(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Remove / Delete Confirmation Modal (image_b584bf.png) */}
          {modalType === 'delete' && (
            <div className="ta-delete-modal">
              <h3 className="ta-delete-title">Are you sure?</h3>
              <p className="ta-delete-text"><strong>Employee Name:</strong> {selectedRecord?.name}</p>
              <p className="ta-delete-text"><strong>Training Course:</strong> {selectedRecord?.course}</p>
              <div className="ta-delete-footer">
                <button className="ta-btn-del-confirm" onClick={handleDeleteConfirm}>Delete</button>
                <button className="ta-btn-del-cancel" onClick={() => setModalType(null)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrainingAttendance;