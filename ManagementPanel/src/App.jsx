import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import AllProjects from "./Pages/AllProjects/AllProjects";
import AddProjects from "./Components/AddProjects/AddProjects";
import EditProjects from "./Components/EditProjects/EditProjects";
import ProjectTasks from "./Components/ProjectTasks/ProjectTasks";
import ProjectBudget from "./Components/ProjectBudget/ProjectBudget";
import ProjectRiskIssue from "./Components/ProjectRiskIssue/ProjectRiskIssue";

import ProjectMembers from "./Components/ProjectMembers/ProjectMembers";
import ProjectFiles from "./Components/ProjectFiles/ProjectFiles";
import AllEmployees from "./Components/AllEmployees/AllEmployees";

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
          <Route path="projects/add" element={<AddProjects />} />
          <Route path="projects/edit" element={<EditProjects />} />
          <Route path="projects/tasks" element={<ProjectTasks />} />
          <Route path="projects/budget" element={<ProjectBudget/>}/>
          <Route path="projects/risks" element={<ProjectRiskIssue/>}/>
          <Route path="projects/members" element={<ProjectMembers/>}/>
          <Route path="projects/files" element={<ProjectFiles/>}/>
          
          
        </Route>

        {/* 404 */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;