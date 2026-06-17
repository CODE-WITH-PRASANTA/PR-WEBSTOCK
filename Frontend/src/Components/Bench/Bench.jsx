import React from "react";
import "./Bench.css";
import { FiSearch, FiCornerUpLeft } from "react-icons/fi";

const Bench = () => {
  const popularPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200",
      title: "The 5 Ways To Improve Your Credibility Working From Home",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=200",
      title: "The 20 Smart Finance-Focused Resources For Small Businesses",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200",
      title: "4 Ways Businesses Can Conduct Productive Time Management",
    },
  ];

  return (
    <section className="bench-page">
      <div className="bench-container">
        {/* LEFT CONTENT */}
        <div className="bench-content">
          <p>
            As a small-business owner, it’s important to find high-quality
            information and educational resources you can trust to help you
            overcome common obstacles and achieve success.
          </p>

          <p>
            With the large number of online resources out there, it’s hard to
            know where to begin searching for the best ones for your needs.
          </p>

          <h2>Bench Blog</h2>

          <p>
            One of the most helpful blogs I have seen is Bench Blog, posted by
            Bench, a bookkeeping service for small businesses.
          </p>

          <h2>CFO.University</h2>

          <p>
            One of my favorite sources of corporate-finance-specific content is
            CFO.University.
          </p>

          <div className="featured-image">
            <img
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200"
              alt=""
            />
          </div>

          <p className="image-caption">
            The company provides lending services to the UK consumer market.
          </p>

          <p>
            Harvard Business Review is full of ideas and strategies.
          </p>

          <div className="quote-box">
            <span className="quote-mark">❝</span>

            <p>
              Small-business owners should digest the content from the website
              of the National Federation of Independent Business Owners.
            </p>
          </div>

          <h2>Online Communities</h2>

          <p>
            I have found subscribing to several sources, skimming the
            headlines, and looking for information on the specific challenges
            I’m facing to be an effective strategy.
          </p>

          <hr />

          {/* COMMENTS */}
          <div className="comments-section">
            <h3>3 Comments</h3>

            <div className="comment">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200"
                alt=""
              />

              <div className="comment-body">
                <div className="comment-top">
                  <h4>admin</h4>

                  <div className="reply-info">
                    <span>02/03/2023</span>
                    <span>
                      <FiCornerUpLeft /> Reply
                    </span>
                  </div>
                </div>

                <p>
                  Good marketing practices have a direct financial impact on a
                  business.
                </p>
              </div>
            </div>

            <div className="comment">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200"
                alt=""
              />

              <div className="comment-body">
                <div className="comment-top">
                  <h4>admin</h4>

                  <div className="reply-info">
                    <span>02/03/2023</span>
                    <span>
                      <FiCornerUpLeft /> Reply
                    </span>
                  </div>
                </div>

                <p>
                  It has great, timely content to help small-business owners
                  navigate change.
                </p>

                <div className="nested-comment">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200"
                    alt=""
                  />

                  <div>
                    <div className="comment-top">
                      <h4>admin</h4>

                      <div className="reply-info">
                        <span>02/03/2023</span>
                        <span>
                          <FiCornerUpLeft /> Reply
                        </span>
                      </div>
                    </div>

                    <p>
                      Small-business owners should digest the content from NFIB.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}

          <div className="reply-form">
            <h3>Leave a Reply</h3>

            <p>
              Your email address will not be published. Required fields are
              marked *
            </p>

            <div className="input-row">
              <input type="text" placeholder="Jane Doe" />
              <input type="email" placeholder="name@email.com" />
            </div>

            <textarea
              rows="8"
              placeholder="Enter comment here..."
            ></textarea>

            <button>Post Comment</button>
          </div>
        </div>

        {/* SIDEBAR */}

        <aside className="sidebar">
          <div className="sidebar-card search-box">
            <FiSearch />
            <input type="text" placeholder="Search" />
          </div>

          <div className="sidebar-card">
            <h3>Categories</h3>

            <ul>
              <li>BUSINESS</li>
              <li>DEVELOPMENT</li>
              <li>SOFTWARE</li>
            </ul>
          </div>

          <div className="sidebar-card">
            <h3>Popular Posts</h3>

            {popularPosts.map((post) => (
              <div className="popular-post" key={post.id}>
                <img src={post.image} alt="" />
                <p>{post.title}</p>
              </div>
            ))}
          </div>

          <div className="sidebar-card">
            <h3>Tags</h3>

            <div className="tags">
              <span>ACCESSORIES</span>
              <span>CLOTHING</span>
              <span>DECOR</span>
              <span>HOODIES</span>
              <span>MUSIC</span>
              <span>TSHIRTS</span>
            </div>
          </div>

          <div className="sidebar-card ad-banner">
            <img
              src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800"
              alt=""
            />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Bench;