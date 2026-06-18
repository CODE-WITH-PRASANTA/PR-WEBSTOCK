import React, { useState } from "react";
import "./Table.css";

import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaMoon,
  FaSun,
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
  {
    id: 2,
    name: "Amit Das",
    address: "Cuttack",
    phone: "9123456780",
    message: "Looking for SEO services.",
    date: "17 Jun 2026",
  },
  {
    id: 3,
    name: "Priya Sharma",
    address: "Puri",
    phone: "9988776655",
    message: "Need digital marketing.",
    date: "16 Jun 2026",
  },
  {
    id: 4,
    name: "Rakesh Mohanty",
    address: "Balasore",
    phone: "9871234567",
    message: "Website redesign project.",
    date: "15 Jun 2026",
  },
  {
    id: 5,
    name: "Suresh Patel",
    address: "Mumbai",
    phone: "9876541230",
    message: "Need ecommerce website.",
    date: "14 Jun 2026",
  },
  {
    id: 6,
    name: "Anjali Verma",
    address: "Delhi",
    phone: "9874561230",
    message: "SEO optimization service.",
    date: "13 Jun 2026",
  },
  {
    id: 7,
    name: "Rohan Singh",
    address: "Kolkata",
    phone: "9998887776",
    message: "Logo design project.",
    date: "12 Jun 2026",
  },
  {
    id: 8,
    name: "Pooja Das",
    address: "Chennai",
    phone: "9876547890",
    message: "Mobile app development.",
    date: "11 Jun 2026",
  },
  {
    id: 9,
    name: "Arjun Roy",
    address: "Hyderabad",
    phone: "9871112223",
    message: "Landing page design.",
    date: "10 Jun 2026",
  },
  {
    id: 10,
    name: "Sneha Gupta",
    address: "Lucknow",
    phone: "9873334445",
    message: "Need digital marketing.",
    date: "09 Jun 2026",
  },
  {
    id: 11,
    name: "Deepak Jain",
    address: "Jaipur",
    phone: "9875556667",
    message: "Website maintenance.",
    date: "08 Jun 2026",
  },
  {
    id: 12,
    name: "Karan Mehta",
    address: "Ahmedabad",
    phone: "9877778889",
    message: "Corporate website.",
    date: "07 Jun 2026",
  },
  {
    id: 13,
    name: "Neha Sharma",
    address: "Pune",
    phone: "9874445556",
    message: "Social media marketing.",
    date: "06 Jun 2026",
  },
  {
    id: 14,
    name: "Vikas Sahu",
    address: "Ranchi",
    phone: "9878889990",
    message: "SEO consultation.",
    date: "05 Jun 2026",
  },
  {
    id: 15,
    name: "Ankit Mishra",
    address: "Patna",
    phone: "9871114445",
    message: "Business website redesign.",
    date: "04 Jun 2026",
  },
  {
    id: 16,
    name: "Tina Roy",
    address: "Nagpur",
    phone: "9872223334",
    message: "React web application.",
    date: "03 Jun 2026",
  },
  {
    id: 17,
    name: "Raj Patel",
    address: "Surat",
    phone: "9876667778",
    message: "Custom software project.",
    date: "02 Jun 2026",
  },
  {
    id: 18,
    name: "Monika Das",
    address: "Bhopal",
    phone: "9877771234",
    message: "UI/UX design service.",
    date: "01 Jun 2026",
  },
  {
    id: 19,
    name: "Akash Rout",
    address: "Sambalpur",
    phone: "9871239876",
    message: "Need company website.",
    date: "31 May 2026",
  },
  {
    id: 20,
    name: "Sanjay Kumar",
    address: "Rourkela",
    phone: "9878881234",
    message: "Digital branding.",
    date: "30 May 2026",
  },
];

const Table = () => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

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
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (item) => {
    setEditing(item.id);

    setForm({
      name: item.name,
      address: item.address,
      phone: item.phone,
      message: item.message,
    });
  };

  const handleSave = () => {
    setData(
      data.map((item) =>
        item.id === editing
          ? {
              ...item,
              name: form.name,
              address: form.address,
              phone: form.phone,
              message: form.message,
            }
          : item
      )
    );

    setEditing(null);
  };

  return (
    <div className={`table-page ${darkMode ? "dark-theme" : ""}`}>
      <div className="table-header">
        <h2>Enquiry List</h2>

        <div className="header-right">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search enquiry..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

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
                <td colSpan="7" className="no-data">
                  No Enquiry Found
                </td>
              </tr>
            ) : (
              currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>{item.message}</td>
                  <td>{item.date}</td>

                  <td className="action-cell">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((prev) => prev - 1)
          }
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={
              currentPage === index + 1
                ? "active-page"
                : ""
            }
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => prev + 1)
          }
        >
          Next
        </button>
      </div>

      {editing && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <button
              className="close-btn"
              onClick={() => setEditing(null)}
            >
              <FaTimes />
            </button>

            <h2>Edit Enquiry</h2>

            <input
              type="text"
              value={form.name}
              placeholder="Name"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <input
              type="text"
              value={form.address}
              placeholder="Address"
              onChange={(e) =>
                setForm({
                  ...form,
                  address: e.target.value,
                })
              }
            />

            <input
              type="text"
              value={form.phone}
              placeholder="Phone"
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />

            <textarea
              rows="4"
              value={form.message}
              placeholder="Message"
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
            />

            <button
              className="save-btn"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;