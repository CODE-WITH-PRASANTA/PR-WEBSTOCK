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

// Components
import TaskList from "./Components/TaskList/TaskList";
import SalaryDetails from "./Components/SalaryDetails/SalaryDetails";
import CompanyPolicies from "./Components/CompanyPolicies/CompanyPolicies";
import TeamMembers from "./Components/TeamMembers/TeamMembers";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to Dashboard */}
        <Route
          path="/"
          element={<Navigate to="/employee/dashboard" replace />}
        />

        {/* Employee Layout */}
        <Route path="/employee" element={<MainLayout />}>
          {/* Dashboard */}
          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          {/* Task List */}
          <Route
            path="tasklist"
            element={<TaskList />}
          />

          {/* Salary */}
          <Route
            path="salary"
            element={<SalaryDetails />}
          />

          {/* Company Policies */}
          <Route
            path="policies"
            element={<CompanyPolicies />}
          />

          {/* Team Members */}
          <Route
            path="team-member"
            element={<TeamMembers />}
          />
        </Route>

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;