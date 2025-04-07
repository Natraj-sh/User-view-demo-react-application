import './App.css';
import { Link } from 'react-router-dom';


export const NavBar = ()=>{
    return (
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </nav>
    )
}