import React from 'react'
import './DigitalMarketingPage.css'
import DigitalMarketingBreadcrum from '../../Components/DigitalMarketingBreadcrum/DigitalMarketingBreadcrum'
import GooglePartner from '../../Components/GooglePartner/GooglePartner'
import ResultDigi from '../../Components/ResultDigi/ResultDigi'
import DigitalService from '../../Components/DigitalService/DigitalService'
import Models from '../../Components/Models/Models'
import RoiSolution from '../../Components/RoiSolution/RoiSolution'
import BusinessesChoose from '../../Components/BusinessesChoose/BusinessesChoose'

const DigitalMarketingPage = () => {
  return (
    <div>
              <DigitalMarketingBreadcrum />
        <GooglePartner/>
        <ResultDigi/>
        <DigitalService />
        <Models />
        <RoiSolution/>
        <BusinessesChoose/>     
    </div>
  )
}

export default DigitalMarketingPage
