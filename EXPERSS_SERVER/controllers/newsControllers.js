const News = require("../models/newsModels");
const cloudinary = require("../config/cloudinary");


// ================= GET ALL NEWS =================

const getAllNews = async(req,res)=>{

try{

let newsdata = await News.find();

res.send(newsdata);

}

catch(error){

res.status(500).send({

message:error.message

});

}

};




// ================= GET MY NEWS =================

const getMyNews = async(req,res)=>{

try{

let data = await News.find({
    userId:req.user._id
});

res.send(data);

}

catch(error){

res.status(500).send({

message:error.message

});

}

};




// ================= GET SINGLE NEWS =================

const getSingleNews = async(req,res)=>{


try{


let news = await News.findById(req.params.id);



if(!news){

return res.status(404).send({

message:"News not found"

});

}


res.send(news);



}

catch(error){

res.status(500).send({

message:error.message

});

}


};





// ================= ADD NEWS =================


const addNews = async(req,res)=>{


try{


let image="";
let video="";



if(req.files && req.files.image){


let result = await cloudinary.uploader.upload(

req.files.image[0].path,

{

folder:"newsImages"

}

);


image=result.secure_url;


}




if(req.files && req.files.video){


let result = await cloudinary.uploader.upload(

req.files.video[0].path,

{

resource_type:"video",

folder:"newsVideos"

}

);


video=result.secure_url;


}





let news = await News.create({

...req.body,

image:image,

video:video,

userId:req.user._id


});



res.send(news);



}

catch(error){


console.log(error);


res.status(500).send({

message:error.message

});


}


};






// ================= UPDATE NEWS =================


const updateNews = async(req,res)=>{


try{


let updatedNews = await News.findByIdAndUpdate(

req.query.id,

req.body,

{

new:true

}

);



res.send(updatedNews);


}

catch(error){

res.status(500).send({

message:error.message

});

}


};







// ================= DELETE NEWS =================


const deleteNews = async(req,res)=>{


try{


let deletedNews = await News.findByIdAndDelete(

req.query.id

);



if(!deletedNews){

return res.send({

message:"News not found"

});

}



res.send({

message:"News deleted"

});


}

catch(error){

res.status(500).send({

message:error.message

});

}


};







// ================= LIKE NEWS =================


const likeNews = async(req,res)=>{


try{


const news = await News.findById(req.params.id);



if(!news){

return res.status(404).send({

message:"News not found"

});

}



const userId=req.user._id;



if(news.likes.includes(userId)){


news.likes = news.likes.filter(

(id)=>id.toString() !== userId.toString()

);


}

else{


news.likes.push(userId);


}



await news.save();



res.send({

message:"Like updated",

likes:news.likes.length

});



}

catch(error){

res.status(500).send({

message:error.message

});

}


};









// ================= ADD COMMENT =================


const addComment = async(req,res)=>{


try{


const news = await News.findById(req.params.id);



if(!news){

return res.status(404).send({

message:"News not found"

});

}




news.comments.push({

userId:req.user._id,

username:req.user.name,

text:req.body.text

});





await news.save();




res.send(news);



}


catch(error){


res.status(500).send({

message:error.message

});


}


};









// ================= DELETE COMMENT =================


const deleteComment = async(req,res)=>{


try{


const {newsId,commentId}=req.params;



const news = await News.findById(newsId);



if(!news){

return res.status(404).send({

message:"News not found"

});

}





const comment = news.comments.id(commentId);



if(!comment){

return res.status(404).send({

message:"Comment not found"

});

}





if(

comment.userId.toString() !== req.user._id.toString()

){


return res.status(403).send({

message:"You can delete only your comment"

});


}





comment.deleteOne();



await news.save();




res.send({

message:"Comment deleted"

});



}

catch(error){


res.status(500).send({

message:error.message

});


}


};


const editComment = async(req,res)=>{

try{

const {newsId,commentId}=req.params;


const news = await News.findById(newsId);


if(!news){

return res.status(404).send({
message:"News not found"
});

}


const comment = news.comments.id(commentId);


if(!comment){

return res.status(404).send({
message:"Comment not found"
});

}


// sirf jisne comment kiya wahi edit kare

if(
comment.userId.toString() !== req.user._id.toString()
){

return res.status(403).send({
message:"You can edit only your comment"
});

}



comment.text=req.body.text;


await news.save();


res.send(news);



}

catch(error){

res.status(500).send({
message:error.message
});

}


};






module.exports={

getAllNews,

getMyNews,

getSingleNews,

addNews,

updateNews,

deleteNews,

likeNews,

addComment,

deleteComment,

editComment

};