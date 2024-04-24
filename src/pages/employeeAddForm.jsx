import React, { useState, useEffect } from "react";
import "../style/employeeAddForm.css";
import Sidebar from "../components/sidebar";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert library

const EmployeeAddForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
    date_of_birth: "",
    gender: "",
    department: "",
    salary: "",
    joining_date: "",
    photo: "",
    emergency_contact_name: "",
    emergency_contact_number: "",
    role: "",
  });
  const [roles, setRoles] = useState([]);
  const [collegeId, setCollegeId] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const collegeId = localStorage.getItem("collegeId");
    const universityId = localStorage.getItem("universityId");
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://54.68.156.170:8000/all_emp_role/",
          {
            college_id: collegeId,
          }
        );
        console.log("Response data:", response.data);
        setRoles(
          response.data.map((role) => ({
            id: role.role_id,
            name: role.role_name,
          }))
        );
      } catch (error) {
        console.error("Error fetching roles data:", error);
      }
    };

    if (collegeId && universityId) {
      setCollegeId(collegeId);
      setUniversityId(universityId);
      fetchData();
    } else {
      console.error("collegeId or universityId not found in local storage");
    }
  }, [collegeId, universityId]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.first_name);
    formDataToSend.append("last_name", formData.last_name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("phone_number", formData.phone_number);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("date_of_birth", formData.date_of_birth);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("department", formData.department);
    formDataToSend.append("salary", formData.salary);
    formDataToSend.append("joining_date", formData.joining_date);
    formDataToSend.append(
      "emergency_contact_name",
      formData.emergency_contact_name
    );
    formDataToSend.append(
      "emergency_contact_number",
      formData.emergency_contact_number
    );
    formDataToSend.append("role_id", formData.role);
    formDataToSend.append("college_id", collegeId);
    formDataToSend.append("university_id", universityId);
    formDataToSend.append("photo", photo);

    axios
      .post("http://54.68.156.170:8000/register_employee/", formDataToSend)
      .then((response) => {
        console.log("Form data sent successfully:", response.data);
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          phone_number: "",
          address: "",
          date_of_birth: "",
          gender: "",
          department: "",
          salary: "",
          joining_date: "",
          photo: "",
          emergency_contact_name: "",
          emergency_contact_number: "",
          role: "",
        });
        // Display SweetAlert on successful form submission
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Employee added successfully!",
        });
      })
      .catch((error) => {
        console.error("Error sending form data:", error);
      });
  };

  return (
    <>
      <Sidebar />
      <div className=" container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className=" d-flex justify-content-center p-5">
            <div className="card-form p-4">
              <div className=" headingregistration d-flex justify-content-center">
                <h2>Employee Registration</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="first_name" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="last_name" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email
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
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="phone_number" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="date_of_birth" className="form-label">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date_of_birth"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="gender" className="form-label">
                      Gender
                    </label>
                    <select
                      className="form-select"
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="department" className="form-label">
                      Department
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="salary" className="form-label">
                      Salary
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="joining_date" className="form-label">
                      Joining Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="joining_date"
                      name="joining_date"
                      value={formData.joining_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="photo" className="form-label">
                      Photo
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="photo"
                      name="photo"
                      onChange={handlePhotoChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label
                      htmlFor="emergency_contact_name"
                      className="form-label"
                    >
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="emergency_contact_name"
                      name="emergency_contact_name"
                      value={formData.emergency_contact_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="emergency_contact_number"
                      className="form-label"
                    >
                      Emergency Contact Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="emergency_contact_number"
                      name="emergency_contact_number"
                      value={formData.emergency_contact_number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <select
                      className="form-select"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center">
                    <button className="btn btn-success btn-lg" type="submit">
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeAddForm;
