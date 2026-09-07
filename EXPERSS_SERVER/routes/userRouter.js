const express = require("express");

const Router = express.Router();

const validator = require("../middleware/validator");
const verifyToken = require("../middleware/checkLogin");

const {
    getAllUsers,registerUser,loginUser,resetPassword,forgotPassword,updateUser,deleteUser 
} =require("../controllers/userControllers");

Router.get("/",getAllUsers);

Router.post("/register",validator,registerUser);

Router.post("/login",loginUser);

Router.post("/forgot-password", forgotPassword);

Router.post("/reset-password/:token", resetPassword);

Router.put("/update",updateUser);

Router.delete("/delete",deleteUser);

Router.get("/verify", verifyToken, (req,res)=>{res.send(req.user);});

module.exports=Router;