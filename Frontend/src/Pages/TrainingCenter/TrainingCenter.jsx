import React from 'react'
import TrainingCenterMain from '../../Components/TrainingCenterMain/TrainingCenterMain'
import PopularCourses from '../../Components/PopularCourses/PopularCourses'
import OurFeatures from '../../Components/OurFeatures/OurFeatures'
import PricingPlan from '../../Components/PricingPlan/PricingPlan'
import TrainingTestimonial from '../../Components/TrainingTestimonial/TrainingTestimonial'
import LatestBlog from '../../Components/LatestBlog/LatestBlog'

const TrainingCenter = () => {
  return (
    <div>
        <TrainingCenterMain/>
        <PopularCourses/>
        <OurFeatures/>
        <PricingPlan/>
        <TrainingTestimonial/>
        <LatestBlog />
    </div>
  )
}

export default TrainingCenter