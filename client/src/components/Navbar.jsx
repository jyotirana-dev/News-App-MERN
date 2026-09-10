import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./Navbar.css";


const Navbar = () => {
const { user, isLogin, setIsLogin, setUser } = useContext(AuthContext);
const navigate = useNavigate();

return (

<nav className="navbar">

{/* Logo */}

<h2 className="navbar-logo">
News App
</h2>

{/* Menu */}

<div className="navbar-menu">

<Link to="/" className="navbar-link">
Home
</Link>

{ user && user.role === "admin" &&

<Link to="/dashboard" className="navbar-link">
Dashboard
</Link>
}

{
isLogin ?
<button onClick={() => { 
  setIsLogin(false);
  setUser(null);

localStorage.removeItem("token");
localStorage.removeItem("user");
localStorage.removeItem("isLogin");
navigate("/");

}}

className="navbar-logout">
Logout
</button> 

:

<Link to="/login" className="navbar-link" >
Login
</Link>
}
</div>
</nav>
);
};

export default Navbar;