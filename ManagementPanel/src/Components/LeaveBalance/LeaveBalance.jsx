import React, { useState, useEffect, useRef } from "react";
import "./LeaveBalance.css";

import {
  FaSearch,
  FaPlusCircle,
  FaSyncAlt,
  FaDownload,
  FaTrash,
  FaEdit,
  FaEllipsisV,
  FaFilter,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const defaultColumns = {
  checkbox: true,
  employee: true,
  previous: true,
  current: true,
  total: true,
  used: true,
  accepted: true,
  rejected: true,
  expired: true,
  carry: true,
  action: true,
};

const dummyData = [
  {
    id: 1,
    image: "https://i.pravatar.cc/150?img=1",
    employee: "John Deo",
    previous: 10,
    current: 15,
    total: 25,
    used: 15,
    accepted: 10,
    rejected: 2,
    expired: 5,
    carry: 5,
  },
  {
    id: 2,
    image: "https://i.pravatar.cc/150?img=2",
    employee: "Sarah Smith",
    previous: 12,
    current: 13,
    total: 25,
    used: 14,
    accepted: 12,
    rejected: 1,
    expired: 3,
    carry: 4,
  },
  {
    id: 3,
    image: "https://i.pravatar.cc/150?img=3",
    employee: "Barbara Green",
    previous: 11,
    current: 14,
    total: 25,
    used: 16,
    accepted: 11,
    rejected: 3,
    expired: 2,
    carry: 7,
  },
  {
    id: 4,
    image: "https://i.pravatar.cc/150?img=4",
    employee: "Joseph Nye",
    previous: 9,
    current: 16,
    total: 25,
    used: 13,
    accepted: 10,
    rejected: 2,
    expired: 1,
    carry: 6,
  },
  {
    id: 5,
    image: "https://i.pravatar.cc/150?img=5",
    employee: "Marie Brown",
    previous: 15,
    current: 10,
    total: 25,
    used: 12,
    accepted: 9,
    rejected: 4,
    expired: 2,
    carry: 3,
  },
  {
    id: 6,
    image: "https://i.pravatar.cc/150?img=6",
    employee: "Ricardo White",
    previous: 10,
    current: 15,
    total: 25,
    used: 17,
    accepted: 13,
    rejected: 2,
    expired: 4,
    carry: 1,
  },
  {
    id: 7,
    image: "https://i.pravatar.cc/150?img=7",
    employee: "Shelia",
    previous: 10,
    current: 15,
    total: 25,
    used: 15,
    accepted: 10,
    rejected: 2,
    expired: 5,
    carry: 5,
  },
  {
    id: 8,
    image: "https://i.pravatar.cc/150?img=8",
    employee: "Kara Thomas",
    previous: 10,
    current: 15,
    total: 25,
    used: 15,
    accepted: 10,
    rejected: 2,
    expired: 5,
    carry: 5,
  },
];

const LeaveBalance = () => {
  const [tableData, setTableData] = useState(dummyData);

  const [search, setSearch] = useState("");

  const [selectedRows, setSelectedRows] = useState([]);

  const [columns, setColumns] = useState(defaultColumns);

  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const [editingData, setEditingData] = useState(null);

  const [page, setPage] = useState(1);

  const rowsPerPage = 10;

  const menuRef = useRef();

  useEffect(() => {
    const close = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShowColumnMenu(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () =>
      document.removeEventListener("mousedown", close);
  }, []);
  const filteredData = tableData.filter((item) =>
    item.employee.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentRows = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const handleCheckbox = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(
        selectedRows.filter((item) => item !== id)
      );
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  const handleSelectAll = () => {
    if (selectedRows.length === currentRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentRows.map((x) => x.id));
    }
  };
  const handleDeleteSelected = () => {
    setTableData(
      tableData.filter(
        (item) => !selectedRows.includes(item.id)
      )
    );
    setSelectedRows([]);
  };
  const handleDelete = (id) => {
    if (window.confirm("Delete this record?")) {
      setTableData(
        tableData.filter((item) => item.id !== id)
      );
    }
  };
  const handleEdit = (item) => {
    setEditingData(item);
    setShowPopup(true);
  };
  const handleRefresh = () => {
    setSearch("");
    setSelectedRows([]);
    setColumns(defaultColumns);
    setTableData(dummyData);
  };
  const handleDownload = () => {
    const headers = [
      "Employee",
      "Previous",
      "Current",
      "Total",
      "Used",
      "Accepted",
      "Rejected",
      "Expired",
      "Carry",
    ];
    const csv = [
      headers.join(","),
      ...tableData.map((item) =>
        [
          item.employee,
          item.previous,
          item.current,
          item.total,
          item.used,
          item.accepted,
          item.rejected,
          item.expired,
          item.carry,
        ].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], {
      type: "text/csv",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "LeaveBalance.csv";
    link.click();
  };
  const toggleColumn = (key) => {
    setColumns({
      ...columns,
      [key]: !columns[key],
    });
  };
  return (
    <div className="leaveBalance">
      {/* Header */}
      <div className="leaveBalance__header">
        <h2>Leave Balance</h2>
        <div className="leaveBalance__toolbar">
          <div className="leaveBalance__search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search Employee"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>
          {selectedRows.length > 0 && (
            <button
              className="leaveBalance__icon delete"
              onClick={handleDeleteSelected}
            >
              <FaTrash />
            </button>
          )}
          <div
            className="leaveBalance__menu"
            ref={menuRef}
          >
            <button
              className="leaveBalance__icon"
              onClick={() =>
                setShowColumnMenu(!showColumnMenu)
              }
            >
              <FaFilter />
            </button>
            {showColumnMenu && (
              <div className="leaveBalance__dropdown">
                <h4>Show / Hide Columns</h4>
                {Object.keys(columns).map((key) => (
                  <label key={key}>
                    <input
                      type="checkbox"
                      checked={columns[key]}
                      onChange={() =>
                        toggleColumn(key)
                      }
                    />
                    {key}
                  </label>
                ))}
              </div>
            )}
          </div>
          <button
            className="leaveBalance__icon add"
            onClick={() => {
              setEditingData(null);
              setShowPopup(true);
            }}
          >
            <FaPlusCircle />
          </button>
          <button
            className="leaveBalance__icon refresh"
            onClick={handleRefresh}
          >
            <FaSyncAlt />
          </button>
          <button
            className="leaveBalance__icon download"
            onClick={handleDownload}
          >
            <FaDownload />
          </button>
        </div>
      </div>
            {/* ===================== TABLE ===================== */}
      <div className="leaveBalance__tableWrapper">
        <table className="leaveBalance__table">
          <thead>
            <tr>
              {columns.checkbox && (
                <th>
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === currentRows.length &&
                      currentRows.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.employee && <th>Employee Name</th>}
              {columns.previous && <th>Previous Balance</th>}
              {columns.current && <th>Current Balance</th>}
              {columns.total && <th>Total Balance</th>}
              {columns.used && <th>Used Leave</th>}
              {columns.accepted && <th>Accepted Leave</th>}
              {columns.rejected && <th>Rejected Leave</th>}
              {columns.expired && <th>Expired Leave</th>}
              {columns.carry && <th>Carry Over</th>}
              {columns.action && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentRows.length === 0 ? (
              <tr>
                <td colSpan="12" className="leaveBalance__empty">
                  No Employee Found
                </td>
              </tr>
            ) : (
              currentRows.map((item) => (
                <tr key={item.id}>
                  {columns.checkbox && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() =>
                          handleCheckbox(item.id)
                        }
                      />
                    </td>
                  )}
                  {columns.employee && (
                    <td>
                      <div className="leaveBalance__employee">
                        <img
                          src={item.image}
                          alt={item.employee}
                        />
                        <span>{item.employee}</span>
                      </div>
                    </td>
                  )}
                  {columns.previous && (
                    <td>{item.previous}</td>
                  )}
                  {columns.current && (
                    <td>{item.current}</td>
                  )}
                  {columns.total && (
                    <td>{item.total}</td>
                  )}
                  {columns.used && (
                    <td>{item.used}</td>
                  )}
                  {columns.accepted && (
                    <td>{item.accepted}</td>
                  )}
                  {columns.rejected && (
                    <td>{item.rejected}</td>
                  )}
                  {columns.expired && (
                    <td>{item.expired}</td>
                  )}
                  {columns.carry && (
                    <td>{item.carry}</td>
                  )}
                  {columns.action && (
                    <td>
                      <div className="leaveBalance__actions">
                        <button
                          className="editBtn"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="deleteBtn"
                          onClick={() =>
                            handleDelete(item.id)
                          }
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* ===================== PAGINATION ===================== */}
      <div className="leaveBalance__pagination">
        <span>
          Showing{" "}
          {(page - 1) * rowsPerPage + 1}
          {" - "}
          {Math.min(
            page * rowsPerPage,
            filteredData.length
          )}{" "}
          of {filteredData.length}
        </span>
        <div className="leaveBalance__pageBtns">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <FaChevronLeft />
          </button>
          <span>{page}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      {/* ===================== POPUP ===================== */}
{showPopup && (
  <div className="leaveBalance__modal">
    <div className="leaveBalance__modalContent leaveBalance__modalLarge">

      {/* Header */}
      <div className="leaveBalance__popupHeader">

        <div className="leaveBalance__userInfo">
          <img
            src={
              editingData?.image ||
              "https://i.pravatar.cc/150?img=1"
            }
            alt="employee"
          />

          <h3>
            {editingData?.employee || "New Employee"}
          </h3>
        </div>

        <button
          className="closeBtn"
          onClick={() => setShowPopup(false)}
        >
          <FaTimes />
        </button>

      </div>

      <form className="leaveBalance__popupForm">

        <div className="leaveBalance__popupGrid">

          <div className="floatingField">
            <label>Name*</label>
            <input
              type="text"
              defaultValue={editingData?.employee || ""}
            />
          </div>

          <div className="floatingField">
            <label>Previous Balance*</label>
            <input
              type="number"
              defaultValue={editingData?.previous || ""}
            />
          </div>

          <div className="floatingField">
            <label>Current Balance*</label>
            <input
              type="number"
              defaultValue={editingData?.current || ""}
            />
          </div>

          <div className="floatingField">
            <label>Total Balance*</label>
            <input
              type="number"
              defaultValue={editingData?.total || ""}
            />
          </div>

          <div className="floatingField">
            <label>Used Balance*</label>
            <input
              type="number"
              defaultValue={editingData?.used || ""}
            />
          </div>

          <div className="floatingField">
            <label>Accepted*</label>
            <input
              type="number"
              defaultValue={editingData?.accepted || ""}
            />
          </div>

          <div className="floatingField">
            <label>Rejected*</label>
            <input
              type="number"
              defaultValue={editingData?.rejected || ""}
            />
          </div>

          <div className="floatingField">
            <label>Expired*</label>
            <input
              type="number"
              defaultValue={editingData?.expired || ""}
            />
          </div>

          <div className="floatingField">
            <label>Carry Over*</label>
            <input
              type="number"
              defaultValue={editingData?.carry || ""}
            />
          </div>

        </div>

        <div className="leaveBalance__popupButtons">

          <button
            type="submit"
            className="saveBtn"
          >
            Save
          </button>

          <button
            type="button"
            className="cancelBtn"
            onClick={() => setShowPopup(false)}
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
export default LeaveBalance;