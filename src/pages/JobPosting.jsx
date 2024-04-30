import React, { useState } from "react";
import "../style/Notice.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../components/sidebar";
import EmpSidebar from "../components/EmpSidebar";
import Swal from "sweetalert2";
function JobPosting() {
  const [formData, setFormData] = useState({
    company_name: "",
    date: "",
    job_title: "",
    vacancies: "",
    location: "",
    description: ""
  });
  ;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleDescriptionChange = (content) => {
    setFormData({
      ...formData,
      description: content
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      const response = await fetch("http://54.68.156.170:8000/job_posting/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
       Swal.fire ({
         title: "Job Posted Successfully",
         icon: "success",
         confirmButtonText: "OK"
       })
        setFormData({
          company_name: "",
          date: "",
          job_title: "",
          vacancies: "",
          location: "",
          description: ""
        });
      } else {
        alert("Failed to post job. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire ({
        title: "Error",
        text:   error.message,
        icon: "error",
        confirmButtonText: "OK"
      })
    }
  };


  return (
    <>
      <EmpSidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="dash-root d-flex justify-content-center p-5 ">
            <div className="card-notice py-3" style={{height:"100vh"}}>
              <div className="m-4 headingnotice d-flex justify-content-center">
                <h2>Job Posting</h2>
              </div>
              <div className="row m-4 justify-content-center">
                <div className="col" md="6">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="company_name" className="form-label">
                        <b>Company Name:</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="CompanyName"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">
                        <b>Date:</b>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="job_title" className="form-label">
                        <b>Job Title</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="job_title"
                        name="job_title"
                        value={formData.job_title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="vacancies" className="form-label">
                        <b>Vacancies</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="vacancies"
                        name="vacancies"
                        required
                        pattern="[0-9]*"
                        placeholder="No. of vacancies"
                        title="Please enter only integer values"
                        value={formData.vacancies}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="location" className="form-label">
                        <b>Location</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        placeholder="Job location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="description" className="form-label">
                            <b>Job Description:</b>
                          </label>
                        </div>
                        <div className="col-12" >
                          <ReactQuill
                            id="description"
                            // className="body-box"
                            placeholder="Enter job description"
                            value={formData.description}
                            onChange={handleDescriptionChange}
                     
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                  </div>
                </div>
              <div className="d-flex justify-content-center pt-4">
                      <button className="p-2 m-2 bg-primary btn-submit" onClick={handleSubmit}> Post Job </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobPosting;