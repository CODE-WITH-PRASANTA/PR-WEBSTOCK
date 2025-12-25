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
      "Define project scope, goals & requirements, and break tasks into user stories. Prioritize and estimate efforts to create a clear project plan.",
    image: imgPlanning,
  },
  {
    title: "Design",
    description:
      "Create wireframes and UI/UX designs to visualize app structure and user interactions.",
    image: imgDesign,
  },
  {
    title: "Development",
    description:
      "Iteratively build and code the app, releasing new features and functionalities in regular increments.",
    image: imgDevelopment,
  },
  {
    title: "Testing",
    description:
      "Conduct comprehensive testing, including unit, integration, and user acceptance testing, to ensure quality and functionality.",
    image: imgTesting,
  },
  {
    title: "Review and feedback",
    description:
      "Regularly review progress, gather stakeholder feedback, and incorporate it into subsequent iterations for continuous improvement.",
    image: imgReview,
  },
  {
    title: "Deployment",
    description:
      "Prepare the app for release, including final testing, bug fixing, and submission to app stores for distribution.",
    image: imgDeployment,
  },
  {
    title: "Monitoring and maintenance",
    description:
      "Monitor app performance, address user feedback, and continuously enhance the app through updates and maintenance activities.",
    image: imgMonitoring,
  },
];

const AgileMethodology = () => {
  const [activeIndex, setActiveIndex] = useState(2); // default "Development" like screenshot

  const activeStep = steps[activeIndex];

  return (
    <section className="agile-section">
      {/* Heading */}
      <h2 className="agile-title">Agile methodology for app development</h2>

      {/* intro line + text */}
      <div className="agile-intro-row">
        <div className="agile-intro-line" />
        <p className="agile-intro-text">
          Webomindapps has adopted agile methodology in the app development process.
          It offers numerous benefits such as fostering collaboration, flexibility, and
          efficient project management. The stages in agile development typically include:
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
