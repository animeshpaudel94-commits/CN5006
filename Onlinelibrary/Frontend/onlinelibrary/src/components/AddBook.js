import React, { useState } from "react";
import axios from 'axios';

function Book_Form() {
  let url = "http://localhost:5000/";
  
  const [state, setState] = useState({
    booktitle: "",
    author: "",
    formate: "",
    Topic: "",
    PubYear: 1990,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const OnSubmit = (e) => {
    e.preventDefault();
    const bookdata = {
      booktitle: state.booktitle,
      PubYear: state.PubYear,
      author: state.author,
      Topic: state.Topic,
      formate: state.formate
    };

    axios.post(url + "addbooks", bookdata)
      .then(res => {
        console.log(res.data);
        alert("Book added successfully!");
        // Reset form
        setState({
          booktitle: "",
          author: "",
          formate: "",
          Topic: "",
          PubYear: 1990,
        });
      })
      .catch(err => {
        console.log(err);
        alert("Error adding book!");
      });
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Add Book</h3>
      <form onSubmit={OnSubmit} method="Post">
        
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
            <option value="">Select Topic</option>
            <option value="Computer Science">CS</option>
            <option value="Programming">Programming</option>
            <option value="Data Science">Data Science</option>
            <option value="AI">AI</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>

        <div className="form-group">
          <label>Formate: </label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="formate"
              value="Hard Copy"
              checked={state.formate === "Hard Copy"}
              onChange={handleChange}
              required
            />
            <label className="form-check-label"> Hard Copy </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="formate"
              value="Electronic Copy"
              checked={state.formate === "Electronic Copy"}
              onChange={handleChange}
            />
            <label className="form-check-label"> Electronic Copy</label>
          </div>
        </div>

        <div className="form-group">
          <label>
            Publication Year (between 1980 and 2025):
            <input
              type="range"
              name="PubYear"
              min="1980"
              max="2025"
              value={state.PubYear}
              onChange={handleChange}
              className="form-control-range"
              style={{ width: "100%" }}
            />
            <span> {state.PubYear}</span>
          </label>
        </div>

        <div className="form-group">
          <center>
            <input
              type="submit"
              value="Add this book"
              className="btn btn-primary"
            />
          </center>
        </div>
      </form>
    </div>
  );
}

export default Book_Form;