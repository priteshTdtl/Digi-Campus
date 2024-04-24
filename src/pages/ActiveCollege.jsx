import React, { useState, useEffect } from "react";
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
import { useLocation } from "react-router-dom";
import axios from "axios";
import UniSidebar from "../components/UniSidebar";
import DataTable from "react-data-table-component";

export default function ActiveCollege() {
  const [collegeList, setCollegeList] = useState([]);

  useEffect(() => {
    const universityId = localStorage.getItem("universityId");

    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://54.68.156.170:8000/college_details/",
          {
            university_id: universityId,
          }
        );
        console.log("Response data:", response.data);
        setCollegeList(
          response.data.map((college) => ({
            id: college.college_id,
            college_id: college.college_id,
            college_name: college.college_name,
            college_email: college.college_email,
            college_number: college.college_number,
            college_location: college.college_location,
            university_id: college.university_id,
          }))
        );
      } catch (error) {
        console.error("Error fetching college data:", error);
      }
    };

    if (universityId) {
      fetchData();
    } else {
      console.error("University ID not found in local storage");
    }
  }, []);

  const columns = [
    { name: "College ID", selector: (row) => row.college_id, sortable: true },
    {
      name: "College Name",
      selector: (row) => row.college_name,
      sortable: true,
    },
    { name: "Email", selector: (row) => row.college_email, sortable: true },
    {
      name: "Phone Number",
      selector: (row) => row.college_number,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.college_location,
      sortable: true,
    },
    {
      name: "University ID",
      selector: (row) => row.university_id,
      sortable: true,
    },
  ];

  return (
    <>
      <UniSidebar />
      <div className=" container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div>
            <div className="text-center py-3">
              <h2>Active Colleges</h2>
            </div>
            <DataTable
              columns={columns}
              data={collegeList}
              pagination
              highlightOnHover
              striped
              customStyles={{
                headRow: {
                  style: {
                    backgroundColor: "#f0f0f0",
                    fontWeight: "bold",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
