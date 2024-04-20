import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../style/Teacher-management.css";
import teacher from "../images/teacher123.jpg";
import clipart from "../images/clipart.jpg";
import Sidebar from "../components/sidebar";
import "../style/Global.css";

Modal.setAppElement("#root"); // Set the app element for accessibility

const TeacherTable = () => {
  const [Teacher, setTeachers] = useState(() => {
    const storedTeachers = localStorage.getItem("Teacher");
    return storedTeachers ? JSON.parse(storedTeachers) : [];
  });

  const [editable, setEditable] = useState(false); // State to manage table edit mode

  useEffect(() => {
    localStorage.setItem("Teacher", JSON.stringify(Teacher));
  }, [Teacher]);

  const handleAddTeacher = (newTeacher) => {
    const newTeacherId = (Teacher.length + 1).toString().padStart(3, "0");
    newTeacher = { ...newTeacher, TeacherId: newTeacherId };
    setTeachers([...Teacher, newTeacher]);
  };
  const deleteTeacher = (index) => {
    const updatedTeachers = [...Teacher];
    updatedTeachers.splice(index, 1);
    setTeachers(updatedTeachers);
  };

  // AddTeacherForm component for adding new Teacher
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

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="p-5">
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
                <div>
                  <AddTeacherForm onAddTeacher={handleAddTeacher} />
                </div>
              ) : null}
            </div>
            <div className="teacher-table">
              <table className="mt-4">
                <thead>
                  <tr>
                    <th>Teacher Name</th>
                    <th>Email ID</th>
                    <th>Mobile</th>
                    <th>Department</th>
                    <th>Allocated Subject</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Teacher.length > 0 ? (
                    Teacher.map((Teacher, index) => (
                      <tr key={index}>
                        <td>{Teacher.TeacherName}</td>
                        <td>{Teacher.EmailID}</td>
                        <td>{Teacher.phoneno}</td>
                        <td>{Teacher.Department}</td>
                        <td>{Teacher.Allocatedsubject}</td>
                        <td>
                          <button
                            className="edit-button bg-primary"
                            onClick={() => deleteTeacher(index)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-center">
                      <td colSpan="5">No teachers available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherTable;
