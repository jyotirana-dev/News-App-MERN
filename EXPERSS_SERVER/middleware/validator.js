const{body}=require("express-validator")
let validator=[
    body("name")
    .notEmpty().withMessage("user name should not be empty")
    .isLength({min:3,max:15}).withMessage("name length should be 3 to 15 char long"),
    
    body("email")
    .notEmpty().withMessage("email should not be empty")
    .isEmail().withMessage("email should be a valid email"),
    
    body("password")
    .notEmpty().withMessage("password should be not empty")
    .isLength({min:6})
    .withMessage("password should be minimum 6 characters")
    .isStrongPassword().withMessage("password should be strong password")
]
module.exports=validator;