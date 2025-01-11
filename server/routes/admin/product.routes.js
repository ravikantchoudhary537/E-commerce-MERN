const express=require("express");
const { upload } = require("../../config/cloudinary.js");
const { handleImageUpload, addProduct, fetchAllProduct, editProduct, deleteProduct } = require("../../controllers/admin/product.controller.js");

const router=express.Router();


router.post("/uploadimage",upload.single("my_file"),handleImageUpload);
router.post("/addproduct",addProduct);
router.get("/getproduct",fetchAllProduct);
router.put("/editproduct/:id",editProduct);
router.delete("/deleteproduct/:id",deleteProduct);

module.exports=router;