import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import "../index.css";
import axios from "axios";
import UniSidebar from "./UniSidebar";

const CollegeSignup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [collegeData, setCollegeData] = useState({
    collegeName: "",
    collegeEmail: "",
    collegePassword: "",
    collegePhoneNumber: "",
    collegeCity: "",
  });

  const {
    collegeName,
    collegeEmail,
    collegePassword,
    collegePhoneNumber,
    collegeCity,
  } = collegeData;

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const universityId = localStorage.getItem("universityId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollegeData({ ...collegeData, [name]: value });
  };

  const handleCollegeSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://54.68.156.170:8000/register_college/",
        {
          university_id: universityId,
          college_name: collegeName,
          college_email: collegeEmail,
          password: collegePassword,
          college_number: collegePhoneNumber,
          college_location: collegeCity,
        }
      );
      console.log("College registered successfully:", response.data);
      // Reset form fields after successful signup
      setCollegeData({
        collegeName: "",
        collegeEmail: "",
        collegePassword: "",
        collegePhoneNumber: "",
        collegeCity: "",
      });
    } catch (error) {
      console.error("Error registering college:", error);
      // Handle error
    }
  };

  return (
    <>
      <UniSidebar />
      <div className="dash-root container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="auth-wrapper ">
            <div className="auth-inner College-signup-inner">
              <form onSubmit={handleCollegeSignup}>
                <h3>College Registration</h3>
                <div className="mb-3">
                  <label>Name of College</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter College name"
                    name="collegeName"
                    value={collegeName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label>College Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter College email"
                    name="collegeEmail"
                    value={collegeEmail}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 password-input">
                  <label>College Password</label>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter College password"
                    name="collegePassword"
                    value={collegePassword}
                    onChange={handleChange}
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
                  <label>College Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter College phone number"
                    name="collegePhoneNumber"
                    value={collegePhoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label>College City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter College city"
                    name="collegeCity"
                    value={collegeCity}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary btn-block">
                    Submit
                  </button>
                </div>
                <Link to="/adminLogin" className="back-to-login">
                  <MdKeyboardBackspace fontSize={25} />
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollegeSignup;
