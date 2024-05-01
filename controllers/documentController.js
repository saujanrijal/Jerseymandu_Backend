const { CartAdd } = require("../Models/cartModel");
const { Product } = require("../Models/productModel");



const addtoCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        if (!userId || !productId) {
            res
                .status(400)
                .json({ message: "Please provide both userId and productId" });
            return;
        }

        // Find the user's cart
        let userCart = await CartAdd.findOne({ userId });

        if (userCart) {
            // Check if the product already exists in the cart
            const existingProductIndex = userCart.products.findIndex(
                (product) => product.productId === productId
            );

            if (existingProductIndex === -1) {
                // If the product doesn't exist in the user's cart, push it as a new item
                userCart.products.push({ productId, quantity: 1 });

                // Save the updated cart
                userCart = await userCart.save();

                // Send success response to the client
                res.status(200).json({
                    message: "Product added to cart successfully",
                    cart: userCart,
                });
            } else {
                // If the product already exists in the user's cart, send error response
                res.status(400).json({
                    error:
                        "Product already exists in the cart. Go to the shopping cart to increase the quantity.",
                });
            }
        } else {
            // If the user's cart doesn't exist, create a new one
            const data = await CartAdd.create({
                userId,
                products: [{ productId, quantity: 1 }],
            });

            // Send success response to the client
            res
                .status(201)
                .json({ message: "Cart created with product added", cart: data });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

};

const showaddtocart = async (req, res) => {
    // const userId = req.params.userId;
    // console.log("userid is",userId);
   
    try {
      const userId = req.params.userId;
      const cartData = await CartAdd.findOne({ userId });
      if (!cartData) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Extract product IDs from the cart
      const productIds = cartData.products.map((product) => product.productId);

      // Fetch product details from the Product collection based on the product IDs
      const products = await Product.find({ _id: { $in: productIds } });

      // Merge product details with quantities from the cart
      const cartItems = cartData.products.map((cartProduct) => {
        const productDetails = products.find((product) =>
          product._id.equals(cartProduct.productId)
        );
        return {
          _id: productDetails._id,
          name: productDetails.productName,
          description: productDetails.description,
          price: productDetails.price,
          image: productDetails.productImage,
          quantity: cartProduct.quantity,
        };
      });

      res.status(200).json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
    // res.status(200).json({ message: "Running" })
};

const updatecartQuantity = async (req, res) => {
    const { userId, cartData } = req.body;
    try {
      let userCart = await CartAdd.findOne({ userId });
      cartData.forEach((item) => {
        const product = userCart.products.find((p) => p.productId === item._id);
        if (product) {
          product.quantity = item.quantity;
        }
      });
      userCart = await userCart.save();
      res
        .status(200)
        .json({ message: "Cart data updated successfully", cartData: userCart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update cart data" });
    }
    // res.status(200).json({message:"running"})
  };



  const deleteCartData = async (req, res) => {

    const userId = req.params.userId;
    const productId = req.params.productId;
  
    // console.log("Received userId:", userId);
    // console.log("Received productId:", productId);
  
    try {
      // Find the user's cart data by userId
      let cart = await CartAdd.findOne({ userId });
  
      // If cart data doesn't exist, return an error
      if (!cart) {
        return res.status(404).json({ message: "Cart data not found" });
      }
  
      // Filter out the selected product from the cart data
      cart.products = cart.products.filter(
        (product) => product.productId !== productId
      );
  
      // Save the updated cart data
      await cart.save();
  
      // Return success response
      return res
        .status(200)
        .json({ message: "Product deleted from cart successfully" });
    } catch (error) {
      console.error(error);
      // Return error response
      return res.status(500).json({ message: "Internal server error" });
    }
    // res.status(200).json({message:"Running sucessfully"})
  };

module.exports = {
    addtoCart,
    showaddtocart,
    updatecartQuantity,
    deleteCartData,

}