// //console.log("hello world")
// //DOM ,alert,confirm,prompt,document
// //modules
// //custom module
// //inbiult module
// //third party module

// // const fs=require("fs");
// // let home =fs.readFileSync("./home.html","utf-8")
// // let contact =fs.readFileSync("./contact.html","utf-8")
// // let homecss =fs.readFileSync("./home.css","utf-8")


// // const http = require("http");
// // const server = http.createServer();
// // server.on("request",(req,res)=>{
// // if (req.url=='/'){
// //     res.write(home)
// //     res.end();
// // }else if(req.url=='/contact'){
// //     res.end(contact)

// // } else if(req.url=='/home.css'){
// //     res.end(homecss)
// // }
// // })


// // server.listen(5000,()=>console.log("server is listening"));



// // const http =require("http");
// // const server=http.createServer();
// // 
// // }
// // }
// // )

// //you can check network also like
// //else if(req.url=='/contact'&& req.method=="GET"){
// //res.end(contact)
// //methods
// //POST
// //GET
// //DELETE

// // const express=require("express");
// // const server=express();
// // server.get("/",(req,res)=>{
// //     res.send('server is up')
// // })
// // server.get("/user",(req,res)=>{
// //     res.send('all are user')
// // })
// // server.post("/user/register",(req,res)=>{
// //     res.send('user register')
// // })
// // server.put("/user/update",(req,res)=>{
// //     res.send('user updated')
// // })
// // server.delete("/user/delete",(req,res)=>{
// //     res.send('user deleted')
// // })


// const express =require("express");
// const userRouter=require("./routes/userRouter");
// const productRouter = require("./routes/productRouter");
// const mongoose = require("mongoose");
// const cors=require("cors");
// const server=express();

// server.use(express.json());

// // function firstMiddleware(req,res,next){
// //     console.log("ypou are in first middleware")
// //     next();
// // }
// // function secondMiddleware(req,res,next){
// //     console.log("ypou are in second middleware")
// //     next();
// // }

// server.use("/user",userRouter);
// server.use("/product",productRouter)

// server.get("/",(req,res)=>{
//     res.send("server is up");
// })

// mongoose.connect("mongodb://localhost:27017/mydb").then(()=>console.log("connected to db"))

// server.listen(8000,()=>console.log("server is listening on port 8000"))



const express = require("express");
const userRouter = require("./routes/userRouter");
const newsRouter = require("./routes/newsRouter");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const server = express();

// Middleware
server.use(cors());
server.use(express.json());

// Images folder in public 
server.use("/newsImages", express.static("newsImages"));

// video folder in public
server.use("/newsVideos", express.static("newsVideos"));

// Routes
server.use("/user", userRouter);
server.use("/news", newsRouter);


// Home API
server.get("/", (req, res) => {
    res.send("server is up");
});


// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to db");
})
.catch((error)=>{
    console.log("MongoDB Error:", error);

});


// Server Start
const PORT = process.env.PORT || 8000;
server.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
});