
const Signupdata = require("../Models/userModels.js");
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
      }else{
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
  
      if (!email || !password) {
        res.status(400);
        throw new Error("Please fill in the required fields");
      }
  
      // Find user by email
      const user = await Signupdata.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid email" });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
  
      // Check if the user is admin
      if (user.isAdmin) {
        const { _id, email, password } = user;
        res.status(200).json({
          _id,
          email,
          password,
          isAdmin: true,
        });
      } else {
  
        const { _id, email, password } = user;
        res.status(200).json({
          _id,
          email,
          password,
          isAdmin: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  module.exports = {
    signuphandler,
    loginhandler,

  };

