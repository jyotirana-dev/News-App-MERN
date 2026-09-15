import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import API_URL from "../api";


const Register = () => {


const [user,setUser] = useState({

name:"",
email:"",
password:"",
age:""

});


const [image,setImage] = useState(null);


const [showPassword,setShowPassword] = useState(false);



const handleChange = (e)=>{


setUser({

...user,

[e.target.name]:e.target.value

});


};



const handleSubmit = async(e)=>{


e.preventDefault();


try{


const formData = new FormData();


formData.append(
"name",
user.name
);


formData.append(
"email",
user.email
);


formData.append(
"password",
user.password
);


formData.append(
"age",
user.age
);



formData.append(
"profilePic",
image
);



let response = await axios.post(

`${API_URL}/user/register`,

formData

);



console.log(response.data);



alert("Register Successful");



setUser({

name:"",
email:"",
password:"",
age:""

});


setImage(null);



}


catch(error){


console.log(error.response);


alert(
error.response?.data || error.message
);


}



};




return(


<div className="register-page">


<div className="register-box">



<h2 className="register-title">

Register

</h2>




<form

onSubmit={handleSubmit}

className="register-form"

>




<input

className="register-input"

type="text"

name="name"

placeholder="Enter Name"

value={user.name}

onChange={handleChange}

/>





<input

className="register-input"

type="email"

name="email"

placeholder="Enter Email"

value={user.email}

onChange={handleChange}

/>





<div className="register-password-box">


<input

className="register-input register-password-input"

type={
showPassword 
? "text" 
: "password"
}

name="password"

placeholder="Enter Password"

value={user.password}

onChange={handleChange}

/>



<button

type="button"

className="register-show-btn"

onClick={()=>setShowPassword(!showPassword)}

>


{
showPassword 
? "Hide"
:
"Show"
}


</button>


</div>





<input

className="register-input"

type="number"

name="age"

placeholder="Enter Age"

value={user.age}

onChange={handleChange}

/>






<input

className="register-input"

type="file"

accept="image/*"

onChange={(e)=>{

setImage(
e.target.files[0]
)

}}

/>






<button

type="submit"

className="register-btn"

>


Register


</button>



</form>



</div>


</div>


);


};


export default Register;