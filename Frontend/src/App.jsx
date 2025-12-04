import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";





function App() {
  return (
    <>
      

      <Navbar/>
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

     
    </>
  );
}

export default App;
