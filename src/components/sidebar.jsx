import React from "react";
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
        window.location.href = "/login";
      }
    });
  };

  return (
    <div className="wrapper">
      <nav id="sidebar">
        <div className="sidebar-header">
          <h2>Digi Campus</h2>
        </div>

        <ul className="list-unstyled components">
          <h4>Welcome</h4>
          <li className="active">
            <Link
              to="#homeSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <FaHome /> Home
            </Link>
            <ul className="collapse list-unstyled" id="homeSubmenu">
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
            </ul>
          </li>
          <li>
            <Link to="#">
              <FaBook /> Library
            </Link>
          </li>
          <li>
            <Link
              to="#studentsSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <FaUserGraduate /> Students
            </Link>
            <ul className="collapse list-unstyled" id="studentsSubmenu">
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
            </ul>
          </li>
          <li>
            <Link to="#">
              <FaClipboardList /> Exams
            </Link>
          </li>
          <li>
            <Link to="#">
              <FaMoneyBillAlt /> Fees
            </Link>
          </li>
          <li>
            <Link to="#">
              <FaChalkboardTeacher /> Faculty
            </Link>
          </li>
          <li>
            <Link to="#">
              <FaBullhorn /> Notice Board
            </Link>
          </li>
          <li>
            <Link to="#">
              <FaCalendarAlt /> Events
            </Link>
          </li>
        </ul>

        <Link to="#" onClick={handleLogout} >
          &nbsp;
          <FaSignOutAlt style={{ marginRight: "5px" }} />
          <span style={{fontSize:"15px"}}>Logout</span>
        </Link>
      </nav>
    </div>
  );
}
