import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  FaHome,
  FaBook,
  FaUserGraduate,
  FaClipboardList,
  FaMoneyBillAlt,
  FaChalkboardTeacher,
  FaBullhorn,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    // Display confirmation Swal
    Swal.fire({
      icon: "warning",
      title: "Logout",
      text: "Are you sure you want to log out?",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.location.href = "/adminlogin";
      }
    });
  };

  return (
    <div id="sidebar">
      <div className="sidebar-header">
        <h1>DIGI <br/>
        CAMPUS
        </h1>
      </div>

      <ul className="list-unstyled components">
        <h4>Welcome</h4>
        <li className="active">
          <Link
            to="/Home"
         
          >
            <FaHome /> Home
          </Link>
          {/* <ul className="collapse list-unstyled" id="homeSubmenu">
            <li>
              <Link to="#">
                <FaHome /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="#">
                <FaHome /> Profile
              </Link>
            </li>
            <li>
              <Link to="#">
                <FaHome /> Settings
              </Link>
            </li>
          </ul> */}
        </li>
        <li>
          <Link to="/library">
            <FaBook /> Library
          </Link>
        </li>
        <li>
          <Link
            to=""
          >
            <FaUserGraduate /> Students
          </Link>
          {/* <ul className="collapse list-unstyled" id="studentsSubmenu">
            <li>
              <Link to="#">
                <FaUserGraduate /> View Students
              </Link>
            </li>
            <li>
              <Link to="#">
                <FaUserGraduate /> Add Student
              </Link>
            </li>
            <li>
              <Link to="#">
                <FaUserGraduate /> Student Attendance
              </Link>
            </li>
          </ul> */}
        </li>
        <li onClick={toggleAccordion}>
        <Link to="#">
          <FaClipboardList /> Exams
        </Link>
        {isOpen && (
          <ul className="nested">
            <li>
              <Link to="/add-exam" style={{ color: 'black' }}>Add exam</Link>
            </li>
            {/* <li>
              <Link to="/publish-distribute" style={{ color: 'black' }}>Publish</Link>
            </li> */}
            <li>
              <Link to="/view-results" style={{ color: 'black' }}>View result</Link>
            </li>
          </ul>
        )}
      </li>
        <li>
          <Link to="#">
            <FaMoneyBillAlt /> Fees
          </Link>
        </li>
        <li>
          <Link to="/teachers">
            <FaChalkboardTeacher /> Faculty
          </Link>
        </li>
        <li>
          <Link to="/notice-board">
            <FaBullhorn /> Notice Board
          </Link>
        </li>
        <li>
          <Link to="/events">
            <FaCalendarAlt /> Events
          </Link>
        </li>
      </ul>

      <Link to="#" className="d-flex align-items-center" style={{textDecoration:"none",color:"white"}} onClick={handleLogout}>
        &nbsp;
        <FaSignOutAlt fontSize={18} style={{marginRight:"5px"}} />
        <span style={{ fontSize: "15px" }}>Logout</span>
      </Link>
    </div>
  );
}
