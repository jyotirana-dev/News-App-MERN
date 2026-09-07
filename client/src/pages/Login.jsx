import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const { setIsLogin, setUser } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({

    email: "",
    password: ""

  });

  const [showPassword, setShowPassword] = useState(false);

  const inputStyle = {

    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
    outline: "none"

  };

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

      // Context me login save
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
 }};

  return (

    <div

      style={{

        minHeight:"100vh",

        display:"flex",

        justifyContent:"center",

        alignItems:"center",

        background:"#f1f5f9"

      }}>

      <div

        style={{

          width:"350px",

          padding:"30px",

          background:"white",

          borderRadius:"12px",

          boxShadow:"0 5px 20px rgba(0,0,0,0.15)"

        }} >

         <h2

          style={{

            textAlign:"center",

            marginBottom:"25px"

          }}>

          Login

        </h2>
 <form onSubmit={handleSubmit}

          style={{

            display:"flex",

            flexDirection:"column",

            gap:"15px"

          }}>

 <input style={inputStyle} type="email"  name="email" placeholder="Enter Email" value={loginData.email} onChange={handleChange} />

         <div

            style={{

              display:"flex",

              gap:"8px"

            }} >

<input
 style={{ ...inputStyle,

         flex:1

         }}

       type={showPassword ? "text" : "password"} name="password" placeholder="Enter Password" value={loginData.password} onChange={handleChange}/>

 <button type="button" onClick={() => setShowPassword(!showPassword)}

             style={{

                padding:"10px",

                border:"none",

                borderRadius:"6px",

                cursor:"pointer"

              }} >

              {

                showPassword ? "Hide" : "Show"

              }

            </button>

          </div>

          <button type="submit"

             style={{

              padding:"12px",

              background:"#2563eb",

              color:"white",

              border:"none",

              borderRadius:"6px",

              fontSize:"16px",

              cursor:"pointer"

            }} >

            Login

          </button>

        </form>

        

        <p

          style={{

            textAlign:"center",

            marginTop:"20px"

          }} >

          Don't have an account?

 <Link to="/register"

            style={{

              color:"#2563eb",

              marginLeft:"5px",

              textDecoration:"none",

              fontWeight:"bold"

            }}>

            Register

          </Link>

        </p>

       <p
  style={{
    textAlign: "center",
    marginTop: "8px",
    marginBottom: "0"
  }}
>
  <Link
    to="/forgot-password"
    style={{
      color: "#2563eb",
      textDecoration: "none",
      fontWeight: "bold"
    }}
  >
    Forgot Password?
  </Link>
</p>

      </div>

    </div>

  );

};

export default Login;