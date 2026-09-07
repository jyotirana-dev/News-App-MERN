import React, { useState } from "react";
import axios from "axios";

const Register = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: ""
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

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      let response = await axios.post(
        "http://localhost:8000/user/register",
        user
      );

      console.log(response.data);

      alert("Register Successful");

      setUser({
  name: "",
  email: "",
  password: "",
  age: ""
});

    } catch(error) {

      console.log(error.response);

      alert(error.response?.data || error.message);

    }};

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f1f5f9"
      }}>

      <div
        style={{
          width: "350px",
          padding: "30px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0px 5px 20px rgba(0,0,0,0.15)"
        }}>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#333"
          }}>
          Register
        </h2>

        <form onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}>

<input style={inputStyle} type="text" name="name" placeholder="Enter Name" value={user.name} onChange={handleChange} />

<input style={inputStyle} type="email" name="email" placeholder="Enter Email" value={user.email} onChange={handleChange} />

          <div
            style={{
              display: "flex",
              gap: "8px"
            }} >

<input style={{ ...inputStyle, flex: 1 }} type={showPassword ? "text" : "password"} name="password"
              placeholder="Enter Password"
              value={user.password}
              onChange={handleChange} />

            <button type="button" onClick={() => setShowPassword(!showPassword)}
              style={{
                padding: "10px",
                border: "none",
                borderRadius: "6px",
                background: "#ddd",
                cursor: "pointer"
              }} >

              {showPassword ? "Hide" : "Show"}

            </button>

          </div>

     <input style={inputStyle} type="number" name="age" placeholder="Enter Age" value={user.age} onChange={handleChange} />

          <button type="submit"
            style={{
              padding: "12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer"
            }} >

            Register

          </button>

        </form>

      </div>

    </div>

  );

};

export default Register;