import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout/MainLayout";
import PaymentHistroy from "./Component/PaymentHistroy/PaymentHistroy";
import Payments from "./Component/Payments/Payments";
import InvoiceDetails from "./Component/InvoiceDetails/InvoiceDetails";
import Invoices from "./Component/Invoices/Invoices";

import PaymentMethod from "./Component/PaymentMethod/PaymentMethod";


// Pages

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout */}
        <Route path="/" element={<MainLayout />}>
        <Route path= "/client/payment-history" element={<PaymentHistroy />} />
        <Route path= "/client/payments" element={<Payments />} />
        <Route path= "/client/invoice-details" element={<InvoiceDetails />} />
        <Route path= "/client/invoices" element={<Invoices />} />
        
        <Route path= "/client/payment-methods" element={<PaymentMethod />} />




        
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;