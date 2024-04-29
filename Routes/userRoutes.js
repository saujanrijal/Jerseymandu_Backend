const express = require("express");
const { signuphandler, loginhandler, getAllUsers } = require("../controllers/userController.js");
const protect = require("../Middleware/authMiddleware.js");
const router = express.Router();



router.post("/signup", signuphandler);
router.post("/login", loginhandler);



module.exports = router;