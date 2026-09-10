import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";


const Login = () => {


  const navigate = useNavigate();

  const { setIsLogin, setUser } = useContext(AuthContext);


  const [loginData, setLoginData] = useState({

    email: "",
    password: ""

  });


  const [showPassword, setShowPassword] = useState(false);



  const handleChange = (e) => {

    setLoginData({

      ...loginData,

      [e.target.name]: e.target.value

    });

  };



 const handleSubmit = async (e) => {

 e.preventDefault();


 try {


 let response = await axios.post(

        "http://localhost:8000/user/login",

        loginData

      );


 console.log(response.data);


 alert(response.data.message);



 setIsLogin(true);



 localStorage.setItem(

 "isLogin",

 "true"

 );



 setUser(response.data.user);



 localStorage.setItem(

 "user",

 JSON.stringify(response.data.user)

 );



 localStorage.setItem(

 "token",

 response.data.token

 );



 navigate("/");


 }


 catch(error) {


      console.log(error.response);


      alert(

        error.response?.data?.message || 
        "Login Failed"

      );


 }



 };



  return (


    <div className="login-page">


      <div className="login-box">


        <h2 className="login-title">

          Login

        </h2>



        <form 

        onSubmit={handleSubmit}

        className="login-form"

        >



        <input

        className="login-input"

        type="email"

        name="email"

        placeholder="Enter Email"

        value={loginData.email}

        onChange={handleChange}

        />





        <div className="password-box">



        <input


        className="login-input password-input"


        type={showPassword ? "text" : "password"}

        name="password"

        placeholder="Enter Password"

        value={loginData.password}

        onChange={handleChange}

        />




        <button

        type="button"

        className="show-btn"

        onClick={() => setShowPassword(!showPassword)}

        >


        {

        showPassword ? "Hide" : "Show"

        }


        </button>



        </div>






        <button

        type="submit"

        className="login-btn"

        >


        Login


        </button>



        </form>





        <p className="register-text">


        Don't have an account?


        <Link 

        to="/register"

        className="register-link"

        >

        Register

        </Link>



        </p>







       <p className="forgot-text">


       <Link

       to="/forgot-password"

       className="forgot-link"

       >


       Forgot Password?


       </Link>


       </p>





      </div>



    </div>


  );


};



export default Login;