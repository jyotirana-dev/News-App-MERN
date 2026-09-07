import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";


const Dashboard = () => {


const { user } = useContext(AuthContext);

const navigate = useNavigate();


const [news, setNews] = useState([]);



const token = localStorage.getItem("token");


const header = {

Authorization:"Bearer "+token

};



// Get News

const getNews = async()=>{

try{


const response = await axios.get(

"http://localhost:8000/news/mynews",

{
headers:header
}

);


setNews(response.data);


}
catch(error){

console.log(error);

}


};





useEffect(()=>{

getNews();

},[]);






// Delete News

const handleDelete = async(id)=>{


try{


await axios.delete(

"http://localhost:8000/news/delete",

{

headers:header,

params:{
id:id
}

}

);



alert("News delete successfully");



setNews(

news.filter(

(item)=>item._id !== id

)

);



}
catch(error){

console.log(error);

}


};







// Like News

const handleLike = async(id)=>{


try{


await axios.put(

`http://localhost:8000/news/like/${id}`,

{},

{

headers:header

}

);



getNews();



}
catch(error){

console.log(error);

}


};






return (

<div style={styles.dashboard}>


{/* Header */}

<div style={styles.header}>


<div>


{
user &&

<h1

style={{

textAlign:"center",

color:"#e11c1c",

fontSize:"30px"

}}

>

Welcome {user.name}

</h1>

}


</div>





<Link to="/create-news">

<button style={styles.createBtn}>

+ Create News

</button>

</Link>



</div>






{/* Cards */}

<div style={styles.cards}>


{

news.map((item)=>(



<div

style={styles.card}

key={item._id}

>




{/* Image */}

{

item.image &&

<img

src={

item.image.startsWith("http")

?

item.image

:

`http://localhost:8000/newsImages/${item.image}`

}

alt="news"

style={styles.image}

/>

}






{/* Video */}

{

item.video &&

<video

src={

`http://localhost:8000/newsVideos/${item.video}`

}

controls

style={styles.video}

/>

}







<h2 style={styles.title}>

{item.title}

</h2>





<p>

Category: {item.category}

</p>





<p style={styles.description}>

{item.content}

</p>





<p style={styles.authorname}>

By: {item.authorname}

</p>






<button

onClick={()=>handleLike(item._id)}

style={styles.likeBtn}

>

❤️ Like {item.likes?.length || 0}

</button>






<p style={styles.date}>

📅 {new Date(item.createdAt).toLocaleDateString()}

</p>






<div style={styles.buttons}>


<button

style={styles.updateBtn}

onClick={()=>navigate(

"/update-news",

{

state:{
news:item
}

}

)}

>

Update

</button>





<button

style={styles.deleteBtn}

onClick={()=>handleDelete(item._id)}

>

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





const styles = {


dashboard:{

padding:"30px",

background:"#f5f5f5",

minHeight:"100vh"

},



header:{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"25px"

},



createBtn:{

background:"#198754",

color:"white",

border:"none",

padding:"12px 25px",

borderRadius:"6px",

fontSize:"16px",

cursor:"pointer"

},




cards:{


display:"grid",

gridTemplateColumns:"repeat(4,1fr)",

gap:"25px"


},




card:{


background:"white",

padding:"15px",

borderRadius:"12px",

boxShadow:"0 3px 10px rgba(0,0,0,0.15)"


},




image:{


width:"100%",

height:"140px",

objectFit:"cover",

borderRadius:"8px"


},



video:{


width:"100%",

height:"200px",

borderRadius:"8px"


},




title:{


fontSize:"18px",

marginTop:"12px"


},




description:{


color:"#555",

fontSize:"14px"


},



authorname:{


color:"#555",

fontSize:"14px"


},




date:{


fontSize:"14px"


},




likeBtn:{


background:"#facc15",

border:"none",

padding:"8px 15px",

borderRadius:"5px",

cursor:"pointer"


},




buttons:{


display:"flex",

justifyContent:"space-between",

marginTop:"20px"


},




updateBtn:{


background:"#0d6efd",

color:"white",

border:"none",

padding:"8px 20px",

borderRadius:"5px",

cursor:"pointer"


},



deleteBtn:{


background:"#dc3545",

color:"white",

border:"none",

padding:"8px 20px",

borderRadius:"5px",

cursor:"pointer"


}



};


export default Dashboard;