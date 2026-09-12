import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import "./Home.css";
import API_URL from "../api";

const Home = () => {

const {user}=useContext(AuthContext);

const navigate = useNavigate();

const [news,setNews]=useState([]);

const [searchText,setSearchText]=useState("");
const [search,setSearch]=useState("");

const [currentPage,setCurrentPage] = useState(1);

const newsPerPage = 6;



// Get All News

const getNews = async()=>{

try{

let response = await axios.get(
// "http://localhost:8000/news"
`${API_URL}/news`,
);

//to show data open without login
console.log("NEWS DATA:", response.data);

setNews(response.data);

}

catch(error){

console.log(error);

}

};



useEffect(()=>{

getNews();

},[]);







// Like News

const handleLike = async(id)=>{

try{


const token = localStorage.getItem("token");


if(!token){

alert("Please login first");

navigate("/login");

return;

}



await axios.put(

// `http://localhost:8000/news/like/${id}`,
`${API_URL}/news/like/${id}`,
{},

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







// Search Filter

const filteredNews = news.filter((item)=>{


return (

item.title

.toLowerCase()

.includes(search.toLowerCase())


||


item.category?.toLowerCase()

.includes(search.toLowerCase())


);


});







// Pagination


const lastIndex = currentPage * newsPerPage;


const firstIndex = lastIndex - newsPerPage;



const currentNews = filteredNews.slice(

firstIndex,

lastIndex

);







return(


<div className="home-page">



{

user &&

<h1 className="welcome-text">

Welcome {user.name}

</h1>

}





<h2 className="page-title">

Latest News

</h2>






<div className="search-container">

<input

type="text"

placeholder="Search news..."

value={searchText}

onChange={(e)=>{

setSearchText(e.target.value);

}}

className="search-box"

/>


<button

className="search-btn"

onClick={()=>{

setSearch(searchText);

setCurrentPage(1);

}}

>

Search

</button>


<button

className="clear-btn"

onClick={()=>{

setSearchText("");

setSearch("");

setCurrentPage(1);

}}

>

Clear

</button>


</div>







<div className="news-container">


{


currentNews.map((item)=>(


<div

key={item._id}

className="news-card"

>


<div className="news-content">





<h2>

{item.title}

</h2>






{/* {

item.video ? */}


{/* <video

src={item.video}

controls

className="news-media"

/>


:


item.image &&


<img

src={

item.image.startsWith("http")

?

item.image

:

`http://localhost:8000/newsImages/${item.image}`

}

alt={item.title}

className="news-media"

/>


} */}

{item.video ? (
  <video
    src={item.video}
    controls
    className="news-media"
  />
) : (
  item.image && (
    <img
      src={item.image}
      alt={item.title}
      className="news-media"
    />
  )
)}






<p>

Category: {item.category}

</p>






<p className="news-description">


{

item.content.length>100

?

item.content.substring(0,100)+"..."

:

item.content

}


</p>






<p>

By: {item.authorname}

</p>







<p>

📅 {

new Date(item.createdAt)

.toLocaleDateString()

}

</p>









<div className="action-row">





<button

onClick={()=>handleLike(item._id)}

className="like-btn"

>

❤️ Like {item.likes?.length || 0}

</button>







<Link

to={`/news/${item._id}#comments`}

className="comment-count"

>

💬 Comments {item.comments?.length || 0}

</Link>



<button

className="read-more"

onClick={()=>{

if(!user){

alert("Please login first to read full news");

navigate("/login");

return;

}

navigate(`/news/${item._id}`);

}}

>

Read More &gt;&gt;

</button>


{/* 
<Link

to={`/news/${item._id}`}

className="read-more"

>

Read More &gt;&gt;

</Link> */}






</div>







</div>



</div>


))


}



</div>









{/* Pagination */}



<div className="pagination">


{


Array.from(

{

length:Math.ceil(

filteredNews.length / newsPerPage

)

},


(_,index)=>(


<button

key={index}

onClick={()=>setCurrentPage(index+1)}

className={

currentPage===index+1

?

"active-page"

:

""

}

>


{index+1}


</button>


)


)


}




</div>







</div>


);


};


export default Home;