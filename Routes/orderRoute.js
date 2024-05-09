const express = require("express")
const {addOrder,getOrder, updateOrder}= require("../controllers/orderController");
const router = express.Router();

router.post("/",addOrder);
router.get("/getorder",getOrder);
router.patch("/:id",updateOrder);

module.exports=router;