import React, { useState } from "react";
import "../style/Eventform.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../components/sidebar";
import axios from "axios";
import Swal from "sweetalert2";

function EventForm() {
  const [formData, setFormData] = useState({
    Name: "",
    startDate: "",
    enddate: "",
    location: "",
  });

  const [description, setDescription] = useState("");

  const collgeId = localStorage.getItem("collegeId");
  const universityId = localStorage.getItem("universityId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const newEvent = {
        university_id: universityId,
        college_id: collgeId,
        title: formData.Name,
        description: description,
        start_date: formData.startDate,
        end_date: formData.enddate,
      };
  
      const response = await axios.post(
        "http://54.68.156.170:8000/add_event/",
        newEvent
      );
  
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Event added successfully!",
        });
        setFormData({
          Name: "",
          startDate: "",
          enddate: "",
        });
        setDescription("");
      } else {
        throw new Error("Failed to add event");
      }
    } catch (error) {
      console.error("Error adding event:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  

  return (
    <>
      <Sidebar />
      <div className="dash-root container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="d-flex justify-content-center p-5 ">
            <div className="card-event mt-5">
              <div className="m-4 headingevent d-flex justify-content-center">
                <h2>Create an event </h2>
              </div>
              <div className="row m-4 justify-content-center">
                <div className="col" md="6">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="Name" className="form-label">
                        <b>Name of event</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <div className="row">
                        <div className="col-12 pt-4">
                          <label
                            htmlFor="date"
                            className="form-label text-dark"
                          >
                            <b>From Date</b>
                          </label>
                        </div>
                        <div className="col-12">
                          <input
                            type="date"
                            className="form-control"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-12 pt-4">
                          <label
                            htmlFor="date"
                            className="form-label text-dark"
                          >
                            <b>End Date</b>
                          </label>
                        </div>
                        <div className="col-12">
                          <input
                            type="date"
                            className="form-control"
                            id="enddate"
                            name="enddate"
                            value={formData.enddate}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="description" className="form-label">
                            <b>Event Description</b>
                          </label>
                        </div>
                        <div className="col-12">
                          <ReactQuill
                            id="description"
                            style={{ height: "20em" }}
                            value={description}
                            onChange={setDescription}
                            // className="description-box"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="d-flex justify-content-center pt-4 pb-2">
                <button
                  className="p-2 m-2 bg-primary btn-submit"
                  onClick={handleSubmit}
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventForm;
