import React from "react";
import { Helmet } from "react-helmet-async";

import AboutBreadcrum from "../../Components/AboutBreadcrum/AboutBreadcrum";
import AboutUsExpertise from "../../Components/AboutUsExpertise/AboutUsExpertise";
import AboutUsCoreValues from "../../Components/AboutUsCoreValues/AboutUsCoreValues";
import AwardsSection from "../../Components/AwardsSection/AwardsSection";
import Partners from "../../Components/Partners/Partners";
import WorkingProcess from "../../Components/WorkingProcess/WorkingProcess";
import TeamSection from "../../Components/TeamSection/TeamSection";
import CompanyShowcase from "../../Components/CompanyShowcase/CompanyShowcase";
import BlogShowcase from "../../Components/BlogShowcase/BlogShowcase";

const About = () => {
  return (
    <div>
      <Helmet>
        <title>About PR Webstock | Leading Software, Web & App Development Company</title>
        <meta
          name="description"
          content="PR Webstock is a leading software development company delivering custom websites, mobile apps, CRM, ERP systems, UI/UX design, and enterprise IT solutions."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

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