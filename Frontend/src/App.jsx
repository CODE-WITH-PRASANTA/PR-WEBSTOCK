import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import ScrollToTop from "./ScrollToTop";
import PageLoader from "./Components/PageLoader/PageLoader";

// Static critical layout components
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import ContactUs from "./Components/Contactus/Contactus";
import Floating from "./Components/Floating/Floating";
import Form from "./Components/From/From";

// Dynamic route-based lazy imports
const Home = lazy(() => import("./Pages/Home/Home"));
const About = lazy(() => import("./Pages/About/About"));
const IndustryWork = lazy(() => import("./Pages/IndustryWork/IndustryWork"));
const Pricing = lazy(() => import("./Pages/Pricing/Pricing"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const Career = lazy(() => import("./Pages/Career/Career"));
const Blog = lazy(() => import("./Pages/Blog/Blog"));
const Service = lazy(() => import("./Pages/Service/Service"));
const AppDevelopment = lazy(() => import("./Pages/AppDevelopment/AppDevelopment"));
const Seo = lazy(() => import("./Pages/Seo/Seo"));
const DigitalMarketingPage = lazy(() => import("./Pages/DigitalMarketingPage/DigitalMarketingPage"));
const SocialMediaManagement = lazy(() => import("./Pages/SocialMediaManagement/SocialMediaManagement"));
const GetFreeDemo = lazy(() => import("./Pages/GetFreeDemo/GetFreeDemo"));
const Working = lazy(() => import("./Pages/Working/Working"));
const Projects = lazy(() => import("./Pages/Projects/Projects"));

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false); // Reduced artificial blocking delay

  useEffect(() => {
    // Keep loader subtle during route transitions if desired
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/industry-work" element={<IndustryWork />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/career" element={<Career />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/service" element={<Service />} />
          <Route path="/services/web-development" element={<Service />} />
          <Route path="/services/app-development" element={<AppDevelopment />} />
          <Route path="/services/seo" element={<Seo />} />
          <Route path="/services/digital-marketing" element={<DigitalMarketingPage />} />
          <Route path="/services/socialmedia-management" element={<SocialMediaManagement />} />
          <Route path="/get-quote" element={<GetFreeDemo />} />
          <Route path="/blog/:id" element={<Working />} />
          <Route path="/project" element={<Projects />} />
        </Routes>
      </Suspense>
      <Form />
      <ContactUs />
      <Floating />
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