import React from 'react'
import CostPerUnit from '../../Component/CostPerUnit/CostPerUnit'
import TotalRevenue from '../../Component/TotalRevenue/TotalRevenue'
import RecentCoustomer from '../../Component/RecentCoustomer/RecentCoustomer'

const Dashboard = () => {
  return (
    <div>
   <CostPerUnit />
   <TotalRevenue />
   <RecentCoustomer />
    </div>
  )
}

export default Dashboard