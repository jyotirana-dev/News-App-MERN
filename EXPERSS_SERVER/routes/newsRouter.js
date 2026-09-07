const express = require("express");

const checkLogin = require("../middleware/checkLogin");
const checkAdmin = require("../middleware/checkAdmin");
const upload = require("../middleware/multer");

const { getAllNews, addNews, updateNews, deleteNews, getMyNews,getSingleNews,likeNews}=require("../controllers/newsControllers");
const Router=express.Router();

Router.get("/",getAllNews);

Router.get("/mynews",checkLogin,checkAdmin,getMyNews);

Router.get("/:id",getSingleNews);

// Router.post(
// "/add",
// checkLogin,
// checkAdmin,
// upload.single("image"),
// addNews
// );

Router.post("/add",checkLogin,checkAdmin,upload.fields(
   [{
        name:"image",
        maxCount:1
    },
    {
        name:"video",
        maxCount:1
    }
]),
addNews
);

Router.put("/update",checkLogin,checkAdmin,updateNews);

Router.delete("/delete",checkLogin,checkAdmin,deleteNews);

Router.put("/like/:id",checkLogin,likeNews);


module.exports=Router;