
const express = require("express");
const router = express.Router();
const { createProduct, getallProduct,getInternationaljersey,getClubjersey,getLocaljersey, getProductDetail, searchProduct, getuser } = require("../controllers/productController");
const upload = require("../utils/imageUpload");

router.post("/createproduct", upload.single('productImage'), createProduct);
router.get("/getproduct",getallProduct)
router.get("/Internationaljersey",getInternationaljersey);
router.get("/Clubjersey",getClubjersey);
router.get("/Localjersey",getLocaljersey);
router.get("/:id",getProductDetail)
router.get("/search",searchProduct)
router.get("/user",getuser)


module.exports = router;
