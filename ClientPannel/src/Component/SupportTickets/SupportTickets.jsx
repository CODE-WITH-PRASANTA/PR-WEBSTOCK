import React from 'react';
import { IoArrowForwardOutline, IoEyeOutline } from 'react-icons/io5';
import { BiReset } from 'react-icons/bi';
import { BsArrowDownUp, BsExclamationCircle } from 'react-icons/bs';
import './SupportTickets.css';

const SupportTickets = () => {
  // Mock data matching the reference image exactly
  const tickets = [
    {
      id: 1,
      title: "Dashboard data not loading",
      description: "The dashboard charts are not displaying any data when logged in.",
      created: "Dec 15, 2023",
      updated: "Dec 16, 2023",
      status: "in-progress",
      priority: "medium"
    },
    {
      id: 2,
      title: "Feature request: Export to PDF",
      description: "Would like the ability to export reports to PDF format.",
      created: "Dec 10, 2023",
      updated: "Dec 10, 2023",
      status: "open",
      priority: "low"
    },
    {
      id: 3,
      title: "Mobile view display issues",
      description: "Tables are not displaying correctly on mobile devices.",
      created: "Dec 5, 2023",
      updated: "Dec 12, 2023",
      status: "resolved",
      priority: "medium"
    }
  ];

  const tasks = [
    {
      id: 1,
      taskName: "Test Mobile App Features",
      project: "Mobile App Development",
      dueDate: "Oct 18, 2023",
      priority: "High",
      status: "Not Started",
      assignedTo: "Michael Brown"
    },
    {
      id: 2,
      taskName: "Review Project Timeline",
      project: "CRM Implementation",
      dueDate: "Oct 12, 2023",
      priority: "Medium",
      status: "Under Review",
      assignedTo: "Sarah Wilson"
    },
    {
      id: 3,
      taskName: "Approve Budget Allocation",
      project: "Financial Planning",
      dueDate: "Oct 25, 2023",
      priority: "High",
      status: "Not Started",
      assignedTo: "David Lee"
    },
    {
      id: 4,
      taskName: "Sign Contract Documents",
      project: "Legal Compliance",
      dueDate: "Oct 10, 2023",
      priority: "High",
      status: "Completed",
      assignedTo: "Jennifer Taylor"
    }
  ];

  return (
    <div className="SupportTickets-container">
      {/* Left Column: Support Tickets */}
      <div className="SupportTickets-sidebar-card">
        <div className="SupportTickets-sidebar-header">
          <h2>Support Tickets</h2>
          <span className="SupportTickets-main-updated">Updated: Dec 18, 2023</span>
        </div>
        
        <div className="SupportTickets-list">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="SupportTickets-item-card">
              <div className="SupportTickets-item-header">
                <h3>{ticket.title}</h3>
                <div className="SupportTickets-badge-group">
                  <span className={`SupportTickets-badge status-${ticket.status}`}>
                    {ticket.status}
                  </span>
                  <span className={`SupportTickets-badge priority-${ticket.priority}`}>
                    {ticket.priority}
                  </span>
                </div>
              </div>
              <p className="SupportTickets-item-desc">{ticket.description}</p>
              
              <div className="SupportTickets-item-footer">
                <div className="SupportTickets-dates">
                  <div>Created: {ticket.created}</div>
                  <div>Updated: {ticket.updated}</div>
                </div>
                <button className="SupportTickets-action-btn-arrow">
                  <IoArrowForwardOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Your Tasks */}
      <div className="SupportTickets-main-card">
        <div className="SupportTickets-main-header">
          <h2>Your Tasks</h2>
          <div className="SupportTickets-filter-controls">
            <button className="SupportTickets-filter-btn">
              <BsArrowDownUp className="SupportTickets-icon-shift" /> Status
            </button>
            <button className="SupportTickets-filter-btn">
              <BsExclamationCircle className="SupportTickets-icon-shift" /> Priority
            </button>
          </div>
        </div>

        <div className="SupportTickets-table-wrapper">
          <table className="SupportTickets-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th className="SupportTickets-text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <div className="SupportTickets-task-title">{task.taskName}</div>
                    <div className="SupportTickets-task-subtitle">{task.project}</div>
                  </td>
                  <td className="SupportTickets-text-muted">{task.dueDate}</td>
                  <td>
                    <span className={`SupportTickets-table-badge priority-${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`SupportTickets-table-badge status-${task.status.toLowerCase().replace(" ", "-")}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="SupportTickets-text-muted">{task.assignedTo}</td>
                  <td>
                    <div className="SupportTickets-table-actions">
                      <button className="SupportTickets-icon-btn view" title="View">
                        <IoEyeOutline />
                      </button>
                      <button className="SupportTickets-icon-btn reset" title="Reset">
                        <BiReset />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;