import React, { useState, useRef, useEffect } from "react";
import "./Frequentlyaskedquestion.css";

const FAQ_ITEMS = [
  {
    q: "How long does it take for a mock design & project completion?",
    a: "At PR WEBSTOCK, the mock design usually takes 5–7 working days, depending on project complexity and requirements. Complete website development timelines typically range from 2 to 6 weeks.",
  },
  {
    q: "Do you provide free maintenance for websites?",
    a: "Yes. We offer limited free maintenance after launch, including minor fixes and support.",
  },
  {
    q: "Does your website design respond to desktop, mobile, and tablet?",
    a: "Absolutely. Every website we build is fully responsive and optimized for desktop, mobile, and tablet devices.",
  },
  {
    q: "How much does it cost to design a website?",
    a: "Website design costs vary based on business requirements, design complexity, and features.",
  },
  {
    q: "When can I expect delivery of the complete design work?",
    a: "Most projects are delivered within agreed milestones and timelines.",
  },

  // Additional FAQs

  {
    q: "Do you develop websites using MERN Stack?",
    a: "Yes, we specialize in MERN Stack development including MongoDB, Express.js, React.js, and Node.js.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes, we can redesign your current website with a modern UI, improved UX, and better performance.",
  },
  {
    q: "Do you provide SEO-friendly website development?",
    a: "Yes, all websites are built following SEO best practices including optimized code structure and fast loading speed.",
  },
  {
    q: "Will I get source code after project completion?",
    a: "Yes, clients receive complete source code and project files after final payment.",
  },
  {
    q: "Do you provide hosting and domain support?",
    a: "Yes, we help clients with domain registration, hosting setup, VPS deployment, and cloud hosting solutions.",
  },
];

const ITEMS_PER_PAGE = 5;

const Frequentlyaskedquestion = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const contentRefs = useRef([]);
  const [heights, setHeights] = useState([]);

  const totalPages = Math.ceil(FAQ_ITEMS.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentFAQs = FAQ_ITEMS.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    const newHeights = contentRefs.current.map((el) =>
      el ? el.scrollHeight : 0
    );
    setHeights(newHeights);
  }, [currentPage]);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const changePage = (page) => {
    setCurrentPage(page);
    setOpenIndex(null);
    window.scrollTo({
      top: document.querySelector(".faq-wrap")?.offsetTop - 100,
      behavior: "smooth",
    });
  };

  return (
    <section className="faq-wrap">
      <h2 className="faq-title">Frequently Asked Questions (FAQ)</h2>

      <div className="faq-list">
        {currentFAQs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`faq-item ${isOpen ? "is-open" : ""}`}
            >
              <button
                className="faq-item-button"
                onClick={() => toggle(index)}
              >
                <span className="faq-question">{item.q}</span>

                <span className="faq-icon">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              <div
                className="faq-panel"
                style={{
                  maxHeight: isOpen
                    ? `${heights[index]}px`
                    : "0px",
                }}
              >
                <div
                  className="faq-panel-inner"
                  ref={(el) => (contentRefs.current[index] = el)}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}

      <div className="faq-pagination">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`page-btn ${
              currentPage === i + 1 ? "active-page" : ""
            }`}
            onClick={() => changePage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => changePage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Frequentlyaskedquestion;