const express = require("express");
const { signuphandler, loginhandler, getallUser } = require("../controllers/userController.js");
const protect = require("../Middleware/authMiddleware.js");
const router = express.Router();



router.post("/signup", signuphandler);
router.post("/login", loginhandler);
router.get("/alluser",getallUser)


module.exports = router;