const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB Atlas Connected to Server.");
  } catch (error) {
    console.error("MongoDB Connection Error.", error);
  }
};

connectDB();
