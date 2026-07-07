import React, { useMemo, useState, useEffect, useRef } from "react";
import "./Support.css";

import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiRefreshCw,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiMail,
} from "react-icons/fi";

const Support = () => {
  // ===========================
  // Dummy Data
  // ===========================

  const supportData = [
    {
      id: 1,
      avatar: "https://i.pravatar.cc/150?img=32",
      name: "Tim Hank",
      email: "test@example.com",
      subject: "Image not Proper",
      status: "closed",
      assigned: "John Deo",
      date: "27/05/2016",
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/150?img=12",
      name: "Tim Hank",
      email: "test@example.com",
      subject: "Image not Proper",
      status: "closed",
      assigned: "John Deo",
      date: "27/05/2016",
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/150?img=21",
      name: "Tim Hank",
      email: "test@example.com",
      subject: "Image not Proper",
      status: "open",
      assigned: "John Deo",
      date: "27/05/2016",
    },
    {
      id: 4,
      avatar: "https://i.pravatar.cc/150?img=45",
      name: "Tim Hank",
      email: "test@example.com",
      subject: "Image not Proper",
      status: "closed",
      assigned: "John Deo",
      date: "27/05/2016",
    },
    {
      id: 5,
      avatar: "https://i.pravatar.cc/150?img=55",
      name: "Tim Hank",
      email: "test@example.com",
      subject: "Image not Proper",
      status: "open",
      assigned: "John Deo",
      date: "27/05/2016",
    },
    {
      id: 6,
      avatar: "https://i.pravatar.cc/150?img=62",
      name: "James Smith",
      email: "james@gmail.com",
      subject: "Unable to Login",
      status: "closed",
      assigned: "David",
      date: "15/03/2025",
    },
    {
      id: 7,
      avatar: "https://i.pravatar.cc/150?img=18",
      name: "Sophia",
      email: "sophia@gmail.com",
      subject: "Payment Issue",
      status: "open",
      assigned: "Mark",
      date: "11/06/2025",
    },
    {
      id: 8,
      avatar: "https://i.pravatar.cc/150?img=60",
      name: "Andrew",
      email: "andrew@gmail.com",
      subject: "Profile Update",
      status: "closed",
      assigned: "John Deo",
      date: "01/04/2025",
    },
  ];

  // ===========================
  // States
  // ===========================

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [selectedRows, setSelectedRows] = useState([]);

  const [showColumns, setShowColumns] = useState(false);

  const columnRef = useRef();

  // ===========================
  // Columns
  // ===========================

  const [columns, setColumns] = useState({
    checkbox: true,
    name: true,
    email: true,
    subject: true,
    status: true,
    assigned: true,
    date: true,
  });

  // ===========================
  // Close Column Menu
  // ===========================

  useEffect(() => {
    const handler = (e) => {
      if (
        columnRef.current &&
        !columnRef.current.contains(e.target)
      ) {
        setShowColumns(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () =>
      document.removeEventListener("mousedown", handler);
  }, []);

  // ===========================
  // Search
  // ===========================

  const filteredData = useMemo(() => {
    return supportData.filter((item) => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.subject.toLowerCase().includes(search.toLowerCase()) ||
        item.assigned.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [search]);

  // ===========================
  // Pagination
  // ===========================

  const totalPages = Math.ceil(
    filteredData.length / itemsPerPage
  );

  const currentData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // ===========================
  // Select All
  // ===========================

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentData.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  // ===========================
  // Select Row
  // ===========================

  const handleSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(
        selectedRows.filter((item) => item !== id)
      );
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // ===========================
  // Column Toggle
  // ===========================

  const toggleColumn = (key) => {
    setColumns({
      ...columns,
      [key]: !columns[key],
    });
  };

  return (
    <div className="Support">

      {/* ================= Header ================= */}

      <div className="Support-header">

        <div>

          <h2>Support</h2>

          <p>
            Home
            <span>/</span>
            Apps
            <span>/</span>
            Support
          </p>

        </div>

      </div>

      {/* ================= Card ================= */}

      <div className="Support-card">

        {/* Toolbar */}

        <div className="Support-toolbar">

          <div className="Support-search">

            <FiSearch />

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="Support-toolbar-right">

            {/* Show Hide */}

            <div
              className="Support-action"
              ref={columnRef}
            >

              <button
                className="Support-icon-btn"
                onClick={() =>
                  setShowColumns(!showColumns)
                }
              >
                <FiFilter />
              </button>

              <span className="Support-tooltip">
                Show/Hide Column
              </span>

              {showColumns && (
                <div className="Support-column-menu">

                  <h4>Show/Hide Column</h4>

                  <label>
                    <input
                      type="checkbox"
                      checked={columns.checkbox}
                      onChange={() =>
                        toggleColumn("checkbox")
                      }
                    />
                    Checkbox
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={columns.name}
                      onChange={() =>
                        toggleColumn("name")
                      }
                    />
                    Name
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={columns.email}
                      onChange={() =>
                        toggleColumn("email")
                      }
                    />
                    Email
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={columns.subject}
                      onChange={() =>
                        toggleColumn("subject")
                      }
                    />
                    Subject
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={columns.status}
                      onChange={() =>
                        toggleColumn("status")
                      }
                    />
                    Status
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={columns.assigned}
                      onChange={() =>
                        toggleColumn("assigned")
                      }
                    />
                    Assigned To
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={columns.date}
                      onChange={() =>
                        toggleColumn("date")
                      }
                    />
                    Date
                  </label>

                </div>
              )}

            </div>

            {/* Refresh */}

            <div className="Support-action">

              <button className="Support-icon-btn">
                <FiRefreshCw />
              </button>

              <span className="Support-tooltip">
                Refresh
              </span>

            </div>

            {/* Download */}

            <div className="Support-action">

              <button className="Support-icon-btn">
                <FiDownload />
              </button>

              <span className="Support-tooltip">
                Download
              </span>

            </div>

            {/* Add */}

            <div className="Support-action">

              <span className="Support-tooltip">
                Add Support
              </span>

            </div>

          </div>

        </div>

                {/* ================= Table ================= */}

        <div className="Support-table-wrapper">

          <table className="Support-table">

            <thead>

              <tr>

                {columns.checkbox && (
                  <th className="Support-checkbox-column">

                    <input
                      type="checkbox"
                      checked={
                        currentData.length > 0 &&
                        selectedRows.length === currentData.length
                      }
                      onChange={handleSelectAll}
                    />

                  </th>
                )}

                {columns.name && <th>Name</th>}

                {columns.email && <th>Email</th>}

                {columns.subject && <th>Subject</th>}

                {columns.status && <th>Status</th>}

                {columns.assigned && <th>Assigned To</th>}

                {columns.date && <th>Date</th>}

              </tr>

            </thead>

            <tbody>

              {currentData.map((item) => (

                <tr key={item.id}>

                  {/* Checkbox */}

                  {columns.checkbox && (

                    <td>

                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => handleSelect(item.id)}
                      />

                    </td>

                  )}

                  {/* Name */}

                  {columns.name && (

                    <td>

                      <div className="Support-user">

                        <img
                          src={item.avatar}
                          alt={item.name}
                        />

                        <span
                          className="Support-hover-text"
                          data-tooltip={item.name}
                        >
                          {item.name}
                        </span>

                      </div>

                    </td>

                  )}

                  {/* Email */}

                  {columns.email && (

                    <td>

                      <div className="Support-email">

                        <FiMail />

                        <span
                          className="Support-hover-text"
                          data-tooltip={item.email}
                        >
                          {item.email}
                        </span>

                      </div>

                    </td>

                  )}

                  {/* Subject */}

                  {columns.subject && (

                    <td>{item.subject}</td>

                  )}

                  {/* Status */}

                  {columns.status && (

                    <td>

                      <span
                        className={
                          item.status === "open"
                            ? "Support-status-open"
                            : "Support-status-closed"
                        }
                      >
                        {item.status}
                      </span>

                    </td>

                  )}

                  {/* Assigned */}

                  {columns.assigned && (

                    <td>{item.assigned}</td>

                  )}

                  {/* Date */}

                  {columns.date && (

                    <td>{item.date}</td>

                  )}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* ================= Footer ================= */}

        <div className="Support-footer">

          <div className="Support-footer-right">

            <span>Items per page:</span>

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >

              <option value={5}>5</option>

              <option value={10}>10</option>

              <option value={15}>15</option>

              <option value={20}>20</option>

            </select>

            <span>

              {(page - 1) * itemsPerPage + 1} -

              {Math.min(
                page * itemsPerPage,
                filteredData.length
              )}

              {" "}of{" "}

              {filteredData.length}

            </span>

            <button
              className="Support-page-btn"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <FiChevronLeft />
            </button>

            <button
              className="Support-page-btn"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <FiChevronRight />
            </button>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Support;