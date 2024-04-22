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
import EmployeeAddForm from "./pages/employeeAddForm";
import LibraryTable from "./pages/Librarytable";
import TeacherTable from "./pages/Tearcher-management";
import AdjustSetting from "../src/pages/AdjustSetting";
import AddExam from "../src/pages/AddExam";
import AddQuestion from "../src/pages/AddQuestion";
import PublishDistribute from "../src/pages/PublishDistribute";
import AddEdtQueston from "../src/pages/AddEdtQueston";
import ViewResults from "../src/pages/ViewResults";
import StudentAttendance from "../src/pages/StudentAttendance";
import Students from "../src/pages/Students";
import Notice from "../src/pages/Notice"
import EventForm from "../src/pages/Eventform";
import UniSidebar from "./components/UniSidebar";
import Fees from "./pages/Fees";
import JobPosting from "./pages/JobPosting";
import AdminDash from "./pages/AdminDash";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  const [universityId, setUniversityId] = useState(null);
  const [collegeId, setCollegeId] = useState(null);

  const handleLogin = (universityId, collegeId) => {
    // Your login logic here...
    setUniversityId(universityId);
    setCollegeId(collegeId);
  };
  

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
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
          <Route path="/University-home" element={<UniSidebar />} />

          <Route path="/add-employee" element={<EmployeeAddForm />} />
          <Route path="/library" element={<LibraryTable universityId={universityId} collegeId={collegeId} />} />
          <Route path="/teachers" element={<TeacherTable />} />
          <Route path="/add-exam" element={<AddExam />} />
          <Route path="/addquestion" element={<AddQuestion />} />
          <Route path="/adjust-setting" element={<AdjustSetting />} />
          <Route path="/add-Edt-Queston" element={<AddEdtQueston />} />
          <Route path="/publish-distribute" element={<PublishDistribute />} />
          <Route path="/view-results" element={<ViewResults />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students-attendance" element={<StudentAttendance />} />
          <Route path="/notice-board" element={<Notice />} />
          <Route path="/events" element={<EventForm />} />
          <Route path="/fees-structure" element={<Fees />} />
          <Route path="/job-posting" element={<JobPosting />} />
          <Route path="/admin-dashboard" element={<AdminDash />} />



        </Routes>
      </div>
    </Router>
  );
};

export default App;
