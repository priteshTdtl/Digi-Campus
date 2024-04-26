import React, { useState, useEffect } from "react";
import "../style/UniversityNotice.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Multiselect from "multiselect-react-dropdown";
import UniSidebar from "../components/UniSidebar";
import axios from "axios";

function Notice() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    to: "",
    body: "",
  });

  const [notice, setNotice] = useState([]);
  const [body, setBody] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform actions like sending data to a backend or storing it in state
    const newNotice = {
      title: formData.title,
      date: formData.date,
      to: formData.to,
      body: formData.body,
    };
    console.log("Notice Title:", newNotice.title);
    console.log("Notice Date:", newNotice.date);
    console.log("Notice to:", newNotice.to);
    console.log("Notice body:", newNotice.body);

    // Add the new event to the list
    setNotice([...notice, newNotice]);
    // Reset the form after submission
    setFormData({
      title: "",
      date: "",
      to: "",
      body: "",
    });
  };

  const [College, setCollege] = useState([]);
  const universityId = localStorage.getItem("universityId");

  useEffect(() => {
    const getCollegeData = async () => {
      try {
        const reqData = await axios.post(
          "http://54.68.156.170:8000/college_details/",
          {
            university_id: universityId,
          }
        );
        const resData = reqData.data;
        const collegeNames = resData.map((college) => college.college_name); // Use "college_name" instead of "nicename"
        setCollege(collegeNames);
      } catch (error) {
        console.error("Error fetching college data:", error);
      }
    };
    getCollegeData();
  }, []);

  return (
    <>
      <UniSidebar />
      <div className="dash-root container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className=" d-flex justify-content-center p-5 ">
            <div className="card-noticeuniversity mt-5">
              <div className="m-4 headingnoticeuniversity d-flex justify-content-center">
                <h2>
                  <b>University Notice</b>
                  <br />
                  <h6 className="uni-noticesbhead">
                    (This is an university level notice)
                  </h6>{" "}
                </h2>
              </div>
              <div className="row m-4 justify-content-center">
                <div className="col" md="6">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        <b>Title of Notice:</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
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

                    <div className="row ">
                      <div className="col-12 pb-4">
                        <label htmlFor="date" className="form-label">
                          <b>Select College</b>
                        </label>
                      </div>
                      <div className="col-12">
                        <form className="row g-3 pb-2">
                          <div className="col">
                            <div className="text-dark">
                              <Multiselect
                                isObject={false}
                                onSelect={(selectedList) =>
                                  console.log(selectedList)
                                }
                                onRemove={(selectedList) =>
                                  console.log(selectedList)
                                }
                                options={College.filter((college) => college)} // Filter out undefined or null values
                                showCheckbox
                              />
                            </div>
                            <h6 className="note mt-3 ">
                              Note: Only selected colleges will get the notice.
                            </h6>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-12">
                        <label htmlFor="body" className="form-label">
                          <b>Notice Body:</b>
                        </label>
                      </div>
                      <div className="col-12">
                        <ReactQuill
                          id="body"
                          value={body}
                          style={{ height: "17em" }}
                          onChange={setBody}
                          className="body-box"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button className="p-2 m-2 bg-primary btn-submit">
                  Send Notice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notice;
