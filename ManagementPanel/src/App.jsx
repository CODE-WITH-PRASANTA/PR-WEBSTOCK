import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
 
import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import AllProjects from "./Pages/AllProjects/AllProjects";
import AddProjects from "./Components/AddProject/AddProject";
import EditProjects from "./Components/EditProjects/EditProjects";
import ProjectTasks from "./Components/ProjectTasks/ProjectTasks";
import ProjectBudget from "./Components/ProjectBudget/ProjectBudget";
import ProjectRiskIssue from "./Components/ProjectRiskIssue/ProjectRiskIssue";

import ProjectMembers from "./Components/ProjectMembers/ProjectMembers";
import ProjectFiles from "./Components/ProjectFiles/ProjectFiles";
import AllEmployees from "./Components/AllEmployees/AllEmployees";
import AddEmployee from "./Components/AddEmployee/AddEmployee";
import AddProject from "./Components/AddProject/AddProject";
import EmployeeShift from "./Components/EmployeeShift/EmployeeShift";
import EmployeeProfile from "./Components/EmployeeProfile/EmployeeProfile";
import EditManagement from "./Components/EditManagement/EditManagement";
import LeaveRequest from "./Components/LeaveRequest/LeaveRequest";
import LeaveBalance from "./Components/LeaveBalance/LeaveBalance";
import LeaveTypes from "./Components/LeaveTypes/LeaveTypes";
import LeaveSettings from "./Components/LeaveSettings/LeaveSettings";

import EmployeeDocuments from "./Components/EmployeeDocuments/EmployeeDocuments";
import EmployeeAssets from "./Components/EmployeeAssets/EmployeeAssets";
import AllHolidays from "./Components/AllHolidays/AllHolidays";
import AddHoliday from "./Components/AddHoliday/AddHoliday";
import EditHoliday from "./Components/EditHoliday/EditHoliday";
import AllClients from "./Components/AllClients/AllClients";
import AddClient from "./Components/AddClient/AddClient";
import EditClient from "./Components/EditClient/EditClient";
import ClientProfile from "./Components/ClientProfile/ClientProfile";
import ProjectDetails from "./Components/ProjectDetails/ProjectDetails";
import Estimates from "./Components/Estimates/Estimates";
import ClientContacts from "./Components/ClientContacts/ClientContacts";
import ClientProjects from "./Components/ClientProjects/ClientProjects";
import ClientInvoices from "./Components/ClientInvoices/ClientInvoices";
import ClientPayments from "./Components/ClientPayments/ClientPayments";

import Overtime from "./Pages/Overtime/Overtime";
import ShiftPlanning from "./Pages/ShiftPlanning/ShiftPlanning";
import Remote from "./Pages/Remote/Remote";
import EmployeeSalary from "./Components/EmployeeSalary/EmployeeSalary";
import PaySlip from "./Components/PaySlip/PaySlip";
import SalaryStructure from "./Components/SalaryStructure/SalaryStructure";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect */}
        <Route path="/" element={<Navigate to="/management/dashboard" replace />} />

        {/* Employee Layout */}
        <Route path="management" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="allproject" element={<AllProjects />} />
          <Route path="projects/add" element={<AddProjects />} />
          <Route path="projects/estimates" element={<Estimates />} />
          <Route path="projects/details" element={<ProjectDetails />} />
          <Route path="projects/edit" element={<EditProjects />} />
          <Route path="projects/tasks" element={<ProjectTasks />} />
          <Route path="projects/budget" element={<ProjectBudget/>}/>
          <Route path="projects/risks" element={<ProjectRiskIssue/>}/>
          <Route path="projects/members" element={<ProjectMembers/>}/>
          <Route path="projects/files" element={<ProjectFiles/>}/>
          <Route path="all" element={<AllEmployees/>}/>
          <Route path="add" element={<AddEmployee/>}/>
          <Route path="projects/add" element={<AddProject/>}/>
          <Route path="shift" element={<EmployeeShift/>}/>
          <Route path="profile" element={<EmployeeProfile/>}/>
          <Route path="edit" element={<EditManagement/>}/>
          <Route path="requests" element={<LeaveRequest />} />
          <Route path="leaves/settings" element={<LeaveSettings />} />
          <Route path="balance" element={<LeaveBalance />} />
          <Route path="leaves/types" element={<LeaveTypes />} />
          <Route path="salary" element={<EmployeeSalary />} />
          <Route path="payslip" element={<PaySlip />} />
          <Route path="documents" element={<EmployeeDocuments />}/>
          <Route path="assets" element={<EmployeeAssets />}/>
          <Route path="holidays/all" element={<AllHolidays/>}/>
         <Route path="holidays/add" element={<AddHoliday/>}/>
         <Route path="holidays/edit" element={<EditHoliday/>}/>
         <Route path="clients/all" element={<AllClients/>}/>
         <Route path="clients/add" element={<AddClient/>}/>
         <Route path="clients/edit" element={<EditClient/>}/>
         <Route path="clients/profile" element={<ClientProfile/>}/>
          <Route path="projects/details" element={<ProjectDetails/>}/>
          <Route path="projects/estimates" element={<Estimates/>}/>
          <Route path="clients/contacts" element={<ClientContacts/>}/>
          <Route path="clients/projects"element={<ClientProjects/>}/>
          <Route path="clients/invoices" element={<ClientInvoices/>}/>
          <Route path="clients/payments" element={<ClientPayments/>}/>
          <Route path="overtime"element={<Overtime/>}/>
          <Route path="shift-planning"element={<ShiftPlanning/>}/>
          <Route path="remote"element={<Remote/>}/>
          <Route path="structure"element={<SalaryStructure/>}/>

        </Route>

        {/* 404 */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App; 