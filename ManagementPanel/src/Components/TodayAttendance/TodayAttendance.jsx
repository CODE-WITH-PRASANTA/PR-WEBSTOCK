import React, { useState } from "react";
import "./TodayAttendance.css";

import {
  FiHome,
  FiSearch,
  FiFilter,
  FiRefreshCcw,
  FiDownload,
  FiEdit2,
  FiTrash2,
  FiPlusCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const TodayAttendance = () => {

  const attendanceData = [
    {
      id: 1,
      image: "https://i.pravatar.cc/40?img=1",
      name: "John Doe",
      firstIn: "09:00 AM",
      break: "01:00 PM",
      lastOut: "06:00 PM",
      hours: "8h 00m",
      status: "Present",
      shift: "General",
    },
    {
      id: 2,
      image: "https://i.pravatar.cc/40?img=2",
      name: "Robert John",
      firstIn: "08:30 AM",
      break: "12:30 PM",
      lastOut: "05:30 PM",
      hours: "8h 00m",
      status: "Present",
      shift: "Early",
    },
    {
      id: 3,
      image: "https://i.pravatar.cc/40?img=3",
      name: "Maria Garcia",
      firstIn: "10:00 AM",
      break: "02:00 PM",
      lastOut: "07:00 PM",
      hours: "8h 00m",
      status: "Present",
      shift: "Late",
    },
    {
      id: 4,
      image: "https://i.pravatar.cc/40?img=4",
      name: "James Taylor",
      firstIn: "09:05 AM",
      break: "01:00 PM",
      lastOut: "06:05 PM",
      hours: "8h 00m",
      status: "Present",
      shift: "General",
    },
    {
      id: 5,
      image: "https://i.pravatar.cc/40?img=5",
      name: "Michael David",
      firstIn: "08:00 AM",
      break: "12:00 PM",
      lastOut: "04:00 PM",
      hours: "8h 00m",
      status: "Present",
      shift: "Early",
    },
    {
      id: 6,
      image: "https://i.pravatar.cc/40?img=6",
      name: "William Clark",
      firstIn: "09:00 AM",
      break: "01:00 PM",
      lastOut: "06:00 PM",
      hours: "8h 00m",
      status: "Present",
      shift: "General",
    },
    {
      id: 7,
      image: "https://i.pravatar.cc/40?img=7",
      name: "Sarah Smith",
      firstIn: "09:15 AM",
      break: "01:00 PM",
      lastOut: "06:15 PM",
      hours: "8h 00m",
      status: "Late",
      shift: "General",
    },
    {
      id: 8,
      image: "https://i.pravatar.cc/40?img=8",
      name: "Patricia Brown",
      firstIn: "09:30 AM",
      break: "01:30 PM",
      lastOut: "06:30 PM",
      hours: "8h 00m",
      status: "Late",
      shift: "General",
    },
    {
      id: 9,
      image: "https://i.pravatar.cc/40?img=9",
      name: "Jennifer Lee",
      firstIn: "10:15 AM",
      break: "02:15 PM",
      lastOut: "07:15 PM",
      hours: "8h 00m",
      status: "Late",
      shift: "Late",
    },
    {
      id: 10,
      image: "https://i.pravatar.cc/40?img=10",
      name: "David Miller",
      firstIn: "09:00 AM",
      break: "01:00 PM",
      lastOut: "02:00 PM",
      hours: "4h 00m",
      status: "Half Day",
      shift: "General",
    },
    {
  id: 11,
  image: "https://i.pravatar.cc/40?img=11",
  name: "Emily Wilson",
  firstIn: "08:45 AM",
  break: "12:45 PM",
  lastOut: "05:45 PM",
  hours: "8h 00m",
  status: "Present",
  shift: "Morning",
},
{
  id: 12,
  image: "https://i.pravatar.cc/40?img=12",
  name: "Daniel Anderson",
  firstIn: "09:20 AM",
  break: "01:15 PM",
  lastOut: "06:20 PM",
  hours: "8h 00m",
  status: "Late",
  shift: "General",
},
{
  id: 13,
  image: "https://i.pravatar.cc/40?img=13",
  name: "Sophia Martinez",
  firstIn: "08:00 AM",
  break: "12:00 PM",
  lastOut: "05:00 PM",
  hours: "9h 00m",
  status: "Present",
  shift: "Early",
},
{
  id: 14,
  image: "https://i.pravatar.cc/40?img=14",
  name: "Christopher Evans",
  firstIn: "10:00 AM",
  break: "02:00 PM",
  lastOut: "03:00 PM",
  hours: "5h 00m",
  status: "Half Day",
  shift: "Late",
},
{
  id: 15,
  image: "https://i.pravatar.cc/40?img=15",
  name: "Olivia Johnson",
  firstIn: "09:10 AM",
  break: "01:10 PM",
  lastOut: "06:10 PM",
  hours: "8h 00m",
  status: "Present",
  shift: "General",
},
  ];

 // Search
const [search, setSearch] = useState("");
// Pagination
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);

const [selectAll, setSelectAll] = useState(false);

const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedEmployee, setSelectedEmployee] = useState(null);
// Filter Data
const filteredData = attendanceData.filter((emp) =>
  emp.name.toLowerCase().includes(search.toLowerCase())
);

