import React from 'react'
import DashA from '../../Component/DashA/DashA'
import ProjectWork from '../../Component/ProjectWork/ProjectWork'
import ProjectStatusOverview from '../../Component/ProjectStatusOverview/ProjectStatusOverview'
import RecentDocuments from '../../Component/RecentDocuments/RecentDocuments'
import SupportTickets from '../../Component/SupportTickets/SupportTickets'
import Invoices from '../../Component/Invoices/Invoices'


const Dashboard = () => {
  return (
    <div>
      <DashA/>
      <ProjectWork/>
      <ProjectStatusOverview/>
      <RecentDocuments/>
      <SupportTickets/>
      <Invoices/>
      
    </div>
  )
}

export default Dashboard