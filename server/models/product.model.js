const mongoose =require("mongoose");

const productSchema= new mongoose.Schema({
    image:String,
    title:String,
    description:String,
    category:String,
    brand:String,
    price:Number,
    salesPrice:Number,
    totalStock:Number,
    averageReview:Number
},{
    timestamps:true
})

module.exports=mongoose.model("Product",productSchema);