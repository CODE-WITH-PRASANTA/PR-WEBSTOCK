import React from 'react'
import CostPerUnit from '../../Component/CostPerUnit/CostPerUnit'
import TotalRevenue from '../../Component/TotalRevenue/TotalRevenue'
import RecentCoustomer from '../../Component/RecentCoustomer/RecentCoustomer'
import Summary from '../../Component/Summary/Summary'
import EmpPerfomance from '../../Component/EmpPerfomance/EmpPerfomance'
import Event from '../../Component/Event/Event'
import LeaveRequest from '../../Component/LeaveRequest/LeaveRequest'
import Gender from '../../Component/Gender/Gender'

const Dashboard = () => {
  return (
    <div>
   <CostPerUnit />
   <TotalRevenue />
   <Summary />
  <EmpPerfomance/>
  <Event/>
  <LeaveRequest/>
  <Gender/>
    </div>
  )
}

export default Dashboard