import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {

const { user } = useContext(AuthContext);


if(!user){

return (

<div className="profile-page">

<h2>Please Login First</h2>

</div>

)

}



return (

<div className="profile-page">


<div className="profile-card">


<h2 className="profile-title">
My Profile
</h2>


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