import React, { useState } from "react";
import "../style/Notice.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../components/sidebar";

function JobPosting() {
  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="dash-root d-flex justify-content-center p-5 ">
            <div className="card-notice">
              <div className="m-4 headingnotice d-flex justify-content-center">
                <h2>Job Posting</h2>
              </div>
              <div className="row m-4 justify-content-center">
                <div className="col" md="6">
                  <form >
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        <b>Company Name:</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="CompanyName"
                        name="CompanyName"
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
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="to" className="form-label">
                        <b>Job Title</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="jobTitle"
                        name="jobTitle"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="from" className="form-label">
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
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="from" className="form-label">
                        <b>Location</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        placeholder="Job location"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="body" className="form-label">
                            <b>Job Description:</b>
                          </label>
                        </div>
                        <div className="col-12">
                          <ReactQuill
                            id="description"
                            className="body-box"
                            placeholder="Enter job description"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        className="p-2 m-2 bg-primary btn-submit"
                        type="submit"
                      >
                        Post Job
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
}

export default JobPosting;
