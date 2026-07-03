import React, { useState } from "react";
import {
  FaHome,
  FaChevronRight,
  FaSearch,
  FaFilter,
  FaPlusCircle,
  FaDownload,
  FaTrash,
  FaEdit,
  FaTimes,
  FaChevronLeft,
  FaEnvelope,
  FaUserCircle,
  FaSyncAlt,
  FaFileDownload
} from "react-icons/fa";
import "./EmployeeSalary.css";

/* =====================================
   DROPDOWN OPTIONS & CONSTANTS
===================================== */
const departments = [
  "Java",
  "Designing",
  "Marketing",
  "Accounting",
  "Developing",
  "Testing",
  "Human Resource",
];

const roles = [
  "Developer",
  "Designer",
  "Manager",
  "Accountant",
  "Tester",
  "HR",
];

const defaultColumns = {
  checkbox: true,
  employeeName: true,
  email: true,
  department: true,
  salary: true,
  bonus: true,
  deductions: true,
  netSalary: true,
};

/* =====================================
   INITIAL DUMMY DATA
===================================== */
const dummyEmployees = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "John Doe",
    email: "john@email.com",
    department: "Java",
    role: "Developer",
    salary: 2574,
    bonus: 200,
    deductions: 100,
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Sarah Smith",
    email: "sarah@email.com",
    department: "Designing",
    role: "Designer",
    salary: 3587,
    bonus: 300,
    deductions: 150,
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Rajesh",
    email: "rajesh@email.com",
    department: "Marketing",
    role: "Manager",
    salary: 7897,
    bonus: 500,
    deductions: 200,
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: 4,
    employeeId: "EMP004",
    name: "Jay Soni",
    email: "jay@email.com",
    department: "Java",
    role: "Developer",
    salary: 2697,
    bonus: 150,
    deductions: 80,
    image: "https://i.pravatar.cc/100?img=4",
  },
  {
    id: 5,
    employeeId: "EMP005",
    name: "Rajesh Kumar",
    email: "rajeshk@email.com",
    department: "Accounting",
    role: "Accountant",
    salary: 6587,
    bonus: 400,
    deductions: 200,
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: 6,
    employeeId: "EMP006",
    name: "John Peter",
    email: "johnp@email.com",
    department: "Developing",
    role: "Developer",
    salary: 8256,
    bonus: 600,
    deductions: 250,
    image: "https://i.pravatar.cc/100?img=6",
  },
  {
    id: 7,
    employeeId: "EMP007",
    name: "Cara Steven",
    email: "cara@email.com",
    department: "Testing",
    role: "Tester",
    salary: 7112,
    bonus: 350,
    deductions: 150,
    image: "https://i.pravatar.cc/100?img=7",
  },
  {
    id: 8,
    employeeId: "EMP008",
    name: "Angelica Roy",
    email: "angel@email.com",
    department: "Java",
    role: "Developer",
    salary: 7758,
    bonus: 450,
    deductions: 200,
    image: "https://i.pravatar.cc/100?img=8",
  },
  {
    id: 9,
    employeeId: "EMP009",
    name: "Airi Satou",
    email: "airi@email.com",
    department: "Designing",
    role: "Designer",
    salary: 6665,
    bonus: 350,
    deductions: 150,
    image: "https://i.pravatar.cc/100?img=9",
  },
  {
    id: 10,
    employeeId: "EMP010",
    name: "David",
    email: "david@email.com",
    department: "Human Resource",
    role: "HR",
    salary: 8000,
    bonus: 600,
    deductions: 250,
    image: "https://i.pravatar.cc/100?img=10",
  },
  {
    id: 11,
    employeeId: "EMP011",
    name: "Michael",
    email: "michael@email.com",
    department: "Marketing",
    role: "Manager",
    salary: 6200,
    bonus: 250,
    deductions: 120,
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: 12,
    employeeId: "EMP012",
    name: "Sophia",
    email: "sophia@email.com",
    department: "Testing",
    role: "Tester",
    salary: 5800,
    bonus: 300,
    deductions: 100,
    image: "https://i.pravatar.cc/100?img=12",
  },
];

