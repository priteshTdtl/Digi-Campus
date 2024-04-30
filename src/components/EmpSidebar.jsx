import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaHome, FaBook, FaUserGraduate, FaBullhorn } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdOutlineAssignment } from "react-icons/md";

export default function EmpSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const userRole = localStorage.getItem("roleName");

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
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
    <>
      {userRole === "TPO" && (
        <div id="sidebar">
          <div className="pt-4 text-white">
            <h2>DIGI</h2>
            <h1>
              <strong>CAMPUS</strong>
            </h1>

            <ul className="list-unstyled components">
              <h4>Welcome To TPO Portal !</h4>
              <li className="active">
                <Link to="#">
                  <FaHome /> Home
                </Link>
              </li>
              <li>
                <Link to="/job-posting">
                  <FaUserGraduate />  Job Posting
                </Link>
              </li>
              <li>
                <Link to="/job-list">
                  <FaBook /> Posted Jobs
                </Link>
              </li>
             
              <li>
                <Link to="/placed-students">
                  <FaBullhorn /> Placed Students
                </Link>
              </li>
            </ul>
          </div>

          <Link
            to="#"
            className="d-flex align-items-center"
            style={{ textDecoration: "none", color: "white" }}
            onClick={handleLogout}
          >
            &nbsp;
            <FaSignOutAlt fontSize={18} style={{ marginRight: "5px" }} />
            <span style={{ fontSize: "15px" }}>Logout</span>
          </Link>
        </div>
      )}

      {userRole === "Teacher" && (
        <div id="sidebar">
          <div className="pt-4 text-white">
            <h2>DIGI</h2>
            <h1>
              <strong>CAMPUS</strong>
            </h1>

            <ul className="list-unstyled components">
              <h4>Welcome</h4>
              <li className="active">
                <Link to="#">
                  <FaHome /> Home
                </Link>
              </li>
              <li>
                <Link to="/students-assignment">
                  <MdOutlineAssignment /> Assignment
                </Link>
              </li>
              <li>
                <Link to="#">
                  <GoChecklist /> Attendance
                </Link>
              </li>
              <li>
                <Link to="#">
                  <AiOutlineSchedule /> Classes & Schedule
                </Link>
              </li>
            </ul>
          </div>

          <Link
            to="#"
            className="d-flex align-items-center"
            style={{ textDecoration: "none", color: "white" }}
            onClick={handleLogout}
          >
            &nbsp;
            <FaSignOutAlt fontSize={18} style={{ marginRight: "5px" }} />
            <span style={{ fontSize: "15px" }}>Logout</span>
          </Link>
        </div>
      )}
    </>
  );
}
