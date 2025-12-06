import React from 'react'
import AboutBreadcrum from '../../Components/AboutBreadcrum/AboutBreadcrum'
import AboutUsCoreValues from '../../Components/AboutUsCoreValues/AboutUsCoreValues'
import AboutUsExpertise from '../../Components/AboutUsExpertise/AboutUsExpertise'
import AwardsSection from '../../Components/AwardsSection/AwardsSection'
import Partners from '../../Components/Partners/Partners'
import WorkingProcess from '../../Components/WorkingProcess/WorkingProcess'
import TeamSection from '../../Components/TeamSection/TeamSection'
import CompanyShowcase from '../../Components/CompanyShowcase/CompanyShowcase'
import BlogShowcase from '../../Components/BlogShowcase/BlogShowcase'

const About = () => {
  return (
    <div>
      <AboutBreadcrum />
      <AboutUsExpertise />
      <AboutUsCoreValues/>
      <AwardsSection />
      <Partners/>
      <WorkingProcess/>
      <TeamSection/>
      <CompanyShowcase/>
      <BlogShowcase/>
    </div>
  )
}

export default About
