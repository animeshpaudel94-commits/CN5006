import React, { useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

function DeleteBook() {
  let params = useParams();
  let navigate = useNavigate();
  let url = "http://localhost:5000/";

  useEffect(() => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    
    if (confirmDelete) {
      axios.delete(url + "deletebook/" + params.id)
        .then(res => {
          console.log(res.data);
          alert("Book deleted successfully!");
          navigate("/DisplayBooksF1");
        })
        .catch(err => {
          console.log(err);
          alert("Error deleting book!");
          navigate("/DisplayBooksF1");
        });
    } else {
      navigate("/DisplayBooksF1");
    }
  }, [params.id, navigate, url]);

  return (
    <div style={{ marginTop: 20, textAlign: "center" }}>
      <h3>Deleting Book...</h3>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default DeleteBook;