const nodemailer = require("nodemailer");

const sendEmail = async(email, resetLink)=>{

    let transporter = nodemailer.createTransport({

        service:"gmail",

        auth:{
            user:"yourgmail@gmail.com",
            pass:"your-app-password"
        }

    });


    await transporter.sendMail({

        from:"yourgmail@gmail.com",

        to:email,

        subject:"Password Reset",

        text:`Click here to reset password: ${resetLink}`

    });

};


module.exports = sendEmail;