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
module.exports = {
    addtoCart,
    showaddtocart,
}