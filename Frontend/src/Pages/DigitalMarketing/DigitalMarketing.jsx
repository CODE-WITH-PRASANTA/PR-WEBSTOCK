import React from 'react'
import './DigitalMarketing.css'
import DigitalMarketingBreadcrum from '../../Components/DigitalMarketingBreadcrum/DigitalMarketingBreadcrum'
import GooglePartner from '../../Components/GooglePartner/GooglePartner'
import ResultDigi from '../../Components/ResultDigi/ResultDigi'
import ServicesSection from '../../Components/DigitalService/DigitalService'
import ServiceModels from '../../Components/Models/Models'
import RoiSolution from '../../Components/RoiSolution/RoiSolution'
import BusinessesChoose from '../../Components/BusinessesChoose/BusinessesChoose'


const DigitalMarketing = () => {
  return (
    <div>
        <DigitalMarketingBreadcrum />
        <GooglePartner/>
        <ResultDigi/>
        <ServicesSection />
        <ServiceModels />
        <RoiSolution/>
        <BusinessesChoose/>      
    </div>
  )
}

export default DigitalMarketing