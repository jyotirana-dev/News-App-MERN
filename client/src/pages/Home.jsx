import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";


const Home = () => {

const {user}=useContext(AuthContext);

const navigate = useNavigate();

const [news,setNews]=useState([]);

const [search,setSearch]=useState("");

// Get All News

const getNews = async()=>{

try{

let response = await axios.get(
"http://localhost:8000/news"
);


setNews(response.data);

}
catch(error){

console.log(error);

}};

useEffect(()=>{

getNews();

},[]);

// Like News

const handleLike = async(id)=>{

try{

const token = localStorage.getItem("token");

// agar login nahi hai

if(!token){

alert("Please login first");

navigate("/login");

return;

}

await axios.put(

`http://localhost:8000/news/like/${id}`,

{},

{

headers:{
Authorization:"Bearer "+token
}
});

// refresh news data

getNews();

}

catch(error){

console.log(error.response);

}};

// Search Filter

const filteredNews = news.filter((item)=>{
return (

item.title
.toLowerCase()
.includes(search.toLowerCase())||item.category?.toLower.includes(search.toLowerCase()));
});

return(


<div style={{

padding:"40px",
background:"#f1f5f9",
minHeight:"100vh"
}}>

{
user &&

<h1 style={{

color:"red",
textAlign:"center"
}}>

Welcome {user.name}

</h1>

}

<h2 style={{

textAlign:"center",
color:"#2563eb"

}}>

Latest News

</h2>

<input type="text" placeholder="Search news..." value={search} onChange={(e)=>setSearch(e.target.value)}

style={{

width:"300px",
padding:"12px",
borderRadius:"8px",
border:"1px solid #ccc",
display:"block",
margin:"20px auto"

}}/>

<div style={{

display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
gap:"25px"

}}>

{

filteredNews.map((item)=>(

<div

key={item._id}

style={{

background:"white",
borderRadius:"15px",
overflow:"hidden",
boxShadow:"0 5px 20px rgba(0,0,0,0.15)"

}}>

<div

style={{

padding:"20px"

}}>

<h2>

{item.title}

</h2>

{

item.video ?

<video src={item.video} controls

style={{

width:"100%",
height:"180px",
borderRadius:"8px"

}}/>

:

item.image &&

<img src={ item.image.startsWith("http") ? item.image

:

`http://localhost:8000/newsImages/${item.image}`

} alt={item.title}

style={{

width:"100%",
height:"180px",
objectFit:"cover",
borderRadius:"8px"

}}/>

}

<p>

Category: {item.category}

</p>

<p>

{

item.content.length>100 ? item.content.substring(0,100)+"..."

:

item.content

}

</p>

<p>

By: {item.authorname}

</p>

<p>

📅 {new Date(item.createdAt)
.toLocaleDateString()}

</p>

<button

onClick={()=>handleLike(item._id)}

style={{

background:"#facc15",
border:"none",
padding:"10px 20px",
borderRadius:"8px",
cursor:"pointer",
marginRight:"10px"

}}>

❤️ Like {item.likes?.length || 0}

</button>

<Link to={`/news/${item._id}`}>

<button

style={{

background:"#2563eb",
color:"white",
padding:"10px 20px",
border:"none",
borderRadius:"8px",
cursor:"pointer"

}}>

Read More

</button>
</Link>

</div>
</div>

))}
</div>

</div>
);
};


export default Home;