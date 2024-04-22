import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";
import Swal from "sweetalert2";

const UniversityLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://54.68.156.170:8000/university_login/",
        {
          university_email: email,
          password: password,
        }
      );
      console.log("Login successful");

      localStorage.setItem("universityId", response.data.data.university_id);
      // Show success Swal
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        confirmButtonText: "OK",
      }).then(() => {
        // Navigate to the Home page after the user clicks "OK"
        navigate("/University-home");
      });
    } catch (error) {
      console.error("Login failed:", error.response.data);

      // Show error Swal
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner admin-login-inner">
        <form onSubmit={handleSubmit}>
          <h3>University Login</h3>
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
          <p className="d-flex justify-content-between mb-3">
            <Link to="/adminLogin" className="back-to-login">
              <MdKeyboardBackspace fontSize={25} />
            </Link>{" "}
            <a href="#" className="links">
              Forgot password?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UniversityLogin;
