const jwt = require("jsonwebtoken");
const cookieParser=require("cookie-parser");


const authMiddleware =  async (req,res,next)=>{
    const token = req.cookies.token;
    try {
        if(!token){
            return res.status(409).json({
                success:false,
                message:"Token is required"
            })
        }
        const decoded= await jwt.verify(token,process.env.CLIENT_SECRET_KEY);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unauthorised user !"
        })
    }
}

module.exports=authMiddleware;