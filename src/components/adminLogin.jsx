import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../index.css";

const AdminLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner admin-login-inner">
        {/* Your login form */}
        <form>
          <h3>Admin Login</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3 password-input">
            <label>Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
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
          <p className=" mb-3">
            <a href="#">Forgot password?</a>
          </p>
        </form>
        <div className="row d-flex justify-content-center w-100">
          <div className="col-6">
            <span >
              <Link to="/collegeSignup" className="links">Register College</Link>
            </span>
          </div>
          <div className="col-6">
            <span>
              <Link to="/universitySignup" className="links">Register University</Link>
            </span>
          </div>
          <div className="col-6">
            <span>
              <Link to="/collegeLogin" className="links">College Login</Link>
            </span>
          </div>
          <div className="col-6">
            <span>
              <Link to="/universityLogin " className="links">University Login</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
