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
import { DataGrid } from "@mui/x-data-grid"; // Import DataGrid
import Sidebar from "../components/sidebar";
// import { LineChart } from "@mui/x-charts/LineChart"; // You may not need this import if not used

export default function ViewResults() {
 
  // Example data for students and their scores
  const students = [
    { id: 1, name: "Anant Mulay", score: 85 },
    { id: 2, name: "Gopal Patil", score: 92 },
    { id: 3, name: "Shubham Mohod", score: 78 },
    { id: 4, name: "Aditya Deshmuhk", score: 78 },

    { id: 5, name: "Prathm Suryavanshi", score: 78 },
    { id: 6, name: "chandra shekhar ", score: 78 },

    // Add more students as needed
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Student Name", width: 200 },
    { field: "score", headerName: "Score", width: 130 },
  ];

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="main p-3">
            <div className="container mt-3">
              <div style={{ height: 400, width: "100%" }}>
              <h2>View Result of Students -  Exam</h2>
                <DataGrid
                  rows={students}
                  columns={columns}
                  pageSize={5}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
