import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "./App";
import { useState ,useContext} from "react";   
import "./css/profilePage.css";



function Profile(){

    let goToHome = useNavigate();
    let {username} = useParams();
     //should use same name used in the Route path

    const { usersList, setUsersList } = useContext(AppContext);
    console.log("profile paged:"+usersList);
    console.log(usersList);

    const user = usersList.find((user) => user.name.firstName === username);
    console.log(user);
    
    //find returns a single element filter returns an array
    console.log(user?.email);
    return (
     <div className="profile-container">
        <div className="profile-header"></div>
        <div className="profile-badge">{user?.gender?.toUpperCase()}</div>
        <img className="profile-image" src={user?.picture} alt="Profile" />
        <h2 className="profile-name">{user?.name?.firstName} {user?.name?.lastName}</h2>
        <h3 className="profile-id">ID: {user?.id}</h3>
        <p className="profile-info"><strong>Email:</strong> {user?.email}</p>
        <p className="profile-info"><strong>Phone:</strong> {user?.phone}</p>
    </div>


    )
    
}
export default Profile;