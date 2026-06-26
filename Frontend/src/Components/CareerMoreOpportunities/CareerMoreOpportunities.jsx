import React from "react";
import "./CareerMoreOpportunities.css";

import { FiUser, FiUsers, FiCheckCircle, FiArrowRight } from "react-icons/fi";

const features = [
  {
    id: 1,
    icon: <FiUser />,
    title: "Web Development Careers",
    text: "Join PR WEBSTOCK, a leading software development company in Bhubaneswar, and build modern websites, web applications, and enterprise solutions using the latest technologies. Grow your career with real-world projects and expert mentorship.",
  },
  {
    id: 2,
    icon: <FiUsers />,
    title: "App Development Opportunities",
    text: "Work on innovative Android, iOS, and cross-platform mobile applications. At PR WEBSTOCK, our developers create scalable and user-friendly apps for startups, businesses, and global clients while gaining hands-on industry experience.",
  },
  {
    id: 3,
    icon: <FiCheckCircle />,
    title: "Digital Marketing & Social Media",
    text: "Build your future in Digital Marketing, SEO, Social Media Management, Content Marketing, and Brand Promotion. Learn industry-leading strategies and help businesses grow their online presence through result-driven campaigns.",
  },
];

const CareerMoreOpportunities = () => {
  return (
    <section className="careermoreopportunities-section">
      <div className="careermoreopportunities-container">
        {/* Left side */}
        <div className="careermoreopportunities-left">
         <h2 className="careermoreopportunities-title">
  Career Opportunities at
  <br />
  PR WEBSTOCK
          </h2>

          <p className="careermoreopportunities-text">
            Start your professional journey with PR WEBSTOCK, one of the fastest-growing software development companies in Bhubaneswar. We provide exciting career opportunities in Web Development, Mobile App Development, Digital Marketing, SEO, Social Media Management, UI/UX Design, and Business Development.
            <br /><br />
            Our team works on real-world projects for businesses across various industries, helping professionals gain practical experience, improve technical skills, and build successful careers in the IT sector. Whether you are a fresher, intern, or experienced professional, we offer a collaborative environment where innovation, learning, and career growth come first.
            <br /><br />
            Join PR WEBSTOCK and become part of a team that is shaping the future of technology and digital transformation in Bhubaneswar and across India.
          </p>
        </div>

        {/* Right side */}
        <div className="careermoreopportunities-right">
          {features.map((item) => (
            <div key={item.id} className="careermoreopportunities-feature">
              <div className="careermoreopportunities-feature-iconwrap">
                <span className="careermoreopportunities-feature-icon">{item.icon}</span>
              </div>

              <div className="careermoreopportunities-feature-content">
                <h3 className="careermoreopportunities-feature-title">{item.title}</h3>
                <p className="careermoreopportunities-feature-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerMoreOpportunities;
