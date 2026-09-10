import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./UpdateNews.css";


const UpdateNews = () => {


  let {state}=useLocation();


  const navigate = useNavigate();



  const [news, setNews] = useState({

    _id: state.news._id,
    title:state.news.title,
    content:state.news.content,
    image:state.news.image,
    authorname:state.news.authorname

  });





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


    }


  };





return (


<div className="update-page">


<div className="update-box">



<h1 className="update-title">

Update News

</h1>





<form 

onSubmit={handleSubmit}

className="update-form"

>



<input

type="text"

name="title"

placeholder="Enter News Title"

value={news.title}

onChange={handleChange}

className="update-input"

/>





<textarea

name="content"

placeholder="Enter News Content"

value={news.content}

onChange={handleChange}

rows="5"

className="update-input update-textarea"

/>





<input

type="text"

name="image"

placeholder="Enter Image URL"

value={news.image}

onChange={handleChange}

className="update-input"

/>





<input

type="text"

name="authorname"

placeholder="Author name"

value={news.authorname}

onChange={handleChange}

className="update-input"

/>






<button

type="submit"

className="update-btn"

>


Update News


</button>




</form>



</div>



</div>


);


};


export default UpdateNews;