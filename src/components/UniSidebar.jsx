import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaHome, FaBook, FaUserGraduate, FaBullhorn } from "react-icons/fa";

export default function UniSidebar() {
  const [isOpen, setIsOpen] = useState(false);

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
    <div id="sidebar">
      <div className="pt-4 text-white">
        <h2>DIGI</h2>
        <h1>
          <strong>CAMPUS</strong>
        </h1>
      </div>

      <ul className="list-unstyled components">
        <h4>Welcome</h4>
        <li className="active">
          <Link to="/University-home">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/collegeSignup">
            <FaBook /> Register College
          </Link>
        </li>
        <li>
          <Link to="/active-college">
            <FaUserGraduate /> Active Colleges
          </Link>
        </li>
        <li>
          <Link to="/university-notice">
            <FaBullhorn /> Notice Board
          </Link>
        </li>
      </ul>

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
  );
}
