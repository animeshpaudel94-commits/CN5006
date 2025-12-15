import React, { useState } from "react";
import axios from 'axios';

function Book_Form() {
 let url =
  "https://super-duper-space-broccoli-pj5pqj4r46g9f6j9w-5000.app.github.dev/";

  
  const [state, setState] = useState({
    booktitle: "",
    author: "",
    formate: "", // CHANGED: from 'format' to 'formate'
    Topic: "",
    PubYear: 1990,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
  const { name, value, type } = e.target;

  setState({
    ...state,
    [name]: type === "range" ? Number(value) : value,
  });
};


  const OnSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    // Validate required fields
    if (!state.formate) { // CHANGED: from 'format' to 'formate'
      setError("Please select a format (Hard Copy or Electronic Copy)");
      return;
    }
    
    if (!state.Topic) {
      setError("Please select a book topic");
      return;
    }
    
    const bookdata = {
      booktitle: state.booktitle,
      PubYear: state.PubYear,
      author: state.author,
      Topic: state.Topic,
      formate: state.formate // CHANGED: from 'format' to 'formate'
    };

    console.log("Submitting book data:", bookdata);

    axios.post(url + "addbooks", bookdata)
      .then(res => {
        console.log("Success response:", res.data);
        alert("Book added successfully!");
        // Reset form
        setState({
          booktitle: "",
          author: "",
          formate: "", // CHANGED: from 'format' to 'formate'
          Topic: "",
          PubYear: 1990,
        });
      })
      .catch(err => {
        console.error("Error response:", err.response?.data || err.message);
        const backendError = err.response?.data?.error || err.response?.data?.message;
        const errorMsg = backendError || "Error adding book! Please check all fields and try again.";
        setError(errorMsg);
      });
  };

  return (
    <div style={{ marginTop: 10 }}>
      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error adding book!</strong>
          <div>{error}</div>
        </div>
      )}
      
      <h3>Add Book</h3>
      <form onSubmit={OnSubmit}>
        
        <div className="form-group">
          <label>Book Title: </label>
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
          <label>Book Authors: </label>
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
          <label>Pick Book topic: </label>
          <select
            className="form-control"
            name="Topic"
            value={state.Topic}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Topic --</option>
            <option value="CS">CS</option>
            <option value="Programming">Programming</option>
            <option value="Data Science">Data Science</option>
            <option value="AI">AI</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>

        {/* CHANGED: All 'format' changed to 'formate' */}
        <div className="form-group">
          <label>Formate: </label> {/* Note: It's 'Formate' not 'Format' */}
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="formate" // CHANGED
                id="hardCopy"
                value="Hard Copy"
                checked={state.formate === "Hard Copy"} // CHANGED
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="hardCopy">
                Hard Copy
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="formate" // CHANGED
                id="electronicCopy"
                value="Electronic Copy"
                checked={state.formate === "Electronic Copy"} // CHANGED
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="electronicCopy">
                Electronic Copy
              </label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>
            Publication Year (between 1980 and 2023):
            <div className="d-flex align-items-center mt-2">
              <input
                type="range"
                name="PubYear"
                min="1980"
                max="2023"
                value={state.PubYear}
                onChange={handleChange}
                className="form-control-range flex-grow-1"
                style={{ marginRight: '10px' }}
              />
              <span className="badge badge-primary p-2" style={{ minWidth: '60px' }}>
                {state.PubYear}
              </span>
            </div>
          </label>
        </div>

        <div className="form-group">
          <center>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ padding: '10px 30px' }}
            >
              Add this book
            </button>
          </center>
        </div>
      </form>
    </div>
  );
}

export default Book_Form;