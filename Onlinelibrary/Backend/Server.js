// this code runs with mongoose v7 plus
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Books = require("./Schema.js");
const connectDB = require("./Connect");

console.log("Server2k25");

const app = express();

// ✅ middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ FIX 1: CORS (recommended for Codespaces)
app.use(
  cors({
    origin: [
      "https://super-duper-space-broccoli-pj5pqj4r46g9f6j9w-3000.app.github.dev",
      "https://super-duper-space-broccoli-pj5pqj4r46g9f6j9w.github.dev"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);


console.log("BOOKS", Books);

// ✅ routes
app.get("/", (req, res) => {
  console.log("this is default");
  res.send("This is default");
});

app.get("/about", async (req, res) => {
  res.send(
    "mongodb express React and mongoose app, React runs in another application"
  );

  try {
    const count = await Books.countDocuments();
    console.log("Total documents Count before addition :", count);
  } catch (err) {
    console.error(err);
  }
});

app.get("/allbooksold", (req, res) => {
  Books.find((err, allbook) => {
    if (err) {
      console.log(err);
    } else {
      res.json(allbook);
    }
  });
});

app.get("/allbooks", async (req, res) => {
  const d = await Books.find();
  return res.json(d);
});

app.get("/getbookold/:id", (req, res) => {
  const id = req.params.id;
  Books.findById(id, (err, book) => {
    if (err) return res.status(500).json(err);
    res.json(book);
  });
});

// ✅ FIX 2: added `const book`
app.get("/getbook/:id", async (req, res) => {
  const id = req.params.id;
  const book = await Books.findById(id);

  if (book) {
    console.log("found book", book);
    res.json(book);
  } else {
    res.status(404).json({ error: "No book found" });
  }
});

app.post("/addbooks", async (req, res) => {
  try {
    console.log("📥 Incoming data:", req.body);

    const newbook = new Books(req.body);
    await newbook.save();

    console.log("✅ Book saved successfully");
    res.status(200).json({ message: "book added successfully" });

  } catch (err) {
    console.error("❌ MONGOOSE SAVE ERROR:", err);
    res.status(400).json({ error: err.message });
  }
});

// Update book
app.post("/updatebook/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const update = {
      booktitle: req.body.booktitle,
      PubYear: req.body.PubYear,
      author: req.body.author,
      Topic: req.body.Topic,
      formate: req.body.formate,
    };

    const updatedBook = await Books.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to update book",
      details: err.message,
    });
  }
});

// Delete book
app.post("/deleteBook/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBook = await Books.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).send("Book Deleted");
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete book",
      details: err.message,
    });
  }
});

// ✅ FIX 3: connect DB BEFORE starting server
(async () => {
  await connectDB();
  app.listen(5000, () =>
    console.log("✅ Server running on the port 5000")
  );
})();
