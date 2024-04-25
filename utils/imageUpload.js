// const multer = require("multer");
// const path = require("path");

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "productimg"); // Ensure "productimg" directory exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// module.exports = upload;
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'productimg/'); // specify upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // maintain original file name
  }
});
const upload = multer({ storage: storage });
module.exports = upload;
