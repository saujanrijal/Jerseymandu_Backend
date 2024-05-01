const express = require("express");
const router = express.Router();
const {addtoCart, showaddtocart, updatecartQuantity, deleteCartData}=require("../controllers/documentController");


router.post("/",addtoCart);
router.get("/getcartdata/:userId",showaddtocart);
router.put("/updatecart",updatecartQuantity);
router.delete("/delete/:userId/:productId",deleteCartData);

module.exports=router;