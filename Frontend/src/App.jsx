import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Pricing from "./Pages/Pricing/Pricing";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import IndustryWork from "./Pages/IndustryWork/IndustryWork";
import Career from "./Pages/Career/Career";
import Blog from "./Pages/Blog/Blog";
import Footer from "./Components/Footer/Footer";
import ContactUs from "./Components/Contactus/Contactus";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";
import Service from "./Pages/Service/Service";

import ScrollToTop from "./ScrollToTop";
import PageLoader from "./Components/PageLoader/PageLoader"; 

import { useState, useEffect } from "react";

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500); // smooth professional delay

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {loading && <PageLoader />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/industry-work" element={<IndustryWork />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career" element={<Career />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/details" element={<BlogDetails />} />
        <Route path="/services/web-development" element={<Service />} />
      </Routes>
      <ContactUs />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
 