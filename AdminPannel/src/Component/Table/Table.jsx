import React, { useState } from "react";
import "./Table.css";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaPlus,
} from "react-icons/fa";

const initialData = [
  {
    id: 1,
    name: "Rahul Kumar",
    address: "Bhubaneswar",
    phone: "9876543210",
    message: "Need a responsive business website.",
    date: "18 Jun 2026",
  },
];

const Table = () => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    message: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = data.filter((item) =>
    `${item.name} ${item.address} ${item.phone} ${item.message}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(
    filteredData.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDelete = (id) => {
    if (window.confirm("Delete this enquiry?")) {
      setData((prev) =>
        prev.filter((item) => item.id !== id)
      );
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setForm({
      name: item.name,
      address: item.address,
      phone: item.phone,
      message: item.message,
    });

    setShowModal(true);
  };

  const handleSubmit = () => {
    if (
      !form.name ||
      !form.address ||
      !form.phone ||
      !form.message
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, ...form }
            : item
        )
      );
    } else {
      const newData = {
        id: Date.now(),
        ...form,
        date: new Date().toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        ),
      };

      setData((prev) => [newData, ...prev]);
    }

    setForm({
      name: "",
      address: "",
      phone: "",
      message: "",
    });

    setEditingId(null);
    setShowModal(false);
  };

  const openModal = () => {
    setEditingId(null);

    setForm({
      name: "",
      address: "",
      phone: "",
      message: "",
    });

    setShowModal(true);
  };

  return (
    <div className="table-page dark-theme">
      {/* Header */}
      <div className="table-header">
        <h2>Enquiry List</h2>

        <div className="header-right">
          <div className="search-box">
            <FaSearch />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <button
            className="add-btn"
            onClick={openModal}
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="no-data"
                >
                  No Enquiry Found
                </td>
              </tr>
            ) : (
              currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    {startIndex + index + 1}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>{item.message}</td>
                  <td>{item.date}</td>

                  <td className="action-cell">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(item)
                      }
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(item.id)
                      }
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
          >
            Prev
          </button>

          {[...Array(totalPages)].map(
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
            Next
          </button>
        </div>
      )}

      {/* Popup */}
      {showModal && (
        <div className="popup-overlay">
          <div className="popup-form">
            <button
              className="popup-close"
              onClick={() =>
                setShowModal(false)
              }
            >
              <FaTimes />
            </button>

            <h2 className="popup-title">
              {editingId
                ? "Edit Enquiry"
                : "Contact Us"}
            </h2>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Address / City</label>
              <input
                type="text"
                placeholder="Enter your city"
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Project Details</label>
              <textarea
                placeholder="Tell us about your project..."
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
              />
            </div>

            <button
              className="submit-btn"
              onClick={handleSubmit}
            >
              {editingId
                ? "Update"
                : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;