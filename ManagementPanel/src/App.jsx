import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
 
import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import AllProjects from "./Pages/AllProjects/AllProjects";
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
import EmployeeDocuments from "./Components/EmployeeDocuments/EmployeeDocuments";
import EmployeeAssets from "./Components/EmployeeAssets/EmployeeAssets";
import Overtime from "./Pages/Overtime/Overtime";
import ShiftPlanning from "./Pages/ShiftPlanning/ShiftPlanning";
import Remote from "./Pages/Remote/Remote";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect */}
        <Route path="/" element={<Navigate to="/management/dashboard" replace />} />

        {/* Employee Layout */}
        <Route path="/management" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="allproject" element={<AllProjects />} />
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
          <Route path="documents" element={<EmployeeDocuments />} />
          <Route path="assets" element={<EmployeeAssets />}/>
          <Route path="overtime"element={<Overtime/>}/>
          <Route path="shift-planning"element={<ShiftPlanning/>}/>
          <Route path="remote"element={<Remote/>}/>

        </Route>

        {/* 404 */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;