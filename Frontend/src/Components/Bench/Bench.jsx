import React, { useEffect, useState } from "react";
import "./Bench.css";
import {
  FiSearch,
  FiCalendar,
  FiUser,
  FiTag,
  FiMessageSquare,
  FiFolder,
} from "react-icons/fi";
import { useParams, Link } from "react-router-dom";
import api, { IMG_URL } from "../../api/axios";

const Bench = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to safely format relative or absolute image paths
  const getImageUrl = (imagePath) => {
    if (!imagePath || typeof imagePath !== "string" || imagePath.trim() === "") {
      return "https://placehold.co/800x450?text=No+Image+Available";
    }

    const trimmed = imagePath.trim();

    // Strip legacy hardcoded server origins if saved in database
    let cleanPath = trimmed.replace(/http:\/\/localhost:(5000|6013)/g, "");

    if (
      cleanPath.startsWith("http://") ||
      cleanPath.startsWith("https://") ||
      cleanPath.startsWith("data:")
    ) {
      return cleanPath;
    }

    cleanPath = cleanPath.replace(/\\/g, "/").replace(/^public\//, "");
    if (!cleanPath.startsWith("/")) {
      cleanPath = "/" + cleanPath;
    }

    return `${IMG_URL}${cleanPath}`;
  };

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/blogs/${id}`);
      
      // Support flexible response payloads (res.data vs res.data.data)
      const data = res.data?.data || res.data;
      setBlog(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching article details:", err);
      setError("Failed to load article. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="BlogDetails_Status">
        <div className="BlogDetails_Spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="BlogDetails_Status BlogDetails_Error">
        <h2>Article Not Found</h2>
        <p>{error || "The requested blog post could not be loaded."}</p>
        <Link to="/blogs" className="BlogDetails_BackBtn">
          Back to Articles
        </Link>
      </div>
    );
  }

  // Safely normalize tags into an Array whether stored as Array, CSV String, or JSON String
  const getNormalizedTags = () => {
    if (Array.isArray(blog.tags)) return blog.tags;
    if (typeof blog.tags === "string" && blog.tags.trim() !== "") {
      try {
        const parsed = JSON.parse(blog.tags);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return blog.tags.split(",").map((t) => t.trim()).filter(Boolean);
      }
    }
    return [];
  };

  const normalizedTags = getNormalizedTags();

  return (
    <main className="BlogDetails_Page">
      <div className="BlogDetails_Container">
        
        {/* MAIN ARTICLE CONTENT */}
        <article className="BlogDetails_Main">
          
          {/* ARTICLE HEADER */}
          <header className="BlogDetails_Header">
            {blog.category && (
              <span className="BlogDetails_CategoryTag">{blog.category}</span>
            )}

            <h1 className="BlogDetails_Title">{blog.title || "Untitled Post"}</h1>

            <div className="BlogDetails_Meta">
              <span className="BlogDetails_MetaItem">
                <FiUser /> {blog.adminName || blog.author || "Admin"}
              </span>
              <span className="BlogDetails_MetaDot">•</span>
              <span className="BlogDetails_MetaItem">
                <FiCalendar />{" "}
                {blog.publishDate || blog.createdAt
                  ? new Date(blog.publishDate || blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
              </span>
            </div>
          </header>

          {/* COVER FEATURED IMAGE */}
          {(blog.image || blog.coverImage) && (
            <figure className="BlogDetails_FeaturedImage">
              <img
                src={getImageUrl(blog.image || blog.coverImage)}
                alt={blog.title || "Blog cover image"}
                onError={(e) => {
                  if (e.target.src.includes("placehold.co")) return;
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/800x450?text=Image+Unavailable";
                }}
              />
            </figure>
          )}

          {/* ARTICLE BODY */}
          <section
            className="BlogDetails_Body"
            dangerouslySetInnerHTML={{
              __html: blog.description || blog.content || "",
            }}
          />

          {/* IN-BODY MEDIA IMAGE */}
          {blog.media && (
            <figure className="BlogDetails_MediaImage">
              <img
                src={getImageUrl(blog.media)}
                alt={blog.title || "Additional media asset"}
                onError={(e) => {
                  if (e.target.src.includes("placehold.co")) return;
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/800x450?text=Media+Unavailable";
                }}
              />
            </figure>
          )}

          {/* QUOTE BLOCK */}
          {blog.quote && (
            <blockquote className="BlogDetails_Quote">
              <span className="BlogDetails_QuoteMark" aria-hidden="true">
                “
              </span>
              <p>{blog.quote}</p>
            </blockquote>
          )}

          <hr className="BlogDetails_Divider" />

          {/* COMMENTS SECTION */}
          <section className="BlogDetails_CommentsSection">
            <h3>
              <FiMessageSquare /> Comments
            </h3>
          </section>

          {/* REPLY FORM */}
          <section className="BlogDetails_ReplyForm">
            <h3>Leave a Reply</h3>
            <p className="BlogDetails_FormNote">
              Your email address will not be published. Required fields are marked *
            </p>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="BlogDetails_InputRow">
                <input
                  type="text"
                  placeholder="Name *"
                  required
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                />
              </div>

              <textarea
                rows="6"
                placeholder="Write your comment..."
                required
              />

              <button type="submit" className="BlogDetails_SubmitBtn">
                Post Comment
              </button>
            </form>
          </section>
        </article>

        {/* SIDEBAR */}
        <aside className="BlogDetails_Sidebar">
          
          {/* SEARCH BAR */}
          <div className="BlogDetails_SidebarCard BlogDetails_SearchBox">
            <FiSearch className="BlogDetails_SearchIcon" />
            <input
              type="text"
              placeholder="Search articles..."
              aria-label="Search articles"
            />
          </div>

          {/* CATEGORIES */}
          <div className="BlogDetails_SidebarCard">
            <h3>
              <FiFolder /> Category
            </h3>
            <ul className="BlogDetails_CategoryList">
              <li>
                <Link to={`/blogs?category=${encodeURIComponent(blog.category || "General")}`}>
                  {blog.category || "General"}
                </Link>
              </li>
            </ul>
          </div>

          {/* TAGS */}
          <div className="BlogDetails_SidebarCard">
            <h3>
              <FiTag /> Tags
            </h3>
            <div className="BlogDetails_Tags">
              {normalizedTags.length > 0 ? (
                normalizedTags.map((tag, index) => (
                  <Link
                    to={`/blogs?tag=${encodeURIComponent(tag)}`}
                    className="BlogDetails_TagItem"
                    key={index}
                  >
                    #{tag}
                  </Link>
                ))
              ) : (
                <p className="BlogDetails_NoTags">No tags assigned</p>
              )}
            </div>
          </div>

          {/* AD / PROMO BANNER */}
          {(blog.image || blog.media) && (
            <div className="BlogDetails_SidebarCard BlogDetails_BannerCard">
              <img
                src={getImageUrl(blog.image || blog.media)}
                alt={blog.title || "Featured banner"}
                onError={(e) => {
                  if (e.target.src.includes("placehold.co")) return;
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/400x300?text=Banner+Unavailable";
                }}
              />
            </div>
          )}
        </aside>
      </div>
    </main>
  );
};

export default Bench;