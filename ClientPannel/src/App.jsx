import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout/MainLayout";
import MyProjects from "./Component/MyProjects/MyProjects";
import ProjectDetails from "./Component/ProjectDetails/ProjectDetails";
import ProjectTimeline from "./Component/ProjectTimeline/ProjectTimeline";
import ProjectTask from "./Component/ProjectTask/ProjectTask";
import ProjectFiles from "./Component/ProjectFiles/ProjectFiles";
import Tickets from "./Component/Tickets/Tickets";
import TicketDetails from "./Component/TicketDetails/TicketDetails";
import Dashboard from "./Pages/Dashboard/Dashboard";



// Pages

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout */}
        <Route path="/" element={<MainLayout />}>
        <Route path= "/client/payment-history" element={<PaymentHistroy />} />
        <Route path= "/client/payments" element={<Payments />} />
        <Route path= "/client/invoice-details" element={<InvoiceDetails />} />
        <Route path= "/client/invoices" element={<Invoices />} />
        
        <Route path= "/client/payment-methods" element={<PaymentMethod />} />




      
      
        <Route path="/client/projects" element={<MyProjects />} />
        <Route path="/client/project-details" element={<ProjectDetails />} />
        <Route path="/client/project-timeline" element={<ProjectTimeline />} />
        <Route path="/client/project-tasks" element={<ProjectTask />} />
        <Route path="/client/project-files" element={<ProjectFiles />} />
        <Route path="/client/tickets" element={<Tickets />} />
        <Route path="/client/ticket-details" element={<TicketDetails/>} />
        <Route path="/client/dashboard" element={<Dashboard/>} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;