const { imageUploadUtil } = require("../../config/cloudinary.js");
const Product = require("../../models/product.model.js");
const { findById, findByIdAndUpdate } = require("../../models/User.models");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salesPrice,
      totalStock,
      averageReview,
    } = req.body;

    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salesPrice,
      totalStock,
      averageReview,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const fetchAllProduct = async (req, res) => {
  try {
    const allProduct = await Product.find({});

    res.status(200).json({
      success: true,
      data: allProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salesPrice,
      totalStock,
      averageReview,
    } = req.body;

    console.log("Received ID: ", id);
    console.log("Request Body: ", req.body);

    // Find the product
    let findProduct = await Product.findById(id);
    if (!findProduct) {
      console.log("Product not found with ID: ", id);
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    console.log("Product Found: ", findProduct);

    // Update fields if data exists
    if (title !== undefined) findProduct.title = title;
    if (description !== undefined) findProduct.description = description;
    if (category !== undefined) findProduct.category = category;
    if (brand !== undefined) findProduct.brand = brand;
    if (price !== undefined && price !== "") findProduct.price = price;
    if (salesPrice !== undefined && salesPrice !== "") findProduct.salesPrice = salesPrice;
    if (totalStock !== undefined) findProduct.totalStock = totalStock;
    if (image !== undefined) findProduct.image = image;
    if (averageReview !== undefined) findProduct.averageReview = averageReview;

    console.log("Updated Product Before Save: ", findProduct);

    // Save the updated product
    try {
      await findProduct.save();
      console.log("Product updated successfully: ", findProduct);
      res.status(200).json({
        success: true,
        message: "Product edited successfully",
        data: findProduct,
      });
    } catch (saveError) {
      console.error("Error saving product: ", saveError);
      res.status(500).json({
        success: false,
        message: "Error saving product",
      });
    }
  } catch (error) {
    console.error("Error in editProduct: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// const editProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       image,
//       title,
//       description,
//       category,
//       brand,
//       price,
//       salesPrice,
//       totalStock,
//       averageReview,
//     } = req.body;

//     let findProduct = await Product.findById(id);
//     if (!findProduct)
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });

//     // findProduct.title = title || findProduct.title;
//     // findProduct.description = description || findProduct.description;
//     // findProduct.category = category || findProduct.category;
//     // findProduct.brand = brand || findProduct.brand;
//     // findProduct.price = price === "" ? 0 : price || findProduct.price;
//     // findProduct.salesPrice =
//     //   salesPrice === "" ? 0 : salesPrice || findProduct.salesPrice;
//     // findProduct.totalStock = totalStock || findProduct.totalStock;
//     // findProduct.image = image || findProduct.image;
//     // findProduct.averageReview = averageReview || findProduct.averageReview;

//     // Update fields if data exists
//     if (title !== undefined) findProduct.title = title;
//     if (description !== undefined) findProduct.description = description;
//     if (category !== undefined) findProduct.category = category;
//     if (brand !== undefined) findProduct.brand = brand;
//     if (price !== undefined && price !== "") findProduct.price = price;
//     if (salesPrice !== undefined && salesPrice !== "") findProduct.salesPrice = salesPrice;
//     if (totalStock !== undefined) findProduct.totalStock = totalStock;
//     if (image !== undefined) findProduct.image = image;
//     if (averageReview !== undefined) findProduct.averageReview = averageReview;

//     await findProduct.save();
//     res.status(200).json({
//       success: true,
//       message: "Product edited successfully",
//       data:findProduct
//     });
//     console.log("Edited data =====> ",findProduct)
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the product
    const deletedProduct = await Product.findByIdAndDelete(id);

    // Check if the product exists
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Respond with success if deleted
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProduct,
  editProduct,
  deleteProduct,
};
