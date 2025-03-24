import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"; // Import Link
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
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
    <>
      <Navbar />
      <div className="slideshow-images">
        <div className="slideshow-container">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>

        <h1>Nagoa Beach</h1>

        <div className="main">
          <div className="details">
            <p>
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
      </div>
      <Footer />
    </>
  );
};

export default Nagoa;
