import React, { useState } from "react";
import "../style/Notice.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../components/sidebar";

function Notice() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    to: "",
    from: "",
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
      from: formData.from,
    };
    console.log("Notice Title:", newNotice.title);
    console.log("Notice Date:", newNotice.date);
    console.log("Notice to:", newNotice.to);
    console.log("Notice from:", newNotice.from);
    // Add the new event to the list
    setNotice([...notice, newNotice]);
    // Reset the form after submission
    setFormData({
      title: "",
      date: "",
      to: "",
      from: "",
    });
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="dash-root d-flex justify-content-center p-5 ">
            <div className="card-notice mt-5">
              <div className="m-4 headingnotice d-flex justify-content-center">
                <h2>College Notice </h2>
              </div>
              <div className="row m-4 justify-content-center">
                <div className="col" md="6">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        <b>Title/Subject:</b>
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

                    <div className="mb-3">
                      <label htmlFor="to" className="form-label">
                        <b>To:</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="to"
                        name="to"
                        value={formData.to}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="from" className="form-label">
                        <b>From:</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="from"
                        name="from"
                        value={formData.from}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="body" className="form-label">
                            <b>Notice Body:</b>
                          </label>
                        </div>
                        <div className="col-12">
                          <ReactQuill
                            id="body"
                            value={body}
                            onChange={setBody}
                            className="body-box"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        className="p-2 m-2 bg-primary btn-submit"
                        type="submit"
                      >
                        Send Notice
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
                <td>{event.birthdate}</td>
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

export default Notice;
