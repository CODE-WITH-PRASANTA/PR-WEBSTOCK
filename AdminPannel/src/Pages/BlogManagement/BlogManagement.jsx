import React, { useState } from "react";
import "./BlogManagement.css";

import {
  FaThLarge,
  FaList,
  FaEllipsisV,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const BlogManagement = () => {
  const [view, setView] = useState("grid");
  const [activeMenu, setActiveMenu] = useState(null);

  const blogs = [
    {
      id: 1,
      title: "Modern React Development",
      category: "Technology",
      admin: "Santanu Bal",
      date: "18 Jun 2026",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
      quote: "React makes UI development simple.",
      tags: ["React", "Frontend"],
    },
    {
      id: 2,
      title: "Digital Marketing Trends",
      category: "Marketing",
      admin: "Admin Team",
      date: "15 Jun 2026",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      quote: "Marketing is evolving rapidly.",
      tags: ["SEO", "Marketing"],
    },
    {
      id: 3,
      title: "Business Growth Strategy",
      category: "Business",
      admin: "John Doe",
      date: "12 Jun 2026",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800",
      quote: "Growth requires consistency.",
      tags: ["Business", "Startup"],
    },
    {
      id: 4,
      title: "Web Development Guide",
      category: "Development",
      admin: "Developer Team",
      date: "10 Jun 2026",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      quote: "Build scalable applications.",
      tags: ["MERN", "Coding"],
    },
  ];

  return (
    <div className="BlogManagement">
      <div className="BlogManagement_Header">
        <h2>Blog Management</h2>

        <div className="BlogManagement_ViewSwitch">
          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          >
            <FaThLarge />
          </button>

          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
          >
            <FaList />
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="BlogManagement_Grid">
          {blogs.map((blog) => (
            <div
              className="BlogManagement_Card"
              key={blog.id}
            >
              <img
                src={blog.image}
                alt={blog.title}
              />

              <div className="BlogManagement_MenuWrap">
                <button
                  className="BlogManagement_MenuBtn"
                  onClick={() =>
                    setActiveMenu(
                      activeMenu === blog.id
                        ? null
                        : blog.id
                    )
                  }
                >
                  <FaEllipsisV />
                </button>

                {activeMenu === blog.id && (
                  <div className="BlogManagement_Menu">
                    <button>
                      <FaEdit /> Edit
                    </button>

                    <button>
                      <FaTrash /> Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="BlogManagement_CardContent">
                <span>{blog.category}</span>

                <h3>{blog.title}</h3>

                <p>{blog.quote}</p>

                <div className="BlogManagement_Footer">
                  <small>{blog.admin}</small>
                  <small>{blog.date}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="BlogManagement_List">
          {blogs.map((blog) => (
            <div
              className="BlogManagement_ListItem"
              key={blog.id}
            >
              <img
                src={blog.image}
                alt={blog.title}
              />

              <div className="BlogManagement_ListContent">
                <h3>{blog.title}</h3>

                <p>{blog.quote}</p>

                <div className="BlogManagement_ListMeta">
                  <span>{blog.category}</span>
                  <span>{blog.admin}</span>
                  <span>{blog.date}</span>
                </div>
              </div>

              <div className="BlogManagement_MenuWrap">
                <button
                  className="BlogManagement_MenuBtn"
                  onClick={() =>
                    setActiveMenu(
                      activeMenu === blog.id
                        ? null
                        : blog.id
                    )
                  }
                >
                  <FaEllipsisV />
                </button>

                {activeMenu === blog.id && (
                  <div className="BlogManagement_Menu">
                    <button>
                      <FaEdit /> Edit
                    </button>

                    <button>
                      <FaTrash /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManagement;