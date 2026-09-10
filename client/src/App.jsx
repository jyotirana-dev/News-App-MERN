import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateNews from "./pages/CreateNews";
import UpdateNews from "./pages/UpdateNews";
import NewsDetails from "./pages/NewsDetails";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import "./App.css";

import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "./AuthContext";

function App() {


const { setIsLogin, setUser,user } = useContext(AuthContext);

const location = useLocation();

const [loading,setLoading] = useState(true);

// Refresh ke baad user restore karna

useEffect(()=>{
const token = localStorage.getItem("token");

if(token){
axios.get(

"http://localhost:8000/user/verify",

{

headers:{
Authorization:"Bearer "+token
} 
})

.then((res)=>{

console.log("VERIFY DATA:",res.data);


setUser(res.data);


localStorage.setItem(
"user",
JSON.stringify(res.data)
);


setIsLogin(true);


localStorage.setItem(
"isLogin",
"true"
);


})

.catch((error)=>{

console.log(error.response);

localStorage.removeItem("token");
localStorage.removeItem("user");
localStorage.removeItem("isLogin");
setIsLogin(false);
setUser(null);
})

.finally(()=>{

setLoading(false);

}); }

else{
setLoading(false);
} },[]);

if(loading){
return <h2>Loading...</h2>;
}

return (

<>

<Navbar />

<Routes>

<Route path="/" element={<Home />} />

{ user && user.role === "admin" && <Route path="/dashboard" element={<Dashboard />} /> }

<Route path="/login" element={<Login />} />

<Route path="/register" element={<Register />} />

<Route path="/forgot-password" element={<ForgotPassword />} />

<Route path="/reset-password/:token" element={<ResetPassword />} />

{ user && user.role === "admin" && <Route path="/create-news" element={<CreateNews />} />}

{ user && user.role === "admin" && <Route path="/update-news" element={<UpdateNews />} /> }

<Route path="/news/:id" element={<NewsDetails />} />

<Route path='*' element={<NotFound/>}/>

</Routes>

</>

);}


export default App;