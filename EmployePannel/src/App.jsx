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

import TaskHeader from "./Components/TaskHeader/TaskHeader";
import TaskList from "./Components/TaskList/TaskList";
import SalaryDetails from "./Components/SalaryDetails/SalaryDetails";
import SalaryHeader from "./Components/SalaryHeader/SalaryHeader";
import CompanyPolicies from "./Components/CompanyPolicies/CompanyPolicies";
import TeamMembers from "./Components/TeamMembers/TeamMembers";
import TeamLeaves from "./Components/TeamLeaves/TeamLeaves";
import Calender from "./Components/Calender/Calender";

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

    <Route index element={<Dashboard />} />

    <Route
        path="dashboard"
        element={<Dashboard />}
    />

    <Route
        path="team-members"
        element={<TeamMembers />}
    />

    <Route
        path="tasklist"
        element={<TaskList />}
    />

    <Route
        path="salary"
        element={<SalaryDetails />}
    />

    <Route
        path="policies"
        element={<CompanyPolicies />}
    />  
    <Route
        path="calendar"
        element={<Calender />}
    />

</Route>

        

        <Route
          path="*"
          element={<h1>404 Page Not Found</h1>}
        />
         
        
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;