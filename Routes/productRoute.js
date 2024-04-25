// const express = require("express");
// const { createProduct } = require("../controllers/productController")
// const router = express.Router();
// const upload = require("../utils/imageUpload")

// router.post("/createproduct",upload.single("productImage"), createProduct);

// module.exports = router;
const express = require("express");
const router = express.Router();
const { createProduct, getallProduct } = require("../controllers/productController");
const upload = require("../utils/imageUpload");

// router.post("/createproduct",createProduct); // Ensure "file" matches the field name in the frontend
router.post("/createproduct", upload.single('productImage'), createProduct);
router.get("/getproduct",getallProduct)

module.exports = router;
