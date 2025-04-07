import logo from './logo.svg';
import './App.css';
// import { Axios } from 'axios';
//should not use braces
import Axios from "axios";
import { useEffect, useState } from 'react';
import { BrowserRouter as Router ,Routes,Route,Link } from 'react-router-dom';
import { Home } from "./Home";//if export using export const use {} 
import About from './About';
import Profile from './Profile';
import { createContext } from 'react';
import { QueryClient,QueryClientProvider  } from '@tanstack/react-query';
import { NavBar } from './NavBar';


export const AppContext = createContext();
 const client = new QueryClient();

function App() {
 
  const[userName,setUserName] = useState("Natarajan");
  const[usersList,setUsersList] = useState([]);
  return (  
<QueryClientProvider client={client}>
    <AppContext.Provider value={{userName,setUserName,usersList,setUsersList}}>  
      {/* //always put appcontext inside the QueryClientProvider */}
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/profile/:username' element={<Profile />}></Route>
        {/* if we want to pass anything in parameter give it like this */}
      </Routes>
     </Router>
     
    </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
