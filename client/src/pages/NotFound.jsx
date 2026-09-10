import React from 'react'
import { Link } from "react-router-dom";
import "./NotFound.css";


const NotFound = () => {


  return (


    <div className="notfound-page">


      <div className="notfound-box">


        <h1 className="notfound-title">

          404 Error

        </h1>


        <h3 className="notfound-subtitle">

          Page not found

        </h3>


        <Link 

        to='/'

        className="notfound-link"

        >

        Go to Home Page

        </Link>



      </div>


    </div>


  )


}


export default NotFound;