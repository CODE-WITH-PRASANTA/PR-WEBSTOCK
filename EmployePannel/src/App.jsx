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
        

      </Routes>
    </BrowserRouter>
  );
};

export default App;