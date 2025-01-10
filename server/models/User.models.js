const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        default:'user'
    },
})

const User = mongoose.model("User",userSchema);
module.exports=User;