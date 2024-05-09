const { Order } = require("../Models/orderModel");

const addOrder = async (req, res) => {
    const {
      customer,
      shippingAddress,
      totalPrice,
      paymentMethod,
      status,
      products,
    } = req.body;
  
    try {
      // Check for required fields in shippingAddress
      const { name, email, address, city, state, phone } = shippingAddress;
      if (!name || !email || !address || !city || !state || !phone) {
        return res.status(400).json({
          message: "Please fill all the required fields in shippingAddress",
        });
      }
  
      // Create the order
      const order = await Order.create({
        customer,
        shippingAddress,
        totalPrice,
        paymentMethod,
        status,
        products,
      });
  
      // Send success response
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      // Send error response
      res.status(500).json({ error: error.message });
    }
  };
  
  const getOrder = async (req, res) => {
    try {
      const order = await Order.find().sort({ createdAt: -1 });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateOrder = async (req, res) => {
    const productId = req.params.id;
    const { status } = req.body;
    console.log(productId, status);
    try {
      const order = await Order.findById(productId);
      order.status = status;
      await order.save();
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update order" });
    }
    // res.status(200).json({ message: "I am working" });
  };
  module.exports = {
    addOrder,
    getOrder,
    updateOrder,
  };