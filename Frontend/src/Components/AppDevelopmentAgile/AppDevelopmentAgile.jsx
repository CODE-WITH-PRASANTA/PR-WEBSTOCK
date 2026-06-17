import React, { useState } from "react";
import "./AppDevelopmentAgile.css";

// import your 7 images (replace paths with your own)
import imgPlanning from "../../assets/planning.webp";
import imgDesign from "../../assets/App-img-6.webp";
import imgDevelopment from "../../assets/Dev.webp";
import imgTesting from "../../assets/App-img-4.webp";
import imgReview from "../../assets/App-img-3.webp";
import imgDeployment from "../../assets/App-img-2.webp";
import imgMonitoring from "../../assets/App-img-1.webp";


const steps = [
  {
    title: "Planning",
    description:
      "PR WEBSTOCK begins every project with detailed planning, requirement analysis, and goal setting to ensure successful mobile app development for businesses in Bhubaneswar, Odisha and beyond.",
    image: imgPlanning,
  },
  {
    title: "Design",
    description:
      "Our UI/UX designers create intuitive wireframes and engaging interfaces that enhance user experience and align with your business objectives.",
    image: imgDesign,
  },
  {
    title: "Development",
    description:
      "Using modern technologies and agile practices, PR WEBSTOCK develops secure, scalable, and feature-rich Android, iOS, and cross-platform mobile applications.",
    image: imgDevelopment,
  },
  {
    title: "Testing",
    description:
      "Comprehensive testing ensures your application performs smoothly, remains secure, and delivers a seamless experience across all supported devices.",
    image: imgTesting,
  },
  {
    title: "Review and Feedback",
    description:
      "Regular project reviews and client feedback sessions help our Bhubaneswar, Odisha team continuously improve the product throughout development.",
    image: imgReview,
  },
  {
    title: "Deployment",
    description:
      "PR WEBSTOCK manages app deployment, final optimization, and app store submission to ensure a successful launch for your mobile application.",
    image: imgDeployment,
  },
  {
    title: "Monitoring and Maintenance",
    description:
      "After launch, we provide ongoing monitoring, maintenance, updates, and technical support to keep your application secure, optimized, and ready for future growth.",
    image: imgMonitoring,
  },
];


const AgileMethodology = () => {
  const [activeIndex, setActiveIndex] = useState(2); // default "Development" like screenshot

  const activeStep = steps[activeIndex];

  return (
    <section className="agile-section">
      {/* Heading */}
      <h2 className="agile-title">Agile Mobile App Development Process at PR WEBSTOCK </h2>

      {/* intro line + text */}
      <div className="agile-intro-row">
        <div className="agile-intro-line" />
    
          <p className="agile-intro-text">
              PR WEBSTOCK follows an agile mobile app development methodology to deliver
              innovative, scalable, and high-performance applications. Based in
              Bhubaneswar, Odisha, our team uses a collaborative approach that improves
              flexibility, transparency, and faster project delivery. As a trusted mobile
              app development company in Bhubaneswar, Odisha, PR WEBSTOCK ensures every
               stage of development is optimized to create reliable Android, iOS, and
                cross-platform applications.
           </p>

      </div>

      {/* main layout */}
      <div className="agile-main">
        {/* LEFT: tilted image + rectangle */}
        <div className="agile-image-wrapper">
          <div className="agile-image-inner">
            <div className="agile-rect" />
            <img
              src={activeStep.image}
              alt={activeStep.title}
              className="agile-image"
            />
          </div>
        </div>

        {/* RIGHT: steps list */}
        <div className="agile-steps">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`agile-step-row ${
                index === steps.length - 1 ? "last" : ""
              }`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div
                className={`agile-step-title ${
                  index === activeIndex ? "active" : ""
                }`}
              >
                {step.title}
              </div>
              <div className="agile-step-description">{step.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgileMethodology;
