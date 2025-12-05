import React from 'react'
import IndustryWorkBreadcrum from '../../Components/IndustryWorkBreadcrum/IndustryWorkBreadcrum'
import IndustryCard from '../../Components/IndustryCard/IndustryCard'
import IndustryHowWeDo from '../../Components/IndustryHowWeDo/IndustryHowWeDo'
import IndustrySoftware from '../../Components/IndustrySoftware/IndustrySoftware'
import IndustryProcessSteps from '../../Components/IndustryProcessSteps/IndustryProcessSteps'
import IndustryService from '../../Components/IndustryService/IndustryService'
import IndustryTools from '../../Components/IndustryTools/IndustryTools'

const IndustryWork = () => {
  return (
    <div>
      <IndustryWorkBreadcrum />
      <IndustryCard />
      <IndustryHowWeDo />
      <IndustrySoftware />
      <IndustryProcessSteps />
      <IndustryService />
      <IndustryTools />
    </div>
  )
}

export default IndustryWork
