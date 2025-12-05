import React from 'react'
import'./AboutUs.css'
import AboutUsExpertise from '../../Components/AboutUsExpertise/AboutUsExpertise'
import AboutUsCoreValues from '../../Components/AboutUsCoreValues/AboutUsCoreValues'
import Partners from '../../Components/Partners/Partners'
import WorkingProcess from '../../Components/WorkingProcess/WorkingProcess'
import CompanyShowcase from '../../Components/CompanyShowcase/CompanyShowcase'
import AwardsSection from '../../Components/AwardsSection/AwardsSection'
import TeamSection from '../../Components/TeamSection/TeamSection'
import BlogShowcase from '../../Components/BlogShowcase/BlogShowcase'

const AboutUs = () => {
  return (
    <>
    <AboutUsExpertise/>
    <AboutUsCoreValues/>
    <Partners/>
    <WorkingProcess/>
    <CompanyShowcase/>
    <AwardsSection/>
    <TeamSection/>
    <BlogShowcase/>
    
    
    
    </>
  )
}

export default AboutUs