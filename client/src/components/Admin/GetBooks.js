import React, { useEffect, useState } from "react";
import EditBook from "./EditBook";

const GetBooks = () => {
  useEffect(() => {
    fetchbooks();
  }, []);
  const [books, setBooks] = useState([]);
  const fetchbooks = async () => {
    const books = await fetch("http://localhost:5000/admin/getbooks", {
      credentials: "include",
    });
    const resdata = await books.json();
    setBooks(resdata);
  };

  const deletebook = async (id) => {
    const body = { id };
    const response = await fetch("http://localhost:5000/admin/deletebook", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    window.location = "/";
  };

  return books.map((book) => (
    <div className="card mt-5 ml-5" key={book.id}>
      <img src={book.book_image} className="card-img-top" alt="" />
      <div className="card-body">
        <h4 className="card-title">Name: {book.name}</h4>
        <h5 className="card-title">Author: {book.author}</h5>
        <p className="card-text">Price: {book.price}</p>
        <p className="card-text">{book.description}</p>
        <EditBook book={book} />
        <button
          className="btn btn-danger ml-3"
          onClick={() => deletebook(book.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default GetBooks;
