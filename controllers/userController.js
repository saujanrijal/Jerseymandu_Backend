const Signupdata = require("../Models/userModels.js");

const User = require('../Models/userModels.js');
const jwt = require('jsonwebtoken');
const protect = require('../Middleware/authMiddleware.js');


const bcrypt = require("bcryptjs");
const signuphandler = async (req, res) => {

  try {
    console.log("Request Body:", req.body); // Add this line to log the request body
    const { name, email, password } = req.body;
    //validation
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill in the required fields");
    }

    //password validation
    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be up to 6 characters");
    }

    //check if user email already exists
    const userExists = await Signupdata.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("Email has already been used");
    }

    //Encrypt the password

    const userAdded = await Signupdata.create({
      name: name,
      email: email,
      password,
    });
    if (userAdded) {
      const { _id, name, email, password } = userAdded;
      res.status(201).json({
        _id,
        name,
        email,
        password,
      });
    } else {
      res.status(400);
      throw new Error("Error in creating a user");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//Login Handler

const loginhandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email, password)) {
      return res.status(400).json({ message: "Fill up the detail" });
    }
    const user = await Signupdata.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "No user found" });
    }
    const Validpassword = await bcrypt.compare(password, user.password);
    if (!Validpassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //Check if the user is admin
    if (user.isAdmin) {
      const token = jwt.sign({ user, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "10s",
      });
      res
        .status(200)
        .json({
          message: "Login sucessful for admin",
          data: { user, token, role: "admin" },
        });
    } else {
      const token = jwt.sign(
        { userId: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "10s" }
      );
      res
        .status(200)
        .json({ message: "Login sucessful", data: { user, token } });
    }
  } catch (error) {
    console.log(error);
  }
};

// //Get all user details
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     if (!users || users.length === 0) {
//       return res.status(404).json({ message: " No Users Found" });
//     }
//     return res.status(200).json(users)
//   } catch (error) {
//     console.log(error)

//   }

// };
// ... (other imports and functions)

// Get user details



module.exports = {
  signuphandler,
  loginhandler,

};

