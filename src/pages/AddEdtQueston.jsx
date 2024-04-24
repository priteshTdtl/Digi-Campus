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

const TypeMcqQuz = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [marks, setMarks] = useState(0);
  const [type, setType] = useState("");

  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleMicClick = () => {
    SpeechRecognition.startListening();
    setIsListening(true);
  };

  const handleMicStopClick = () => {
    SpeechRecognition.stopListening();
    setQuestion(transcript);
    resetTranscript();
    setIsListening(false);
  };

  const renderOptionsInput = () => {
    switch (type) {
      case "Single Choice":
        return options.map((option, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              marginBottom: "10px",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              padding: "8px",
            }}
          >
            <input
              type="radio"
              className="form-check-input"
              checked={correctOption === index}
              onChange={() => handleMarkOption(index)}
            />
            <input
              type="text"
              className="form-control option-input"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder="Enter option..."
              style={{
                flex: "1",
                marginLeft: "8px",
                border: "none",
                boxShadow: "none",
              }}
            />
            <button
              type="button"
              className="btn btn-danger btn-remove-option"
              onClick={() => handleRemoveOption(index)}
              style={{ marginLeft: "8px" }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ));
      case "Multiple Choice":
        return options.map((option, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              marginBottom: "10px",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              padding: "8px",
            }}
          >
            <input
              type="checkbox"
              className="form-check-input"
              checked={correctOption.includes(index)}
              onChange={() => handleMarkOption(index)}
            />
            <input
              type="text"
              className="form-control option-input"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder="Enter option..."
              style={{
                flex: "1",
                marginLeft: "8px",
                border: "none",
                boxShadow: "none",
              }}
            />
            <button
              type="button"
              className="btn btn-danger btn-remove-option"
              onClick={() => handleRemoveOption(index)}
              style={{ marginLeft: "8px", height: "25px" }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ));
      case "True/False":
        return (
          <>
            <div
              style={{
                display: "flex",
                marginBottom: "10px",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
                padding: "8px",
              }}
            >
              <input
                type="radio"
                className="form-check-input"
                checked={correctOption === 0}
                onChange={() => handleMarkOption(0)}
              />
              <label className="form-check-label">True</label>
            </div>
            <div
              style={{
                display: "flex",
                marginBottom: "10px",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
                padding: "8px",
              }}
            >
              <input
                type="radio"
                className="form-check-input"
                checked={correctOption === 1}
                onChange={() => handleMarkOption(1)}
              />
              <label className="form-check-label">False</label>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);

    // Adjust correct option index if it is removed
    if (correctOption === index) {
      setCorrectOption(null);
    } else if (correctOption > index) {
      setCorrectOption(correctOption - 1);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const url = window.URL.createObjectURL(file);
      setSelectedFile({
        file,
        url,
      });
    }
  };

  const handleMarkOption = (index) => {
    if (type === "Multiple Choice") {
      const updatedCorrectOptions = Array.isArray(correctOption)
        ? [...correctOption]
        : [];
      const selectedIndex = updatedCorrectOptions.indexOf(index);
      if (selectedIndex === -1) {
        updatedCorrectOptions.push(index);
      } else {
        updatedCorrectOptions.splice(selectedIndex, 1);
      }
      setCorrectOption(updatedCorrectOptions);
    } else {
      setCorrectOption(index);
    }
  };

  const handleSubmit = () => {
    console.log("Question:", question);
    console.log("Options:", options);
    console.log("Correct Option(s):", correctOption);
    console.log("Selected File:", selectedFile);
    console.log("Marks:", marks);
    console.log("Type:", type);
    // You can add additional logic here if needed

    // For demonstration purposes, you can clear the form fields after submission
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectOption([]);
    setSelectedFile(null);
    setMarks(0);
    setType("");
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="w-75">
            <div className="main p-3">
              <div className="container w-100 mt-3">
                <div className="w-100">
                  <div style={{ marginBottom: "20px" }}>
                    <h2>Add Questions for...... Exam</h2>

                    <label htmlFor="question">Question:</label>
                    <textarea
                      id="question"
                      className="form-control p-4"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Enter your question"
                    />
                    <div style={{ marginTop: "10px" }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleMicClick}
                      >
                        <FontAwesomeIcon icon={faMicrophone} /> Speak Question
                      </button>
                      {isListening && (
                        <button
                          type="button"
                          className="btn btn-danger ml-2"
                          onClick={handleMicStopClick}
                          style={{ marginLeft: "4px" }}
                        >
                          <FontAwesomeIcon icon={faStop} /> Stop
                        </button>
                      )}
                    </div>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="type">Type:</label>
                    <select
                      id="type"
                      className="form-select p-3"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="">Select type</option>
                      <option value="Single Choice">Single Choice</option>
                      <option value="Multiple Choice">Multiple Choice</option>
                      <option value="True/False">True/False</option>
                    </select>
                  </div>
                  {renderOptionsInput()}
                  <div className="row">
                    <div className="col-3">
                      <span
                        type="button"
                        className="btn btn-dark btn-add-option"
                        onClick={handleAddOption}
                      >
                        <FontAwesomeIcon icon={faPlus} /> Add Option
                      </span>
                    </div>
                    <div className="col-2">
                      <span
                        type="button"
                        className="btn btn-success "
                        onClick={handleSubmit}
                      >
                        Submit
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TypeMcqQuz;
