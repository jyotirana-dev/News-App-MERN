import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateNews.css";
import API_URL from "../api";

const CreateNews = () => {


const navigate = useNavigate();


const [news, setNews] = useState({

    title:"",
    content:"",
    authorname:"",
    category:""

});


const [image,setImage]=useState(null);

const [video,setVideo]=useState(null);



const handleChange = (e)=>{

    setNews({

      ...news,

      [e.target.name]:e.target.value

    });

};





const handleSubmit = async(e)=>{


e.preventDefault();


try{


const token = localStorage.getItem("token");



const formData = new FormData();



formData.append("title", news.title);

formData.append("content", news.content);

formData.append("authorname", news.authorname);

formData.append("category", news.category);





if(image){

formData.append("image", image);

}



if(video){

formData.append("video", video);

}




let response = await axios.post(

// "http://localhost:8000/news/add",
`${API_URL}/news/add`,

formData,

{

headers:{

Authorization:"Bearer "+token,

"Content-Type":"multipart/form-data"

}

}

);




alert("News Created Successfully");


console.log(response.data);




setNews({

title:"",
content:"",
authorname:"",
category:""

});



setImage(null);

setVideo(null);



navigate("/dashboard");



}

catch(error){


console.log(error.response);



alert(

error.response?.data?.message ||

error.message

);


}



};





const imagePreviewUrl=image?URL.createObjectURL(image):null;


const videoPreviewUrl=video?URL.createObjectURL(video):null;




return(


<div className="create-page">


<div className="create-box">



<h1 className="create-title">

Create News

</h1>





<form

onSubmit={handleSubmit}

className="create-form"

>




<input

type="text"

name="title"

placeholder="Enter News Title"

value={news.title}

onChange={handleChange}

className="create-input"

/>





<select

name="category"

value={news.category}

onChange={handleChange}

className="create-input"

>


<option value="">

Select Category

</option>


<option value="Sports">

Sports

</option>


<option value="Politics">

Politics

</option>


<option value="Technology">

Technology

</option>


<option value="Entertainment">

Entertainment

</option>


<option value="Business">

Business

</option>


<option value="Weather">

Weather

</option>


<option value="Crime">

Crime

</option>



</select>






<textarea

name="content"

placeholder="Enter News Content"

value={news.content}

onChange={handleChange}

rows="5"

className="create-input create-textarea"

/>





<label className="create-label">

Select News Image

</label>



<input

type="file"

onChange={(e)=>setImage(e.target.files[0])}

className="create-input"

/>





{

imagePreviewUrl &&

<img

src={imagePreviewUrl}

alt="Preview"

className="create-preview"

/>

}







<label className="create-label">

Select News Video

</label>




<input

type="file"

accept="video/*"

onChange={(e)=>setVideo(e.target.files[0])}

className="create-input"

/>





{

videoPreviewUrl &&

<video

src={videoPreviewUrl}

controls

className="create-video"

/>

}







<input

type="text"

name="authorname"

placeholder="Author name"

value={news.authorname}

onChange={handleChange}

className="create-input"

/>






<button

type="submit"

className="create-btn"

>

Create News

</button>






</form>



</div>



</div>



);


};



export default CreateNews;