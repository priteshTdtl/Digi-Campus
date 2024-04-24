import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/sidebar";
import DataTable from "react-data-table-component";
import { saveAs } from "file-saver";

export default function ViewResults() {
  // Example data for students and their scores
  const students = [
    {
      id: 1,
      name: "Anant Mulay",
      class: "FYBSc",
      branch: "Computer Science",
      stream: "Artificial Intelligence",
      score: 85,
    },
    {
      id: 2,
      name: "Gopal Patil",
      class: "SYBCom",
      branch: "Commerce",
      stream: "Finance",
      score: 92,
    },
    {
      id: 3,
      name: "Shubham Mohod",
      class: "TYBA",
      branch: "Arts",
      stream: "History",
      score: 78,
    },
    {
      id: 4,
      name: "Aditya Deshmuhk",
      class: "FYBSc",
      branch: "Computer Science",
      stream: "Cyber Security",
      score: 78,
    },
    {
      id: 5,
      name: "Prathm Suryavanshi",
      class: "TYBCom",
      branch: "Commerce",
      stream: "Accountancy",
      score: 78,
    },
    {
      id: 6,
      name: "Chandra Shekhar",
      class: "FYBCom",
      branch: "Commerce",
      stream: "Marketing",
      score: 78,
    },
  ];

  // Define columns for the DataTable
  const columns = [
    { selector: (row) => row.id, name: "ID" },
    { selector: (row) => row.name, name: "Student Name" },
    { selector: (row) => row.class, name: "Class" },
    { selector: (row) => row.branch, name: "Branch" },
    { selector: (row) => row.stream, name: "Stream" },
    { selector: (row) => row.score, name: "Score" },
  ];

  const [searchText, setSearchText] = useState("");

  const filteredData = students.filter((student) =>
    Object.values(student).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // Function to download data as Excel
  const downloadExcel = (filteredData) => {
    const formattedData = filteredData.map((student) => ({
      ID: student.id,
      "Student Name": student.name,
      Class: student.class,
      Branch: student.branch,
      Stream: student.stream,
      Score: student.score,
    }));
    const blob = new Blob([convertToCSV(formattedData)], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "students_data.csv");
  };
  
  // Inside the return statement
 
  

  // Function to convert data to CSV format
  const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(",");
    const values = data.map((row) => Object.values(row).join(",")).join("\n");
    return `${header}\n${values}`;
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="main p-3">
            <div className="container mt-3">
              <div style={{ height: 400, width: "100%" }}>
                <h2>View Result of Students - Exam</h2>
                <div className="row">
                  <div className="col-6 py-2">
                    <input
                      type="text"
                      placeholder="Search..."
                      onChange={(e) => setSearchText(e.target.value)}
                      value={searchText}
                    />
                  </div>
                </div>

                <DataTable
                  columns={columns}
                  data={filteredData}
                  pagination
                  highlightOnHover
                  striped
                  dense
                />
                <button className="btn btn-primary mt-3" onClick={() => downloadExcel(filteredData)}>
    Download Excel
  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
