import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import axios from "axios";
import "../style/addexam.css";

export default function AddExam() {
  const [examData, setExamData] = useState({
    examName: "",
    date: "",
    time: "",
    ampm: "AM",
    marks: "",
    rules: "",
    duration: "",
    college_id: "",
    university_id: "",
    branch_id: "",
  });

  const [branchList, setBranchList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const collegeId = localStorage.getItem("collegeId");
    const universityId = localStorage.getItem("universityId");
    setExamData((prevState) => ({
      ...prevState,
      college_id: collegeId,
      university_id: universityId,
    }));

    axios
      .post("http://54.68.156.170:8000/branch_details/", {
        college_id: collegeId,
        university_id: universityId,
      })
      .then((response) => {
        setBranchList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching branch list:", error);
      });
  }, []);

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
    if (!examData.branch_id) {
      showAlert("Please select Branch.");
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

  const handleAddExamClick = () => {
    if (validateForm()) {
      try {
        // Your code to add the exam

        // After successfully adding the exam, navigate to the "/addquestion" page
        navigate("/addquestion");
      } catch (error) {
        console.error("Error adding exam:", error);
        // Handle error
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExamData({ ...examData, [name]: value });
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex justify-content-center align-items-center">
        <div className="main-content p-4">
          <div className="add-exam-container">
            <h2 className="text-center mb-4">Add Exam</h2>
            <Form>
              <Form.Group className="mb-3" controlId="examName">
                <Form.Label>Exam Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="examName"
                  value={examData.examName}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="date">
                    <Form.Label>Date:</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={examData.date}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="time">
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
                </Col>
              </Row>
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
              <Form.Group className="mb-3" controlId="branch">
                <Form.Label>Branch:</Form.Label>
                <Form.Select
                  name="branch_id"
                  value={examData.branch_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Branch</option>
                  {branchList.map((branch) => (
                    <option key={branch.branch_id} value={branch.branch_id}>
                      {branch.branch_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button
                variant="success"
                onClick={handleAddExamClick}
                className="custom-button w-100"
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
