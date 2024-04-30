import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import DataTable from "react-data-table-component";
import "../style/Librarytable.css";
import { FaEye } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

Modal.setAppElement("#root");

const LibraryTable = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [borrowerDetails, setBorrowerDetails] = useState([]);

  const [studentDetails, setStudentDetails] = useState({
    studentName: "",
    email: "",
    issueDate: "",
    returnDate: "",
  });

  const universityId = localStorage.getItem("universityId");
  const collgeId = localStorage.getItem("collegeId");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.post("http://54.68.156.170:8000/all_book/", {
        college_id: collgeId,
        university_id: universityId,
      });
      const data = response.data;
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Book Name",
      selector: (row) => row.book_name,
      sortable: true,
    },
    {
      name: "Book ID",
      selector: (row) => row.books_id,
      sortable: true,
    },
    {
      name: "Author Name",
      selector: (row) => row.author,
      sortable: true,
    },
    {
      name: "ISBN No.",
      selector: (row) => row.isbn_no,
      sortable: true,
    },
    {
      name: "Publish Year",
      selector: (row) => row.publish_year,
      sortable: true,
    },
    {
      name: "Availability",
      selector: (row) => row.available,
      sortable: true,
    },

    {
      name: "Borrower",
      selector: (row) => row.borrower,
      sortable: true,
      cell: (row) => (
        <>
          {row.borrower}
          <Popup
            trigger={
              <button className="eye-icon ml-1">
                <FaEye
                  onClick={() => handleBorrowerDetailsClick(row.books_id)}
                />
              </button>
            }
            modal
            nested
            contentStyle={{
              minHeight: "60vh",
              overflowY: "auto",
            }}
          >
            {(close) => (
              <div className="p-3">
                <h5 className="close mb-4 col-1" onClick={close}>
                  &times;
                </h5>
                <h2 className="ml-4">Borrower Details</h2>
                <ul>
                  {borrowerDetails && borrowerDetails.length > 0 ? (
                    borrowerDetails.map((borrower, index) => (
                      <li
                        key={index}
                        style={{ padding: "10px", fontSize: "larger" }}
                      >
                        Borrower: {borrower.first_name} {borrower.last_name}
                        <br />
                        PRN: {borrower.prn_no}
                        <br />
                        Issue Date: {formatDate(borrower.issue_date)}
                        <br />
                        <button
                          onClick={() => handleReturnBook(borrower.issue_id)}
                          className={`btn ${
                            borrower.returned ? "btn-success" : "btn-warning"
                          }`}
                        >
                          {borrower.returned ? "Returned" : "Return"}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="text-center">No borrowers for this book</li>
                  )}
                </ul>
              </div>
            )}
          </Popup>
        </>
      ),
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: "Issue",
      cell: (row) => (
        <>
          {row.stock !== 0 && (
            <Popup
              contentStyle={{ borderRadius: "10px" }}
              trigger={
                <button
                  className="btn btn-primary"
                  onClick={() => handleIssueBookClick(row.books_id)}
                >
                  {" "}
                  Issue Book{" "}
                </button>
              }
              modal
            >
              <form className="p-5">
                <div className="mb-3">
                  {" "}
                  <label htmlFor="studentName" className="form-label">
                    Student Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="studentName"
                    value={studentDetails.studentName}
                    onChange={(e) =>
                      setStudentDetails({
                        ...studentDetails,
                        studentName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    PRN
                  </label>
                  <input
                    type="username"
                    className="form-control"
                    id="username"
                    value={studentDetails.username}
                    onChange={(e) =>
                      setStudentDetails({
                        ...studentDetails,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="issueDate" className="form-label">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="issueDate"
                    value={studentDetails.issueDate}
                    onChange={(e) =>
                      setStudentDetails({
                        ...studentDetails,
                        issueDate: e.target.value,
                      })
                    }
                  />
                </div>

                <button
                  type="button"
                  style={{ fontSize: "13px" }}
                  className="btn btn-success"
                  onClick={() => handleModalSubmit(row.books_id)}
                >
                  Issue Book
                </button>
              </form>
            </Popup>
          )}
        </>
      ),
    },
  ];

  const handleReturnBook = async (issueId) => {
    try {
      const response = await axios.post(
        "http://54.68.156.170:8000/return_book/",
        {
          issue_id: issueId,
          return_date: new Date().toISOString().split("T")[0], // Get current date in YYYY-MM-DD format
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Book returned successfully.",
        });
        // Update borrower details to mark the book as returned
        const updatedBorrowerDetails = borrowerDetails.map((borrower) => {
          if (borrower.issue_id === issueId) {
            return { ...borrower, returned: true }; // Set returned flag to true
          }
          return borrower;
        });
        setBorrowerDetails(updatedBorrowerDetails); // Update borrower details state
        console.log("Book returned successfully:", response.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to return book. Please try again later.",
        });
        console.error("Error returning book:", response);
      }
    } catch (error) {
      console.error("Error returning book:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to return book. Please try again later.",
      });
    }
  };

  const handleBorrowerDetailsClick = async (books_id) => {
    setSelectedBook(books_id);
    setModalIsOpen(true);

    try {
      const response = await axios.post(
        "http://54.68.156.170:8000/borrower_details/",
        {
          book_id: books_id,
        }
      );
      console.log("API RESPONSE: ", response.data);

      setBorrowerDetails(response.data);
      // Handle response data as needed
    } catch (error) {
      console.log(error);
      // Handle error as needed
    }
  };

  const closeModal = () => {
    setSelectedBook(null);
    setModalIsOpen(false);
  };

  const handleIssueBookClick = (books_id) => {
    setSelectedBook(books_id);
    setModalIsOpen(true);
  };

  const handleModalSubmit = async (books_id) => {
    try {
      const response = await axios.post(
        "http://54.68.156.170:8000/issue_book/",
        {
          book_id: books_id,
          student_name: studentDetails.studentName,
          prn_no: studentDetails.username,
          issue_date: studentDetails.issueDate,
          return_date: studentDetails.returnDate,
        }
      );

      console.log(response.data);

      Swal.fire({
        title: "Success!",
        text: `Book Issued to ${studentDetails.studentName}`,
        icon: "success",
        confirmButtonText: "OK",
      });

      fetchBooks();

      setStudentDetails({
        studentName: "",
        username: "",
        returnDate: "",
        issueDate: "",
      });
    } catch (error) {
      console.error("Error issuing book:", error.message);
      Swal.fire({
        title: "Sorry!",
        text: "Please Try After Sometime!",
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  };

  const handleAddBook = async (newBook) => {
    try {
      const response = await axios.post("http://54.68.156.170:8000/add_book/", {
        university_id: universityId,
        college_id: collgeId,
        book_name: newBook.bookName,
        author: newBook.authorName,
        isbn_no: newBook.ISBN,
        publish_year: newBook.publishYear,
      });

      const { data } = response;
      setBooks([...books, data]);
      Swal.fire({
        title: "Success!",
        text: "Book added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      fetchBooks();
    } catch (error) {
      console.error("Error adding book:", error);
      Swal.fire({
        title: "Sorry!",
        text: "Please Try After Sometime!",
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="p-5">
            <h2 className="lib-head d-flex justify-content-center mt-2">
              Welcome to the Library!
            </h2>
            <div>
              <button
                onClick={() => setEditable(!editable)}
                className={`btn-addbook mb-4 p-2 ${
                  editable ? "btn btn-warning" : "btn btn-primary"
                }`}
              >
                {editable ? "Close" : "Add Book"}
              </button>

              {editable ? <AddBookForm onAddBook={handleAddBook} /> : null}
            </div>

            <div className="lib-table">
              <DataTable columns={columns} data={books} pagination />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AddBookForm = ({ onAddBook }) => {
  const [newBook, setNewBook] = useState({
    bookName: "",
    authorName: "",
    ISBN: "",
    publishYear: "",
    stock: "",
    availability: "Available",
    borrower: "N/A",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newBook.bookName ||
      !newBook.authorName ||
      !newBook.ISBN ||
      !newBook.publishYear
    ) {
      alert("Please fill in all fields.");
      return;
    }
    onAddBook(newBook);
    setNewBook({
      bookName: "",
      authorName: "",
      ISBN: "",
      stock: "",
      publishYear: "",
      availability: "Available",
      borrower: "N/A",
    });
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <form onSubmit={handleSubmit} className="add-book-form mb-4">
          <div className="row d-flex align-items-center">
            <div className="col-2">
              <img
                src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334866.jpg?w=740&t=st=1713433024~exp=1713433624~hmac=3a0b15d83fb51763678c0d9497a31804cf7095609bb20e2862ab09d08a1422d4"
                className="book-img "
              />
            </div>
            <div className="col-2">
              <input
                className="form-control"
                type="text"
                name="bookName"
                value={newBook.bookName}
                onChange={handleChange}
                placeholder="Book Name"
              />
            </div>
            <div className="col-2">
              <input
                className="form-control"
                type="text"
                name="authorName"
                value={newBook.authorName}
                onChange={handleChange}
                placeholder="Author Name"
              />
            </div>
            <div className="col-2">
              <input
                className="form-control"
                type="text"
                name="ISBN"
                value={newBook.ISBN}
                onChange={handleChange}
                placeholder="ISBN"
              />
            </div>
            <div className="col-2">
              <input
                className="form-control"
                type="text"
                name="stock"
                value={newBook.stock}
                onChange={handleChange}
                placeholder="stock"
              />
            </div>
            <div className="col-2">
              <input
                className="form-control"
                type="number"
                name="publishYear"
                value={newBook.publishYear}
                onChange={handleChange}
                placeholder="Publish Year"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex justify-content-center text-center">
              <button type="submit" className="btn btn-success mb-3">
                Add Book
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LibraryTable;
