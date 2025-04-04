import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useBlocker } from "react-router-dom";
import  Axios  from "axios";
import { useState ,useContext} from "react";   
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "./App";
import "./css/Home.css";


export const Home = ()=>{

    const { usersList, setUsersList } = useContext(AppContext);
    const { data,isLoading,isError,refetch } = useQuery({
        queryKey: ["cats"],
        queryFn: () =>
          Axios.get("https://randomuser.me/api").then((res) => {
         //   console.log("Full Response:", res);         // Logs the whole response object
        //      console.log("Data Only:", res.data);        // Logs the actual data from the response
            return res.data;
          }),
          enabled:false,
      });
        
    const   addUsersToList = (newData)=>{
        const newUser = {
          name : {
            firstName:newData?.results[0]?.name?.first,
            lastName:newData?.results[0]?.name?.last,
          },
          id :newData?.results[0]?.id?.value,

          gender:newData?.results[0]?.gender,

          email:newData?.results[0]?.email,

          phone:newData?.results[0]?.phone,

          picture:newData?.results[0]?.picture?.medium,

          viewMore:false
          
        };
        
       // setUsersList(...usersList,newUser);//studpid this is wrong 
       console.log(newData);
        setUsersList([...usersList,newUser]);//  setUsersList([...usersList, newUser]); correctly creates a new array with the existing users and adds the new one at the end.
        console.log(usersList);
    }
    console.log(usersList);   
    
    
    const updateViewMore = (id)=>{
    const newUserList=   usersList.map((user)=>{
        if(user.id===id)
             user.viewMore = true;
        return user;
       });
       setUsersList(newUserList);   
       console.log(usersList);
    }
    
    const filterFemale = ()=>{
       const onlyFemaleUsersList = usersList.filter((user)=>{
        if(user.gender === "female")
          return user;
       });
       console.log("female");
       console.log(onlyFemaleUsersList);
       setUsersList(onlyFemaleUsersList);
    }
    
    let navigaToProfile = useNavigate();
    return (
      <div className="app-container">
        <div className="buttons">
          <button
            className="load-btn"
            onClick={() => {
              refetch();
              if (!isLoading && data?.results[0]) {
                addUsersToList(data);
              }
            }}
          >
            Load Users
          </button>
          {isLoading && <h1>Loading...</h1>}
          <select className="filter-dropdown" onChange={}>
           <option value="all">All Users</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
         </select>

        </div>
    
        <div className="profile-list">
          {usersList.map((user, index) => (
            <div className="profile-card" key={index}>
              <img src={user.picture} alt="Profile" className="profile-img" />
              <div className="profile-info">
                <h2>
                  {user.name.firstName} {user.name.lastName}
                </h2>
                {user.viewMore ? (
                  <>
                    <p><strong>ID:</strong> {user.id}</p>
                    <button
                      className="profile-btn"
                      onClick={() => navigaToProfile(`/profile/${user.name.firstName}`)}
                    >
                      Profile Page
                    </button>
                  </>
                ) : (
                  <button
                    className="view-more-btn"
                    onClick={() => updateViewMore(user.id)}
                  >
                    View More
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    // return (
    //     <div className="App">
    //       <div>
    //       <button onClick={()=>{
    //             refetch();
    //             if (!isLoading && data?.results?.[0]) {
    //                 addUsersToList(data);
    //             }
                
    //         }}>Load Users</button>
    //         <button onClick={filterFemale}>Female-Only</button>
    //       </div>
            
    //        <div>
    //         {usersList.map((user,index)=>{  
    //         return user.viewMore ?(
    //         <div className="profile" key={index}>
    //         <h2>ID: {user.id}</h2>
    //         <h3>Name:{user.name.firstName} {user.name.lastName}</h3>
    //         <img src={user.picture}/>
    //         <button onClick={()=>navigaToProfile(`/profile/${user.name.firstName}`)}>Profile Page</button>
           
    //       </div>
    //         ):(
    //             <>
    //             <h3>Name:{user.name.firstName} {user.name.lastName}</h3>
    //             <button onClick={()=>updateViewMore(user.id)}>View More</button>
    //             </>
            
    //     )
    //         })}
    //        </div>
            
    //     </div>
    // )
};