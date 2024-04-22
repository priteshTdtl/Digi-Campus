import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../style/Librarytable.css";
import { FaEye } from "react-icons/fa6";
import Sidebar from "../components/sidebar";
import axios from "axios"; // Import Axios for making HTTP requests
import Swal from "sweetalert2";

Modal.setAppElement("#root");

const LibraryTable = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  // const [collegeName, setCollegeName] = useState("");

  const universityId = localStorage.getItem("universityId");
  const collgeId = localStorage.getItem("collegeId");

  useEffect(() => {
    // fetchCollegeName();
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

  const handleBorrowerDetailsClick = (book) => {
    setSelectedBook(book);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setModalIsOpen(false);
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

  // const handleDeleteBook = async (bookId) => {
  //   try {
  //     await axios.delete(`http://54.68.156.170:8000/delete_book/${bookId}`);
  //     const updatedBooks = books.filter((book) => book.bookId !== bookId);
  //     setBooks(updatedBooks);
  //     Swal.fire({
  //       title: "Success!",
  //       text: "Book deleted successfully!",
  //       icon: "success",
  //       confirmButtonText: "OK",
  //     });
  //   } catch (error) {
  //     console.error("Error deleting book:", error);
  //     alert("Failed to delete book. Please try again later.");
  //   }
  // };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <div className="p-5">
            <h2 className="d-flex justify-content-center mt-2">
              Welcome to the Library!
            </h2>
            {/* <h3 className="mt-4 d-flex justify-content-center">
              {collegeName}
            </h3> */}

            <div>
              <button
                onClick={() => setEditable(!editable)}
                className="btn btn-primary fs-4 my-3"
              >
                {editable ? "Save" : "Add Book"}
              </button>
              {editable ? <AddBookForm onAddBook={handleAddBook} /> : null}
            </div>

            <div className="lib-table">
              <table>
                <thead>
                  <tr>
                    <th>Book Name</th>
                    <th>Book ID</th>
                    <th>Author Name</th>
                    <th>ISBN No.</th>
                    <th>Publish Year</th>
                    <th>Availability</th>
                    <th>Borrower</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.books_id}>
                      <td>{book.book_name}</td>
                      <td>{book.books_id}</td>
                      <td>{book.author}</td>
                      <td>{book.isbn_no}</td>
                      <td>{book.publish_year}</td>
                      <td>{book.availability}</td>
                      <td>
                        {book.borrower}
                        {book.borrower !== "N/A" && (
                          <button
                            onClick={() => handleBorrowerDetailsClick(book)}
                            className="eye-icon ml-1"
                          >
                            <FaEye />
                          </button>
                        )}
                      </td>
                      {/* <td>
                        <button
                          onClick={() => handleDeleteBook(book.books_id)}
                          className="dlt-btn bg-primary"
                        >
                          Delete
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              className="popup2-content"
            >
              <div className="modal-content p-3">
                <h5 className="close mb-4 col-1" onClick={closeModal}>
                  &times;
                </h5>
                <h2 className="ml-4">Borrower Details</h2>
                <ul>
                  {selectedBook && (
                    <>
                      <li>Borrower: {selectedBook.borrower}</li>
                      <li>Issue Date: {selectedBook.issueDate}</li>
                      <li>Return Date: {selectedBook.returnDate}</li>
                      <li>
                        Year & Department: {selectedBook.year} &{" "}
                        {selectedBook.department}
                      </li>
                      <li>Division: {selectedBook.division}</li>
                    </>
                  )}
                </ul>
              </div>
            </Modal>
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
      publishYear: "",
      availability: "Available",
      borrower: "N/A",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form mb-4">
      <div className="row d-flex align-items-center">
        <div className="col-2">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334866.jpg?w=740&t=st=1713433024~exp=1713433624~hmac=3a0b15d83fb51763678c0d9497a31804cf7095609bb20e2862ab09d08a1422d4"
            className="book-img img-fluid"
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
            type="number"
            name="publishYear"
            value={newBook.publishYear}
            onChange={handleChange}
            placeholder="Publish Year"
          />
        </div>
        <div className="col-2">
          <button type="submit" className="btn btn-success mb-3">
            Add Book
          </button>
        </div>
      </div>
    </form>
  );
};

export default LibraryTable;
