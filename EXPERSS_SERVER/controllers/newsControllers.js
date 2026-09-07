const News = require("../models/newsModels");
const cloudinary = require("../config/cloudinary");
// Get All News
const getAllNews = async(req,res)=>{

    let newsdata = await News.find();

    res.send(newsdata);

};
const getMyNews= async(req,res)=>{
    let data=await News.find({userId:req.user._id});
    res.send(data);
}

const getSingleNews = async(req,res)=>{

    try{

        let id = req.params.id;

        let news = await News.findById(id);

        if(!news){
            return res.status(404).send("News not found");
        }

        res.send(news);

    }
    catch(error){

        res.status(500).send(error.message);

    }

};

// Add News
const addNews = async(req,res)=>{

    try{

        let data = req.body;

        console.log("BODY:", data);
        console.log("FILES:", req.files);


        let image = "";
        let video = "";


        if(req.files && req.files.image){

            let result = await cloudinary.uploader.upload(
                req.files.image[0].path,
                {
                    folder:"newsImages"
                }
            );

            image = result.secure_url;

        }


        if(req.files && req.files.video){

            let result = await cloudinary.uploader.upload(
                req.files.video[0].path,
                {
                    resource_type:"video",
                    folder:"newsVideos"
                }
            );

            video = result.secure_url;

        }


        let news = await News.create({

            ...data,

            image:image,

            video:video,

            userId:req.user._id

        });


        res.send(news);


    }
    catch(error){

        console.log(error);

        res.status(500).send(error.message);

    }

};

// Update News
const updateNews = async(req,res)=>{

    let id = req.query.id;

    let data = req.body;

 let updatedNews = await News.findByIdAndUpdate(
        id,
        data,
        {
            new:true
        }
    );

    res.send(updatedNews);

};

// Delete News
const deleteNews = async(req,res)=>{

let id = req.query.id;

    let deletedNews = await News.findByIdAndDelete(id);

    if(!deletedNews){

        return res.send("No news found to delete");

    }

    res.send("News deleted");

};

const likeNews = async(req,res)=>{

try{

const news = await News.findById(req.params.id);


if(!news){

return res.status(404).send({
message:"News not found"
});

}


// login user ki id
const userId = req.user.id;



// agar user already like kar chuka hai
if(news.likes.includes(userId)){


news.likes = news.likes.filter(
(id)=> id.toString() !== userId
);


}

else{


news.likes.push(userId);


}


await news.save();



res.status(200).send({

message:"Like updated",

likes:news.likes.length

});


}
catch(error){

res.status(500).send({

message:error.message

});

}


}

module.exports={
    getAllNews,
    addNews,
    updateNews,
    deleteNews,
    getMyNews,
    getSingleNews,
    likeNews
};