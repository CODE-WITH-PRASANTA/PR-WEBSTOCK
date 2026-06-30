import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";

// Pages



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
            element={<Dashboard/>}
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