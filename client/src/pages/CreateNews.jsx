import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateNews = () => {

  const navigate = useNavigate();

  const [news, setNews] = useState({
    title:"",
    content:"",
    
    authorname:"",
    category:""
  });

const[image,setImage]=useState(null)
const [video,setVideo] = useState(null);
  // Input change
  const handleChange = (e)=>{

    setNews({
      ...news,
      [e.target.name]:e.target.value
    });

  };

  // Form submit
  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      const token = localStorage.getItem("token");

console.log("Token:", token);

      // let response = await axios.post(
      //   "http://localhost:8000/news/add",
      //   news,
      //   {
      //     headers:{
      //       Authorization:"Bearer "+token
      //     }
      //   });

      const formData = new FormData();

    formData.append("title", news.title);
    formData.append("content", news.content);
    formData.append("authorname", news.authorname);
    formData.append("category", news.category);

     // image add karna. agr image optional hai to if
   if(image){
           formData.append("image", image);
            }

// video optional
if(video){
   formData.append("video", video);
}

    let response = await axios.post(
      "http://localhost:8000/news/add",
      formData,
      {
        headers:{
          Authorization:"Bearer "+token,
          "Content-Type":"multipart/form-data"
        }
      });

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

    }};

const imagePreviewUrl=image?URL.createObjectURL(image):null;

const videoPreviewUrl = video? URL.createObjectURL(video): null;

  return (

    <div
      style={{
        minHeight:"100vh",
        background:"#f1f5f9",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:"40px"
      }}>

      <div
        style={{
          width:"450px",
          background:"white",
          padding:"35px",
          borderRadius:"15px",
          boxShadow:"0 5px 20px rgba(0,0,0,0.15)"
        }}>

        <h1
          style={{
            textAlign:"center",
            color:"#2563eb",
            marginBottom:"30px"
          }}>
          Create News
        </h1>

        <form 
          onSubmit={handleSubmit}
          
          style={{
            display:"flex",
            flexDirection:"column",
            gap:"20px"
          }}>

          
<input type="text" name="title" placeholder="Enter News Title" value={news.title} onChange={handleChange} 
        style={inputStyle} />

{/* adding the category using dropdown */}

<select name="category" value={news.category} onChange={handleChange} style={inputStyle}>

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

<option value="Jobs">
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

<textarea name="content" placeholder="Enter News Content" value={news.content} onChange={handleChange} rows="5"
            style={{
              ...inputStyle,
              resize:"none"
            }} />

<label>
  Select News Image
</label>

<input type="file" name="image" placeholder="Enter Image URL" onChange={(e)=>setImage(e.target.files[0])}
            style={inputStyle} />

{imagePreviewUrl && (
  <img src={imagePreviewUrl}
  alt="Preview"
  style={{
    width:"100%",
    height:"200px",
    objectFit:"cover",
    borderRadius:"6px",
  }} />
)}

 {/* Video Upload */}

 <label>
  Select News Video
</label>

    <input type="file" accept="video/*" onChange={(e)=>setVideo(e.target.files[0])}

    style={inputStyle}/>

    {videoPreviewUrl && (
      <video src={videoPreviewUrl} controls
 style={{

        width:"100%",
        height:"250px",
        borderRadius:"6px"

      }}/>

    )}

<input type="text" name="authorname" placeholder="Author name" value={news.authorname} onChange={handleChange}
            style={inputStyle} />

            <button
            type="submit"
            style={{
              background:"#2563eb",
              color:"white",
              padding:"12px",
              border:"none",
              borderRadius:"8px",
              fontSize:"17px",
              cursor:"pointer"
            }}>
            Create News
          </button>

        </form>

      </div>

    </div>

  );

};

const inputStyle = {

  padding:"12px",

  border:"1px solid #ccc",

  borderRadius:"8px",

  fontSize:"16px",

  outline:"none"

};

export default CreateNews;