const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Import user routes
const userRoute = require("./Routes/userRoutes.js");
app.use("/api", userRoute);

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server Running on port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect", error);
  });
