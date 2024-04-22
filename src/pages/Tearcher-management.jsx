import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Sidebar from "../components/sidebar";
import clipart from "../images/emp.png";
import "../style/Global.css";
import "../style/Teacher-management.css"
import teacher from "../images/teacher123.jpg"
import Swal from "sweetalert2";

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://your-api-url/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleAddTeacher = async (newTeacher) => {
    try {
      const response = await axios.post("http:// /add_teacher", newTeacher);
      const { data } = response;
      setTeachers([...teachers, data]);
      // Optionally, you can display a success message here
      Swal.fire ({
        title: "Success!",
        text: "Teacher added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error adding teacher:", error);
      // Optionally, you can display an error message here
      Swal.fire ({
        title: "Error!",
        text: "Error adding teacher!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const deleteTeacher = async (teacherId) => {
    try {
      await axios.delete(`http://your-api-url/delete_teacher/${teacherId}`);
      const updatedTeachers = teachers.filter((teacher) => teacher.id !== teacherId);
      setTeachers(updatedTeachers);
      Swal.fire ({
        title: "Success!",
        text: "Teacher deleted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error deleting teacher:", error);
      // Optionally, you can display an error message here
      Swal.fire ({
        title: "Error!",
        text: "Error deleting teacher!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const columns = [
    {
      name: "Teacher Name",
      selector: "TeacherName",
      sortable: true,
    },
    {
      name: "Email ID",
      selector: "EmailID",
      sortable: true,
    },
    {
      name: "Mobile",
      selector: "phoneno",
      sortable: true,
    },
    {
      name: "Department",
      selector: "Department",
      sortable: true,
    },
    {
      name: "Allocated Subject",
      selector: "Allocatedsubject",
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="edit-button bg-primary"
          onClick={() => deleteTeacher(row.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="p-4 ">
            <h2 className="mb-5 d-flex justify-content-center">
              <b>DY patil College Of Engineering</b>
            </h2>
            <div className="row clip-section py-3">
              <div className="col-lg-2">
                <img
                  src={clipart}
                  alt="Add Teacher"
                  className="clipart-image"
                />
              </div>
              <div className="col-lg-10">
                <h2>
                  <b>Faculty Management</b>
                </h2>
              </div>
            </div>
            <div className="mt-5">
              <button
                onClick={() => setEditable(!editable)}
                className="edit-button mb-5 fs-4 bg-primary"
              >
                {editable ? "Save" : "Add Teacher"}
              </button>
              {editable ? (
                <AddTeacherForm onAddTeacher={handleAddTeacher} />
              ) : null}
            </div>
            <div className="teacher-table">
              <DataTable
                columns={columns}
                data={teachers}
                noHeader
                pagination
                dense
                striped
                selectableRows
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AddTeacherForm = ({ onAddTeacher }) => {
  const [newTeacher, setNewTeacher] = useState({
    TeacherName: "",
    EmailID: "",
    phoneno: "",
    Department: "",
    Allocatedsubject: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher({ ...newTeacher, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !newTeacher.TeacherName ||
      !newTeacher.EmailID ||
      !newTeacher.phoneno ||
      !newTeacher.Department ||
      !newTeacher.Allocatedsubject
    ) {
      return;
    }
    // Call the onAddTeacher function passed from the parent component
    onAddTeacher(newTeacher);
    // Reset form fields
    setNewTeacher({
      TeacherName: "",
      EmailID: "",
      phoneno: "",
      Department: "",
      Allocatedsubject: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="row mb-3 add-teacher-form">
      <div className="col-lg-2">
        <img src={teacher} alt="Add Teacher" className="image-teacher" />
      </div>
      <div className="col-lg-10 p-4">
        <div className="row">
          <div className="col-4">
            <input
              className="form-control"
              type="text"
              name="TeacherName"
              value={newTeacher.TeacherName}
              onChange={handleChange}
              placeholder="Teacher Name"
            />
          </div>
          <div className="col-4">
            <input
              className="form-control"
              type="email"
              name="EmailID"
              value={newTeacher.EmailID}
              onChange={handleChange}
              placeholder="Email ID"
            />
          </div>
          <div className="col-4">
            <input
              className="form-control"
              type="number"
              name="phoneno"
              value={newTeacher.phoneno}
              onChange={handleChange}
              placeholder="Phone no"
            />
          </div>
          <div className="col-4">
            <input
              className="form-control"
              type="text"
              name="Department"
              value={newTeacher.Department}
              onChange={handleChange}
              placeholder="Department"
            />
          </div>
          <div className="col-4">
            <input
              className="form-control"
              type="text"
              name="Allocatedsubject"
              value={newTeacher.Allocatedsubject}
              onChange={handleChange}
              placeholder="Allocated subject"
            />
          </div>
          <div className="col-4">
            <button className="p-2 m-2 bg-primary btn-form" type="submit">
              Add teacher
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TeacherTable;
