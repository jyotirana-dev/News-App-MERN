import React, {useEffect, useState, useContext} from "react";
import {useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../AuthContext";
import "./NewsDetails.css";
import {Link} from "react-router-dom";
import API_URL from "../api";

const NewsDetails =()=>{


const {id}=useParams();
const navigate = useNavigate();

const {user}=useContext(AuthContext);
console.log("DETAIL USER:", user);

const [news,setNews]=useState(null);

const [comment,setComment]=useState("");


// Edit ke liye
const [editId,setEditId]=useState(null);

const [editText,setEditText]=useState("");




// ================= GET NEWS =================

const getNews = async()=>{

try{

let response = await axios.get(
// `http://localhost:8000/news/${id}`
`${API_URL}/news/${id}`

);


setNews(response.data);


}

catch(error){

console.log(error);

}

};





useEffect(()=>{

getNews();

},[id]);







// ================= ADD COMMENT =================


const addComment = async()=>{


if(!comment.trim()){

alert("Write comment");

return;

}


try{


const token = localStorage.getItem("token");



await axios.post(

// `http://localhost:8000/news/comment/${id}`,
`${API_URL}/news/comment/${id}`,

{
text:comment
},

{

headers:{
Authorization:"Bearer "+token
}

}

);



setComment("");

getNews();



}

catch(error){

console.log(error.response);

}

};








// ================= START EDIT =================


const editComment=(item)=>{


setEditId(item._id);

setEditText(item.text);


};









// ================= UPDATE COMMENT =================


const updateComment = async()=>{


try{


const token = localStorage.getItem("token");



await axios.put(

// `http://localhost:8000/news/comment/${id}/${editId}`,
`${API_URL}/news/comment/${id}/${editId}`,

{
text:editText
},

{

headers:{
Authorization:"Bearer "+token
}

}

);



setEditId(null);

setEditText("");

getNews();



}

catch(error){

console.log(error.response);

}


};









// ================= DELETE COMMENT =================


const deleteComment = async(commentId)=>{


try{


const token = localStorage.getItem("token");



await axios.delete(

// `http://localhost:8000/news/comment/${id}/${commentId}`,
`${API_URL}/news/comment/${id}/${commentId}`,

{

headers:{
Authorization:"Bearer "+token
}

}

);



getNews();



}

catch(error){

console.log(error.response);

}


};









if(!news){

return(

<h2 className="details-loading">

Loading...

</h2>

)

}








return(


<div className="details-page">


<div className="details-card">
<Link to="/" className="back-link">
← Back to Home
</Link>

<h1 className="details-title">

{news.title}

</h1>





{
news.video &&

<video

src={news.video}

controls

className="details-media"

/>

}





{
!news.video && news.image &&

<img

src={news.image}

alt={news.title}

className="details-media"

/>

}








<p className="details-content">

{news.content}

</p>








<p>

Category : {news.category}

</p>



<p>

By : {news.authorname}

</p>





<p>

❤️ Likes : {news.likes?.length || 0}

</p>





<hr/>






<div id="comments">


<h2>

💬 Comments ({news.comments?.length || 0})

</h2>

{
user ?
<>
<textarea className="comment-box" placeholder="Write your comment" value={comment}
 onChange={(e)=>setComment(e.target.value)}/>

<button className="comment-btn" onClick={addComment}>
Add Comment
</button>
</>
:
<p>
Login to comment
</p>
}
</div>

<div className="comments-section">
{
news.comments && news.comments.length>0 ?
news.comments.map((item)=>(
<div className="comment-card" key={item._id}>

<h4>
👤 {item.username}
</h4>

{
editId === item._id ?
<>
<textarea

className="edit-box"

value={editText}

onChange={(e)=>setEditText(e.target.value)}

/>



<button

className="save-edit"

onClick={updateComment}

>

Save

</button>


</>


:


<p>

{item.text}

</p>



}








<small className="comment-date">

📅 {new Date(item.createdAt)
.toLocaleDateString()}

</small>







{

user && user._id === item.userId.toString() &&

<>


<button

className="edit-comment"

onClick={()=>editComment(item)}

>

Edit

</button>





<button

className="delete-comment"

onClick={()=>deleteComment(item._id)}

>

Delete

</button>



</>


}





</div>



))


:


<p>

No comments yet

</p>


}





</div>






</div>


</div>


)


}



export default NewsDetails;