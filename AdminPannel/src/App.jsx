import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
<<<<<<< HEAD
import Testimonial from "./Pages/Testimonial/Testimonial";
import NewUser from "./Pages/NewUser/NewUser";
import NewsProfile from "./Pages/NewsProfile/NewsProfile";
import ManageEditior from "./Pages/ManageEditior/ManageEditior";
import LeadManagementHub from "./Pages/LeadManagementHub/LeadManagementHub";
import ContactManagement from "./Pages/ContactManagement/ContactManagement";
import IndexAbstracte from "./Pages/IndexAbstracte/IndexAbstracte";
import PublicationManagement from "./Pages/PublicationManagement/PublicationManagement";
import Teammember from "./Component/Teammember/Teammember";

=======
import Table from "./Component/Table/Table";
import Testimonial from "./Component/Testimonial/Testimonial";
import BlogPost from "./Pages/BlogPost/BlogPost";
import BlogManagement from "./Pages/BlogManagement/BlogManagement";
import Gallary from "./Pages/Gallary/Gallary";
import Calender from "./Pages/Calender/Calender";


import ProjectUser from "./Pages/ProjectUser/ProjectUser";
import Careerobject from "./Pages/Careerobject/Careerobject";
>>>>>>> a676ebbd1d3f905d4a655b61746e3914475d0bfc

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        
         
          <Route path="/lead-management" element={<Table />}/>
          <Route path="/testimonial-management" element={<Testimonial />} />
<<<<<<< HEAD
          <Route path="/new-editor" element={<NewUser/>}/>
          <Route path="/newsprofile"element={<NewsProfile/>}/>
          <Route path="/manage-editor" element={<ManageEditior/>}/>
          <Route path="/cold-lead-management" element={<LeadManagementHub/>}/>
          <Route path="/contact-management" element={<ContactManagement/>}/>
          <Route path="/index-abstracting-management" element={<IndexAbstracte/>}/>
          <Route path="/publication-management" element={<PublicationManagement/>}/>
          <Route path="/team-member" element={<Teammember/>} />
         
=======
          
          
          <Route path="/blog-post" element={<BlogPost />} />
          <Route path="/blog-management" element={<BlogManagement />} />
          <Route path="/gallery-management" element={<Gallary />} />
          <Route path="/calendar-management" element={<Calender />} />
          
          
          <Route path="/project-management" element={<ProjectUser/>}/>
          <Route path="/career-management" element={<Careerobject/>}/>
>>>>>>> a676ebbd1d3f905d4a655b61746e3914475d0bfc
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;