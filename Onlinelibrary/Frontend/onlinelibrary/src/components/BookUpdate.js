import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Book_UpdateForm() {
  const [state, setState] = useState({
    booktitle: "",
    author: "",
    formate: "",
    Topic: "",
    PubYear: 1990,
  });

  // ✅ FIXED backend URL
  const url =
    "https://super-duper-space-broccoli-pj5pqj4r46g9f6j9w-5000.app.github.dev/";

  const params = useParams();
  const navigate = useNavigate();

  // ✅ FIXED: get book
  useEffect(() => {
    axios
      .get(url + "getbook/" + params.id)
      .then((res) => {
        console.log("Update data received:", res.data);
        setState(res.data);
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
        alert("Error loading book data!");
      });
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setState({
      ...state,
      [name]: type === "range" ? Number(value) : value,
    });
  };

  const OnSubmit = (e) => {
    e.preventDefault();

    const bookdata = {
      booktitle: state.booktitle,
      PubYear: state.PubYear,
      author: state.author,
      Topic: state.Topic,
      formate: state.formate,
    };

    // ✅ FIXED route casing
    axios
      .post(url + "updatebook/" + params.id, bookdata)
      .then(() => {
        alert("Book updated successfully!");
        navigate("/DisplayBooksF1");
      })
      .catch((err) => {
        console.error("Error updating book:", err);
        alert("Error updating book!");
      });
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Update Book ID: {params.id}</h3>

      <form onSubmit={OnSubmit}>
        <div className="form-group">
          <label>Book Title:</label>
          <input
            className="form-control"
            type="text"
            name="booktitle"
            value={state.booktitle}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Book Authors:</label>
          <input
            className="form-control"
            type="text"
            name="author"
            value={state.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Pick Book topic:</label>
          <select
            className="form-control"
            name="Topic"
            value={state.Topic}
            onChange={handleChange}
            required
          >
            <option value="">Select Topic</option>
            <option value="CS">CS</option>
            <option value="Programming">Programming</option>
            <option value="Data Science">Data Science</option>
            <option value="AI">AI</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>

        <div className="form-group">
          <label>Formate:</label>
          <div>
            <input
              type="radio"
              name="formate"
              value="Hard Copy"
              checked={state.formate === "Hard Copy"}
              onChange={handleChange}
            />{" "}
            Hard Copy
            <input
              type="radio"
              name="formate"
              value="Electronic Copy"
              checked={state.formate === "Electronic Copy"}
              onChange={handleChange}
              style={{ marginLeft: "10px" }}
            />{" "}
            Electronic Copy
          </div>
        </div>

        <div className="form-group">
          <label>
            Publication Year:
            <input
              type="range"
              name="PubYear"
              min="1980"
              max="2025"
              value={state.PubYear}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
            <span> {state.PubYear}</span>
          </label>
        </div>

        <center>
          <button type="submit" className="btn btn-primary">
            Update Book
          </button>
        </center>
      </form>
    </div>
  );
}

export default Book_UpdateForm;
