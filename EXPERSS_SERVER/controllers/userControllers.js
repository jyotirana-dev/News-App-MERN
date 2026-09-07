const users = require("../models/userModels");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// Get All Users

const getAllUsers = async(req,res)=>{

    try{

        let data = await users.find();

        res.send(data);

    }
    catch(error){

        res.status(500).send("Server error");

    }};

// Verify Token

const verifyToken = async(req,res)=>{

    try{

        let header = req.headers.authorization;
        if(!header){
             return res.status(401)
            .send("No header provided");
        }

        let token = header.split(" ")[1];
        if(!token){

            return res.status(401)
            .send("No token provided");
        }

        let {id} = jwt.verify(
            token,
            "thisisyourprivatekey"
        );

        let user = await users.findById(id)
        .select("-password");

        if(!user){

            return res.status(404)
            .send("User not found");

        }
        res.send(user);
    }
    catch(error){

        res.status(401)
        .send("Invalid token");

    }};


// Register User

const registerUser = async(req,res)=>{

    try{


        let result = validationResult(req);
        let errors = result.errors;
        if(errors.length){

            let err = errors.map((ele)=>ele.msg);
            return res.status(400)
            .send(err[0]);
        }

let data = req.body;
let existingUser = await users.findOne({

            email:data.email

        });

if(existingUser){

            return res.status(400)
            .send("You are already registered");

        }
    
 let hashPassword = bcrypt.hashSync(

            data.password,

            10

        );

        let newUser = await users.create({

            ...data,

            password:hashPassword

        });

res.status(201)
        .send({

            message:"Register successful",
            user:newUser

        });
}

    catch(error){

        res.status(500)
        .send("Server error");

    }};

    //forget password
    
    const forgotPassword = async (req, res) => {

    try {

        let { email } = req.body;

        let user = await users.findOne({ email });

        if (!user) {
            return res.status(404).send("User not found");
        }

        let token = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = token;

        user.resetPasswordExpire =
            Date.now() + 10 * 60 * 1000;

        await user.save();

        let resetLink =
            `http://localhost:5173/reset-password/${token}`;

        res.send({
            message: "Reset link generated",
            resetLink: resetLink
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).send("Server error");
    }
};

    //reset password
const resetPassword = async(req,res)=>{

    try{

        let {token}=req.params;
        let {password}=req.body;
        let user = await users.findOne({

            resetPasswordToken:token,
            resetPasswordExpire:{
                $gt:Date.now()
            }

        });

        if(!user){

            return res.status(400)
            .send("Token expired or invalid");

        }

        user.password = bcrypt.hashSync(
            password,
            10
        );


        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();


        res.send({
            message:"Password updated successfully"
        });
    }
    catch(error){

        res.status(500)
        .send("Server error");

    }};

// Login User

const loginUser = async(req,res)=>{


    try{


        let {email,password}=req.body;
        let existingUser = await users.findOne({

            email:email

        });

        if(!existingUser){

            return res.status(404)
            .send({

                message:"User not found"

            });

        }

        let checkPassword = bcrypt.compareSync(

            password,

            existingUser.password

        );

        if(!checkPassword){

            return res.status(401)
            .send({

                message:"Wrong password"

            });

        }

        let token = jwt.sign(

            {

                id:existingUser._id

            },


            "thisisyourprivatekey",


            {

                expiresIn:"1h"

            });

        res.status(200)
        .send({


            message:"Login successful",
            token:token,
            user:{


                _id:existingUser._id,

                name:existingUser.name,

                email:existingUser.email,

                age:existingUser.age,

                role:existingUser.role
            }

        });
    }

catch(error){


        console.log(error);


        res.status(500)
        .send({

            message:"Server error"

        });

    }};


// Update User

const updateUser = async(req,res)=>{


    try{


        let id=req.params.id;
        let data=req.body;
        let updatedUser = await users.findByIdAndUpdate(

            id,

            data,

            {

                new:true

            });

        if(!updatedUser){

            return res.status(404)
            .send("User not found");

        }

 res.send(updatedUser);

 }


    catch(error){

        res.status(500)
        .send("Server error");

    }};


// Delete User

const deleteUser = async(req,res)=>{


    try{


        let id=req.params.id;
        let deletedUser = await users.findByIdAndDelete(id);
        if(!deletedUser){


            return res.status(404)
            .send("User not found");

}

        res.send({

            message:"User deleted",
            user:deletedUser
        });
    }


    catch(error){


        res.status(500)
        .send("Server error");


    }};


module.exports={

getAllUsers,
registerUser,
loginUser,
updateUser,
deleteUser,
verifyToken,
forgotPassword,
resetPassword

};