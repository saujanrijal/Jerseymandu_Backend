const { Product } = require("../Models/productModel")
const createProduct = async (req, res) => {
    try {
        const { productName, jerseyType, description, size, stock, price, productImage } = req.body;
        if (!productName || !jerseyType || !description || !size || !stock || !price) {
            return res.status(400).json({ message: "Please fill all the required fields" });
        }
     

        const product = await Product.create({
            productName,
            jerseyType,
            description,
            size,
            stock,
            price,
            productImage,
        });
        return res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

const getallProduct=async(req,res)=>{
// res.status(200).json({message:"running"})
try {
    const product = await Product.find({});
    res.status(200).json({product});
} catch (error) {
    console.log(error);
}
}
module.exports = {
    createProduct,
    getallProduct,
}