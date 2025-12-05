import React from 'react'
import Herosection from '../../Components/Herosection/Herosection'
import News from '../../Components/News/News'
import Homeabout from '../../Components/Homeabout/Homeabout'
import Oursolutions from '../../Components/Oursolutions/Oursolutions'
import Creativeshowcase from '../../Components/Creativeshowcase/Creativeshowcase'
import Contactus from '../../Components/Contactus/Contactus'
import Footer from '../../Components/Footer/Footer'
import Blueprint from '../../Components/Blueprint/Blueprint'
import Successinthefield from '../../Components/Successinthefield/Successinthefield'
import Innovationdiaries from '../../Components/Innovationdiaries/Innovationdiaries'
import Clientstories from '../../Components/Clientstories/Clientstories'
import Workflowinsights from '../../Components/Workflowinsights/Workflowinsights'

const Home = () => {
  return (
    <div>
      <Herosection/>
      <News/>
      <Homeabout/>
      <Oursolutions/>
      <Creativeshowcase/>
      <Blueprint/>
      <Successinthefield/>
      {/* <Workflowinsights/> */}
      <Clientstories/>
      <Innovationdiaries/>
    </div>
  )
}

export default Home