/* =====================================
   COMPONENT
===================================== */
const EmployeeSalary = () => {
  const [employees, setEmployees] = useState(dummyEmployees);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showColumns, setShowColumns] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(defaultColumns);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    department: "",
    role: "",
    salary: "",
    bonus: "",
    deductions: "",
  });

  /* =====================================
     DATA PROCESSING
  ===================================== */
  const calculatedEmployees = employees.map(emp => ({
    ...emp,
    netSalary: (Number(emp.salary) || 0) + (Number(emp.bonus) || 0) - (Number(emp.deductions) || 0)
  }));

  const filteredEmployees = calculatedEmployees.filter((emp) => {
    return (
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage) || 1;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);

  /* =====================================
     EVENT HANDLERS
  ===================================== */
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAllOnPage = () => {
    const currentPageIds = currentEmployees.map(e => e.id);
    const allSelectedOnPage = currentPageIds.every(id => selectedRows.includes(id));

    if (allSelectedOnPage) {
      setSelectedRows(selectedRows.filter(id => !currentPageIds.includes(id)));
    } else {
      setSelectedRows([...new Set([...selectedRows, ...currentPageIds])]);
    }
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
    setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
  };

  const handleEdit = (emp) => {
    setEditData(emp);
    setFormData({
      employeeId: emp.employeeId,
      name: emp.name,
      email: emp.email,
      department: emp.department,
      role: emp.role,
      salary: emp.salary,
      bonus: emp.bonus,
      deductions: emp.deductions,
    });
    setShowModal(true);
  };

  const handleAddNewClick = () => {
    setEditData(null);
    setFormData({
      employeeId: "",
      name: "",
      email: "",
      department: "",
      role: "",
      salary: "",
      bonus: "0",
      deductions: "0",
    });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.employeeId || !formData.email) {
      alert("Please fill out all required fields.");
      return;
    }

    const updatedRecord = {
      id: editData ? editData.id : Date.now(),
      employeeId: formData.employeeId,
      name: formData.name,
      email: formData.email,
      department: formData.department || "Java",
      role: formData.role || "Developer",
      salary: parseFloat(formData.salary) || 0,
      bonus: parseFloat(formData.bonus) || 0,
      deductions: parseFloat(formData.deductions) || 0,
      image: editData ? editData.image : `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 50) + 1}`,
    };

    if (editData) {
      setEmployees(employees.map((emp) => (emp.id === editData.id ? updatedRecord : emp)));
    } else {
      setEmployees([...employees, updatedRecord]);
    }

    setShowModal(false);
    setEditData(null);
  };

  /* New Work: Functional Logic for Refresh and Download Action Buttons */
  const handleRefresh = () => {
    setEmployees(dummyEmployees);
    setSearch("");
    setSelectedRows([]);
    setCurrentPage(1);
  };

  const handleDownloadAllData = () => {
    if (filteredEmployees.length === 0) {
      alert("No data available to download.");
      return;
    }

    // Build the CSV file output array headers and content data
    const csvRows = [
      ["Employee ID", "Name", "Email", "Department", "Role", "Base Salary ($)", "Bonus ($)", "Deductions ($)", "Net Salary ($)"]
    ];

    filteredEmployees.forEach(emp => {
      csvRows.push([
        `"${emp.employeeId}"`,
        `"${emp.name}"`,
        `"${emp.email}"`,
        `"${emp.department}"`,
        `"${emp.role}"`,
        emp.salary,
        emp.bonus,
        emp.deductions,
        emp.netSalary
      ]);
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(row => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const downloadAnchor = document.createElement("a");
    
    downloadAnchor.setAttribute("href", encodedUri);
    downloadAnchor.setAttribute("download", "Employee_Salary_Data.csv");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  return (
    <div className="employeeSalary__container">
      {/* Header Controls */}
      <div className="employeeSalary__header">
        <div className="employeeSalary__breadcrumbs">
          <FaHome /> <span>Home</span> <FaChevronRight /> <span>Payroll</span> <FaChevronRight /> <strong>Salary Control</strong>
        </div>
        <div className="employeeSalary__topActions">
          <div className="employeeSalary__searchBox">
            <FaSearch />
            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button className="employeeSalary__btn" onClick={() => setShowColumns(!showColumns)}>
            <FaFilter /> Column Menu
          </button>
          
          {/* New Actions Added Next To Add Record */}
          <button className="employeeSalary__btn employeeSalary__btn--refresh" onClick={handleRefresh} title="Refresh Table">
            <FaSyncAlt /> Refresh
          </button>
          <button className="employeeSalary__btn employeeSalary__btn--download" onClick={handleDownloadAllData} title="Download CSV Spreadsheet">
            <FaFileDownload /> Export CSV
          </button>

          <button className="employeeSalary__btn employeeSalary__btn--primary" onClick={handleAddNewClick}>
            <FaPlusCircle /> Add Record
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="employeeSalary__tableWrapper">
        <table className="employeeSalary__table">
          <thead>
            <tr>
              {visibleColumns.checkbox && (
                <th>
                  <input
                    type="checkbox"
                    checked={currentEmployees.length > 0 && currentEmployees.every(e => selectedRows.includes(e.id))}
                    onChange={handleSelectAllOnPage}
                  />
                </th>
              )}
              {visibleColumns.employeeName && <th>Employee Name</th>}
              {visibleColumns.email && <th>Email</th>}
              {visibleColumns.department && <th>Department</th>}
              {visibleColumns.salary && <th>Base Salary</th>}
              {visibleColumns.bonus && <th>Bonus</th>}
              {visibleColumns.deductions && <th>Deductions</th>}
              {visibleColumns.netSalary && <th>Net Salary</th>}
              <th>Payslip</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((emp) => (
              <tr key={emp.id} className={selectedRows.includes(emp.id) ? "selected-row" : ""}>
                {visibleColumns.checkbox && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(emp.id)}
                      onChange={() => handleRowSelect(emp.id)}
                    />
                  </td>
                )}
                {visibleColumns.employeeName && (
                  <td className="employeeSalary__employeeCell">
                    <img
                      src={emp.image}
                      alt={emp.name}
                      className="employeeSalary__avatar"
                    />
                    <span>{emp.name}</span>
                  </td>
                )}
                {visibleColumns.email && (
                  <td>
                    <div className="employeeSalary__email">
                      <FaEnvelope />
                      <span>{emp.email}</span>
                    </div>
                  </td>
                )}
                {visibleColumns.department && <td>{emp.department}</td>}
                {visibleColumns.salary && <td>${emp.salary}</td>}
                {visibleColumns.bonus && <td>${emp.bonus}</td>}
                {visibleColumns.deductions && <td>${emp.deductions}</td>}
                {visibleColumns.netSalary && <td style={{ fontWeight: "bold" }}>${emp.netSalary}</td>}
                <td>
                  <button 
                    className="employeeSalary__iconBtn" 
                    onClick={() => alert(`Downloading payslip for ${emp.name}`)}
                  >
                    <FaDownload />
                  </button>
                </td>
                <td>
                  <button
                    className="employeeSalary__edit"
                    onClick={() => handleEdit(emp)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="employeeSalary__delete"
                    onClick={() => handleDelete(emp.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="employeeSalary__pagination">
        <div className="employeeSalary__pageSize">
          <span>Items per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={24}>24</option>
          </select>
        </div>
        <div className="employeeSalary__pageInfo">
          {filteredEmployees.length > 0 ? indexOfFirst + 1 : 0}-
          {Math.min(indexOfLast, filteredEmployees.length)}
          {" "}of {filteredEmployees.length}
        </div>
        <div className="employeeSalary__pageBtns">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <FaChevronLeft />
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Pop-up Overlay Dialog Form */}
      {showModal && (
        <div className="employeeSalary__modalOverlay">
          <div className="employeeSalary__modal">
            <div className="employeeSalary__modalHeader">
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <FaUserCircle size={20} />
                <span>
                  {editData ? "Edit Employee Salary" : "New Employee Salary"}
                </span>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditData(null);
                }}
              >
                <FaTimes />
              </button>
            </div>
            <div className="employeeSalary__modalBody">
              <div className="employeeSalary__formGrid">
                <input
                  placeholder="Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  placeholder="Employee ID *"
                  value={formData.employeeId}
                  disabled={!!editData}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                />
                <input
                  placeholder="Email *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <option value="">Department *</option>
                  {departments.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
                </select>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="">Role *</option>
                  {roles.map((role) => <option key={role} value={role}>{role}</option>)}
                </select>
                <input
                  placeholder="Salary *"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                />
                <input
                  placeholder="Bonus"
                  type="number"
                  value={formData.bonus}
                  onChange={(e) => setFormData({ ...formData, bonus: e.target.value })}
                />
                <input
                  placeholder="Deductions"
                  type="number"
                  value={formData.deductions}
                  onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
                />
              </div>
              <div className="employeeSalary__modalFooter">
                <button className="employeeSalary__saveBtn" onClick={handleSave}>
                  Save Changes
                </button>
                <button
                  className="employeeSalary__cancelBtn"
                  onClick={() => {
                    setShowModal(false);
                    setEditData(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Columns Visibility Controller */}
      {showColumns && (
        <div className="employeeSalary__columnDropdown">
          <h4>Show/Hide Column</h4>
          {Object.keys(defaultColumns).map((colKey) => (
            <label key={colKey}>
              <input
                type="checkbox"
                checked={visibleColumns[colKey]}
                onChange={() =>
                  setVisibleColumns({
                    ...visibleColumns,
                    [colKey]: !visibleColumns[colKey],
                  })
                }
              />
              {colKey.replace(/([A-Z])/g, " $1")}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeSalary;