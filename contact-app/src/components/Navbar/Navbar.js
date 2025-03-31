import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarSide, setSidebarSide] = useState("right");
  const menuToggleRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:5000/session", { withCredentials: true })
      .then((response) => {
        setIsLoggedIn(response.data.loggedIn);
      })
      .catch((error) => console.error("Error fetching session details:", error));
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      axios.post("http://localhost:5000/logout", {}, { withCredentials: true })
        .then(() => {
          setIsLoggedIn(false);
        })
        .catch((error) => console.error("Logout failed:", error));
    }
  };

  const toggleSidebar = (event) => {
    event.stopPropagation();
    setIsSidebarOpen((prev) => {
      const buttonRect = menuToggleRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      setSidebarSide(buttonRect.left < windowWidth / 2 ? "left" : "right");
      return !prev;
    });
  };

  useEffect(() => {
    const updateSidebarPosition = () => {
      setSidebarSide(window.innerWidth < 768 ? "left" : "right");
    };
    updateSidebarPosition();
    window.addEventListener("resize", updateSidebarPosition);
    return () => window.removeEventListener("resize", updateSidebarPosition);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && !event.target.closest(".sidebar") && !event.target.closest(".menu-toggle")) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/assets/logo.png" alt="logo" />
        <h1>Diu Tourism</h1>
      </div>
      
      <div className="nav-links-container">
        <ul className="nav-links">
          <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>About</NavLink></li>
          <li>
            {isLoggedIn ? (
              <NavLink to="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</NavLink>
            ) : (
              <NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>Login</NavLink>
            )}
          </li>
          <li><NavLink to="/hotels" className={({ isActive }) => isActive ? "active-link" : ""}>Hotels</NavLink></li>
          <li><NavLink to="/places/nagoa" className={({ isActive }) => isActive ? "active-link" : ""}>Places</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contacts</NavLink></li>
        </ul>
      </div>
      
      <div className="menu-toggle" onClick={toggleSidebar} ref={menuToggleRef}>☰</div>
      
      <div className={`sidebar ${isSidebarOpen ? "active" : ""} ${sidebarSide === "right" ? "right" : "left"}`}>
        <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>✖</button>
        <ul>
          <li><NavLink to="/" onClick={() => setIsSidebarOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={() => setIsSidebarOpen(false)}>About</NavLink></li>
          <li>
            {isLoggedIn ? (
              <NavLink to="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</NavLink>
            ) : (
              <NavLink to="/login" onClick={() => setIsSidebarOpen(false)}>Login</NavLink>
            )}
          </li>
          <li><NavLink to="/hotels" onClick={() => setIsSidebarOpen(false)}>Hotels</NavLink></li>
          <li><NavLink to="/places/nagoa" onClick={() => setIsSidebarOpen(false)}>Places</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setIsSidebarOpen(false)}>Contacts</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;