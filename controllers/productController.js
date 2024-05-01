const { Product } = require("../Models/productModel")
const cloudinary = require("../utils/cloudinary");
const {Signupdata}=require("../Models/userModels")
// const createProduct = async (req, res) => {
//     try {
//         const { productName, jerseyType, description, size, stock, price, productImage } = req.body;
//         if (!productName || !jerseyType || !description || !size || !stock || !price) {
//             return res.status(400).json({ message: "Please fill all the required fields" });
//         }

//         const product = await Product.create({
//             productName,
//             jerseyType,
//             description,
//             size,
//             stock,
//             price,
//             productImage,
//         });
//         return res.status(201).json({ message: "Product created successfully", product });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: error.message });
//     }
// };
const createProduct = async (req, res) => {
    try {
        const { productName, jerseyType, description, size, stock, price } = req.body;
        if (!productName || !jerseyType || !description || !size || !stock || !price) {
            return res.status(400).json({ message: "Please fill all the required fields" });
        }

        // const productImage = req.file; // get the uploaded file from multer
        // const filePath = `/productimg/${productImage.originalname}`; // store the file path in the database
        if (!req.file) {
            res.status(400);
            throw new Error("Image upload failed");
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "FYP project",
            resource_type: "image",
        });

        const product = await Product.create({
            productName,
            jerseyType,
            description,
            size,
            stock,
            price,
            productImage: result.secure_url, // store the file path in the database
        });
        return res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

const getallProduct = async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json({ product });
    } catch (error) {
        console.log(error);
    }
}

const getInternationaljersey = async (req, res) => {
    try {
        const product = await Product.find({ jerseyType: "International" })
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
}
const getLocaljersey = async (req, res) => {
    try {
        const product = await Product.find({ jerseyType: "Local" })
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
}

const getProductDetail = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    res.status(200).json(product);
}
const getClubjersey = async (req, res) => {
    try {
        const product = await Product.find({ jerseyType: "Club" })
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
}

const searchProduct = async (req, res) => {
    try {
        const { searchData } = req.searchData;
        const regex = new RegExp(searchData, "i"); //Case-insensitative

        const products = await Product.find({ name: regex });
        res.json(products);
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getuser=async(req,res)=>{
    try {
        const users= await Signupdata.find({});
        res.status(200).json({users})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
        
    }
    
}

const updateProduct = async (req, res) => {
    const productId = req.params.id;
  console.log(req.file);

    const { jerseyType, productName, description, size, stock, price } =
      req.body;
    try {
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      // Update the product fields
      product.productName = productName;
      product.jerseyType = jerseyType;
      product.description = description;
      product.size = size;
      product.price = price;
      product.stock = stock;
    
  
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        product.productImage = result.secure_url;
      }
      await product.save();
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update product" });
    }
  };

  //Delete a product
const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        res.status(401).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Sucessfully Deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = {
    createProduct,
    getallProduct,
    getInternationaljersey,
    getClubjersey,
    getLocaljersey,
    getProductDetail,
    searchProduct,
    getuser,
    updateProduct,
    deleteProduct,
}