import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const updateNews = () => {
    let {state}=useLocation();

  const navigate = useNavigate();

  const [news, setNews] = useState({
    _id: state.news._id,
    title:state.news.title,
    content:state.news.content,
    image:state.news.image,
    authorname:state.news.authorname
  });

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

let response = await axios.put(
  `http://localhost:8000/news/update?id=${news._id}`,
  news,
        {
          headers:{
            Authorization:"Bearer "+token
          }
        });

      alert("News updated Successfully");

      console.log(response.data);

      setNews({
        title:"",
        content:"",
        image:"",
        authorname:""
      });

      navigate("/dashboard");

    }
    catch(error){

      console.log(error.response);

      alert(
        error.response?.data?.message || 
        error.message
      );

    }};

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
          update News
        </h1>

<form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"20px" }} >

<input type="text" name="title" placeholder="Enter News Title" value={news.title} onChange={handleChange} 
        style={inputStyle} />

<textarea name="content" placeholder="Enter News Content" value={news.content} onChange={handleChange} rows="5"
            style={{
              ...inputStyle,
              resize:"none"
            }}/>

<input type="text" name="image" placeholder="Enter Image URL" value={news.image} onChange={handleChange}
       style={inputStyle} />

<input type="text" name="authorname" placeholder="Author name" value={news.authorname} onChange={handleChange}
            style={inputStyle} />

 <button type="submit"
            style={{
              background:"#2563eb",
              color:"white",
              padding:"12px",
              border:"none",
              borderRadius:"8px",
              fontSize:"17px",
              cursor:"pointer"
            }}>

            update News

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

export default updateNews;