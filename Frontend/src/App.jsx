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
import AppDevelopment from "./Pages/AppDevelopment/AppDevelopment";
import GetFreeDemo from "./Pages/GetFreeDemo/GetFreeDemo";
import Seo from "./Pages/Seo/Seo";
import ScrollToTop from "./ScrollToTop";
import PageLoader from "./Components/PageLoader/PageLoader"; 
import { useState, useEffect } from "react";
import DigitalMarketing from "./Pages/DigitalMarketing/DigitalMarketing";
import SocialMediaManagement from "./Pages/SocialMediaManagement/SocialMediaManagement";

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

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
        <Route path="/service" element={<Service />} />
        <Route path="/services/web-development" element={<Service />} />
        <Route path="/services/app-development" element={<AppDevelopment />} />
        <Route path="/services/seo" element={<Seo />} />
        <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/services/socialmedia-management" element={<SocialMediaManagement />} />
        <Route path="/get-quote" element={<GetFreeDemo />} />
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
