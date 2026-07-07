import React, { useMemo, useState } from "react";
import "./Compose.css";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import {
  FiMail,
  FiSend,
  FiFileText,
  FiTrash2,
  FiStar,
  FiTag,
  FiPaperclip,
  FiHome,
  FiChevronRight,
} from "react-icons/fi";

const Compose = () => {
  const [receiver, setReceiver] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ header: [1, 2, 3, false] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["blockquote", "code-block"],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
    "code-block",
  ];

  const menu = [
    {
      icon: <FiMail />,
      title: "Inbox",
      active: true,
      badge: 6,
    },
    {
      icon: <FiSend />,
      title: "Sent",
    },
    {
      icon: <FiFileText />,
      title: "Draft",
    },
    {
      icon: <FiTrash2 />,
      title: "Bin",
    },
    {
      icon: <FiStar />,
      title: "Important",
    },
    {
      icon: <FiStar />,
      title: "Starred",
    },
  ];

  const labels = [
    {
      color: "#ff5252",
      text: "Family",
    },
    {
      color: "#2196f3",
      text: "Work",
    },
    {
      color: "#ff9800",
      text: "Shop",
    },
    {
      color: "#00bcd4",
      text: "Themeforest",
    },
    {
      color: "#3f51b5",
      text: "Google",
    },
  ];

  const users = [
    {
      color: "#4CAF50",
      name: "Sachin",
    },
    {
      color: "#3F51B5",
      name: "John Smith",
    },
    {
      color: "#FF9800",
      name: "Askay",
    },
    {
      color: "#3F51B5",
      name: "Dhavan",
    },
    {
      color: "#3F51B5",
      name: "Lee",
    },
  ];

  const handleSend = () => {
    console.log({
      receiver,
      subject,
      message,
      attachment,
    });

    alert("Message Sent Successfully");

    setReceiver("");
    setSubject("");
    setMessage("");
    setAttachment(null);
  };

  const handleDiscard = () => {
    setReceiver("");
    setSubject("");
    setMessage("");
    setAttachment(null);
  };

  return (
    <div className="Compose">

      <div className="Compose-header">

        <h2>Compose</h2>

        <div className="Compose-breadcrumb">

          <FiHome />

          <FiChevronRight />

          <span>Home</span>

          <FiChevronRight />

          <span>Email</span>

          <FiChevronRight />

          <span>Compose</span>

        </div>

      </div>

      <div className="Compose-container">

        {/* LEFT */}

        <aside className="Compose-sidebar">

          <button className="Compose-composeBtn">
            COMPOSE
          </button>

          <div className="Compose-menu">

            {menu.map((item, index) => (

              <div
                key={index}
                className={`Compose-menuItem ${
                  item.active ? "active" : ""
                }`}
              >

                <div className="Compose-menuLeft">

                  {item.icon}

                  <span>{item.title}</span>

                </div>

                {item.badge && (
                  <span className="Compose-badge">
                    {item.badge}
                  </span>
                )}

              </div>

            ))}

          </div>

          <div className="Compose-divider"></div>

          <h4>Labels</h4>

          <div className="Compose-labels">

            {labels.map((item, index) => (

              <div
                className="Compose-label"
                key={index}
              >

                <FiTag
                  style={{
                    color: item.color,
                  }}
                />

                <span>{item.text}</span>

              </div>

            ))}

          </div>

          <div className="Compose-divider"></div>

          <h4>Online</h4>

          <div className="Compose-online">

            {users.map((item, index) => (

              <div
                className="Compose-user"
                key={index}
              >

                <span
                  className="Compose-status"
                  style={{
                    background: item.color,
                  }}
                ></span>

                {item.name}

              </div>

            ))}

          </div>

        </aside>

        {/* RIGHT */}

        <section className="Compose-content">

          <div className="Compose-card">

            <div className="Compose-cardTitle">
              Compose New Message
            </div>

            <input
              type="text"
              placeholder="TO"
              value={receiver}
              onChange={(e) =>
                setReceiver(e.target.value)
              }
              className="Compose-input"
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
              className="Compose-input"
            />

            <div className="Compose-editor">

              <ReactQuill
                theme="snow"
                value={message}
                onChange={setMessage}
                modules={modules}
                formats={formats}
                placeholder="Type here..."
              />

            </div>

            <div className="Compose-upload">

              <FiPaperclip />

              <input
                type="file"
                onChange={(e) =>
                  setAttachment(
                    e.target.files[0]
                  )
                }
              />

            </div>

            <div className="Compose-buttons">

              <button
                className="Compose-sendBtn"
                onClick={handleSend}
              >
                Send
              </button>

              <button
                className="Compose-discardBtn"
                onClick={handleDiscard}
              >
                Discard
              </button>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
};

export default Compose;