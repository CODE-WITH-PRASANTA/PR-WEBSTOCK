import React from "react";
import "./IndustryTools.css";

// Import the exact logos
import figmaLogo from "../../assets/figma-icon.webp";
import vsLogo from "../../assets/vs-icon.webp";
import gitLogo from "../../assets/git-icon.webp";
import reactLogo from "../../assets/react-icon.webp";
import phpLogo from "../../assets/php-icon.webp";
import mysqlLogo from "../../assets/mysql-icon.webp";
import gitlabLogo from "../../assets/gitlab-icon.webp";
import awsLogo from "../../assets/aws-icon.webp";

const tools = [
  { name: "FIGMA", logo: figmaLogo },
  { name: "VISUAL STUDIO", logo: vsLogo },
  { name: "GIT", logo: gitLogo },
  { name: "REACT", logo: reactLogo },
  { name: "PHP", logo: phpLogo },
  { name: "MYSQL", logo: mysqlLogo },
  { name: "GITLAB", logo: gitlabLogo },
  { name: "AWS", logo: awsLogo },
];

export default function ToolsStack() {
  return (
    <section className="tools-section">
      <div className="tools-container">

        {/* Heading */}
        <div className="tools-heading">
          <div className="tools-badge">
            <span className="tools-badge-dot" />
            <span className="tools-badge-text">Our Tools</span>
            <span className="tools-badge-dot" />
          </div>

          <h2 className="tools-title">
            Our Design Technology <br />
            <span className="tools-title-light">Tools Stack.</span>
          </h2>
        </div>

        {/* TOOL CARDS BELOW HEADING */}
        <div className="tools-grid">
          {tools.map((tool) => (
            <div className="tool-card" key={tool.name}>
              <img src={tool.logo} alt={tool.name} className="tool-logo" />
              <span className="tool-name">{tool.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
