const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser")
const path = require("path")

// Enable CORS
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));

// Serve static files (images)
app.use("/images", express.static(path.join(__dirname, "productimg")));



// Import user routes
const userRoute = require("./Routes/userRoutes.js");
const productRoute = require("./Routes/productRoute.js");
app.use("/api", userRoute);
app.use("/product", productRoute)




// Route to serve image data
app.get("/images/:filename", (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, "productimg", filename);

  // Read the image file and send it as a response
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(404).send("Image not found");
    } else {
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(data);
    }
  });
});



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
