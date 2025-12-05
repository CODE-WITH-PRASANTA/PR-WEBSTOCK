import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Blog from "./Pages/Blog/Blog";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";





function App() {
  return (
    <>
      

      <Navbar/>
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/blog/details" element={<BlogDetails/>} />
        </Routes>
      </main>

     
    </>
  );
}

export default App;
