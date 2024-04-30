import React, { useState, useEffect } from "react";
import axios from "axios";
import EmpSidebar from "../components/EmpSidebar";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

const SubmitQuestionSheet = () => {
  const [allocatedSubjects, setAllocatedSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [file, setFile] = useState(null);
  const [data, setData] = useState("");

  const universityId = localStorage.getItem("universityId");
  const collegeId = localStorage.getItem("collegeId");
  const teacherId = localStorage.getItem("teacherId");
  console.log(teacherId);

  useEffect(() => {
    const fetchAllocatedSubject = async () => {
      try {
        const response = await axios.post(
          "http://54.68.156.170:8000/allocated_subject/",
          {
            teacher_id: teacherId,
            university_id: universityId,
            college_id: collegeId,
          }
        );
        console.log(response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setAllocatedSubjects(response.data);
          if (!selectedSubject) {
            setSelectedSubject(response.data[0]);
          }
        } else {
          console.error("Error: Invalid response data");
        }
      } catch (error) {
        console.error("Error fetching allocated subjects:", error);
      }
    };

    fetchAllocatedSubject();
  }, [teacherId, universityId, collegeId, selectedSubject]);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("allocated_subject", selectedSubject);
    formData.append("teacher_id", teacherId);
    formData.append("university_id", universityId);
    formData.append("college_id", collegeId);

    try {
      await axios.post(
        "http://54.68.156.170:8000/upload_assignment/",
        formData
      );
      Swal.fire({
        title: "Success",
        text: "Question sheet uploaded successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      setSelectedSubject("");
      setAllocatedSubjects("");
      setFile(null);
    } catch (error) {
      console.error("Error submitting question sheet:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://54.68.156.170:8000/teacher_assignments/",
        {
          teacher_id: teacherId,
          university_id: universityId,
          college_id: collegeId,
        }
      );
      const data = response.data;
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  // Call the fetchData function separately
  fetchData();
  

  const columns = [
    { 
      name: "Assignment ID", 
      selector: (row) => row.assignment_id 
    },
    { 
      name: "Teacher ID", 
      selector: (row) => row.teacher_id 
    },
   
    { 
      name: "Allocated Subject", 
      selector: (row) => row.allocated_subject 
    },
    { 
      name: "Created At", 
      selector: (row) => row.created_at 
    },
    { 
        name: "File", 
        selector: (row) => row.file 
      },
    // { 
    //   name: "College ID", 
    //   selector: (row) => row.college_id 
    // },
    // { 
    //   name: "University ID", 
    //   selector: (row) => row.university_id 
    // }
  ];
  

  return (
    <>
      <EmpSidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <h1>Upload Student Assignment Questions</h1>
          <div className="row d-flex align-items-baseline py-2">
            <div className="col-4">
              <label htmlFor="allocatedSubject">Allocated Subject:</label>
              <select
                id="allocatedSubject"
                className="form-select py-2"
                style={{ fontSize: "15px" }}
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                {allocatedSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-4">
              <label htmlFor="file">Upload PDF File:</label>
              <input
                type="file"
                id="file"
                className="form-control"
                style={{ fontSize: "15px" }}
                accept=".pdf"
                onChange={handleFileChange}
              />
            </div>
            <div className="col-4 text-center">
              <button
                className="btn btn-success fs-4 mt-3"
                onClick={handleSubmit}
              >
                Upload
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
                <DataTable data={data} columns={columns} striped highlightOnHover pagination/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmitQuestionSheet;
