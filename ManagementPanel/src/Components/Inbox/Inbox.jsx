import React, { useState } from "react";
import "./Inbox.css";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Star,
  Paperclip,
  Trash2,
  Folder,
  Tag,
  AlertCircle,
  Mail,
  MailOpen,
  RotateCw,
  CheckSquare,
} from "lucide-react";

const Inbox = () => {
  const [selected, setSelected] = useState([]);
  const [starred, setStarred] = useState([2, 6, 10, 14]);

  const emails = [
    {
      id: 1,
      sender: "Nelson Lane",
      label: "Work",
      color: "#4ea4ff",
      subject: "Lorem ipsum perspiciatis unde omnis iste natus",
      time: "12:30 PM",
    },
    {
      id: 2,
      sender: "Kerry Mann",
      label: "",
      color: "",
      subject: "Lorem ipsum perspiciatis unde omnis iste natus",
      time: "May 13",
    },
    {
      id: 3,
      sender: "Adam Peters",
      label: "Shopping",
      color: "#ff5d5d",
      subject: "Lorem ipsum perspiciatis unde omnis",
      time: "May 12",
    },
    {
      id: 4,
      sender: "Lula Reese",
      label: "Family",
      color: "#33c9ff",
      subject: "Lorem ipsum perspiciatis unde omnis",
      time: "May 12",
    },
    {
      id: 5,
      sender: "Nelson Lane",
      label: "Work",
      color: "#ff9800",
      subject: "Lorem ipsum perspiciatis unde omnis iste natus",
      time: "May 12",
    },
    {
      id: 6,
      sender: "Kerry Mann",
      label: "",
      color: "",
      subject: "Lorem ipsum perspiciatis unde omnis iste natus",
      time: "May 11",
    },
    {
      id: 7,
      sender: "Adam Peters",
      label: "Office",
      color: "#d14dff",
      subject: "Lorem ipsum perspiciatis unde omnis iste natus",
      time: "May 11",
    },
    {
      id: 8,
      sender: "Lula Reese",
      label: "Work",
      color: "#ff9800",
      subject: "Lorem ipsum perspiciatis unde omnis iste natus",
      time: "May 11",
    },
    {
      id: 9,
      sender: "Nelson Lane",
      label: "Work",
      color: "#4ea4ff",
      subject: "Lorem ipsum perspiciatis unde omnis iste natus",
      time: "May 10",
    },
    {
      id: 10,
      sender: "Kerry Mann",
      label: "",
      color: "",
      subject: "Lorem ipsum perspiciatis unde omnis iste natus",
      time: "May 10",
    },
    {
      id: 11,
      sender: "Adam Peters",
      label: "Shopping",
      color: "#67c56f",
      subject: "Lorem ipsum perspiciatis unde omnis",
      time: "May 10",
    },
    {
      id: 12,
      sender: "Lula Reese",
      label: "Work",
      color: "#ff5d5d",
      subject: "Lorem ipsum perspiciatis unde omnis iste natus",
      time: "May 09",
    },
    {
      id: 13,
      sender: "Nelson Lane",
      label: "Work",
      color: "#33c9ff",
      subject: "Lorem ipsum perspiciatis unde omnis iste natus",
      time: "May 09",
    },
    {
      id: 14,
      sender: "Kerry Mann",
      label: "",
      color: "",
      subject: "Lorem ipsum perspiciatis unde omnis iste natus",
      time: "May 09",
    },
    {
      id: 15,
      sender: "Adam Peters",
      label: "Shopping",
      color: "#67c56f",
      subject: "Lorem ipsum perspiciatis unde omnis",
      time: "May 09",
    },
  ];

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const toggleStar = (id) => {
    if (starred.includes(id)) {
      setStarred(starred.filter((item) => item !== id));
    } else {
      setStarred([...starred, id]);
    }
  };

  const selectAll = () => {
    if (selected.length === emails.length) {
      setSelected([]);
    } else {
      setSelected(emails.map((e) => e.id));
    }
  };

  return (
    <div className="Inbox">

      <div className="Inbox-sidebar">

        <button className="Inbox-compose">
          COMPOSE
        </button>

        <ul className="Inbox-menu">
          <li className="Inbox-active">
            Inbox
            <span>6</span>
          </li>

          <li>Sent</li>
          <li>Draft</li>
          <li>Bin</li>
          <li>Important</li>
          <li>Starred</li>
        </ul>

        <div className="Inbox-section-title">
          Labels
        </div>

        <div className="Inbox-labels">

          <span className="family">Family</span>
          <span className="work">Work</span>
          <span className="shop">Shop</span>
          <span className="theme">Themeforest</span>
          <span className="google">Google</span>

        </div>

        <div className="Inbox-section-title">
          Online
        </div>

        <ul className="Inbox-online">
          <li><span className="green"></span>Sachin</li>
          <li><span className="blue"></span>John Smith</li>
          <li><span className="orange"></span>Askay</li>
          <li className="active"><span className="purple"></span>Dhavan</li>
          <li><span className="navy"></span>Lee</li>
        </ul>

      </div>

      <div className="Inbox-content">

        <div className="Inbox-toolbar">

          <div className="Inbox-toolbar-left">

            <input
              type="checkbox"
              checked={selected.length === emails.length}
              onChange={selectAll}
            />

            <RotateCw size={18} />

            <Mail size={18} />

            <AlertCircle size={18} />

            <Trash2 size={18} />

            <Folder size={18} />

            <Tag size={18} />

          </div>

          <div className="Inbox-toolbar-right">

            <ChevronLeft size={18} />

            <ChevronRight size={18} />

          </div>

        </div>

        <div className="Inbox-table">

          {emails.map((mail) => (

            <div className="Inbox-row" key={mail.id}>

              <div className="Inbox-check">

                <input
                  type="checkbox"
                  checked={selected.includes(mail.id)}
                  onChange={() => toggleSelect(mail.id)}
                />

              </div>

              <div
                className="Inbox-star"
                onClick={() => toggleStar(mail.id)}
              >
                <Star
                  size={19}
                  fill={
                    starred.includes(mail.id)
                      ? "#ffb300"
                      : "transparent"
                  }
                  color={
                    starred.includes(mail.id)
                      ? "#ffb300"
                      : "#222"
                  }
                />
              </div>

              <div className="Inbox-name">
                {mail.sender}
              </div>

              <div className="Inbox-subject">

                {mail.label && (
                  <span
                    className="Inbox-badge"
                    style={{
                      color: mail.color,
                      borderColor: mail.color,
                    }}
                  >
                    {mail.label}
                  </span>
                )}

                {mail.subject}

              </div>

              <div className="Inbox-attachment">
                <Paperclip size={18} />
              </div>

              <div className="Inbox-time">
                {mail.time}
              </div>

            </div>

          ))}

        </div>

        <div className="Inbox-footer">

          <span>
            Showing 1 - 15 of 200
          </span>

          <div>

            <ChevronLeft size={20} />

            <ChevronRight size={20} />

          </div>

        </div>

      </div>

    </div>
  );
};

export default Inbox;