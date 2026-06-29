import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";



import MainLayout from "./Layout/MainLayout/MainLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Table from "./Component/Table/Table";
import Testimonial from "./Component/Testimonial/Testimonial";
import BlogPost from "./Pages/BlogPost/BlogPost";
import BlogManagement from "./Pages/BlogManagement/BlogManagement";
import Gallary from "./Pages/Gallary/Gallary";
import Calender from "./Pages/Calender/Calender";
import ProjectUser from "./Pages/ProjectUser/ProjectUser";
import Careerobject from "./Pages/Careerobject/Careerobject";
import Login from "./Component/Login/Login";
import IndustryManagement from "./Pages/IndustryManagement/IndustryManagement";
import Teammember from "./Component/Teammember/Teammember";

function App() {
  return (
  <BrowserRouter>
  <Routes>

    {/* Login */}
    <Route path="/" element={<Login />} />

    {/* Admin */}
    <Route element={<MainLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/lead-management" element={<Table />} />
      <Route path="/testimonial-management" element={<Testimonial />} />

      <Route path="/blog-post" element={<BlogPost />} />
      <Route path="/blog-post/:id" element={<BlogPost />} />

      <Route path="/blog-management" element={<BlogManagement />} />

      <Route path="/gallery-management" element={<Gallary />} />

      <Route path="/calendar-management" element={<Calender />} />

      <Route path="/project-management" element={<ProjectUser />} />

      <Route path="/career-management" element={<Careerobject />} />

      <Route path="/industry-management" element={<IndustryManagement />} />

      <Route path="/team-member" element={<Teammember />} />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />

  </Routes>
</BrowserRouter>
  );
}

export default App;