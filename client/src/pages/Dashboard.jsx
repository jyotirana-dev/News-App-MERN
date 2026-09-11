import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import "./Dashboard.css";
import API_URL from "../api";

const Dashboard = () => {
const { user } = useContext(AuthContext);
const navigate = useNavigate();
const [news, setNews] = useState([]);
const token = localStorage.getItem("token");
const header = {
Authorization:"Bearer "+token
};

const getNews = async()=>{
try{
const response = await axios.get(

// "http://localhost:8000/news/mynews",
`${API_URL}/news/mynews`,

{
headers:header
});

setNews(response.data);
}

catch(error){
console.log(error);
}};

useEffect(()=>{
getNews();
},[]);

const handleDelete = async(id)=>{
try{
await axios.delete(

// "http://localhost:8000/news/delete",
`${API_URL}/news/delete`,

{
headers:header,
params:{
id:id
}}
);

alert("News delete successfully");

setNews(
news.filter(
(item)=>item._id !== id
));
}

catch(error){
console.log(error);
}};

const handleLike = async(id)=>{
try{
await axios.put(

// `http://localhost:8000/news/like/${id}`,
`${API_URL}/news/like/${id}`,
{},
{
headers:header
});

getNews();
}

catch(error){
console.log(error);
}};

return (

<div className="dashboard-page">
<div className="dashboard-header">
{
user &&
<h1 className="dashboard-welcome">
Welcome {user.name}
</h1>
}

<Link to="/create-news">
<button className="dashboard-create-btn">
+ Create News
</button>
</Link>
</div>

<div className="dashboard-cards">
{
news.map((item)=>(
<div className="dashboard-card" key={item._id} >

{
item.image &&
<img

src={item.image}
  alt="news"
  className="dashboard-image"
/>
}

{
item.video &&
<video src={item.video}
  controls
  className="dashboard-video"
/>
}

<p>
Category: {item.category}
</p>

<p className="dashboard-description">
{item.content}
</p>

<p className="dashboard-author">
By: {item.authorname}
</p>

<div className="dashboard-actions">

<button onClick={()=>handleLike(item._id)} className="dashboard-like-btn" >
❤️ Like {item.likes?.length || 0}
</button>

<Link to={`/news/${item._id}#comments`} className="dashboard-comment-count">
💬 Comments {item.comments?.length || 0}
</Link>
</div>
<p className="dashboard-date">
📅 {new Date(item.createdAt).toLocaleDateString()}
</p>

<div className="dashboard-buttons">

<button className="dashboard-update-btn" onClick={()=>navigate( "/update-news",
{
state:{
news:item
}}
)}>

Update
</button>

<button className="dashboard-delete-btn" onClick={()=>handleDelete(item._id)}>
Delete
</button>

</div>
</div>
))
}
</div>
</div>

);
};

export default Dashboard;