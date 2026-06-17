import React, { useState } from "react";
import "./AppDevelopmentFAQ.css";


const faqs = [
  {
    question: "What mobile app development services does PR WEBSTOCK provide?",
    answer:
      "PR WEBSTOCK offers Android app development, iOS app development, hybrid app development, and cross-platform mobile app development services for startups, businesses, and enterprises in Bhubaneswar, Odisha."
  },
  {
    question: "What is the mobile app development process at PR WEBSTOCK?",
    answer:
      "Our process includes project consultation, requirement analysis, UI/UX design, development, testing, deployment, and post-launch support. Our Bhubaneswar, Odisha team follows a structured approach to ensure successful project delivery."
  },
  {
    question: "How long does it take to develop a mobile application?",
    answer:
      "The development timeline depends on the complexity, features, and platform requirements. PR WEBSTOCK provides a detailed project timeline after understanding your business objectives."
  },
  {
    question: "Do you provide a project cost estimate before development?",
    answer:
      "Yes. PR WEBSTOCK provides transparent project estimates based on your requirements, features, design expectations, and development scope."
  },
  {
    question: "Do you offer Android and iOS app development services?",
    answer:
      "Yes. Our experienced developers create custom Android and iOS applications that deliver excellent performance, security, and user experience."
  },
  {
    question: "Can PR WEBSTOCK develop cross-platform mobile applications?",
    answer:
      "Absolutely. We use modern frameworks such as React Native and Flutter to build high-quality cross-platform applications that work seamlessly on Android and iOS devices."
  },
  {
    question: "Do you provide UI/UX design services?",
    answer:
      "Yes. Our UI/UX designers create intuitive, visually appealing, and user-friendly designs that enhance customer engagement and improve user satisfaction."
  },
  {
    question: "Do you offer mobile app maintenance and support?",
    answer:
      "Yes. PR WEBSTOCK provides ongoing maintenance, performance optimization, security updates, bug fixes, and technical support after application launch."
  },
  {
    question: "Who owns the source code and intellectual property rights?",
    answer:
      "Clients retain complete ownership of their application, source code, and intellectual property rights as defined in the project agreement."
  },
  {
    question: "Can PR WEBSTOCK sign a Non-Disclosure Agreement (NDA)?",
    answer:
      "Yes. We are happy to sign an NDA to ensure complete confidentiality and protection of your business ideas and project information."
  },
  {
    question: "Why choose PR WEBSTOCK for mobile app development in Bhubaneswar, Odisha?",
    answer:
      "PR WEBSTOCK combines technical expertise, innovative design, transparent communication, and reliable support to deliver scalable mobile applications that help businesses achieve their digital goals."
  }
];

const FaqSection = () => {
 const FAQS_PER_PAGE = 5;

const [currentPage, setCurrentPage] = useState(1);
const [activeIndex, setActiveIndex] = useState(null);

const totalPages = Math.ceil(faqs.length / FAQS_PER_PAGE);

const startIndex = (currentPage - 1) * FAQS_PER_PAGE;
const currentFaqs = faqs.slice(
  startIndex,
  startIndex + FAQS_PER_PAGE
);
  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently asked question (FAQ)</h2>

      <div className="faq-list">
        {currentFaqs.map((item, index) => {
  const actualIndex = startIndex + index;
          const isActive = actualIndex === activeIndex;
          return (
            <div key={item.question} className="faq-item">
              <button
                className={`faq-question-row ${isActive ? "active" : ""}`}
                onClick={() => handleToggle(actualIndex)}
              >
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-toggle-icon">
                  {isActive ? "−" : "+"}
                </span>
              </button>

              {isActive && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}

              {/* divider line under each item, like in screenshot */}
              <div className="faq-divider" />
            </div>
          );
        })}
      </div>
      <div className="faq-pagination">
  {Array.from({ length: totalPages }).map((_, index) => (
    <button
      key={index}
      className={`faq-page-btn ${
        currentPage === index + 1 ? "active" : ""
      }`}
      onClick={() => {
        setCurrentPage(index + 1);
        setActiveIndex(null);
      }}
    >
      {index + 1}
    </button>
  ))}
</div>
    </section>
  );
};

export default FaqSection;
