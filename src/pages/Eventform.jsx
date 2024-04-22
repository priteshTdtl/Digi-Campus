import React, { useState } from "react";
import "../style/Eventform.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../components/sidebar";

function EventForm() {
  const [formData, setFormData] = useState({
    Name: "",
    date: "",
    location: "",
  });

  const [events, setEvents] = useState([]);

  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform actions like sending data to a backend or storing it in state
    const newEvent = {
      Name: formData.Name,
      description: formData.description,
      date: formData.date,
      location: formData.location,
    };
    console.log("Event Name:", newEvent.Name);
    console.log("Evenet Description:", newEvent.description);
    console.log("Event Date:", newEvent.date);
    console.log("Event Location:", newEvent.location);
    // Add the new event to the list
    setEvents([...events, newEvent]);
    // Reset the form after submission
    setFormData({
      Name: "",
      description: "",
      date: "",
      location: "",
    });
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="dash-root d-flex justify-content-center p-5 ">
            <div className="card-event mt-5">
              <div className="m-4 headingevent d-flex justify-content-center">
                <h2>Create an event </h2>
              </div>
              <div className="row m-4 justify-content-center">
                <div className="col" md="6">
                  <form onSubmit={handleSubmit}>
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
                        <div className="col-12">
                          <label
                            htmlFor="date"
                            className="form-label text-dark"
                          >
                            <b>Date of event</b>
                          </label>
                        </div>
                        <div className="col-12">
                          <input
                            type="date"
                            className="form-control"
                            id="date"
                            name="date"
                            value={formData.date}
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
                            value={description}
                            onChange={setDescription}
                            className="description-box"
                          />
                        </div>
                      </div>
                    </div>

                    
                    <div className="mb-3">
                      <label htmlFor="location" className="form-label">
                        <b>Event Location</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        className="p-2 m-2 bg-primary btn-submit"
                        type="submit"
                      >
                        Create Event
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {/* <div className="m-5 ">
            <h4>Event Details</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td>{event.Name}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventForm;
