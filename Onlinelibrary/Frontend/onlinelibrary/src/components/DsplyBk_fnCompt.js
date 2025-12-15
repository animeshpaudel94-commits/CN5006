import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayData from "./DisplayData";

function FncDisplayBooks() {
  const [Books, setBooks] = useState([]);

  // ✅ FIXED: Codespaces backend URL
  const url =
    "https://super-duper-space-broccoli-pj5pqj4r46g9f6j9w-5000.app.github.dev/allbooks";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error occurred:", err);
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
