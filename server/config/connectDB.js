const mongoose=require('mongoose');


const connectToDB=async (req,res)=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error during database connection",error);
    }
}

module.exports=connectToDB;