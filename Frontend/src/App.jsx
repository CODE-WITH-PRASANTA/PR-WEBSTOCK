import React, { lazy, Suspense, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import "./App.css";
import ScrollToTop from "./ScrollToTop";
import PageLoader from "./Components/PageLoader/PageLoader";

// Static critical layout component (Above the fold)
import Navbar from "./Components/Navbar/Navbar";

// Lazy-load below-the-fold global components
const ContactUs = lazy(() => import("./Components/Contactus/Contactus"));
const Footer = lazy(() => import("./Components/Footer/Footer"));
const Floating = lazy(() => import("./Components/Floating/Floating"));
const Form = lazy(() => import("./Components/From/From"));

// Dynamic route-based lazy imports
const Home = lazy(() => import("./Pages/Home/Home"));
const About = lazy(() => import("./Pages/About/About"));
const IndustryWork = lazy(() => import("./Pages/IndustryWork/IndustryWork"));
const Pricing = lazy(() => import("./Pages/Pricing/Pricing"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const Career = lazy(() => import("./Pages/Career/Career"));
const Blog = lazy(() => import("./Pages/Blog/Blog"));
const Service = lazy(() => import("./Pages/Service/Service"));
const AppDevelopment = lazy(() =>
  import("./Pages/AppDevelopment/AppDevelopment")
);
const Seo = lazy(() => import("./Pages/Seo/Seo"));
const DigitalMarketingPage = lazy(() =>
  import("./Pages/DigitalMarketingPage/DigitalMarketingPage")
);
const SocialMediaManagement = lazy(() =>
  import("./Pages/SocialMediaManagement/SocialMediaManagement")
);
const GetFreeDemo = lazy(() =>
  import("./Pages/GetFreeDemo/GetFreeDemo")
);
const Working = lazy(() => import("./Pages/Working/Working"));
const Projects = lazy(() => import("./Pages/Projects/Projects"));

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className="app-container">
      <PageLoader loading={loading} />

      <Navbar />

      <main className="main-content">
        <Suspense fallback={<div className="page-fallback" />}>
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
      </main>

      {/* Lazy loaded layout elements wrapped in Suspense */}
      <Suspense fallback={null}>
        <Form />  
        <ContactUs />
        <Floating />
        <Footer />
      </Suspense>
    </div>
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