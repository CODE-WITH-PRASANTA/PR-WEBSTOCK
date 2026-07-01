import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import AllProjects from "./Pages/AllProjects/AllProjects";
import EditProjects from "./Components/EditProjects/EditProjects";
import ProjectTasks from "./Components/ProjectTasks/ProjectTasks";
import ProjectMembers from "./Components/ProjectMembers/ProjectMembers";
import ProjectFiles from "./Components/ProjectFiles/ProjectFiles";
import AllEmployees from "./Components/AllEmployees/AllEmployees";
import AddEmployee from "./Components/AddEmployee/AddEmployee";
import AddProject from "./Components/AddProject/AddProject";
import EmployeeShift from "./Components/EmployeeShift/EmployeeShift";
import EmployeeProfile from "./Components/EmployeeProfile/EmployeeProfile";

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
          <Route path="projects/members" element={<ProjectMembers/>}/>
          <Route path="projects/files" element={<ProjectFiles/>}/>
          <Route path="all" element={<AllEmployees/>}/>
          <Route path="add" element={<AddEmployee/>}/>
          <Route path="projects/add" element={<AddProject/>}/>
          <Route path="shift" element={<EmployeeShift/>}/>
          <Route path="profile" element={<EmployeeProfile/>}/>
        </Route>

        {/* 404 */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;