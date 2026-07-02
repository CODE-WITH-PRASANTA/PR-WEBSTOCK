import React, { useMemo, useState, useEffect } from "react";
import "./EmployeeAssets.css";

import {
  FaSearch,
  FaFilter,
  FaPlusCircle,
  FaSyncAlt,
  FaDownload,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaTimes,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight
} from "react-icons/fa";

import {
  MdLaptopMac,
  MdPhoneIphone,
  MdTabletMac,
  MdKeyboardArrowDown
} from "react-icons/md";

const categoryOptions = [
  "Laptop",
  "Mobile",
  "Peripheral",
  "Tablet",
  "Storage"
];

const statusOptions = [
  "Assigned",
  "Returned",
  "Repair",
  "Damaged"
];

const dummyEmployees = [
  {
    id: 1,
    employee: "John Doe",
    asset: "MacBook Pro",
    category: "Laptop",
    serial: "SN12345",
    status: "Assigned",
    assignedDate: "2023-01-10",
    avatar: "https://i.pravatar.cc/50?img=11"
  },
  {
    id: 2,
    employee: "Sarah Smith",
    asset: "iPhone 13",
    category: "Mobile",
    serial: "SN67890",
    status: "Assigned",
    assignedDate: "2023-02-15",
    avatar: "https://i.pravatar.cc/50?img=12"
  },
  {
    id: 3,
    employee: "Robert Johnson",
    asset: "Dell Monitor",
    category: "Peripheral",
    serial: "SN11223",
    status: "Returned",
    assignedDate: "2023-01-20",
    avatar: "https://i.pravatar.cc/50?img=13"
  },
  {
    id: 4,
    employee: "Michael Brown",
    asset: "Samsung Tablet",
    category: "Tablet",
    serial: "SN44556",
    status: "Assigned",
    assignedDate: "2023-03-05",
    avatar: "https://i.pravatar.cc/50?img=14"
  },
  {
    id: 5,
    employee: "Emily Davis",
    asset: "Lenovo ThinkPad",
    category: "Laptop",
    serial: "SN77889",
    status: "Repair",
    assignedDate: "2023-04-12",
    avatar: "https://i.pravatar.cc/50?img=15"
  },
  {
    id: 6,
    employee: "William Wilson",
    asset: "Logitech Mouse",
    category: "Peripheral",
    serial: "SN99001",
    status: "Assigned",
    assignedDate: "2023-05-18",
    avatar: "https://i.pravatar.cc/50?img=16"
  },
  {
    id: 7,
    employee: "Jessica Taylor",
    asset: "External HDD",
    category: "Storage",
    serial: "SN22334",
    status: "Returned",
    assignedDate: "2023-06-22",
    avatar: "https://i.pravatar.cc/50?img=17"
  },
  {
    id: 8,
    employee: "David Anderson",
    asset: "iPad Air",
    category: "Tablet",
    serial: "SN55667",
    status: "Damaged",
    assignedDate: "2023-07-30",
    avatar: "https://i.pravatar.cc/50?img=18"
  },
  {
    id: 9,
    employee: "Linda Thomas",
    asset: "HP EliteBook",
    category: "Laptop",
    serial: "SN88990",
    status: "Assigned",
    assignedDate: "2023-08-14",
    avatar: "https://i.pravatar.cc/50?img=19"
  },
  {
    id: 10,
    employee: "James Jackson",
    asset: "Android Phone",
    category: "Mobile",
    serial: "SN11122",
    status: "Assigned",
    assignedDate: "2023-09-01",
    avatar: "https://i.pravatar.cc/50?img=20"
  },
  {
    id: 11,
    employee: "Sophia Lee",
    asset: "Dell Latitude",
    category: "Laptop",
    serial: "SN45678",
    status: "Assigned",
    assignedDate: "2023-10-12",
    avatar: "https://i.pravatar.cc/50?img=21"
  },
  {
    id: 12,
    employee: "Chris Martin",
    asset: "Apple Watch",
    category: "Mobile",
    serial: "SN88911",
    status: "Returned",
    assignedDate: "2023-11-05",
    avatar: "https://i.pravatar.cc/50?img=22"
  }
];

const defaultColumns = {
  employee: true,
  asset: true,
  category: true,
  serial: true,
  status: true,
  assignedDate: true,
  actions: true
};

const emptyForm = {
  id: null,
  employee: "",
  asset: "",
  category: "",
  serial: "",
  status: "",
  assignedDate: ""
};

