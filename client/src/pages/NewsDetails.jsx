import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";


const NewsDetails =()=>{


const {id}=useParams();

const [news,setNews]=useState(null);



useEffect(()=>{


axios.get(`http://localhost:8000/news/${id}`)

.then((res)=>{

setNews(res.data);

})

.catch((err)=>{

console.log(err);

});


},[id]);





if(!news){

return <h2>Loading...</h2>

}





return(


<div

style={{

padding:"40px",

background:"#f1f5f9",

minHeight:"100vh"

}}

>



<div

style={{

background:"white",

padding:"30px",

borderRadius:"15px",

maxWidth:"800px",

margin:"auto"

}}

>





<h1>

{news.title}

</h1>





{/* Video show if available */}

{

news.video &&

<video

src={`http://localhost:8000/newsVideos/${news.video}`}

controls

style={{

width:"100%",

height:"350px",

objectFit:"cover",

borderRadius:"10px"

}}

/>

}






{/* Image show if available */}

{

!news.video && news.image &&

<img

src={`http://localhost:8000/newsImages/${news.image}`}

alt={news.title}

style={{

width:"100%",

height:"350px",

objectFit:"cover",

borderRadius:"10px"

}}

/>

}






<p

style={{

fontSize:"18px",

lineHeight:"1.6",

marginTop:"20px"

}}

>

{news.content}

</p>





<p>

Category: {news.category}

</p>




<p>

By: {news.authorname}

</p>





<p>

📅 {new Date(news.createdAt).toLocaleDateString()}

</p>





</div>



</div>



)


}



export default NewsDetails;