const mongoose=require("mongoose")
let userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
    type:String,
    required:true,
    minlength:6,
},

resetPasswordToken:{
    type:String
},

resetPasswordExpire:{
    type:Date
},

role:{
    type:String,
    default:"user",
},
    
    age:{
        type:Number,

    }

})
let users=mongoose.model("User",userSchema)
module.exports=users;