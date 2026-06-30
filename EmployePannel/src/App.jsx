import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import TeamMembers from "./Pages/TeamMembers/TeamMembers";
import TaskHeader from "./Components/TaskHeader/TaskHeader";
import TaskList from "./Components/TaskList/TaskList";
import SalaryDetails from "./Components/SalaryDetails/SalaryDetails";
import SalaryHeader from "./Components/SalaryHeader/SalaryHeader";
import CompanyPolicies from "./Components/CompanyPolicies/CompanyPolicies";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect */}
        <Route
          path="/"
          element={<Navigate to="/employee/dashboard" replace />}
        />

        {/* Employee Layout */}
        <Route path="/employee" element={<MainLayout />}>

          <Route
            path="dashboard"
            element={<Dashboard />}
          />


        </Route>

        <Route
          path="*"
          element={<h1>404 Page Not Found</h1>}
        />
          <Route
          path="/employe/Team-member"
          element={<TeamMembers />} />
        
        <Route
        path="/employe/tasklist"
        element={<TaskList/>}/>
        <Route
        path="employe/salary"
        element={<SalaryDetails/>}/>
        <Route
        path="/employe/policies"
        element={<CompanyPolicies/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;