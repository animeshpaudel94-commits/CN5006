const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  booktitle: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  Topic: {
    type: String,
    required: true,
  },
  formate: {
    type: String,
    required: true,
    enum: ["Hard Copy", "Electronic Copy"],
  },
  PubYear: {
    type: Number,
    required: true,
    min: 1980,
    max: 2023,
  },
});

module.exports = mongoose.model(
  "bookmodel",
  BookSchema,
  "BookCollection2"
);
