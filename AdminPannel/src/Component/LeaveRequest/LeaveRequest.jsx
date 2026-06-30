import React from "react";
import "./LeaveRequest.css";
import { FiCalendar, FiEye } from "react-icons/fi";

const leaveRequests = [
  {
    id: "ID7865",
    name: "Jens Brincker",
    image: "https://i.pravatar.cc/100?img=32",
    type: "Sick Leave",
    from: "05/22/2021",
    to: "05/27/2021",
    days: 6,
    status: "Approve",
  },
  {
    id: "ID9357",
    name: "Mark Harry",
    image: "https://i.pravatar.cc/100?img=12",
    type: "Casual Leave",
    from: "06/12/2021",
    to: "06/15/2021",
    days: 4,
    status: "Reject",
  },
  {
    id: "ID3987",
    name: "Anthony Davie",
    image: "https://i.pravatar.cc/100?img=47",
    type: "Marriage Leave",
    from: "02/02/2021",
    to: "02/12/2021",
    days: 6,
    status: "Pending",
  },
  {
    id: "ID2483",
    name: "David Perry",
    image: "https://i.pravatar.cc/100?img=15",
    type: "Maternity leave",
    from: "01/10/2021",
    to: "03/10/2021",
    days: 90,
    status: "Approve",
  },
  {
    id: "ID2986",
    name: "John Doe",
    image: "https://i.pravatar.cc/100?img=18",
    type: "Unpaid Leave",
    from: "05/20/2021",
    to: "05/22/2021",
    days: 3,
    status: "Reject",
  },
  {
    id: "ID1267",
    name: "Sarah Smith",
    image: "https://i.pravatar.cc/100?img=49",
    type: "Sick Leave",
    from: "07/10/2021",
    to: "07/11/2021",
    days: 2,
    status: "Approve",
  },
  {
    id: "ID3398",
    name: "Cara Stevens",
    image: "https://i.pravatar.cc/100?img=5",
    type: "Casual leave",
    from: "04/11/2021",
    to: "04/13/2021",
    days: 3,
    status: "Pending",
  },
];

const LeaveRequest = () => {
  return (
    <section className="LeaveRequest">
      <div className="LeaveRequest__card">
        {/* Header */}

        <div className="LeaveRequest__header">
          <h2>Leave Requests</h2>

          <button className="LeaveRequest__viewBtn">
            View All
          </button>
        </div>

        {/* Desktop Table */}

        <div className="LeaveRequest__tableWrapper">
          <table className="LeaveRequest__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>Leave From</th>
                <th>Leave To</th>
                <th>Days</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {leaveRequests.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>

                  <td>
                    <div className="LeaveRequest__employee">
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <span>{item.name}</span>
                    </div>
                  </td>

                  <td>{item.type}</td>

                  <td>
                    <div className="LeaveRequest__date">
                      <FiCalendar />
                      {item.from}
                    </div>
                  </td>

                  <td>
                    <div className="LeaveRequest__date">
                      <FiCalendar />
                      {item.to}
                    </div>
                  </td>

                  <td>{item.days}</td>

                  <td>
                    <span
                      className={`LeaveRequest__status LeaveRequest__status--${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <button className="LeaveRequest__detailsBtn">
                      <FiEye />
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}

        <div className="LeaveRequest__mobile">
          {leaveRequests.map((item) => (
            <div
              className="LeaveRequest__mobileCard"
              key={item.id}
            >
              <div className="LeaveRequest__mobileTop">
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <h3>{item.name}</h3>
                  <span>{item.id}</span>
                </div>

                <div
                  className={`LeaveRequest__status LeaveRequest__status--${item.status.toLowerCase()}`}
                >
                  {item.status}
                </div>
              </div>

              <div className="LeaveRequest__mobileBody">
                <div>
                  <strong>Leave Type</strong>
                  <span>{item.type}</span>
                </div>

                <div>
                  <strong>Days</strong>
                  <span>{item.days}</span>
                </div>

                <div>
                  <strong>Leave From</strong>
                  <span>
                    <FiCalendar />
                    {item.from}
                  </span>
                </div>

                <div>
                  <strong>Leave To</strong>
                  <span>
                    <FiCalendar />
                    {item.to}
                  </span>
                </div>
              </div>

              <button className="LeaveRequest__detailsBtn LeaveRequest__mobileBtn">
                <FiEye />
                Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeaveRequest;