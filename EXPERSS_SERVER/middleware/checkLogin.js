const jwt = require("jsonwebtoken");
const users = require("../models/userModels");


async function checkLogin(req,res,next){

    try{

        let header = req.headers.authorization;

        if(!header){
            return res.status(401).send("No header provided");
        }


        let token = header.split(" ")[1];
       
        if(!token){
            return res.status(401).send("No token provided");
        }


        let {id} = jwt.verify(
            token,
            "thisisyourprivatekey"
        );


        let user = await users.findById(id);

        if(!user){
            return res.status(401).send("User not found");
        }


        req.user = user;
        next();

    }
    catch(error){

        console.log(error);

        res.status(401).send("Invalid Token");

    }

}


module.exports = checkLogin;