import React, { Fragment, useState } from "react";

const EditBook = ({ book }) => {
  const [description, setDescription] = useState(book.description);
  const [price, setPrice] = useState(book.price);
  const [name, setName] = useState(book.name);
  const [author, setAuthor] = useState(book.author);
  const [id, setID] = useState(book.id);

  const UpdateBook = async (e) => {
    e.preventDefault();
    const body = { description, price, name, author, id };
    const response = await fetch("http://localhost:5000/admin/updatebook", {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id_${book.id}`}
      >
        Edit
      </button>

      <div
        className="modal"
        id={`id_${book.id}`}
        onClick={() =>
          setDescription(
            book.description,
            setAuthor(book.author),
            setName(book.name),
            setPrice(book.price)
          )
        }
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() =>
                  setDescription(
                    book.description,
                    setAuthor(book.author),
                    setName(book.name),
                    setPrice(book.price)
                  )
                }
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <input
                type="hidden"
                className="form-control"
                value={id}
                onChange={(e) => setID(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => UpdateBook(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() =>
                  setDescription(
                    book.description,
                    setAuthor(book.author),
                    setName(book.name),
                    setPrice(book.price)
                  )
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditBook;
