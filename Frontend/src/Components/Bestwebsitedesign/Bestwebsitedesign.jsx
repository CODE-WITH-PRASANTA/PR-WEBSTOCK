import React from "react";
import "./Bestwebsitedesign.css";

// Import your image
import webDesignImg from "../../assets/wbd1.jpg"; // Change path if needed

const Bestwebsitedesign = () => {
  return (
    <section className="bwd-section">
      <div className="bwd-container">
        {/* TOP HEADING AREA */}
        <div className="bwd-top">
          <div className="bwd-top-left">
            <h2 className="bwd-main-heading">
              What Makes PR WEBSTOCK the Best Web Design Company in
              Bhubaneswar?
            </h2>
          </div>

          <div className="bwd-top-right">
            <p>
              At PR WEBSTOCK, we don’t just design websites — we build digital
              experiences that help businesses grow. Based in Bhubaneswar and
              serving clients all over India, we are known for delivering
              clean, fast, and fully coding-based web design solutions tailored
              to real business needs.
            </p>

            <p>
              What makes us stand out as the best web design company in
              Bhubaneswar is our focus on strategy, performance, and usability.
              Every website we create is designed to load faster, work smoothly
              across devices, and support long-term scalability.
            </p>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="bwd-layout">
          {/* LEFT IMAGE SECTION */}
          <aside className="bwd-left">
  <div className="bwd-left-inner">
    <div className="bwd-image-wrapper">
      <div className="bwd-image-card">
        <img
          src={webDesignImg}
          alt="PR WEBSTOCK Web Design Company"
        />
      </div>
    </div>
  </div>
</aside>

          {/* RIGHT CONTENT WITH HIDDEN SCROLLBAR */}
          <div className="bwd-right-scroll">
            <div className="bwd-right">

              {/* GROUP 1 */}
              <div className="bwd-feature-group">
                <div className="bwd-feature-row">
                  <div className="bwd-feature-title highlight">
                    Unmatched Customer <br /> Service
                  </div>

                  <div className="bwd-feature-points">
                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        At PRWEBSTOCK, client satisfaction is at the core of
                        everything we do. As a trusted web design company in
                        Bhubaneswar, we focus on long-term partnerships, not
                        just project delivery.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Dedicated focus on understanding client goals and
                        business needs.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Continuous support, guidance, and transparent
                        communication.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Making your business success our top priority.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bwd-divider"></div>

                <div className="bwd-feature-row">
                  <div className="bwd-feature-title">
                    Project Comprehension
                  </div>

                  <div className="bwd-feature-points">
                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        A successful website starts with clear understanding.
                        At PR WEBSTOCK, we take time to fully understand your
                        business before writing a single line of code.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Open and honest communication from day one.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Respecting and incorporating client ideas and feedback.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* GROUP 2 */}
              <div className="bwd-feature-group">
                <div className="bwd-feature-row">
                  <div className="bwd-feature-title">
                    Close Collaboration
                  </div>

                  <div className="bwd-feature-points">
                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        At PRWEBSTOCK, we focus on building websites that are
                        simple to use, fast to load, and strong at the code
                        level. Our design and development process ensures
                        performance, security, and long-term scalability.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Intuitive user experience with smooth and reliable
                        functionality.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Multiple testing stages to deliver error-free web
                        solutions.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Website goes live only after meeting industry quality
                        standards.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bwd-divider"></div>

                <div className="bwd-feature-row">
                  <div className="bwd-feature-title">
                    Web Design & Development
                  </div>

                  <div className="bwd-feature-points">
                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        We build modern, responsive websites using MERN Stack
                        (MongoDB, Express, React, Node.js).
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Fully code-based web design for better performance and
                        SEO.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Scalable architecture for future business growth.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* GROUP 3 */}
              <div className="bwd-feature-group">
                <div className="bwd-feature-row">
                  <div className="bwd-feature-title highlight">
                    Highly Skilled Team
                  </div>

                  <div className="bwd-feature-points">
                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        A team of experts specializing in web design,
                        development, hosting, and integrations.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        End-to-end service from idea, planning, and UI design
                        to deployment.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Strong problem-solving mindset to handle complex and
                        custom requirements.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Quality-driven development aligned with your long-term
                        business growth.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bwd-divider"></div>

                <div className="bwd-feature-row">
                  <div className="bwd-feature-title">
                    Precision-Led Interface
                  </div>

                  <div className="bwd-feature-points">
                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Design is not just about visuals—it’s about usability
                        and clarity. Our web design services focus on creating
                        interfaces that are clean, intuitive, and easy to
                        navigate.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Carefully crafted UI for smooth and engaging user
                        experience.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Design aligned with your brand identity and business
                        goals.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bwd-divider"></div>

                <div className="bwd-feature-row">
                  <div className="bwd-feature-title">
                    Web Speed Optimization
                  </div>

                  <div className="bwd-feature-points">
                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Speed plays a major role in user experience and SEO.
                        At PRWEBSTOCK, we build performance into every layer of
                        the website.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Advanced speed optimization built into our coding-based
                        stack.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Fast loading pages using MERN Stack development.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Optimized images with Cloudinary cloud storage.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bwd-divider"></div>

                <div className="bwd-feature-row">
                  <div className="bwd-feature-title">
                    Customized Experience
                  </div>

                  <div className="bwd-feature-points">
                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Every business is unique. That's why we provide a fully
                        customized web design experience built around your
                        goals.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Close collaboration to understand your brand,
                        objectives, and target users.
                      </p>
                    </div>

                    <div className="bwd-point">
                      <span className="bwd-arrow">→</span>
                      <p>
                        Tailored website features developed with full
                        code-based MERN Stack technology.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bestwebsitedesign;