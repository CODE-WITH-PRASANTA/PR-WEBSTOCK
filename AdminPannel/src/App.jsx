import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import BlogPost from "./Pages/BlogPost/BlogPost";
import BlogManagement from "./Pages/BlogManagement/BlogManagement";
import Gallary from "./Pages/Gallary/Gallary";
import Calender from "./Pages/Calender/Calender";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog-post" element={<BlogPost />} />
          <Route path="/blog-management" element={<BlogManagement />} />
          <Route path="/gallery-management" element={<Gallary />} />
          <Route path="/calendar-management" element={<Calender />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;