const EmployeeAssets = () => {

  const [assets, setAssets] = useState(dummyEmployees);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [selectedRows, setSelectedRows] = useState([]);

  const [selectAll, setSelectAll] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const [showAdd, setShowAdd] = useState(false);

  const [showColumns, setShowColumns] = useState(false);

  const [formData, setFormData] = useState(emptyForm);

  const [visibleColumns, setVisibleColumns] = useState(defaultColumns);

  const filteredAssets = useMemo(() => {

    return assets.filter((item) => {

      const value = search.toLowerCase();

      return (
        item.employee.toLowerCase().includes(value) ||
        item.asset.toLowerCase().includes(value) ||
        item.category.toLowerCase().includes(value) ||
        item.serial.toLowerCase().includes(value) ||
        item.status.toLowerCase().includes(value)
      );

    });

  }, [assets, search]);

  const totalPages = Math.ceil(
    filteredAssets.length / itemsPerPage
  );

  const paginatedAssets = useMemo(() => {

    const start =
      (currentPage - 1) * itemsPerPage;

    return filteredAssets.slice(
      start,
      start + itemsPerPage
    );

  }, [
    filteredAssets,
    currentPage,
    itemsPerPage
  ]);

  useEffect(() => {
    setSelectAll(
      paginatedAssets.length > 0 &&
      paginatedAssets.every((a) =>
        selectedRows.includes(a.id)
      )
    );
  }, [selectedRows, paginatedAssets]);

  const handleRowCheck = (id) => {

    if (selectedRows.includes(id)) {

      setSelectedRows(
        selectedRows.filter((x) => x !== id)
      );

    } else {

      setSelectedRows([
        ...selectedRows,
        id
      ]);

    }

  };

  const handleSelectAll = () => {

    if (selectAll) {

      setSelectedRows([]);

    } else {

      setSelectedRows(
        paginatedAssets.map((x) => x.id)
      );

    }

    setSelectAll(!selectAll);

  };

    const handleEdit = (row) => {
    setFormData(row);
    setShowEdit(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this asset?")) {
      setAssets((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleRefresh = () => {
    setAssets(dummyEmployees);
    setSearch("");
    setCurrentPage(1);
    setSelectedRows([]);
    setSelectAll(false);
  };

  const handleDownload = () => {
    const headers = [
      "Employee",
      "Asset",
      "Category",
      "Serial",
      "Status",
      "Assigned Date",
    ];

    const rows = assets.map((item) => [
      item.employee,
      item.asset,
      item.category,
      item.serial,
      item.status,
      item.assignedDate,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "EmployeeAssets.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    if (showEdit) {
      setAssets((prev) =>
        prev.map((item) =>
          item.id === formData.id ? formData : item
        )
      );

      setShowEdit(false);
    } else {
      setAssets((prev) => [
        {
          ...formData,
          id: Date.now(),
          avatar: "https://i.pravatar.cc/50",
        },
        ...prev,
      ]);

      setShowAdd(false);
    }

    setFormData(emptyForm);
  };

  return (
    <div className="employee-assets-page">

      <div className="page-top">

        <h2>Employee Assets</h2>

        <div className="breadcrumb">
          Home &gt; Employees &gt; Assets
        </div>

      </div>

      <div className="assets-card">

        <div className="toolbar">

          <div className="toolbar-left">

            <h3>Employee Assets</h3>

            <div className="search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          <div className="toolbar-right">

            <button
              onClick={() =>
                setShowColumns(true)
              }
            >
              <FaFilter />
            </button>

            <button
              onClick={() => {
                setFormData(emptyForm);
                setShowAdd(true);
              }}
            >
              <FaPlusCircle />
            </button>

            <button
              onClick={handleRefresh}
            >
              <FaSyncAlt />
            </button>

            <button
              onClick={handleDownload}
            >
              <FaDownload />
            </button>

          </div>

        </div>

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>

                <th>

                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />

                </th>

                {visibleColumns.employee && (
                  <th>Employee Name</th>
                )}

                {visibleColumns.asset && (
                  <th>Asset Name</th>
                )}

                {visibleColumns.category && (
                  <th>Category</th>
                )}

                {visibleColumns.serial && (
                  <th>Serial Number</th>
                )}

                {visibleColumns.status && (
                  <th>Status</th>
                )}

                {visibleColumns.assignedDate && (
                  <th>Assigned Date</th>
                )}

                {visibleColumns.actions && (
                  <th>Actions</th>
                )}

              </tr>

            </thead>

            <tbody>

              {paginatedAssets.map((item) => (

                <tr key={item.id}>

                  <td>

                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() =>
                        handleRowCheck(item.id)
                      }
                    />

                  </td>

                  {visibleColumns.employee && (

                    <td>

                      <div className="employee-cell">

                        <img
                          src={item.avatar}
                          alt=""
                        />

                        {item.employee}

                      </div>

                    </td>

                  )}

                  {visibleColumns.asset && (
                    <td>{item.asset}</td>
                  )}

                  {visibleColumns.category && (
                    <td>{item.category}</td>
                  )}

                  {visibleColumns.serial && (
                    <td>{item.serial}</td>
                  )}

                  {visibleColumns.status && (

                    <td>

                      <span
                        className={`status ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>

                    </td>

                  )}

                  {visibleColumns.assignedDate && (

                    <td>

                      <FaCalendarAlt />

                      {" "}

                      {item.assignedDate}

                    </td>

                  )}

                  {visibleColumns.actions && (

                    <td className="action-buttons">

                      <button
                        onClick={() =>
                          handleEdit(item)
                        }
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >
                        <FaTrash />
                      </button>

                    </td>

                  )}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

                {/* ================= Pagination ================= */}

        <div className="pagination-wrapper">

          <div className="pagination-left">

            <span>Items per page</span>

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>

          </div>

          <div className="pagination-right">

            <span className="page-info">

              {filteredAssets.length === 0
                ? "0-0 of 0"
                : `${(currentPage - 1) * itemsPerPage + 1}
                 -
                 ${Math.min(
                   currentPage * itemsPerPage,
                   filteredAssets.length
                 )}
                 of ${filteredAssets.length}`}

            </span>

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              <FaAngleDoubleLeft />
            </button>

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
            >
              <FaChevronLeft />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => (

                <button
                  key={index}
                  className={
                    currentPage === index + 1
                      ? "active-page"
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                >
                  {index + 1}
                </button>

              )
            )}

            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
            >
              <FaChevronRight />
            </button>

            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(totalPages)
              }
            >
              <FaAngleDoubleRight />
            </button>

          </div>

        </div>

      </div>

      {/* ================= Edit Modal ================= */}

      {showEdit && (

        <div className="modal-overlay">

          <div className="asset-modal">

            <div className="modal-header">

              <h3>Edit Asset</h3>

              <button
                onClick={() =>
                  setShowEdit(false)
                }
              >
                <FaTimes />
              </button>

            </div>

            <div className="modal-body">

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Employee Name
                  </label>

                  <input
                    type="text"
                    value={formData.employee}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        employee:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Asset Name
                  </label>

                  <input
                    type="text"
                    value={formData.asset}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        asset:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Category
                  </label>

                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category:
                          e.target.value,
                      })
                    }
                  >

                    {categoryOptions.map(
                      (item) => (

                        <option
                          key={item}
                        >
                          {item}
                        </option>

                      )
                    )}

                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Serial Number
                  </label>

                  <input
                    type="text"
                    value={formData.serial}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        serial:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Status
                  </label>

                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status:
                          e.target.value,
                      })
                    }
                  >

                    {statusOptions.map(
                      (item) => (

                        <option
                          key={item}
                        >
                          {item}
                        </option>

                      )
                    )}

                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Assigned Date
                  </label>

                  <input
                    type="date"
                    value={
                      formData.assignedDate
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assignedDate:
                          e.target.value,
                      })
                    }
                  />

                </div>

              </div>

            </div>

            <div className="modal-footer">

              <button
                className="cancel-btn"
                onClick={() => {
                  setShowEdit(false);
                  setFormData(emptyForm);
                }}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

            {/* ===========================
          ADD ASSET MODAL
      ============================ */}

      {showAdd && (
        <div className="modal-overlay">
          <div className="asset-modal">

            <div className="modal-header">
              <h3>Add Employee Asset</h3>

              <button
                className="close-btn"
                onClick={() => {
                  setShowAdd(false);
                  setFormData(emptyForm);
                }}
              >
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">

              <div className="form-grid">

                <div className="form-group">
                  <label>Employee Name</label>

                  <input
                    type="text"
                    placeholder="Enter employee name"
                    value={formData.employee}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        employee: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Asset Name</label>

                  <input
                    type="text"
                    placeholder="Enter asset"
                    value={formData.asset}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        asset: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Asset Category</label>

                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="">Select</option>

                    {categoryOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Serial Number</label>

                  <input
                    type="text"
                    placeholder="Serial Number"
                    value={formData.serial}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        serial: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="">Select</option>

                    {statusOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Assigned Date</label>

                  <input
                    type="date"
                    value={formData.assignedDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assignedDate: e.target.value,
                      })
                    }
                  />
                </div>

              </div>

            </div>

            <div className="modal-footer">

              <button
                className="cancel-btn"
                onClick={() => {
                  setShowAdd(false);
                  setFormData(emptyForm);
                }}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ===========================
          SHOW / HIDE COLUMN MODAL
      ============================ */}

      {showColumns && (
        <div className="modal-overlay">

          <div className="column-modal">

            <div className="modal-header">

              <h3>Show / Hide Columns</h3>

              <button
                className="close-btn"
                onClick={() => setShowColumns(false)}
              >
                <FaTimes />
              </button>

            </div>

            <div className="column-list">

              {Object.keys(visibleColumns).map((key) => (

                <label
                  className="column-item"
                  key={key}
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns[key]}
                    onChange={() =>
                      setVisibleColumns({
                        ...visibleColumns,
                        [key]:
                          !visibleColumns[key],
                      })
                    }
                  />

                  <span>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (s) =>
                        s.toUpperCase()
                      )}
                  </span>

                </label>

              ))}

            </div>

            <div className="modal-footer">

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowColumns(false)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default EmployeeAssets; 