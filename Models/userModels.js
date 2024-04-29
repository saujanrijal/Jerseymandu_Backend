const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const { getAllUsers } = require("../controllers/userController");
// const User = require("../Models/userModels.js");



//Create Schema
const signupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please enter a email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    isAdmin: {
      type: Boolean,
      default: false, // Default value for regular users
    },
  },
  { timestamps: true }
);

//Encrypt the password before storing it to db
signupSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    //Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});



//Userschema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter an email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    isAdmin: {
      type: Boolean,
      default: false, // Default value for regular users
    },
  },
  { timestamps: true }
);

// Encrypt the password before storing it to db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});


//Create Model
const Signupdata = mongoose.model("UserData", signupSchema);


const User = new mongoose.model("User", userSchema);





module.exports = Signupdata;
module.exports = User;