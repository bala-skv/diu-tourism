import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import { NavLink } from "react-router-dom";
import './Navbar.css';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/assets/logo.png" alt="logo" />
        <h1>Diu Tourism</h1>
      </div>
      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink></li>
        <li><NavLink to="/places/nagoa" className={({ isActive }) => isActive ? "active-link" : ""}>About</NavLink></li>
        <li><NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>Login</NavLink></li>
        <li><NavLink to="/places/nagoa" className={({ isActive }) => isActive ? "active-link" : ""}>Notifications</NavLink></li>
        <li><NavLink to="/places/nagoa" className={({ isActive }) => isActive ? "active-link" : ""}>Places to Visit</NavLink></li>
        <li><NavLink to="/places/nagoa" className={({ isActive }) => isActive ? "active-link" : ""}>Contacts</NavLink></li>
      </ul>
      <div className="search-bar">
        <input type="text" placeholder="Search Place in Diu" />
        <button>🔍</button>
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </div>
    </nav>
  );
};

export default Navbar;
