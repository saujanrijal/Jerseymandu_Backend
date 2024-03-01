const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
app.use(cors());



const PORT = process.env.PORT || 8000;
mongoose
    .connect(process.env.URL)
    .then(() => {
        console.log("Database connected sucessfully");
        app.listen(PORT, () => {
            console.log(`Server Running on port: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Fail to connect", error);
    });