// Pagination Logic
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const currentItems = filteredData.slice(
  indexOfFirstItem,
  indexOfLastItem
);

const totalPages = Math.ceil(filteredData.length / itemsPerPage);

// Status Badge
const getStatusClass = (status) => {
  if (status === "Present") return "TodayAttendance-status-present";
  if (status === "Late") return "TodayAttendance-status-late";
  return "TodayAttendance-status-half";
};

const handleDeleteClick = (employee, e) => {
  e.stopPropagation();

  setSelectedEmployee(employee);

  setShowDeleteModal(true);
};

const closeDeleteModal = () => {
  setShowDeleteModal(false);
  setSelectedEmployee(null);
};

const confirmDelete = () => {

  alert("Employee Deleted");

  setShowDeleteModal(false);

};
  return (
    <div className="TodayAttendance-container">

      {/* Breadcrumb */}

      <div className="TodayAttendance-page-header">

        <h2>Today Attendance</h2>

        <div className="TodayAttendance-breadcrumb">

          <FiHome />

          <span>Attendance</span>

          <span>/</span>

          <span>Today</span>

        </div>

      </div>

      {/* Card */}

      <div className="TodayAttendance-card">

        {/* Toolbar */}

        <div className="TodayAttendance-toolbar">

          <div className="TodayAttendance-left">

            <h4>Today Attendance</h4>

            <div className="TodayAttendance-search">

              <FiSearch />

              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </div>

          <div className="TodayAttendance-right">

            <button><FiFilter /></button>

            <button><FiPlusCircle /></button>

            <button><FiRefreshCcw /></button>

            <button><FiDownload /></button>

          </div>

        </div>

        {/* Table */}

        <div className="TodayAttendance-table-wrapper">

          <table className="TodayAttendance-table">

            <thead>

              <tr>

               <th>
               <input
                  type="checkbox"
                 checked={selectAll}
                   onChange={(e) => setSelectAll(e.target.checked)}
                     />
                 </th>
                <th>Employee Name</th>
                <th>First In</th>
                <th>Break</th>
                <th>Last Out</th>
                <th>Total Hours</th>
                <th>Status</th>
                <th>Shift</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {currentItems.map((item) => (

                <tr key={item.id}>

                  <td>
                   <input
                     type="checkbox"
                      checked={selectAll}
                       readOnly />  
                    </td>
                  <td>

                    <div className="TodayAttendance-employee">

                      <img src={item.image} alt={item.name} />

                      <span>{item.name}</span>

                    </div>

                  </td>
                  <td>{item.firstIn}</td>
                  <td>{item.break}</td>
                  <td>{item.lastOut}</td>
                  <td>{item.hours}</td>
                  <td>

                    <span className={getStatusClass(item.status)}>

                      {item.status}

                    </span>

                  </td>

                  <td>{item.shift}</td>

                  <td>
                    <div className="TodayAttendance-actions">
                      <button className="TodayAttendance-edit">
                        <FiEdit2 />
                      </button>
                      <button className="TodayAttendance-delete">
                        <FiTrash2 />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Footer */}

        <div className="TodayAttendance-footer">

  <div className="TodayAttendance-footer-left">

    <span>Items per page</span>

    <select
      className="TodayAttendance-page-select"
      value={itemsPerPage}
      onChange={(e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
      }}
    >
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={25}>25</option>
      <option value={100}>100</option>
    </select>

  </div>

  <div className="TodayAttendance-pagination">

  <span className="TodayAttendance-pagination-info">
    {filteredData.length === 0
      ? "0 - 0 of 0"
      : `${indexOfFirstItem + 1} - ${Math.min(
          indexOfLastItem,
          filteredData.length
        )} of ${filteredData.length}`}
  </span>

  <button
    className="TodayAttendance-page-btn"
    onClick={() => setCurrentPage((prev) => prev - 1)}
    disabled={currentPage === 1}
    title="Previous"
  >
    <FiChevronLeft />
  </button>

  <button
    className="TodayAttendance-page-btn"
    onClick={() => setCurrentPage((prev) => prev + 1)}
    disabled={currentPage === totalPages}
    title="Next"
  >
    <FiChevronRight />
  </button>

</div>

</div>
      </div>
    </div>
  );
};

export default TodayAttendance;