import React, { useState } from "react";
import "../style/employeeAddForm.css";
import Sidebar from "../components/sidebar";

const EmployeeAddForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="dash-root d-flex justify-content-center p-3">
            <div className="card-form  ">
              <div className="m-4 headingregistration d-flex justify-content-center">
                <h2>Employee Registration </h2>
              </div>
              <div className="row m-4 justify-content-center">
                <div className="col" md="6">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">
                        <b> Name </b>
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        id="Name"
                        name="Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        <b> birth date</b>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="birthdate"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        <b>Email</b>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        <b> Phone no</b>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="phoneno"
                        name="phoneno"
                        value={formData.phoneno}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        <b> Qualification</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Qualification"
                        name="Qualification"
                        value={formData.Qualification}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        <b> Specilization</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Specilization"
                        name="Specilization"
                        value={formData.Specilization}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        className="p-2 m-2 bg-primary btn-submit"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeAddForm;
