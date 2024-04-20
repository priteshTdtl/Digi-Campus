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
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import Sidebar from "../components/sidebar";

export default function Students() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      college: "College A",
      classroom: "Classroom 1",
      skills: "Mathematics",
      grade: "A",
    },
    {
      id: 2,
      name: "Jane Smith",
      college: "College B",
      classroom: "Classroom 2",
      skills: "Physics",
      grade: "B",
    },
    {
      id: 3,
      name: "Alice Johnson",
      college: "College A",
      classroom: "Classroom 1",
      skills: "Chemistry",
      grade: "B",
    },
    {
      id: 4,
      name: "Bob Williams",
      college: "College A",
      classroom: "Classroom 2",
      skills: "Biology",
      grade: "C",
    },
    {
      id: 5,
      name: "Michael Brown",
      college: "College B",
      classroom: "Classroom 1",
      skills: "History",
      grade: "A",
    },
    {
      id: 6,
      name: "Emma Garcia",
      college: "College C",
      classroom: "Classroom 3",
      skills: "Geography",
      grade: "B",
    },
    {
      id: 7,
      name: "William Martinez",
      college: "College A",
      classroom: "Classroom 2",
      skills: "Literature",
      grade: "C",
    },
    {
      id: 8,
      name: "Olivia Robinson",
      college: "College B",
      classroom: "Classroom 2",
      skills: "Computer Science",
      grade: "A",
    },
    {
      id: 9,
      name: "James Lee",
      college: "College C",
      classroom: "Classroom 1",
      skills: "Art",
      grade: "B",
    },
    {
      id: 10,
      name: "Sophia Clark",
      college: "College A",
      classroom: "Classroom 1",
      skills: "Music",
      grade: "A",
    },
    // Add more students here
    {
      id: 11,
      name: "David Wilson",
      college: "College B",
      classroom: "Classroom 3",
      skills: "Economics",
      grade: "B",
    },
    {
      id: 12,
      name: "Ava White",
      college: "College A",
      classroom: "Classroom 3",
      skills: "Political Science",
      grade: "A",
    },
    {
      id: 13,
      name: "Joseph Anderson",
      college: "College C",
      classroom: "Classroom 2",
      skills: "Psychology",
      grade: "C",
    },
    {
      id: 14,
      name: "Mia Thomas",
      college: "College B",
      classroom: "Classroom 1",
      skills: "Sociology",
      grade: "B",
    },
    {
      id: 15,
      name: "Daniel Hall",
      college: "College A",
      classroom: "Classroom 2",
      skills: "Anthropology",
      grade: "A",
    },
    {
      id: 16,
      name: "Emily Young",
      college: "College C",
      classroom: "Classroom 3",
      skills: "Philosophy",
      grade: "B",
    },
    {
      id: 17,
      name: "Christopher Allen",
      college: "College A",
      classroom: "Classroom 1",
      skills: "Foreign Language",
      grade: "C",
    },
    {
      id: 18,
      name: "Isabella Hernandez",
      classroom: "Classroom 2",
      skills: "Statistics",
      grade: "A",
    },
    {
      id: 19,
      name: "Andrew King",

      classroom: "Classroom 1",
      skills: "Data Analysis",
      grade: "B",
    },
    {
      id: 20,
      name: "Madison Scott",

      classroom: "Classroom 2",
      skills: "Critical Thinking",
      grade: "A",
    },
  ]);

  const [selectedClassroom, setSelectedClassroom] = useState("");
  const [newStudent, setNewStudent] = useState({
    id: "",
    name: "",
    college: "",
    classroom: "",
    skills: "",
    grade: "",
  });

  const filteredStudents = students.filter(
    (student) => student.classroom === selectedClassroom
  );

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "classroom", headerName: "Classroom", width: 150 },
    { field: "skills", headerName: "Skills", width: 150 },
    { field: "grade", headerName: "Grade", width: 100 },
  ];

  const generateTable = () => {
    let table = "<table><thead><tr>";

    columns.forEach((column) => {
      table += `<th>${column.headerName}</th>`;
    });

    table += "</tr></thead><tbody>";

    filteredStudents.forEach((student) => {
      table += "<tr>";
      columns.forEach((column) => {
        table += `<td>${student[column.field]}</td>`;
      });
      table += "</tr>";
    });

    table += "</tbody></table>";

    return table;
  };

  const downloadExcel = () => {
    const table = generateTable();
    const blob = new Blob([table], { type: "application/vnd.ms-excel" });
    saveAs(blob, "students_list.xls");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const addStudent = () => {
    setStudents([...students, newStudent]);
    setNewStudent({
      id: "",
      name: "",
      college: "",
      classroom: "",
      skills: "",
      grade: "",
    });
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Student added successfully!",
    });
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="wrapper" style={{ padding: "20px" }}>
            <div className="main p-3" style={{ margin: "20px" }}>
              <div className="row my-3">
              <h2>View Students Lists As per Classroom</h2>
                <div className="col-4">
                  <select
                    className="form-select p-2"
                    value={selectedClassroom}
                    onChange={(e) => setSelectedClassroom(e.target.value)}
                  >
                    <option value="">Select Classroom</option>
                    <option value="Classroom 1">Classroom 1</option>
                    <option value="Classroom 2">Classroom 2</option>
                    <option value="Classroom 3">Classroom 3</option>
                    {/* Add more classrooms here */}
                  </select>
                </div>
                <div className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={newStudent.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-4">
                  <button className="btn btn-primary" onClick={addStudent}>
                    Add Student
                  </button>
                </div>
              </div>

              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={filteredStudents}
                  columns={columns}
                  pageSize={5}
                />
              </div>

              <div className="row my-3">
                <div className="col">
                  <button className="btn btn-primary" onClick={downloadExcel}>
                    Download Excel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
