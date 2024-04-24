import React, { useState } from "react";
import "../style/Notice.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../components/sidebar";
import Swal from "sweetalert2";
import axios from "axios";

function Notice() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    to: "",
    from: "",
    body: "",
  });

  const [notice, setNotice] = useState([]);

  const collgeId = localStorage.getItem("collegeId");
  const universityId = localStorage.getItem("universityId");


  const [body, setBody] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newNotice = {
        university_id : universityId,
        college_id: collgeId,
        title: formData.title,
        publish_date: formData.date,
        target_audience: formData.to,
        from: formData.from,
        content: body,
      };
      await axios.post("http://54.68.156.170:8000/add_notice/", newNotice);

      console.log("Notice successfully submitted:", newNotice);
      Swal.fire({
        icon: "success",
        title: "Notice successfully sent!",
      });
      setFormData({
        title: "",
        date: "",
        to: "",
        from: "",
      });
      setBody("")
    } catch (error) {
      console.error("Error submitting notice:", error);
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
          <div className=" d-flex justify-content-center p-5 ">
            <div className="card-notice mt-5">
              <div className="m-4 headingnotice d-flex justify-content-center">
                <h2>College Notice </h2>
              </div>
              <div className="row m-4 justify-content-center">
                <div className="col" md="6">
                  <form >
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
                            style={{height:"15rem"}}
                            value={body}
                            onChange={setBody}
                            className="body-box"
                          />
                        </div>
                      </div>
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
        <div className="d-flex justify-content-center">
                      <button
                        className="p-2 m-2 bg-primary btn-submit"
                       
                        onClick={handleSubmit}
                      >
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
