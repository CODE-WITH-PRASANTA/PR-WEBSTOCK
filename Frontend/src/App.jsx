import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Pricing from "./Pages/Pricing/Pricing";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import IndustryWork from "./Pages/IndustryWork/IndustryWork";
import Career from "./Pages/Career/Career";
import React from "./Pages/Career/Career";
import Blog from "./Pages/Blog/Blog";
import Footer from "./Components/Footer/Footer";
import ContactUs from "./Components/Contactus/Contactus";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<IndustryWork />} />
        <Route path="/career" element={<Career />} />
        <Route path="/sale" element={<Blog />} />
      </Routes>
      <ContactUs/>
      <Footer/>
    </Router>
  );
}

export default App;
