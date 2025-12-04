import React from 'react'
import Herosection from '../../Components/Herosection/Herosection'
import News from '../../Components/News/News'
import Homeabout from '../../Components/Homeabout/Homeabout'
import Oursolutions from '../../Components/Oursolutions/Oursolutions'
import Creativeshowcase from '../../Components/Creativeshowcase/Creativeshowcase'

const Home = () => {
  return (
    <div>
      <Herosection/>
      <News/>
      <Homeabout/>
      <Oursolutions/>
      <Creativeshowcase/>
    </div>
  )
}

export default Home