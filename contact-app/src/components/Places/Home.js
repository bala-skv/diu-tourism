import React, { useEffect, useState } from 'react';
 import { Link } from "react-router-dom";
 import Navbar from '../Navbar/Navbar';
 import Footer from '../Footer/Footer';
 import HorizontalScroll from '../Features/HorizontalScroll';
 import './Nagoa.css';
 
 const images = [
   '/assets/Nagoa.jpg',
   '/assets/n1.png',
   '/assets/n2.png',
   '/assets/n3.png',
   '/assets/n4.png',
   '/assets/n5.png',
   '/assets/chakratirth.jpg',
   '/assets/ghoghla.png'
 ];
 
 const Nagoa = () => {
   const [currentSlide, setCurrentSlide] = useState(0);
 
   useEffect(() => {
     const interval = setInterval(() => {
       setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
     }, 3000);
 
     return () => clearInterval(interval);
   }, []);
 
   return (
     <div className="nagoa-page"> {/* Added wrapper */}
       <Navbar />
       <HorizontalScroll/>
   
       <div className="places-details ">
         <div className="details">
           <p>
           Nagoa Beach is one of the most famous and picturesque beaches in Diu, known for its golden sands, crystal-clear waters, and serene atmosphere. Located in Bucharwada village, around 8 km from Diu city, this crescent-shaped beach is a favorite destination for tourists seeking relaxation and adventure.
           <br />
           <br />
           Nagoa Beach has seaside shacks offering delicious seafood and local Gujarati cuisine. There are also resorts and hotels nearby, providing comfortable stays with stunning ocean views.

✨ Whether you're looking for adventure, tranquility, or a mix of both, Nagoa Beach is the perfect getaway in Diu! 🌴🌊

           </p>
         </div>
         <div className="links">
           <ul>
             <li><Link to="/places/nagoa">Nagoa Beach</Link></li>
             <li><Link to="/places/ghoghla">Ghoghla Beach</Link></li>
             <li><Link to="/places/chakratirth">Chakratirth</Link></li>
             <li><Link to="/places/jallandhar">Jallandhar</Link></li>
             <li><Link to="/places/gomtimata">Gomtimata</Link></li>
           </ul>
         </div>
       </div>
   
       <Footer />
     </div>
   );  
 };
 
 export default Nagoa;