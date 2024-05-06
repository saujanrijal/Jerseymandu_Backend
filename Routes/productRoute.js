
const express = require("express");
const router = express.Router();
const { createProduct, getallProduct, getInternationaljersey, getClubjersey, getLocaljersey, getProductDetail, searchProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const upload = require("../utils/imageUpload");

router.post("/createproduct", upload.single('productImage'), createProduct);
router.get("/getproduct", getallProduct)
router.get("/Internationaljersey", getInternationaljersey);
router.get("/Clubjersey", getClubjersey);
router.get("/Localjersey", getLocaljersey);
router.get("/:id", getProductDetail)
router.get("/search", searchProduct)
router.delete("/:id", deleteProduct)
// router.patch("/:id", upload.single("file"), updateProduct);
router.patch("/:id", upload.single("productImage"), updateProduct);

 
module.exports = router;
