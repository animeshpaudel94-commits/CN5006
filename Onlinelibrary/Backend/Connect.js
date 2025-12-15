const mongoose = require("mongoose");

console.log(`Mongoose installed version: ${mongoose.version}`);

const MONGO_URI =
  "mongodb+srv://admin:admin1@cluster0.ujiblay.mongodb.net/library";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected successfully");
    console.log(`Current Mongoose version: ${mongoose.version}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Optional: connection events
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err);
});

module.exports = connectDB;
