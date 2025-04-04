import React from "react";
import { useNavigate } from "react-router-dom";
import { useState,useContext } from "react"; 
import { AppContext } from "./App";


function About(){
    let goToHome = useNavigate();//to use useNavigate call this as a function and mention the path
    const {userList} = useContext(AppContext);//useing appcontext getting the username from app js usestate and setting it here and displaying it
     console.log(userList);
    return <h1>This is about page{userList}<button onClick={()=>goToHome("/profile/raja")}>Go to Home</button></h1>
    
}
export default About;