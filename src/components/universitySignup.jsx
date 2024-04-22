import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../index.css";

const UniversitySignup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    universityName: "",
    universityEmail: "",
    universityPhoneNumber: "",
    universityCity: "",
    establishmentYear: "",
    password:""
  });

  const {
    universityName,
    universityEmail,
    universityPhoneNumber,
    universityCity,
    establishmentYear,
    password,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://54.68.156.170:8000/register_university/",
        {
          university_name: universityName,
          university_email: universityEmail,
          university_number: universityPhoneNumber,
          university_city: universityCity,
          establish_year: establishmentYear,
          password: formData.password,
        }
      );
      console.log("University registered successfully:", response.data);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "University registered successfully!",
      });
     

      setFormData({
        universityName: "",
        universityEmail: "",
        universityPhoneNumber: "",
        universityCity: "",
        establishmentYear: "",
        password: "", 
      });
    } catch (error) {
      console.error("Error registering university:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.university_email
      ) {
        // University email already exists
        Swal.fire({
          icon: "info",
          title: "Info!",
          text: "University is already registered. Please go to login.",
          confirmButtonText: "Go to login",
          showCancelButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/universityLogin";
          }
        });
      } else {
        // Other error occurred
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to register university. Please try again later.",
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner university-signup-inner">
        <form onSubmit={handleSubmit}>
          <h3>University Registration</h3>
          <div className="mb-3">
            <label>Name of University</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter university name"
              name="universityName"
              value={universityName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>University Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter university email"
              name="universityEmail"
              value={universityEmail}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 password-input">
            <label>University Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              placeholder="Enter university password"
              name="password"
              value={password}
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
            <label>University Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter university phone number"
              name="universityPhoneNumber"
              value={universityPhoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>University City</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter university city"
              name="universityCity"
              value={universityCity}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Establishment Year</label>
            <select
              className="form-control"
              name="establishmentYear"
              value={establishmentYear}
              onChange={handleChange}
            >
              {Array.from({ length: 210 }, (_, index) => {
                const year = new Date().getFullYear() - index;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
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
  );
};

export default UniversitySignup;
