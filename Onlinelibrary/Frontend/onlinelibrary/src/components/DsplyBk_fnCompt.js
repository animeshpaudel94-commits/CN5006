import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayData from './DisplayData';

function FncDisplayBooks() {
  const [Books, setBooks] = useState([]);
  const url = "http://localhost:5000/allbooks";

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setBooks(res.data);
      })
      .catch(err => {
        console.log("Error occurred:", err);
        alert("Error fetching books!");
      });
  }, []);

  return (
    <div>
      <h3>Book List</h3>
      <DisplayData Books={Books} />
    </div>
  );
}

export default FncDisplayBooks;