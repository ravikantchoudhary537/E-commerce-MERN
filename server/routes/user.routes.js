const express=require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get('/checkauth',authMiddleware,(req,res)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        message:"Authenticated user",
        user
    })
})

module.exports=router;