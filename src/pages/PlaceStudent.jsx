import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import { saveAs } from "file-saver";
import Sidebar from "../components/sidebar";
import { SiMicrosoftexcel } from "react-icons/si";
import EmpSidebar from "../components/EmpSidebar";

export default function PlaceStudent() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      class: "B.Tech CSE",
      branch: "Computer Science",
      company: "Tech Corp",
      designation:"Front End Developer",
      offer: "Accepted",
    },
    {
      id: 2,
      name: "Jane Smith",
      class: "BBA",
      branch: "Management",
      company: "Finance Ltd",
      designation:"HR Executive",
      offer: "Rejected",
    },
    {
      id: 3,
      name: "Alice Johnson",
      class: "B.Tech ECE",
      branch: "Electronics",
      company: "ElectroTech",
      designation:"Analyst",
      offer: "Accepted",
    },
    // Add more dummy data as needed
  ]);

  const [selectedOffer, setSelectedOffer] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleOfferChange = (e) => {
    setSelectedOffer(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudentsByOffer = selectedOffer
    ? students.filter((student) => student.offer === selectedOffer)
    : students;

  const filteredStudentsByName = searchTerm
    ? filteredStudentsByOffer.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredStudentsByOffer;

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Class", selector: (row) => row.class, sortable: true },
    { name: "Branch", selector: (row) => row.branch, sortable: true },
    { name: "Company", selector: (row) => row.company, sortable: true },
    { name: "Designation", selector: (row) => row.designation, sortable: true },

    { 
      name: "Offer",
      selector: (row) => row.offer,
      sortable: true,
      cell: (row) => (
        <span className={`label ${row.offer === "Accepted" ? "label-success" : "label-danger"}`}>
          {row.offer}
        </span>
      )
    },
  ];

  const downloadExcel = () => {
    let fileName = "";
    if (selectedOffer === "Accepted") {
      fileName = "place_student.csv";
    } else if (selectedOffer === "Rejected") {
      fileName = "unplaced_student_list.csv";
    } else {
      fileName = "all_students.csv"; // Default file name for all students
    }
    
    const filteredData = filteredStudentsByName.map((student) =>
      Object.values(student).join(",")
    );
    const csvString = filteredData.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    saveAs(blob, fileName);
  };
  

  return (
    <>
      <EmpSidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div style={{ padding: "20px" }}>
            <div className="main p-3">
              <div className="row w-100 my-3">
                <div className="col-12 py-4">
                  <h2>Placed and Unplaced Students List</h2>
                </div>
             
                <div className="col-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="col-5">
                  <select
                    className="form-select p-3"
                    value={selectedOffer}
                    onChange={handleOfferChange}
                  >
                    <option value="">Select Offer</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div className="col-2 ">
                  <SiMicrosoftexcel
                    fontSize={30}
                    color=""
                    onClick={downloadExcel}
                  />
                </div>
              </div>

              <DataTable
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
