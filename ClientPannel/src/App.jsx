import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout/MainLayout";
import PaymentMethod from "./Component/PaymentMethod/PaymentMethod";


// Pages

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout */}
        <Route path="/" element={<MainLayout />}>
        <Route path="/method" element={<PaymentMethod />}/>
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;