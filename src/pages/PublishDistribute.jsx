import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faStop,
  faPlus,
  faTrash,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";

export default function PublishDistribute() {
  const location = useLocation();
  const { examName } = location.state;

  const [examDetails, setExamDetails] = useState({
    title: "",
    description: "",
    publishDate: "",
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExamDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePublish = () => {
    // Logic to publish the exam using examDetails state
    console.log("Publishing exam with details:", examDetails);
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="main p-3">
            <div className=" container mt-3">
              <form>
              <h2>Publish {examName}</h2>
                <div className="form-group mb-3">
                  
                      <label className="mb-1">Title:</label>
                
                
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={examDetails.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="mb-1">Description:</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={examDetails.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="mb-1">Publish Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="publishDate"
                    value={examDetails.publishDate}
                    onChange={handleInputChange}
                  />
                </div>
                {/* Add more fields for exam publishing as needed */}
                <p style={{ color: "red" }}>
                  Ready to publish {examName} Exam? We didn't find any problems
                  with your test. Just click Publish and you're good to go.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePublish}
                >
                  Publish
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
