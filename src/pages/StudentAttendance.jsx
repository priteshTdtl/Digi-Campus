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
import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";

export default function StudentAttendance() {
  const [rows, setRows] = useState([
    {
      id: "Anant Mulay",
      date: "2024-04-19",
      attendanceStatus: "Present",
      timeIn: "08:00 AM",
      timeOut: "03:00 PM",
      classId: "CS101",
      course: "Computer Science",
      teacherId: "T123",
      location: "Room 101",
      reasonForAbsence: "special occasions",
      notes: "not submtted",
    },
    {
      id: "Shubham Mohod",
      date: "2024-04-19",
      attendanceStatus: "Absent",
      timeIn: "09:00 AM",
      timeOut: "02:00 PM",
      classId: "CS101",
      course: "Computer Science",
      teacherId: "T123",
      location: "Room 102",
      reasonForAbsence: " car issues",
      notes: "submtted",
    },
  ]);

  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    { field: "id", headerName: "Student ID or Name", width: 200 },
    { field: "date", headerName: "Date", width: 120 },
    {
      field: "attendanceStatus",
      headerName: "Attendance Status",
      width: 180,
    },
    { field: "timeIn", headerName: "Time In", width: 150 },
    { field: "timeOut", headerName: "Time Out", width: 150 },
    { field: "classId", headerName: "Class or Session ID", width: 180 },
    { field: "course", headerName: "Course or Subject", width: 200 },
    { field: "teacherId", headerName: "Teacher or Instructor ID", width: 200 },
    { field: "location", headerName: "Location", width: 180 },
    { field: "reasonForAbsence", headerName: "Reason for Absence", width: 200 },
    { field: "notes", headerName: "Notes", width: 200 },
  ];

  const handleRowSelection = (selection) => {
    setSelectedRow(selection.rows[0]);
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="wrapper" style={{ padding: "20px" }}>
            <div className="main p-3" style={{ margin: "20px" }}>
              <h2>Student attendance</h2>
              <div className="row my-3">
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowSelection={{
                      type: "single",
                      onChange: handleRowSelection,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
