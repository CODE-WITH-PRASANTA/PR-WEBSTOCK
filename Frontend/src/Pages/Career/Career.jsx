import React from 'react'
import CareerBreadcrum from '../../Components/CareerBreadcrum/CareerBreadcrum'
import CareerLatestJob from '../../Components/CareerLatestJob/CareerLatestJob'
import CareerMoreOpportunities from '../../Components/CareerMoreOpportunities/CareerMoreOpportunities'
import CareerBlogAndArticle from '../../Components/CareerBlogAndArticle/CareerBlogAndArticle'
import FrontendDev from '../../Components/FrontendDev/FrontendDev'
import AccountBdmExe from '../../Components/AccountBdmExe/AccountBdmExe'
// import CareerBrowseJob from '../../Components/CareerBrowseJob/CareerBrowseJob'

const Career = () => {
  return (
    <div>
      <CareerBreadcrum />
      <AccountBdmExe/>
      <CareerMoreOpportunities/>
      <CareerBlogAndArticle/>
    </div>
  )
}

export default Career
