import React from "react";
import { Helmet } from "react-helmet";
import AboutBreadcrum from "../../Components/AboutBreadcrum/AboutBreadcrum";
import AboutUsCoreValues from "../../Components/AboutUsCoreValues/AboutUsCoreValues";
import AboutUsExpertise from "../../Components/AboutUsExpertise/AboutUsExpertise";
import AwardsSection from "../../Components/AwardsSection/AwardsSection";
import Partners from "../../Components/Partners/Partners";
import WorkingProcess from "../../Components/WorkingProcess/WorkingProcess";
import TeamSection from "../../Components/TeamSection/TeamSection";
import CompanyShowcase from "../../Components/CompanyShowcase/CompanyShowcase";
import BlogShowcase from "../../Components/BlogShowcase/BlogShowcase";

const About = () => {
  return (
    <div>

      {/* ================================
          SEO META TAGS (IMPORTANT)
      ================================= */}
      <Helmet>
        <title>About PR Webstock | Leading Software, Web & App Development Company</title>

        <meta
          name="description"
          content="PR Webstock is a leading software development company delivering custom websites, mobile apps, CRM, ERP systems, UI/UX design, and enterprise IT solutions. We help businesses grow through modern technology, automation, and digital transformation."
        />

        <meta
          name="keywords"
          content="
            PR Webstock,
            software development company,
            IT services company,
            web development agency,
            mobile app development,
            MERN stack development,
            custom software development,
            website design company,
            digital transformation,
            enterprise software,
            CRM development,
            ERP solutions,
            API integration,
            cloud solutions,
            India software company
          "
        />

        <meta name="robots" content="index, follow" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="About PR Webstock | IT & Software Development Company" />
        <meta property="og:description" content="Learn about PR Webstock — a trusted software, web, and app development company delivering innovative digital solutions across industries." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ================================
              EXISTING PAGE CONTENT
      ================================= */}
      <AboutBreadcrum />
      <AboutUsExpertise />
      <AboutUsCoreValues />
      <AwardsSection />
      <Partners />
      <WorkingProcess />
      <TeamSection />
      <CompanyShowcase />
      <BlogShowcase />
    </div>
  );
};

export default About;
