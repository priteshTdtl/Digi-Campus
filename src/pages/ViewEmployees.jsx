import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import DataTable from "react-data-table-component";
import axios from "axios";

const EmployeeViewsForm = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const collegeId = localStorage.getItem("collegeId");

        if (!collegeId) {
          console.error("College ID not found in localStorage");
          return;
        }

        const payload = {
          college_id: collegeId,
        };

        const response = await axios.post(
          "http://54.68.156.170:8000/employee_list/",
          payload
        );

        // Add unique id to each employee object
        const employeesWithIds = response.data.map((employee, index) => ({
          ...employee,
          id: index + 1, // Assuming index starts from 0 and you want to start ids from 1
        }));

        setEmployees(employeesWithIds);
      } catch (error) {
        console.error("Error fetching employee list:", error);
      }
    };

    fetchEmployeeList();
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => `${row.first_name} ${row.last_name}`,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone_number,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Department",
      selector: (row) => row.department,
    },
    {
      name: "Joining Date",
      selector: (row) => row.joining_date,
    },
    // {
    //   name: "Emergency Contact Name",
    //   selector: (row) => row.emergency_contact_name,
    // },
    {
      name: "E Contact No",
      selector: (row) => row.emergency_contact_number,
    },
  ];

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="d-flex justify-content-center p-3">
            <div className=" p-4">
              <div className="m-4 headingregistration d-flex justify-content-center">
                <h2>View Employees</h2>
              </div>
              <DataTable
                columns={columns}
                data={employees}
                pagination
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeViewsForm;
