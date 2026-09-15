import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Profile.css";


const Profile = () => {


const { user } = useContext(AuthContext);

const [image,setImage] = useState(null);
const [preview,setPreview] = useState(user.profilePic || "");



if(!user){

return (

<div className="profile-page">

<h2>Please Login First</h2>

</div>

)

}



const uploadImage = async()=>{


try{


const formData = new FormData();


formData.append(
"profilePic",
image
);



let token = localStorage.getItem("token");



let response = await axios.put(

"https://news-app-mern-0uq1.onrender.com/user/upload-profile",

formData,

{

headers:{

Authorization:"Bearer "+token

}

}

);



alert("Profile image uploaded");

setPreview(response.data.profilePic);
console.log(response.data);



}

catch(error){

console.log(error);

alert("Upload failed");

}


};




return (

<div className="profile-page">


<div className="profile-card">


<h2 className="profile-title">
    
My Profile
</h2>

<div className="profile-image-box">

<img

src={
preview 
? preview 
: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
}

className="profile-image"

/>


<input

type="file"

id="profileUpload" 
hidden

onChange={(e)=>{

let file=e.target.files[0];

setImage(file);

setPreview(URL.createObjectURL(file));

}}

/>


<label htmlFor="profileUpload">
Choose Image

</label>


</div>


<button className="upload-btn" 
onClick={uploadImage}>

Update Profile

</button>



<div className="profile-info">


<p>
👤 Name: {user.name}
</p>


<p>
📧 Email: {user.email}
</p>


<p>
🎂 Age: {user.age}
</p>



{
user.role === "admin" &&

<Link 
to="/dashboard"
className="dashboard-btn"
>

Go to Dashboard

</Link>

}



</div>


</div>


</div>


)


}


export default Profile;