import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DeleteBook() {
  const params = useParams();
  const navigate = useNavigate();

  // ✅ FIXED: backend URL (Codespaces)
  const url =
    "https://super-duper-space-broccoli-pj5pqj4r46g9f6j9w-5000.app.github.dev/";

  useEffect(() => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (confirmDelete) {
      // ✅ FIXED: POST + correct route casing
      axios
        .post(url + "deleteBook/" + params.id)
        .then((res) => {
          console.log(res.data);
          alert("Book deleted successfully!");
          navigate("/DisplayBooksF1");
        })
        .catch((err) => {
          console.error("Delete error:", err);
          alert("Error deleting book!");
          navigate("/DisplayBooksF1");
        });
    } else {
      navigate("/DisplayBooksF1");
    }
  }, [params.id, navigate]);

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
