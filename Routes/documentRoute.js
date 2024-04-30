const express = require("express");
const router = express.Router();
const {addtoCart, showaddtocart}=require("../controllers/documentController");


router.post("/",addtoCart);
router.get("/getcartdata/:userId",showaddtocart);

module.exports=router;