import React, { useState } from "react";
import "./AppDevelopmentFAQ.css";

const faqs = [
  {
    question: "What is the process of creating an app?",
    answer:
      "We follow a streamlined and efficient process to deliver exceptional mobile apps within your budget and on time. Our skilled team is tailored to meet your specific expectations and adheres to the agile methodology. This approach helps in eliminating waste and minimizing costs and risks, ensuring a smooth project journey."
  },
  {
    question: "How much time will it take to build and launch the app?",
    answer:
      "The timeline depends on the complexity of the app, required features, and design. Typically, a standard mobile app can take anywhere from a few weeks to several months, including development, testing, and deployment."
  },
  {
    question: "Do you give a price estimate?",
    answer:
      "Yes, after understanding your requirements, we provide a detailed project proposal with a transparent cost estimate and timeline."
  },
  {
    question: "What kind of support will be provided through the development process?",
    answer:
      "We provide continuous communication, regular progress updates, testing feedback loops, and dedicated support throughout the development lifecycle."
  },
  {
    question: "Do you offer maintenance services?",
    answer:
      "Yes, we offer ongoing maintenance and post-launch support to ensure your app remains secure, updated, and fully optimized."
  },
  {
    question: "Can you build apps for both iOS and Android?",
    answer:
      "Absolutely. We build native as well as cross-platform apps that work seamlessly on both iOS and Android devices."
  },
  {
    question: "Should I develop in Android or iOS?",
    answer:
      "It depends on your target audience, budget, and business goals. We help you decide the best platform or recommend building for both."
  },
  {
    question:
      "Is there a difference between native and cross-platform app development?",
    answer:
      "Yes. Native apps are built specifically for one platform and offer high performance, while cross-platform apps share code across platforms and are more cost-effective. We help you choose the right approach."
  },
  {
    question: "Do you have UI/UX design services?",
    answer:
      "Yes, our dedicated UI/UX team designs intuitive and visually engaging interfaces tailored to your brand and user needs."
  },
  {
    question: "Who will own the IP rights to my application?",
    answer:
      "You retain full ownership and IP rights to your application and its source code as outlined in the agreement."
  },
  {
    question: "Can you sign an NDA for the app you're developing?",
    answer:
      "Yes, we are happy to sign a Non-Disclosure Agreement to ensure your idea and business information remain confidential."
  }
];

const FaqSection = () => {
  // First question open by default (like screenshot)
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently asked question (FAQ)</h2>

      <div className="faq-list">
        {faqs.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div key={item.question} className="faq-item">
              <button
                className={`faq-question-row ${isActive ? "active" : ""}`}
                onClick={() => handleToggle(index)}
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
    </section>
  );
};

export default FaqSection;
