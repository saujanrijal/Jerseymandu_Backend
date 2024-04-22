const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please add product name"],
    trim: true,
  },
  jerseyType: {
    type: String,
    enum: ['International', 'Club', 'Local'], // Define allowed categories
    required: [true, "Please enter jersey type."],
    trim: true,
  },
  stock: {
    type: String,
    required: true,
},
 
  price: {
    type: String,
    required: [true, "Please add a price"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    trim: true,
  },
  size: 
    {
      type: String,
      trim: true,
    }
  ,
  productImage: String
},
{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = {Product};