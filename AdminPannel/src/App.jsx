import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";

import NewUser from "./Pages/NewUser/NewUser";
import NewsProfile from "./Pages/NewsProfile/NewsProfile";
import ManageEditior from "./Pages/ManageEditior/ManageEditior";
import LeadManagementHub from "./Pages/LeadManagementHub/LeadManagementHub";
import ContactManagement from "./Pages/ContactManagement/ContactManagement";
import IndexAbstracte from "./Pages/IndexAbstracte/IndexAbstracte";
import PublicationManagement from "./Pages/PublicationManagement/PublicationManagement";
import Table from "./Component/Table/Table";
import Testimonial from "./Component/Testimonial/Testimonial";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        
          <Route path="/new-editor" element={<NewUser/>}/>
          <Route path="/newsprofile"element={<NewsProfile/>}/>
          <Route path="/manage-editor" element={<ManageEditior/>}/>
          <Route path="/cold-lead-management" element={<LeadManagementHub/>}/>
          <Route path="/contact-management" element={<ContactManagement/>}/>
          <Route path="/index-abstracting-management" element={<IndexAbstracte/>}/>
          <Route path="/publication-management" element={<PublicationManagement/>}/>
          <Route path="/lead-management" element={<Table />}/>
          <Route path="/testimonial-management" element={<Testimonial />} />
          
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;