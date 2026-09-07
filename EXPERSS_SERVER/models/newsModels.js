const mongoose = require("mongoose");
let newsSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },

    image:{
        type:String,
        
    },

    video:{
        type:String
    },

    category:{
    type:String,
    required:true
},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
         required:true
        //  ref:"User",
    },
    authorname:{
        type:String,
        required:true
    },

    likes:[
   {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   }
    ],
comments:[
{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    username:{
        type:String
    },

    text:{
        type:String,
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
}
]
},

{
    timestamps:true
});

let News = mongoose.model("news", newsSchema);

module.exports = News;