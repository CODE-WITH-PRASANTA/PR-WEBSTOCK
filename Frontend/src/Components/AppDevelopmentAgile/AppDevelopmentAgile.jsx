import React, { useState } from "react";
import "./AppDevelopmentAgile.css";

// Import only ONE image
import agileImage from "../../assets/webd2.jpg"; // Change the path according to your project

const steps = [
  {
    title: "Planning",
    description:
      "PR WEBSTOCK begins every project with detailed planning, requirement analysis, and goal setting to ensure successful mobile app development for businesses in Bhubaneswar, Odisha and beyond.",
  },
  {
    title: "Design",
    description:
      "Our UI/UX designers create intuitive wireframes and engaging interfaces that enhance user experience and align with your business objectives.",
  },
  {
    title: "Development",
    description:
      "Using modern technologies and agile practices, PR WEBSTOCK develops secure, scalable, and feature-rich Android, iOS, and cross-platform mobile applications.",
  },
  {
    title: "Testing",
    description:
      "Comprehensive testing ensures your application performs smoothly, remains secure, and delivers a seamless experience across all supported devices.",
  },
  {
    title: "Review and Feedback",
    description:
      "Regular project reviews and client feedback sessions help our Bhubaneswar, Odisha team continuously improve the product throughout development.",
  },
  {
    title: "Deployment",
    description:
      "PR WEBSTOCK manages app deployment, final optimization, and app store submission to ensure a successful launch for your mobile application.",
  },
  {
    title: "Monitoring and Maintenance",
    description:
      "After launch, we provide ongoing monitoring, maintenance, updates, and technical support to keep your application secure, optimized, and ready for future growth.",
  },
];

const AgileMethodology = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <section className="agile-section">
      {/* Heading */}
      <h2 className="agile-title">
        Agile Mobile App Development Process at PR WEBSTOCK
      </h2>

      {/* Intro */}
      <div className="agile-intro-row">
        <div className="agile-intro-line"></div>

        <p className="agile-intro-text">
          PR WEBSTOCK follows an agile mobile app development methodology to
          deliver innovative, scalable, and high-performance applications.
          Based in Bhubaneswar, Odisha, our team uses a collaborative approach
          that improves flexibility, transparency, and faster project delivery.
          As a trusted mobile app development company in Bhubaneswar, Odisha,
          PR WEBSTOCK ensures every stage of development is optimized to create
          reliable Android, iOS, and cross-platform applications.
        </p>
      </div>

      {/* Main Section */}
      <div className="agile-main">
        {/* Left Side Image */}
        <div className="agile-image-wrapper">
          <div className="agile-image-card">
            <img
              src={agileImage}
              alt="PR WEBSTOCK"
              className="agile-image"
            />
          </div>
        </div>

        {/* Right Side Steps */}
        <div className="agile-steps">
          {steps.map((step, index) => (
            <div
              key={index}
              className="agile-step-row"
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div
                className={`agile-step-title ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                {step.title}
              </div>

              <div className="agile-step-description">
                {step.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgileMethodology;