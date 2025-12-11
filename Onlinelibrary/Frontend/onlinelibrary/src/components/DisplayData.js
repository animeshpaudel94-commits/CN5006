import React from 'react';
import { Link } from 'react-router-dom';

function Showbooks({ book }) {
  return (
    <tr>
      <td>{book.booktitle}</td>
      <td>{book.PubYear}</td>
      <td>{book.author}</td>
      <td>{book.Topic}</td>
      <td>{book.formate}</td>
      <td>
        <Link to={`/edit/${book._id}`} className="btn btn-warning btn-sm">
          Edit
        </Link>
      </td>
      <td>
        <Link to={`/Delete/${book._id}`} className="btn btn-danger btn-sm">
          Delete
        </Link>
      </td>
    </tr>
  );
}

function DisplayData({ Books }) {
  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Book Title</th>
            <th>Pub Year</th>
            <th>Author</th>
            <th>Subject</th>
            <th>Formate</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Books.map((book) => (
            <Showbooks key={book._id} book={book} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayData;