import React, { useState, useMemo, useRef, useEffect } from "react";
import "./Chat.css";
import {
  FiSearch,
  FiPaperclip,
  FiSmile,
  FiSend,
  FiMoreVertical,
} from "react-icons/fi";

const Chat = () => {
  const contacts = [
    {
      id: 1,
      name: "William Smith",
      status: "left 7 mins ago",
      online: false,
      avatar: "https://i.pravatar.cc/150?img=12",
      unread: 2,
    },
    {
      id: 2,
      name: "Martha Williams",
      status: "online",
      online: true,
      avatar: "https://i.pravatar.cc/150?img=21",
      unread: 0,
    },
    {
      id: 3,
      name: "Joseph Clark",
      status: "online",
      online: true,
      avatar: "https://i.pravatar.cc/150?img=32",
      unread: 0,
    },
    {
      id: 4,
      name: "Nancy Taylor",
      status: "online",
      online: true,
      avatar: "https://i.pravatar.cc/150?img=47",
      unread: 0,
    },
    {
      id: 5,
      name: "Margaret Wilson",
      status: "online",
      online: true,
      avatar: "https://i.pravatar.cc/150?img=58",
      unread: 4,
    },
    {
      id: 6,
      name: "Joseph Jones",
      status: "left 30 mins ago",
      online: false,
      avatar: "https://i.pravatar.cc/150?img=60",
      unread: 0,
    },
    {
      id: 7,
      name: "Jane Brown",
      status: "left 10 hours ago",
      online: false,
      avatar: "https://i.pravatar.cc/150?img=11",
      unread: 0,
    },
    {
      id: 8,
      name: "Eliza Johnson",
      status: "online",
      online: true,
      avatar: "https://i.pravatar.cc/150?img=26",
      unread: 0,
    },
    {
      id: 9,
      name: "Mike Clark",
      status: "online",
      online: true,
      avatar: "https://i.pravatar.cc/150?img=45",
      unread: 0,
    },
    {
      id: 10,
      name: "Ann Henry",
      status: "online",
      online: true,
      avatar: "https://i.pravatar.cc/150?img=49",
      unread: 0,
    },
    {
      id: 11,
      name: "Nancy Smith",
      status: "online",
      online: true,
      avatar: "https://i.pravatar.cc/150?img=68",
      unread: 0,
    },
    {
      id: 12,
      name: "David Wilson",
      status: "offline since Oct 28",
      online: false,
      avatar: "https://i.pravatar.cc/150?img=15",
      unread: 0,
    },
  ];

  const dummyMessages = [
    {
      id: 1,
      sender: "Maria",
      mine: true,
      time: "10:10 AM, Today",
      text: "Hi Robert, how are you? How is your work going on?",
    },
    {
      id: 2,
      sender: "Robert",
      mine: false,
      time: "10:12 AM, Today",
      text: "Its good. We completed almost all task assign by our manager.",
    },
    {
      id: 3,
      sender: "Robert",
      mine: false,
      time: "10:12 AM, Today",
      text: "How are you feel today? What's about vacation?",
    },
    {
      id: 4,
      sender: "Maria",
      mine: true,
      time: "10:10 AM, Today",
      text: "I am good, We think for next weekend.",
    },
    {
      id: 5,
      sender: "Robert",
      mine: false,
      time: "10:15 AM, Today",
      text: "Sounds great. I hope the weather stays nice.",
    },
    {
      id: 6,
      sender: "Maria",
      mine: true,
      time: "10:16 AM, Today",
      text: "Yes, let's plan something exciting this time.",
    },
  ];

  const [search, setSearch] = useState("");
  const [activeContact, setActiveContact] = useState(contacts[4]);
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "Maria",
      mine: true,
      time: "Now",
      text: input,
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="Chat">

      <div className="Chat-wrapper">

        {/* LEFT PANEL */}

        <div className="Chat-sidebar">

          <div className="Chat-search">

            <FiSearch className="Chat-search-icon" />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <div className="Chat-contact-list">

            {filteredContacts.map((contact) => (

              <div
                key={contact.id}
                className={`Chat-contact-card ${
                  activeContact.id === contact.id ? "active" : ""
                }`}
                onClick={() => setActiveContact(contact)}
              >

                <div className="Chat-avatar">

                  <img src={contact.avatar} alt="" />

                </div>

                <div className="Chat-contact-info">

                  <h4>{contact.name}</h4>

                  <p>

                    <span
                      className={`Chat-status-dot ${
                        contact.online ? "online" : "offline"
                      }`}
                    />

                    {contact.status}

                  </p>

                </div>

                {contact.unread > 0 && (

                  <span className="Chat-unread">

                    {contact.unread}

                  </span>

                )}

              </div>

            ))}

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="Chat-main">

          <div className="Chat-header">

            <div className="Chat-header-left">

              <img
                src="https://i.pravatar.cc/150?img=25"
                alt=""
              />

              <div>

                <h3>Maria Smith</h3>

                <p>2 new messages</p>

              </div>

            </div>

            {/* Settings button removed to match your requirement */}

          </div>

          <div className="Chat-body" ref={chatRef}>
                        {messages.map((message) => (
              <div
                key={message.id}
                className={`Chat-message-row ${
                  message.mine ? "mine" : "other"
                }`}
              >
                <div className="Chat-message-meta">
                  {!message.mine && (
                    <>
                      <span className="Chat-message-name">
                        {message.sender}
                      </span>

                      <span className="Chat-message-time">
                        {message.time}
                      </span>
                    </>
                  )}

                  {message.mine && (
                    <>
                      <span className="Chat-message-time">
                        {message.time}
                      </span>

                      <span className="Chat-message-name">
                        {message.sender}
                      </span>
                    </>
                  )}
                </div>

                <div
                  className={`Chat-message ${
                    message.mine
                      ? "Chat-message-mine"
                      : "Chat-message-other"
                  }`}
                >
                  <div className="Chat-bubble-arrow"></div>

                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Input */}

          <div className="Chat-footer">

            <div className="Chat-input-wrapper">

              <input
                type="text"
                placeholder="Enter text here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <div className="Chat-input-actions">

                <button
                  className="Chat-icon-btn"
                  title="Attachment"
                >
                  <FiPaperclip />
                </button>

                <button
                  className="Chat-icon-btn"
                  title="Emoji"
                >
                  <FiSmile />
                </button>

                <button
                  className="Chat-send-btn"
                  title="Send"
                  onClick={handleSend}
                >
                  <FiSend />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Chat;