import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import "./index.css";

import LandingPage from "./components/LandingPage";
import AdminLogin from "./components/adminLogin";
import { Navigation } from "./components/navigation";
import UniversitySignup from "./components/universitySignup";
import CollegeSignup from "./components/collegeSignup";
import UniversityLogin from "./components/universityLogin";
import CollegeLogin from "./components/collegeLogin";
import Sidebar from "./components/sidebar";


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" 
          element={
              <>
                <Navigation />
                <LandingPage landingPageData={landingPageData} />
              </>
            }
          />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/universitySignup" element={<UniversitySignup />} />
          <Route path="/universityLogin" element={<UniversityLogin />} />
          <Route path="/collegeSignup" element={<CollegeSignup />} />
          <Route path="/collegeLogin" element={<CollegeLogin />} />
          <Route path="/Home" element={<Sidebar />} />
          
        </Routes>  
      </div>
    </Router>
  );
};

export default App;
