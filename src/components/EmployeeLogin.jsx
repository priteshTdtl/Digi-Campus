import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios"; // Import Axios for making HTTP requests
import "../index.css";
import Swal from "sweetalert2";

const CollegeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://54.68.156.170:8000/employee_login/",
        {
          email: email,
          password: password,
        }
      );

      Swal.fire({
        title: "Login Successful",
        text: "You are now logged in",
        icon: "success",
        confirmButtonText: "OK",
      });
      localStorage.setItem("collegeId", response.data.data.college_id);
      localStorage.setItem("universityId", response.data.data.university_id);
      localStorage.setItem("teacherId", response.data.data.teacher_id);
      localStorage.setItem("roleName", response.data.role_name);


      navigate("/staff-portal");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner admin-login-inner">
        <form onSubmit={handleLogin}>
          <h3>Employee Login</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 password-input">
            <label>Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Toggle button to show/hide password */}
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </div>
          {error && <p className="text-danger">{error}</p>}
          <p className="d-flex justify-content-between mb-3">
            <Link to="/adminLogin" className="back-to-login">
              <MdKeyboardBackspace fontSize={25} />
            </Link>
            <a href="#" className="links">
              Forgot password?
            </a>
          </p>

          <div className="" style={{ textAlign: "center", fontSize: "13px" }}>
            <Link to="/collegeLogin" style={{ textDecoration: "none" }}>
              College Admin
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollegeLogin;
