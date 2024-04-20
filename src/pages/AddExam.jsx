import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css";
import "../style/addexam.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "../components/sidebar";

export default function AddExam() {
  const [examData, setExamData] = useState({
    examName: "",
    date: "",
    time: "",
    ampm: "AM",
    marks: "",
    rules: "",
    duration: "",
  });
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted with data:", examData);
      Swal.fire({
        title: "Success!",
        text: "Exam added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/addquestion", { state: { examData } });
    }
  };

  const validateForm = () => {
    if (!examData.examName.trim()) {
      showAlert("Please enter Exam Name.");
      return false;
    }
    if (!examData.date) {
      showAlert("Please select Date.");
      return false;
    }
    if (!examData.time) {
      showAlert("Please select Time.");
      return false;
    }
    if (!examData.marks) {
      showAlert("Please enter Marks.");
      return false;
    }

    if (!examData.rules.trim()) {
      showAlert("Please enter Rules.");
      return false;
    }
    if (!examData.duration) {
      showAlert("Please enter Duration.");
      return false;
    }
    return true;
  };

  const showAlert = (message) => {
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExamData({ ...examData, [name]: value });
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="add-exam-container">
            <h2>Add Exam</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="examName">
                <Form.Label>Exam Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="examName"
                  value={examData.examName}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="date">
                <Form.Label>Date:</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={examData.date}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="time">
                <Form.Label>Time:</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="time"
                    name="time"
                    value={examData.time}
                    onChange={handleInputChange}
                  />
                  <Form.Select
                    className="ms-2"
                    name="ampm"
                    value={examData.ampm}
                    onChange={handleInputChange}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </Form.Select>
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="marks">
                <Form.Label>Marks:</Form.Label>
                <Form.Control
                  type="text"
                  name="marks"
                  value={examData.marks}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="rules">
                <Form.Label>Rules / Description:</Form.Label>
                <ReactQuill
                  theme="snow"
                  value={examData.rules}
                  onChange={(value) =>
                    setExamData({ ...examData, rules: value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 " controlId="duration">
                <Form.Label>Duration (in minutes):</Form.Label>
                <Form.Control
                  type="number"
                  name="duration"
                  value={examData.duration}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                className="custom-button "
              >
                + Add exam
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
