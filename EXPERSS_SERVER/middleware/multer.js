const multer = require("multer");

const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        if(file.mimetype.startsWith("image")){
            cb(null,"newsImages/");
        }
        else if(file.mimetype.startsWith("video")){
            cb(null,"newsVideos/");
        }
        else{
            cb(new Error("Only image and video files are allowed"));
        }

    },


    filename:(req,file,cb)=>{

        cb(
            null,
            Date.now()+"-"+file.originalname
        );

    }

});


const upload = multer({
    storage:storage
});


module.exports = upload;