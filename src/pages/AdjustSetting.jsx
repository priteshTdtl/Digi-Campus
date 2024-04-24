import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { HuePicker } from "react-color";
import "../style/addqueston.css";
import Sidebar from "../components/sidebar";

export default function AdjustSetting() {
  const [testName, setTestName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [colorScheme, setColorScheme] = useState("#ffffff");
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [randomizeQuestions, setRandomizeQuestions] = useState(false);
  const [allowBlankAnswers, setAllowBlankAnswers] = useState(false);
  const [penalizeIncorrectAnswers, setPenalizeIncorrectAnswers] =
    useState(false);
  const [pagination, setPagination] = useState("onePerPage");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", {
      testName,
      introduction,
      colorScheme,
      showAllQuestions,
      randomizeQuestions,
      allowBlankAnswers,
      penalizeIncorrectAnswers,
      pagination,
      selectedLanguage,
    });
  };

  const handleColorChange = (color) => {
    setColorScheme(color.hex);
    document.body.style.backgroundColor = color.hex;
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="add-container">
            <h2 className="exam-name">Adjust Settings for </h2>
            <form onSubmit={handleSubmit} className="form-container">
              <h3 className="section-title">Basic Settings</h3>
              <div className="row d-flex align-items-center">
                <div className="col-3">
                  <label htmlFor="testName" className="label text-dark fs-4">
                    Exam Name :
                  </label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    id="testName"
                    // value={examName}
                    onChange={(e) => setTestName(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <label
                    htmlFor="introduction"
                    className="label text-dark fs-5"
                  >
                    Description:
                  </label>
                </div>
                <div className="col-12">
                  <ReactQuill
                    id="introduction"
                    value={introduction}
                    onChange={setIntroduction}
                    className="quill-editor"
                  />
                </div>
              </div>

              {/* <label className="label">Choose color theme for exam:</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <HuePicker
                  color={colorScheme}
                  onChange={handleColorChange}
                  className="hue-picker"
                />
              </div> */}
              <div className="row " style={{ marginTop: "6rem" }}>
                <div className="col-12">
                  <label className="label text-dark fs-5">
                    Queston Settings
                  </label>
                </div>
                <div className="col-12 d-flex ailgn-items-center">
                  <div className="d-flex ailgn-items-center">
                    <input
                      style={{ width: "15px", marginRight: "5px" }}
                      type="radio"
                      name="pagination"
                      value="showAll"
                      checked={pagination === "showAll"}
                      onChange={() => setPagination("showAll")}
                    />
                    <label style={{ marginTop: "10px" }}>
                      Show all the test questions on one page
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex ailgn-items-center">
                    <input
                      style={{ width: "15px", marginRight: "5px" }}
                      type="radio"
                      name="pagination"
                      value="onePerPage"
                      checked={pagination === "onePerPage"}
                      onChange={() => setPagination("onePerPage")}
                    />
                    <label style={{ marginTop: "10px" }}>
                      Show one item per page{" "}
                    </label>
                  </div>
                </div>
              </div>

              <h4 className="py-3">Other Settings</h4>
              <div className="d-flex ailgn-items-center">
                <input
                  style={{ width: "15px", marginRight: "5px" }}
                  type="checkbox"
                  checked={randomizeQuestions}
                  onChange={(e) => setRandomizeQuestions(e.target.checked)}
                />
                <label>
                  Randomize the order of the questions during the test
                </label>
              </div>
              <div className="d-flex ailgn-items-center">
                <label>
                  <input
                    style={{ width: "15px", marginRight: "5px" }}
                    type="checkbox"
                    checked={allowBlankAnswers}
                    onChange={(e) => setAllowBlankAnswers(e.target.checked)}
                  />
                  Allow students to submit blank/empty answers
                </label>
              </div>
              <div className="d-flex ailgn-items-center">
                <label>
                  <input
                    style={{ width: "15px", marginRight: "5px" }}
                    type="checkbox"
                    checked={penalizeIncorrectAnswers}
                    onChange={(e) =>
                      setPenalizeIncorrectAnswers(e.target.checked)
                    }
                  />
                  Penalize incorrect answers (negative marking)
                </label>
              </div>

              <h3 className="section-title">Language Selection</h3>
              <div className="language-selection">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                  {/* Add more language options here */}
                </select>
              </div>

              <button type="submit" className="card-button">
                Save Data
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
