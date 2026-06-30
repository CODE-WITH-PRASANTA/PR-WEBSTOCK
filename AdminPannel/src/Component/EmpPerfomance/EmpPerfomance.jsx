import React from "react";
import {
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";
import "./EmpPerfomance.css";

const weeklyAttendance = [
  { day: "Mon", value: 95 },
  { day: "Tue", value: 97 },
  { day: "Wed", value: 94 },
  { day: "Thu", value: 96 },
  { day: "Fri", value: 93 },
];

const notes = [
  {
    name: "Nurse Johnson",
    time: "Today, 07:30 AM",
    message:
      "Patient in Room 201 complained of increased pain during night shift. Pain medication administered at 4:30 AM.",
    tag: "Urgent",
    type: "urgent",
  },
  {
    name: "Dr. Chen",
    time: "Today, 07:45 AM",
    message:
      "Please monitor blood glucose levels for patient in Room 105 every 2 hours.",
    tag: "Important",
    type: "important",
  },
  {
    name: "Nurse Williams",
    time: "Yesterday, 08:15 PM",
    message:
      "Patient in Room 310 is scheduled for CT scan at 10:00 AM tomorrow. NPO after midnight.",
    tag: "Routine",
    type: "routine",
  },
];

const EmpPerfomance = () => {
  return (
    <section className="EmpPerfomance">
      {/* Attendance Card */}
      <div className="EmpPerfomance__attendance">

        <div className="EmpPerfomance__header">
          <h2>Attendance Summary</h2>

          <div className="EmpPerfomance__date">
            <h4>June 29, 2026</h4>
            <span>Monday</span>
          </div>
        </div>

        <div className="EmpPerfomance__body">

          <h3>Monthly Attendance Rate</h3>

          <div className="EmpPerfomance__percentage">
            95.2%
          </div>

          <div className="EmpPerfomance__progress">
            <div className="EmpPerfomance__progressFill"></div>
          </div>

          <h3 className="EmpPerfomance__weeklyTitle">
            Weekly Attendance
          </h3>

          <div className="EmpPerfomance__chart">
            {weeklyAttendance.map((item) => (
              <div
                key={item.day}
                className="EmpPerfomance__chartItem"
              >
                <div
                  className="EmpPerfomance__bar"
                  style={{
                    height: `${item.value * 1.1}px`,
                  }}
                ></div>

                <span>{item.day}</span>

                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Notes Card */}

      <div className="EmpPerfomance__notes">

        <div className="EmpPerfomance__header">
          <h2>Handoff Notes</h2>

          <button className="EmpPerfomance__addBtn">
            Add Note
          </button>
        </div>

        <div className="EmpPerfomance__notesList">

          {notes.map((note, index) => (
            <div
              className="EmpPerfomance__noteCard"
              key={index}
            >
              <div className="EmpPerfomance__noteTop">

                <div className="EmpPerfomance__noteLeft">

                  <FiMessageSquare className="EmpPerfomance__icon" />

                  <div className="EmpPerfomance__avatar">
                    <FiUser />
                  </div>

                  <h4>{note.name}</h4>

                </div>

                <span>{note.time}</span>

              </div>

              <p>{note.message}</p>

              <div
                className={`EmpPerfomance__badge EmpPerfomance__badge--${note.type}`}
              >
                {note.tag}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default EmpPerfomance;