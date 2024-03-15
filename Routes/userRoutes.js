const express = require("express");
const { signuphandler, loginhandler } = require("../controllers/userController.js");
// const protect = require("../middleware/authMiddleware");
const router = express.Router();



router.post("/signup",signuphandler);
router.post("/login",loginhandler);



module.exports =router;