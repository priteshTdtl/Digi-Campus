import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import Sidebar from "../components/sidebar";
import { SiMicrosoftexcel } from "react-icons/si";

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
      id: 1,
      name: "Suraj",
      college: "College A",
      classroom: "Classroom 1",
      skills: "Mathematics",
      grade: "A",
    },
    // Add more students here
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
    { name: "id", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Classroom", selector: (row) => row.classroom, sortable: true },
    { name: "Skills", selector: (row) => row.skills, sortable: true },
    { name: "Grade", selector: (row) => row.grade, sortable: true },
  ];

  const downloadExcel = () => {
    const csvData = students.map((student) =>
      Object.values(student).join(",")
    );
    const csvString = csvData.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    saveAs(blob, "students_list.csv");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudentsByName = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div style={{ padding: "20px" }}>
            <div className="main p-3" style={{ margin: "20px" }}>
              <div className="row my-3">
                <h2>View Students Lists As per Classroom</h2>
                <div className="col-4">
                <select
                    className="form-select p-3"
                    value={selectedClassroom}
                    onChange={(e) => setSelectedClassroom(e.target.value)}
                  >
                    <option value="">Select Branch</option>
                    {/* Computer-related branches */}
                    <optgroup label="Computer Science">
                      <option value="B.Tech IT">B.Tech IT</option>
                      <option value="B.Sc. Computer Science">B.Sc. Computer Science</option>
                      <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                      <option value="M.Tech Computer Engineering">M.Tech Computer Engineering</option>
                      <option value="M.Sc. Information Technology">M.Sc. Information Technology</option>
                      <option value="MCA">MCA (Master of Computer Applications)</option>
                      <option value="BCS">BCS (Bachelor of Computer Science)</option>
                      <option value="B.Tech AI">B.Tech Artificial Intelligence</option>
                      <option value="B.Tech ML">B.Tech Machine Learning</option>
                      <option value="B.Tech Cyber Security">B.Tech Cyber Security</option>
                    </optgroup>
                    {/* Management branches */}
                    <optgroup label="Management">
                      <option value="BBA">BBA (Bachelor of Business Administration)</option>
                      <option value="MBA">MBA (Master of Business Administration)</option>
                      <option value="BMS">BMS (Bachelor of Management Studies)</option>
                      <option value="BBM">BBM (Bachelor of Business Management)</option>
                      <option value="B.Com">B.Com (Bachelor of Commerce)</option>
                      <option value="M.Com">M.Com (Master of Commerce)</option>
                    </optgroup>
                  </select>

                </div>
                <div className="col-4 ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name or PRN"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-4">
                  <SiMicrosoftexcel fontSize={30} color="" onClick={downloadExcel}/>
                  
                </div>
              </div>

              <DataTable
                // title="Students List"
                columns={columns}
                data={filteredStudentsByName}
                pagination
                highlightOnHover
                striped
                paginationPerPage={5}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
