import React from "react";
import { Link , useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";


const Navbar = () => {
   const { user,isLogin, setIsLogin,setUser } = useContext(AuthContext);
const navigate = useNavigate();
  const linkStyle = {

    color: "white",
    textDecoration: "none",
    padding: "8px 15px",
    display: "flex",
    alignItems: "center",
    fontSize: "18px",
    outline: "none"
  };

  return (

    <nav

      style={{

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "#2563eb",
        color: "white"

      }} >
      {/* Logo */}

      <h2>

        News App

      </h2>

      {/* Menu */}

      <div

        style={{
            display: "flex",
            gap: "25px",
            alignItems: "center"

        }} >

        <Link to="/" style={linkStyle} >

          Home

        </Link>

        {
          user && user.role === "admin" && <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        }

 { isLogin ?

<button
  onClick={() => {
    setIsLogin(false);
      setUser(null);
      localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLogin");
    navigate("/");
  }}

  style={{
    color: "white",
    background: "transparent",
    border: "none",
    padding: "8px 15px",
    fontSize: "18px",
    cursor: "pointer"
  }}>
  Logout
</button>
:

<Link to="/login" style={linkStyle}>
 Login
</Link>
}

      </div>

    </nav>

  );

};


export default Navbar;