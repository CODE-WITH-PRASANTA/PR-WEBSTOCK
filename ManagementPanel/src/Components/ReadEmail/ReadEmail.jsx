import React, { useState } from "react";
import "./ReadEmail.css";

import {
  FaHome,
  FaInbox,
  FaPaperclip,
  FaReply,
  FaShare,
  FaTag,
} from "react-icons/fa";

import {
  MdSend,
  MdDrafts,
  MdDelete,
  MdStar,
  MdLabel,
} from "react-icons/md";

const ReadEmail = () => {

  const [activeMenu, setActiveMenu] = useState("Inbox");

  const menuItems = [
    {
      name: "Inbox",
      icon: <FaInbox />,
      count: 6,
    },
    {
      name: "Sent",
      icon: <MdSend />,
    },
    {
      name: "Draft",
      icon: <MdDrafts />,
    },
    {
      name: "Bin",
      icon: <MdDelete />,
    },
    {
      name: "Important",
      icon: <FaTag />,
    },
    {
      name: "Starred",
      icon: <MdStar />,
    },
  ];

  const labels = [
    {
      name: "Family",
      color: "#ef4444",
    },
    {
      name: "Work",
      color: "#2563eb",
    },
    {
      name: "Shop",
      color: "#f59e0b",
    },
    {
      name: "Themeforest",
      color: "#06b6d4",
    },
    {
      name: "Google",
      color: "#3b82f6",
    },
  ];

  const onlineUsers = [
    {
      name: "Sachin",
      color: "#4CAF50",
    },
    {
      name: "John Smith",
      color: "#3F51B5",
    },
    {
      name: "Askay",
      color: "#ff9800",
    },
    {
      name: "Dhavan",
      color: "#3F51B5",
    },
    {
      name: "Lee",
      color: "#3F51B5",
    },
  ];

  const attachments = [
    {
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
      name: "IMG_001.jpg",
      size: "20KB",
    },
    {
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
      name: "IMG_002.jpg",
      size: "22KB",
    },
    {
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
      name: "IMG_003.jpg",
      size: "28KB",
    },
  ];

  return (

    <div className="ReadEmail">

      {/* Header */}

      <div className="ReadEmail-page-header">

        <h2>Read</h2>

        <div className="ReadEmail-breadcrumb">

          <FaHome />

          <span>Home</span>

          <span>&gt;</span>

          <span>Email</span>

          <span>&gt;</span>

          <span className="ReadEmail-current">
            Read
          </span>

        </div>

      </div>

      <div className="ReadEmail-container">

        {/* Sidebar */}

        <aside className="ReadEmail-sidebar">

          <button className="ReadEmail-compose-btn">
            COMPOSE
          </button>

          <div className="ReadEmail-menu">

            {menuItems.map((item) => (

              <div
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                className={`ReadEmail-menu-item ${
                  activeMenu === item.name
                    ? "ReadEmail-menu-active"
                    : ""
                }`}
              >

                <div className="ReadEmail-menu-left">

                  <span className="ReadEmail-menu-icon">
                    {item.icon}
                  </span>

                  <span>{item.name}</span>

                </div>

                {item.count && (
                  <span className="ReadEmail-count">
                    {item.count}
                  </span>
                )}

              </div>

            ))}

          </div>

          <div className="ReadEmail-divider" />

          {/* Labels */}

          <div className="ReadEmail-section-title">
            Labels
          </div>

          <div className="ReadEmail-labels">

            {labels.map((label) => (

              <div
                key={label.name}
                className="ReadEmail-label-item"
              >

                <span
                  className="ReadEmail-label-dot"
                  style={{
                    background: label.color,
                  }}
                />

                {label.name}

              </div>

            ))}

          </div>

          <div className="ReadEmail-divider" />

          {/* Online */}

          <div className="ReadEmail-section-title">
            Online
          </div>

          <div className="ReadEmail-online-users">

            {onlineUsers.map((user) => (

              <div
                key={user.name}
                className="ReadEmail-online-item"
              >

                <span
                  className="ReadEmail-online-dot"
                  style={{
                    background: user.color,
                  }}
                />

                {user.name}

              </div>

            ))}

          </div>

        </aside>

        {/* Content */}

        <div className="ReadEmail-content">

          <h2 className="ReadEmail-subject">
            Hi Dear, How are you?
          </h2>

          <div className="ReadEmail-top-divider" />

          <div className="ReadEmail-user-row">

            <div className="ReadEmail-user-left">

              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt=""
                className="ReadEmail-avatar"
              />

              <div>

                <h4>Sarah Smith</h4>

                <span>
                  From:
                  <a href="/">
                    {" "}
                    sarah@example.com
                  </a>
                </span>

              </div>

            </div>

            <div className="ReadEmail-date">
              4:15AM 04 April 2017
            </div>

          </div>

          <div className="ReadEmail-message">

            <p>
              Donec ultrices faucibus rutrum.
              Phasellus sodales vulputate urna,
              vel accumsan augue egestas ac.
              Donec vitae leo at sem lobortis
              porttitor eu consequat risus.
              Mauris sed congue orci. Donec
              ultrices faucibus rutrum.
              Phasellus sodales vulputate urna,
              vel accumsan augue egestas ac.
            </p>

            <p>
              Porttitor eu consequat risus.
              <span className="ReadEmail-link">
                Mauris sed congue orci.
                Donec ultrices faucibus
                rutrum.
              </span>
              Phasellus sodales vulputate urna,
              vel accumsan augue egestas ac.
              Donec vitae leo at sem lobortis
              porttitor eu consequat risus.
              Mauris sed congue orci.
            </p>

            <p>
              Sodales
              <span className="ReadEmail-link">
                vulputate urna,
                vel accumsan augue egestas ac.
              </span>
              Donec vitae leo at sem lobortis
              porttitor eu consequat risus.
              Mauris sed congue orci.
            </p>

          </div>

          {/* ---------- PART 2 STARTS FROM HERE ---------- */}

          <div className="ReadEmail-attachment-header">

            <FaPaperclip />

            <span>
              3 attachments
            </span>

            <a href="/">
              Download all attachments
            </a>

            <a href="/">
              View all images
            </a>

          </div>
                    <div className="ReadEmail-attachments">

            {attachments.map((file, index) => (

              <div
                key={index}
                className="ReadEmail-attachment-card"
              >

                <div className="ReadEmail-image-wrapper">

                  <img
                    src={file.image}
                    alt={file.name}
                    className="ReadEmail-attachment-image"
                  />

                </div>

                <div className="ReadEmail-file-info">

                  <a
                    href="/"
                    onClick={(e) => e.preventDefault()}
                    className="ReadEmail-file-name"
                  >
                    {file.name}
                  </a>

                  <span className="ReadEmail-file-size">
                    {file.size}
                  </span>

                </div>

              </div>

            ))}

          </div>

          <div className="ReadEmail-reply-box">

            <p>

              click here to

              <button
                className="ReadEmail-action-btn"
                type="button"
              >
                <FaReply />
                Reply
              </button>

              or

              <button
                className="ReadEmail-action-btn"
                type="button"
              >
                <FaShare />
                Forward
              </button>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ReadEmail;