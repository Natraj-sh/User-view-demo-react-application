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
      var userListFilter = [];
      React.useEffect(()=>{
          console.log("howmuch");
          
      },[]);  
        
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
        setUsersList([...usersList,newUser]);//  setUsersList([...usersList, newUser]); correctly creates a new array with the existing users and adds the new one at the end.
       userListFilter = [...usersList];
       console.log("the filter default list");
       console.log(userListFilter);
    }
   
    
    
    const updateViewMore = (id)=>{
    const newUserList=   usersList.map((user)=>{
        if(user.id===id)
             user.viewMore = true;
        return user;
       });
       setUsersList(newUserList);   
    }
    const filterFemale = (gender)=>{
      console.log(gender);
      // so e.target.value will get only the value as we already gave value="all" use that not ALL Users
      if(gender === "all"){
        console.log("chose user list filter");
        console.log(userListFilter);
        setUsersList(userListFilter);
      }
      else{
       const onlyFemaleUsersList = usersList.filter((user)=>{
        if(user.gender === gender)
          return user;
       });
       console.log(onlyFemaleUsersList);
       setUsersList(onlyFemaleUsersList);
       console.log(userListFilter);
      }
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
          <select className="filter-dropdown" onChange={(e)=>filterFemale(e.target.value)}>
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