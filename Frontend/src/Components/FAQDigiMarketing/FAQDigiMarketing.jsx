import React, { useState } from "react";
import "./FAQDigiMarketing.css";

const faqs = [
  {
    question: "How does digital marketing benefit my business?",
    answer:
      "Digital marketing increases brand awareness, attracts targeted customers, provides cost-effective solutions, allows tracking, and helps build trust and credibility.",
  },
  {
    question: "What are the most effective digital marketing strategies?",
    answer:
      "SEO, PPC advertising, content marketing, social media marketing, email marketing, and conversion rate optimization are among the most effective strategies.",
  },
  {
    question: "What are some of the advantages of digital marketing?",
    answer:
      "It offers global reach, measurable results, lower costs, real-time analytics, better targeting, and improved customer engagement.",
  },
  {
    question: "How do SEO and SEM differ from each other?",
    answer:
      "SEO focuses on organic search visibility, while SEM includes paid search advertising for immediate visibility and traffic.",
  },
  {
    question: "What role does social media play in digital marketing?",
    answer:
      "Social media helps build brand awareness, engage audiences, generate leads, and promote products through targeted campaigns.",
  },
  {
    question: "How long does it take to see results from digital marketing?",
    answer:
      "Results vary, but SEO may take 3–6 months, while PPC and social media ads can generate immediate results.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently asked question (FAQ)</h2>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className={`faq-question ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className="icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>

            <div
              className={`faq-answer ${
                activeIndex === index ? "show" : ""
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
