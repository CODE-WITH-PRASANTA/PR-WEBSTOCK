import React from 'react'
import DashboardHome from '../../Components/DashboardHome/DashboardHome'
import DashboardSection from '../../Components/DashboardSection/DashboardSection'
import DashboardProject from '../../Components/DashboardProject/DashboardProject'
import Projectlist from '../../Components/Projectlist/Projectlist'

const Dashboard = () => {
  return (
    <div>
      <DashboardHome/>
      <DashboardSection/>
      <DashboardProject/>
      <Projectlist/>
    </div>
  )
}

export default Dashboard