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
import TeamMembers from "../TeamMembers/TeamMembers";
import Myproject from "./Pages/Myproject/Myproject";
import Chats from "./Pages/Chats/Chats";
import Payslips from "./Pages/Payslips/Payslips";
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

          <Route path="/employee/my-project" element={<Myproject/>}/>
          <Route path="/employee/chats" element={<Chats/>}/>
          <Route path="/employee/payslips" element={<Payslips/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;